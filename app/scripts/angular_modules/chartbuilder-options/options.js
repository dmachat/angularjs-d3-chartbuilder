define([
  'angular',
  'text!angular_modules/chartbuilder-options/options.html'
  ], function(angular, chartbuilderOptionsTemplate) {
    'use strict';

    angular.module('chartbuilderOptions', ['chartbuilderDirectives'])
      .service('chartbuilderDefaultOptions', function() {
        var defaultOptions = {

          options: false,

          load: function(options) {
            this.options = options;
          }

        }

        return defaultOptions;
      })
      .service('chartbuilderOptionValueKeys', ['chartbuilderOptionValues', function(chartbuilderOptionValues) {
        return (chartbuilderOptionValues instanceof Object) ? Object.keys(chartbuilderOptionValues) : [];
      }])
      .directive('chartbuilderOptions', ['$compile', 'chartbuilderUtils', 'chartbuilderOptionValues', 'chartbuilderOptionValueKeys', 'chartbuilderOptionHelp', function($compile, chartbuilderUtils, chartbuilderOptionValues, chartbuilderOptionValueKeys, chartbuilderOptionHelp) {
        return {
          restrict: 'EA',
          scope: {
            key: '@?',
            json: '=',
            node: '=?',
            children: '=?',
            collapsedLevel: '@'
          },
          controller: function($scope) {

            // Initialize container for child nodes
            $scope.children = {};

            // Initialize container for function options
            $scope.functionOptions = {};
            $scope.selectedOptions = {};

            // Define auxiliary functions
            $scope.utils = {

              // collapse/expand node by clicking
              clickNode: function(node) {
                node.isCollapsed = !node.isCollapsed;
              },

              listSelector: {
                init: function(key) {
                  if (key in chartbuilderOptionValues) {
                    $scope.selectedOptions[key] = $scope.json[key] || chartbuilderUtils.keys(chartbuilderOptionValues[key])[0];
                    $scope.functionOptions[key] = chartbuilderOptionValues[key];
                  }
                },
                onChange: function(item, key) {
                  $scope.json[key] = item;
                }
              },

              // Skip ordering in ng-repeat
              keys: function(json) {
                return chartbuilderUtils.keys(json);
              },

              // Hide some options
              isHidden: function(key) {
                return [
                  'type',
                  'dispatch',
                  'noData',
                  'id'
                  ].indexOf(key) > -1;
              }
            };

            // Define properties of the current node
            $scope.node = {

                // Check node is collapsed
                isCollapsed: ($scope.collapsedLevel && +$scope.collapsedLevel) ? (+$scope.collapsedLevel <= 0) : true, /* set up isCollapsed properties, by default - true */

                // Check current node is object or array
                isObject: function() {
                  return angular.isObject($scope.json)
                },

                // Get type for current node
                type: function() {
                  var type = chartbuilderUtils.getType($scope.json);

                  if (type === 'function'
                      || (type === 'string'
                        && (
                          chartbuilderOptionValueKeys.indexOf($scope.key) > -1
                        )
                      )
                    ) {
                    return 'selector';
                  }
                  return type;
                },

                // Calculate collection length for object or array
                length: function() {
                  return ($scope.json instanceof Object) ? (Object.keys($scope.json).length) : 1
                },

                help: function() {
                  if (chartbuilderOptionHelp.hasOwnProperty($scope.key)) {
                    return chartbuilderOptionHelp[$scope.key];
                  }
                },

                // Refresh template view
                refresh: function() {
                  $scope.refresh();
                }
            };
          },
          link: function(scope, element, attrs) {
            // Define child scope and template
            var childScope = scope.$new(),
              template = chartbuilderOptionsTemplate;

            // Define build template function
            scope.build = function(_scope) {
              if (scope.node.isObject()) {
                element.html('').append($compile(template)(_scope));
              }
            };

            // Define refresh function
            scope.refresh = function() {
              childScope.$destroy();
              childScope = scope.$new();
              scope.build(childScope);
            };

            // Build template view
            scope.build(childScope);
          }
        }
      }]);
});
