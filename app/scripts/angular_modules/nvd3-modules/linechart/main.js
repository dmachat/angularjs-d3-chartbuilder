/*
 Modular version of the bar chart nvd3-directive
 */
"use strict";

(function() {
  define(['angular', 'text!angular_modules/nvd3-modules/linechart/template.html', 'angular_modules/nvd3-modules/linechart/data'], function(angular, template, data) {
    var module = {
      name: 'Line Chart',
      slug: 'lineChart',
      data: data
    };

    angular.module('chartbuilder.nvd3.linechart', ['chartbuilderServices', 'chartbuilder.nvd3'])
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
                           'data="dataStore.data" ',
                           'config="{ extended: true }"></nvd3>'].join(''),
              controller: module.slug + 'Controller'
            }
          }
        });
      }])
      .run([
        'chartbuilderModuleRegistry',
        'getSampleData',
        function(chartbuilderModuleRegistry, getSampleData) {
          var moduleOpts = {};
          moduleOpts[module.name] = {
            name: module.name,
            slug: module.slug,
            data: data,
            dataFormat: function() { return { x: 'number', y: 'number' }; },
            meta: {
              title: module.name,
              subtitle: 'Subtitle for a line chart',
              caption: '1a. Edit a caption for the graph',
            },
            options: {
              chart: {
                type: module.slug,
                height: 600
              }
            }
            /*
            options: {
              chart: {
                type: module.slug,
                height: 600,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Voltage (v)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    //console.log("!!! lineChart callback !!!");
                }
              }
            }
            */
          }

          // Add the slug and name definitions to chartbuilder
          angular.extend(chartbuilderModuleRegistry, moduleOpts);
        }
      ])
      .controller(module.slug + 'Controller', [
        '$scope',
        '$location',
        'getSampleData',
        'chartbuilderData',
        'chartbuilderModuleRegistry',
        'chartbuilderSelectedModule',
        function($scope, $location, getSampleData, chartbuilderData, chartbuilderModuleRegistry, chartbuilderSelectedModule) {
          // Localize the datastore for the view
          $scope.dataStore = chartbuilderData;

          // Initialize the data -- store sample data and set structure
          chartbuilderSelectedModule = module.slug;
          chartbuilderData.init(chartbuilderModuleRegistry[module.name]);
        }
      ]);
  });
})();
