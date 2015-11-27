$(function () {
	$('.lk-menu__group_inside .group-head .case').click(function(){
		var $t = $(this).closest('.group-head');
		$t.closest('.lk-menu__group').toggleClass('active').find('.group-body').stop(true, true).slideToggle(function(){$t.closest('.lk-menu__group').removeClass('open')});
	});

	if ( $('select').size() ){
		$('select').selectbox({effect: "fade"});
	}

	menuHeight();
	$(window).resize(menuHeight);


//employees-status >>
	$('body').on('click', '.employees-status__actual', function(){
		$(this).next('.employees-status__bar').fadeToggle('fast');
	}).on('click', '.employees-status__bar-item', function(){
		var $t = $(this),
			$item = $t.parent().find('.employees-status__bar-item'),
			$bar = $t.closest('.employees-status').find('.employees-status__bar'),
			val = $t.data('status-val'),
			status = $t.data('status'),
			cls = '';

		for ( var i = 0; i < $item.length; i++ ){
			cls += $item.eq(i).data('status') + ' ';
		}

		$t.closest('.employees-status').removeClass(cls).addClass(status).find('.employees-status__actual .val').text(val);
		$bar.fadeOut(200);

	}).on('click', function(e){
		if ( $('.employees-status__bar').is(':visible') && !$(e.target).closest('.employees-status').size() ){
			$('.employees-status__bar').fadeOut('fast');
		}
	});
//<< employees-status


// review >>

	$('body').on('click', '.js-open-review-textarea', function(){
		var $t = $(this),
			$box = $t.closest('.feedback-item'),
			$btns = $box.find('.feedback-item__send-answer'),
			$answer = $box.find('.feedback-item__answer');

		$btns.fadeOut(200);
		$answer.slideDown(200);
	}).on('click', '.feedback-item__answer-close', function(){
		var $t = $(this),
			$box = $t.closest('.feedback-item'),
			$btns = $box.find('.feedback-item__send-answer'),
			$answer = $box.find('.feedback-item__answer');

		$btns.fadeIn(200);
		$answer.slideUp(200);
	});


// << review

// tabs >>

	$('.js-tab-wrap').on('click', '[data-tab-link]', function(e){
		e.preventDefault();
		var $t = $(this);

		if ( !$t.hasClass('active') ){
			var ind = $t.data('tab-link'),
				$wrap = $t.closest('.js-tab-wrap'),
				$link = $wrap.find('[data-tab-link]'),
				$item = $wrap.find('[data-tab-item]'),
				$itemActive = $wrap.find('[data-tab-item=' + ind + ']');

			$link.filter('.active').removeClass('active');
			$item.filter('.active').removeClass('active');
			$t.addClass('active');
			$itemActive.addClass('active');

			if ( $itemActive.find('.gallery').size() ){
				$itemActive.find('.gallery').owlCarousel({
					margin:10,
					mouseDrag: false,
					loop: true,
					nav: true,
					items:3,
					autoWidth:true
				});
			}
		}
	});

// << tabs




});

function menuHeight(){
	var $el = $('.lk-menu');
	$el.css({minHeight: $(window).height() - $el.position().top});
}
