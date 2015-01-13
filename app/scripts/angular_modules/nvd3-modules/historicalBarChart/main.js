/*
 Modular version of the historical bar chart nvd3-directive
 */
"use strict";

var module = {
  name: 'Historical Bar Chart',
  slug: 'historicalBarChart',
  data: require('./data')
};

var template = ['<nvd3 options="dataStore.options" ',
                 'data="dataStore.data" ',
                 'colors="dataStore.colors" ',
                 'events="$root.events" ',
                 'config="{ extended: true }"></nvd3>'].join('');

angular

  .module('chartbuilder.nvd3.historicalBarChart', ['chartbuilderServices', 'chartbuilder.nvd3'])

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
        dataFormat: [{ 'key': 'timestamp', 'type': 'number' }, { 'key': 'value', 'type': 'number' }],
        template: template,
        meta: {
          title: module.name,
          subtitle: 'Subtitle for a historical bar chart',
          caption: '1a. Edit a caption for the graph',
        },
        options: {
          chart: {
            type: module.slug,
            height: 600,
            x: function(d){return d[0];},
            y: function(d){return d[1]/100000;},
            valueFormat: function(d) {
              return d3.format(',.1f')(d);
            },
            xAxis: {
              axisLabel: 'X Axis',
              tickFormat: function(d) {
                return d3.time.format('%x')(new Date(d));
              },
              rotateLabels: 50
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: 35,
              tickFormat: function(d) {
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
