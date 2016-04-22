    var app = angular.module('starter', ["ui.router"]);
    app.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/home");
      
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html"
        })

        .state('reader', {
            url: "/reader",
            templateUrl: "templates/reader.html"
        })
          
        .state('author', {
            url: "/author/:id",
            templateUrl: "templates/author.html",
            controller: 'AuthorCtrl'
        });
    });
    
app.controller('AuthorCtrl', function($scope, publications, pdf_files, $stateParams){
		$scope.publications = publications.getPublications();

        /*
		if ($stateParams.id != ""){
			var currentPublication = pdf_files.showPDF(publications.getEntryById($stateParams.id).url);			
        }
    */
        // -----------NEW---------
        if($stateParams.id != ""){
            
            //
            // handles display of files regarding filetype peculiarities
            //
            switch(publications.getContentById($stateParams.id).type){
                case '.pdf':
                    _setAllFalse;
                    var currentContent = pdf_files.showPDF(publications.getContentById($stateParams.id).url);
                    publications.getContentById($stateParams.id).show = true;
                    break;
                case '.jpg':
                    _setAllFalse;
                    var currentContent = publications.getContentById($stateParams.id).show = true;
                    break;
            }
            

        }

        // sets .show-Attribute of all files to false
        var _setAllFalse = function(){
             for(file in publications.getPublications().content){
                        publications.getPublications().content[file].show = false;
                    }
        }; 
        

});

app.controller('ReaderCtrl', function($scope){
	
});

app.controller('HomeCtrl', function($scope){
	
});