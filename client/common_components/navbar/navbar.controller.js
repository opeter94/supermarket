'use strict';

angular.module('supermarketApp')
    .controller('NavbarController', function ($scope, $http, $uibModal, $interval, auth) {
        $scope.isLoggedIn = function() {
            return auth.isLoggedIn;
        };

        $scope.isAdmin= function() {
            return auth.isAdmin;
        };

        $scope.logout = auth.logout;
    });
