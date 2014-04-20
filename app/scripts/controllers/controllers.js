define(['angular', 'services'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('webControllers', ['webServices'])
		.controller('headerCtrl', [
				'$scope',
				'$location',
				function($scope, $location) {
					$scope.isActive = function(viewLocation) {
						return viewLocation === $location.path();
					}
				}
		])
		.controller('Home', [
        '$scope',
        '$location',
        function($scope, $location) {
            /* initialize */
        }
    ])
		.controller('Chartbuilder', ['$scope', '$location', '$state', '$http', '$filter', '$stateParams', 'getSampleData', function($scope, $location, $state, $http, $filter, $stateParams, getSampleData) {
			$scope.exampleData = [];
			$scope.chartHeight = 600;
			$scope.isDonut = false;
			$scope.chartDisplayType = [
				{ name: 'Line Chart' },
				{ name: 'Cumulative Line Chart' },
				{ name: 'Line with Focus Chart' },
				{ name: 'Stacked Area Chart' },
				{ name: 'Discrete Bar Chart' },
				{ name: 'Multi Bar Chart' },
				{ name: 'Multi Bar Horizontal Chart', group: true },
				{ name: 'Pie Chart' },
				{ name: 'Scatter Chart' }
			];

			$scope.$watch('selectedChartType', function(newval) {
				if (angular.isUndefined(newval)) return false;
				$state.go('chartbuilder.graph', { graphType: $filter('slugify')(newval.name) });
			}, true);

			$scope.$watch('isDonut', function(newval) {
				console.log(newval);
			});

			getSampleData().then(function(data) {
				$scope.sampleData = data;
			});

			$scope.resetData = function() {
				$scope.exampleData = [];
			}

			$scope.getSampleData = function() {
				$scope.exampleData = $scope.sampleData[$filter('slugify')($scope.selectedChartType.name)];
			}

			$scope.addGroup = function() {
				if (!$scope.newDataGroup) return false;
				$scope.exampleData.push({ key: $scope.newDataGroup, values: [] });
				$scope.newDataGroup = '';
			}

			// Functions for cumulative line graph
			$scope.xLineFunction = function(){
				return function(d) {
					return d[0];
				}
			};
			$scope.yLineFunction = function(){
				return function(d) {
					return d[1]/100;
				}
			}

			// Functions for pie chart rendering
			$scope.xPieFunction = function(){
				return function(d) {
					return d.key;
				};
			}
			$scope.yPieFunction = function(){
				return function(d) {
					return d.y;
				};
			}

    }])
    .controller('About', ['$scope', '$location', function($scope, $location) {

    }]);
});
