"use strict";

angular.module('estimator')
    .controller('MainController',
        function ($scope, $http, $toast, $state, AuthService, USER_ROLES, AUTH_EVENTS, TranslationService) {

            $scope.params = angular.copy($state.params);
            $scope.user = {};
            $scope.isAuthorized = AuthService.isAuthorized;
            $scope.hasAccessLevel = AuthService.hasAccessLevel;
            $scope.host = urlPrefix;

            $scope.logout = function () {
                AuthService.logout()
                    .then(function () {
                        $state.go('login');
                        $toast({message: $scope.translation.USER.MSGS.LOGOUT, theme: 'success'})
                    });
            };

            $scope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
                $scope.init();
            });

            $scope.$on(AUTH_EVENTS.profileLoaded, function (event, data) {
                $scope.init();
            });

            $scope.$on(AUTH_EVENTS.profileChanged, function (event, data) {
                $scope.init();
            });

            $scope.translate = function(){
                TranslationService.getTranslation($scope, $scope.selectedLanguage);
            };

            /*
             * Do not use in in ng-init!
             * Should be only executed after user profile
             * loaded(reloaded) in app.run function
             */
            $scope.init = function () {
                $scope.user = AuthService.user;
                $scope.selectedLanguage = $scope.user.language.key || 'en';
                $scope.translate();
            }
        });