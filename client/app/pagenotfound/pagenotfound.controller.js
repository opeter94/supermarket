'use strict';

angular.module('supermarketApp')
    .controller('PageNotFoundController', function ($scope, $timeout, $interval, $window, $state) {
        $scope.secondsBeforeRedirection = 5;
        $timeout(function () {
            if ($state.current.name === 'pagenotfound') {
                $window.location.href = '/';
            }
        }, $scope.secondsBeforeRedirection * 1000);
        $interval(function () {
            --$scope.secondsBeforeRedirection;
        }, 1000);
    });