define([
    'angular',
    'services'
], function(angular) {
    'use strict';

    /* Controllers */

    angular.module('webControllers', [
        'webServices'
    ]).controller('Home', [
        '$scope',
        '$location',
        function($scope, $location) {
            /* initialize */
        }
    ]).controller('Chartbuilder', [
      '$scope',
      '$location',
      '$state',
      '$http',
      function($scope, $location, $state, $http) {
        $scope.chartDisplayType = [
          'Line Chart',
          'Cumulative Line Chart',
          'Line with Focus Chart',
          'Stacked Area Chart',
          'Discrete Bar Chart',
          'Multi Bar Chart',
          'Multi Bar Horizontal Chart',
          'Pie Chart',
          'Scatter Chart'
        ];

        $scope.buildChart = function() {
          switch ($scope.selectedChartType) {
            case "Line Chart":
              $state.go('chartbuilder.lineChart');
              break;
            case "Discrete Bar Chart":
              $state.go('chartbuilder.discreteBarChart');
              break;
            case "Cumulative Line Chart":
              $state.go('chartbuilder.cumulativeLineChart');
              break;
            case "Pie Chart":
              $state.go('chartbuilder.pieChart');
              break;
          }
        }

        $scope.exampleData = []; 
        $scope.targetGroup = { selected: $scope.exampleData.length > 0 ? $scope.exampleData[0] : undefined };

        $scope.$watch('targetGroup', function(newval) {
          console.log(newval);
        }, true);
        
        $scope.moreData = $http.get('/data/sample-data.json').success(function(d) {
          $scope.exampleData = [d];
          console.log([d]);
        });

        $scope.addGroup = function() {
          $scope.exampleData.push({ key: '', values: [] });
        }

        $scope.newRow = [];

        $scope.addRow = function() {
          $scope.exampleGroup[targetGroupIndex].values.push([$scope.newRow[0], $scope.newRow[1]])
          $scope.newRow = [];
        }

        $scope.removeRow = function(group, index) {
          $scope.exampleData[group].values.splice(index, 1);
        }
      }
    ]).controller('About', [
      '$scope',
      '$location',
      function($scope, $location) {

      }
    ]);
});
