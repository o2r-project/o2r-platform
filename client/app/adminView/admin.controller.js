(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AdminController', AdminController);
    
    AdminController.$inject = ['$scope', '$log', '$state', '$document', '$mdToast', '$mdDialog', 'admin', 'env', 'httpRequests', 'login'];
    function AdminController($scope, $log, $state, $document, $mdToast, $mdDialog, admin, env, httpRequests, login){
        var logger = $log.getInstance('AdminCtrl');
        var vm = this;
        vm.users = admin;
        vm.updateUser = updateUser;
        vm.levels = env.userLevels;
        vm.disable = disable;

        activate();

        ///////

        function activate(){
            // if user has not the right user level, the user will be forwarded to 404 page
            httpRequests.getSingleUser(login.getUser().orcid)
                .then(function(res){
                    if(res.data.level < vm.levels.editors){
                        $state.go('404');
                    }
                });
        }

        function updateUser(id, level, ev){
            var confirm = $mdDialog.confirm()
                .title('Are you sure, you want to change the user level?')
                .textContent('')
                .ariaLabel('Confirm User Level Change')
                .targetEvent(ev)
                .ok('Change User Level')
                .cancel('Don\'t change User Level');

            $mdDialog.show(confirm).then(function(){
                httpRequests.setUserLevel(id, level)
                    .then(function(response){
                        logger.info(response);
                        showToast();
                    })
                    .catch(function(e){
                        showToast(e);
                    });
            }, function(){});
        }

        function disable(u){
            if(typeof u.level == 'number') return false;
            return true;
        }

        function showToast(error){
            var text = 'Saved successfully';
            var tClass = 'creationProcess-success-toast';
            if(angular.isDefined(error)){
                text = 'Failed saving!';
                tClass = 'creationProcess-failure-toast';
            }
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .toastClass(tClass)
                .position('top')
                .parent($document[0].body.children.main.children["ui-view"])
            );
        }
    }
})();