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
          
        .state('erc', {
            url: "/erc/:ercid",
            templateUrl: "templates/author.html",
            controller: 'ErcCtrl'
        })

        .state('author', {
            url: "/author/:authorid",
            templateUrl: "templates/author_landingpage.html",
            controller: 'AuthorCtrl',
        });
    });
    
app.controller('ErcCtrl', ['$scope', 'publications', '$stateParams', '$http', function($scope, publications, $stateParams, $http){
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

app.controller('AuthorCtrl', ['$scope', '$stateParams', 'pubListMeta', function($scope, $stateParams, pubListMeta){
    
    // get all PublicationsMetadata
    $scope.allPubs = pubListMeta.getPubMeta();

    $scope.pushId = function(){
        console.log('pushed');
    };
    // checks if a publication was already selected. 
    var _checkPubId = function(){
        if(typeof $scope.pubId == 'undefined') return false;
        return true;
    };

    // checks if a publication was already selected, if not the latest publication will be displayed
    $scope.getOne = function(id){
        if(_checkPubId()){
            var pub = pubListMeta.getPubById(id);
        } else {
            var pub = pubListMeta.getPubMeta()[0];
        }
        return pub;
    };

    $scope.pubId;

    // setter function for pubId
    $scope.setId = function(number){
        $scope.pubId = number;
    };
    
    // Changes first letter of word into capital letter
    $scope.caps = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // helper for sorting
    $scope.sortType = 'date';
    $scope.sortReverse = true;

    // helper for contentfilter
    $scope.filterContent = 'content';

    
}]);

app.controller('ReaderCtrl', function($scope){
	
});

app.controller('HomeCtrl', function($scope){
	
});