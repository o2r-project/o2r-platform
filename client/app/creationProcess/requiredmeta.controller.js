(function(){
    'use strict';

    angular
        .module('starter')
        .controller('RequiredMetaController', RequiredMetaController);
    
    RequiredMetaController.$inject = ['$rootScope', '$stateParams', 'httpRequests', '$log'];

    function RequiredMetaController($rootScope, $stateParams, httpRequests, $log){
        
        var requiredctrl=this;

        requiredctrl.textLicense=[];
        requiredctrl.codeLicense=[];
        requiredctrl.dataLicense=[];
        requiredctrl.ui_bindingLicense=[];
        
        requiredctrl.searchTerm='';
        
        requiredctrl.finalCodeLicense='';
        requiredctrl.finalDataLicense='';
        requiredctrl.finalTextLicense='';
        requiredctrl.finalBindingLicense='';
        

        requiredctrl.codeLicenseSelected = codeLicenseSelected;
        requiredctrl.dataLicenseSelected = dataLicenseSelected;
        requiredctrl.textLicenseSelected = textLicenseSelected;
        requiredctrl.bindingLicenseSelected = bindingLicenseSelected;
        
        httpRequests.getLicenses().
            then(function(result){
                assignLicenses(result.data);        
            })
            .catch(function(err){
                $log.debug(err)
            });
        
        function assignLicenses(licenses){
            for(var i in licenses){
                licenses[i].domain_content ? requiredctrl.textLicense.push(licenses[i]) : null;
                licenses[i].domain_data ? requiredctrl.dataLicense.push(licenses[i]) : null;
                licenses[i].domain_software ? requiredctrl.codeLicense.push(licenses[i]) : null;
            }
            requiredctrl.ui_bindingLicense=requiredctrl.codeLicense;
            $rootScope.meta.license==null ? requiredctrl.code="License: Code" : requiredctrl.code=$rootScope.meta.license.code.id;
        }

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
    }

})();


           
           
            
           
           
            