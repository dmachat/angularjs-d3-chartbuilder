'use strict';

require('./module');

require('../../bower_components/canvg/rgbcolor');
require('../../bower_components/canvg/StackBlur');
var canvg = require('../../bower_components/canvg/canvg');

angular

  .module('chartbuilderDirectives')

  .directive('chartbuilderSaveToPng', function() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<a role="button" ng-click="saveImage()">As an image</a>',
      link: function(scope) {
        scope.makeImage = function(){
          // Set up elements and svg
          var chartElement = document.getElementById('chart'),
            svg = chartElement.getElementsByTagName('svg')[0],
            svgXml = (new XMLSerializer()).serializeToString(svg),
            canvas = document.getElementById('canvas');

          // svg size has to be explicitly set. we already have height
          canvas.setAttribute('width', chartElement.offsetWidth);

          // SVG -> Canvas
          canvg('canvas', svgXml, { renderCallback: 'scope.downloadImage' });
          return canvas.toDataURL('image/png');
        };

        scope.saveImage = function() {
          // Canvas -> file
          var a = document.createElement('a');
          a.download = 'image.png';
          a.href = scope.makeImage();
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
