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
    'ngFileUpload'
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


app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    profileLoaded: 'user-profile-loaded',
    profileChanged: 'user-profile-changed',
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    user: 'user'
})

app.run(function($rootScope, $state, StatusService, AUTH_EVENTS, AuthService) {
    $rootScope.$state = $state;
    
    AuthService.loadUser();
    
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

    $rootScope.$on('stateChangeStart', function (event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        if ( ! AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                // user is not allowed
                $state.go('projects');
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $state.go('login');
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, next) {
        if (next.data) {
            document.title = next.data.title;
        }
        $rootScope.pageTitle = next.data.title;
        $rootScope.pageName = next.name;
    });
});