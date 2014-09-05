/*
 Modular version of the multi bar chart nvd3-directive
 */
"use strict";

(function() {
  define(['angular', 'angular_modules/nvd3-modules/multiBarChart/data'], function(angular, data) {
    var module = {
      name: 'Multi Bar Chart',
      slug: 'multiBarChart',
      data: data
    };

    angular.module('chartbuilder.nvd3.multiBarChart', ['chartbuilderServices', 'chartbuilder.nvd3'])
      /**
       * Add this module's state to ui-router routes
       */
      .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('chartbuilder.' + module.slug, {
          url: '/' + module.slug,
          views: {
            'graph': {
              template: ['<nvd3 options="dataStore.options" ',
                           'data="dataStore.data" ',
                           'colors="dataStore.colors" ',
                           'events="$root.events" ',
                           'config="{ extended: true }"></nvd3>'].join(''),
              controller: module.slug + 'Controller'
            }
          }
        });
      }])
      .run(['chartbuilderModuleRegistry', function(chartbuilderModuleRegistry) {
          var moduleOpts = {};
          moduleOpts[module.name] = {
            name: module.name,
            slug: module.slug,
            data: data,
            dataFormat: function() { return { 'x': 'text', 'y': 'number' }; },
            meta: {
              title: module.name,
              subtitle: 'Subtitle for a multi bar chart',
              caption: '1a. Edit a caption for the graph',
            },
            options: {
              chart: {
                type: module.slug,
                height: 600,
                clipEdge: true,
                staggerLabels: true,
                stacked: true,
                xAxis: {
                    axisLabel: 'x Axis',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
              }
            }
          }

          // Add the slug and name definitions to chartbuilder
          angular.extend(chartbuilderModuleRegistry, moduleOpts);
        }
      ])
      .controller(module.slug + 'Controller', [
        '$scope',
        'chartbuilderData',
        'chartbuilderModuleRegistry',
        function($scope, chartbuilderData, chartbuilderModuleRegistry) {
          // Localize the datastore for the view
          $scope.dataStore = chartbuilderData;

          // Initialize the data -- store sample data and set structure
          chartbuilderData.init(chartbuilderModuleRegistry[module.name]);
        }
      ]);
  });
})();
