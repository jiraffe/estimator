"use strict";

angular.module('estimator')
    .controller('MainController',
        function ($scope, $http, $toast, $state, StorageService, BroadcastService) {

            $scope.params = angular.copy($state.params);

            $scope.logout = function () {
                $http.get('users/logout')
                    .success(function (res) {
                        if(res.success) {
                            $state.go('login');
                            $toast({message:'Заходите ещё!', theme: 'success'})
                        }
                    });
            }
        }
    );