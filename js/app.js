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
            templateUrl: "templates/home.html",
            controller: 'HomeCtrl'
        })
          
        .state('erc', {
            url: "/erc/:ercid",
            templateUrl: "templates/erc.html",
            controller: 'ErcCtrl'
        })

        .state('author', {
            url: "/author/:authorid",
            templateUrl: "templates/author.html",
            controller: 'AuthorCtrl',
        })

        .state('search', {
            url: "/search?term",
            templateUrl: "templates/search.html",
            controller: 'SearchCtrl'
        });
    });
    
app.controller('ErcCtrl', ['$scope', 'publications', '$stateParams', '$http', function($scope, publications, $stateParams, $http){
        var url = 'http://ubsvirt148.uni-muenster.de:8080/api/v1';
        var ercId = $stateParams.ercid;

        var success = function(){

            $scope.publication = publications.getPublications();

                $scope.getOne = function(path){
                    var p = publications.getContentById(path);
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

        };

        // real
        //publications.getRequest(url + '/compendium/' + ercId, success);
        //test
        publications.getRequest(url + '/compendium/RjWMR', success);
        // real
        //$http.get(url + '/job?compendium_id=' + ercId)
        //test
        $http.get(url + '/job?compendium_id=RjWMR')
            .then(function successCallback(response){
                getJobStatus(response.data.results[response.data.results.length-1]);
            }, function errorCallback(response){
                console.log(response);
            });

        // options for folderTree
        $scope.treeOptions = {
            nodeChildren: 'children',
            dirSelectable: false
        };

        // id of file in publication
        $scope.fileId;

        // set fileId
        $scope.setId = function(path){
            $scope.fileId = path;
        };


        var getJobStatus = function(job_id){
            $http.get(url + '/job/' + job_id)
                        .then(function successCallback(res){
                            var status = {};
                            status.val_bag = res.data.steps.validate_bag.status;
                            status.val_comp = res.data.steps.validate_compendium.status;
                            status.val_docker = res.data.steps.validate_dockerfile.status;
                            status.img_bld = res.data.steps.image_build.status;
                            status.img_exec = res.data.steps.image_execute.status;
                            status.cleanup = res.data.steps.cleanup.status;
                            $scope.execStatus = status;

                            var _checkStatus = function(object){
                                var success = true;
                                var fail = false;
                                
                                for(step in object){
                                    if(object[step] != 'success') success = false;
                                    if(object[step] == 'failure') fail = true;
                                }
                                var done = success || fail;
                                return done;
                            }

                            if(_checkStatus(status)){
                                $scope.jobDone = false;
                            }

                        }, function errorCallback(res){
                            console.log(res);
                        });
        };
        $scope.jobDone = true;
        $scope.execStatus = {};
        $scope.execJob = function(){
            //real
            //$http.post('http://ubsvirt148.uni-muenster.de:8080/api/v1/job', {compendium_id: ercId})
            //test
            $http.post(url + '/job', {compendium_id: 'RjWMR'})
                .then(function successCallback(response){
                    console.log(response);
                    getJobStatus(response.data.job_id);
                    
                }, function errorCallback(response){
                    console.log(response.statusText);
            });
        };
       
}]);

app.controller('AuthorCtrl', ['$scope', '$stateParams', '$location', 'pubListAuthor', function($scope, $stateParams, $location, pubListAuthor){
    
    var authorId = $stateParams.authorid;
    // httpRequest for retrieving all compendia from one author
    pubListAuthor.httpGET(authorId);
    

    // get all PublicationsMetadata
    $scope.allPubs = pubListAuthor.getPubMeta(); 
    
    // checks if a publication was already selected. 
    var _checkPubId = function(){
        if(typeof $scope.pubId == 'undefined') return false;
        return true;
    };

    // checks if a publication was already selected, if not the latest publication will be displayed
    $scope.getOne = function(id){
        if(_checkPubId()){
            var pub = pubListAuthor.getPubById(id);
        } else {
            var pub = pubListAuthor.getPubMeta()[0];
        }
        return pub;
    };

    $scope.pubId;

    // setter function for pubId
    $scope.setId = function(id){
        $scope.pubId = id;
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

    // triggered on GoTo Button. Gets the id of last clicked publication and calls url /erc/:ercid
    $scope.submit = function(){
        var _url = '/erc/' + $scope.getOne($scope.pubId).id;
        $location.path(_url);

    };

    
}]);

app.controller('SearchCtrl', ['$scope', '$stateParams', 'searchResults', function($scope, $stateParams, searchResults){
	// reads term query from url
    $scope.searchTerm = $stateParams.term;

    // get all PublicationsMetadata
    $scope.allPubs = searchResults.getPubMeta(); 
    // id of clicked publication
    $scope.pubId;
    // sets pubId to id of clicked publication
    $scope.setId = function(id){
        $scope.pubId = id;
    };
    // checks if a publication has been clicked
    // returns true if a publication has been clicked
    $scope.checkPubId = function(){
        if(typeof $scope.pubId == 'undefined') return false;
        return true;  
    };
    // Changes first letter of word into capital letter
    $scope.caps = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    // triggered on GoTo Button. Gets the id of last clicked publication and calls url /erc/:ercid
    $scope.submit = function(){
        var _url = '/erc/' + $scope.getOne($scope.pubId).id;
        $location.path(_url);
    };
    // checks if a publication was already selected, if not the latest publication will be displayed
    $scope.getOne = function(id){
        var pub = searchResults.getPubById(id);
        return pub;
    };
}]);

app.controller('HomeCtrl', ['$scope', '$location', function($scope, $location){
    
    $scope.submit = function(){
        var _query = $scope.searchModel.replace(/ /g, "+");
       // $location.path('/search').search('term=' + _query);
        $location.path('/search');
    };	
}]);