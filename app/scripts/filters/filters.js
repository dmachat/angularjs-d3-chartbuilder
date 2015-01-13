'use strict';

/* Filters */
var coerceInputTypes = {
  'number': function(input) {
    var number = parseFloat(input.replace(/[^0-9-.]/g, ''));
    if (isNaN(number)) {
      return null;
    } else {
      return number;
    }
  },
  'text': function(input) {
    return input;
  }
};

angular
  .module('chartbuilderFilters', [])

  .filter('numberFilter', function() {
    return function(input) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  })

  .filter('datatype', function() {
    return function(input, type) {
      return coerceInputTypes[type](input);
    };
  });
