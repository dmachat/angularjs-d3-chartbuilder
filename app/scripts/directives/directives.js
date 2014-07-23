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
          console.log(scope.value);
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
    }]);
});
