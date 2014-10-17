(function() {

  // we have to require these three modules to expose the Datamap object
  require(['d3', 'topojson', 'datamaps'], function(d3, topojson, Datamap) {
    'use strict';

    angular.module('datamaps', [])

      .directive('datamap', ['$compile', 'stateCodeMap', function($compile, stateCodeMap) {
        return {
          restrict: 'EA',
          scope: {
            data: '=',			//map data, [required]
            options: '=',		//map options, [required]
            colors: '=?',    //map colors array, [optional]
            events: '=?',   //global events that directive would subscribe to, [optional]
            type: '@?',     //map scope, world or usa, [optional, defaults to usa]
          },
          template: '<div id="map-container" style="position: relative; display: block; height: {{ height }}px; width: {{ width }}px"></div>',
          link: function(scope, element, attrs) {
            scope.mapOptions = mapOptions();

            scope.api = {

              // Fully refresh directive
              refresh: function() {
                scope.api.updateWithOptions(scope.options, scope.data[0]);
              },

              selectDataSet: function(selection) {
                var selectedData = scope.data[selection];
                scope.api.updateWithOptions(scope.options, selectedData);
              },

              datasetSelector: function() {
                var selector = $compile('<select ng-options="idx as set.key for (idx, set) in data" ng-model="selectedSet" ng-change="api.selectDataSet(selectedSet)" ng-init="selectedSet = \'0\'" style="position: absolute; top: 0"></select>')(scope);
                element.append(selector);
              },

              // Update chart with new options
              updateWithOptions: function(options, data) {
                var _options;

                // Clearing
                scope.api.clearElement();

                // Exit if options are not yet bound
                if (!angular.isDefined(options)) return;

                // Update bounding box
                scope.width = options.chart.width || 600;
                scope.height = options.chart.height || scope.width * 0.6;

                scope.mapOptions = mapOptions();

                // Add data to map redraw
                if (data.values.length) {
                  // update the map element
                  scope.mapOptions = mapData(scope.mapOptions, data.values);
                }

                scope.mapOptions.geographyConfig = angular.extend({}, options.chart.geographyConfig);

                scope.map = new Datamap(scope.mapOptions);

                if (!options.chart) return;

                // set labels
                if (options.chart.labels) {
                  scope.map.labels({
                    labelColor: options.chart.labelColor ? options.chart.labelColor : '#333333',
                    fontSize: options.chart.labelSize ? options.chart.labelSize : 12
                  });
                }

                // set legend
                if (options.chart.legend) {
                  scope.map.legend();
                }

              },

              // Update chart with new data
              updateWithData: function(data) {
                scope.map.updateChoropleth(data);
              },

              // Fully clear directive element
              clearElement: function () {
                scope.map = null;
                element.find('#map-container').empty();
              }
            };

            // Watching on options, colors changing
            scope.$watch('[options, colors]', function() {
              scope.api.refresh();
            }, true);

            // Watch data changing. Only refresh if options or data map points have changed
            scope.$watch('data', function(data, old) {
              if (!data.length) {
                scope.api.updateWithData({ values: [] });
              }
              else if (old.length && (data[0].values || []).length !== (old[0].values || []).length) {
                scope.api.refresh();
              }
              else {
                var _data = {};
                angular.forEach(data[0].values, function(val) {
                  _data[stateCodeMap[val.location] || val.location] = { fillKey: val.value };
                });
                scope.api.updateWithData(_data);
              }
              if (data.length > 1) {
                scope.api.datasetSelector();
              }
            }, true);

            //subscribe on global events
            angular.forEach(scope.events, function(eventHandler, event) {
              scope.$on(event, function(e){
                return eventHandler(e, scope);
              });
            });

            // Generate base map options
            function mapOptions() {
              return {
                element: element[0].children[0],
                scope: (scope.type === 'usa' || scope.type === 'world') ? scope.type : 'usa',
                height: scope.height,
                width: scope.width,
                projection: scope.type === 'world' ? 'mercator' : 'equirectangular',
                fills: {
                  defaultFill: '#b9b9b9'
                },
                data: {}
              }
            };

            // Extend the mapOptions object with data and fill values
            function mapData(dst, data) {
              angular.forEach(data, function(val) {
                dst.data[stateCodeMap[val.location] || val.location] = { fillKey: val.value };
              });

              if (!scope.options.fillQuartiles) {
                var fillKeys = [];
                angular.forEach(data, function(data) {
                  if (fillKeys.indexOf(data.value) === -1) {
                    fillKeys.push(data.value);
                  }
                });

                angular.forEach(fillKeys, function(key, idx) {
                  dst.fills[key] = scope.colors[idx];
                });
              }
              else {
                // @TODO Map numeric ranges to quartiles
              }

              return dst;
            }
          }
        };
      }])
      .value('stateCodeMap', {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DT',
        'District of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
      });
  });
})();
