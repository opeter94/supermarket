'use strict';

angular.module('supermarketApp')
    .controller('LoginController', function ($scope, $http) {
        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/login',
                data: {
                    user: {
                        userName: $scope.user.userName,
                        password: CryptoJS.MD5($scope.user.password).toString()
                    }
                }
            })
        };

    });