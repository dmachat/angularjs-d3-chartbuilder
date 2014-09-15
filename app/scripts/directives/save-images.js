/*global canvg*/
define([
  'angular',
  'rgbcolor',
  'StackBlur',
  'canvg'
  ], function(angular) {
    'use strict';
    angular.module('chartbuilderDirectives')
      .directive('chartbuilderSaveToPng', function() {
        return {
          restrict: 'EA',
          replace: true,
          template: '<button type="button" class="btn btn-default" ng-click="saveImage()">save image</button>',
          link: function(scope) {
            scope.saveImage = function() {

              // Set up elements and svg
              var chartElement = document.getElementById('chart'),
                svg = chartElement.getElementsByTagName('svg')[0],
                svgXml = (new XMLSerializer).serializeToString(svg),
                canvas = document.getElementById('canvas');

              // SVG -> Canvas
              canvg('canvas', svgXml);

              // Canvas -> file
              var a = document.createElement('a');
              a.download = 'image.png';
              a.href = canvas.toDataURL('image/png');
              document.body.appendChild(a);
              a.click();

            };
          }
        }
      })
      .directive('chartbuilderSaveToSvg', function() {
        return {
          restrict: 'EA',
          replace: true,
          template: '',
          link: function(scope) {
            scope.svgToString = function() {

              // Set up elements and svg
              var chartElement = document.getElementById('chart'),
                svg = chartElement.getElementsByTagName('svg')[0],
                svgXml = (new XMLSerializer).serializeToString(svg);

              // Bind svg string to textarea
              scope.exportedSVG = svgXml;

            }
          }
        }
      });
  });
