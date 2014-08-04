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
        meta: {},
        data: [],
        columnValues: [],
        resetData: function() {
          this.data = [{ key: 'Example Group', values: [] }];
        },
        addGroup: function(title) {
          this.data.push({ key: title, values: [] });
        },
        showSampleData: function() {
          this.data = this.sampleData.exampleData;
        },
        init: function(init) {
          this.sampleData = init.data;
          this.dataFormat = init.dataFormat;
          this.columnValues = init.dataFormat();
          if (angular.isDefined(init.options)) { 
            this.options = init.options;
          }
          if (angular.isDefined(init.meta)) {
            this.meta = init.meta;
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
          if (val === null) {
            return 'null';
          }
          else if (val === undefined) {
            return 'undefined';
          }
          else if (val.constructor === Array) {
            return 'array';
          }
          else if (val.constructor === Object) {
            return 'object';
          }
          else if (val.constructor === String) {
            return 'string';
          }
          else if (val.constructor === Number) {
            return 'number';
          }
          else if (val.constructor === Boolean) {
            return 'boolean';
          }
          else if (val.constructor === Function) {
            return 'function';
          }
          else {
            return 'object';
          }
        },
        keys: function(obj) {
          return (obj instanceof Object) ? Object.keys(obj) : [];
        },
        tryGetFunction: function(str) {
          if (str.trim().substring(0, 8) === 'function') {
            try {
              var func = eval( '(' + str.trim() + ')' );
              return func;
            } catch(e) {}
          }
        }
      };
    });
});
