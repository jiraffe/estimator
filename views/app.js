var host = window.location.host;
var urlPrefix;
if(host.indexOf('86.57.161.116') !== -1) {
    urlPrefix = 'http://86.57.161.116:3000/';
} else if(host.indexOf('192.168.1.60') !== -1) {
    urlPrefix = 'http://192.168.1.60:3000/';
} else {
    urlPrefix = 'http://127.0.0.1:3000/';
}

var app = angular.module('estimator', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'growl',
    'ngCookies',
    'ui.bootstrap',
    'ui.bootstrap.contextMenu',
    'ngMaterial',
    'md.data.table',
    'uiRouterStyles',
    'lfNgMdFileInput'
]);


app.config([

    '$httpProvider',
    '$animateProvider',
    '$compileProvider',

    function($httpProvider, $animateProvider, $compileProvider) {

        $httpProvider.defaults.withCredentials = true;
        
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

    $rootScope.$on('$locationChangeStart', function (e, newURL, oldURL) {

        // if user reload page
        if(oldURL === newURL) {

            // for some reason location like 'project/MEDF/estimation/MEDF-64323'
            // detects as invalid by $location-service
            // so try to detect this and use appropriate state
            var urlKeys = newURL.split('/');
            var sharpPos = urlKeys.indexOf('#');
            urlKeys = urlKeys.splice(sharpPos + 1, urlKeys.length - sharpPos);
            if(urlKeys.length === 4 && urlKeys[0] === 'project' && urlKeys[2] === 'estimation') {
                e.preventDefault();
                $state.go('projectEstimation', {projectKey: urlKeys[1], key: urlKeys[3]});
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
        if (toState.data) {
            document.title = toState.data.title;
        }
        $rootScope.pageTitle = toState.data.title;
        $rootScope.pageName = toState.name;
    });
});