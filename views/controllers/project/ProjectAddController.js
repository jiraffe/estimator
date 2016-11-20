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

        function($scope, $state, $http, $growl) {

            $scope.params = angular.copy($state.params);
            $scope.project = {
                estimationModel: []
            };
            $scope.projectKey = $scope.params.key;
            console.log($scope.projectKey);
            $scope.estimationModelEntity = '';

            $scope.add = function () {
                $http({
                    url: 'projects',
                    method: 'POST',
                    data: $scope.project
                }).success(function (res) {
                    $growl.addMessage('Success', 'Проект добавлен', 'success');
                    $state.go('projects');
                });
            };

            function initEditProject() {
                if( ! $scope.projectKey) return;
                $http.get('projects/' + $scope.projectKey)
                    .success(function (res) {
                        $scope.project = res[0];
                    });
            }

            $scope.addEstimationModelEntity = function () {

                if($scope.project.estimationModel.indexOf($scope.estimationModelEntity) !== -1) {
                    $scope.estimationModelEntity = '';
                    return;
                }

                $scope.project.estimationModel.push($scope.estimationModelEntity)
                $scope.estimationModelEntity = '';
            };

            $scope.removeEstimationModelEntity = function (entity) {
                var idx = $scope.project.estimationModel.indexOf(entity);
                $scope.project.estimationModel.splice(idx, 1);
            }

            function init() {
                if($scope.projectKey !== '') {
                    initEditProject();
                }
            }
            init();
        }

    ]);