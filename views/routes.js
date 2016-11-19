'use strict';

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
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
            .state('estimations', {
                parent: 'base',
                resolve: {
                    'StatusServiceData': function (StatusService) {
                        console.log(StatusService.statuses);
                        return StatusService.promise;
                    }
                },
                url: '/estimations',
                controller: 'EstimationsController',
                templateUrl: 'views/pages/estimation/estimations.html',
                data: {
                    title: 'Список оценок'
                }
            })
            .state('estimation', {
                parent: 'base',
                url: '/estimation/:key',
                controller: 'EstimationDetailController',
                templateUrl: 'views/pages/estimation/estimation.html',
                data: {
                    title: 'Оценка'
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
    }
);