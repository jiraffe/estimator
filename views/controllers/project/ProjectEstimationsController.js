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
            $scope.hideDone = false; // true
            $scope.selectedFields = [];
            $scope.estFields = [];
            $scope.primary = 'purple';
            var baseFieldNames = ['summary', 'status', 'workEndDate'];

            function init() {
                getEstimations();
                $http.get('estimationModels')
                    .then(function (res) {
                        $scope.estFields = res.data;
                        $scope.estFields.forEach((el) => {
                            if(baseFieldNames.indexOf(el.fieldName) !== -1) {
                                $scope.selectedFields.push(el);
                            }
                        });
                    })
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
                    $toast({message: $scope.translation.ESTIMATIONS.MSGS.DELETED, theme:'success'});
                    getEstimations();
                });
            };

            function getEstimations() {
                $http({
                    url: 'projects/estimations/' + $scope.params.key,
                    method: 'GET',
                }).then(function (res) {
                    $scope.estimations = res.data;
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