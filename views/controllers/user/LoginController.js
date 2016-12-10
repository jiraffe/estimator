"use strict";

angular.module('estimator')
    .controller('LoginController', [

        '$scope',
        '$http',

        function ($scope, $http) {

            $scope.user = {};
            $scope.mode = 'Login'; // Register, Forgot password

            $scope.changeMode = function (mode) {
                $scope.mode = mode;
            };

            $scope.login = function () {
                $http({
                    url: 'users/login',
                    method: 'POST',
                    data: $scope.user
                });
            };

            $scope.test = function () {
                $http.get('users/secure', { withCredentials: true })
                    .success(function () {
                        console.log(arguments);
                    });

            };

            $scope.resetPassword = function () {
                console.log('TRY resetPassword !');
            };

            $scope.register = function () {
                $http({
                    url: 'users/register',
                    method: 'POST',
                    data: $scope.user
                });
            };
        }

    ]);