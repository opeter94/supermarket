'use strict';

angular.module('supermarketApp')
    .controller('PageNotFoundCtrl', function ($scope, $timeout, $interval, $window) {
        $scope.secondsBeforeRedirection = 5;
        $timeout(function() {
            $window.location.href = '/';
        }, $scope.secondsBeforeRedirection * 1000);
        $interval(function() {
            --$scope.secondsBeforeRedirection;
        }, 1000);
    });