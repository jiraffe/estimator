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

            $scope.add = function () {
                $http({
                    url: 'projects',
                    method: 'POST',
                    data: $scope.project
                }).success(function (res) {
                    $growl.addMessage('Success', 'Проект добавлен', 'success');
                    $state.go('projects');
                });
            }
        }

    ]);