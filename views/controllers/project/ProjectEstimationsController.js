/**
 * Created by dzmitry_dubrovin on 14-Nov-16.
 */
/**
 * Created by dzmitry_dubrovin on 11-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('ProjectEstimationsController', [

        '$scope',
        '$state',
        '$http',
        '$growl',

        function($scope, $state, $http, $growl) {

            $scope.params = angular.copy($state.params);
            $scope.projectKey = $state.params.key;
            $scope.estimations = [];

            function init() {
                getEstimations();
            }
            init();

            $scope.deleteEstimation = function (key) {
                $http({
                    url: 'estimations/' + key,
                    method: 'DELETE',
                }).success(function (res) {
                    $growl.addMessage('Success', 'Эстимация удалена', 'success');
                    getEstimations();
                });
            };

            function getEstimations() {
                $http({
                    url: 'projects/estimations/' + $scope.params.key,
                    method: 'GET',
                }).success(function (res) {
                    $scope.estimations = res;
                });
            }
        }
    ]);