'use strict';

angular.module('estimator')
	.directive('confirmPopup', function($mdDialog) {
		return {
			restrict: 'A',
			link: function($scope, $elem) {
				var action = 'click';
				if ($scope.change) {
					action = 'change';		
				}
				$elem.on(action, function () {

					$mdDialog.show({
						templateUrl: '/views/popups/confirmPopup.html',
						controller: 'ConfirmPopupCtrl',
						resolve: {
							params: function () {
								return {
									confirmMethod : $scope.confirmMethod,
									cancelMethod: $scope.cancelMethod,
									confirmTitle : $scope.confirmTitle,
									confirmText : $scope.confirmText,
									timeoutMethod: $scope.timeoutMethod,
									isDisabled: $scope.isDisabled,
									reasonDisabled: $scope.reasonDisabled
								};
							},
							buttons: function () {
								return {
									confirmButton: $scope.confirmButton,
									cancelButton: $scope.cancelButton
								};
							}
						}
					});
				});
			},
			scope: {
				confirmMethod: '&',
				cancelMethod: '&',
				timeoutMethod: '&',	
				confirmTitle: '@',
				confirmText: '@',				
				isDisabled: '@',
				reasonDisabled: '@',
				size: '@',
				confirmButton: '@',
				cancelButton: '@',
				change: '@'
			}
		};
	})
	.controller('ConfirmPopupCtrl', function ($scope, params, buttons, $mdDialog) {


		$scope.params = angular.copy(params);
		$scope.buttons = angular.copy(buttons);

		$scope.buttons.confirmButton = $scope.buttons.confirmButton || 'Да';
		$scope.buttons.cancelButton = $scope.buttons.cancelButton || 'Нет';

		$scope.params.confirmTitle = $scope.params.confirmTitle || 'Подтверждение';
		$scope.params.confirmText = $scope.params.confirmText || 'Подтвердите действие';		
		$scope.params.isDisabled = $scope.params.isDisabled || false;
		$scope.params.reasonDisabled = $scope.params.reasonDisabled || $scope.params.confirmTitle;

		$scope.execute = function () {
			if($scope.params.confirmMethod) {
				$scope.params.confirmMethod();
			}
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			if($scope.params.cancelMethod) {
				$scope.params.cancelMethod();
			}
			$mdDialog.cancel();
		};


		function init() {
			if($scope.params.timeoutMethod) $scope.params.timeoutMethod();
		}

		init();
	});