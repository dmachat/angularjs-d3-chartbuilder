define([
  'angular',
  ], function(angular) {
    'use strict';

    angular.module('chartbuilderDirectives').
      directive('chartbuilderColors', function () {
        return {
          restrict: 'EA',
          transclude: true,
          template: ['<div class="panel-body color-picker" ng-if="!chartbuilderData.options.customColors">',
                       '<span colorpicker ',
                         'colorpicker-with-input="true" ',
                         'ng-model="chartbuilderData.colors[$index]" ',
                         'ng-repeat="color in chartbuilderData.colors track by $index" ',
                         'ng-style="{ background: color }" ',
                         'class="color-box"',
                         '>',
                       '</span>',
                       '<span class="glyphicon glyphicon-plus" ng-click="addNewColor()"></span>',
                       '<span class="glyphicon glyphicon-transfer" ng-click="reverseColors()"></span>',
                     '</div>',
                     '<a href ng-click="scaleColors()">use a color scale</a>',
                     '<a href ng-click="customColors()">pick colors for every item</a>'].join(''),
          link: function(scope) {

            scope.addNewColor = function() {
              scope.chartbuilderData.colors.push('#FFFFFF');
            };

            scope.reverseColors = function() {
              scope.chartbuilderData.colors.reverse();
            };

            scope.customColors = function() {
              scope.chartbuilderData.options.customColors = true;
            };

          }
        };
      });
});
