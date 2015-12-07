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

// << review.html



// modals >>

	$('body').on('click', '.modal-close, .js-modal-close', function(e){
		e.preventDefault();
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

	$('body').on('click', '.objects-type .type-item', function(){
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

//	objectAddExemple();
//	$(window).scroll(objectAddExemple);


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
			if ( $(e.target).closest('.field-item_list').length || $(e.target).closest('.keypad-wrap').length ){ return false; }
			else { $('.list-title_opened').click(); }
		}
	});


	$('[data-example-link]').hover(function(){
		var $t = $(this),
			ind = $t.data('example-link'),
			$itemActive = $('[data-example-item=' + ind + ']');

		var wrap = $('.object-add__example-inner');
		var scrolBox = $('.object-add__example-scroll');


		var wt = $(window).scrollTop();

		if ( $t.offset().top < wt ){
			scrolBox.css({
				top: wt - wrap.position().top,
				height:  $(window).height() -  100
			})
		} else {
			scrolBox.css({
				top: $t.offset().top - wrap.offset().top
			});
		}

		$t.addClass('active');
		$itemActive.addClass('active');

	}, function(){
		var $t = $(this),
			$item = $('[data-example-item]');

		$t.removeClass('active');
		$item.removeClass('active');

	});


// date picker



	(function datepicker(){
		var di = $('.date-input');
		if ( di.size() ){
			var nowTemp = new Date();
			var valDay = nowTemp.getDate().toString().length > 1 ? nowTemp.getDate() : '0' + nowTemp.getDate();
			var valMonth = (nowTemp.getMonth()+1).toString().length > 1 ? ( nowTemp.getMonth() + 1 ) : '0' + ( nowTemp.getMonth() + 1 );
			var valYear = nowTemp.getFullYear();

			di.each(function(){
				if ( !$(this).val() ){
					$(this).val( valDay + '.' + valMonth + '.' + valYear );
				}
			});

			di.each(function(){
				$(this).datepicker()
					.on('show', function(e) {
						$(this).closest('.input-wrap').addClass('opened');
					})
					.on('hide', function(e) {
						$(this).closest('.input-wrap').removeClass('opened');
					});
			});

			$('body').on('mousedown', function(e){
				if ( $('.datepicker').is(':visible')){
					if ( $(e.target).closest('.date-input').length || $(e.target).closest('.datepicker-dropdown').length ){ return false; }
					else { $('.datepicker').hide(); }
				}

			})


		}

	})();



//progress

	if ( $('.progress-pie').size()  ){

		$('.progress-pie').each(function(){
			var $t = $(this);
			var val = $t.val();

			$(this).knob({
				width:'41',
				height:'41',
				thickness: '0.15',
				bgColor: '#c4c4c4',
				fgColor: progressPieColor(val),
				readOnly: 'true'
			});

			$(this).change(function(){

				var $t = $(this);
				var val = $t.val();
				$t.trigger('configure',
					{
						fgColor: progressPieColor(val)
					}
				);
				$t.css({color: progressPieColor(val)});
				progressPie();
			});

		});

		progressPie();

	}

	$(window).resize(progressPie);


	function progressPie(){
		var mark = $('.progress-mark');
		var step = $('.progress-item.active');

		var l = step.position().left - 4;
		var w = step.width() + 10;

		mark.css({
			left: l,
			width: w
		});
	}
	function progressPieColor(val){
		if ( val == 0 ){
			return '#c4c4c4'
		} else if ( val > 0 && val <= 20 ){
			return '#ed2024'
		} else if ( val > 20 && val <= 80 ){
			return '#e68929'
		} else {
			return '#70c63f'
		}
	}


	//	$('.progress-pie').val(87).trigger('change');




//< object-add.html




//messages-dialog.html >

	$('body').on('click', '.message-dialog .message', function(){
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

//notify.html >

	$('body').on('change', '.modal-region input[type=checkbox]', function(){
		var $t = $(this),
			$i = $('input[type=checkbox]');

		if ( $t.is(':checked') ){
			$t.closest('.nest-case').next('.nest-list').find($i).prop('checked', true);
		} else {
			$t.closest('.nest-case').next('.nest-list').find($i).prop('checked', false);
		}
	}).on('click', '.modal-region .nest-marker', function(){
		var $t = $(this);
		$t.closest('.nest-case').next('.nest-list').stop(true, true).slideToggle(200);
		$t.toggleClass('open');
	});




//< notify.html




// tooltip

	$('body').on('click', '.tooltip-link', function(e){
		e.stopPropagation();
		e.preventDefault();

		var $t = $(this);
		var tooltipId = $t.data('tooltip-link');
		var $tooltip = $('.tooltip-popup[data-tooltip-popup=' + tooltipId + ']');

		$tooltip.fadeIn(200);

		var h = $tooltip.outerHeight();
		var w = $tooltip.outerWidth();
		var hD = $(document).height();
		var wD = $(document).width();


		var top = $t.offset().top + h <= hD ? $t.offset().top : hD - h;
		var left = $t.offset().left + w <= wD ? $t.offset().left : wD - wh;

		$tooltip.css({
			top: top,
			left: left
		})

	})
		.on('click', '.tooltip-popup__close', function(){
		$(this).closest('.tooltip-popup').fadeOut(200);
	})
		.on('mousedown', function(e){
		if ( $('.tooltip-popup').size() ){
			var target = e && e.target || event.srcElement;
			if ( $(target).closest('.tooltip-popup').length ) return;

			$('.tooltip-popup').fadeOut(200);

		}
	});





	//


	$('.password-eye').on('mousedown', function(){
		$(this).next('input').attr('type', 'text').addClass('focus');
	}).on('mouseup mouseleave', function(){
		$(this).next('input').attr('type', 'password').removeClass('focus');
	});


	$('body').on('click', '.js-tab-wrap [data-tab-link]', function(e){
		e.preventDefault();
		var $t = $(this);

		if ( !$t.hasClass('active') ){
			var ind = $t.data('tab-link'),
				$wrap = $t.closest('.js-tab-wrap'),
				$link = $t.siblings('[data-tab-link]'),
				$item = $wrap.find('[data-tab-item]').first(),
				$itemActive = $wrap.find('[data-tab-item=' + ind + ']');

			$link.filter('.active').removeClass('active');
			$item.removeClass('active').siblings('.active').removeClass('active');
			$t.addClass('active');
			$itemActive.addClass('active');
		}
	});


	clearInputBtn();
	$('body').on('keyup change input', '.js-input-targ', function(){
		clearInputBtn();
	}).on('click', '.js-input-clear', function(e){
		e.preventDefault();
		$(this).closest('.js-input-wrap').find('.js-input-targ').val('');
		clearInputBtn();
	}).on('click', '.keypad .key', function(){
		clearInputBtn();
	});

});

function clearInputBtn(){
	$('.js-input-targ').each(function(){
		if ( $(this).val() ){ $(this).closest('.js-input-wrap').addClass('filled'); }
		else { $(this).closest('.js-input-wrap').removeClass('filled'); }
	});
}


function menuHeight(){
	var $el = $('.lk-menu');
	if ( $el.size() ){
		$el.css({height: $(window).height() - $el.position().top});
		$el.find('.lk-menu__inner').mCustomScrollbar({scrollInertia:300});
	}
}

function objectAddExemple(){
	var wrap = $('.object-add__example-inner');
	var scrolBox = $('.object-add__example-scroll');

	if ( wrap.size() && scrolBox.size() ){
		var wt = $(window).scrollTop();

		scrolBox.css({
		//	height:  $(window).height() -  100
		});

		if ( wrap.position().top < wt ){
			scrolBox.css({
				top: wt - wrap.position().top,
		//		height:  $(window).height() -  100
			})
		}
	}

}


$.fn.showModalLk = function() {
	if ( this.length ){
		return this.each(function(){
			$(this).fadeIn(300, function(){
				dropzoneInit();
			});

			var wh = $(window).height();
			var ws = $(window).scrollTop();
			var mh = $(this).find('.modal-inner').outerHeight(true);

			var t = ws + (( wh - mh ) / 2);

			$(this).find('.modal-inner').css({top: ( t > 0 ? t : 0  ) });
		});
	}
};






if ( window.Dropzone ){
	Dropzone.autoDiscover = false;
}

$(function(){
	dropzoneInit();
});

function dropzoneInit(){

	var $dz = $('.dropzone')

	if ( $dz.size() && $dz.is(':visible') ){

		$('.dropzone').each(function(){

			var url = $(this).data('url');

			var photoDropzone = new Dropzone($(this).get(0), {
				previewTemplate: '<div class="field-item field-item_file field-item_file-uploaded">' +
				'					<div class="file-img">' +
				'						<img data-dz-thumbnail src="img/240x170.gif">' +
				'						<div class="file-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>' +
				'					</div>' +
				'					<div class="file-name"><span class="file-name__item" data-dz-name></span> <span class="file-name__size" data-dz-size></span></div>' +
				'						<div class="file-footnote">' +
				'						<span class="footnote-link">Скачать</span>' +
				'						<span class="footnote-link" data-dz-remove>Удалить</span>' +
				'					</div></div>',
				thumbnailWidth: 240,
				thumbnailHeight: 170,
				acceptedFiles: 'image/jpeg,image/png,image/gif',
				previewsContainer: '.js-upload-files-container',
				clickable: '.js-upload-new-file',
				dictDefaultMessage: 'Перетащите фото сюда',
				url: url,
				init: function(){
					//	photoDropzone.clickableElements = [ photoDropzone.element.querySelector('.js-upload-new-file') ];
					//	this.clickableElements = [$(this.element).find('.js-upload-new-file')[0]];
					//	Dropzone.getElements(this.element.querySelector('.js-upload-new-file'), "clickable");

					//	console.log(this.element.querySelector('.js-upload-new-file'));
					//	console.log($(this.element).find('.js-upload-new-file'));
					//	$(this.clickableElements).append('<div class="field-item field-item_file field-item_file-upload js-upload-new-file"><div class="file-img"><img src="img/240x170.gif"></div><div class="file-name"></div><div class="field-footnote"></div></div>');

				}
			});

		});



	}

}