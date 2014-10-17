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
    .service('chartbuilderError', function() {
      var errors = {
        $error: '',
        message: '',
        newError: function(message, error) {
          this.message = message;
          this.$error = error;
        }
      };
      return errors;
    })
    .service('chartbuilderData', [
      '$state',
      '$filter',
      'chartbuilderUtils',
      'chartbuilderDefaultOptions',
      'chartbuilderError',
      function($state, $filter, chartbuilderUtils, chartbuilderDefaultOptions, chartbuilderError) {
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
          duplicateGroup: function(title) {
            var _this = this;
            var values = _this.data[_this.data.length - 1].values.map(function(object) {
              return object;
            });
            _this.data.push({ key: title, values: values });
          },
          showSampleData: function() {
            this.data = this.sampleData.exampleData;
          },
          init: function(init) {

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
            } else if (angular.isDefined(init.highcharts)) {
              this.type = 'highcharts';
              this.highcharts = init.highcharts;
            }

            if (angular.isDefined(init.meta)) {
              this.meta = init.meta;
            }
            if (angular.isDefined((chartbuilderDefaultOptions.options || {}).meta)) {
              this.meta = angular.extend(this.meta, chartbuilderDefaultOptions.options.meta);
            }

            // Apply default options to the chart setup
            if (angular.isDefined((chartbuilderDefaultOptions.options || {}).chart)) {
              this.options.chart = angular.extend(this.options.chart, chartbuilderDefaultOptions.options.chart);
            }

            // Set colors. User defined or d3 defaults
            if (angular.isDefined(init.colors)) {
              this.colors = init.colors;
            }
            else if (((chartbuilderDefaultOptions.options || {}).colors || []).length) {
              this.colors = chartbuilderDefaultOptions.options.colors;
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

          },
          loadDataSet: function(file) {
            var _this = this,
              type = file.match(/\t(.*)$/m) ? 'tsv' : 'csv',
              headers = [];

            // Reset data
            _this.data = [];

            if (file.match(/^[^A-Za-z\,\w]/)) {
              chartbuilderError.newError('Invalid tabular data', 'invaliddata');
              return;
            }

            // Stream the parsed csv to output
            d3[type].parseRows(file, function(row, idx) {
              var i = 1;
              if (idx === 0) {

                // Set the headers, allowing for blanks in the first column
                if (row.length === 1) {
                  headers.push(_this.dataFormat[0].key);
                }
                headers = headers.concat(row);

                // Write a new data group for each column > 1
                for (i = 1; i < headers.length; i++) {
                  _this.data[i - 1] = {
                    'key': headers[i],
                    'values': []
                  };
                }
                return;
              }

              // Push column values into respective data groups
              for (i = 1; i < headers.length; i++) {
                var newRow = {};
                newRow[_this.dataFormat[0].key] = $filter('datatype')(row[0], _this.dataFormat[0].type);
                newRow[_this.dataFormat[1].key] = $filter('datatype')(row[i], _this.dataFormat[1].type);

                _this.data[i - 1].values.push(newRow);
              }

            }, function(error) {
              _this.data = [];
              chartbuilderError.newError(error, 'd3');
            });
          },
          loadOptions: function(options) {

            var _this = this;
            angular.forEach(options, function(values, name) {
              if (name === 'colors') {
                _this.colors = values;
              }
            });

          },
          syncData: function() {
            if (this.type === 'highcharts') {
              this.highcharts.series = this.data;
            }
          },
          downloadCSV: function() {

            var _this = this;

            var collateData = [];

            angular.forEach(_this.data, function(group) {
              angular.forEach(group.values, function(row, idx) {
                var props = {};
                angular.forEach(_this.dataFormat, function(column, columnId) {
                  props[(columnId !== 0 ? group.key : column.key)] = row[column.key];
                });
                collateData[idx] = angular.extend((collateData[idx] || {}), props);
              });
            });

            var csv = d3.csv.format(collateData);
            chartbuilderUtils.saveFile(csv, 'raw_data.csv', 'text/csv');
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
