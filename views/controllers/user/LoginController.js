"use strict";

angular.module('estimator')
    .controller('LoginController',

        function ($scope, $http, $toast, $state, $mdDialog) {

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
                $http({
                    url: 'users/login',
                    method: 'POST',
                    data: $scope.user
                })
                    .success(function (res) {
                        if (res.success) {
                            $toast({message: "Вы успешно вошли под ником: " + $scope.user.login, theme: 'success'});
                            $state.go("projects");
                        } else {
                            $toast({message: "Пользователь не найден или пароль не верен", theme: 'warning'});
                        }
                    });
            };

            $scope.test = function () {
                $http.get('users/secure', {withCredentials: true})
                    .success(function () {
                        console.log(arguments);
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
                $http({
                    url: 'users/register',
                    method: 'POST',
                    data: $scope.user
                })
                    .success(function (res) {
                        console.log(res);
                        $toast({message: "Вы успешно зарегистрировались!", theme: 'success'});
                        $scope.mode = 'login';
                    })
                    .error(function (res) {
                        console.log('error:', res);
                        if(res.errors.code === 11000) {
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
        }
    );