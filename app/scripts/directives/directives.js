define(['angular', 'text!../partials/data-forms/structure-data-input.html'], function(angular, dataFormTemplate) {
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
        template: ['<span ng-click="edit()" ng-bind="value"></span>',
                   '<input ng-model="value" type="{{ type }}" class="form-control"></input>'].join(''),
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

          inputElement.bind('blur', function(event) {
            scope.editing = false;
            element.removeClass('active');
          });
        }
      };
    })
    .directive('chartbuilderInput', function() {
      return {
        restrict: 'EA',
        scope: {
          value: '=',
          name: '=',
          itemChanged: '&'
        },
        template: ['<h4>{{ name }}</h4>',
                   '<div ng-repeat="input in inputObj">',
                     '<div class="input-group" ng-repeat="(label, setting) in input">',   
                       '<span class="input-group-addon"',
                         'ng-if="setting.type === \'checkbox\'"',
                         '>',
                         '<input type="{{ setting.type }}" ',
                           'ng-model="setting.val" ',
                           'ng-change="itemChanged({ inputName: label, inputValue: setting.val, parentName: name })"',
                           '>',
                         '</input>',
                       '</span>',
                       '<span class="form-control"',
                         'ng-if="setting.type ===\'checkbox\'"',
                         '>',
                         '{{ label }}',
                       '</span>',
                       '<span class="input-group-addon"',
                         'ng-if="label !== name && setting.type !==\'checkbox\'"',
                         '>',
                         '{{ label }}',
                       '</span>',
                       '<input class="form-control" ',
                         'ng-if="setting.type !== \'checkbox\'"',
                         'ng-model="setting.val" ',
                         'class="form-control" ',
                         'type="{{ setting.type }}" ',
                         'ng-change="itemChanged({ inputName: label, inputValue: setting.val, parentName: name })"',
                         '>',
                       '</input>',
                     '</div>',
                   '</div>'].join(''),
        link: function(scope) {
          scope.inputObj = {};
          var obj = {};
          if (!_.has(scope.value, 'val')) {
            angular.forEach(scope.value, function(settings, name) {
              obj[name] = settings;
            });
          }
          else {
            obj[scope.name] = scope.value;
          }
          scope.inputObj[scope.name] = obj;
        }
      };
    })
    /*
    .directive('chartbuilderOptions', ['chartbuilderUtils', function(chartbuilderUtils) {
      return {
        restrict: 'EA',
        scope: {
          options: '='
        },
        template: ['<chartbuilder-input ng-repeat="(name, value) in inputs" ',
                     'value="value" ',
                     'name="name" ',
                     'class="chartbuilder-input-group" ',
                     'item-changed="updateVal(inputName, inputValue, parentName)"',
                     '>',
                   '</chartbuilder-input>'].join(''),
        link: function(scope) {

          scope.$watch('options', function() {
            // Initialize container for input objects
            scope.inputs = scope.returnInputs(scope.options);
          }, true);

          scope.returnInputs = function(obj) {
            var inputs = {};
            angular.forEach(obj, function(v, k) {
              var type = chartbuilderUtils.getType(v);
              if ('type' === k || 'dispatch' === k) {
                return;
              }
              if ('number' === type) {
                inputs[k] = { val: v, type: type };
              }
              if ('string' === type) {
                inputs[k] = { val: v, type: 'text' };
              }
              if ('boolean' === type) {
                inputs[k] = { val: v, type: 'checkbox' };
              }
              if ('object' === type) {
                inputs[k] = scope.returnInputs(v);
              }
            });
            return inputs;
          };

          scope.updateVal = function(inputName, inputValue, parentName) {
            if (inputName !== parentName) {
              scope.options[parentName][inputName] = inputValue;
            }
            else if (_.has(scope.options, inputName)) {
              scope.options[inputName] = inputValue;
            }
          };
        }
      };
    }])
    */
    .directive('chartbuilderOptions', ['$compile', 'chartbuilderUtils', function($compile, chartbuilderUtils) {
      return {
        restrict: 'EA',
        scope: {
          json: '=',
          node: '=?',
          children: '=?'
        },
        controller: function($scope) {
          // Initialize container for child nodes
          $scope.children = {};

          // Initialize container for nodes with functions
          $scope.jsonFn = {};

          // Define auxiliary functions
          $scope.utils = {
            addNode: function(key, value) {
              var json = null;
              // Try to get json
              try {
                json = JSON.parse(value);
              } catch(e) {};
              if (json === null) {
                json = chartbuilderUtils.tryGetFunction(value) || json;
              }

              // Add element to the object
              if ($scope.node.type() === 'object') {
                if (json !== null) {
                  $scope.json[key] = json;
                }
                else {
                  $scope.json[key] = value;
                }
              }

              // Add element[s] to the array
              else if ($scope.node.type() === 'array') {
                if (json !== null) {
                  if (json.constructor === Array) {
                    // Push new array elements to the array
                    $scope.json.push.apply($scope.json, json);
                  }
                  else {
                    // Push single element to the array
                    $scope.json.push(json);
                  }
                }
                else {
                  $scope.json.push(value);
                }
              }
              $scope.refresh();
            },

            // Reset node value by key to default == null
            resetNode: function(key) {
              $scope.json[key] = null;
              $scope.refresh();
            },

            // Validate text input to the form
            validateNode: function(key) {
              if ($scope.json[key] === null) {
                // Check if null
              }
              else if (angular.isUndefined($scope.json[key]) | $scope.json[key] === '') {
                // Check if undefined or ""
                $scope.json[key] = null;
              }
              else if (!isNaN(+$scope.json[key]) && isFinite($scope.json[key])) {
                // Try to convert string to number
                $scope.json[key] = +$scope.json[key];
              }
              else if (chartbuilderUtils.tryGetFunction($scope.json[key])) {
                // Try to parse function
                $scope.json[key] = chartbuilderUtils.tryGetFunction($scope.json[key]);
                $scope.utils.textarea.init(key);
              }
              else {
                // Try to parse string to json
                if ($scope.node.isHighEditLevel) {
                  // If high editable level
                  try {
                    var json = JSON.parse($scope.json[key]);
                    $scope.json[key] = json;
                    $scope.refresh();
                  }
                  catch(e) {};
                }
                else {
                  // If low editable level
                  if ($scope.json[key] === 'true' || $scope.json[key] === 'false') {
                    $scope.json[key] = JSON.parse($scope.json[key]);
                    $scope.refesh();
                  }
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
                func
                  ? angular.element($scope.utils.textarea.element).removeClass('invalid').addClass('valid')
                  : angular.element($scope.utils.textarea.element).removeClass('valid').addClass('invalid');
              },

              // onFocus event handler
              onFocus: function(e, key) {
                $scope.utils.textarea['valueBeforeEditing'] = angular.copy($scope.jsonFn[key]);
                $scope.utils.textarea['element'] = e.currentTarget;
                $scope.utils.textarea.validate(key);
              },

              // onChange event handler
              onChange: function(key) {
                $scope.utils.textarea.validate(key);
              },

              // onBlur event handler
              onBlur: function(key) {
                if ($scope.utils.textarea.valueBeforeEditing !== $scope.jsonFn[key]) {
                  // Emit onFunctionChange event
                  $scope.$emit('onFunctionChanged');

                  var func = chartbuilderUtils.tryGetFunction($scope.jsonFn[key]);
                  if (func) {
                    $scope.json[key] = func;
                  }
                  else {
                    $scope.json[key] = $scope.jsonFn[key];
                    delete $scope.jsonFn[key];
                    // Full validation for node
                    $scope.utils.validateNode(key);
                  }
                }
              }
            }
          };

          // Define properties of the current node
          $scope.node = {

            // Check current node is object or array
            isObject: function() {
              return angular.isObject($scope.json);
            },

            // Get type for current node
            type: function() {
              return chartbuilderUtils.getType($scope.json);
            },

            // Calculate collection length for object or array
            length: function() {
              return ($scope.json instanceof Object) ? (Object.keys($scope.json).length) : 1;
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
            template = [
              '<ul>',
                '<li ng-repeat="key in utils.keys(json) track by key">',
                  '<span ng-click="utils.clickNode(children[key])">{{ key }}: </span>',
                  '<span ng-hide="children[key].isObject()">',
                    '<input ng-show="children[key].type() === \'boolean\'" type="checkbox" ng-model="json[key]" />',
                    '<input ng-show="children[key].type() === \'number\'" type="number" ng-model=json[key]" />',
                    '<textarea ng-if="children[key].type() === \'function\'" ng-model="jsonFn[key]" ng-init="utils.textarea.init(key)" ng-change="utils.textarea.onChange(key)" ng-focus="utils.textarea.onFocus($event, key)" ng-blur="utils.textarea.onBlur(key)"></textarea>',
                    '<input ng-show="children[key].type() !== \'number\' && children[key].type() !== \'function\'" type="text" ng-model="json[key]" ng-change="utils.validateNode(key)" placeholder="null" />',
                  '</span>',
                  '<chartbuilder-options json="json[key]" node="children[key]" ng-show="children[key].isObject()"></chartbuilder-options>',
                '</li>',
              '</ul>'].join('');

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
      };
    }]);
});
