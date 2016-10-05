'use strict';

angular.module('supermarketApp')
    .controller('PageNotFoundController', function ($scope, $timeout, $interval, $window) {
        $scope.secondsBeforeRedirection = 5;
        $scope.myNumber = 1;
        $timeout(function () {
            $window.location.href = '/';
            $scope.myNumber = 2;
        }, $scope.secondsBeforeRedirection * 1000);
        $interval(function () {
            --$scope.secondsBeforeRedirection;
        }, 1000);
    });