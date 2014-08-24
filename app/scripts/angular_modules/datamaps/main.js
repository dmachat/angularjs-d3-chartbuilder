/*
 Chartbuild Data Maps module
 */
"use strict";

(function() {
  define(['angular', 'angular_modules/datamaps/data'], function(angular, data) {
    var module = {
      name: 'Maps',
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
                           'colors="dataStore.colors" ',
                           'type="{{ dataStore.options.chart.mapType }}"></datamap>'].join(''),
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
                mapType: 'usa',
                height: null,
                width: 800,
                legend: true,
                labels: true,
                labelColor: '#333333',
                labelSize: 12,
                fillQuartiles: false,
                geographyConfig: {
                  hideAntarctica: true,
                  borderWidth: 1,
                  borderColor: '#FDFDFD',
                  popupOnHover: true,
                  highlightOnHover: true,
                  highlightFillColor: '#FC8D59',
                  highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                  highlightBorderWidth: 2
                },
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
