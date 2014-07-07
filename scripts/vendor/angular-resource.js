(function(e,t,n){"use strict";function s(e){return e!=null&&e!==""&&e!=="hasOwnProperty"&&i.test("."+e)}function o(e,t){if(!s(t))throw r("badmember",'Dotted member path "@{0}" is invalid.',t);var i=t.split(".");for(var o=0,u=i.length;o<u&&e!==n;o++){var a=i[o];e=e!==null?e[a]:n}return e}function u(e,n){n=n||{},t.forEach(n,function(e,t){delete n[t]});for(var r in e)e.hasOwnProperty(r)&&(r.charAt(0)!=="$"||r.charAt(1)!=="$")&&(n[r]=e[r]);return n}var r=t.$$minErr("$resource"),i=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;t.module("ngResource",["ng"]).factory("$resource",["$http","$q",function(e,i){function p(e){return d(e,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function d(e,t){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,t?"%20":"+")}function v(e,t){this.template=e,this.defaults=t||{},this.urlParams={}}function m(p,d,g){function b(e,t){var n={};return t=l({},d,t),f(t,function(t,r){h(t)&&(t=t()),n[r]=t&&t.charAt&&t.charAt(0)=="@"?o(e,t.substr(1)):t}),n}function w(e){return e.resource}function E(e){u(e||{},this)}var y=new v(p);return g=l({},s,g),f(g,function(s,o){var p=/^(POST|PUT|PATCH)$/i.test(s.method);E[o]=function(o,d,v,m){var g={},S,x,T;switch(arguments.length){case 4:T=m,x=v;case 3:case 2:if(!h(d)){g=o,S=d,x=v;break}if(h(o)){x=o,T=d;break}x=d,T=v;case 1:h(o)?x=o:p?S=o:g=o;break;case 0:break;default:throw r("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var N=this instanceof E,C=N?S:s.isArray?[]:new E(S),k={},L=s.interceptor&&s.interceptor.response||w,A=s.interceptor&&s.interceptor.responseError||n;f(s,function(e,t){t!="params"&&t!="isArray"&&t!="interceptor"&&(k[t]=c(e))}),p&&(k.data=S),y.setUrlParams(k,l({},b(S,s.params||{}),g),s.url);var O=e(k).then(function(e){var n=e.data,i=C.$promise;if(n){if(t.isArray(n)!==!!s.isArray)throw r("badcfg","Error in resource configuration. Expected response to contain an {0} but got an {1}",s.isArray?"array":"object",t.isArray(n)?"array":"object");s.isArray?(C.length=0,f(n,function(e){typeof e=="object"?C.push(new E(e)):C.push(e)})):(u(n,C),C.$promise=i)}return C.$resolved=!0,e.resource=C,e},function(e){return C.$resolved=!0,(T||a)(e),i.reject(e)});return O=O.then(function(e){var t=L(e);return(x||a)(t,e.headers),t},A),N?O:(C.$promise=O,C.$resolved=!1,C)},E.prototype["$"+o]=function(e,t,n){h(e)&&(n=t,t=e,e={});var r=E[o].call(this,e,this,t,n);return r.$promise||r}}),E.bind=function(e){return m(p,l({},d,e),g)},E}var s={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},a=t.noop,f=t.forEach,l=t.extend,c=t.copy,h=t.isFunction;return v.prototype={setUrlParams:function(e,n,i){var s=this,o=i||s.template,u,a,l=s.urlParams={};f(o.split(/\W/),function(e){if(e==="hasOwnProperty")throw r("badname","hasOwnProperty is not a valid parameter name.");!(new RegExp("^\\d+$")).test(e)&&e&&(new RegExp("(^|[^\\\\]):"+e+"(\\W|$)")).test(o)&&(l[e]=!0)}),o=o.replace(/\\:/g,":"),n=n||{},f(s.urlParams,function(e,r){u=n.hasOwnProperty(r)?n[r]:s.defaults[r],t.isDefined(u)&&u!==null?(a=p(u),o=o.replace(new RegExp(":"+r+"(\\W|$)","g"),function(e,t){return a+t})):o=o.replace(new RegExp("(/?):"+r+"(\\W|$)","g"),function(e,t,n){return n.charAt(0)=="/"?n:t+n})}),o=o.replace(/\/+$/,"")||"/",o=o.replace(/\/\.(?=\w+($|\?))/,"."),e.url=o.replace(/\/\\\./,"/."),f(n,function(t,n){s.urlParams[n]||(e.params=e.params||{},e.params[n]=t)})}},m}])})(window,window.angular);