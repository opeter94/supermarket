'use strict';

angular.module('supermarketApp')
    .controller('CreateCityController', function ($scope, $http, $uibModalInstance, $timeout, requiredInputMarker) {
        $uibModalInstance.rendered.then(function () {
            requiredInputMarker.markLabelsOfRequiredInputs();
        });
        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.createCity = function () {
            $http({
                method: 'POST',
                url: '/createCity',
                data: {city: $scope.city}
            })
                .then(function (response) {
                    alert('City successfully added.');
                    $uibModalInstance.close($scope.city);
                }, function (response) {
                    alert('City already exists in our database! Please select it from the dropdown menu.');
                    $uibModalInstance.close();
                });
        }
    });