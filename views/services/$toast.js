/**
 * Created by dzmitry_dubrovin on 03-Dec-16.
 */
angular.module('estimator')
    .service('$toast', [

        '$mdToast',

        function ($mdToast) {

            /**
             * @param opts apply
             * @code theme - style for toast. From md-colors
             * @code delay - how long toast stays at page. Default 2 sec.
             * @code message - toast message
             */
            var API = function (opts) {

                theme = (opts.theme || 'default') + '-toast-theme';

                $mdToast.show({
                    templateUrl: 'views/popups/toast.html',
                    hideDelay: opts.delay || 2000,
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