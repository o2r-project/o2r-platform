    var app = angular.module('starter', ["treeControl", "ui.router", "hljs"]);
    app.config(function($stateProvider, $urlRouterProvider, hljsServiceProvider){
      
      hljsServiceProvider.setOptions({
        tabReplace: '    '
      });
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
        })

        .state('author_landing', {
            url: "/authorLanding/:authorid",
            templateUrl: "templates/author_landingpage.html",
            controller: 'AuthorLandingCtrl',
            controllerAs: 'aLand'
        });
    });
    
app.controller('AuthorCtrl', ['$scope', 'publications', '$stateParams', '$http', function($scope, publications, $stateParams, $http){
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

        // finds a publication and returns it
        $scope.getOne = function(number){
            var p = publications.getContentById(number);
            return p;
        };

        // checks for filesize and mimetype for displaying content of files
        // returns true, if file is not too big and not of type of pdf, image, audio, video
        $scope.displaySource = function(string){
            if(typeof string == 'undefined'){ return; }
            var result = true;
            var _mime = string.split('/')[0];
            if( (string == 'application/pdf') || (_mime == 'image') || (_mime == 'audio') || (_mime == 'video')){
                        result = false;
            }
            return result;
        };
}]);

app.controller('AuthorLandingCtrl', ['$scope', '$stateParams', 'pubListMeta', function($scope, $stateParams, pubListMeta){
    
    var _checkPubId = function(){
        if(typeof $scope.pubId == 'undefined') return false;
        return true;
    };

    $scope.allPubs = pubListMeta.getPubMeta();
    $scope.getOne = function(id){
        if(_checkPubId()){
            var pub = pubListMeta.getPubById(id);
        } else {
            var pub = pubListMeta.getPubMeta()[0];
        }
        return pub;
    };
    $scope.pubId;
    $scope.setId = function(number){
        $scope.pubId = number;
    };
    
    $scope.caps = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

}]);

app.controller('ReaderCtrl', function($scope){
	
});

app.controller('HomeCtrl', function($scope){
	
});