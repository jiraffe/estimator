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
            $scope.statuses = statuses;

            console.log($scope.params);

            function init() {
                getEstimation();
            }

            init();

            function getEstimation() {
                $http({
                    url: 'estimations/' + $scope.params.key,
                    method: 'GET',
                }).success(function (res) {
                    $scope.estimation = res;
                    $scope.estimation.sections.forEach(function (el) {
                        el.subSections.forEach(function (el) {
                            if (el.estimation === undefined) {
                                el.estimation = {};
                            }
                        });
                    });
                    initTotals();
                });
            }

            function initTotals() {
                reinitTotals();
                $scope.estimation.total = function () {
                    var total = 0;
                    $scope.estimation.sections.forEach(function (sec) {
                        total += sec.total();
                    });
                    total += ($scope.estimation.coordination || 0) +
                        ($scope.estimation.stabilization || 0) +
                        ($scope.estimation.estimationTime || 0);
                    return total;
                }
            }

            function reinitTotals() {
                $scope.estimation.sections.forEach(function (sec) {
                    sec.total = getSectionTotal(sec);
                });
            }

            function getSectionTotal(section) {
                section.subSections.forEach(function (sub) {
                    sub.total = getSubsectionTotal(sub);
                });

                return function () {
                    var total = 0;
                    section.subSections.forEach(function (sub) {
                        total += sub.total();
                    });

                    return total;
                }
            }

            function getSubsectionTotal(sub) {
                return function () {
                    return (sub.estimation.DB || 0) + (sub.estimation.Java || 0) + (sub.estimation.UI || 0);
                }
            }

            function recalcSections() {
                $scope.estimation.sections.forEach(function (el, idx) {
                    el.number = idx + 1 + "";
                    el.subSections.forEach(function (subEl, subIdx) {
                        subEl.subNum = el.number + "." + (subIdx + 1);
                    });
                });
            };

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
                    url: 'estimations',
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
                    var sectionNum = $scope.estimation.sections.length + 1;
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
                    reinitTotals();
                }],
                null,
                ['Удалить секцию', function (item) {
                    $scope.estimation.sections.splice(item.section.number - 1, 1);
                    recalcSections();
                }]
            ];

            $scope.subSectionMenu = [
                ['Добавить под-секцию', function (item) {
                    var sectionNum = item.$parent.section.number - 1;
                    $scope.estimation.sections[sectionNum].subSections.push({
                        estimation: {
                            DB: undefined,
                            Java: undefined,
                            UI: undefined
                        }
                    });
                    reinitTotals();
                    recalcSections();
                }],
                null,
                ['Удалить под-секцию', function (item) {
                    var sectionNum = item.$parent.section.number - 1;
                    var subSectionNum = item.sub.subNum * 10 % 10;

                    $scope.estimation.sections[sectionNum].subSections.splice(subSectionNum - 1, 1);

                    recalcSections();
                }]
            ];

            $scope.print = function () {
                var DocumentContainer = document.getElementById('estimation');
                var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
                WindowObject.document.writeln('<!DOCTYPE html>');
                WindowObject.document.writeln('<html><head><title></title>');
                WindowObject.document.writeln('<link rel="stylesheet" type="text/css" href="styles/estimationTable.css">');
                WindowObject.document.writeln('</head><body>')

                WindowObject.document.writeln(DocumentContainer.innerHTML);

                WindowObject.document.writeln('</body></html>');

                WindowObject.document.close();
                WindowObject.focus();
                //WindowObject.print();
                //WindowObject.close();
            }
        }

    ]);