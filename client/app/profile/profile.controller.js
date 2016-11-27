'use strict';

angular.module('supermarketApp')
    .controller('ProfileController', function ($scope, $http, $uibModal, requiredInputMarker) {
        requiredInputMarker.markLabelsOfRequiredInputs();
        getCitiesAndUser();

        function getCities() {
            $http.get('/getCities')
                .then(function (response) {
                    $scope.cities = response.data;
                    $scope.cities.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                });
        }

        function setCityOfUser() {
            $scope.cities.forEach(function (city) {
                if ($scope.user.cityId === city.cityId) {
                    $scope.user.city = city;
                }
            })
        }

        function getUser() {
            $http.get('/getUser')
                .then(function (response) {
                    $scope.user = response.data;
                    setCityOfUser();
                })
        }

        function getCitiesAndUser() {
            $http.get('/getCities')
                .then(function (response) {
                    $scope.cities = response.data;
                    $scope.cities.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    getUser();
                });
        }

        $scope.editUser = function () {
            $http({
                method: 'POST',
                url: '/editUser',
                data: {
                    user: {
                        userName: $scope.user.userName,
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.user.email,
                        cityId: $scope.user.city.cityId,
                        address: $scope.user.address
                    }
                }
            }).then(function (response) {
                getCitiesAndUser();
                alert('Changes successfully saved.');
            }, function (response) {
                $window.location.href = '/login';
            });
        };

        $scope.editPassword = function () {
            var user = $scope.user;
            if (user.password !== user.passwordConfirm) {
                alert('Passwords do not match.');
                return;
            }
            $http({
                method: 'POST',
                url: '/editPassword',
                data: {
                    user: {
                        userName: user.userName,
                        password: CryptoJS.MD5(user.password).toString()
                    }
                }
            }).then(function (response) {
                user.password = null;
                user.passwordConfirm = null;
                alert('Password successfully saved.');
            }, function (response) {
                $window.location.href = '/login';
            });
        };

        $scope.openCreateCityModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/register/create-city/create-city.html',
                controller: 'CreateCityController'
            });
            $scope.modalInstance.result
                .then(function (newCity) {
                    getCities();
                });
        };
    });
