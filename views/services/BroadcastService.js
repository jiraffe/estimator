"use strict";

angular.module('estimator')
    .service('BroadcastService', [

        '$rootScope',

        function($rootScope){

            var action = function (eventKey,action,timeout) {
                if(timeout){
                    setTimeout(function() {$rootScope.$broadcast(eventKey, action);}, 20);
                }else{
                    $rootScope.$broadcast(eventKey, action);
                }


            };

            var onAction = function (eventKey,$scope, handler) {
                $scope.$on(eventKey, function (event, data) {
                    handler(data);
                });
            };


            return {
                onAction: onAction,
                action:action,
            };
        }
    ]);