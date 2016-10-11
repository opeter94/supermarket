'use strict';

angular.module('supermarketApp')
    .controller('LoginController', function ($scope, $http) {
        $scope.submitForm = function() {
            $http({
                method: 'POST',
                url: '/login',
                data: {user: $scope.user}
            })
        };

    });