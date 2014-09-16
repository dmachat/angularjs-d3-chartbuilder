define([
  'angular',
  ], function(angular) {
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
      if (!angular.isString(data.options.chart.type)) {
        console.log('invalid chart type');
        return false;
      }

      // Unset preloaded for loading
      delete scope.chartbuilderData.preloaded;

      // return chart data
      return angular.toJson(data);
    }

    angular.module('chartbuilderDirectives')
      .directive('chartOptionsLoader', function() {
        return {
          restrict: 'EA',
          replace: true,
          template: '<button type="button" class="btn btn-default btn-file-input" file-input-button on-file-load="readTemplateFile(file)" name="Upload Template">load</button>',
          link: function(scope) {
            // Get the file from the file-input directive, make sure it's json
            scope.readTemplateFile = function(file) {
              var optionsObject = isJson(file);

              if (optionsObject) {
                scope.chartbuilderData.load(optionsObject);
              }

            };
          }
        }
      })
      .directive('chartOptionsSaver', ['chartbuilderUtils', function(chartbuilderUtils) {
        return {
          restrict: 'EA',
          replace: true,
          template: '<button type="button" class="btn btn-default" ng-click="downloadOptionsObject()" name="Download Options Template">save json</button>',
          link: function(scope) {

            // Download the current chartbuilderData object
            scope.downloadOptionsObject = function() {
              var chartbuilderObject = angular.toJson(scope.chartbuilderData);
              chartbuilderUtils.saveFile(chartbuilderObject, 'chartbuilder-options.json', 'text/json');
            };
          }
        }
      }])
      .directive('chartOptionsFromWindow', ['$window', function($window) {
        return {
          restrict: 'EA',
          replace: true,
          template: '<button type="button" class="btn btn-default" ng-click="sendToWordPress()" name="Send Options Object to Wordpress">to WP</button>',
          link: function(scope) {

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

              // setup postMessage listener and tell parent window that child frame is ready to receive data
              var origin = $window.location.protocol + '//' + $window.location.hostname;              
              window.addEventListener('message', scope.receiveMessage, true);
              window.parent.postMessage( {
                src : 'chartbuilder',
                channel : 'upstream',
                msg : 'ready',
                data : null
              }, origin )

            };

            scope.receiveMessage = function(e){
              if ( e.origin !== $window.location.protocol + '//' + $window.location.hostname ){
                throw( 'Illegal postMessage from ' + e.origin );
              }

              var msgObj = e.data;
              if (  !angular.isUndefined( msgObj.src) &&
                    msgObj.src === 'chartbuilder' &&
                    !angular.isUndefined( msgObj.channel ) &&
                    msgObj.channel === 'downstream' &&
                    !angular.isUndefined( msgObj.msg ) &&
                    msgObj.msg === 'savedData' &&
                    !angular.isUndefined( msgObj.data ) &&
                    msgObj.data
              ) {
                console.log( 'App iframe received savedData from WordPress')
                console.log( msgObj.data );
                scope.chartbuilderData.env = 'iframe';
                scope.chartbuilderData.load( msgObj.data );
              }
            };

            scope.initDataLoad();

            scope.sendToWordPress = function(){

              var chartData = parseDataForWP(scope.chartbuilderData);

              $window.parent.postMessage({
                src : 'chartbuilder',
                channel : 'upstream',
                msg : 'chartData',
                data : chartData,
              }, $window.location.href);
            }
          }
        };
      }]);
});
