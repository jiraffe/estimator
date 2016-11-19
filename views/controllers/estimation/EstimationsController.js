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
            $scope.filtrations = ['Все'];
            $scope.filter = '';
            $scope.statuses = statuses;

            $scope.statusFilter = function(data) {
                return true;
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
                    console.log($scope.filtrations, est.status, $scope.filtrations.indexOf(est.status) === -1);
                    if( $scope.filtrations.indexOf(est.status) === -1 ) {
                        $scope.filtrations.push(est.status);
                    }

                })
            }
        }
    );