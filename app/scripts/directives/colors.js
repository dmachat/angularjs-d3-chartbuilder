define([
  'angular',
  ], function(angular) {
    'use strict';

    angular.module('chartbuilderDirectives').
      directive('chartbuilderColors', function () {
        return {
          restrict: 'EA',
          template: ['<div class="color-picker" ng-if="!chartbuilderData.options.customColors" ng-model="chartbuilderData.colors" ui-sortable>',
                       '<span colorpicker ',
                         'colorpicker-with-input="true" ',
                         'ng-model="chartbuilderData.colors[$index]" ',
                         'ng-repeat="color in chartbuilderData.colors track by $index" ',
                         'ng-style="{ background: color }" ',
                         'class="color-box"',
                         '>',
                       '</span>',
                       '<span popover="Add another color" popover-trigger="mouseenter" ng-click="addNewColor()"><span class="glyphicon glyphicon-plus center-block"></span></span>',
                       '<span popover="Reverse the color palette" popover-trigger="mouseenter" ng-click="reverseColors()"><span class="glyphicon glyphicon-transfer center-block"></span></span>',
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
