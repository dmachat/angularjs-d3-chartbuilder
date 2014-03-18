define(['angular'], function(angular) {
    'use strict';

    /* Services */
    angular.module('webServices', ['ngResource'])
        .factory('LoginService', [
            '$resource',
            function($resource) {
                return $resource('login');
            }
        ]);
});
