define(['angular', 'services', 'angular-spectrum-colorpicker', 'colors', 'bsAffix'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices', 'chartbuilderOptions', 'angularSpectrumColorpicker'])
    .controller('Home', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      function($scope, chartbuilderModuleRegistry, chartbuilderData) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;
      }
    ])
    .controller('ChartbuilderFAQ', [
      '$scope',
      '$location',
      '$anchorScroll',
      function($scope, $location, $anchorScroll) {
        $scope.scrollTo = function(id) {
          $location.hash(id);
          $anchorScroll();
        };
      }
    ])
    .controller('Chartbuilder', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      'chartbuilderError',
      function($scope, chartbuilderModuleRegistry, chartbuilderData, chartbuilderError) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;
        $scope.chartbuilderError = chartbuilderError;

        $scope.getAdvancedOptions = function() {
          if (!$scope.optionsLoaded) {
            $scope.nodeOptions.refresh();
            $scope.optionsLoaded = true;
          }
        };

      }]);
});
