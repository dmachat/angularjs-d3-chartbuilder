define(['angular'], function(angular) {
    'use strict';
    /* Filters */
    var coerceInputTypes = {
      'number': function(input) {
        return +input;
      },
      'text': function(input) {
        return input;
      }
    }

    angular.module('chartbuilderFilters', [])
      .filter('numberFilter', function() {
        return function(input) {
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
      })
      .filter('datatype', function() {
        return function(input, type) {
          return coerceInputTypes[type](input);
        }
      });
});
