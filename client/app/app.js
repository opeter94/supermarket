'use strict';

angular.module('supermarketApp', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/pagenotfound');

        $httpProvider.defaults.headers.get = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .factory('requiredInputMarker', function () {
        return {
            markLabelsOfRequiredInputs: function () {
                var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
                var labelsByInputId = {};
                toArray(document.getElementsByTagName('label'))
                    .forEach(function (label) {
                        labelsByInputId[label.getAttribute('for')] = label;
                    });
                var requiredInputs =
                    toArray(document.getElementsByTagName('input'))
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
                    if (label.innerHTML.indexOf('*') === -1) {
                        label.innerHTML += redAsteriskHtml;
                    }
                });
            }
        }
    });