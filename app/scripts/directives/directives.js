define(['angular'], function(angular) {
  'use strict';
  /* Directives */

  angular.module('webDirectives', []).
    directive('structureDataInput', function() {
      return {
        restrict: 'EA',
        scope: {
          structureData: '=',
          structureType: '@?'
        },
        templateUrl: '/partials/data-forms/structure-data-input.html',
        link: function(scope, element, attrs) {
          scope.dataColumns = 2;
          scope.newRow = {};
          scope.newRowTypes = ['Number', 'Number'];

          scope.$watch('structureData', function(newval) {
            angular.forEach(newval, function(val, gidx) {
              scope.newRow[gidx] = [];
            });
          }, true);

          scope.dataInputs = [];
          for (var i = 0; i < scope.dataColumns; i++) {
            scope.dataInputs.push(i);
          }

          scope.addRow = function(gidx) {
            if (!scope.newRow[gidx].length) return false;
            scope.structureData[gidx].values.push(scope.newRow[gidx])
          }

          scope.removeRow = function(gidx, idx) {
            scope.structureData[gidx].values.splice(idx, 1);
          }
        }
      }
    });
});
