'use strict';

angular.module('supermarketApp')
    .controller('CreateProductController', function ($scope, $http, $uibModalInstance, $timeout, requiredInputMarker) {
        $uibModalInstance.rendered.then(function () {
            requiredInputMarker.markLabelsOfRequiredInputs();
        });
        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.createProduct = function () {
            $http({
                method: 'POST',
                url: '/createProduct',
                data: {product: $scope.product}
            })
                .then(function (response) {
                    alert('Product successfully added.');
                    $uibModalInstance.close($scope.product);
                }, function (response) {
                    if (response.status === 409) {
                        alert('Product already exists!');
                    }
                });
        }
    });