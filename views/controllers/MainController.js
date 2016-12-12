"use strict";

angular.module('estimator')
    .controller('MainController',
        function ($scope, $http, $toast, $state, StorageService, BroadcastService) {

            var blankProfile = '../../images/blank_account.png';
            $scope.params = angular.copy($state.params);
            $scope.user = {avatarName: blankProfile};

            $scope.logout = function () {
                $http.get('users/logout')
                    .success(function (res) {
                        if (res.success) {
                            $state.go('login');
                            $toast({message: 'Заходите ещё!', theme: 'success'})
                        }
                    });
            };

            $scope.getUserProfile = function () {
                $http.get('users/profile')
                    .success(function (res) {
                        $scope.user = res;
                        if(!res.avatarName) $scope.user.avatarName = blankProfile;
                    })
            };

            $scope.getUserProfile();

            $scope.$on('profileChanged', function (event, data) {
                $scope.getUserProfile(); // Данные, которые нам прислали
            });
        });