require('nvd3');
require('./angular-nvd3');
require('./lineChart/main');
require('./lineWithFocusChart/main');
require('./cumulativeLineChart/main');
require('./discreteBarChart/main');
require('./multiBarChart/main');
require('./multiBarHorizontalChart/main');
require('./pieChart/main');
require('./historicalBarChart/main');
require('./stackedAreaChart/main');
require('./scatterChart/main');
require('./scatterPlusLineChart/main');

angular

  .module('chartbuilder.nvd3', [
    'angular-nvd3',
    'chartbuilder.nvd3.lineChart',
    'chartbuilder.nvd3.lineWithFocusChart',
    'chartbuilder.nvd3.cumulativeLineChart',
    'chartbuilder.nvd3.discreteBarChart',
    'chartbuilder.nvd3.multiBarChart',
    'chartbuilder.nvd3.multiBarHorizontalChart',
    'chartbuilder.nvd3.pieChart',
    'chartbuilder.nvd3.historicalBarChart',
    'chartbuilder.nvd3.stackedAreaChart',
    'chartbuilder.nvd3.scatterChart',
    'chartbuilder.nvd3.scatterPlusLineChart'
  ]);
