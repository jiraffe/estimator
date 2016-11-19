/**
 * Created by dzmitry_dubrovin on 13-Nov-16.
 */

angular.module('estimator')
    .directive('contenteditable', function($uibModal) {

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                type:   '@'
            },
            link: function (scope, element, attrs, ngModel) {

                ngModel.$render = function () {
                    element.html(ngModel.$viewValue);
                };

                element.on('blur', function () {
                    scope.$apply(read);
                });

                function read() {
                    var html = element.html();

                    var tmp = document.createElement("DIV");
                    tmp.innerHTML = html;
                    var value = tmp.textContent || tmp.innerText || "";

                    if(attrs.type === 'number') {
                        value = value.replace(',', '.');
                        ngModel.$setViewValue(+value);
                    } else {
                        ngModel.$setViewValue(value);
                    }
                }
            }
        }

});