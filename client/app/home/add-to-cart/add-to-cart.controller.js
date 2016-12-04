'use strict';

angular.module('supermarketApp')
    .controller('AddToCartController', function ($scope, $http, $uibModalInstance, $timeout, product, cart) {
        $scope.product = product;
        $scope.product.quantity = 1;

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.addToCart = function () {
            if (!($scope.product.productId in cart)) {
                cart[$scope.product.productId] = $scope.product;
            } else {
                cart[$scope.product.productId].quantity += parseInt($scope.product.quantity);
            }
            $uibModalInstance.close();
        }
    });