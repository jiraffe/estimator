/**
 * Created by dzmitry_dubrovin on 12-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('EstimationAddController', [

        '$scope',
        '$state',
        '$http',
        '$toast',

        function ($scope, $state, $http, $toast) {

            $scope.params = angular.copy($state.params);
            $scope.editMode = !!$scope.params.key;
            $scope.estimation = {
                key: undefined,
                projectKey: $scope.params.projectKey,
                status: {
                    name: 'New',
                    value: 'NEW',
                    style: 'blue-grey'
                }
            };

            $scope.init = function () {

                if ($scope.editMode) {
                    initForEdit();
                } else {
                    initForCreate();
                }
            };

            function initForEdit() {
                $http.get('projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key)
                    .then(function (res) {
                        $scope.estimation = res.data[0];
                    });
            }

            function initForCreate() {
                $http.get('projects/' + $scope.params.projectKey)
                    .then(function (res) {
                        $scope.estimation.estimationModel = res.data[0].estimationModel;
                    });
            };


            $scope.$watch(
                'estimation.key',
                function (newVal, oldVal) {
                    if (!newVal) return;
                    $scope.estimation.key = newVal.replace(/\/{0,}/g, '');
                }
            );

            $scope.add = function () {

                if (!$scope.addEstimationForm.$valid) {
                    return;
                }

                var url = $scope.editMode ?
                'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key :
                    'estimations';

                if (!$scope.editMode) {
                    initDefaultSections();
                }

                if ( ! $scope.estimation.estimationModel.estimationTimeNeeded && $scope.editMode) {
                    $scope.estimation.analysis = undefined;
                }

                if (
                    $scope.estimation.estimationModel.estimationTimeNeeded &&
                    $scope.editMode && $scope.estimation.analysis.subSections.length === 0) {
                    setAnalysisSection();
                }

                $http({
                    url: 'estimations',
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    var message = $scope.editMode ?
                        $scope.translation.ESTIMATIONS.MSGS.SAVED :
                        $scope.translation.ESTIMATIONS.MSGS.ADDED;
                    $toast({message: message, theme: 'success'});
                    $state.go('projectEstimations', {key: $scope.params.projectKey});
                });
            }

            function initDefaultSections() {
                $scope.estimation.sections = [{
                    name: undefined,
                    subSections: [
                        {
                            descr: undefined,
                            estimation: []
                        }
                    ]
                }];

                if ($scope.estimation.estimationModel.estimationTimeNeeded) {
                    setAnalysisSection();
                } else {
                    $scope.estimation.analysis = undefined;
                }
            }

            function setAnalysisSection() {
                $scope.estimation.analysis = {
                    subSections: [
                        {
                            descr : null,
                            estimation: null
                        }
                    ]
                }
            }
        }

    ]);