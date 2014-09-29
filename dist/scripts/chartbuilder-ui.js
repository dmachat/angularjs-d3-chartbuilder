'use strict';

angular.module('chartbuilderOptions', []);

(function(angular, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['angular'], function(angular) {
      return factory(angular);
    });
  } else {
    return factory(angular);
  }
} (angular || null, function(angular) {

  'use strict';

  var xTwoDimensionalArray = {
    'label': '2d-array',
    'option': function(d) {
      return d[0];
    }
  }

  var yTwoDimensionalArray = {
    'label': '2d-array',
    'option': function(d) {
      return d[1];
    }
  }

  var xKeyValue = {
    'label': 'key/value',
    'option': function(d) {
      return d.key;
    }
  }

  var xLabelValue = {
    'label': 'label/value',
    'option': function(d) {
      return d.label;
    }
  }

  var xValue = {
    'label': 'x/y',
    'option': function(d) {
      return d.x;
    }
  }

  var yValue = {
    'label': 'key/y',
    'option': function(d) {
      return d.y;
    }
  }

  var yCleaned = {
    'label': 'yCleaned',
    'option': function(d) {
      return parseInt(d.y);
    }
  }

  var yLabelValue = {
    'label': 'label/value',
    'option': function(d) {
      return d.value;
    }
  }

  var app = angular.module('chartbuilderOptions').
    value('chartbuilderOptionValues', {
      'interpolate': {
        'linear': {
          'label': 'linear'
        },
        'linear-closed': {
          'label': 'linear-closed'
        },
        'step-before': {
          'label': 'step-before'
        },
        'step-after': {
          'label': 'step-after'
        },
        'basis': {
          'label': 'basis'
        },
        'basis-open': {
          'label': 'basis-open'
        },
        'basis-closed': {
          'label': 'basis-closed'
        },
        'bundle': {
          'label': 'bundle'
        },
        'cardinal': {
          'label': 'bundle'
        },
        'cardinal-open': {
          'label': 'cardinal-open'
        },
        'cardinal-closed': {
          'label': 'cardinal-closed'
        },
        'monotone': {
          'label': 'monotone'
        }
      },
      'style': {
        'stack': {
          'label': 'stack'
        },
        'stream': {
          'label': 'stream'
        },
        'stream-center': {
          'label': 'stream-center'
        },
        'expand': {
          'label': 'expand'
        },
        'stack_percent': {
          'label': 'stack_percent'
        }
      },
      'labelType': {
        'key': {
          'label': 'key'
        },
        'value': {
          'label': 'value'
        },
        'percent': {
          'label': 'percent'
        }
      },
      'valueFormat': {
        'function:text': {
          'label': 'text',
          'option': function(d) {
            return d;
          }
        },
        'function:date': {
          'label': 'date',
          'option': function(d) {
            return d3.time.format('%x')(new Date(Date.parse(d)));
          }
        }
      },
      'tickFormat': {
        'function:text': {
          'label': 'text',
          'option': function(d) {
            return d;
          }
        },
        'function:percent': {
          'label': 'percent',
          'option': function(d) {
            return d3.format('.0%')(d);
          }
        },
        'function:price': {
          'label': 'price',
          'option': function(d) {
            return d3.format('$,.1f')(d);
          }
        },
        'function:year': {
          'label': 'year',
          'option': function(d) {
            return d3.time.format('%y')(new Date(Date.parse(d)));
          }
        }
      },
      'x': {
        'function:2d-array': xTwoDimensionalArray,
        'function:key/value': xKeyValue,
        'function:x/y': xValue,
        'function:label/value': xLabelValue
      },
      'y': {
        'function:2d-array': yTwoDimensionalArray,
        'function:key/y': yValue,
        'function:label/value': yLabelValue,
        'function:cleanedy': yCleaned
      },
      'tooltipContent': {
        'function:key/value': {
          'label': 'key/value',
          'option': function(key, y, e, graph) {
            return '<h3>' + key + '</h3>' +'<p>' + y + '</p>' ;
          }
        },
        'function:value only': {
          'label': 'value only',
          'option': function(key, y) {
            return '<h3>' + y + '</h3>';
          }
        },
        'function:key only': {
          'label': 'key only',
          'option': function(key) {
            return '<h3>' + key + '</h3>';
          }
        }
      },
      'fillQuartiles': {
        'function:flat': {
          'label': 'flat',
          'option': function(d) {
            return d/4;
          }
        }
      }
    });
}));

(function(angular, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['angular'], function(angular) {
      return factory(angular);
    });
  } else {
    return factory(angular);
  }
} (angular || null, function(angular) {

  'use strict';

  /**
   * @ngdoc module
   * @name chartbuilderCharts
   * @description chartbuilderCharts: Render chartbuilder charts in templates
   * @example
   <doc:example>
   <doc:source>
   <script>
     var app = angular.module('myApp', ['chartbuilderCharts'])
       .controller('MyCtrl', function($scope) {
         $scope.data = data; // This is where the chart object gets loaded
       });
   </script>
   <div chartbuilder-chart data="data"></div>
   </doc:source>
   </doc:example>
   */

  var app = angular.module('chartbuilderCharts', ['datamaps', 'chartbuilder.nvd3', 'chartbuilderOptions'])
    .directive('chartbuilderChart', ['$compile', function($compile) {
      return {
        restrict: 'EA',
        scope: {
          data: '=?'
        },

        link: function(scope, element) {
          scope.dataStore = scope.data;

          // Define child scope and template
          var childScope = scope.$new();

          // Define build template function
          scope.build = function(_scope) {
            element.html('').append($compile(scope.data.template)(_scope));
          };

          // Refresh directive when data changes
          scope.$watch('data', function(data) {
            if (angular.isUndefined(data)) {
              return false;
            }
            childScope.$destroy();
            childScope = scope.$new();
            scope.build(childScope);
          }, true);

          // Build template view
          scope.build(childScope);
        }
      };
    }]);
  return app;
}));
