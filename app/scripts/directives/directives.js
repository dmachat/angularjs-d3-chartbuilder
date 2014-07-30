define([
  'angular',
  'text!../partials/data-forms/structure-data-input.html',
  'text!../partials/data-forms/edit-in-place.html',
  'text!../partials/data-forms/chartbuilder-options.html'
  ], function(angular, dataFormTemplate, editInPlaceTemplate, chartbuilderOptionsTemplate) {
    'use strict';

    angular.module('chartbuilderDirectives', []).
      directive('structureDataInput', function() {
        return {
          restrict: 'EA',
          scope: {
            structureData: '=',
          },
          template: dataFormTemplate,
          link: function(scope) {
            scope.dataGroupBox = {};
            scope.newRow = {};

            scope.$watch('structureData.data', function(newval) {
              angular.forEach(newval, function(val, gidx) {
                scope.newRow[gidx] = {};
              });
            }, true);

            scope.addRow = function(gidx) {
              var validate = true;
              angular.forEach(scope.structureData.columnValues, function(type, key) {
                if (!_.has(scope.newRow[gidx], key) || scope.newRow[gidx][key] === null) {
                  validate = false;
                }
              });
              if (!validate) {
                return false;
              }
              scope.structureData.data[gidx].values.push(scope.newRow[gidx]);
            };

            scope.removeRow = function(gidx, idx) {
              scope.structureData.data[gidx].values.splice(idx, 1);
            };
          }
        };
      })
      .directive('editInPlace', function() {
        return {
          restrict: 'EA',
          scope: {
            value: '=',
            type: '@?'
          },
          template: editInPlaceTemplate,
          link: function(scope, element) {
            var inputElement = angular.element(element.children()[1]);

            element.addClass('edit-in-place');

            scope.editing = false;

            scope.edit = function() {
              scope.editing = true;

              element.addClass('active');
              inputElement[0].focus();
            };

            inputElement.bind('keydown keypress', function(event) {
              if(event.which === 13) {
                scope.editing = false;
                element.removeClass('active');
              }
            });

            inputElement.bind('blur', function() {
              scope.editing = false;
              element.removeClass('active');
            });
          }
        };
      })
      .directive('chartbuilderOptions', ['$compile', 'chartbuilderUtils', function($compile, chartbuilderUtils) {
        return {
          restrict: 'EA',
          scope: {
            json: '=',
            node: '=?',
            children: '=?',
            collapsedLevel: '@'
          },
          controller: function($scope) {

            // Initialize container for child nodes
            $scope.children = {};

            // Initialize container for nodes with functions
            $scope.jsonFn = {};

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

              // Handle textarea fith functions
              textarea: {
                // Define function value for textarea
                init: function(key) {
                  if ($scope.json[key] !== null) {
                    $scope.jsonFn[key] = $scope.json[key].toString().trim();
                  }
                },

                // Validate if element value is function
                validate: function(key) {
                  var func = chartbuilderUtils.tryGetFunction($scope.jsonFn[key]);
                  func ? angular.element($scope.utils.textarea.element).removeClass('invalid').addClass('valid') : angular.element($scope.utils.textarea.element).removeClass('valid').addClass('invalid');
                },

                // onFocus event handler
                onFocus: function(e, key) {
                  $scope.utils.textarea.valueBeforeEditing = angular.copy($scope.jsonFn[key]); //keep value before editing
                  $scope.utils.textarea.element = e.currentTarget;
                  $scope.utils.textarea.validate(key);
                },

                // onChange event handler
                onChange: function(key) {
                  $scope.utils.textarea.validate(key);
                },

                // onBlur event handler
                onBlur: function(key) {
                  //handle only if the field has been changed
                  if ($scope.utils.textarea.valueBeforeEditing !== $scope.jsonFn[key]) {
                    $scope.$emit('onFunctionChanged'); //emit onFunctionChange event if the function definition was changed.

                    var func = chartbuilderUtils.tryGetFunction($scope.jsonFn[key]);
                    if (func) {
                      $scope.json[key] = func;
                    }
                    else { //if value is not a valid function
                      $scope.json[key] = $scope.jsonFn[key];
                      delete $scope.jsonFn[key];
                      $scope.utils.validateNode(key); //full validation for node
                    }
                  }
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
                  'noData'
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
                  return chartbuilderUtils.getType($scope.json);
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
