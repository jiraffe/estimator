/**
 * Created by dzmitry_dubrovin on 25-Dec-16.
 */
angular.module('estimator')
    .service('TranslationService', function($resource) {

    this.getTranslation = function($scope, language) {
        var languageFilePath = 'translations/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});