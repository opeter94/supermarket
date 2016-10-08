'use strict';

angular.module('supermarketApp')
    .controller('RegisterController', function ($scope, $http) {
        $scope.submitForm = function() {
            $http({
                method: 'POST',
                url: '/register',
                data: {user: $scope.user},
                headers : {'Content-Type': 'application/json'}
            })
        };

    });