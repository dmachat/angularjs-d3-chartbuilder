/*
 Chartbuild Data Maps module
 */
"use strict";

(function() {
  define(['angular', 'angular_modules/datamaps/data'], function(angular, data) {
    var module = {
      name: 'USA Map',
      slug: 'map',
      data: data
    };

    angular.module('chartbuilder.datamaps.usa', ['chartbuilderServices'])
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
              template: ['<datamap options="dataStore.options" ',
                           'style="display: block; padding: 0 0 50px" ',
                           'data="dataStore.data" ',
                           'type="usa"></datamap>'].join(''),
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
            dataFormat: function() { return { 'location': 'text', 'value': 'text' }; },
            meta: {
              title: module.name,
              subtitle: 'Subtitle for a map',
              caption: '1a. Edit a caption for a map',
            },
            options: {
              chart: {
                height: 600,
                legend: true,
                labels: true,
                labelColor: '#333333',
                labelSize: 12,
                fillQuartiles: false,
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
