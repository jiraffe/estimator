/**
 * Created by dzmitry_dubrovin on 13-Dec-16.
 */
angular.module('estimator')
    .service('Session',
        function () {
                this.create = function (userId, userLogin, userRole) {
                        this.userId = userId;
                        this.userLogin = userLogin;
                        this.userRole = userRole;
                };
                this.destroy = function () {
                        this.userId = undefined;
                        this.userLogin = undefined;
                        this.userRole = undefined;
                };
        });