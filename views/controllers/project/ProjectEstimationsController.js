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
        '$toast',
        'statuses',

        function($scope, $state, $http, $toast, statuses) {

            $scope.params = angular.copy($state.params);
            $scope.projectKey = $state.params.key;
            $scope.estimations = [];
            $scope.filtrations = [{
                value: 'Все',
                name: 'all'
            }];
            $scope.filter = $scope.filtrations[0];
            $scope.statuses = statuses;
            $scope.hideDone = true;

            function init() {
                getEstimations();
            }
            init();

            var needed = false;
            $scope.statusFilter = function(data) {

                needed = false;

                if($scope.hideDone && data.status.name.toLowerCase() === 'closed') {
                    return false;
                }

                if($scope.filter.name === 'all') return true;
                else if($scope.filter.name === data.status.name) {
                    return true;
                } else {
                    return false;
                }

                return needed;
            }

            $scope.deleteEstimation = function (key) {
                $http({
                    url: 'estimations/' + key,
                    method: 'DELETE',
                }).success(function (res) {
                    $toast({message: 'Эстимация удалена', theme:'success'});
                    getEstimations();
                });
            };

            function getEstimations() {
                $http({
                    url: 'projects/estimations/' + $scope.params.key,
                    method: 'GET',
                }).success(function (res) {
                    $scope.estimations = res;
                    prepareFiltrations();
                });
            }

            function prepareFiltrations() {
                $scope.estimations.forEach(function (est) {

                    var found = false;
                    for(var i = 0; i < $scope.filtrations.length; i++) {
                        if ($scope.filtrations[i].name == est.status.name) {
                            found = true;
                            break;
                        }
                    }

                    if(!found) $scope.filtrations.push(est.status);
                });
            }
        }
    ]);