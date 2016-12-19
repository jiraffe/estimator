/**
 * Created by dzmitry_dubrovin on 13-Dec-16.
 */
angular.module('estimator')
    .factory('AuthService',
        function ($http, Session, $q, $state, $rootScope, AUTH_EVENTS) {

            var API = {};

            API.user = undefined;

            API.login = function (user) {
                return $http({
                    url: 'users/login',
                    method: 'POST',
                    data: user
                })
                    .then(function (res) {
                        res = res.data;
                        API.user = res;
                        initProfileImage();
                        Session.create(res._id, res.login, res._role);
                        return res;
                    })
            };

            API.isAuthenticated = function () {
                return !!Session.userId;
            };

            API.hasAccessLevel = function (requiredLevel) {
                return API.user._role.accessLevel >= requiredLevel;
            };

            API.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
            };

            API.logout = function () {
                return $http.get('users/logout')
                    .then(function () {
                        Session.destroy();
                    })
            };

            API.loadUser = function () {
                return $http.get('users/profile')
                    .then(function (res) {
                        API.user = res.data;
                        initProfileImage();
                        $rootScope.$broadcast(AUTH_EVENTS.profileLoaded, API.user);
                        if($state.current.name === 'login') {
                            $state.go('projects');
                        }
                    })
                    .catch(function (err) {
                        $state.go('login')
                    })
            };

            var blankProfile = '../../images/blank_account.png';
            function initProfileImage() {
                API.user.avatarName = API.user.avatarName ? API.user.avatarName : blankProfile;
            }

            $rootScope.$on(AUTH_EVENTS.profileChanged, function(evt) {
                API.loadUser();
            });
            
            return API;
        });