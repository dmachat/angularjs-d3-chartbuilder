define(['angular'], function(angular) {
    'use strict';
    /* Filters */

    angular.module('webFilters', []).filter('numberFilter', function() {
        return function(input) {
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
    });
});
