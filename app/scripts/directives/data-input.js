define([
  'angular',
  'd3',
  'text!../partials/data-forms/structure-data-input.html',
  ], function(angular, d3, dataFormTemplate) {
    'use strict';

    angular.module('chartbuilderDirectives').
      directive('structureDataInput', ['chartbuilderUtils', 'chartbuilderData', function(chartbuilderUtils, chartbuilderData) {
        return {
          restrict: 'EA',
          scope: {
            structureData: '=',
            expandData: '@?'
          },
          template: dataFormTemplate,
          link: function(scope) {
            scope.dataGroupBox = {};
            scope.newRow = {};
            scope.newDataFile = {};
            scope.singleSeriesData = {};

            // Keep an empty new row for the input model
            scope.$watch('structureData.data', function(newval) {
              angular.forEach(newval, function(group, gidx) {
                scope.newRow[gidx] = {};
              });
            }, true);

            // When data is pasted to the input text area, parse it for values
            scope.onPasteInputChanged = function(input, gidx) {
              scope.structureData.data[gidx].values = d3.csv.parse(input);
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

            scope.addGroup = function() {
              if (!scope.newDataGroup) {
                return false;
              }
              chartbuilderData.addGroup(scope.newDataGroup);
              scope.newDataGroup = '';
            };

            scope.duplicateGroup = function() {
              if (!scope.newDataGroup) {
                return false;
              }
              chartbuilderData.duplicateGroup(scope.newDataGroup);
              scope.newDataGroup = '';
            };

            scope.removeRow = function(gidx, idx) {
              scope.structureData.data[gidx].values.splice(idx, 1);
            };

            // This is just the callback from the file reader input. Parse and insert uploaded values
            scope.readFile = function(file, gidx) {
              scope.structureData.data[gidx].values = d3.csv.parse(file);
            };

            // Download existing csv data
            scope.downloadCSV = function(gidx) {
              var csvText = d3.csv.format(scope.structureData.data[gidx].values);
              chartbuilderUtils.saveFile(csvText, scope.structureData.data[gidx].key + '.csv', 'text/csv');
            };
          }
        };
      }]);
});
