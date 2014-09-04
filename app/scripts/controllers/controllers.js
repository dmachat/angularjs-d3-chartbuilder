define(['angular', 'services', 'rgbcolor', 'StackBlur', 'canvg', 'angular-color-picker'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices', 'chartbuilderOptions', 'colorpicker.module'])
    .controller('headerCtrl', [
      '$scope',
      '$location',
      function($scope, $location) {
        $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
        };
      }
    ])
    .controller('Chartbuilder', [
      '$scope',
      '$location',
      '$state',
      '$http',
      '$filter',
      '$stateParams',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      'chartbuilderUtils',
      function($scope, $location, $state, $http, $filter, $stateParams, chartbuilderModuleRegistry, chartbuilderData, chartbuilderUtils) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;

        $scope.showSampleData = function() {
          chartbuilderData.showSampleData();
        };

        $scope.resetData = function() {
          chartbuilderData.resetData();
        };

        $scope.addGroup = function() {
          if (!$scope.newDataGroup) {
            return false;
          }
          chartbuilderData.addGroup($scope.newDataGroup);
          $scope.newDataGroup = '';
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
