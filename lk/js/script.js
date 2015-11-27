$(function () {
	$('.lk-menu__group_inside .group-head .case').click(function(){
		var $t = $(this).closest('.group-head');
		$t.closest('.lk-menu__group').toggleClass('active').find('.group-body').stop(true, true).slideToggle();
	});

	menuHeight();
	$(window).resize(menuHeight);
});

function menuHeight(){
	var $el = $('.lk-menu');
	$el.css({minHeight: $(window).height() - $el.position().top});
}