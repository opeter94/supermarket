'use strict';

angular.module('supermarketApp')
    .controller('LoginController', function ($scope, $http, $window, $state, auth) {
        $scope.login = function () {
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
                var user = response.data;
                auth.isLoggedIn = true;
                auth.isAdmin = user.isAdmin;
                $state.go('home');
            }, function (response) {
                if (response.status === 401) {
                    alert('Invalid username/password.');
                }
            });
        };
    });