/**
 * Created by dzmitry_dubrovin on 11-Dec-16.
 */
angular.module('estimator')
    .controller('UserProfileController',

        function ($scope, $rootScope, $http, $toast, $state, AuthService, AUTH_EVENTS) {

            $scope.user = AuthService.user;

            $scope.languages = [{
                key: 'en',
                value: 'English'
            },{
                key: 'ru',
                value: 'Русский'
            }];

            $scope.save = function () {
                $http({
                    url: 'users/profile/update',
                    method: 'POST',
                    data: $scope.user
                })
                    .then(function (res) {
                        AuthService.user = $scope.user;
                        $rootScope.$broadcast(AUTH_EVENTS.profileChanged);
                        $toast({message:$scope.translation.USER.MSGS.PROFILE_CHANGED, theme: 'success'});
                    })
            };

            $scope.changeAvatar = function()    {
                var formData = new FormData();
                    formData.append('file', $scope.picFile);
                $http.post('users/changeAvatar', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(){
                    $rootScope.$broadcast(AUTH_EVENTS.profileChanged);
                    $scope.user.avatarName = $scope.picFile.name;
                    $scope.picFile = undefined;
                },function(err){
                    console.err(err);
                });
            };

            $scope.init = function () {
                $scope.languages.forEach(function (lang, idx) {
                    if(lang.key === $scope.user.language.key) {
                        $scope.user.language = $scope.languages[idx];
                    }
                })
            }
        });