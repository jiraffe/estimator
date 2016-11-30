/**
 * Created by dzmitry_dubrovin on 11-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('EstimationsController',

        function($scope, $state, $http, $growl, statuses) {

            $scope.params = angular.copy($state.params);
            $scope.projectKey = 'none';
            $scope.estimations = [];
            $scope.filtrations = [{
                value: 'Все',
                name: 'all'
            }];

            $scope.filter = $scope.filtrations[0];
            $scope.statuses = statuses;

            $scope.statusFilter = function(data) {
                console.log(data, $scope.filter);
                if($scope.filter.name === 'all') return true;
                else if($scope.filter.name === data.status.name) {
                    return true;
                } else {
                    return false;
                }
            }

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
                    url: 'estimations',
                    method: 'GET',
                }).success(function (res) {
                    $scope.estimations = res;
                    prepareFiltrations();
                });
            };

            function prepareFiltrations() {
                $scope.estimations.forEach(function (est) {
                    if( $scope.filtrations.indexOf(est.status) === -1 ) {
                        $scope.filtrations.push(est.status);
                    }
                });
            }
        }
    );