'use strict';

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.when('/', '/projects');
        /*if(navigator.appVersion.indexOf("MSIE 8.") === -1 && navigator.appVersion.indexOf("MSIE 9.") === -1){
         $locationProvider.html5Mode(true);
         }*/

        $stateProvider.state('base', {

                templateUrl: 'views/templates/main.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .state('index', {
                parent: 'base',
                url: '/',
                templateUrl: 'views/pages/index.html',
                data: {
                    title: 'Оценки'
                }
            })
            .state('addEstimation', {
                parent: 'base',
                url: '/estimation/add/:projectKey',
                controller: 'EstimationAddController',
                templateUrl: 'views/pages/estimation/estimationAdd.html',
                data: {
                    title: 'Оценка'
                }
            })
            .state('editEstimation', {
                parent: 'base',
                url: 'project/:projectKey/estimation/:key/edit',
                controller: 'EstimationAddController',
                templateUrl: 'views/pages/estimation/estimationAdd.html',
                data: {
                    title: 'Оценка'
                }
            })
            .state('estimation', {
                parent: 'base',
                url: '/estimation/:key',
                controller: 'EstimationDetailController',
                templateUrl: 'views/pages/estimation/estimation.html',
                data: {
                    title: 'Оценка'
                },
                resolve: {
                    'statuses': function (StatusService) {
                        return StatusService.promise;
                    }
                }
            })
            .state('projectEstimation', {
                parent: 'base',
                url: 'project/:projectKey/estimation/:key',
                controller: 'EstimationDetailController',
                templateUrl: 'views/pages/estimation/estimation.html',
                data: {
                    title: 'Оценка'
                },
                resolve: {
                    'statuses': function (StatusService) {
                        return StatusService.promise;
                    }
                }
            })
            .state('projects', {
                parent: 'base',
                url: '/projects',
                controller: 'ProjectsController',
                templateUrl: 'views/pages/project/projects.html',
                data: {
                    title: 'Проекты'
                }
            })
            .state('projectEstimations', {
                parent: 'base',
                url: '/project/:key/estimations',
                controller: 'ProjectEstimationsController',
                templateUrl: 'views/pages/estimation/estimations.html',
                data: {
                    title: 'Оценки проекта'
                },
                resolve: {
                    'statuses': function (StatusService) {
                        return StatusService.promise;
                    }
                }
            })
            .state('addProject', {
                parent: 'base',
                url: '/project/add',
                controller: 'ProjectAddController',
                templateUrl: 'views/pages/project/projectAdd.html',
                data: {
                    title: 'Создать проект'
                }
            })
            .state('editProject', {
                parent: 'base',
                url: '/project/edit/:key',
                controller: 'ProjectAddController',
                templateUrl: 'views/pages/project/projectAdd.html',
                data: {
                    title: 'Редактировать проект'
                }
            })

            //User operations
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'views/pages/user/login.html',
                data: {
                    title: 'Войти'
                }
            })
            .state('profile', {
                parent: 'base',
                url: '/user/profile',
                controller: 'UserProfileController',
                templateUrl: 'views/pages/user/profile.html',
                data: {
                    title: 'Профиль пользователя'
                }
            })
    }
);