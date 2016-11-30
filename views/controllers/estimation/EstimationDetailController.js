/**
 * Created by dzmitry_dubrovin on 11-Nov-16.
 */
"use strict";

angular.module('estimator')
    .controller('EstimationDetailController', [

        '$scope',
        '$state',
        '$http',
        'StorageService',
        'BroadcastService',
        '$stateParams',
        '$growl',
        'statuses',

        function ($scope, $state, $http, StorageService, BroadcastService, $stateParams, $growl, statuses) {

            $scope.params = angular.copy($state.params);
            $scope.estimation = {};
            $scope.project = {};
            $scope.esModel = {};
            $scope.statuses = statuses;

            $scope.init = function () {
                $http.get("projects/" + $scope.params.projectKey)
                    .then(function (res) {
                        $scope.project = res.data[0];
                        $scope.esModel = $scope.project.estimationModel;
                    }).then(getEstimation);
            }

            function getEstimation() {
                $http({
                    url: 'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key,
                    method: 'GET',
                }).success(function (res) {
                    $scope.estimation = res[0];
                    if(! $scope.estimation.sections ||  $scope.estimation.sections.length === 0) {
                        $scope.estimation.sections = [];
                        return;
                    }
                });
            }

            $scope.changeStatus = function () {
                $http({
                    url: 'estimations',
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    $growl.addMessage('Success', 'Статус изменён', 'success');
                });
            }

            $scope.save = function () {
                $http({
                    url: 'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key,
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    $growl.addMessage('Success', 'Эстимация сохранена', 'success');
                    if($scope.params.projectKey) {
                        $state.go('projectEstimations', {key: $scope.params.projectKey});
                    } else {
                        $state.go('estimations');
                    }
                });
            };

            $scope.sectionMenu = [
                ['Добавить секцию', function () {
                    var sectionNum = ($scope.estimation.sections && $scope.estimation.sections.length > 0) ?
                    $scope.estimation.sections.length + 1 :
                    1;
                    $scope.estimation.sections.push({
                        number: sectionNum,
                        subSections: [
                            {
                                subNum: sectionNum + 0.1,
                                estimation: {
                                    DB: undefined,
                                    Java: undefined,
                                    UI: undefined
                                }
                            }
                        ]
                    });
                }],
                null,
                ['Удалить секцию', function (item) {
                    $scope.estimation.sections.splice(item.section.number - 1, 1);
                }]
            ];

            $scope.subSectionMenu = [
                ['Добавить под-секцию', function (item) {
                    var sectionNum = item.$parent.section.number - 1;
                    $scope.estimation.sections[sectionNum].subSections.push({
                        estimation: []
                    });
                }],
                null,
                ['Удалить под-секцию', function (item) {
                    var sectionNum = item.$parent.section.number - 1;
                    var subSectionNum = item.sub.subNum * 10 % 10;

                    $scope.estimation.sections[sectionNum].subSections.splice(subSectionNum - 1, 1);
                }]
            ];

            $scope.print = function () {
                var DocumentContainer = document.getElementById('estimation');
                var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
                WindowObject.document.writeln('<!DOCTYPE html>');
                WindowObject.document.writeln('<html><head><title>' + $scope.estimation.key + '</title>');
                WindowObject.document.writeln('<link rel="stylesheet" type="text/css" href="styles/estimationTable.css">');
                WindowObject.document.writeln('</head><body>')

                WindowObject.document.writeln(DocumentContainer.innerHTML);

                WindowObject.document.writeln('</body></html>');

                WindowObject.document.close();
                WindowObject.focus();
            }
        }

    ]);