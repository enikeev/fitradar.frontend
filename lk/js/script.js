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


// keypad >>

	$('.js-input-clear').click(function(e){
		e.preventDefault();
		$(this).closest('.js-input-wrap').find('.js-input-targ').val('');
	});

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
		}
	});

// << review

// modals >>

	$('body').on('click', '.modal-close', function(){
		$(this).closest('.modal').fadeOut();
	});
	$('body').on('click', '.objects-item', function(){
		if ( $(this).hasClass('js-objects-select-all-in-tab') ){
			$(this).closest('.tab-item').find('.objects-list .objects-item').addClass('active');
		} else {
			$(this).toggleClass('active');
		}
	});

	$('.modal-emploeeysrights__body').mCustomScrollbar();
	$('.modal-emploeeysobject__body .objects-wrap').mCustomScrollbar();



// << modals


});

function menuHeight(){
	var $el = $('.lk-menu');
	if ( $el.size() ){
		$el.css({height: $(window).height() - $el.position().top});
		$el.find('.lk-menu__inner').mCustomScrollbar();
	}
}


$.fn.showModalLk = function() {
	if ( this.length ){
		return this.each(function(){
			$(this).fadeIn(300);

			var wh = $(window).height();
			var ws = $(window).scrollTop();
			var mh = $(this).find('.modal-inner').outerHeight(true);

			$(this).find('.modal-inner').css({top: ws + (( wh - mh ) / 2) });
		});
	}
};