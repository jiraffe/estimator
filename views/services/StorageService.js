"use strict";

angular.module('estimator')
    .service('StorageService', [

        '$cookieStore',

        function($cookieStore) {

            var storageType = {
                LOCAL_STORAGE: 'LOCAL_STORAGE',
                COOKIE: 'COOKIE'
            }

            var configs = {
                Authorization: {
                    name: 'Authorization',
                    storage: storageType.LOCAL_STORAGE
                },
                CurrentUserId: {
                    name: 'currentUserId',
                    storage: storageType.LOCAL_STORAGE
                }
            };

            var STORAGE_OPERATIONS = {
                LOCAL_STORAGE: {
                    GET: function(configName) {
                        return localStorage.getItem(configName);
                    },
                    SET: function(configName, value) {
                        localStorage.setItem(configName, value);
                    },
                    DELETE: function(configName) {
                        localStorage.removeItem(configName);
                    }
                },

                COOKIE : {
                    GET: function(configName) {
                        return $cookieStore.get(configName);
                    },
                    SET: function(configName, value)  {
                        $cookieStore.put(configName, value);
                    },
                    DELETE: function(configName) {
                        $cookieStore.remove(configName);
                    }
                }
            }

            var OPERATIONS = {
                GET: 'GET',
                SET: 'SET',
                DELETE: 'DELETE'
            };

            var processOperation = function(operation, config, value) {
                var storageType = config.storage;
                var fn = STORAGE_OPERATIONS[storageType][operation];
                return fn(config.name, value);
            };

            var removeAllConfigs = function() {
                for(var configKey in configs) {
                    processOperation(OPERATIONS.DELETE, configs[configKey]);
                }
            };

            return {
                configs: configs,
                get: function(config) {
                    return processOperation(OPERATIONS.GET, config);
                },
                set: function(config, value) {
                    return processOperation(OPERATIONS.SET, config, value);
                },
                remove: function (config) {
                    return processOperation(OPERATIONS.DELETE, config);
                },
                deleteAll: function() {
                    return removeAllConfigs();
                }
            }

        }
    ]);