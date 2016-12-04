/**
 * Created by dzmitry_dubrovin on 14-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('ProjectAddController', [

        '$scope',
        '$state',
        '$http',
        '$toast',

        function ($scope, $state, $http, $toast) {

            var clearEstimationModel = {
                fields: [],
                estimationTimeNeeded: true,
                mngmntModel: [
                    {
                        name: undefined,
                        percent: undefined
                    }
                ]
            };
            $scope.params = angular.copy($state.params);
            $scope.project = {
                estimationModel: clearEstimationModel
            };
            $scope.projectKey = $scope.params.key;

            $scope.upsert = function () {
                $http({
                    url: 'projects',
                    method: 'POST',
                    data: $scope.project
                }).success(function (res) {
                    $toast({message: 'Проект сохранён', theme:'success'});
                    $state.go('projects');
                });
            };

            $scope.initEditProject = function () {
                if ( ! $scope.projectKey) return;
                $http.get('projects/' + $scope.projectKey)
                    .success(function (res) {
                        $scope.project = res[0];
                        $scope.estimationModel = $scope.project.estimationModel || clearEstimationModel;
                    });
            };

            $scope.addMngmntField = function() {
                $scope.project.estimationModel.mngmntModel.push({
                    name: undefined,
                    percent: undefined
                });
            };

            $scope.removeMngmntField = function(idx) {
                $scope.project.estimationModel.mngmntModel.splice(idx, 1);
            };

            $scope.init = function () {
                if ($scope.projectKey !== '') {
                    $scope.initEditProject();
                }
            }
        }

    ]);