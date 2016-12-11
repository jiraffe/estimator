/**
 * Created by dzmitry_dubrovin on 11-Dec-16.
 */

app.directive('equality', function($q) {
    return {
        require: 'ngModel',
        link: function($scope, $elem, $attr, ctrl) {
            ctrl.$validators.equality = function(value) {
                return value === $attr["equality"];
            };
        }
    };
});