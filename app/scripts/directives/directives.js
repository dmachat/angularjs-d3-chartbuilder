define(['angular'], function(angular) {
  'use strict';

  angular.module('chartbuilderDirectives', []).
    directive('structureDataInput', function() {
      return {
        restrict: 'EA',
        scope: {
          structureData: '=',
        },
        templateUrl: '/partials/data-forms/structure-data-input.html',
        link: function(scope) {
          scope.dataColumns = 2;
          scope.newRow = {};

          scope.$watch('structureData.data', function(newval) {
            angular.forEach(newval, function(val, gidx) {
              scope.newRow[gidx] = [];
            });
          }, true);

          scope.dataInputs = [];
          for (var i = 0; i < scope.dataColumns; i++) {
            scope.dataInputs.push(i);
          }

          scope.addRow = function(gidx) {
            if (!scope.newRow[gidx].length) {
              return false;
            }
            scope.structureData.data[gidx].values.push(scope.newRow[gidx]);
          };

          scope.removeRow = function(gidx, idx) {
            scope.structureData.data[gidx].values.splice(idx, 1);
          };
        }
      };
    })
    .directive('editInPlace', function() {
      return {
        restrict: 'EA',
        scope: {
          value: '=',
          type: '@?'
        },
        template: ['<span ng-click="edit()" ng-bind="value"></span>',
                   '<input ng-model="value" type="{{ type }}" class="form-control"></input>'].join(''),
        link: function(scope, element) {
          var inputElement = angular.element(element.children()[1]);

          element.addClass('edit-in-place');

          scope.editing = false;

          scope.edit = function() {
            scope.editing = true;

            element.addClass('active');
            inputElement[0].focus();
          };

          inputElement.bind('keydown keypress', function(event) {
            if(event.which === 13) {
              scope.editing = false;
              element.removeClass('active');
            }
          });
        }
      };
    });
});
