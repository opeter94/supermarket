'use strict';

angular.module('supermarketApp')
    .controller('RegisterController', function ($scope, $http) {
        $scope.submitForm = function () {
            $http({
                method: 'POST',
                url: '/register',
                data: {user: $scope.user}
            })
        };

        $scope.cities = {};
        $http.get('/city/getCities').then(function (response) {
            $scope.cities = response.data;
        });

        var markLabelsOfRequiredInputs = function () {
            var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
            var labelsByInputId = {};
            toArray(document.getElementsByTagName('label'))
                .forEach(function (label) {
                    labelsByInputId[label.getAttribute('for')] = label;
                });
            var requiredInputs = toArray(document.getElementsByTagName('input'))
                    .concat(toArray(document.getElementsByTagName('select')))
                    .filter(function (input) {
                        return input.getAttribute('required') !== null;
                    });
            var labelsOfRequiredInputs = [];
            requiredInputs.forEach(function (input) {
                labelsOfRequiredInputs.push(labelsByInputId[input.id]);
            });
            var redAsteriskHtml = '<span style="color: red;"> *</span>';
            labelsOfRequiredInputs.forEach(function (label) {
                label.innerHTML += redAsteriskHtml;
            });
        };

        markLabelsOfRequiredInputs();
    });