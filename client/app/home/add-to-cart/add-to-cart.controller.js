'use strict';

angular.module('supermarketApp')
    .controller('AddToCartController', function ($scope, $http, $uibModalInstance, $timeout, product, cart) {
        $scope.product = product;
        $scope.addQuantity = 1;

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.addToCart = function () {
            if (!($scope.product.productId in cart)) {
                cart[$scope.product.productId] = $scope.product;
                $scope.product.quantity = 0;
            }
            cart[$scope.product.productId].quantity += parseInt($scope.addQuantity);
            $uibModalInstance.close();
        }
    });