'use strict';

require('./module');

angular

  .module('chartbuilderDirectives')

  .directive('liveDataTable', ['chartbuilderUtils', 'chartbuilderData', function(chartbuilderUtils, chartbuilderData) {
    return {
      restrict: 'EA',
      template: require('../../partials/data-forms/live-data-table.html'),
      controller: function($scope) {
        if (chartbuilderUtils.getType(chartbuilderData.dataFormat[0].values) === 'array') {
          //console.log(chartbuilderData.dataFormat);
        } else {
          $scope.data = chartbuilderData.data;
        }
      }
    };
  }])

  .directive('mapDataGroups', ['chartbuilderUtils', 'chartbuilderData', function(chartbuilderUtils, chartbuilderData) {
    return {
      restrict: 'EA',
      link: function($scope) {
        $scope.$watch('structureData.dataFormat', function(format) {
          console.log(format);
          if (chartbuilderUtils.getType(format[0].values) === 'array') {
            console.log('is array');
            console.log(chartbuilderData.data);
            $scope.groups = chartbuilderData.data[0].values;
          } else {
            $scope.groups = chartbuilderData.data;
          }
          console.log($scope.groups);
        });
        $scope.$watch('groups', function(newval) {
          console.log(newval);
        }, true);
      }
    };
  }]);
