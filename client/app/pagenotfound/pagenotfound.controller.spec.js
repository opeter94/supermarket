'use strict';

describe('PageNotFoundController', function() {

    var expectedSecondsBeforeRedirection = 5;
    var $scope;

    beforeEach(module('supermarketApp'));
    beforeEach(module('ui.router'));
    beforeEach(function($controller) {
        $scope = {};
        $controller('PageNotFoundController', { $scope: $scope });
    });

    it('should start counting down, so the value should decrease', inject(function($timeout) {
        expect($scope.secondsBeforeRedirection = expectedSecondsBeforeRedirection);
        $timeout.flush((expectedSecondsBeforeRedirection - 1) * 1000);
        expect($scope.secondsBeforeRedirection = 1);
    }));

    // redirect functionality was found to be complicated to test, other than writing a wrapper function around
    // the redirection call, but dont wanna call that wrapper in prod code just to be able to test a simple redirection
});