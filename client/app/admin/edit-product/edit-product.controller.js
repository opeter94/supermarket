'use strict';

angular.module('supermarketApp')
    .controller('EditProductController', function ($scope, $http, $uibModalInstance, $timeout, requiredInputMarker, product) {
        $scope.editedProduct = JSON.parse(JSON.stringify(product));
        // category of product has to be set manually on client side to avoid trying to write circular structure to json
        $scope.categories.forEach(function(category) {
            if (category.categoryId === product.categoryId) {
                $scope.editedProduct.category = category;
            }
        });

        $uibModalInstance.rendered.then(function () {
            requiredInputMarker.markLabelsOfRequiredInputs();
        });

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/editProduct',
                data: {product: $scope.editedProduct}
            })
                .then(function (response) {
                    alert('Product successfully edited.');
                    $uibModalInstance.close($scope.editedProduct);
                }, function (response) {
                    if (response.status === 409) {
                        alert('Product name already exists! Please choose a unique name!');
                    }
                });
        }
    });