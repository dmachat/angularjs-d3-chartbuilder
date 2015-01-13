/*global alert */

'use strict';

require('./module');

function isJson(data) {
  try {
    return angular.fromJson(data);
  } catch(e) {
    console.log('Not a valid JSON object');
    return false;
  }
}

function parseDataForWP(data) {
  if (angular.isUndefined(data) ||
      angular.isUndefined(data.options.chart) ||
      angular.isUndefined(data.slug)) {
    alert('You must select a chart type and add data before sending to WordPress');
    return false;
  }

  // validate chart data
  if (!isJson(data)) {
    return false;
  }

  // validate chart type
  if (!data.slug.length) {
    console.log('invalid chart type');
    return false;
  }

  // encode meta fields to avoid double quote issues
  angular.forEach(data.meta, function(value, key) {
    data.meta[key] = encodeURIComponent(value);
  });

  // Unset preloaded for loading
  delete data.preloaded;

  // return chart data
  return angular.toJson(data);
}

angular

  .module('chartbuilderDirectives')

  .directive('chartOptionsLoader', function() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="btn-file-input" file-input-button on-file-load="readTemplateFile(file)">Upload Chart file</div>',
      link: function(scope) {
        // Get the file from the file-input directive, make sure it's json
        scope.readTemplateFile = function(file) {
          var optionsObject = isJson(file);

          if (optionsObject) {
            scope.chartbuilderData.load(optionsObject);
          }

        };
      }
    };
  })

  .directive('chartTemplateOptionsLoader', function() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<button type="button" class="btn btn-default btn-file-input" file-input-button on-file-load="readTemplateFile(file)" name="Upload Template Options">load options</button>',
      link: function(scope) {
        // Get the file from the file-input directive, make sure it's json
        scope.readTemplateFile = function(file) {
          var optionsObject = isJson(file);

          if (optionsObject) {
            scope.chartbuilderData.loadOptions(optionsObject);
          }

        };
      }
    };
  })

  .directive('chartOptionsSaver', ['chartbuilderUtils', function(chartbuilderUtils) {
    return {
      restrict: 'EA',
      template: '<a href="" ng-click="downloadOptionsObject()">As Chart file</a>',
      link: function(scope, element, attrs) {
        // Download the current chartbuilderData object
        scope.downloadOptionsObject = function() {
          var optionsObject = scope.getOptions();
          chartbuilderUtils.saveFile(optionsObject, 'chartbuilder-options.json', 'text/json');
        };

        scope.getOptions = function() {
          if (!attrs.optionsOnly) {
            delete scope.chartbuilderData.preloaded;
            return angular.toJson(scope.chartbuilderData);
          } else {
            var templateOptions = {
              colors: scope.chartbuilderData.colors,
              options: scope.chartbuilderData.options.chart
            };

            return angular.toJson(templateOptions);
          }
        };
      }
    };
  }])

  .directive('chartEmbedCode', ['chartbuilderData', 'chartbuilderDefaultOptions', function(chartbuilderData, chartbuilderDefaultOptions) {
    return {
      restrict: 'EA',
      replace: true,
      template: '<a role="button" ng-click="makeEmbedCode()" name="Make embed code">Create embed code</a>',
      link: function(scope) {
        scope.makeEmbedCode = function() {
          if (!chartbuilderData.data[0].values.length) {
            return false;
          }
          var chartData = parseDataForWP(scope.chartbuilderData);
          var embedData = angular.fromJson(chartData);
          var templateString = embedData.template;
          delete embedData.template;

          var embedString = [
            '<script async ',
              'data-chart=\'' + JSON.stringify(embedData) + '\' ',
              'data-template=\'' + JSON.stringify(templateString).replace(/\\/g, '') + '\' ',
              'src="//dmachat.github.io/angularjs-d3-chartbuilder/bower_components/chartbuilder-widget/loader/dist/chartbuilder.load.v1.default.js">',
            '</script>'].join('');

          chartbuilderData.embedCode = embedString;
        }
      }
    }
  }])

  .directive('chartOptionsFromWindow', ['$window', 'chartbuilderData', 'chartbuilderDefaultOptions', function($window, chartbuilderData, chartbuilderDefaultOptions) {
    return {
      restrict: 'EA',
      replace: true,
      template: '<a role="button" ng-click="sendToWordPress()" name="Send Options Object to Wordpress">To WordPress</a>',
      link: function(scope) {

        /**
         * WordPress plugin integration functions
         */

        // this is initialized on the directive
        scope.initDataLoad = function() {

          if ( scope.isTopLevelWindow() ){
            return;
          }

          // enable plugin specific tools
          chartbuilderData.env = 'iframe';

          // setup postMessage listener and tell parent window that child frame is ready to receive data
          window.addEventListener('message', scope.receiveMessage, true);
          window.parent.postMessage( {
            src : 'chartbuilder',
            channel : 'upstream',
            msg : 'ready',
            data : null
          }, '*' );
          // '*' is not ideal, but there are subsequent checks in parent window
          // and here to validate message origins

        };

        // look iframe containing the app
        scope.isTopLevelWindow = function(){
          try {
            // window.frameElement is null in top level window
            return window.frameElement === null;
          } catch ( err ){
            // will throw SecurityError when attempting to access cross-origin iframe
            return err.name !== 'SecurityError';
          }
        };

        // allow postMessages from same-origin or *.wordpress.com
        // i.e. for VIP sites
        scope.matchOrigin = function( sender ){
          var currentOrigin = $window.location.protocol + '//' + $window.location.hostname;
          
          // allow same origin, or any cross-origin message when developing with app hosted at http://chartbuidler.dev
          if ( sender === currentOrigin || 'http://chartbuilder.dev' === currentOrigin ){
            //return true;
          }
          sender = 'http://kffpch.wp.alley.ws';

          // test http and https on WPCOM subdomains
          var re = /^(https?):\/\/[a-z0-9\-\.]+(\.wordpress\.com|\.alley\.ws|\.pantheon\.io)/;
          console.log(sender);
          return re.test( sender );
        };

        scope.receiveMessage = function(e){
          if ( ! scope.matchOrigin( e.origin ) ){
            throw( 'Illegal postMessage from ' + e.origin );
          }

          var msgObj = e.data;
          if (  !angular.isUndefined( msgObj.src) &&
                msgObj.src === 'chartbuilder' &&
                !angular.isUndefined( msgObj.channel ) &&
                msgObj.channel === 'downstream' &&
                !angular.isUndefined( msgObj.msg ) &&
                (msgObj.msg === 'savedData' || msgObj.msg === 'options') &&
                !angular.isUndefined( msgObj.data ) &&
                msgObj.data
          ) {
            switch (msgObj.msg) {
              case 'savedData':
                console.log('App iframe received savedData from WordPress');
                console.log(msgObj.data);
                chartbuilderData.load(msgObj.data);
                break;
              case 'options':
                console.log('App received options from WordPress');
                console.log(msgObj.data);
                chartbuilderDefaultOptions.load(msgObj.data);
                break;
            }
          }
        };

        scope.initDataLoad();

        scope.sendToWordPress = function() {

          var chartData = parseDataForWP(scope.chartbuilderData);

          var chartImg = scope.makeImage();

          $window.parent.postMessage({
            src : 'chartbuilder',
            channel : 'upstream',
            msg : 'chartData',
            data : {
              chartData : chartData,
              chartImg : chartImg
            }
          }, '*');
        };
      }
    };
  }]);
