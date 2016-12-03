/**
 * Created by dzmitry_dubrovin on 03-Dec-16.
 */
angular.module('estimator')
    .service('$toast', [

        '$mdToast',

        function ($mdToast) {

            var API = function (opts) {

                theme = (opts.theme || 'default') + '-toast-theme';

                $mdToast.show({
                    templateUrl: 'views/popups/toast.html',
                    hideDelay: opts.delay || 1000,
                    position: 'top right',
                    controller: 'ToastController',
                    locals: {message: opts.message},
                    toastClass: theme
                });
            };

            return API;
        }])

    .controller('ToastController', function ($scope, message, $mdToast) {

        $scope.message = message;

        $scope.closeToast = function () {
            $mdToast.hide();
        };
    })