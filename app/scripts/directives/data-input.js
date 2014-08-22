define([
  'angular',
  'comma-separated-values',
  'text!../partials/data-forms/structure-data-input.html',
  ], function(angular, CSV, dataFormTemplate) {
    'use strict';

    angular.module('chartbuilderDirectives').
      directive('structureDataInput', function() {
        return {
          restrict: 'EA',
          scope: {
            structureData: '=',
          },
          template: dataFormTemplate,
          link: function(scope) {
            scope.dataGroupBox = {};
            scope.newRow = {};
            scope.newDataFile = {};

            // Set CSV parsing options
            var csvOptions = {
              header: true,
              line: '\n'
            };

            // Keep an empty new row for the input model
            scope.$watch('structureData.data', function(newval) {
              angular.forEach(newval, function(group, gidx) {
                scope.newRow[gidx] = {};
              });
            }, true);

            // When data is pasted to the input text area, parse it for values
            scope.onPasteInputChanged = function(input, gidx) {
              scope.structureData.data[gidx].values = new CSV(input, csvOptions).parse();
              scope.pasteInputToggle = false;
            };

            // Append a new data row from the empty data model
            scope.addRow = function(gidx) {
              var validate = true;
              angular.forEach(scope.structureData.columnValues, function(type, key) {
                if (!_.has(scope.newRow[gidx], key) || scope.newRow[gidx][key] === null) {
                  validate = false;
                }
              });
              if (!validate) {
                return false;
              }
              scope.structureData.data[gidx].values.push(scope.newRow[gidx]);
            };

            scope.removeRow = function(gidx, idx) {
              scope.structureData.data[gidx].values.splice(idx, 1);
            };

            // This is just the callback from the file reader input. Parse and insert uploaded values
            scope.readFile = function(file, gidx) {
              scope.structureData.data[gidx].values = new CSV(file, csvOptions).parse();
            };
          }
        };
      });
});
