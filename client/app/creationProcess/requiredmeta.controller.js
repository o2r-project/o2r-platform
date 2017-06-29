(function(){
    'use strict';

    angular
        .module('starter')
        .controller('RequiredMetaController', RequiredMetaController);
    
    RequiredMetaController.$inject = ['$scope', '$log','httpRequests', 'creationObject', 'icons'];

    function RequiredMetaController($scope, $log, httpRequests, creationObject, icons){
        var logger = $log.getInstance('RequiredMeta');

        var openLicense = ["CC-BY-4.0", "BSD-2-Clause", "CC-BY-4.0", "MIT"];
        var closedLicense = ["", "GPL-3.0"];
        
        var vm = this;
        vm.icons = icons;
        vm.required = creationObject.getRequired();
        vm.required.view = vm.required.viewfile[0] || "";
        vm.updateViewfile = creationObject.updateViewfile;
        vm.simpleUpdate = creationObject.simpleUpdate;

        vm.selectLicenses = 'open';
        vm.updateLicense = creationObject.updateLicense;
        vm.updateAllLicenses = updateAllLicenses

        vm.updateAuthor = updateAuthor;
        vm.removeAuthor = removeAuthor;
        vm.addAuthor = creationObject.addAuthor;
        vm.addNewAuthor = addNewAuthor;
        vm.newAuthor = newAuthor;
        vm.newAuthorEdit = false;
        vm.hideAddAuthorButton = false;
        vm.cancelNewAuthor = cancelNewAuthor;
        vm.cancelUpdateAuthor = cancelUpdateAuthor;

        vm.textLicense=[];
        vm.codeLicense=[];
        vm.dataLicense=[];
        vm.ui_bindingLicense=[];

        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getRequired()));
        });

        $scope.$watch('requiredForm.$valid', function(newVal, oldVal){
            $scope.$parent.vm.setFormValid(newVal);
        });
        /*
        vm.searchTerm='';
        
        vm.finalCodeLicense='';
        vm.finalDataLicense='';
        vm.finalTextLicense='';
        vm.finalBindingLicense='';
        

        vm.codeLicenseSelected = codeLicenseSelected;
        vm.dataLicenseSelected = dataLicenseSelected;
        vm.textLicenseSelected = textLicenseSelected;
        vm.bindingLicenseSelected = bindingLicenseSelected;
        */
        
        activate();

        //////////

        function activate(){
            preparePublicationDate();

            httpRequests
                .getLicenses()
                .then(function(result){
                    assignLicenses(result.data);
                    vm.updateAllLicenses();

                    $scope.$watch('vm.required.textLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense(vm.textLicense[newVal].id, 0);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.codeLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense(vm.codeLicense[newVal].id, 1);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.dataLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense(vm.dataLicense[newVal].id, 2);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.ui_bindingLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense(vm.ui_bindingLicense[newVal].id, 3);
                        } catch (e){}
                    });
                })
                .catch(function(err){
                    logger.info(err)
                });

        }
        function assignLicenses(licenses){
            for(var i in licenses){
                licenses[i].domain_content ? vm.textLicense.push(licenses[i]) : null;
                licenses[i].domain_data ? vm.dataLicense.push(licenses[i]) : null;
                licenses[i].domain_software ? vm.codeLicense.push(licenses[i]) : null;
            }
            vm.ui_bindingLicense = vm.codeLicense;
            //$rootScope.meta.license==null ? requiredctrl.code="License: Code" : requiredctrl.code=$rootScope.meta.license.code.id;
        }

        function removeAuthor(index){
            vm.required.author.splice(index, 1);
            creationObject.removeAuthor(index);
        }

        function updateAllLicenses(){
            var selected = vm.selectLicenses;
            if(selected == 'open'){
                vm.updateLicense(openLicense);
            } else if(selected == 'closed'){
                vm.updateLicense(closedLicense);
            }
        }

        function addNewAuthor(){
            var author = {};
            author.name = vm.author.name;
            author.affiliation = vm.author.affiliation || "";
            author.orcid = vm.author.orcid || "";
            vm.required.author.push(author);
            vm.addAuthor(author);
            //reset values
            vm.cancelNewAuthor();
        }

        function newAuthor(){
            vm.newAuthorEdit = true;
            vm.hideAddAuthorButton = true;
        }

        function cancelNewAuthor(){
            vm.newAuthorEdit = false;
            vm.hideAddAuthorButton = false;
            if(vm.author){
                vm.author.name = null;
                vm.author.affiliation = null;
                vm.author.orcid = null;
            }
        }

        function updateAuthor(index){
            var author = {};
            author.name = vm.author.name || vm.required.author[index].name;
            author.affiliation = vm.author.affiliation || vm.required.author[index].affiliation;
            author.orcid = vm.author.orcid || vm.required.author[index].orcid;
            vm.required.author[index].name = author.name;
            vm.required.author[index].affiliation = author.affiliation;
            vm.required.author[index].orcid = author.orcid;
            creationObject.updateAuthor(index, author.name, author.affiliation, author.orcid);
            vm.cancelUpdateAuthor();
        }

        function cancelUpdateAuthor(){
            vm.editAuthor = null;
            if(vm.author){
                vm.author.name = null;
                vm.author.affiliation = null;
                vm.author.orcid = null;
            }
        }

        function preparePublicationDate(){
            if(angular.isUndefined(vm.required.publicationDate) || vm.required.publicationDate == null){
                vm.required.publicationDate = new Date();
                logger.info('setting new publicationDate');
            } else {
                vm.required.publicationDate = new Date(vm.required.publicationDate);
                logger.info('found existing publication date')
            }
            vm.simpleUpdate('publicationDate', vm.required.publicationDate);
        }
    }

})();         