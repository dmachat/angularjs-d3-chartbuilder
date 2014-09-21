/*
 Modular version of the scatter chart nvd3-directive
 */
"use strict";

(function() {
  define(['angular'], function(angular) {
    var module = {
      name: 'Scatter Chart',
      slug: 'scatterChart'
    };

    var template = ['<nvd3 options="dataStore.options" ',
                     'data="dataStore.data" ',
                     'colors="dataStore.colors" ',
                     'events="$root.events" ',
                     'config="{ extended: true }"></nvd3>'].join('');

    angular.module('chartbuilder.nvd3.scatterChart', ['chartbuilderServices', 'chartbuilder.nvd3'])
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
          var data = generateData(4, 10);
          function generateData(groups, points) {
            var data = [],
              shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
              random = d3.random.normal();

            for (var i = 0; i < groups; i++) {
              data.push({
                key: 'Group ' + i,
                values: []
              });

              for (var j = 0; j < points; j++) {
                data[i].values.push({
                  x: random(),
                  y: random(),
                  size: Math.random(),
                  shape: shapes[j % 6]
                });
              }
            }
            return data;
          }
          var moduleOpts = {};
          moduleOpts[module.name] = {
            name: module.name,
            slug: module.slug,
            data: { exampleData: data },
            dataFormat: [{ 'key': 'x', 'type': 'number' }, { 'key': 'y', 'type': 'number' }, { 'key': 'size', 'type': 'number' }, { 'key': 'shape', 'type': 'text' }],
            template: template,
            meta: {
              title: module.name,
              subtitle: 'Subtitle for a scatter chart',
              caption: '1a. Edit a caption for the graph',
            },
            options: {
              chart: {
                type: module.slug,
                height: 600,
                scatter: {
                  onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                  return '<h3>' + key + '</h3>';
                },
                xAxis: {
                  axisLabel: 'X Axis',
                  tickFormat: function(d) {
                    return d3.format('.02f')(d);
                  }
                },
                yAxis: {
                  axisLabel: 'Y Axis',
                  tickFormat: function(d) {
                    return d3.format('.02f')(d);
                  },
                  axisLabelDistance: 30
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
