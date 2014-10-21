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
    value('chartbuilderOptionHelp', {
      'forceX': 'Set the range of the graph if you\'d like something other than the min and max values from your data set',
      'margin': 'Adjust the whitespace around this element'
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
            return d3.time.format('\'%y')(new Date(d));
          }
        }
      },
      'x': {
        'function:2d-array': xTwoDimensionalArray,
        'function:key/value': xKeyValue,
        'function:x/y': xValue,
        'function:label/value': xLabelValue,
        'function:date': {
          'label': 'date',
          'option': function(d) {
            return new Date(Date.parse(d.x));
          }
        }
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
