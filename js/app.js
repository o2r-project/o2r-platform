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
    
app.controller('AuthorCtrl', function($scope, publications, $stateParams, $http){
        $scope.publications = publications.getPublications();
        $scope.template = {name: 'folderTree.html', url: 'templates/folderTree.html'};


        // sets .show-Attribute of all files to false
        var _setAllFalse = function(){
             for(file in publications.getPublications().content){
                        publications.getPublications().content[file].show = false;
                    }
        }; 

        // sets param fileContent as input for scope.content
        var _showFile = function(fileContent){
            $scope.content = fileContent;
        };
        
        
        // calls http request for receiving content of file. Calls _showFile() to make fileContent visible
        var _getFileContent= function(fileId){
           /*
            // data contains content of file as string
            $http({
                method: 'GET',
                //Replace with real path
                url: '/getMyDataAsString/:id'
            }).then(function successCallback(response){
                showFile(response.data);
            }, function errorCallback(response){

            });
        */
            data = 'Hello World \n Here is a new line \n and here are many spaces                               until here';
            _showFile(data);
        };

       

});

app.controller('ReaderCtrl', function($scope){
	
});

app.controller('HomeCtrl', function($scope){
	
});