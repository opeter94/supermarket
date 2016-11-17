'use strict';

angular.module('supermarketApp')
    .controller('RegisterController', function ($scope, $http, $uibModal, requiredInputMarker) {
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
                        cityId: $scope.user.product.cityId,
                        address: $scope.user.address,
                        password: CryptoJS.MD5($scope.user.password).toString()

                    }
                }
            })
        };

        function getCities() {
            $http.get('/getCities')
                .then(function (response) {
                    $scope.cities = response.data;
                });
        }

        $scope.openCreateCityModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/register/create-city/create-city.html',
                controller: 'CreateCityController'
            });
            $scope.modalInstance.result
                .then(function (newCity) {
                    $scope.cities.push(newCity);
                });
        };
    });