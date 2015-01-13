'use strict';

var Highcharts = require('../../../bower_components/highcharts/highcharts-all');
require('../../../bower_components/highcharts-ng/dist/highcharts-ng');

/*
 Chartbuilder Highcharts module
 */

var module = {
  name: 'Highcharts',
  slug: 'highcharts',
  data: require('./data')
};

var template = ['<highchart config="dataStore.highcharts" ',
             'style="display: block; padding: 0 0 50px"></highchart>'].join('');

angular

  .module('chartbuilder.highcharts', ['highcharts-ng', 'chartbuilderServices'])

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
        dataFormat: [{ 'key': 'location', 'type': 'text' }, { 'key': 'value', 'type': 'text' }],
        template: template,
        meta: {
          title: module.name,
          subtitle: 'Subtitle for a map',
          caption: '1a. Edit a caption for a map',
        },
        highcharts: {
          xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
          },
          labels: {
            items: [{
              html: 'Total fruit consumption',
              style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
              }
            }]
          },
          series: [],
          size: {
            height: 600
          },
          title: {
            text: ''
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

      $scope.$watch('chartbuilderData.data', function() {
        chartbuilderData.syncData();
      }, true);
    }
  ]);
