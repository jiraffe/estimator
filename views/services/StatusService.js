/**
 * Created by dzmitry_dubrovin on 16-Nov-16.
 */
"use strict";

angular.module('estimator')
    .service('StatusService', function($http){

            var statuses = [];

            var promise = $http({method:'POST', url:'estimations/statuses'}).then(function (data) {
                statuses = data;
            });

            return {
                statuses: statuses,
                promise: promise
            };
        }
    );