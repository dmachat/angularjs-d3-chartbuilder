/*
 Modular version of the stacked area chart nvd3-directive
 */
'use strict';

var d3 = require('d3');

var module = {
  name: 'Stacked Area Chart',
  slug: 'stackedAreaChart',
  data: require('./data')
};

var template = ['<nvd3 options="dataStore.options" ',
                 'data="dataStore.data[0].values" ',
                 'colors="dataStore.colors" ',
                 'events="$root.events" ',
                 'config="{ extended: true }"></nvd3>'].join('');

angular

  .module('chartbuilder.nvd3.stackedAreaChart', ['chartbuilderServices', 'chartbuilder.nvd3'])

  /**
   * Add this module's state to ui-router routes
   */
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('chartbuilder.' + module.slug, {
      url: '/' + module.slug,
      views: {
        'graph': {
          template: template,
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
        data: module.data,
        //dataFormat: [{ 'key': 'timestamp', 'type': 'number' }, { 'key': 'value', 'type': 'number' }],
        dataFormat: [{ 'key': 'text', 'values': [{ 'key': 0, 'type': 'number' }, { 'key': 1, 'type': 'number' }] }],
        template: template,
        meta: {
          title: module.name,
          subtitle: 'Subtitle for a stacked area chart',
          caption: '1a. Edit a caption for the graph',
        },
        options: {
          chart: {
            type: module.slug,
            height: 600,
            x: function(d){return d[0];},
            y: function(d){return d[1];},
            useVoronoi: false,
            clipEdge: true,
            useInteractiveGuideline: true,
            xAxis: {
              showMaxMin: false,
              tickFormat: function(d) {
                return d3.time.format('%x')(new Date(d));
              }
            },
            yAxis: {
              tickFormat: function(d) {
                return d3.format(',.2f')(d);
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
