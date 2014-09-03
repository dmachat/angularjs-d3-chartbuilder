define([
  'angular',
  'text!../partials/data-forms/template-object-service.html',
  ], function(angular, templateOptionsServiceTemplate) {
    'use strict';

    angular.module('chartbuilderDirectives')
      .directive('templateOptionsService', ['chartbuilderUtils', function(chartbuilderUtils) {
        return {
          restrict: 'EA',
          template: templateOptionsServiceTemplate,
          link: function(scope, element, attrs) {

            // Get the file from the file-input directive, make sure it's json
            scope.readTemplateFile = function(file) {
              try {
                var optionsObject = JSON.parse(file);
              } catch(e) {
                console.log('Not a valid JSON object');
                return false;
              }

              scope.chartbuilderData.load(optionsObject);
            };

            // Download the current chartbuilderData object
            scope.downloadOptionsObject = function(gidx) {
              var chartbuilderObject = JSON.stringify(scope.chartbuilderData);
              chartbuilderUtils.saveFile(chartbuilderObject, 'chartbuilder-options.json', 'text/json');
            };
          }
        };
      }]);
});
