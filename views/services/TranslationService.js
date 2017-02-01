/**
 * Created by dzmitry_dubrovin on 25-Dec-16.
 */
angular.module('estimator')
    .service('TranslationService', function ($resource, $http) {

        var API = {};
        API.translation = {};
        API.currentLang = 'ru';

        var getLangPath = function (lang) {
            return 'translations/translation_' + API.currentLang + '.json';
        };

        API.getTranslation = function ($scope) {
            $resource(getLangPath()).get(function (data) {
                self.translation = data;
                $scope.translation = data;
            });
        };

        API.promise = $http({method:'GET', url:'translations/translation_' + API.currentLang + '.json'}).then(function (res) {
            API.translation = res.data;
            return res.data;
        });

        return API;
    });