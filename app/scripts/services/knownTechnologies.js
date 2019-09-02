'use strict';

angular.module('wcagReporter')
  .constant('knownTech', [
    { title: 'HTML5', id: 'http://www.w3.org/TR/html5/', type: 'Technology' },
    { title: 'XHTML 1.0', id: 'http://www.w3.org/TR/xhtml1/', type: 'Technology' },
    { title: 'HTML 4.01', id: 'http://www.w3.org/TR/html401/', type: 'Technology' },
    { title: 'CSS', id: 'http://www.w3.org/Style/CSS/specs/', type: 'Technology' },
    { title: 'WAI-ARIA', id: 'http://www.w3.org/TR/wai-aria/', type: 'Technology' },
    { title: 'ECMAScript 3', id: 'http://www.ecma-international.org/publications/standards/Ecma-327.htm', type: 'Technology' },
    { title: 'ECMAScript 5', id: 'http://www.ecma-international.org/publications/standards/Ecma-262.htm', type: 'Technology' },
    { title: 'DOM', id: 'http://www.w3.org/DOM/', type: 'Technology' },
    { title: 'Flash', id: 'http://get.adobe.com/nl/flashplayer/', type: 'Technology' },
    { title: 'Silverlight', id: 'http://www.microsoft.com/silverlight/', type: 'Technology' },
    { title: 'OOXML', id: 'http://www.ecma-international.org/publications/standards/Ecma-376.htm', type: 'Technology' },
    { title: 'ODF 1.2', id: 'https://www.oasis-open.org/standards#opendocumentv1.2', type: 'Technology' },
    { title: 'SVG', id: 'http://www.w3.org/TR/SVG/', type: 'Technology' }
  ]);
