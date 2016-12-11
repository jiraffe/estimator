/**
 * Created by dzmitry_dubrovin on 11-Dec-16.
 */
angular.module('estimator')
    .controller('UserProfileController',

        function ($scope, $http, $toast, $state) {

            $scope.user = {};

            $scope.getUserProfile = function () {
                $http.get('users/profile')
                    .success(function (res) {
                        $scope.user = res;
                    })
            };

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

            $scope.changeAvatar = function(){
                var formData = new FormData();
                angular.forEach($scope.files,function(obj){
                    formData.append('file', obj.lfFile);
                });
                $http.post('users/changeAvatar', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(result){
                    console.log(result);
                    $scope.getUserProfile();
                },function(err){
                    console.log(err);
                });
            };

        });