'use strict';

angular.module('supermarketApp')
    .controller('AdminController', function ($scope, $http, $uibModal, requiredInputMarker) {
        requiredInputMarker.markLabelsOfRequiredInputs();
        getCategories();

        function getCategories() {
            $http.get('/getCategories')
                .then(function (response) {
                    $scope.categories = response.data;
                });
        }

        $scope.getProducts = function (category) {
            $http({
                method: 'GET',
                url: '/getProducts',
                params: {categoryId: category.id}
            })
                .then(function (response) {
                    $scope.products = response.data;
                })
        };

        $scope.openCreateCategoryModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/create-category/create-category.html',
                controller: 'CreateCategoryController'
            });
            $scope.modalInstance.result
                .then(function (newCategory) {
                    $scope.categories.push(newCategory);
                });
        };

        $scope.openCreateProductModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: '/app/admin/create-product/create-product.html',
                controller: 'CreateProductController'
            });
            $scope.modalInstance.result
                .then(function (newProduct) {
                    //$scope.products.push(newProduct);
                });
        };
    });