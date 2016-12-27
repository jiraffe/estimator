/**
 * Created by dzmitry_dubrovin on 14-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('ProjectsController', [

        '$scope',
        '$http',
        '$state',
        'StorageService',
        'BroadcastService',
        '$toast',

        function($scope, $http, $state, StorageService, BroadcastService, $toast) {

            $scope.params = angular.copy($state.params);
            $scope.projects = [];

            var getProjects = function() {
                $http({
                    method: 'GET',
                    url: 'projects'
                })
                    .success(function (res) {
                        $scope.projects = res;
                    });
            };

            $scope.delete = function(projectKey) {
                $http({
                    method: 'DELETE',
                    url: 'projects/' + projectKey
                }).success(function (res) {
                    if(res.success) {
                        $toast({message: $scope.translation.PROJECTS.MSGS.DELETED, theme:'success'});
                        getProjects();
                    }
                })
            };

            function init() {
                getProjects();
            }
            init();
        }

    ]);