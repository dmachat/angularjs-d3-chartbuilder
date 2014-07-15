define(['angular'], function(angular) {
  'use strict';

  /* Services */
  angular.module('chartbuilderServices', [])
    .factory('getSampleData', ['$http', function($http) {
      return function(path) {
        return $http.get(path).then(function(result) {
          return result.data;
        });
      };
    }])
    .service('chartbuilderDataStore', function() {
      var dataStore = {
        opts: {},
        data: [],
        resetData: function() {
          this.data = [];
          this.columnTypes = [
            (isNaN(dataStore.sampleData[0].values[0][0]) ? 'Text' : 'Number'),
            (isNaN(dataStore.sampleData[0].values[0][1]) ? 'Text' : 'Number')
          ];
          angular.forEach(dataStore.sampleData, function(group, idx) {
            this.data.push({ key: 'Example Group ' + (idx + 1), values: [ [ ((this.columnTypes[0] === 'Text') ? 'A' : 0), ((this.columnTypes[1] === 'Text') ? 'A' : 0) ] ] });
          }, dataStore);
        },
        showSampleData: function() {
          this.data = dataStore.sampleData;
        },
        init: function(initData) {
          this.sampleData = initData.exampleData;
          if (angular.isDefined(initData.opts)) { 
            this.opts = angular.extend(initData.opts, this.opts);
          }
          if (initData.exampleData.length > 1) {
            this.opts.multigroup = true;
          }
          this.resetData();
        }
      };

      return dataStore;

    });
});
