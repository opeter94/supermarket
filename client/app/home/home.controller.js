'use strict';

angular.module('supermarketApp')
    .controller('HomeController', function ($scope, $http, $uibModal, auth) {
        auth.initialize();
        getCategoriesWithProducts();
        $scope.cart = {};

        function getCategoriesWithProducts() {
            $http.get('/getCategoriesWithProducts')
                .then(function (response) {
                    $scope.categories = response.data;
                    sortCategoriesAndProducts();
                    $scope.selectedCategory = $scope.categories[0];
                });
        }

        function sortCategoriesAndProducts() {
            $scope.categories.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            $scope.categories.forEach(function(category) {
                category.products.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            })
        }

        $scope.selectCategory = function(category) {
            $scope.selectedCategory = category;
        };

        $scope.buy = function() {
            $http({
                method: 'POST',
                url: '/buy',
                data: {cart: $scope.cart}
            })
                .then(function (response) {
                    //alert('Successful purchase.');
                    $uibModal.open({
                        template: 'Purchase successful.',
                        width: 100,
                        height: 50
                    });
                    $scope.cart = {};
                }, function (response) {
                    if (res.status === 401) {
                        alert('Please login.');
                    } else {
                        alert('Error while purchasing.');
                    }
                });
        };

        $scope.search = function() {
            $http({
                method: 'GET',
                url: '/search',
                params: {searchField: $scope.searchField}
            })
                .then(function (response) {
                    $scope.categories = response.data;
                    sortCategoriesAndProducts();
                    $scope.selectedCategory = $scope.categories[0];
                })
        };

        $scope.openAddToCartModal = function (product) {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/home/add-to-cart/add-to-cart.html',
                controller: 'AddToCartController',
                resolve: {
                    product: product,
                    cart: $scope.cart
                },
                scope: $scope
            });
            $scope.modalInstance.result
                .then(function (addedProduct) {

                });
        };
    });