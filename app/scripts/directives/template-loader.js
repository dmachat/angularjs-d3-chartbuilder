define([
  'angular',
  'text!../partials/data-forms/template-options-service.html',
  ], function(angular, templateOptionsServiceTemplate) {
    'use strict';

    function isJson(data) {
      try {
        return angular.fromJson(data);
      } catch(e) {
        console.log('Not a valid JSON object');
        return false;
      }
    }

    function parseDataForWP(data) {
      if (angular.isUndefined(data) || angular.isUndefined(data.options.chart) || angular.isUndefined(data.options.chart.type)) {
        alert('You must select a chart type and add data before sending to WordPress');
        return false;
      }

      // validate chart data
      if (!isJson(data)) {
        return false;
      }

      // validate chart type
      if (!angular.isString(chartbuilderData.options.chart.type)) {
        console.log('invalid chart type');
        return false;
      }

      // return chart data
      return data;
    }

    angular.module('chartbuilderDirectives')
      .directive('templateOptionsService', ['$window', 'chartbuilderUtils', function($window, chartbuilderUtils) {
        return {
          restrict: 'EA',
          template: templateOptionsServiceTemplate,
          link: function(scope) {

            // Get the file from the file-input directive, make sure it's json
            scope.readTemplateFile = function(file) {
              var optionsObject = isJson(file);

              if (optionsObject) {
                scope.chartbuilderData.load(optionsObject);
              }

            };

            // Download the current chartbuilderData object
            scope.downloadOptionsObject = function() {
              var chartbuilderObject = angular.toJson(scope.chartbuilderData);
              chartbuilderUtils.saveFile(chartbuilderObject, 'chartbuilder-options.json', 'text/json');
            };

            /**
             * WordPress plugin integration functions
             */

            // this is initialized on the directive
            scope.initDataLoad = function() {
              // // if bootstrapped data, use that
              // // i.e. front-end of site
              // if ( !angular.isUndefined( $window.chartbuilderOptions ) && $window.chartbuilderOptions) {
              //   scope.chartbuilderData.load($window.chartbuilderOptions);
              //   return;
              // }

              // confirm that we're in an iframe
              if ( ! window.frameElement ){
                return;
              }

            // tell parent window that child frame is ready to receive data
            var origin = $window.location.protocol + '//' + $window.location.hostname ;              
            window.parent.postMessage({
              src : 'chartbuilder',
              channel : 'upstream',
              msg : 'ready',
              data : null
            }, origin )

            //    check for format like the above
            //   $window.addEventListener('message', function(e) {
            //     if ( e.origin !== $window.location.origin ) {
            //       throw( 'Illegal postMessage from ' + e.origin );
            //     }

            //     // now e.data has the saved JSON from WP
            //     // chartbuilderData.options.chart.type = e.data.type;
            //     // chartbuilderData.data = e.data.data;
            //     scope.chartbuilderData.load(e.data);

            //   });
            };

            scope.initDataLoad();

            scope.sendToWordPress = function(){
              var data = scope.parseDataForWP();

              if (!data){
                return;
              }

              $window.parent.postMessage(data, $window.location.href);
            }
          }
        };
      }]);
});
