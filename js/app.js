    var app = angular.module('starter', ["treeControl", "ui.router"]);
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

        // retrieves all metadata of publication
        $scope.publications = publications.getPublications();

        // options for folderTree
        $scope.treeOptions = {
            nodeChildren: 'children',
            dirSelectable: false
        };

        // id of file in publication
        $scope.fileId;

        // set fileId
        $scope.setId = function(number){
            $scope.fileId = number;
        };


        /*
        ######################################################
        ############## Delete from here ######################
        ######################################################
        */
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

       /*
        ####################################################
        ############## Delete until here ###################
        ####################################################
       */

});

app.controller('ReaderCtrl', function($scope){
	
});

app.controller('HomeCtrl', function($scope){
	
});