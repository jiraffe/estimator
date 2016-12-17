/**
 * Created by dzmitry_dubrovin on 11-Dec-16.
 */
angular.module('estimator')
    .controller('UserProfileController',

        function ($scope, $rootScope, $http, $toast, $state, AuthService, AUTH_EVENTS) {

            $scope.user = AuthService.user;

            $scope.save = function () {
                $http({
                    url: 'users/profile/update',
                    method: 'POST',
                    data: $scope.user
                })
                    .then(function (res) {
                        console.log(res);
                        $toast({message:'Профайл обновлен', theme: 'success'})
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

        });