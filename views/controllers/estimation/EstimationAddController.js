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

        function($scope, $state, $http, $toast) {

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

                $http.get('projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key)
                    .success(function (res) {
                        $scope.estimation = res[0];
                })
            };

            $scope.add = function () {

                if( ! $scope.addEstimationForm.$valid) {
                    return;
                }

                var url = $scope.editMode ?
                    'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key :
                    'estimations';

                $scope.estimation.sections = [{
                    name:undefined,
                    subSections: [
                        {
                            descr : undefined,
                            estimation:[]
                        }
                    ]
                }];


                $http({
                    url: 'estimations',
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    var message = $scope.editMode ? 'Эстимация сохранена' : 'Эстимация добавлена';
                    $toast({message: message, theme:'success'});
                    $state.go('projectEstimations', {key: $scope.params.projectKey});
                });
            }
        }

    ]);