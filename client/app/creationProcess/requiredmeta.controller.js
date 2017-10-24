(function(){
    'use strict';

    angular
        .module('starter')
        .controller('RequiredMetaController', RequiredMetaController);
    
    RequiredMetaController.$inject = ['$scope', '$log','httpRequests', 'creationObject', 'icons', '$mdDialog'];

    function RequiredMetaController($scope, $log, httpRequests, creationObject, icons, $mdDialog){
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
        
        // vm.views = [];
        vm.mains = [];
        
        vm.textLicense=[];
        vm.codeLicense=[];
        vm.dataLicense=[];
        vm.ui_bindingLicense=[];
        
        vm.showAlert = function(env){
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .ariaLabel('License Information')
                .title('License Information')
                .htmlContent(
                    'We do not provide legal advice. For more information on licenses, see: <br>' +
                    '<a href="https://choosealicense.com/">Choose a license</a><br>' +
                    '<a href="https://tldrlegal.com/">tldr</a><br>' + 
                    '<a href="http://opendefinition.org/licenses/">Conformant licenses</a>'
                )
                .targetEvent(env)
                .ok('Close')
            );
        };
        
        vm.showError = showError;
        
        logger.info(vm);
        $scope.$on('$destroy', function(){
            // logger.info(angular.toJson(creationObject.getRequired()));
        });
        
        $scope.$watch('requiredForm.$valid', function(newVal, oldVal){
            $scope.$parent.vm.setFormValid(newVal);
        });
        
        // $scope.$watch('vm.view', function(newVal, oldVal){
        //     vm.simpleUpdate('viewfile', vm.views[newVal].file);
        // });

        $scope.$watch('vm.main', function(newVal, oldVal){
            vm.simpleUpdate('mainfile', vm.mains[newVal].file);
        });

        activate();

        //////////

        function activate(){
            preparePublicationDate();
            // prepareViewfile();
            prepareMainfile();

            httpRequests
                .getLicenses()
                .then(function(result){
                    assignLicenses(result.data);
                    if(vm.required.license.text) prepareLicense('textLicense', vm.required.license.text, vm.textLicense);
                    if(vm.required.license.code) prepareLicense('codeLicense', vm.required.license.code, vm.codeLicense);
                    if(vm.required.license.data) prepareLicense('dataLicense', vm.required.license.data, vm.dataLicense);
                    if(vm.required.license.uibindings) prepareLicense('ui_bindingLicense', vm.required.license.uibindings, vm.ui_bindingLicense);

                    $scope.$watch('vm.required.textLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense('text', vm.textLicense[newVal].id);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.codeLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense('code', vm.codeLicense[newVal].id);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.dataLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense('data', vm.dataLicense[newVal].id);
                        } catch (e){}
                    });

                    $scope.$watch('vm.required.ui_bindingLicense', function(newVal, oldVal){
                        try{
                            vm.updateLicense('uibindings', vm.ui_bindingLicense[newVal].id);
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
            logger.info('viewfiles is ', angular.toJson(vm.required.viewfiles));
            // create helper for md-select. List of objects containing id and filepath
            for(var i in vm.required.viewfiles){
                vm.views.push({id: i, file: vm.required.viewfiles[i]});
            }
            logger.info('set up vm.views', angular.toJson(vm.views));
            // if viewfile is empty set vm.view to first element of viewfiles
            // else set vm.view to the matching element
            if(!vm.required.viewfile){
                logger.info('viewfile is empty');
                vm.view = vm.views[0].id;
                logger.info('view is set to ', angular.toJson(vm.view));
            } else {
                logger.info('viewfile is not empty')
                for(var i in vm.views){
                    if(vm.views[i].file == vm.required.viewfile){
                        vm.view = vm.views[i].id;
                        logger.info('view is set to', angular.toJson(vm.view));
                        break;
                    }
                }
            }
        }

        function prepareMainfile(){
            for(var i in vm.required.mainfile_candidates){
                vm.mains.push({id: i, file: vm.required.mainfile_candidates[i]});
            }
            if(!vm.required.main){
                vm.main = vm.mains[0].id;
            } else {
                for(var i in vm.mains){
                    if(vm.mains[i].file == vm.required.mainfile){
                        vm.main = vm.mains[i].id;
                        break;
                    }
                }
            }
        }

        function useTemplateLicense(type){
            if(type == 'open'){
                prepareLicense('textLicense', openLicense[0], vm.textLicense);
                prepareLicense('codeLicense', openLicense[1], vm.codeLicense);
                prepareLicense('dataLicense', openLicense[2], vm.dataLicense);
                prepareLicense('ui_bindingLicense', openLicense[3], vm.ui_bindingLicense);
            } else if(type == 'closed'){
                prepareLicense('textLicense', closedLicense[0], vm.textLicense);
                prepareLicense('codeLicense', closedLicense[1], vm.codeLicense);
                prepareLicense('dataLicense', closedLicense[2], vm.dataLicense);
                prepareLicense('ui_bindingLicense', closedLicense[3], vm.ui_bindingLicense);
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

        function showError(fieldname){
            var field = $scope.requiredForm[fieldname];
            //check if input is of md-select
            if((fieldname == 'textlicense') ||
                (fieldname == 'codelicense') ||
                (fieldname == 'datalicense') ||
                (fieldname == 'uibindinglicense') ||
                (fieldname == 'viewfile')){
                // if tab was switched and form is invalid OR input was touched and is invalid show error message in input
                if(($scope.$parent.vm.switchedTab && field.$invalid) || (field.$touched && field.$invalid)){
                    // set textcolor to red
                    field.$$element[0].children[0].children[0].style.color = '#d11d29';

                    // if input type is of md-select and valid set to normal text color
                } else if (!field.$invalid){
                    // set text color to black
                    field.$$element[0].children[0].children[0].style.color = 'rgba(0,0,0,0.87)';
                }
            } else {
                // if tab was switched and form is invalid OR input was touched and is invalid show error message in input
                if(($scope.$parent.vm.switchedTab && field.$invalid) || (field.$touched && field.$invalid)) return true;
                else return false;
            }

        }
    }
})();         