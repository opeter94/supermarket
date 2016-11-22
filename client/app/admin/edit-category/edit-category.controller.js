'use strict';

angular.module('supermarketApp')
    .controller('EditCategoryController', function ($scope, $http, $uibModalInstance, $timeout, requiredInputMarker, category) {
        $scope.category = category;
        $scope.newCategoryName = category.name;
        $uibModalInstance.rendered.then(function () {
            requiredInputMarker.markLabelsOfRequiredInputs();
        });

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.submit = function () {
            var editedCategory = JSON.parse(JSON.stringify($scope.category));
            editedCategory.name = $scope.newCategoryName;
            $http({
                method: 'POST',
                url: '/editCategory',
                data: {category: editedCategory}
            })
                .then(function (response) {
                    alert('Category successfully edited.');
                    $uibModalInstance.close(editedCategory);
                }, function (response) {
                    if (response.status === 409) {
                        alert('Category name already exists! Please choose a unique name!');
                    }
                });
        }
    });