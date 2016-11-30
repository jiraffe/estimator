/**
 * Created by dzmitry_dubrovin on 14-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('ProjectAddController', [

        '$scope',
        '$state',
        '$http',
        '$growl',

        function ($scope, $state, $http, $growl) {

            var clearEstimationModel = {
                fields: [],
                estimationTimeNeeded: true,
                coordination: {
                    isNeeded: true,
                    percentage: 0
                },
                stabilisation: {
                    isNeeded: true,
                    percentage: 0
                },
                testing: {
                    isNeeded: true,
                    percentage: 0
                },
                other: {
                    isNeeded: true,
                    percentage: 0
                }
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
                    $growl.addMessage('Success', 'Проект сохранён', 'success');
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

            $scope.init = function () {
                if ($scope.projectKey !== '') {
                    $scope.initEditProject();
                }
            }
        }

    ]);