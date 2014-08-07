(function ($) {
	'use strict';
	$('body').on('click', 'button.toggle-page-details', function () {
		$('.assert-indent').toggle(300);
		$('.show_pages').toggle();
		$('.hide_pages').toggle();
	});
}(jQuery));
