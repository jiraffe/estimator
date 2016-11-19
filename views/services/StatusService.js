/**
 * Created by dzmitry_dubrovin on 16-Nov-16.
 */
"use strict";

angular.module('estimator')
    .service('StatusService', function($http){

            var statuses = [];

            var promise = $http({method:'GET', url:'estimations/statuses'}).then(function (res) {
                statuses = res.data;
                return res.data;
            });

            return {
                statuses: statuses,
                promise: promise
            };
        }
    );