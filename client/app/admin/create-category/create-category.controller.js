'use strict';

angular.module('supermarketApp')
    .controller('CreateCategoryController', function ($scope, $http, $uibModalInstance, $timeout, requiredInputMarker) {
        $uibModalInstance.rendered.then(function () {
            requiredInputMarker.markLabelsOfRequiredInputs();
        });
        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/createCategory',
                data: {category: $scope.category}
            })
                .then(function (response) {
                    alert('Category successfully added.');
                    $uibModalInstance.close($scope.category);
                }, function (response) {
                    alert('Category already exists!');
                });
        }
    });