    var app = angular.module('starter', ["treeControl", "ui.router", "hljs"]);
    app.constant('url', 'http://ubsvirt148.uni-muenster.de:8080/api/v1');
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
    
app.controller('ErcCtrl', ['$scope', 'publications', '$stateParams', '$http', 'url', function($scope, publications, $stateParams, $http, url){
        // id of compendium
        var ercId = $stateParams.ercid;
        // callback function for publications.getRequest()
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

        // httpRequest for retrieving all metadata of a compendium
        publications.getRequest(url + '/compendium/' + ercId, success);
        // httpRequest for getting information about a job status
        $http.get(url + '/job?compendium_id=' + ercId)
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
        // function for handling the job status
        var getJobStatus = function(job_id){
            //httpRequest for getting information about job status
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
        //function for executing a new job
        $scope.execJob = function(){
            // httpRequest for executing a new job
            $http.post('http://ubsvirt148.uni-muenster.de:8080/api/v1/job', {compendium_id: ercId})
                .then(function successCallback(response){
                    console.log(response);
                    getJobStatus(response.data.job_id);
                    
                }, function errorCallback(response){
                    console.log(response.statusText);
            });
        };
       
}]);

app.controller('AuthorCtrl', ['$scope', '$stateParams', 'pubListAuthor', 'metadata', function($scope, $stateParams, pubListAuthor, metadata){
    // id from author
    var authorId = $stateParams.authorid;
    // function is called in asynchronous response from metadata.callMetadata_author()
    var getMeta_author = function(meta_author){
        //allPubs will be set to comp_meta from metadata factory
        $scope.allPubs = meta_author;
        // setter function for comp_id
        $scope.setId = function(id){
            metadata.setComp_id(id);
        };  
    };
    // httpRequest for retrieving all compendia from one author
    metadata.callMetadata_author(authorId, getMeta_author);
    // helper for sorting
    $scope.sortType = 'date';
    $scope.sortReverse = true;
    // helper for contentfilter
    $scope.filterContent = 'content';
}]);

app.controller('SearchCtrl', ['$scope', '$stateParams', 'metadata', function($scope, $stateParams, metadata){
	// reads term query from url
    var searchTerm = $stateParams.term;

    // function is called in asynchronous response from metadata.callMetadata_search()
    var getMeta_search = function(meta_search){
        $scope.allPubs = meta_search;
        // setter function for comp_id
        $scope.setId = function(id){
            metadata.setComp_id(id);
        };  
    };
   
   // httpRequest for retrieving all compendia fitting search parameters
    metadata.callMetadata_search(searchTerm, getMeta_search);

}]);

app.controller('HomeCtrl', ['$scope', '$location', function($scope, $location){
    
    $scope.submit = function(){
        var _query = $scope.searchModel.replace(/ /g, "+");
       // $location.path('/search').search('term=' + _query);
        $location.path('/search');
    };	
}]);

app.controller('MetadataCtrl', ['$scope', '$location', 'metadata', function($scope, $location, metadata){
    //Controller starts when previous httpRequest is finished
    $scope.$on('loadedAllComps', function(){
        $scope.compMeta = metadata.getLatestComp();
        metadata.callJobStatus($scope.compMeta.id, getJobMeta);
    });

    //function is called in asynchronous response from metadata.callJobStatus()
    var getJobMeta = function(meta){
        $scope.compMeta.status = meta;
    };
    
    //watch if comp_id changes in factory
    $scope.$on('changedComp_id', function(event, data){
        $scope.compMeta = metadata.getOneComp(data);
        metadata.callJobStatus($scope.compMeta.id, getJobMeta);
    });
    
    // triggered on GoTo Button. Gets the id of last clicked publication and calls url /erc/:ercid
    $scope.submit = function(){
        var _url = '/erc/' + $scope.compMeta.id;
        $location.path(_url);
    };

    // Changes first letter of word into capital letter
    $scope.caps = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
}]);