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
        '$toast',
        'statuses',
        '$q',

        function ($scope, $state, $http, StorageService, BroadcastService, $stateParams, $toast, statuses, $q) {

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
                    }).then(getEstimation)
                    .then(initTotals);
            };

            function getEstimation() {
                return $http({
                    url: 'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key,
                    method: 'GET',
                }).then(function (res) {
                    $scope.estimation = res.data[0];
                    if(! $scope.estimation.sections ||  $scope.estimation.sections.length === 0) {
                        $scope.estimation.sections = [];
                    }
                });
            };

            function initTotals() {
                processSections();

                $scope.estimation.total = function () {
                    var total = $scope.estimation.estimationTime || 0;
                    total += $scope.estimation.sections.reduce((a, b) => a + b.total(), 0);

                    return total;
                }
            };

            function processSections() {
                $scope.estimation.sections.forEach(function (section, idx) {
                    section.idx = idx;
                    section.subSections.forEach(processSubsection, section);
                    section.total = function() {
                        return section.subSections.reduce((a, b) => a + b.total(), 0);
                    }
                });
            };

            function processSubsection(sub, idx) {
                var section = this;
                sub.subNum = section.number + '.' + (idx + 1);
                sub.idx = idx;
                sub.total = function () {
                    return sub.estimation.reduce((a, b) => a + b, 0);
                }
            };

            $scope.changeStatus = function () {
                $http({
                    url: 'estimations',
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    $toast({message: 'Статус изменён', theme:'success'});
                });
            };

            $scope.save = function () {
                $http({
                    url: 'projects/' + $scope.params.projectKey + '/estimation/' + $scope.params.key,
                    method: 'POST',
                    data: $scope.estimation
                }).success(function (res) {
                    $toast({message: 'Эстимация сохранена', theme: 'success'});
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
                                estimation: []
                            }
                        ]
                    });

                    initTotals();
                }],
                null,
                ['Удалить секцию', function (item) {
                    $scope.estimation.sections.splice(item.section.idx, 1);
                    initTotals();
                }]
            ];

            $scope.subSectionMenu = [
                ['Добавить под-секцию', function (item) {
                    var sectionIdx = item.$parent.section.idx;
                    $scope.estimation.sections[sectionIdx].subSections.push({
                        estimation: []
                    });
                    initTotals();
                }],
                null,
                ['Удалить под-секцию', function (item) {
                    var sectionIdx = item.$parent.section.idx;
                    var subSectionIdx = item.sub.subNum.idx;

                    $scope.estimation.sections[sectionIdx].subSections.splice(subSectionIdx, 1);
                    initTotals();
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
            };
        }

    ]);