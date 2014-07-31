define([
  'angular',
  ], function(angular) {
    'use strict';

    angular.module('chartbuilderDirectives').
      directive('inputGroup', function () {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                label: "@" // Gets the string contents of the `label` attribute.
            },
            template: ['<div class="input-group">',
                         '<span class="input-group-addon">',
                           '{{ label }}',
                         '</span>',
                         '<ng-transclude></ng-transclude>',
                       '</div>'].join(''),
        };
      });
});
