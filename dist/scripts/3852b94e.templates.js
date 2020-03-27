angular.module('wert-templates', []).run(['$templateCache', function($templateCache) {
$templateCache.put('views/directives/buttonCollapse.html',
'<a href="" ng-click="obj[prop] = !obj[prop]" class="collapse-button" aria-expanded="{{!obj[prop]}}" role="button">\n' +
'  <span ng-if="!obj[prop]" class="glyphicon glyphicon-chevron-down"></span>\n' +
'  <span ng-if="obj[prop]" class="glyphicon glyphicon-chevron-right"></span>\n' +
'\n' +
'  <span ng-transclude></span>\n' +
'</a>');
$templateCache.put('views/directives/criterion/criterionBody.html',
'<div>\n' +
'\n' +
'  <hr ng-if="multiPageAsserts.length > 0">\n' +
'\n' +
'  <page-results ng-if="singlePageAsserts.length > 0" class="panel-body assert-indent appear" asserts="singlePageAsserts" value="criterion" options="opt"></page-results>\n' +
'\n' +
'  <div ng-if="singlePageAsserts.length === 0 && opt.editable" class="panel-body assert-indent appear no-selection">\n' +
'    {{ \'AUDIT.NO_PAGE_SELECTED\' | translate}}\n' +
'  </div>\n' +
'\n' +
'</div>');
$templateCache.put('views/directives/criterion/earlAssert.html',
'<div class="earl-assert">\n' +
'  <div class="row" ng-transclude></div>\n' +
'\n' +
'  <div class="row outcome" ng-if="opt.editable">\n' +
'    <div class="col-sm-4 col-md-3">\n' +
'      <label for="result_outcome_{{$id}}" class="sr-only">{{ \'AUDIT.LABEL_OUTCOME\' | translate}}</label>\n' +
'      <select class="stretch-control result-select" id="result_outcome_{{$id}}" ng-options="outcome.id as outcome.name for outcome in outcomes" ng-model="result.outcome" ng-change="updateMetadata()"></select>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-8 col-md-9" ng-if="opt.editable">\n' +
'      <result-description value="result.description" update-metadata="updateMetadata"></result-description>\n' +
'    </div>\n' +
'  </div>\n' +
'  \n' +
'  \n' +
'  <div class="row outcome" ng-if="!opt.editable">\n' +
'    <div class="col-sm-4 col-md-3">\n' +
'      <strong>{{ \'AUDIT.LABEL_OUTCOME\' | translate}}</strong>:&nbsp;{{ result.outcome | rdfToLabel }}\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-8 col-md-9" ng-init="" ng-bind-html="htmlResult"></div>\n' +
'  </div>\n' +
'\n' +
'</div>\n' +
'');
$templateCache.put('views/directives/criterion/macroResults.html',
'<div>\n' +
'  <earl-assert ng-repeat="assert in asserts" assert="assert" options="opt" class="appear">\n' +
'\n' +
'    <div class="col-sm-4 col-md-3 subject-type">{{ \'AUDIT.RESULTS_FOR\' | translate }}:</div>\n' +
'\n' +
'    <div class="col-sm-8 col-md-9" ng-if="opt.editable">\n' +
'\n' +
'      <div class="pull-right">\n' +
'\n' +
'        <button ng-click="transferConfirm = !transferConfirm" type="submit" class="glyphicon glyphicon-transfer">\n' +
'          <span class="sr-only">{{ \'AUDIT.BTN_TRANSFER_MACRO_ASSERT\' | translate }}</span>\n' +
'        </button>\n' +
'        <div class="popover left confirm-transfer" ng-show="transferConfirm">\n' +
'          <span class="arrow"></span>\n' +
'          <div class="popover-inner">\n' +
'            <div class="popover-content ng-binding">\n' +
'              {{ \'AUDIT.CONFIRM_TRANSFER_MACRO_RESULT\' | translate }}\n' +
'              <a href="" ng-click="transferMacroData(assert)">{{ \'COMMON.YES\' | translate }}</a> /\n' +
'              <a href="" ng-click="transferConfirm = false">{{ \'COMMON.NO\' | translate }}</a>\n' +
'            </div>\n' +
'          </div>\n' +
'        </div>\n' +
'\n' +
'        <button ng-click="removeConfirm = !removeConfirm" type="submit" class="glyphicon glyphicon-trash">\n' +
'          <span class="sr-only">{{ \'AUDIT.BTN_REMOVE_MACRO_ASSERT\' | translate }}</span>\n' +
'        </button>\n' +
'        <div class="popover left confirm-remove" ng-show="removeConfirm">\n' +
'          <span class="arrow"></span>\n' +
'          <div class="popover-inner">\n' +
'            <div class="popover-content ng-binding">\n' +
'              {{ \'AUDIT.CONFIRM_REMOVE_RESULT\' | translate }}\n' +
'              <a href="" ng-click="removeAssert(assert)">{{ \'COMMON.YES\' | translate }}</a> /\n' +
'              <a href="" ng-click="removeConfirm = false">{{ \'COMMON.NO\' | translate }}</a>\n' +
'            </div>\n' +
'          </div>\n' +
'        </div>\n' +
'\n' +
'      </div>\n' +
'      <page-select pages="assert.subject"></page-select>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-8 col-md-9" ng-if="!opt.editable">\n' +
'      <em ng-bind="getAllTitles(assert)"></em>\n' +
'    </div>\n' +
'\n' +
'  </earl-assert>\n' +
'</div>');
$templateCache.put('views/directives/criterion/pageResults.html',
'<div>\n' +
'  <earl-assert ng-repeat="assert in asserts" assert="assert" options="opt" class="appear">\n' +
'\n' +
'    <div class="col-xs-12">\n' +
'      {{ \'AUDIT.RESULTS_FOR\' | translate}}:\n' +
'      <em ng-bind="assert.subject[0].displayHandle()"></em>\n' +
'      <span ng-if="assert.subject[0].description">\n' +
'        ({{assert.subject[0].description}})\n' +
'      </span>\n' +
'    </div>\n' +
'\n' +
'  </earl-assert>\n' +
'</div>');
$templateCache.put('views/directives/criterion/pageSelect.html',
'<div>\n' +
'  <datalist id="pagetitles_{{$id}}">\n' +
'    <option ng-repeat="samplePage in unselectedPages" value="{{samplePage.displayTitle()}}">{{samplePage.displayTitle()}}</option>\n' +
'  </datalist>\n' +
'\n' +
'  <button ng-repeat="page in pages" type="button" class="tag label" ng-click="removePage(page)">\n' +
'    {{page.title}}&nbsp;<span class="glyphicon glyphicon-remove"></span>\n' +
'    <span class="hint">{{page.description}}</span>\n' +
'    <span class="sr-only">, {{ \'AUDIT.CLICK_TO_DELETE\' | translate }}</span>\n' +
'  </button>\n' +
'\n' +
'  <input type="text" ng-model="newPage" class="taginput" shy-placeholder="\'AUDIT.LABEL_PAGE_TITLE\' | translate" title="{{ \'AUDIT.LABEL_PAGE_TITLE\' | translate }}" list="pagetitles_{{$id}}" ng-change="addPageToAssert()">\n' +
'\n' +
'</div>');
$templateCache.put('views/directives/criterion/resultDescription.html',
'<div ng-init="focused = false">\n' +
'  <label class="sr-only" for="assert_desc_{{$id}}">{{ \'AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL\' | translate }}</label>\n' +
'  <textarea class="assert_description" id="assert_desc_{{$id}}" auto-resize ng-model="value" ng-change="updateMetadata()" shy-placeholder="\'AUDIT.ASSERTION_RESULT_DESCRIPTION_PLACEHOLDER\' | translate" cols="20" rows="4" id="id"></textarea>\n' +
'</div>\n' +
'');
$templateCache.put('views/directives/evaluate/iconButton.html',
'<span class="">\n' +
'    <button ng-click="click()" class="glyphicon btn btn-default" ng-class="\'glyphicon-\' + icon">\n' +
'    	<span class="hint">{{ label }}</span>\n' +
'    </button>\n' +
'</span>');
$templateCache.put('views/directives/evaluate/infoButton.html',
'<a class="info-icon" href="" role="button" aria-expanded="false"><span class="glyphicon glyphicon-info-sign"></span><span class="sr-only">{{label}}</span></a>');
$templateCache.put('views/directives/evaluate/infoField.html',
'<div class="alert alert-info infobox" id="{{ref}}" tabindex="-1" ng-keyup="close($event)">\n' +
'  <span class="floater"></span>\n' +
'  \n' +
'  <div ng-transclude></div>\n' +
'\n' +
'  <button class="close" ng-click="close($event)">\n' +
'    <span class="glyphicon glyphicon-remove"></span>\n' +
'    <span class="sr-only">{{ button}}</span>\n' +
'  </button>\n' +
'</div>');
$templateCache.put('views/directives/evaluate/inputPages.html',
'<div class="input-page key-value-group" ng-init="col0 = \'visible-xs col-xs-12\';\n' +
'              col1 = \'col-xs-9 col-sm-7 col-md-8 form-block right-col\';\n' +
'              col2 = \'col-xs-9 col-sm-4 col-md-3 form-block right-col\';\n' +
'              col3 = \'col-sm-1 form-block remove-button\';\n' +
'              colHide = \'col-xs-3 visible-xs-and-sr form-block\'">\n' +
'\n' +
'  <header class="row hidden-xs form-block-head" aria-hidden="true">\n' +
'    <div ng-class="col1">\n' +
'      {{ \'SAMPLE.LABEL_PAGE\' | translate}}</div>\n' +
'    <div ng-class="col2">\n' +
'      {{ \'SAMPLE.LABEL_HANDLE\' | translate}}</div>\n' +
'  </header>\n' +
'\n' +
'  <p ng-if="pages.length === 0" class="appear no-selection"><em>\n' +
'    {{ \'SAMPLE.NO_PAGES_DEFINED\' | translate}}\n' +
'  </em></p>\n' +
'\n' +
'  <fieldset class="row form-group-inline appear" ng-repeat="page in pages">\n' +
'    <legend ng-class="col0">\n' +
'      {{ \'SAMPLE.ITEM\' | translate }} {{$index+1}}\n' +
'    </legend>\n' +
'\n' +
'    <label ng-class="colHide" for="rand_page_desc_{{$index}}_{{$id}}">\n' +
'      {{\'SAMPLE.LABEL_HANDLE\' | translate}}:\n' +
'    </label>\n' +
'    <div ng-class="col1">\n' +
'      <input type="text" class="form-control" id="rand_page_desc_{{$index}}_{{$id}}" ng-model="page.description" ng-blur="processPage(page)" shy-placeholder="\'SAMPLE.PLH_PAGE_URL\' | translate">\n' +
'    </div>\n' +
'    <label ng-class="colHide" for="struct_{{$index}}_{{$id}}">\n' +
'      {{ \'SAMPLE.LABEL_PAGE\' | translate }}:\n' +
'    </label>\n' +
'    <div ng-class="col2">\n' +
'      <input type="text" class="form-control" id="struct_{{$index}}_{{$id}}" ng-model="page.title" shy-placeholder="\'SAMPLE.PLH_TITLE\' | translate">\n' +
'    </div>\n' +
'\n' +
'    <div ng-class="col3">\n' +
'      <button class="btn glyphicon glyphicon-remove-sign" ng-click="removePage($index, $event)">\n' +
'        <span class="hint">{{ \'SAMPLE.BTN_REMOVE_PAGE\' | translate}}</span>\n' +
'      </button>\n' +
'    </div>\n' +
'  </fieldset>\n' +
'\n' +
'  <button ng-click="addPage($event)" class="btn btn-default">\n' +
'    <span class="glyphicon glyphicon-plus-sign"></span>\n' +
'    {{ \'SAMPLE.BTN_ADD_PAGE\' | translate }}\n' +
'  </button>\n' +
'</div>');
$templateCache.put('views/directives/evaluate/techSelect.html',
'<div>\n' +
'  <datalist id="tech_titles">\n' +
'    <option ng-repeat="tech in technolgies">{{tech.title}}</option>\n' +
'  </datalist>\n' +
'  <datalist id="tech_specs">\n' +
'    <option ng-repeat="tech in technolgies">{{tech.specs}}</option>\n' +
'  </datalist>\n' +
'  <div ng-repeat="select in selected">\n' +
'    <input list="tech_titles" ng-model="select.title" ng-blur="updateSpec(select)">\n' +
'    <input list="tech_specs" ng-model="select.specs" size="40" ng-blur="updateTitle(select)">\n' +
'  </div>\n' +
'</div>');
$templateCache.put('views/directives/fullReport.html',
'<div id="final_report" class="row">\n' +
'  <h1>{{report.title}}</h1>\n' +
'  <p><em>\n' +
'    {{\'HTML_REPORT.BY\' | translate }} {{report.creator.name}},\n' +
'    {{report.date | date: shortDate}}\n' +
'  </em></p>\n' +
'  <p><em>\n' +
'    {{\'HTML_REPORT.COMMISION_BY\' | translate }} {{report.commissioner}}\n' +
'  </em></p>\n' +
'\n' +
'  <h2>{{\'HTML_REPORT.HD_SUMMARY\'| translate}}</h2>\n' +
'  <div data-ng-bind-html="report.summary | txtToHtml"></div>\n' +
'\n' +
'  <h2>{{\'HTML_REPORT.HD_SCOPE\' | translate }}</h2>\n' +
'  <div data-ng-include data-src="\'views/report/scope.html\'"></div>\n' +
'\n' +
'  <h2>{{\'HTML_REPORT.HD_SCORE\' | translate }}</h2>\n' +
'  <div data-ng-include data-src="\'views/report/score.html\'"></div>\n' +
'\n' +
'  <h2>{{ \'HTML_REPORT.HD_CRITERIA_REPORT\' | translate }}</h2>\n' +
'  <div data-ng-include data-src="\'views/report/findings.html\'"></div>\n' +
'\n' +
'  <h2>{{\'HTML_REPORT.HD_SAMPLE\' | translate }}</h2>\n' +
'  <div data-ng-include data-src="\'views/report/sample.html\'"></div>\n' +
'\n' +
'  <div data-ng-if="report.specifics.trim()">\n' +
'    <h2>{{\'HTML_REPORT.HD_SPECIFICS\' | translate }}</h2>\n' +
'    <div data-ng-bind-html="report.specifics | txtToHtml"></div>\n' +
'  </div>\n' +
'\n' +
'  <h2>{{\'HTML_REPORT.HD_DOCS\' | translate }}</h2>\n' +
'  <ul lang="en">\n' +
'    <li><a target="_blank" href="http://www.w3.org/WAI/standards-guidelines/wcag/">\n' +
'        Web Content Accessibility Guidelines (WCAG)</a> <br>\n' +
'        Overview: www.w3.org/WAI/intro/wcag\n' +
'    </li>\n' +
'    <li><a target="_blank" href="http://www.w3.org/WAI/WCAG21/quickref/">\n' +
'        How to Meet WCAG 2.1 Quick Reference</a><br>\n' +
'        www.w3.org/WAI/WCAG21/quickref/\n' +
'    </li>\n' +
'    <li><a target="_blank" href="http://www.w3.org/WAI/eval/conformance">\n' +
'        WCAG Evaluation Methodology (WCAG-EM)</a><br>\n' +
'        Overview: www.w3.org/WAI/eval/conformance\n' +
'    </li>\n' +
'  </ul>\n' +
'</div>\n' +
'');
$templateCache.put('views/directives/successCriterion.html',
'<div class="panel criterion panel-default" ng-class="getClassName(assert.result.outcome)">\n' +
'\n' +
'  <earl-assert class="panel-heading" assert="assert" options="opt">\n' +
'\n' +
'    <div class="col-xs-12 criterion-title">\n' +
'      <strong>{{ spec.num}} {{ spec.handle}}</strong>: ({{spec.level | rdfToLabel}})\n' +
'      <span class="pull-right">\n' +
'        <button onclick="toggleCriterionText(this)" class="btn btn-default glyphicon glyphicon-education" aria-expanded="false">\n' +
'            <span class="hint">{{\'AUDIT.BTN_SHOW_TEXT\' | translate}}</span>\n' +
'        </button>\n' +
'      </span>\n' +
'\n' +
'    </div><div class="col-xs-12 crit-text collapsed">\n' +
'      <p>{{spec.text}}</p><p>\n' +
'      </p><div ng-repeat="detail in spec.details">\n' +
'        <ul ng-if="detail.type === \'ulist\'">\n' +
'          <li ng-repeat="item in detail.items">\n' +
'            <strong ng-if="item.handle">\n' +
'              {{item.handle}}\n' +
'            </strong>\n' +
'            {{ item.text}}\n' +
'          </li>\n' +
'        </ul>\n' +
'        <ol ng-if="detail.type === \'olist\'">\n' +
'          <li ng-repeat="item in detail.items">\n' +
'            <strong ng-if="item.handle">\n' +
'              {{item.handle}}\n' +
'            </strong>\n' +
'            {{ item.text}}\n' +
'          </li>\n' +
'        </ol>\n' +
'        <p ng-if="details.type === \'note\'">\n' +
'          <em>{{ "AUDIT.NOTE" | translate }}:</em> {{ details.text}}\n' +
'        </p>\n' +
'      </div>\n' +
'      <p>\n' +
'        <a target="_blank" href="{{\n' +
'          \'http://www.w3.org/WAI/WCAG21/Understanding/\' +\n' +
'          spec.id.split(\':\')[1] +\n' +
'          \'.html\'}}">{{ "AUDIT.UNDERSTAND" | translate }} {{spec.number}}\n' +
'          <span class="glyphicon glyphicon-new-window"></span></a>\n' +
'        <a target="_blank" href="{{\n' +
'          \'http://www.w3.org/WAI/WCAG21/quickref/#\' +\n' +
'          spec.id.split(\':\')[1]\n' +
'          }}">{{ "AUDIT.HOW_TO" | translate }} {{spec.number}}\n' +
'          <span class="glyphicon glyphicon-new-window"></span></a>\n' +
'      </p>\n' +
'    </div>\n' +
'    <div class="col-xs-12">{{ \'AUDIT.SAMPLE_FINDINGS\' | translate }}:</div>\n' +
'\n' +
'  </earl-assert>\n' +
'\n' +
'  <div class="crit-detail-btn" ng-if="opt.collapses">\n' +
'    <button class="btn btn-default" aria-expanded="{{!!rootHide[critHide]}}" ng-click="rootHide[critHide] = !rootHide[critHide]">\n' +
'\n' +
'      <span ng-if="!rootHide[critHide]" class="glyphicon glyphicon-chevron-right"></span>\n' +
'      <span ng-if="!rootHide[critHide]" ng-bind="\'AUDIT.BTN_EXPAND_PAGES\' | translate"></span>\n' +
'\n' +
'      <span ng-if="rootHide[critHide]" class="glyphicon glyphicon-chevron-down"></span>\n' +
'      <span ng-if="rootHide[critHide]" ng-bind="\'AUDIT.BTN_COLLAPSE_PAGES\' | translate"></span>\n' +
'\n' +
'    </button>\n' +
'  </div>\n' +
'\n' +
'  <criterion-body options="opt" assert="assert" class="appear-tall" ng-if="rootHide[critHide] || !opt.collapses"></criterion-body>\n' +
'</div>\n' +
'');
$templateCache.put('views/error.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'ERROR.TITLE\') ) }}</h1>\n' +
'\n' +
'<p>{{ \'ERROR.INTRO\' | translate }}</p>\n' +
'\n' +
'<ul>\n' +
'	<li>{{ \'ERROR.SUGGESTION1\' | translate }}</li>\n' +
'	<li ng-bind-html=" \'ERROR.SUGGESTION2\' | translate : {\n' +
'	    link_back: \'#!/ onclick=window.history.back()\'\n' +
'	}"></li>\n' +
'	<li ng-bind-html=" \'ERROR.SUGGESTION3\' | translate : {\n' +
'	    link_format: \'https://github.com/w3c/wcag-em-report-tool/blob/master/docs/EARL%2BJSON-LD.md\'\n' +
'	}"></li>\n' +
'</ul>\n' +
'\n' +
'<p ng-bind-html=" \'ERROR.BUG_REPORT\' | translate : {\n' +
'    link_github: \'https://github.com/w3c/wcag-em-report-tool/blob/master/docs/contribute.md\'\n' +
'}"></p>\n' +
'\n' +
'</main>\n' +
'');
$templateCache.put('views/evaluation/audit.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'AUDIT.TITLE\') ) }}</h1>\n' +
'<p ng-bind-html="\'AUDIT.INTRO\' | translate: {\n' +
'	link_em_4: \'http://www.w3.org/TR/WCAG-EM/#step4 target=_blank\'\n' +
'}"></p>\n' +
'\n' +
'<div class="row">\n' +
'  <div class="col-xs-12 col-sm-4 col-md-3" ng-include src="\'views/evaluation/audit/samplePages.html\'"></div>\n' +
'\n' +
'  <div class="col-xs-12 col-sm-8 col-md-9" ng-include src="\'views/evaluation/audit/criteria.html\'"></div>\n' +
'</div>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>');
$templateCache.put('views/evaluation/audit/criteria-tools.html',
'<fieldset class="sc-filters">\n' +
'  <legend>{{ \'AUDIT.FILTER\' | translate }}:</legend>\n' +
'\n' +
'  <fieldset>\n' +
'    <legend class="sr-only">{{ \'AUDIT.FILTER_VERSION_LEGEND\' | translate }}</legend>\n' +
'\n' +
'    <label for="show_version_21" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.version === \'WCAG21 WCAG20\',\n' +
'      \'btn-primary-invert\': critFilter.version !== \'WCAG21 WCAG20\'\n' +
'    }">\n' +
'      <input id="show_version_21" type="radio" value="WCAG21 WCAG20" ng-model="critFilter.version" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'SCOPE.WCAG21\' | translate}}</span>\n' +
'    </label>\n' +
'\n' +
'    <label for="show_version_21_only" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.version === \'WCAG21\',\n' +
'      \'btn-primary-invert\': critFilter.version !== \'WCAG21\'\n' +
'    }">\n' +
'      <input id="show_version_21_only" type="radio" value="WCAG21" ng-model="critFilter.version" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'AUDIT.FILTER_NEW_IN_WCAG21\' | translate}}</span>\n' +
'    </label>\n' +
'\n' +
'    <label for="show_version_20" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.version === \'WCAG20\',\n' +
'      \'btn-primary-invert\': critFilter.version !== \'WCAG20\'\n' +
'    }">\n' +
'      <input id="show_version_20" type="radio" value="WCAG20" ng-model="critFilter.version" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'SCOPE.WCAG20\' | translate}}</span>\n' +
'    </label>\n' +
'  </fieldset>\n' +
'\n' +
'  <fieldset>\n' +
'    <legend class="sr-only">{{ \'AUDIT.FILTER_LEVEL_LEGEND\' | translate }}</legend>\n' +
'    <label for="show_level-a" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.levels[\'wai:WCAG2A-Conformance\'],\n' +
'      \'btn-primary-invert\': !critFilter.levels[\'wai:WCAG2A-Conformance\']\n' +
'    }">\n' +
'      <input id="show_level-a" type="checkbox" ng-model="critFilter.levels[\'wai:WCAG2A-Conformance\']" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'EARL.LEVEL_A\' | translate}}</span>\n' +
'    </label>\n' +
'\n' +
'    <label for="show_level-aa" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.levels[\'wai:WCAG2AA-Conformance\'],\n' +
'      \'btn-primary-invert\': !critFilter.levels[\'wai:WCAG2AA-Conformance\']\n' +
'    }">\n' +
'      <input id="show_level-aa" type="checkbox" ng-model="critFilter.levels[\'wai:WCAG2AA-Conformance\']" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'EARL.LEVEL_AA\' | translate}}</span>\n' +
'    </label>\n' +
'\n' +
'    <label for="show_level-aaa" class="btn btn-sm" ng-class="{\n' +
'      \'btn-primary\': critFilter.levels[\'wai:WCAG2AAA-Conformance\'],\n' +
'      \'btn-primary-invert\': !critFilter.levels[\'wai:WCAG2AAA-Conformance\']\n' +
'    }">\n' +
'      <input id="show_level-aaa" type="checkbox" ng-model="critFilter.levels[\'wai:WCAG2AAA-Conformance\']" ng-change="handleFilterChange()">\n' +
'      <span>{{ \'EARL.LEVEL_AAA\' | translate}}</span>\n' +
'    </label>\n' +
'  </fieldset>\n' +
'</fieldset>\n' +
'');
$templateCache.put('views/evaluation/audit/criteria.html',
'<div ng-controller="AuditCriteriaCtrl">\n' +
'  <h2>\n' +
'    {{ \'AUDIT.HD_CRITERIA\' | translate}}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_audit_criteria" title="{{ \'AUDIT.HD_CRITERIA\' | translate }}"></info-button>\n' +
'  </h2>\n' +
'\n' +
'  <info-field ref="inf_audit_criteria" exitto="" button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}">\n' +
'    <p>{{ \'AUDIT.INF_AUDIT_CRITERIA\' | translate }}</p>\n' +
'  </info-field>\n' +
'\n' +
'  <div ng-include src="\'views/evaluation/audit/criteria-tools.html\'"></div>\n' +
'\n' +
'  <div ng-repeat="p in principles" ng-if="isPrincipleVisible(p)" class="appear-tall">\n' +
'    <h3><button-collapse target="p" property="hideGuideline">\n' +
'        {{ \'AUDIT.PRINCIPLE\' | translate}}\n' +
'        {{p.num + \' \' + p.handle}}\n' +
'    </button-collapse></h3>\n' +
'\n' +
'    <div ng-repeat="g in p.guidelines" ng-if="isGuidelineVisible(g)" collapse="p.hideGuideline" class="appear">\n' +
'      <h4><button-collapse target="g" property="hideCriteria">\n' +
'          {{g.num}} {{g.handle}}\n' +
'\n' +
'      </button-collapse></h4>\n' +
'\n' +
'      <div collapse="g.hideCriteria">\n' +
'        <success-criterion class="appear" ng-init="opt = {editable: true, collapses: true}" ng-repeat="critSpec in g.successcriteria" ng-if="isCriterionVisible(critSpec)" assertion="getCritAssert(critSpec.id)" requirement="critSpec" options="opt">\n' +
'        </success-criterion>\n' +
'\n' +
'        <div class="to-top">\n' +
'          <a href="" ng-click="toTop()">{{ \'COMMON.TO_TOP\' | translate }}</a>\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n' +
'');
$templateCache.put('views/evaluation/audit/samplePages.html',
'<div ng-controller="AuditSamplePagesCtrl">\n' +
'  <h2>\n' +
'    {{ \'AUDIT.HD_SAMPLE_SELECT\' | translate}}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_audit_sample" title="{{ \'AUDIT.HD_SAMPLE_SELECT\' | translate }}">></info-button>\n' +
'  </h2>\n' +
'\n' +
'  <info-field ref="inf_audit_sample" exitto="" button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}">\n' +
'    <p ng-bind-html="\'AUDIT.INF_AUDIT_SAMPLE\' | translate"></p>\n' +
'  </info-field>\n' +
'\n' +
'  <div class="btn-toolbar sample-tools">\n' +
'    <div class="btn-group btn-group-xs">\n' +
'      <input type="checkbox" title="{{ \'AUDIT.SELECT_ALL\' | translate }}" ng-model="anySelect" ng-click="changeAll()">\n' +
'    </div>\n' +
'\n' +
'    <div class="btn-group btn-group-xs">\n' +
'      <icon-button icon="\'check\'" label="\'AUDIT.BTN_COMPLETE_SELECTED\' | translate" click="completePages()"></icon-button>\n' +
'      <icon-button icon="\'edit\'" label="\'AUDIT.BTN_UNCOMPLETE_SELECTED\' | translate" click="uncompletePages()"></icon-button>\n' +
'    </div>\n' +
'\n' +
'    <div class="btn-group btn-group-xs pull-right">\n' +
'      <icon-button icon="\'link\'" label="\'AUDIT.BTN_OPEN_SELECTED\' | translate" click="openSelected()"></icon-button>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <p ng-if="filledPages().length === 0"><em>{{ \'AUDIT.NO_SAMPLE\' | translate }}</em></p>\n' +
'\n' +
'  <ul class="sample" collapse="hideSample">\n' +
'  	<li ng-repeat="page in filledPages()" ng-class="{active: page.selected}">\n' +
'\n' +
'      <label for="sample_select_{{$id}}" ng-click="multiSelect($index, $event)">\n' +
'        <input id="sample_select_{{$id}}" ng-change="sampleChange()" type="checkbox" ng-model="page.selected">&nbsp;<span ng-class="{\'page-tested\' : page.tested}">{{page.displayTitle()}}</span>&nbsp;\n' +
'        <span ng-if="page.tested" class="sr-only">{{ \'AUDIT.TESTED\'| translate}}</span>\n' +
'      </label>\n' +
'      <a href="" ng-click="openPage(page)" class="pull-right glyphicon glyphicon-link">\n' +
'        <span class="hint">{{page.description}}</span>\n' +
'      </a>\n' +
'  	</li>\n' +
'  </ul>\n' +
'\n' +
'</div>');
$templateCache.put('views/evaluation/explore.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'EXPLORE.TITLE\') ) }}</h1>\n' +
'\n' +
'<p ng-bind-html="\'EXPLORE.INTRO\' | translate: {\n' +
'  link_em_2: \'http://www.w3.org/TR/WCAG-EM/#step2\'\n' +
'}"></p>\n' +
'\n' +
'<form>\n' +
'  <h2>\n' +
'    {{\'EXPLORE.HD_RELIEDUP_TECH\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_reliedup_tech" title="{{ \'EXPLORE.HD_RELIEDUP_TECH\' | translate }}"></info-button>\n' +
'  </h2>\n' +
'\n' +
'  <info-field ref="inf_reliedup_tech" button="Close info">\n' +
'    <p ng-bind-html="\'EXPLORE.INF_RELIEDUP_TECH\' | translate: {\n' +
'      link_em_2d: \'http://www.w3.org/TR/WCAG-EM/#step2d\',\n' +
'      link_relied_upon: \'https://www.w3.org/TR/WCAG21/#dfn-relied-upon\'\n' +
'    }"></p>\n' +
'  </info-field>\n' +
'\n' +
'  <div class="row">\n' +
'  <ul class="col-sm-9 known-tech">\n' +
'    <li ng-repeat="tech in knownTech">\n' +
'      <input type="checkbox" id="{{ \'tech_\' + $index }}" ng-model="tech.checked" ng-change="changeTech(tech)">\n' +
'      <label for="{{ \'tech_\' + $index }}">\n' +
'        {{tech.title}}\n' +
'      </label>\n' +
'    </li>\n' +
'    <li>\n' +
'      <input type="checkbox" id="tech_other" ng-model="rootHide.OtherTech">\n' +
'      <label for="tech_other">\n' +
'        {{ \'EXPLORE.LABEL_OTHER\' | translate }}\n' +
'      </label>\n' +
'    </li>\n' +
'  </ul>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group key-value-group" collapse="!rootHide.OtherTech" ng-init="col0 = \'visible-xs col-xs-12\';\n' +
'           col1 = \'col-xs-9 col-sm-4 col-md-3 form-block right-col\';\n' +
'           col2 = \'col-xs-9 col-sm-7 col-md-8 form-block right-col\';\n' +
'           col3 = \'col-sm-1 form-block remove-button\';\n' +
'           colHide = \'col-xs-3 visible-xs-and-sr form-block\';\n' +
'           row = \'row form-group-inline\';\n' +
'           head = \'row hidden-xs form-block-head\';\n' +
'           delButton = \'btn glyphicon glyphicon-remove-sign\'">\n' +
'    <header ng-class="head" aria-hidden="true">\n' +
'      <div ng-class="col1">\n' +
'        {{ \'EXPLORE.LABEL_TECH\' | translate}}\n' +
'      </div> <div ng-class="col2">\n' +
'        {{ \'EXPLORE.LABEL_TECH_SPEC\' | translate}}\n' +
'      </div>\n' +
'    </header>\n' +
'\n' +
'    <fieldset class="row form-group-inline appear" id="technologies" ng-repeat="tech in otherTech">\n' +
'      <legend ng-class="col0">\n' +
'        {{ \'EXPLORE.LABEL_TECH\' | translate }} {{$index+1}}\n' +
'      </legend>\n' +
'\n' +
'      <label ng-class="colHide" for="tech_{{$index}}">\n' +
'        {{\'EXPLORE.LABEL_TECH\' | translate}}:\n' +
'      </label> <div ng-class="col1">\n' +
'        <input type="text" class="form-control" id="tech_{{$index}}" ng-blur="updateOtherTech(tech)" ng-model="tech.title" shy-placeholder="\'EXPLORE.PLH_TECH\' | translate">\n' +
'      </div>\n' +
'\n' +
'      <label ng-class="colHide" for="tech_spec_{{$index}}">\n' +
'        {{\'EXPLORE.LABEL_TECH_SPEC\' | translate }}:\n' +
'      </label> <div ng-class="col2">\n' +
'        <input type="text" class="form-control" id="tech_spec_{{$index}}" ng-blur="updateOtherTech(tech)" ng-model="tech.id" shy-placeholder="\'EXPLORE.PLH_TECH_SPEC\' | translate">\n' +
'      </div>\n' +
'\n' +
'      <div ng-class="col3">\n' +
'        <button ng-class="delButton" ng-click="removeTechnology($index, $event)">\n' +
'          <span class="hint">\n' +
'            {{\'EXPLORE.BTN_REMOVE_TECH\' | translate}}\n' +
'          </span>\n' +
'        </button>\n' +
'      </div>\n' +
'    </fieldset>\n' +
'\n' +
'    <button ng-click="addTechnology($event)" class="btn btn-default">\n' +
'      <span class="glyphicon glyphicon-plus-sign"></span>\n' +
'      {{\'EXPLORE.BTN_ADD_TECH\' | translate }}\n' +
'    </button>\n' +
'  </div>\n' +
'\n' +
'\n' +
'  <h2>{{ \'EXPLORE.HD_NOTE_TAKING\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_notes" title="{{ \'EXPLORE.HD_NOTE_TAKING\' | translate }}"></info-button>\n' +
'  </h2>\n' +
'\n' +
'  <info-field ref="inf_notes" button="Close info">\n' +
'    <p ng-bind-html="\'EXPLORE.INF_NOTE_TAKING\' | translate"></p>\n' +
'  </info-field>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="essential_func">\n' +
'      {{ \'EXPLORE.LABEL_ESSENT_FUNC\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_essent_func" title="{{ \'EXPLORE.LABEL_ESSENT_FUNC\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" ref="inf_essent_func">\n' +
'      <p ng-bind-html="\'EXPLORE.INF_ESSENT_FUNC\' | translate: {\n' +
'        link_em_2b: \'http://www.w3.org/TR/WCAG-EM/#step2b\'\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea ng-model="exploreModel.essentialFunctionality" class="form-control" id="essential_func" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="page_variety">\n' +
'      {{ \'EXPLORE.LABEL_VARIETY_PAGE_TYPES\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_page_type" title="{{ \'EXPLORE.LABEL_VARIETY_PAGE_TYPES\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" ref="inf_page_type">\n' +
'      <p ng-bind-html="\'EXPLORE.INF_VARIETY_PAGE_TYPES\' | translate: {\n' +
'        link_em_2c: \'http://www.w3.org/TR/WCAG-EM/#step2c\',\n' +
'        link_page_state: \'http://www.w3.org/TR/WCAG-EM/#states\'\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea ng-model="exploreModel.pageTypeVariety" class="form-control" id="page_variety" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'\n' +
'</form>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>\n' +
'');
$templateCache.put('views/evaluation/report.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'REPORT.TITLE\') ) }}</h1>\n' +
'\n' +
'<p ng-bind-html="\'REPORT.INTRO\' | translate: {\n' +
'  link_em_5: \'http://www.w3.org/TR/WCAG-EM/#step5\'\n' +
'}"></p>\n' +
'\n' +
'<form class="form-horizontal">\n' +
'  <div class="form-group">\n' +
'    <div class="col-sm-3 control-label">\n' +
'      <label for="dct_title">\n' +
'        {{ \'REPORT.LABEL_TITLE\' | translate }}&nbsp;<info-button class="info-float" label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_dct_title" title="{{ \'REPORT.LABEL_TITLE\' | translate }}"></info-button>\n' +
'      </label>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-9">\n' +
'      <input type="text" ng-model="reportModel.title" class="form-control" id="dct_title">\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-12">\n' +
'      <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" ref="inf_dct_title" exitto="dct_title">\n' +
'        <p ng-bind-html="\'REPORT.INF_TITLE\' | translate"></p>\n' +
'    </info-field></div>\n' +
'  </div>\n' +
'\n' +
'\n' +
'  <div class="form-group">\n' +
'    <div class="col-sm-3 control-label">\n' +
'      <label for="commissioner">\n' +
'        {{ \'REPORT.LABEL_COMMISSIONER\' | translate }}&nbsp;<info-button title="{{ \'REPORT.LABEL_COMMISSIONER\' | translate }}" class="info-float" label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_commissioner">\n' +
'        </info-button>\n' +
'      </label>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-9">\n' +
'      <input ng-model="reportModel.commissioner" type="text" class="form-control" id="commissioner">\n' +
'    </div>\n' +
'    <div class="col-sm-12">\n' +
'      <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" class="info-float" ref="inf_commissioner" exitto="commissioner">\n' +
'        <p>{{ \'REPORT.INF_COMMISSIONER\' | translate }}</p>\n' +
'    </info-field></div>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <div class="col-sm-3 control-label">\n' +
'      <label for="creator">\n' +
'        {{ \'REPORT.LABEL_CREATOR\' | translate }}&nbsp;<info-button class="info-float" label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_creator" title="{{ \'REPORT.LABEL_CREATOR\' | translate }}"></info-button>\n' +
'      </label>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-9">\n' +
'      <input ng-model="reportModel.creator.name" type="text" class="form-control" id="creator">\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-12">\n' +
'      <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" ref="inf_creator" exitto="creator">\n' +
'        <p>{{ \'REPORT.INF_CREATOR\' | translate }}</p>\n' +
'    </info-field></div>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <div class="col-sm-3 control-label">\n' +
'      <label for="dct_date">\n' +
'        {{ \'REPORT.LABEL_DATE\' | translate }}&nbsp;<info-button class="info-float" label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_date" title="{{ \'REPORT.LABEL_DATE\' | translate }}"></info-button>\n' +
'      </label>\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-9">\n' +
'      <input type="text" ng-model="reportModel.date" class="form-control date" id="dct_date">\n' +
'    </div>\n' +
'\n' +
'    <div class="col-sm-12">\n' +
'      <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" ref="inf_date" exitto="dct_date">\n' +
'        <p>{{ \'REPORT.INF_DATE\' | translate }}</p>\n' +
'    </info-field></div>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group"><div class="col-sm-12">\n' +
'    <label for="summary">\n' +
'      {{ \'REPORT.LABEL_SUMMARY\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_summary" title="{{ \'REPORT.LABEL_SUMMARY\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="summary" ref="inf_summary">\n' +
'      <p>{{ \'REPORT.INF_SUMMARY\' | translate }}</p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea id="summary" ng-model="reportModel.summary" auto-resize cols="30" rows="10" class="form-control"></textarea>\n' +
'  </div></div>\n' +
'\n' +
'  <div class="form-group"><div class="col-sm-12">\n' +
'  	<label for="specifics">\n' +
'      {{ \'REPORT.LABEL_SPECIFICS\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_specifics" title="{{ \'REPORT.LABEL_SPECIFICS\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="specifics" ref="inf_specifics">\n' +
'      <p ng-bind-html="\'REPORT.INF_SPECIFICS\' | translate: {\n' +
'        link_em_5b: \'http://www.w3.org/TR/WCAG-EM/#step5b\'\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'  	<textarea id="specifics" ng-model="reportModel.specifics" auto-resize cols="30" rows="4" class="form-control"></textarea>\n' +
'  </div></div>\n' +
'</form>\n' +
'\n' +
'<h2><button-collapse target="rootHide" property="criteriaReport">\n' +
'    {{ \'REPORT.HD_CRITERIA_REPORT\' | translate}}\n' +
'</button-collapse></h2>\n' +
'\n' +
'<div collapse="rootHide.criteriaReport" ng-include src="\'views/report/findings.html\'"></div>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>');
$templateCache.put('views/evaluation/sample.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'SAMPLE.TITLE\') ) }}</h1>\n' +
'\n' +
'<p ng-bind-html="\'SAMPLE.INTRO\' | translate: {\n' +
'  link_em_3: \'http://www.w3.org/TR/WCAG-EM/#step3\'\n' +
'}"></p>\n' +
'\n' +
'<form>\n' +
'  <h2>{{\'SAMPLE.HD_STRUCT_SAMPLE\' | translate }}</h2>\n' +
'\n' +
'  <h3><button-collapse target="rootHide" property="essentialFunctionality">\n' +
'      {{ \'SAMPLE.HD_ESSENT_FUNC\' | translate }}\n' +
'  </button-collapse></h3>\n' +
'\n' +
'  <div collapse="rootHide.essentialFunctionality">\n' +
'    <textarea ng-model="exploreModel.essentialFunctionality" title="{{\'SAMPLE.HD_ESSENT_FUNC\' | translate }}" class="form-control" id="essential_func" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'\n' +
'  <h3><button-collapse target="rootHide" property="pageTypeVariety">\n' +
'      {{ \'SAMPLE.HD_VARIETY_PAGE_TYPES\' | translate }}\n' +
'  </button-collapse></h3>\n' +
'\n' +
'  <div collapse="rootHide.pageTypeVariety">\n' +
'    <textarea ng-model="exploreModel.pageTypeVariety" title="{{\'SAMPLE.HD_VARIETY_PAGE_TYPES\' | translate }}" class="form-control" id="page_variety" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'\n' +
'\n' +
'  <h3>{{ \'SAMPLE.HD_STRUCT_SAMPLE_SUB\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_str_sample" title="{{ \'SAMPLE.HD_STRUCT_SAMPLE_SUB\' | translate }}"></info-button></h3>\n' +
'\n' +
'  <info-field ref="inf_str_sample" button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}">\n' +
'    <p ng-bind-html="\'SAMPLE.INF_STRUCT_SAMPLE\' | translate: {\n' +
'      link_em_3a: \'http://www.w3.org/TR/WCAG-EM/#step3a\',\n' +
'      link_em_state: \'http://www.w3.org/TR/WCAG-EM/#states\'\n' +
'    }"></p>\n' +
'  </info-field>\n' +
'\n' +
'  <input-pages pages="structuredSample.webpage" add-page="getPageAdder(structuredSample)" remove-page="getPageRemover(structuredSample)"></input-pages>\n' +
'\n' +
'  <h2>\n' +
'    {{\'SAMPLE.HD_RANDOM_SAMPLE\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_rand_sample" title="{{ \'SAMPLE.HD_RANDOM_SAMPLE\' | translate }}"></info-button>\n' +
'  </h2>\n' +
'\n' +
'  <info-field ref="inf_rand_sample" button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}">\n' +
'    <p ng-bind-html="\'SAMPLE.INF_RAND_SAMPLE\' | translate: {\n' +
'      link_em_3b: \'http://www.w3.org/TR/WCAG-EM/#step3b\',\n' +
'      link_em_state: \'http://www.w3.org/TR/WCAG-EM/#states\'\n' +
'    }"></p>\n' +
'  </info-field>\n' +
'\n' +
'  <div class="alert alert-warning">\n' +
'    {{ "SAMPLE.RAND_SAMPLE_LENGTH" | translate: {\n' +
'      total: structuredSample.webpage.length,\n' +
'      count: randPageCount()}\n' +
'    }}\n' +
'  </div>\n' +
'\n' +
'  <input-pages pages="randomSample.webpage" add-page="getPageAdder(randomSample)" remove-page="getPageRemover(randomSample)"></input-pages>\n' +
'\n' +
'</form>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>');
$templateCache.put('views/evaluation/scope.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'SCOPE.TITLE\') ) }}</h1>\n' +
'\n' +
'<p ng-bind-html="\'SCOPE.INTRO\' | translate: {\n' +
'  link_step1: \'http://www.w3.org/TR/WCAG-EM/#step1\'\n' +
'}"></p>\n' +
'\n' +
'<form>\n' +
'  <div class="form-group">\n' +
'    <label for="site-name">\n' +
'      {{ \'SCOPE.LABEL_SITE_NAME\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_site_name" title="{{ \'SCOPE.LABEL_SITE_NAME\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="site-name" ref="inf_site_name">\n' +
'      <p ng-bind-html="\'SCOPE.INF_SITE_NAME\' | translate"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <input ng-model="scopeModel.website.siteName" type="text" class="form-control" id="site-name">\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="website_scope">\n' +
'      {{ \'SCOPE.LABEL_SITE_SCOPE\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_site_scope" title="{{ \'SCOPE.LABEL_SITE_SCOPE\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="website_scope" ref="inf_site_scope">\n' +
'      <p>{{ \'SCOPE.INF_SITE_SCOPE_0\' | translate }}</p>\n' +
'      <ul>\n' +
'        <li>{{ \'SCOPE.INF_SITE_SCOPE_LI0\' | translate }}</li>\n' +
'        <li>{{ \'SCOPE.INF_SITE_SCOPE_LI1\' | translate }}</li>\n' +
'        <li>{{ \'SCOPE.INF_SITE_SCOPE_LI2\' | translate }}</li>\n' +
'      </ul>\n' +
'      <p ng-bind-html="\'COMMON.MORE_INFO\' | translate: {\n' +
'        url: \'http://www.w3.org/TR/WCAG-EM/#step1a\',\n' +
'        name: translate(\'SCOPE.INF_SITE_SCOPE_1\')\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea ng-model="scopeModel.website.siteScope" class="form-control" id="website_scope" auto-resize cols="40" rows="3"></textarea>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="version_target">\n' +
'      {{ \'SCOPE.LABEL_WCAG_VERSION\' | translate }}\n' +
'      <info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="info_wcag_version" title="{{ \'SCOPE.LABEL_VERSION\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="wcag_version" ref="info_wcag_version">\n' +
'      <p ng-bind-html="\'SCOPE.INFO_WCAG_VERSION\' | translate"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <select id="wcag_version" class="form-control" ng-options="key as value for (key,value) in wcagVersionOptions" ng-model="scopeModel.wcagVersion"></select>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="conformance_target">\n' +
'      {{ \'SCOPE.LABEL_CONFORMANCE_TGT\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_conf_tgt" title="{{ \'SCOPE.LABEL_CONFORMANCE_TGT\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="conformance_target" ref="inf_conf_tgt">\n' +
'      <p ng-bind-html="\'SCOPE.INF_CONF_TGT\' | translate: {\n' +
'        \'link_em_1b\': \'http://www.w3.org/TR/WCAG-EM/#step1b\'\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <select id="conformance_target" class="form-control" ng-options="key as value for (key,value) in conformanceOptions" ng-model="scopeModel.conformanceTarget">\n' +
'    </select>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="as_baseline" class="">\n' +
'      {{ \'SCOPE.LABEL_SUPPORT_BASE\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_support_base" title="{{ \'SCOPE.LABEL_SUPPORT_BASE\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="as_baseline" ref="inf_support_base">\n' +
'      <p ng-bind-html="\'SCOPE.INF_SUPPORT_BASE\' | translate: {\n' +
'        link_user_agent: \'http://www.w3.org/TR/WCAG20/#useragentdef\',\n' +
'        link_access_supp: \'http://www.w3.org/TR/WCAG20/#accessibility-supporteddef\',\n' +
'        link_em_step1c: \'http://www.w3.org/TR/WCAG-EM/#step1c\'\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea ng-model="scopeModel.accessibilitySupportBaseline" id="as_baseline" class="form-control" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'\n' +
'  <div class="form-group">\n' +
'    <label for="additional_requirements">\n' +
'      {{ \'SCOPE.LABEL_EXTRA_REQUIREMENTS\' | translate }}&nbsp;<info-button label="{{\'COMMON.BTN_INFO\' | translate}}" target="inf_extra_req" title="{{ \'SCOPE.LABEL_EXTRA_REQUIREMENTS\' | translate }}"></info-button>\n' +
'    </label>\n' +
'\n' +
'    <info-field button="{{\'COMMON.BTN_CLOSE_INFO\' | translate}}" exitto="additional_requirements" ref="inf_extra_req">\n' +
'      <p>{{ \'SCOPE.INF_EXTRA_REQUIREMENTS_0\' | translate }}</p>\n' +
'      <ul>\n' +
'        <li>{{ \'SCOPE.INF_EXTRA_REQUIREMENTS_LI0\' | translate }}</li>\n' +
'        <li>{{ \'SCOPE.INF_EXTRA_REQUIREMENTS_LI1\' | translate }}</li>\n' +
'        <li>{{ \'SCOPE.INF_EXTRA_REQUIREMENTS_LI2\' | translate }}</li>\n' +
'      </ul>\n' +
'      <p ng-bind-html="\'COMMON.MORE_INFO\' | translate: {\n' +
'        url: \'http://www.w3.org/TR/WCAG-EM/#step1d\',\n' +
'        name: translate(\'SCOPE.INF_EXTRA_REQUIREMENTS_1\')\n' +
'      }"></p>\n' +
'    </info-field>\n' +
'\n' +
'    <textarea ng-model="scopeModel.additionalEvalRequirement" id="additional_requirements" class="form-control" auto-resize cols="40" rows="5"></textarea>\n' +
'  </div>\n' +
'</form>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>\n' +
'');
$templateCache.put('views/evaluation/stepbar.html',
'<ul class="wizard" role="navigation" aria-label="{{\'NAV.WZRD_LABEL\' | translate }}">\n' +
'  <li ng-repeat="stateItem in state.stateList" ng-init="active = state.currentStateIndex == $index" ng-class="{active: active, \'wizard-step\': 1}">\n' +
'\n' +
' 	  <a ng-if="!active" ng-href="{{\'#!\' + stateItem.route}}">\n' +
'      {{ \'NAV.WZRD_\' + stateItem.name | uppercase | translate}}\n' +
'    </a>\n' +
'\n' +
'    <a ng-if="active">\n' +
'      {{ \'NAV.WZRD_\' + stateItem.name | uppercase | translate}}\n' +
'      <span ng-if="active" class="sr-only">\n' +
'        ({{\'NAV.WZRD_ACTIVE\' | translate}})\n' +
'      </span>\n' +
'    </a>\n' +
'  </li>\n' +
'</ul>\n' +
'');
$templateCache.put('views/footer.html',
'<footer lang="en" ng-controller="FooterCtrl" aria-label="Document info" class="page-footer">\n' +
'  <div>\n' +
'    <p><strong>Feedback: We welcome ideas, bug reports, and comments</strong> via <a href="https://github.com/w3c/wcag-em-report-tool/issues">GitHub</a> or e-mail to <a href="mailto:wai-eo-editors@w3.org">wai-eo-editors@w3.org</a> (a publicly archived list) or <a href="mailto:wai@w3.org">wai@w3.org</a> (a WAI staff-only list).</p>\n' +
'    <p><strong>Status:</strong> Version {{pkg.version}}, {{pkg.buildDate}}</p>\n' +
'    <p><strong>Development Team:</strong> Shadi Abou-Zahra, W3C/WAI (Project Lead) and Roel Antonisse, <a href="https://www.accessibility.nl/english">accessibility.nl</a> (Development). Previously Wilco Fiers (Design and development). <strong>Contributors:</strong> <a href="http://www.w3.org/People/Shawn/">Shawn Lawton Henry</a> and the <a href="http://www.w3.org/WAI/EO/">Education and Outreach Working Group</a>.</p>\n' +
'    <p>Initially developed with support from the <a href="http://www.w3.org/WAI/ACT/">WAI-ACT Project</a>, and updated with support of the <a href="http://www.w3.org/WAI/Tools/">WAI-Tools Project</a>, co-funded by the European Commission (EC).</p>\n' +
'    <div class="footer-nav">\n' +
'      <p>[<a href="http://www.w3.org/WAI/sitemap.html">WAI Site Map</a>] [<a href="http://www.w3.org/WAI/sitehelp.html">Help with WAI Website</a>] [<a href="http://www.w3.org/WAI/search.php">Search</a>] [<a href="/WAI/contacts">Contacting WAI</a>]</p>\n' +
'    </div>\n' +
'    <div class="copyright">\n' +
'      <p><a rel="Copyright" href="http://www.w3.org/Consortium/Legal/ipr-notice#Copyright">Copyright</a> © <a href="http://www.w3.org/"><abbr title="World Wide Web Consortium">W3C</abbr></a><sup>®</sup> (<a href="http://www.csail.mit.edu/"><abbr title="Massachusetts Institute of Technology">MIT</abbr></a>, <a href="http://www.ercim.org/"><abbr title="European Research Consortium for Informatics and Mathematics">ERCIM</abbr></a>, <a href="http://www.keio.ac.jp/">Keio</a>, <a href="http://ev.buaa.edu.cn/">Beihang</a>) <a href="/Consortium/Legal/ipr-notice">Usage policies apply</a>.</p>\n' +
'    </div>\n' +
'  </div>\n' +
'</footer>\n' +
'');
$templateCache.put('views/import.html',
'<div ng-include="ng-include" src="\'views/messages.html\'"></div>\n' +
'\n' +
'<main ng-controller="ImportCtrl">\n' +
'  <h1>{{ setTitle( translate(\'IMPORT.TITLE\') ) }}</h1>\n' +
'\n' +
'  <div class="alert appear" ng-class="\'alert-\' + feedback.class" ng-if="feedback">\n' +
'    <p>{{ feedback.message }}</p>\n' +
'  </div>\n' +
'\n' +
'  <section ng-if="!importFile">\n' +
'    <h2>Step 1 - Select import file</h2>\n' +
'    <p>{{ \'IMPORT.INTRO\' | translate }}</p>\n' +
'    <p>\n' +
'      <label id="file_label" for="load_json" class="btn btn-primary" ng-class="{\'focus\': fileHasFocus }">\n' +
'        {{ \'IMPORT.LABEL_SELECT_FILE\' | translate }}\n' +
'      </label>\n' +
'      <input id="load_json" class="sr-only" type="file" accept="{{ allowedMime }}" onchange="var elm = angular.element(this);elm.scope().loadFile(this.files[0])">\n' +
'    </p>\n' +
'  </section>\n' +
'\n' +
'  <section class="appear" ng-if="importFile && !importConfirmed">\n' +
'    <h2>Step 2 - Confirm import</h2>\n' +
'    <p>File “{{importFile.name}}” is ready to be imported.</p>\n' +
'    <p>We have found\n' +
'      {{ assertionImport.length }}\n' +
'      asserertions that can be inserted into the evaluation audit results</p>\n' +
'\n' +
'    <fieldset>\n' +
'      <legend>Do you wish to continue with the import?</legend>\n' +
'      <button type="button" id="confirm_import_yes" class="btn btn-primary" ng-click="handleConfirmation(true)">Yes</button>\n' +
'      <button type="button" id="confirm_import_no" class="btn btn-primary-invert" ng-click="handleConfirmation(false)">No</button>\n' +
'    </fieldset>\n' +
'  </section>\n' +
'\n' +
'  <section class="appear" ng-if="importConfirmed === true">\n' +
'    <h2>Step 3 - Import summary</h2>\n' +
'    <p>Imported\n' +
'      {{ assertionImport.length }}\n' +
'      asserertions and inserted to the audit results.</p>\n' +
'\n' +
'    <button type="button" class="btn btn-primary" ng-click="handleDoneClick()">done</button>\n' +
'  </section>\n' +
'\n' +
'  <p>\n' +
'    <a href="javascript:window.history.back()">{{\'NAV.BTN_BACK_TO_EVAL\' | translate}}</a>\n' +
'  </p>\n' +
'</main>\n' +
'');
$templateCache.put('views/messages.html',
'<div class="alert alert-danger" ng-if="!support.hasSupport" collapse="support.hideMessage">\n' +
'  <span class="floater"></span>\n' +
'\n' +
'  <p ng-bind="\'COMMON.BROWSER_NOT_SUPPORTED\' | translate"></p>\n' +
'\n' +
'  <button class="close" ng-click="support.hideMessage = true">\n' +
'    <span class="glyphicon glyphicon-remove"></span>\n' +
'    <span class="sr-only" ng-bind="\'COMMON.HIDE_MESSAGE\' | translate"></span>\n' +
'  </button>\n' +
'</div>');
$templateCache.put('views/navigation.html',
'<div class="wert-head" ng-controller="NavigationCtrl">\n' +
'  <div class="navbar navbar-default">\n' +
'    <div class="branding">\n' +
'      <div class="nav">\n' +
'        <span class="w3c"><a href="http://w3.org/">\n' +
'          <img alt="W3C" width="73" height="50" src="images/w3c.svg">\n' +
'        </a></span><span class="wai"><a href="http://w3.org/WAI/">\n' +
'          <img alt="Web Accessibility Initiative" width="120" height="50" src="images/wai.svg">\n' +
'        </a></span>\n' +
'      </div>\n' +
'    </div>\n' +
'\n' +
'\n' +
'    <ul class="nav navbar-nav" role="navigation" aria-label="{{ \'NAV.MENU\' | translate}}">\n' +
'      <li><a href="#!/" target="_blank">\n' +
'          <span class="glyphicon glyphicon-file"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_NEW\' | translate }}\n' +
'      </a></li>\n' +
'\n' +
'      <li><a href="#!/open">\n' +
'          <span class="glyphicon glyphicon-folder-open"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_OPEN\' | translate }}\n' +
'      </a></li>\n' +
'\n' +
'      <li><a href="#!/save" title="{{ \'NAV.MENU_SAVE_TITLE\' | translate}}">\n' +
'          <span class="glyphicon glyphicon-floppy-save"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_SAVE\' | translate }}\n' +
'      </a></li>\n' +
'\n' +
'      <li><a href="#!/import" title="{{ \'NAV.MENU_IMPORT_TITLE\' | translate}}">\n' +
'          <span class="glyphicon glyphicon-import"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_IMPORT\' | translate }}\n' +
'      </a></li>\n' +
'\n' +
'      <li class="dropdown" dropdown>\n' +
'        <a href="#" class="dropdown-toggle" dropdown-toggle>\n' +
'          <span class="glyphicon glyphicon-link"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_RESOURCES\' | translate }}\n' +
'          <b class="caret"></b>\n' +
'        </a>\n' +
'\n' +
'        <ul class="dropdown-menu" lang="en">\n' +
'          <li><a target="_blank" href="http://www.w3.org/WAI/standards-guidelines/wcag/">\n' +
'              Web Content Accessibility Guidelines (WCAG)\n' +
'          </a></li>\n' +
'          <li><a target="_blank" href="http://www.w3.org/WAI/WCAG21/quickref/">\n' +
'              How to Meet WCAG 2.1 Quick Reference\n' +
'          </a></li>\n' +
'          <li><a target="_blank" href="http://www.w3.org/WAI/test-evaluate/conformance/wcag-em/">\n' +
'              WCAG Evaluation Methodology (WCAG-EM)\n' +
'          </a></li>\n' +
'      </ul>  </li>\n' +
'      <li class="dropdown" dropdown>\n' +
'        <a href="#" class="dropdown-toggle" dropdown-toggle>\n' +
'          <span class="glyphicon glyphicon-book"></span>&nbsp;\n' +
'          {{ \'NAV.MENU_LANGUAGE\' | translate }}\n' +
'          <b class="caret"></b>\n' +
'        </a>\n' +
'\n' +
'        <ul class="dropdown-menu lang-menu">\n' +
'          <li ng-repeat="language in languages" lang="{{language.code}}">\n' +
'            <a ng-if="language.code === currentLang">\n' +
'              <span class="glyphicon glyphicon-ok"></span>\n' +
'              \n' +
'              {{language.localName}}\n' +
'            </a>\n' +
'\n' +
'            <a ng-if="language.code !== currentLang" href="" ng-click="changeLanguage(language.code)">\n' +
'              <span class="glyphicon glyphicon-none"></span>\n' +
'              {{language.localName}}\n' +
'            </a>\n' +
'          </li>\n' +
'      </ul>  </li>\n' +
'    </ul>\n' +
'  </div>\n' +
'</div>\n' +
'');
$templateCache.put('views/open.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'OPEN.TITLE\') ) }}</h1>\n' +
'\n' +
'<p>{{ \'OPEN.INTRO\' | translate }}</p>\n' +
'\n' +
'<div class="alert alert-info appear" ng-if="fileFeedback.posted">\n' +
'  <p>{{ \'OPEN.MSG_LOADING\' | translate }}</p>\n' +
'</div>\n' +
'<div class="alert alert-danger appear" ng-if="fileFeedback.failure">\n' +
'  <p>{{fileFeedback.failure}}</p>\n' +
'</div>\n' +
'\n' +
'<p><label for="load_json" class="btn btn-primary" ng-class="{\'focus\': fileHasFocus }" id="file_label">\n' +
'  {{ \'OPEN.LABEL_SELECT_FILE\' | translate }}\n' +
'</label></p>\n' +
'\n' +
'<input type="file" class="sr-only" id="load_json" ng-focus="fileHasFocus = true" ng-blur="fileHasFocus = false" onchange="var elm = angular.element(this);\n' +
'            elm.scope().loadFile(this.files[0])">\n' +
'\n' +
'<div class="alert alert-danger" ng-if="showError">\n' +
'  <p>{{ \'OPEN.\' + showError | translate }}\n' +
'</p></div>\n' +
'\n' +
'<p><a href="javascript:window.history.back()">{{\'NAV.BTN_BACK_TO_EVAL\' | translate}}</a></p>\n' +
'</main>');
$templateCache.put('views/report/findings.html',
'<div data-ng-controller="ReportFindingsCtrl">\n' +
'  <div data-ng-repeat="p in principles">\n' +
'    <h3>{{ \'HTML_REPORT.PRINCIPLE\'| translate }}\n' +
'    {{p.num + \' \' + p.handle}}</h3>\n' +
'\n' +
'    <div data-ng-repeat="g in p.guidelines">\n' +
'      <h4>{{g.num + \' \' + g.handle}}</h4>\n' +
'      <success-criterion data-ng-repeat="critSpec in g.successcriteria" assertion="getCritAssert(critSpec.id)" data-ng-if="shouldCritRender(critSpec)" requirement="critSpec" options="critOpt">\n' +
'      </success-criterion>\n' +
'    </div>\n' +
'\n' +
'  </div>\n' +
'</div>');
$templateCache.put('views/report/sample.html',
'<ul class="sample_narrow list-unstyled">\n' +
'  <li data-ng-repeat="page in filledPages()" class="row">\n' +
'    <span class="col-sm-1"></span>\n' +
'    <span class="col-sm-3">\n' +
'      {{ page.displayTitle()}}&nbsp;\n' +
'    </span>\n' +
'    <span class="col-sm-7" data-ng-bind-html="page.description | linky:\'_blank\'"></span>\n' +
'    <span class="col-sm-1"></span>\n' +
'  </li>\n' +
'</ul>');
$templateCache.put('views/report/scope.html',
'<table>\n' +
'  <tr><th>{{\'HTML_REPORT.LABEL_SITE_NAME\' | translate}}</th>\n' +
'      <td>{{scope.website.siteName}}</td></tr>\n' +
'\n' +
'  <tr>\n' +
'    <th>{{\'HTML_REPORT.LABEL_SITE_SCOPE\' | translate}}</th>\n' +
'  	<td data-ng-bind-html="scope.website.siteScope | txtToHtml"></td>\n' +
'  </tr>\n' +
'\n' +
'  <tr><th>{{ \'SCOPE.LABEL_WCAG_VERSION\' | translate }}</th>\n' +
'      <td>{{ \'SCOPE.\' + scope.wcagVersion | translate }}</td></tr>\n' +
'\n' +
'  <tr><th>{{ \'HTML_REPORT.LABEL_CONFORMANCE_TGT\' | translate }}</th>\n' +
'      <td>{{scope.conformanceTarget | rdfToLabel}}</td></tr>\n' +
'\n' +
'  <tr><th>{{ \'HTML_REPORT.LABEL_EXTRA_REQUIREMENTS\' | translate }}</th>\n' +
'      <td data-ng-bind-html="scope.additionalEvalRequirement | txtToHtml"></td></tr>\n' +
'\n' +
'  <tr><th>{{ \'HTML_REPORT.LABEL_SUPPORT_BASE\' | translate }}</th>\n' +
'      <td data-ng-bind-html="scope.accessibilitySupportBaseline | txtToHtml"></td></tr>\n' +
'\n' +
'  <tr data-ng-if="explore.reliedUponTechnology.length > 0">\n' +
'    <th>{{ \'HTML_REPORT.LABEL_RELIEDUP_TECH\' | translate }}</th>\n' +
'    <td><ul><li data-ng-repeat="tech in explore.reliedUponTechnology">\n' +
'		<a data-ng-if="tech.specs" href="{{tech.specs}}" target="_blank">\n' +
'		  {{tech.title}}\n' +
'		</a><span data-ng-if="!tech.specs">\n' +
'		  {{tech.title}}\n' +
'		</span>\n' +
'    </li></ul></td>\n' +
'  </tr>\n' +
'\n' +
'</table>\n' +
'');
$templateCache.put('views/report/score.html',
'<table ng-controller="ReportScoreCtrl">\n' +
'  <caption>\n' +
'    {{\n' +
'      \'HTML_REPORT.RESULTS_OF\' | translate\n' +
'    }}&nbsp;{{\n' +
'      scope.conformanceTarget | rdfToLabel\n' +
'    }}\n' +
'  </caption>\n' +
'  <thead><tr>\n' +
'      <th>{{ \'HTML_REPORT.PRINCIPLE\' | translate }}</th>\n' +
'      <th>{{ \'EARL.LEVEL_A\' | translate }}</th>\n' +
'      <th ng-if="totals[\'level_aa\'].total > 0">{{\n' +
'        \'EARL.LEVEL_AA\' | translate\n' +
'      }}</th>\n' +
'      <th ng-if="totals[\'level_aaa\'].total > 0">{{\n' +
'        \'EARL.LEVEL_AAA\' | translate\n' +
'      }}</th>\n' +
'  </tr></thead>\n' +
'  <tbody>\n' +
'    <tr ng-repeat="score in scores" ng-if="score.tested > 0">\n' +
'      <th>{{score.name}}</th>\n' +
'      <td>{{\n' +
'        score[\'level_a\'].pass + \' / \' +\n' +
'        score[\'level_a\'].total\n' +
'      }}</td>\n' +
'      <td ng-if="totals[\'level_aa\'].total > 0">{{\n' +
'        score[\'level_aa\'].pass + \' / \' +\n' +
'        score[\'level_aa\'].total\n' +
'      }}</td>\n' +
'      <td ng-if="totals[\'level_aaa\'].total > 0">{{\n' +
'        score[\'level_aaa\'].pass + \' / \' +\n' +
'        score[\'level_aaa\'].total\n' +
'      }}</td>\n' +
'    </tr>\n' +
'    <tr class="score-total">\n' +
'      <th>{{ \'HTML_REPORT.TOTAL_SCORE\' | translate }}</th>\n' +
'      <td>{{\n' +
'        totals[\'level_a\'].pass + \' / \' +\n' +
'        totals[\'level_a\'].total\n' +
'      }}</td>\n' +
'      <td ng-if="totals[\'level_aa\'].total > 0">{{\n' +
'        totals[\'level_aa\'].pass + \' / \' +\n' +
'        totals[\'level_aa\'].total\n' +
'      }}</td>\n' +
'      <td ng-if="totals[\'level_aaa\'].total > 0">{{\n' +
'        totals[\'level_aaa\'].pass + \' / \' +\n' +
'        totals[\'level_aaa\'].total\n' +
'      }}</td>\n' +
'    </tr>\n' +
'  </tbody>\n' +
'</table>');
$templateCache.put('views/save.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'SAVE.TITLE\') ) }}</h1>\n' +
'\n' +
'<p>{{ \'SAVE.INTRO\' | translate }}</p>\n' +
'\n' +
'<p><a download="{{exportFile}}" ng-click="downloadStart()" target="_blank" ng-href="{{exportUrl}}" class="btn btn-primary download-link">\n' +
'    {{ \'SAVE.BTN_DOWNLOAD_DATA_FILE\' | translate }}\n' +
'</a></p>\n' +
'\n' +
'<p ng-bind-html="\'SAVE.TIPS\' | translate: {\n' +
'  link_report: \'/#!/view_report\'\n' +
'}"></p>\n' +
'\n' +
'<p><a href="javascript:window.history.back()">{{\'NAV.BTN_BACK_TO_EVAL\' | translate }}</a></p>\n' +
'</main>\n' +
'');
$templateCache.put('views/start.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'START.TITLE\') ) }}</h1>\n' +
'\n' +
'<h2>{{ \'START.SUBTITLE\' | translate }}</h2>\n' +
'<h2><button-collapse target="rootHide" property="start1" collapsed>\n' +
'    {{ \'START.INTRO_HD\' | translate }}\n' +
'</button-collapse></h2>\n' +
'\n' +
'<div collapse="rootHide.start1" class="{{initial}}">\n' +
'  <p ng-bind-html="\'START.INTRO_1\' | translate: {\n' +
'    link_wcagem: \'http://www.w3.org/TR/WCAG-EM/\',\n' +
'    link_report: \'#!/view_report\',\n' +
'    link_wcag: \'http://www.w3.org/WAI/standards-guidelines/wcag/\',\n' +
'    link_conformance: \'http://www.w3.org/WAI/test-evaluate/conformance/wcag-em/\'\n' +
'  }"></p>\n' +
'\n' +
'  <p ng-bind-html="\'START.INTRO_2\' | translate: { mac: \'⌘S\' }"></p>\n' +
'</div>\n' +
'\n' +
'<h2><button-collapse target="rootHide" property="start2" collapsed>\n' +
'    {{ \'START.USAGE_HD\' | translate }}\n' +
'</button-collapse></h2>\n' +
'<div collapse="rootHide.start2" class="{{initial}}">\n' +
'  <ul>\n' +
'    <li>{{ \'START.USAGE_LI1\' | translate }}</li>\n' +
'    <li>{{ \'START.USAGE_LI2\' | translate }}</li>\n' +
'    <li>{{ \'START.USAGE_LI3\' | translate }}</li>\n' +
'    <li>{{ \'START.USAGE_LI4\' | translate }}</li>\n' +
'  </ul>\n' +
'</div>\n' +
'\n' +
'\n' +
'<h2><button-collapse target="rootHide" property="start3" collapsed>\n' +
'    {{ \'START.TIPS_HD\' | translate }}\n' +
'</button-collapse></h2>\n' +
'<div collapse="rootHide.start3" class="{{initial}}">\n' +
'  <ul>\n' +
'    <li>{{ \'START.TIPS_LI1\' | translate }}</li>\n' +
'    <li ng-bind-html="\'START.TIPS_LI2\' | translate: { info :\n' +
'      \'<span class=\\\'glyphicon glyphicon-info-sign primary-color\\\'></span>\' +\n' +
'      \'<span class=\\\'sr-only\\\'>\' + translate(\'COMMON.BTN_INFO\') + \'</span>\'\n' +
'    }">\n' +
'    </li>\n' +
'    <li>{{ \'START.TIPS_LI3\' | translate }}</li>\n' +
'    <li>{{ \'START.TIPS_LI4\' | translate }}</li>\n' +
'</ul> </div>\n' +
'</main>\n' +
'\n' +
'<nav ng-include src="\'views/step-buttons.html\'"></nav>\n' +
'');
$templateCache.put('views/step-buttons.html',
'<ul ng-controller="StepButtonsCtrl" class="nav nav-pills step-buttons">\n' +
'  <li ng-if="previousStep">\n' +
'    <button ng-click="previousStep()" class="btn btn-primary-invert">\n' +
'      <span class="glyphicon glyphicon-chevron-left"></span>\n' +
'      {{ \'NAV.PREV_STEP\' | translate}}:\n' +
'      {{ \'NAV.\' + previousStepName | translate}}\n' +
'  </button></li>\n' +
'\n' +
'  <li ng-if="nextStep" class="pull-right">\n' +
'    <button ng-click="nextStep()" class="btn btn-primary">\n' +
'      {{ \'NAV.NEXT_STEP\' | translate}}:\n' +
'      {{ \'NAV.\' + nextStepName | translate}}\n' +
'      <span class="glyphicon glyphicon-chevron-right"></span>\n' +
'  </button></li>\n' +
'</ul>');
$templateCache.put('views/viewReport.html',
'<div ng-include src="\'views/messages.html\'"></div>\n' +
'<div ng-include src="\'views/evaluation/stepbar.html\'"></div>\n' +
'\n' +
'<main>\n' +
'<h1>{{ setTitle( translate(\'DOWNLOAD.TITLE\') ) }}</h1>\n' +
'\n' +
'<p ng-bind-html="\'DOWNLOAD.INTRO\' | translate"></p>\n' +
'\n' +
'<div class="container save-panel">\n' +
'  <div class="panel panel-default">\n' +
'    <div class="panel-heading">\n' +
'     {{ \'DOWNLOAD.DOWNLOAD_REPORT\' | translate}}\n' +
'    </div>\n' +
'    <ul class="list-group">\n' +
'      <li class="list-group-item"><a download="{{exportHtmlFile}}" ng-click="saveHtmlBlobIE()" target="_blank" id="html_download_link">\n' +
'          {{ \'DOWNLOAD.BTN_SAVE_HTML\' | translate}}\n' +
'      </a></li>\n' +
'      <li class="list-group-item"><a download="report.css" href="styles/report.css" target="_blank">\n' +
'          {{ \'DOWNLOAD.BTN_SAVE_CSS\' | translate}}\n' +
'      </a></li>\n' +
'      <li class="list-group-item"><a download="{{exportJsonFile}}" ng-click="downloadJsonStart()" target="_blank" href="{{exportJsonUrl}}">\n' +
'          {{ \'DOWNLOAD.BTN_SAVE_JSON\' | translate}}\n' +
'      </a></li>\n' +
'    </ul>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<full-report ng-if="wcag2specReady"></full-report>\n' +
'\n' +
'</main>');
}]);
