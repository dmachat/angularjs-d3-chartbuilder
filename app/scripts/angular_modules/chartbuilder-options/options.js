define([
  'angular',
  'text!angular_modules/chartbuilder-options/options.html'
  ], function(angular, chartbuilderOptionsTemplate) {
    'use strict';

    angular.module('chartbuilderOptions', ['chartbuilderDirectives'])
      .directive('chartbuilderOptions', ['$compile', 'chartbuilderUtils', 'chartbuilderOptionValues', function($compile, chartbuilderUtils, chartbuilderOptionValues) {
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

              // Validate text if input to the form
              validateNode: function(key) {
                // Check if null
                if ($scope.json[key] === null);

                // Check if undefined or ""
                else if ($scope.json[key] === undefined | $scope.json[key] === '')
                  $scope.json[key] = null;

                // Try to convert string to number
                else if (!isNaN(+$scope.json[key]) && isFinite($scope.json[key]))
                  $scope.json[key] = +$scope.json[key];

                // Try parse to function
                else if (chartbuilderUtils.tryGetFunction($scope.json[key])){
                  $scope.json[key] = chartbuilderUtils.tryGetFunction($scope.json[key]);
                  $scope.utils.textarea.init(key);
                }

                // Try to parse string to json
                else {
                  // Check if boolean input -> then refresh
                  if ($scope.json[key] === "true" || $scope.json[key] === "false") {
                    $scope.json[key] = JSON.parse($scope.json[key]);
                    $scope.refresh();
                  }
                }
              },

              listSelector: {
                init: function(key) {
                  if (key in chartbuilderOptionValues) {
                    $scope.selectedOptions[key] = chartbuilderUtils.keys(chartbuilderOptionValues[key])[0];
                    $scope.functionOptions[key] = chartbuilderOptionValues[key];
                  }
                },
                onChange: function(item, key) {
                  $scope.json[key] = item;

                  $scope.$emit('onFunctionChanged'); //emit onFunctionChange event if the function definition was changed.
                }
              },

              functionSelector: {
                // Set up the select list with available functions
                init: function(key) {
                  if (key in chartbuilderOptionValues) {
                    $scope.selectedOptions[key] = chartbuilderUtils.keys(chartbuilderOptionValues[key])[0];
                    $scope.functionOptions[key] = chartbuilderOptionValues[key];
                  }
                },

                // onChange event handler
                onChange: function(option, key) {
                  var optionFunction = chartbuilderOptionValues[key][option].toString().trim();

                  // Validate if selected option is function
                  var func = chartbuilderUtils.tryGetFunction(optionFunction);

                  if (func) {
                    $scope.json[key] = func;
                  }
                  else { //if value is not a valid function
                    $scope.json[key] = null;
                    $scope.utils.validateNode(key); //full validation for node
                  }

                  $scope.$emit('onFunctionChanged'); //emit onFunctionChange event if the function definition was changed.
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
                  if (type === 'string'
                      && (
                        $scope.key === 'interpolate'
                        || $scope.key === 'style'
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
