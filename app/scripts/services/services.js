define(['angular', 'd3'], function(angular, d3) {
  'use strict';

  // Get the d3 default colors to show in the color palette array
  function d3defaultColors() {
    var d3colors = d3.scale.category20(),
      colors = [];

    for (var i = 0; i < 20; i++ ) {
      colors.push(d3colors(i));
    }

    return colors;
  }

  /* Services */
  angular.module('chartbuilderServices', [])
    .value('chartbuilderModuleRegistry', {})
    .factory('getSampleData', ['$http', function($http) {
      return function(path) {
        return $http.get(path).then(function(result) {
          return result.data;
        });
      };
    }])
    .service('chartbuilderData', ['$state', function($state) {
      var dataStore = {
        options: {},
        meta: {},
        data: [],
        columnValues: [],
        resetData: function() {
          this.data = [{ key: 'Example Group', values: [] }];
          this.preloaded = false;
        },
        addGroup: function(title) {
          this.data.push({ key: title, values: [] });
        },
        showSampleData: function() {
          this.data = this.sampleData.exampleData;
        },
        addNewColor: function() {
          this.colors.push('#FFFFFF');
        },
        init: function(init) {
          this.columnValues = init.dataFormat();

          if (this.preloaded) {
            return;
          }

          this.sampleData = init.data;
          this.dataFormat = init.dataFormat;
          this.name = init.name;
          this.slug = init.slug;
          this.template = init.template;

          if (angular.isDefined(init.options)) { 
            this.options = init.options;
          }
          if (angular.isDefined(init.meta)) {
            this.meta = init.meta;
          }

          // Set colors. User defined or d3 defaults
          if (angular.isDefined(init.colors)) {
            this.colors = init.colors;
          }
          else {
            this.colors = d3defaultColors();
          }

          // Reset the data object according to format
          this.resetData();
        },
        load: function(chart) {

          var _this = this,
            currentSlug = _this.slug;

          _this.preloaded = true;

          // Make sure we're on the right page to render the chart
          if (currentSlug !== chart.slug) {
            $state.go('chartbuilder.' + chart.slug);
          }

          // Map the options object to chartbuilderData
          angular.forEach(chart, function(options, key) {
            _this[key] = options;
          });

        }
      };

      return dataStore;

    }])
    .service('chartbuilderUtils', function() {
      return {
        // get type for variable val
        getType: function(val) {
          if (val === null) {
            return 'null';
          }
          else if (val === undefined) {
            return 'undefined';
          }
          else if (val.constructor === Array) {
            return 'array';
          }
          else if (val.constructor === Object) {
            return 'object';
          }
          else if (val.constructor === String) {
            return 'string';
          }
          else if (val.constructor === Number) {
            return 'number';
          }
          else if (val.constructor === Boolean) {
            return 'boolean';
          }
          else if (val.constructor === Function) {
            return 'function';
          }
          else {
            return 'object';
          }
        },
        keys: function(obj) {
          return (obj instanceof Object) ? Object.keys(obj) : [];
        },
        saveFile: function(data, filename, contentType) {

          // Use passed content type or default to "application/octet-stream"
          var octetStreamMime = 'application/octet-stream',
            blob,
            url;
          contentType = contentType || octetStreamMime;

          if (navigator.msSaveBlob) {
            // Save blob is supported, so get the blob as it's contentType and call save.
            blob = new Blob([data], { type: contentType });
            navigator.msSaveBlob(blob, filename);
          }
          else {
            // Get the blob url creator
            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
            if (urlCreator) {
              // Try to use a download link
              var link = document.createElement('a');
              if ('download' in link) {
                // Prepare a blob URL
                blob = new Blob([data], { type: contentType });
                url = urlCreator.createObjectURL(blob);
                link.setAttribute('href', url);

                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                link.setAttribute('download', filename);

                // Simulate clicking the download link
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);

              } else {
                // Prepare a blob URL
                // Use application/octet-stream when using window.location to force download
                blob = new Blob([data], { type: octetStreamMime });
                url = urlCreator.createObjectURL(blob);
                window.location = url;
              }
            } else {
              console.log('Not supported');
            }
          }
        }
      };
    });
});
