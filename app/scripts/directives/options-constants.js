define([
  'angular',
  ], function(angular) {
    'use strict';

    angular.module('chartbuilderDirectives').
      value('chartbuilderOptionValues', {
        'interpolate': {
          'linear': 'linear',
          'linear-closed': 'linear-closed',
          'step-before': 'step-before',
          'step-after': 'step-after',
          'basis': 'basis',
          'basis-open': 'basis-open',
          'basis-closed': 'basis-closed',
          'bundle': 'bundle',
          'cardinal': 'bundle',
          'cardinal-open': 'cardinal-open',
          'cardinal-closed': 'cardinal-closed',
          'monotone': 'monotone'
        },
        'style': {
          'stack': 'stack',
          'stream': 'stream',
          'stream-center': 'stream-center',
          'expand': 'expand',
          'stack_percent': 'stack_percent'
        },
        'valueFormat': {
          'text': function(d) {
            return d;
          },
          'date': function(d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        'tickFormat': {
          'text': function(d) {
            return d;
          },
          'percent': function(d) {
            return d3.format('.0%')(d);
          },
          'price': function(d) {
            return d3.format('$,d')(d);
          }
        },
        'x': {
          '2d-array': function(d) {
            return d[0];
          }
        },
        'y': {
          '2d-array': function(d) {
            return d[1];
          }
        },
        'fillQuartiles': {
          'flat': function(d) {
            return d/4;
          }
        }
      });
  });
