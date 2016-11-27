'use strict';

angular.module('supermarketApp')
    .config(function ($stateProvider, stateAuthenticatorProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: '/app/admin/admin.html',
                controller: 'AdminController',
                resolve: stateAuthenticatorProvider.adminOnly
            });
    });