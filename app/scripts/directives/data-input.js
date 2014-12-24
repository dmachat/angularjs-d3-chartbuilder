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
          template: dataFormTemplate,
          link: function(scope) {
            scope.dataGroupBox = {};
            scope.newRow = {};
            scope.newDataFile = {};
            scope.singleSeriesData = {};

            // Keep an empty new row for the input model
            scope.$watch('chartbuilderData.data', function(newval) {
              angular.forEach(newval, function(group, gidx) {
                scope.newRow[gidx] = {};
              });
              if (chartbuilderUtils.getType(chartbuilderData.dataFormat[0].values) === 'array') {
                scope.groupedData = chartbuilderData.data[0].values;
                scope.groupedFormat = chartbuilderData.dataFormat[0].values;
              } else {
                scope.groupedData = chartbuilderData.data;
                scope.groupedFormat = chartbuilderData.dataFormat;
              }
            }, true);

            // When data is pasted to the input text area, parse it for values
            scope.onPasteInputChanged = function(input, gidx) {
              scope.chartbuilderData.data[gidx].values = d3.csv.parse(input);
              scope.pasteInputToggle = false;
            };

            // Append a new data row from the empty data model
            scope.addRow = function(gidx) {
              var validate = true;
              angular.forEach(scope.chartbuilderData.columnValues, function(type, key) {
                if (!_.has(scope.newRow[gidx], key) || scope.newRow[gidx][key] === null) {
                  validate = false;
                }
              });
              if (!validate) {
                return false;
              }
              scope.chartbuilderData.data[gidx].values.push(scope.newRow[gidx]);
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
              scope.chartbuilderData.data[gidx].values.splice(idx, 1);
            };

            // This is just the callback from the file reader input. Parse and insert uploaded values
            scope.readFile = function(file, gidx) {
              scope.chartbuilderData.data[gidx].values = d3.csv.parse(file);
            };

            // Download existing csv data
            scope.downloadCSV = function(gidx) {
              var csvText = d3.csv.format(scope.chartbuilderData.data[gidx].values);
              chartbuilderUtils.saveFile(csvText, scope.chartbuilderData.data[gidx].key + '.csv', 'text/csv');
            };
          }
        };
      }]);
});
