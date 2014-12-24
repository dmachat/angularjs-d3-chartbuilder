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

  var xKeyValue = {
    'label': 'Key',
    'option': function(d) {
      return d.key;
    }
  }

  var xLabelValue = {
    'label': 'Label',
    'option': function(d) {
      return d.label;
    }
  }

  var xValue = {
    'label': 'X',
    'option': function(d) {
      return d.x;
    }
  }

  var yValue = {
    'label': 'Y',
    'option': function(d) {
      return d.y;
    }
  }

  var yPercent = {
    'label': 'Y Percent Value',
    'option': function(d) {
      return d.y / 100;
    }
  }

  var yLabelValue = {
    'label': 'Value',
    'option': function(d) {
      return d.value;
    }
  }

  var formatters = {
    'function:text': {
      'label': 'Text (unformatted)',
      'option': function(d) {
        return d;
      }
    },
    'function:percent': {
      'label': 'Percent (no decimal)',
      'option': function(d) {
        return d3.format('.0%')(d);
      }
    },
    'function:percent-.1': {
      'label': 'Percent (0.1%)',
      'option': function(d) {
        return d3.format('.1%')(d);
      }
    },
    'function:percent-.01': {
      'label': 'Percent (0.01%)',
      'option': function(d) {
        return d3.format('.2%')(d);
      }
    },
    'function:percent-unmultiplied': {
      'label': 'Percent (unmultiplied)',
      'option': function(d) {
        return d3.format('.0%')(d / 100);
      }
    },
    'function:price': {
      'label': 'Currency (no decimal)',
      'option': function(d) {
        return d3.format('$,.0f')(d);
      }
    },
    'function:price-.1': {
      'label': 'Currency ($0.1)',
      'option': function(d) {
        return d3.format('$,.1f')(d);
      }
    },
    'function:price-.01': {
      'label': 'Currency ($.01)',
      'option': function(d) {
        return d3.format('$,.2f')(d);
      }
    },
    'function:year': {
      'label': 'Year (\'YY)',
      'option': function(d) {
        return d3.time.format('\'%y')(new Date(d));
      }
    },
    'function:year-yyyy': {
      'label': 'Year (YYYY)',
      'option': function(d) {
        return d3.time.format('%Y')(new Date(d));
      }
    }
  }

  var app = angular.module('chartbuilderOptions').
    value('chartbuilderOptionHelp', {
      'forceX': {
        'help': 'Set the min (0) and the max (1) values to scale this axis to',
        'label': 'x-Axis Endpoints'
      },
      'forceY': {
        'help': 'Set the min (0) and the max (1) values to scale this axis to',
        'label': 'y-Axis Endpoints'
      },
      'x': {
        'help': 'Select the correct data type for values on this axis',
        'label': 'x-Axis Datatype'
      },
      'y': {
        'help': 'Select the correct data type for values on this axis',
        'label': 'y-Axis Datatype'
      },
      'showXAxis': {
        'label': 'Show x-Axis'
      },
      'showYAxis': {
        'label': 'Show y-Axis'
      },
      'staggerLabels': {
        'label': 'Stagger Tick Labels'
      },
      'rightAlignYAxis': {
        'label': 'Align y-Axis to the right'
      },
      'tooltips': {
        'label': 'Show Tooltips'
      },
      'tickFormat': {
        'label': 'Tick Formatter'
      },
      'valueFormat': {
        'label': 'Value Formatter'
      },
      'margin': {
        'help': 'Adjust the whitespace around this element',
        'label': 'Margin'
      }
    }).
    value('chartbuilderOptionValues', {

      //
      // NVD3 options
      //

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
      'valueFormat': formatters,
      'tickFormat': formatters,
      'x': {
        'function:key/value': xKeyValue,
        'function:x/y': xValue,
        'function:label/value': xLabelValue,
        'function:timestamp': {
          'label': 'Timestamp',
          'option': function(d) {
            if (isNaN(d.x)) {
              return null;
            }
            return new Date(+d.x);
          }
        },
        'function:date': {
          'label': 'Date',
          'option': function(d) {
            return new Date(Date.parse(d.x));
          }
        },
        'function:datefromarray': {
          'label': 'Date (Stacked Area)',
          'option': function(d) {
            return new Date(Date.parse(d[0]));
          }
        }
      },
      'y': {
        'function:key/y': yValue,
        'function:yPercentData': yPercent,
        'function:label/value': yLabelValue,
        'function:valuefromarray': {
          'label': 'Value (Stacked Area)',
          'option': function(d) {
            return d[1];
          }
        }
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
      },

      //
      // Datamaps options
      //
      'mapType': {
        'usa': {
          'label': 'usa'
        },
        'world': {
          'label': 'world'
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
    .value('pageCharts', {})
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
            var template = [
              '<h2>{{ data.meta.title }}</h2>',
              '<h4>{{ data.meta.subtitle }}</h4>',
              scope.data.template,
              '<p>{{ data.meta.caption }}</p>',
              '<h6 ng-if="data.meta.attribution">{{ data.meta.attribution }}</h6>'
            ].join('');
            element.html('').append($compile(template)(_scope));
          };

          // Refresh directive when data changes
          scope.$watch('data', function(data) {
            if (angular.isUndefined(data) || angular.isUndefined(data.template)) {
              return false;
            }
            childScope.$destroy();
            childScope = scope.$new();
            scope.build(childScope);
          }, true);

          // Build template view
          //scope.build(childScope);
        }
      };
    }])
    .controller('chartbuilderUICtrl', ['$scope', 'pageCharts', function($scope, pageCharts) {
      $scope.pageCharts = pageCharts;
    }]);

  return app;
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
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['chartbuilderCharts']);
  });
}));
