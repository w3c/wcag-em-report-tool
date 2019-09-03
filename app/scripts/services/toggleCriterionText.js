'use strict';

angular.module('wcagReporter')
  .value('toggleCriterionText', function toggleCriterionText (elm) {
    var expandState = [
      true,
      'true'
    ].indexOf(elm.getAttribute('aria-expanded')) !== -1;
    elm.setAttribute('aria-expanded', !expandState);

    var section = elm.parentNode.parentNode.nextSibling;
    section.classList.toggle('collapsed');
  });
