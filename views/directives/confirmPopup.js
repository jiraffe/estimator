'use strict';

angular.module('estimator')
	.directive('confirmPopup', function($uibModal) {
		return {
			restrict: 'A',
			link: function($scope, $elem, $attrs) {
				var action = 'click';
				if ($scope.change) {
					action = 'change';		
				}
				$elem.on(action, function () {
					var size = $scope.size || 'sm';

					$uibModal.open({
						templateUrl: '/views/popups/confirmPopup.html',
						size: size,
						controller: 'ConfirmPopupCtrl',
						backdrop: 'static',
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
	.controller('ConfirmPopupCtrl', function ($scope, params, buttons) {


		$scope.params = angular.copy(params);
		$scope.buttons = angular.copy(buttons);

		$scope.buttons.confirmButton = $scope.buttons.confirmButton || 'Да';
		$scope.buttons.cancelButton = $scope.buttons.cancelButton || 'Нет';

		$scope.params.confirmTitle = $scope.params.confirmTitle || 'Подтверждение';
		$scope.params.confirmText = $scope.params.confirmText || 'Подтвердите действие';		
		$scope.params.isDisabled = $scope.params.isDisabled || false;
		$scope.params.reasonDisabled = $scope.params.reasonDisabled || $scope.params.confirmTitle;
		$scope.params.paramForConfirm= $scope.params.paramForConfirm;
		$scope.params.paramForCancel =  $scope.params.paramForCancel;

		$scope.submit = function () {
			if($scope.params.confirmMethod) {
				$scope.params.confirmMethod();
			}				
			$scope.$close();
		};

		$scope.cancel = function() {
			if($scope.params.cancelMethod) {
				$scope.params.cancelMethod();
			}			
			$scope.$close();
		};


		function init() {
			if($scope.params.timeoutMethod) $scope.params.timeoutMethod();
		}

		init();
	});