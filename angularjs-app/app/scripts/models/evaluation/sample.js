'use strict';

angular.module('wcagReporter')
  .service('evalSampleModel', function (Page) {
    var ng = angular;
    var sampleModel = {};
    var randomPages = [];
    var structuredPages = [];

    /**
     * Get the next available page number for a given sample
     * @param  {object} sample
     * @return {int}    pageNum
     */
    function getAvailablePageNum (sample) {
      var name, lastId;
      if (!ng.isArray(sample.webpage) || sample.webpage.length === 0) {
        return 0;
      }

      name = (sample === sampleModel.randomSample ? '_:rand_' : '_:struct_');
      lastId = sample.webpage.map(function (page) {
        return +page.id.substr(name.length);
      })
        .sort(function (a, b) {
          return a - b;
        })
        .pop();

      return lastId + 1;
    }

    sampleModel.structuredSample = {
      webpage: randomPages
    };

    sampleModel.randomSample = {
      webpage: structuredPages
    };

    sampleModel.removePage = function (sample, pageNum) {
      var page;
      if (!ng.isNumber(pageNum)) {
        pageNum = sample.webpage.indexOf(pageNum);
      }

      if (ng.isNumber(pageNum) && pageNum >= 0) {
        page = sample.webpage.splice(pageNum, 1)[0];
      }
      return page;
    };

    sampleModel.addNewStructuredPage = function () {
      var sample = sampleModel.structuredSample;
      var page = new Page();
      var num = getAvailablePageNum(sample);

      sample.webpage.push(page);
      page.id = '_:struct_' + num;
      page.title = '';
      return page;
    };

    sampleModel.addNewRandomPage = function () {
      var page = new Page();
      var num = getAvailablePageNum(sampleModel.randomSample);

      sampleModel.randomSample.webpage.push(page);
      page.id = '_:rand_' + num;
      page.title = '';
      return page;
    };

    sampleModel.addNewPage = function (sample) {
      if (sample === sampleModel.randomSample) {
        return sampleModel.addNewRandomPage();
      } else {
        return sampleModel.addNewStructuredPage();
      }
    };

    sampleModel.getPageByTitle = function (title) {
      var res;
      sampleModel.getPages()
        .forEach(function (page) {
          if (page.title === title) {
            res = page;
          }
        });
      return res;
    };

    sampleModel.getPages = function () {
      return sampleModel.structuredSample.webpage
        .concat(sampleModel.randomSample.webpage);
    };

    sampleModel.getFilledPages = function () {
      return sampleModel.getPages()
        .filter(function (page) {
          return (page.description || page.title);
        });
    };

    sampleModel.getSelectedPages = function () {
      return sampleModel.getPages()
        .reduce(function (arr, page) {
          if (page.selected) {
            arr.push(page);
          }
          return arr;
        }, []);
    };

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    sampleModel.validate = function () {
      return [];
    };

    /**
     * Clean up the data so it can be exported
     */
    sampleModel.exportData = function () {
      var samples;

      // Only export the following properties
      var props = [
        'type',
        'id',
        'description',
        'source',
        'title',
        'tested'
      ];

      // For both samples
      samples = [
        sampleModel.structuredSample.webpage,
        sampleModel.randomSample.webpage
      ]
        .map(function (webpages) {
          return webpages.map(function (page) {
            // create a copy of a page with only the permitted properties
            var newPage = {};
            props.forEach(function (prop) {
              newPage[prop] = page[prop];
            });
            return newPage;
          });
        });
      // and return the samples
      return {
        structuredSample: { webpage: samples[0] },
        randomSample: { webpage: samples[1] }
      };
    };

    sampleModel.importData = function (data) {
      [
        'structuredSample',
        'randomSample'
      ].forEach(function (prop) {
        sampleModel[prop] = data[prop];
        if (typeof data[prop] !== 'object') {
          sampleModel[prop] = {};
        }

        if (typeof sampleModel[prop].webpage === 'undefined') {
          sampleModel[prop].webpage = [];
        } else if (!ng.isArray(sampleModel[prop].webpage)) {
          sampleModel[prop].webpage = [sampleModel[prop].webpage];
        }
        sampleModel[prop].webpage.forEach(function (pageData) {
          pageData.displayTitle = Page.prototype.displayTitle;
        });
      });
    };

    sampleModel.getPageById = function (id) {
      var pages = sampleModel.getPages();
      for (var i = 0; i < pages.length; i++) {
        if (pages[i].id === id) {
          return pages[i];
        }
      }
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(sampleModel);

    return sampleModel;
  });
