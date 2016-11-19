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
            $scope.project = {};
            $scope.projectKey = $scope.params.key;

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
                $http.get('projects/' + $scope.projectKey)
                    .success(function (res) {
                        $scope.project = res[0];
                    });
            }

            function init() {
                if($scope.projectKey !== '') {
                    initEditProject();
                }
            }
            init();
        }

    ]);