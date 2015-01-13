'use strict';

require('./module');

angular

  .module('chartbuilderDirectives')

  .directive('bsAffix', function($window, $location) {

    var checkPosition = function(instance, el, options) {

      var scrollTop = window.pageYOffset,
        scrollHeight = document.body.scrollHeight,
        position = jQuery(el[0]).offset(),
        height = jQuery(el[0]).height(),
        windowHeight = jQuery(window).height(),
        offsetTop = options.offsetTop * 1,
        offsetBottom = options.offsetBottom * 1,
        reset = 'affix affix-top affix-bottom',
        affix;

      if (instance.unpin !== null && (scrollTop + instance.unpin <= position.top)) {
        affix = false;
      } else if (windowHeight >= height) {
        affix = 'top';
      } else if (offsetBottom && (height >= windowHeight - offsetBottom)) {
        affix = 'bottom';
      } else if (offsetTop && scrollTop <= offsetTop) {
        affix = 'top';
      } else {
        affix = false;
      }

      if (instance.affixed === affix) {
        return;
      }

      instance.affixed = affix;
      instance.unpin = affix === 'bottom' ? position.top - scrollTop : null;

      el.removeClass(reset).addClass('affix');
      if (affix) {
        el.addClass('affix' + (affix ? '-' + affix : ''));
      }
    };

    var checkCallbacks = function(scope, instance, element, attrs) {
      if (instance.affixed) {
        if (attrs.onUnaffix) {
          eval('scope.' + attrs.onUnaffix);
        }
      }
      else {
        if (attrs.onAffix) {
          eval('scope.' + attrs.onAffix);
        }
      }
    };

    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var instance = {
          unpin: null
        };

        angular.element($window).bind('scroll', function() {
          checkPosition(instance, element, attrs);
          checkCallbacks(scope, instance, element, attrs);
        });

        angular.element($window).bind('click', function() {
          setTimeout(function() {
            checkPosition(instance, element, attrs);
            checkCallbacks(scope, instance, element, attrs);
          }, 1);
        });
      }
    };

  });
