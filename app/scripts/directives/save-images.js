'use strict';

require('./module');

require('RGBColor');
require('StackBlur');
var canvg = require('../../bower_components/canvg/canvg');


function copySvg(svgEl) {
  var copyEl = svgEl.cloneNode(true),
      defs = document.createElement('defs');

  copyEl.insertBefore(defs, copyEl.firstChild);

  var appliedStyles = '',
      sheets = document.styleSheets;

  /*
  for (var i = 0; i < sheets.length; i++) {
    var rules = sheets[i].cssRules;
    for (var j = 0; j < rules.length; j++) {
      var rule = rules[j];
      if ('undefined' !== typeof(rule.style)) {
        try {
          var elems = svgEl.querySelectorAll(rule.selectorText);
          if (elems.length > 0) {
            appliedStyles += rule.selectorText + ' { ' + rule.style.cssText + ' }\n';
          }
        } catch(e) {
          continue;
        }
      }
    }
  }
  */
  var appliedStyles = 'path.nv-line { fill:none; }';

  var style = document.createElement('style');
  var cdata = document.createTextNode(appliedStyles);
  style.setAttribute('type', 'text/css');
  style.appendChild(cdata);
  defs.appendChild(style);

  return (new XMLSerializer()).serializeToString(copyEl);
}

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
            svg = copySvg(chartElement.getElementsByTagName('svg')[0]),
            canvas = document.getElementById('canvas');

          // svg size has to be explicitly set. we already have height
          canvas.setAttribute('width', chartElement.offsetWidth);

          // SVG -> Canvas
          canvg('canvas', svg, { renderCallback: 'scope.downloadImage' });
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
