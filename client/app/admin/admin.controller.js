'use strict';

angular.module('supermarketApp')
    .controller('AdminController', function ($scope, $http, $uibModal, requiredInputMarker) {
        requiredInputMarker.markLabelsOfRequiredInputs();
        getCategoriesWithProducts();

        function getCategoriesWithProducts() {
            $http.get('/getCategoriesWithProducts')
                .then(function (response) {
                    $scope.categories = response.data;
                    sortCategoriesAndProducts()
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

        $scope.openCreateCategoryModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/create-category/create-category.html',
                controller: 'CreateCategoryController'
            });
            $scope.modalInstance.result
                .then(function (newCategory) {
                    getCategoriesWithProducts();
                });
        };

        $scope.openCreateProductModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/create-product/create-product.html',
                controller: 'CreateProductController',
                scope: $scope
            });
            $scope.modalInstance.result
                .then(function (newProduct) {
                    getCategoriesWithProducts();
                });
        };

        $scope.openEditCategoryModal = function (category) {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/edit-category/edit-category.html',
                controller: 'EditCategoryController',
                resolve: {
                    category: category
                }
            });
            $scope.modalInstance.result
                .then(function (editedCategory) {
                    getCategoriesWithProducts();
                });
        };

        $scope.openEditProductModal = function (product) {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/edit-product/edit-product.html',
                controller: 'EditProductController',
                resolve: {
                    product: product
                },
                scope: $scope
            });
            $scope.modalInstance.result
                .then(function (editedProduct) {
                    getCategoriesWithProducts();
                });
        };
    });
