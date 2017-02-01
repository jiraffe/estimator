"use strict";

angular.module('estimator')
    .controller('LoginController',

        function ($scope, $http, $toast, $state, $mdDialog, AuthService, $rootScope, AUTH_EVENTS) {

            $scope.user = {};
            $scope.mode = 'login'; // Register, Forgot password
            $scope.modes = {
                "login": "Вход в систему",
                "register": "Регистрация",
                "forgot password": "Восстановление пароля"
            }

            $scope.changeMode = function (mode) {
                $scope.mode = mode;
            };

            $scope.login = function () {
                AuthService.login($scope.user)
                    .then(function (user) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $toast({message: "Вы успешно вошли под ником: " + $scope.user.login, theme: 'success'});
                        $state.go("projects");
                    })
                    .catch(function () {
                        $toast({message: "Пользователь не найден или пароль не верен", theme: 'warning'});
                    });
            };

            $scope.resetPassword = function () {
                $http.get('users/password/reset', {
                        params: {email: $scope.user.email}
                    })
                    .success(function (res) {
                        $toast({message: "Пароль изменён. Новый пароль: " + res.newPass, delay: 10000});
                        $scope.mode = 'login';
                    });
            };

            $scope.register = function () {

                prepareNewUser();

                $http({
                    url: 'users/register',
                    method: 'POST',
                    data: $scope.user
                })
                    .success(function (res) {
                        $toast({message: "Registration successful!", theme: 'success'});
                        $scope.mode = 'login';
                    })
                    .error(function (res) {
                        console.log('error:', res);
                        if (res.errors.code === 11000) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(true)
                                    .title('Ну как так..')
                                    .textContent('Пользователь с таким логином или почтой уже существует.')
                                    .ok('Всё ясно!')
                            );
                        }
                    });
            };

            function prepareNewUser() {
                $scope.user.language = {
                    key: 'ru',
                    value: 'Русский'
                }
            }
        }
    );