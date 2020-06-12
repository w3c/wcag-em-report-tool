'use strict';

angular.module('wcagReporter')
  .service('Page', function ($filter) {
    var translateFilter = $filter('translate');

    function Page () {
      this.type = [
        'TestSubject',
        'WebPage'
      ];
    }

    Page.updateSource = function (page) {
      var source = $filter('getUrl')(page.description);
      if (source) {
        page.source = source;
      } else {
        delete page.source;
      }
      return source;
    };

    Page.prependProtocol = function (page) {
      if (page.description && page.description.match(/^([\da-z\.-]+)\.([a-z\.]{2,6})/)) {
        page.description = 'http://' + page.description;
      }
    };

    Page.openInWindow = function (page, target) {
      target = target || '_blank';
      if (page.source) {
        window.open(page.source, target);
      }
    };

    Page.prototype = {
      type: [
        'TestSubject',
        'WebPage'
      ],
      id: '',
      description: undefined,
      title: '',
      tested: false,
      selected: false,
      displayTitle: function () {
        var num = 0;
        if (this.title.trim()) {
          return this.title;
        } else if (this.id.substr(0, 9) === '_:struct_') {
          num = +this.id.substr(9);
          return translateFilter('SAMPLE.STRUCTURED_PAGE') + ' ' + (num + 1);
        } else if (this.id.substr(0, 7) === '_:rand_') {
          num = +this.id.substr(7);
          return translateFilter('SAMPLE.RANDOM_PAGE') + ' ' + (num + 1);
        } else {
          return translateFilter('SAMPLE.SAMPLE_PAGE');
        }
      }
    };

    return Page;
  });
