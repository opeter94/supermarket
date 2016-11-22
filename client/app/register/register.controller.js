'use strict';

angular.module('supermarketApp')
    .controller('RegisterController', function ($scope, $http, $uibModal, $window, requiredInputMarker) {
        requiredInputMarker.markLabelsOfRequiredInputs();
        getCities();

        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/createUser',
                data: {
                    user: {
                        userName: $scope.user.userName,
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.user.email,
                        cityId: $scope.user.city.cityId,
                        address: $scope.user.address,
                        password: CryptoJS.MD5($scope.user.password).toString()

                    }
                }
            }).then(function (response) {
                $window.location.href = '/';
            }, function (response) {
                if (response.status === 409) {
                    alert('Username already in use.');
                }
            });
        };

        function getCities() {
            $http.get('/getCities')
                .then(function (response) {
                    $scope.cities = response.data;
                    $scope.cities.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                });
        }

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