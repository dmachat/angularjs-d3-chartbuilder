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
          template: '<a role="button" ng-click="saveImage()">As an image</a>',
          link: function(scope) {
            scope.saveImage = function() {

              // Set up elements and svg
              var chartElement = document.getElementById('chart'),
                svg = chartElement.getElementsByTagName('svg')[0],
                svgXml = (new XMLSerializer()).serializeToString(svg),
                canvas = document.getElementById('canvas');

              // svg size has to be explicitly set. we already have height
              canvas.setAttribute('width', chartElement.offsetWidth);

              // SVG -> Canvas
              canvg('canvas', svgXml, { renderCallback: 'scope.downloadImage' });

              // Canvas -> file
              var a = document.createElement('a');
              a.download = 'image.png';
              a.href = canvas.toDataURL('image/png');
              document.body.appendChild(a);
              a.click();

            };
          }
        };
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
                svgXml = (new XMLSerializer()).serializeToString(svg);

              // Bind svg string to textarea
              scope.exportedSVG = svgXml;

            };
          }
        };
      });
  });
