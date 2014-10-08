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
