(function(){
    'use strict';

    angular
        .module('starter')
        .controller('RequiredMetaController', RequiredMetaController);
    
    RequiredMetaController.$inject = ['$scope', '$log','httpRequests', 'creationObject'];

    function RequiredMetaController($scope, $log, httpRequests, creationObject){
        
        var vm = this;
        vm.required = creationObject.getRequired();
        vm.updateTitle = creationObject.updateTitle;
        vm.updateDescription = creationObject.updateDescription;
        vm.updateLicense = creationObject.updateLicense;
        vm.updatePublicationDate = creationObject.updatePublicationDate;
        vm.updateSoftwarePaperCitation = creationObject.updateSoftwarePaperCitation;
        vm.updateAuthorName = creationObject.updateAuthorName;
        vm.updateAuthorAffiliation = creationObject.updateAuthorAffiliation;
        vm.updateAuthorOrcid = creationObject.updateAuthorOrcid;

        $scope.$on('$destroy', function(){
            $log.debug('required metadata: ', angular.toJson(creationObject.getRequired()));
        });
        vm.textLicense=[];
        vm.codeLicense=[];
        vm.dataLicense=[];
        vm.ui_bindingLicense=[];
        
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

            httpRequests.getLicenses()
                .then(function(result){
                   assignLicenses(result.data);        
                })
                .catch(function(err){
                    $log.debug(err)
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
        /*

        function codeLicenseSelected(){
            $rootScope.meta.license==null ?  $rootScope.meta.license={} : null; //can be deleted once the metadata object returns a license json object 
            $rootScope.meta.license.code=requiredctrl.finalCodeLicense;
        }

        function dataLicenseSelected(){
            $rootScope.meta.license==null ?  $rootScope.meta.license={} : null; //can be deleted once the metadata object returns a license json object
            $rootScope.meta.license.data=requiredctrl.finalDataLicense;
        }        

        function textLicenseSelected(){
            $rootScope.meta.license==null ?  $rootScope.meta.license={} : null; //can be deleted once the metadata object returns a license json object
            $rootScope.meta.license.text=requiredctrl.finalTextLicense;
        }        

        function bindingLicenseSelected(){
            $rootScope.meta.license==null ?  $rootScope.meta.license={} : null; //can be deleted once the metadata object returns a license json object
            $rootScope.meta.license.binding=requiredctrl.finalBindingLicense;
        }

        requiredctrl.updateTitle = function(){
            $rootScope.meta.title=requiredctrl.changes.title;
            console.log(requiredctrl.changes.title)
            
        };  
        requiredctrl.updateAuthor = function(){
             
        };  
        requiredctrl.updateAffiliation = function(){
            $rootScope.meta.affiliation=requiredctrl.changes.affiliation;
        };  
        requiredctrl.updateOrcid = function(){
            $rootScope.meta.orcid=requiredctrl.changes.orcid;
        };        
        requiredctrl.updateAbstract = function(){
            $rootScope.meta.abstract=requiredctrl.changes.abstract;
        };  
        requiredctrl.updateDateCreated = function(){
            $rootScope.meta.dateCreated=requiredctrl.changes.dateCreated;
        };                                
        requiredctrl.updateSoftwarePaperCitation = function(){
            $rootScope.meta.softwarePaperCitation=requiredctrl.changes.softwarePaperCitation;
        }; 
        */  
    }

})();         