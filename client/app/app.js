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

        // interceptor sending unauthorized user to login
        $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
            return {
                response: function (response) {
                    return response;
                },
                responseError: function (response) {
                    if (response.status === 401 && response.config.url !== '/initialLoginCheck') {
                        $injector.get('$state').go('login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
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
    })
    .factory('auth', ['$http', '$q', '$state', function ($http, $q, $state) {
        var auth = {};
        auth.initialize = function () {
            var deferred = $q.defer();
            if (auth.isLoggedIn === undefined || auth.isAdmin === undefined) {
                $http.get('/initialLoginCheck')
                    .then(function userIsLoggedIn(response) {
                        auth.isLoggedIn = true;
                        auth.isAdmin = response.data;
                        deferred.resolve();
                    }, function userIsNotLoggedIn(response) {
                        auth.isLoggedIn = false;
                        auth.isAdmin = false;
                        deferred.reject();
                    });
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };
        auth.logout = function () {
            $http({
                method: 'POST',
                url: '/logout',
                data: {}
            })
                .then(function successfulLogout(response) {
                    auth.isLoggedIn = false;
                    auth.isAdmin = false;
                    $state.go('home');
                }, function errorLogout(response) {
                    $state.go('home');
                    alert('Error while logging out.');
                });
        };

        return auth;
    }])
    .provider('stateAuthenticator', function () {
        return {
            userOnly: {
                data: function ($q, $state, auth) {
                    var deferred = $q.defer();
                    auth.initialize()
                        .then(function userIsLoggedIn() {
                            deferred.resolve();
                        }, function userIsNotLoggedIn() {
                            $state.go('login');
                            deferred.reject();
                        });
                    return deferred.promise;
                }
            },
            adminOnly: {
                data: function ($q, $state, auth) {
                    var deferred = $q.defer();
                    auth.initialize()
                        .then(function userIsLoggedIn() {
                            if (auth.isAdmin) {
                                deferred.resolve();
                            } else {
                                $state.go('home');
                                deferred.reject();
                            }
                        }, function userIsNotLoggedIn() {
                            $state.go('home');
                            deferred.reject();
                        });
                    return deferred.promise;
                }
            },
            // provider provides only utility, no data is involved
            $get: function () {
                return null;
            }
        }
    })
;