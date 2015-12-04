$(function () {

	$('body').on('click', '.btn_disable', function(){
		return false;
	});

	$('.lk-menu__group_inside .group-head .case').click(function(){
		var $t = $(this).closest('.group-head');
		$t.closest('.lk-menu__group').toggleClass('active').find('.group-body').stop(true, true).slideToggle(function(){$t.closest('.lk-menu__group').removeClass('open')});
	});

	if ( $('select').size() ){
		$('select').selectbox({
			effect: "fade",
			onOpen:function(inst){
				$(this).next('.sbHolder').find('.sbOptions').mCustomScrollbar();

			},
			onClose:function(inst){
			}
		});
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

// review.html >>

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

// << review.html

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



// object-choose.html >>

	$('.objects-type').on('click', '.type-item', function(){
		$(this).addClass('active').siblings().removeClass('active').closest('.objects-type').find('.btn_disable').removeClass('btn_disable');

	});

// << object-choose.html



//object-add.html >

	$('body').on('click', '[data-day]', function(){
		$(this).toggleClass('active');
	}).on('click', '.object-add__item_worktime .footnote-link', function(){
		var box = $(this).closest('.field-box');
		var day = $(this).data('day-link');
		var btn = box.find('[data-day]');
		if ( day == 'everyday'){
			btn.addClass('active');
		} else {
			btn.removeClass('active').filter(function(){return $(this).data('day') == day;}).addClass('active');
		}
	});

	objectAddExemple();
	$(window).scroll(objectAddExemple);


	$('body').on('click', '.field-item_list .list-title', function(){

		var $t = $(this);

		if ( $('.list-title_opened').size() && !$t.hasClass('list-title_opened') ){ $('.list-title_opened').click() }

		var $wrap = $t.next('.list-wrap');
		var $list = $wrap.find('.list');

		$t.toggleClass('list-title_opened');
		$wrap.stop(true, true).fadeToggle(200);

		if ( !$list.hasClass('mCustomScrollbar') ) { $list.mCustomScrollbar(); }

	}).on('click', '.field-item_list .list-item_object', function(){
		var $t = $(this);
		var $wrap = $t.closest('.field-item_list');
		var title = $wrap.find('.list-title');
		var text = $t.find('.obj-case__info').text();

		title.text( text ).click();
	}).on('mousedown', function(e){

		if ( $('.list-title_opened').size() ){

			if ( !$(e.target).closest('.field-item_list').length ){
				$('.list-title_opened').click();
			}

		}
	});






//< object-add.html




//messages-dialog.html >

	$('.message-dialog').on('click', '.message', function(){
		var $mes = $(this);
		if ( $mes.hasClass('message_active') ){
			$mes.removeClass('message_active');
		} else {
			$('.message_active').removeClass('message_active');
			$mes.addClass('message_active');
		}

		if ( $('.message_active').size() ){
			$('.message_active-set').addClass('active');
		} else {
			$('.message_active-set').removeClass('active');
		}

	});


	$('body').on('click', '.js-message-set-del', function(){
		$('.message_active').remove();
	}).on('click', '.js-message-set-answ', function(){

		$('html,body').animate({scrollTop:$('.message__answer').offset().top}, 500);

		$('.message__answer').find('textarea').focus();
	}).on('click', '.js-message-set-resend', function(){

	});

//< messages-dialog.html

});

function menuHeight(){
	var $el = $('.lk-menu');
	if ( $el.size() ){
		$el.css({height: $(window).height() - $el.position().top});
		$el.find('.lk-menu__inner').mCustomScrollbar();
	}
}

function objectAddExemple(){
	var wrap = $('.object-add__example-inner');
	var scrolBox = $('.object-add__example-scroll');

	if ( wrap.size() && scrolBox.size() ){
		var wt = $(window).scrollTop();

		if ( wrap.position().top < wt ){
			scrolBox.css({
				top: wt - wrap.position().top
			})
		}
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




Dropzone.autoDiscover = false;

$(function(){

	$('body').on('click', '.js-upload-new-file', function(){
		$(this).closest('.field-dropzone').click();
	});

	var photoDropzone = new Dropzone(".field-dropzone", {
		previewTemplate: '<div class="field-item field-item_file field-item_file-uploaded">' +
							'<div class="file-img">' +
								'<img data-dz-thumbnail >' +
								'<div class="file-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>' +
							'</div>' +
							'<div class="file-name"><span class="file-name__item" data-dz-name></span> <span class="file-name__size" data-dz-size></span></div>' +
							'<div class="file-footnote">' +
								'<span class="footnote-link">Скачать</span>' +
								'<span class="footnote-link">Удалить</span>' +
							'</div></div>',
		thumbnailWidth: 240,
		thumbnailHeight: 170,
		dictDefaultMessage: 'Перетащите фото сюда',
		url: "/lk/upload.php",
		init: function(){
			console.log(this);
			$(this.clickableElements).append('<div class="field-item field-item_file field-item_file-upload js-upload-new-file"><div class="file-img"><img src="img/240x170.gif"></div><div class="file-name"></div><div class="field-footnote"></div></div>');
		}
	});
});