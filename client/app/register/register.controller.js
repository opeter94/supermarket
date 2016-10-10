'use strict';

angular.module('supermarketApp')
    .controller('RegisterController', function ($scope, $http) {
        $scope.submitForm = function () {
            $http({
                method: 'POST',
                url: '/register',
                data: {user: $scope.user},
                headers: {'Content-Type': 'application/json'}
            })
        };

        var markLabelsOfRequiredInputs = function () {
            var labelsByInputId = {};
            Array.prototype.slice.call(document.getElementsByTagName('label'))
                .forEach(function(label) {
                    labelsByInputId[label.getAttribute('for')] = label;
                });
            var requiredInputs = Array.prototype.slice.call(document.getElementsByTagName('input'))
                .filter(function(input) {
                    return input.getAttribute('required') !== null;
                });
            var labelsOfRequiredInputs = [];
            requiredInputs.forEach(function(input) {
                labelsOfRequiredInputs.push(labelsByInputId[input.id]);
            });
            var redAsteriskHtml = '<span style="color: red;"> *</span>';
            labelsOfRequiredInputs.forEach(function(label) {
                label.innerHTML += redAsteriskHtml;
            });
        };

        markLabelsOfRequiredInputs();
    });