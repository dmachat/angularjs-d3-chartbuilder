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
    .service('chartbuilderData', function() {
      var dataStore = {
        options: {},
        data: [],
        resetData: function() {
          this.data = [];
          this.columnTypes = [
            (isNaN(dataStore.sampleData[0].values[0][0]) ? 'Text' : 'Number'),
            (isNaN(dataStore.sampleData[0].values[0][1]) ? 'Text' : 'Number')
          ];
          angular.forEach(dataStore.sampleData, function(group, idx) {
            this.data.push({ key: 'Example Group ' + (idx + 1), values: [ this.dataFormat() ] });
          }, dataStore);
        },
        showSampleData: function() {
          this.data = dataStore.sampleData;
        },
        init: function(init) {
          this.sampleData = init.data.exampleData;
          this.dataFormat = init.dataFormat;
          if (angular.isDefined(init.options)) { 
            this.options = angular.extend(init.options, this.options);
          }
          if (init.data.exampleData.length > 1) {
            this.options.multigroup = true;
          }
          this.resetData();
        }
      };

      return dataStore;

    })
    .service('chartbuilderUtils', function() {
      return {
        // get type for variable val
        getType: function(val) {
          if (val === null) return 'null';
          else if (val === undefined) return 'undefined';
          else if (val.constructor === Array) return 'array';
          else if (val.constructor === Object) return 'object';
          else if (val.constructor === String) return 'string';
          else if (val.constructor === Number) return 'number';
          else if (val.constructor === Boolean) return 'boolean';
          else if (val.constructor === Function) return 'function';
          else return 'object';
        }
      };
    });
});
