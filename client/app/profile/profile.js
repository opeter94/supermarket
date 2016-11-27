'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider, stateAuthenticatorProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: '/app/profile/profile.html',
                controller: 'ProfileController',
                resolve: stateAuthenticatorProvider.userOnly
            })
    });