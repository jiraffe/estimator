var app = angular.module('estimator', ['ui.router', 'growl', 'ngCookies', 'ui.bootstrap', 'ui.bootstrap.contextMenu']);
var ip = undefined;
var debug = true;
var urlPrefix = debug ? 'http://127.0.0.1:3000/' : 'http://192.168.1.60:3000/';
$.get( "http://ipv4.myexternalip.com/json", function( data ) {
    if (debug) return;
    ip = data.ip;
    if(ip !== '86.57.161.116') {
        urlPrefix = 'http://86.57.161.116:3000/';
    }
});

app.config([

    '$httpProvider',
    '$animateProvider',
    '$compileProvider',

    function($httpProvider, $animateProvider, $compileProvider) {

        var requestInterceptor = function($q, StorageService){
            return {
                'request': function (config) {


                    if(config.url.indexOf(".") === -1) {
                        config.url = urlPrefix + config.url;
                    }
                    return config || $q.when(config);
                }
            }
        };

        $httpProvider.interceptors.push(requestInterceptor);
    }
]);

app.run(function($rootScope, $state, StatusService) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
        if (toState.data) {
            document.title = toState.data.title;
        }
        $rootScope.pageTitle = toState.data.title;
        $rootScope.pageName = toState.name;
    });
});