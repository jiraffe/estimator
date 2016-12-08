"use strict";

angular.module('estimator')
    .controller('LoginController', [

        '$scope',

        function($scope) {

            $scope.user = {};
            $scope.mode = 'Login'; // Register, Forgot password

            $scope.changeMode = function(mode) {
                $scope.mode = mode;
            };

            $scope.login = function() {
                console.log('TRY LOGIN !');
            };

            $scope.resetPassword = function() {
                console.log('TRY resetPassword !');
            };

            $scope.register = function() {
                console.log('TRY register !');
            };
        }

    ]);