(function() {

  // we have to require these three modules to expose the Datamap object
  require(['d3', 'topojson', 'datamaps'], function(d3, topojson, Datamap) {
    'use strict';

    angular.module('datamaps', [])

      .directive('datamap', [function() {
        return {
          restrict: 'EA',
          scope: {
            data: '=',			//map data, [required]
            options: '=',		//map options, [required]
            type: '@?',     //map scope, world or usa, [optional, defaults to usa]
          },
          template: '<div id="map-container" style="height: 450px; width: 800px;"></div>',
          link: function(scope, element, attrs) {

            // basic options
            var baseOptions = {
              element: element[0].children[0],
              scope: scope.type ? scope.type : 'usa'
            }

            scope.colors = ['rgb(31, 119, 180)', 'rgb(174, 199, 232)', 'rgb(255, 127, 14)'];

            // directive global api
            scope.api = {

              // Fully refresh directive
              refresh: function() {
                scope.api.updateWithOptions(scope.options, scope.data);
              },

              // Update chart with new options
              updateWithOptions: function(options, data) {
                var _options;

                // Clearing
                scope.api.clearElement();

                // Exit if options are not yet bound
                if (!angular.isDefined(options)) return;

                // Update with data
                scope.api.updateWithData(scope.data);

                if (data) {
                  // Set up svg height and width. It is important for all browsers...
                  d3.select(element[0]).style.height = scope.options.chart.height + 'px';
                  d3.select(element[0]).style.width = scope.options.chart.width + 'px';

                  // update the map element
                  data = scope.mapData(data);
                  _options = angular.extend(baseOptions, data);
                }

                scope.map = new Datamap(_options);

                // set labels
                if (options.chart && options.chart.labels) {
                  scope.map.labels({
                    labelColor: options.chart.labelColor ? options.chart.labelColor : '#333',
                    fontSize: options.chart.labelSize ? options.chart.labelSize : 12
                  });
                }

                // set legend
                if (options.chart && options.chart.legend) {
                  scope.map.legend();
                }

              },

              // Update chart with new data
              updateWithData: function(data) {
              },

              // Fully clear directive element
              clearElement: function () {
                scope.map = null;
                element.find('#map-container').empty();
              }
            };

            // Watching on options, data, config changing
            scope.$watch('[options, data]', function() {
              scope.api.refresh();
            }, true);

            scope.mapData = function(data) {
              var _data = {
                fills: {
                  defaultFill: '#b9b9b9'
                },
                data: {}
              };

              angular.forEach(data[0].values, function(val) {
                _data.data[val.location] = { fillKey: val.value };
              });

              angular.forEach(_.uniq(_.pluck(data[0].values, 'value')), function(key, idx) {
                _data.fills[key] = scope.colors[idx];
              });

              return _data;

            };
          }
        };
      }]);
  });
})();
