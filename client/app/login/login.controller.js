'use strict';

angular.module('supermarketApp')
    .controller('LoginController', function ($scope, $http, $window) {
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
            }).then(function (response) {
                $window.location.href = '/';
            }, function (response) {
                if (response.status === 404) {
                    alert('Wrong username/password.');
                }
            });
        };
    });