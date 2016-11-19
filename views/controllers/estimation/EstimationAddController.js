/**
 * Created by dzmitry_dubrovin on 12-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('EstimationAddController', [

        '$scope',
        '$state',
        '$http',
        '$growl',

        function($scope, $state, $http, $growl) {

            $scope.params = angular.copy($state.params);
            $scope.estimation = {
                projectKey: $scope.params.projectKey,
                status: {
                    name: 'NEW',
                    value: 'новая',
                    style: 'default'
                }
            };

            $scope.add = function () {

                if( ! $scope.addEstimationForm.$valid) {
                    return;
                }

                $http({
                    url: 'estimations',
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    $growl.addMessage('Success', 'Эстимация добавлена', 'success');
                    $state.go('estimations');
                });
            }
        }

    ]);