/*
 Modular version of the line-chart nvd3-directive

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('chartbuilder.linechart', ['nvd3ChartDirectives'])
  .value('chartbuilder.config', {})
  .config('$stateProvider', function($stateProvider) {
    $stateProvider.state('chartbuilder.linechart', {
      url: '/line-chart',
      templateUrl: function(stateParams) {
        return 'template.html';
      }
    });

    var module = {
      name: 'Line Chart',
      slug: 'line-chart'
    }
  });
