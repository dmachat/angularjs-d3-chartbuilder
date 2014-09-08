define(['angular', 'services', 'rgbcolor', 'StackBlur', 'canvg', 'angular-color-picker'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices', 'chartbuilderOptions', 'colorpicker.module'])
    .controller('Home', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      function($scope, chartbuilderModuleRegistry, chartbuilderData) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;
      }
    ])
    .controller('Chartbuilder', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      'chartbuilderUtils',
      function($scope, chartbuilderModuleRegistry, chartbuilderData, chartbuilderUtils) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;

        $scope.showSampleData = function() {
          chartbuilderData.showSampleData();
        };

        $scope.resetData = function() {
          chartbuilderData.resetData();
        };

        $scope.getAdvancedOptions = function() {
          if (!$scope.optionsLoaded) {
            $scope.nodeOptions.refresh();
            $scope.optionsLoaded = true;
          }
        };

        $scope.addColor = function() {
          $scope.chartbuilderData.colors.push('#FFFFFF');
        };

        $scope.saveImage = function() {

          // Set up elements and svg
          var chartElement = document.getElementById('chart'),
            svg = chartElement.getElementsByTagName('svg')[0],
            svgXml = (new XMLSerializer).serializeToString(svg),
            canvas = document.getElementById('canvas');

          // SVG -> Canvas
          canvg('canvas', svgXml);

          // Canvas -> file
          var a = document.createElement('a');
          a.download = "image.png";
          a.href = canvas.toDataURL('image/png');
          document.body.appendChild(a);
          a.click();

        }

        $scope.svgToString = function() {

          // Set up elements and svg
          var chartElement = document.getElementById('chart'),
            svg = chartElement.getElementsByTagName('svg')[0],
            svgXml = (new XMLSerializer).serializeToString(svg);

          // Bind svg string to textarea
          $scope.exportedSVG = svgXml;

        }

      }]);
});
