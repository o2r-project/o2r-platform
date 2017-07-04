(function(){
    'use strict';

    angular
        .module('starter')
        .controller('RequiredMetaController', RequiredMetaController);
    
    RequiredMetaController.$inject = ['$scope', '$log','httpRequests', 'creationObject', 'icons'];

    function RequiredMetaController($scope, $log, httpRequests, creationObject, icons){
        var logger = $log.getInstance('RequiredMeta');

        var openLicense = ["CC0-1.0", "MIT", "CC0-1.0", "MIT"];
        var closedLicense = ["CC-BY-NC-4.0", "GPL-3.0", "CC-BY-NC-4.0", "GPL-3.0"];
        
        var vm = this;
        vm.icons = icons;
        vm.required = creationObject.getRequired();
        vm.simpleUpdate = creationObject.simpleUpdate;

        vm.selectLicenses = 'open';
        vm.updateLicense = creationObject.updateLicense;
        vm.useTemplateLicense = useTemplateLicense;

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

        logger.info(vm);
        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getRequired()));
        });

        $scope.$watch('requiredForm.$valid', function(newVal, oldVal){
            $scope.$parent.vm.setFormValid(newVal);
        });
        
        $scope.$watch('vm.required.view', function(newVal, oldVal){
            try {
                vm.simpleUpdate('viewfile', vm.required.viewfiles[newVal]);
            } catch (e) {}
        });

        activate();

        //////////

        function activate(){
            preparePublicationDate();
            prepareViewfile();

            httpRequests
                .getLicenses()
                .then(function(result){
                    assignLicenses(result.data);
                    if(vm.required.license[0]) prepareLicense('textLicense', vm.required.license[0], vm.textLicense);
                    if(vm.required.license[1]) prepareLicense('codeLicense', vm.required.license[1], vm.codeLicense);
                    if(vm.required.license[2]) prepareLicense('dataLicense', vm.required.license[2], vm.dataLicense);
                    if(vm.required.license[3]) prepareLicense('ui_bindingLicense', vm.required.license[3], vm.ui_bindingLicense);

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
        }

        function getLicenseIndex(id, licenses){
            var result;
            for(var i in licenses){
                if (licenses[i].id.toUpperCase() == id.toUpperCase()) result = i;
            }
            if(!result) {
                logger.info('No matching license found. Setting result to null');
                result = null;
            }
            return result;
        }

        function prepareLicense(type, id, licenses){
            vm.required[type] = getLicenseIndex(id, licenses);
        }

        function prepareViewfile(){
            for(var i in vm.required.viewfiles){
                if(vm.required.viewfiles[i] == vm.required.viewfile){
                    vm.required.view = i;
                    break; 
                }
                vm.required.view = 0;
            }
        }

        function useTemplateLicense(type){
            if(type == 'open'){
                prepareLicense('textLicense', openLicense[0], vm.textLicense);
                prepareLicense('codeLicense', openLicense[1], vm.codeLicense);
                prepareLicense('dataLicense', openLicense[2], vm.dataLicense);
                prepareLicense('ui_bindingLicense', openLicense[3], vm.ui_bindingLicense);
                vm.updateLicense(openLicense);
            } else if(type == 'closed'){
                prepareLicense('textLicense', closedLicense[0], vm.textLicense);
                prepareLicense('codeLicense', closedLicense[1], vm.codeLicense);
                prepareLicense('dataLicense', closedLicense[2], vm.dataLicense);
                prepareLicense('ui_bindingLicense', closedLicense[3], vm.ui_bindingLicense);
                vm.updateLicense(closedLicense);
            }
        }

        function removeAuthor(index){
            vm.required.author.splice(index, 1);
            creationObject.removeAuthor(index);
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