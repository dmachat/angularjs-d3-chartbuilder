(function(e,t,n){"use strict";function i(){function e(e,n){return t.extend(new(t.extend(function(){},{prototype:e})),n)}function r(e,t){var n=t.caseInsensitiveMatch,r={originalPath:e,regexp:e},i=r.keys=[];return e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(e,t,n,r){var s=r==="?"?r:null,o=r==="*"?r:null;return i.push({name:n,optional:!!s}),t=t||"",""+(s?"":t)+"(?:"+(s?t:"")+(o&&"(.+?)"||"([^/]+)")+(s||"")+")"+(s||"")}).replace(/([\/$\*])/g,"\\$1"),r.regexp=new RegExp("^"+e+"$",n?"i":""),r}var n={};this.when=function(e,i){n[e]=t.extend({reloadOnSearch:!0},i,e&&r(e,i));if(e){var s=e[e.length-1]=="/"?e.substr(0,e.length-1):e+"/";n[s]=t.extend({redirectTo:e},r(s,i))}return this},this.otherwise=function(e){return this.when(null,e),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(r,i,s,o,u,a,f,l){function p(e,t){var n=t.keys,r={};if(!t.regexp)return null;var i=t.regexp.exec(e);if(!i)return null;for(var s=1,o=i.length;s<o;++s){var u=n[s-1],a="string"==typeof i[s]?decodeURIComponent(i[s]):i[s];u&&a&&(r[u.name]=a)}return r}function d(){var e=v(),n=h.current;if(e&&n&&e.$$route===n.$$route&&t.equals(e.pathParams,n.pathParams)&&!e.reloadOnSearch&&!c)n.params=e.params,t.copy(n.params,s),r.$broadcast("$routeUpdate",n);else if(e||n)c=!1,r.$broadcast("$routeChangeStart",e,n),h.current=e,e&&e.redirectTo&&(t.isString(e.redirectTo)?i.path(m(e.redirectTo,e.params)).search(e.params).replace():i.url(e.redirectTo(e.pathParams,i.path(),i.search())).replace()),o.when(e).then(function(){if(e){var n=t.extend({},e.resolve),r,i;return t.forEach(n,function(e,r){n[r]=t.isString(e)?u.get(e):u.invoke(e)}),t.isDefined(r=e.template)?t.isFunction(r)&&(r=r(e.params)):t.isDefined(i=e.templateUrl)&&(t.isFunction(i)&&(i=i(e.params)),i=l.getTrustedResourceUrl(i),t.isDefined(i)&&(e.loadedTemplateUrl=i,r=a.get(i,{cache:f}).then(function(e){return e.data}))),t.isDefined(r)&&(n.$template=r),o.all(n)}}).then(function(i){e==h.current&&(e&&(e.locals=i,t.copy(e.params,s)),r.$broadcast("$routeChangeSuccess",e,n))},function(t){e==h.current&&r.$broadcast("$routeChangeError",e,n,t)})}function v(){var r,s;return t.forEach(n,function(n,o){!s&&(r=p(i.path(),n))&&(s=e(n,{params:t.extend({},i.search(),r),pathParams:r}),s.$$route=n)}),s||n[null]&&e(n[null],{params:{},pathParams:{}})}function m(e,n){var r=[];return t.forEach((e||"").split(":"),function(e,t){if(t===0)r.push(e);else{var i=e.match(/(\w+)(.*)/),s=i[1];r.push(n[s]),r.push(i[2]||""),delete n[s]}}),r.join("")}var c=!1,h={routes:n,reload:function(){c=!0,r.$evalAsync(d)}};return r.$on("$locationChangeSuccess",d),h}]}function s(){this.$get=function(){return{}}}function o(e,n,r){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(i,s,o,u,a){function p(){f&&(f.$destroy(),f=null),l&&(r.leave(l),l=null)}function d(){var o=e.current&&e.current.locals,u=o&&o.$template;if(t.isDefined(u)){var d=i.$new(),v=e.current,m=a(d,function(e){r.enter(e,null,l||s,function(){t.isDefined(c)&&(!c||i.$eval(c))&&n()}),p()});l=m,f=v.scope=d,f.$emit("$viewContentLoaded"),f.$eval(h)}else p()}var f,l,c=o.autoscroll,h=o.onload||"";i.$on("$routeChangeSuccess",d),d()}}}function u(e,t,n){return{restrict:"ECA",priority:-400,link:function(r,i){var s=n.current,o=s.locals;i.html(o.$template);var u=e(i.contents());if(s.controller){o.$scope=r;var a=t(s.controller,o);s.controllerAs&&(r[s.controllerAs]=a),i.data("$ngControllerController",a),i.children().data("$ngControllerController",a)}u(r)}}}var r=t.module("ngRoute",["ng"]).provider("$route",i);r.provider("$routeParams",s),r.directive("ngView",o),r.directive("ngView",u),o.$inject=["$route","$anchorScroll","$animate"],u.$inject=["$compile","$controller","$route"]})(window,window.angular);