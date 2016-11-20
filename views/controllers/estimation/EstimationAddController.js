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
            $scope.editMode = !!$scope.params.key;
            $scope.estimation = {
                projectKey: $scope.params.projectKey,
                status: {
                    name: 'NEW',
                    value: 'новая',
                    style: 'default'
                }
            };

            $scope.init = function () {
                if(! $scope.editMode) return;

                $http.get('estimations/' + $scope.params.key).success(function (res) {
                    $scope.estimation = res;
                })
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
                    var message = $scope.editMode ? 'Эстимация сохранена' : 'Эстимация добавлена';
                    $growl.addMessage('Success', message, 'success');
                    $state.go('projectEstimations', {key: $scope.params.projectKey});
                });
            }
        }

    ]);