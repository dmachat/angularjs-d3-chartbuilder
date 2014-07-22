/*
 Modular version of the bar chart nvd3-directive
 */
"use strict";

(function() {
  define(['angular', 'text!angular_modules/nvd3-modules/barchart/template.html'], function(angular, template) {
    var module = {
      name: 'Bar Chart',
      slug: 'barchart',
      data: '/scripts/angular_modules/nvd3-modules/barchart/data.json'
    };

    angular.module('chartbuilder.nvd3.barchart', ['chartbuilderServices'])
      .value('chartbuilderModuleRegistry', {})
      .value('chartbuilderSelectedModule', {})
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
      .run(['chartbuilderModuleRegistry', 'getSampleData', function(chartbuilderModuleRegistry, getSampleData) {
        var moduleOpts = {};
        moduleOpts[module.name] = {
          name: module.name,
          slug: module.slug
        }

        getSampleData(module.data).then(function(data) {
          moduleOpts[module.name].data = data;
        });

        // Add the slug and name definitions to chartbuilder
        angular.extend(chartbuilderModuleRegistry, moduleOpts);

      }])
      .controller(module.slug + 'Controller', ['$scope', '$location', 'getSampleData', 'chartbuilderDataStore', 'chartbuilderModuleRegistry', 'chartbuilderSelectedModule', function($scope, $location, getSampleData, chartbuilderDataStore, chartbuilderModuleRegistry, chartbuilderSelectedModule) {
        // Localize the datastore for the view
        $scope.dataStore = chartbuilderDataStore;

        // Initialize the data -- store sample data and set structure
        chartbuilderSelectedModule.selected = module.slug;
        chartbuilderDataStore.init(chartbuilderModuleRegistry[module.name].data);

      }]);
  });
})();
