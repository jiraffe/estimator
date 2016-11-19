"use strict";

angular.module('estimator')
    .controller('MainController', [

        '$scope',
        '$state',
        'StorageService',
        'BroadcastService',

        function($scope, $state, StorageService, BroadcastService) {

            $scope.params = angular.copy($state.params);

            
        }

    ]);