'use strict';

angular.module('wcagReporter')
.constant('knownTech', [
    {title: 'HTML5', id: 'http://www.w3.org/TR/html5/'},
    {title: 'XHTML 1.0', id: 'http://www.w3.org/TR/xhtml1/'},
    {title: 'HTML 4.01', id: 'http://www.w3.org/TR/html401/'},
    {title: 'CSS', id: 'http://www.w3.org/Style/CSS/specs/'},
    {title: 'WAI-ARIA', id: 'http://www.w3.org/TR/wai-aria/'},
    {title: 'ECMAScript 3', id: 'http://www.ecma-international.org/publications/standards/Ecma-327.htm'},
    {title: 'ECMAScript 5', id: 'http://www.ecma-international.org/publications/standards/Ecma-262.htm'},
    {title: 'DOM', id: 'http://www.w3.org/DOM/'},
    {title: 'Flash', id: 'http://get.adobe.com/nl/flashplayer/'},
    {title: 'Silverlight', id: 'http://www.microsoft.com/silverlight/'},
    {title: 'OOXML', id: 'http://www.ecma-international.org/publications/standards/Ecma-376.htm'},
    {title: 'ODF 1.2', id: 'https://www.oasis-open.org/standards#opendocumentv1.2'},
    {title: 'SVG', id: 'http://www.w3.org/TR/SVG/'}
]);