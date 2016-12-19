"use strict";

angular.module('estimator')
    .controller('MainController',
        function ($scope, $http, $toast, $state, AuthService, USER_ROLES, AUTH_EVENTS) {

            $scope.params = angular.copy($state.params);
            $scope.user = {};
            $scope.isAuthorized = AuthService.isAuthorized;
            $scope.hasAccessLevel = AuthService.hasAccessLevel;
            $scope.host = urlPrefix;

            $scope.logout = function () {
                AuthService.logout()
                    .then(function () {
                        $state.go('login');
                        $toast({message: 'Заходите ещё!', theme: 'success'})
                    });
            };

            $scope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
                $scope.user = AuthService.user;
            });

            $scope.$on(AUTH_EVENTS.profileLoaded, function (event, data) {
                $scope.user = data;
            });
        });