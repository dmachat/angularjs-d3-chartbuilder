/*
 Modular version of the pie chart nvd3-directive
 */
"use strict";

(function() {
  define(['angular', 'angular_modules/nvd3-modules/pieChart/data'], function(angular, data) {
    var module = {
      name: 'Pie Chart',
      slug: 'pieChart',
      data: data
    };

    angular.module('chartbuilder.nvd3.pieChart', ['chartbuilderServices', 'chartbuilder.nvd3'])
      .value('chartbuilderModuleRegistry', {})
      .value('chartbuilderSelectedModule', '')
      /**
       * Add this module's state to ui-router routes
       */
      .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('chartbuilder.' + module.slug, {
          url: '/' + module.slug,
          views: {
            'graph': {
              template: ['<nvd3 options="dataStore.options" ',
                           'data="dataStore.data[0].values" ',
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
            dataFormat: function() { return { key: 'text', y: 'number' }; },
            meta: {
              title: module.name,
              subtitle: 'Subtitle for a pie chart',
              caption: '1a. Edit a caption for the pie chart',
            },
            options: {
              chart: {
                type: module.slug,
                height: 600,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true
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
        'chartbuilderSelectedModule',
        function($scope, chartbuilderData, chartbuilderModuleRegistry, chartbuilderSelectedModule) {
          // Localize the datastore for the view
          $scope.dataStore = chartbuilderData;

          // Initialize the data -- store sample data and set structure
          chartbuilderSelectedModule = module.slug;
          chartbuilderData.init(chartbuilderModuleRegistry[module.name]);
        }
      ]);
  });
})();
