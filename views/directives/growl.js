var growl = angular.module('growl', [ ])

    .service('$growl', ['$timeout', function ($timeout) {

        var growls = [ ];
        var style = 'default';
        var delayTime = 5000;

        var type;

        var icon = {
            info: 'glyphicon-info-sign',
            success: 'glyphicon-ok-sign',
            warning: 'glyphicon-exclamation-sign',
            danger: 'glyphicon-remove-sign'
        };

        var configuredDelayTime;

        this.addMessage = function (newHeaders, newMessage, newType) {
            if(newType in icon === false){
                newType = 'info';
            }
            if(style === 'default') {
                type = 'alert-'+ newType;
            } else if(style = 'gray') {
                type = 'alert-gray ' + newType;
            }

            growls.push({header: newHeaders, message: newMessage, type: type, iconStyle: icon[newType]});
            $timeout(function () {
                growls.splice(0, 1);
            }, delayTime);
        };

        this.getGrowls = function() {
            return growls;
        };

        this.setStyle = function(newStyle) {
            style = newStyle;
        };

        this.setDelayTime = function(newDelayTime) {
            delayTime = newDelayTime;
        };

        this.setConfiguredDelayTime = function(delayTime) {
            configuredDelayTime = delayTime;
        };
    }])

    .controller('growlCtrl', ['$growl', function($growl) {

        this.setStyle = function(newStyle) {
            $growl.setStyle(newStyle);
        };

        this.setDelayTime = function(newDelayTime) {
            $growl.setDelayTime(newDelayTime);
        };

        this.setConfiguredDelayTime = function(newDelayTime) {
            $growl.setConfiguredDelayTime(newDelayTime);
        };

        this.getGrowls = function() {
            return $growl.getGrowls();
        };

    }])

    .directive('growl', function() {
        return {
            restrict: 'E',
            template: '<div class="box">' +
            '<div ng-repeat="growl in growls">' +
            '<div class="alert {{growl.type}} alert-dismissable growl">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true" tooltip="Закрыть" tooltip-placement="left">&times;</button>' +
            '<div class="row">' +
            '<div class="col-md-2"><span class="glyphicon {{growl.iconStyle}} icon"></span></div>' +
            '<div class="col-md-9"><strong>{{growl.header}}</strong><p>{{growl.message}}</p></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            controller: 'growlCtrl',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.setStyle(attrs.style || 'default');
                ctrl.setDelayTime(attrs.delayTime || 5000);
                ctrl.setConfiguredDelayTime(attrs.delayTime || 5000);
                scope.growls = ctrl.getGrowls();
            }

        };
    });
