$(function(){
	updateEvents();
});


$(function () {

	$('body').on('click', '.btn_disable', function(){
		return false;
	});

	$('.lk-menu__group_inside .group-head .case').click(function(){
		var $t = $(this).closest('.group-head');
		$t.closest('.lk-menu__group').toggleClass('active').find('.group-body').stop(true, true).slideToggle(function(){$t.closest('.lk-menu__group').removeClass('open')});
	});

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

	$('body').on('click', '.modal-close, .js-modal-close, .modal-overlay', function(e){
		e.preventDefault();
		$(this).closest('.modal').fadeOut();
	});

	var stat = 0;

	$('body').on('click', '.object-add__item_objlist .objects-item', function(){
		var $t = $(this);
		var $tData = $('[data-val='+ $t.data('val') +']');
		var $wrap = $t.closest('.field-item_list');
		var $list = $wrap.find('.objects-list');
		var $item = $list.find('.objects-item');
		var title = $wrap.find('.list-title');

		if ( $t.hasClass('js-objects-select-all-in-tab') ){
			$t.toggleClass('_all').closest('.tab-item').find('.objects-list .objects-item').addClass('active');
			if ( $t.hasClass('_all') ){
				$item.filter('.active').each(function(){ $('[data-val='+ $(this).data('val') +']').addClass('active'); });
			} else {
				$item.removeClass('active');
			}
		} else {
			$t.add($tData).toggleClass('active');
		}

		var num = $item.filter('.active').size() / 2;

		if ( num ){
			title.text('Выбрано ' + num + ' ' + declOfNum( num, ['объект', 'объекта', 'объектов'] ) )
		} else {
			title.text('Выберите из списка');
		}



	});

	$('body').on('click', '.modal-emploeeysobject .objects-item', function(){
		if ( $(this).hasClass('js-objects-select-all-in-tab') ){
			$(this).closest('.tab-item').find('.objects-list .objects-item').addClass('active');
		} else {
			$(this).toggleClass('active');
		}

	});


// << modals



// object-choose.html >>

	$('body').on('click', '.objects-type .type-item', function(){
		$(this).addClass('active').siblings().removeClass('active').closest('.objects-type').find('.btn_disable').removeClass('btn_disable');

	});

// << object-choose.html



//object-add.html >

	$('body').on('click', '[data-day]', function(){
		var $t = $(this);
		var ind = $t.index();
		var wrap = $t.closest('.object-add__item_worktime');

		if ( $t.hasClass('active') ){
			$t.removeClass('active');
		} else {
			wrap.find('.field-item_btns').each(function(){
				$(this).find('.btn').eq(ind).removeClass('active');
			});
			$t.addClass('active');
		}
		worktimeFieldCheck(wrap);
	}).on('click', '.object-add__item_worktime .footnote-link', function(){
		var $t = $(this);
		var wrap = $t.closest('.field-box');
		var itemWrap = $t.closest('.field-item');
		var allWrap = $t.closest('.object-add__item_worktime');
		var day = $t.data('day-link');
		var time = $t.data('time-link');
		var btn = allWrap.find('[data-day]');

		if ( day == 'everyday'){
			allWrap.find('.btn').removeClass('active');
			wrap.find('.btn').addClass('active');
		} else if ( day == 'weekend' || day == 'weekdays') {
			allWrap.find('.btn').filter(function(){return $(this).data('day') == day;}).removeClass('active');
			wrap.find('.btn').filter('.active').removeClass('active');
			wrap.find('.btn').filter(function(){return $(this).data('day') == day;}).addClass('active');
		} else if ( time == 'alltime' ) {
			itemWrap.find('.time_hour_ot').next('.sbHolder').find('[rel="00"]').click();
			itemWrap.find('.time_min_ot').next('.sbHolder').find('[rel="00"]').click();
			itemWrap.find('.time_hour_do').next('.sbHolder').find('[rel="00"]').click();
			itemWrap.find('.time_min_do').next('.sbHolder').find('[rel="00"]').click();
		}

		worktimeFieldCheck(allWrap);
	});

	function worktimeFieldCheck(box){
		isAct = box.find('[data-day]').filter('.active').length;

		console.info(isAct);

		if ( isAct ){
			box.find('.field-box__add').show();
		} else {
			box.find('.field-box__add').hide();
			if ( box.find('.field-box').length > 1 ){
				box.find('.field-box').not(':first').remove()
			}
		}
	}

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
			if ( $(e.target).closest('.field-item_list').length || $(e.target).closest('.keypad-wrap').length ){ }
			else { $('.list-title_opened').click(); }
		}
	});


	$('body').on('mouseenter', '[data-example-link]', function(){
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

	}).on('mouseleave', '[data-example-link]', function(){
		var $t = $(this),
			$item = $('[data-example-item]');

		$t.removeClass('active');
		$item.removeClass('active');

	});


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

	$('body').on('click', '[data-tooltip-link]', function(e){
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
		var left = $t.offset().left + w <= wD ? $t.offset().left : wD - w -20;

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
	//	$el.css({height: $(window).height() - $el.position().top});
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
				top: wt - wrap.position().top
		//		height:  $(window).height() -  100
			})
		}
	}

}


$.fn.showModalLk = function() {
	if ( this.length ){
		return this.each(function(){
			$(this).fadeIn(300, function(){
				dropzInit();
			});

			var wh = $(window).height();
			var ws = $(window).scrollTop();
			var mh = $(this).find('.modal-inner').outerHeight(true);

			var t = ws + (( wh - mh ) / 2);

			$(this).find('.modal-inner').css({top: ( t > 0 ? t : 0  ) });
		});
	}
};



$(function(){

	$('body').on('click', '.object-add__publication .js-show-premium', function(e){
		e.preventDefault();
		$(this).closest('.publication-info').next('.hide').slideToggle(200);
	});

});




//progress


$(function(){
	progressPie();
	$(window).resize(progressPie);
});

function progressPie(){
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
				readOnly: 'true',
				'draw' : function () { $(this.i).val(this.cv + '%'); }
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
				progressPieMove();
			});

		});

		progressPieMove();
	}
}

function progressPieMove(){
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
	val = +val.replace('%', '');
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





//object-list-select

$(function(){

	$(document).on('click', '.js-object-list-select .field-item_list .list .list-item', function(){
		var $t = $(this);
		var $wrap = $t.closest('.js-object-list-select');
		var $num = $wrap.find('.js-result-num');
		var $scroll = $wrap.find('.field-item_list-result .list-scroll');
		var $resCase = $wrap.find('.field-item_list-result .list-wrap');
		var val = $t.data('val');
		var html = $t.html();
		$t.addClass('selected');
		$resCase.append('<div class="list-item" data-val="' + val + '"> <i class="list-item__remove"></i> ' + html + '</div>');
		moreObjectCheck($wrap.find('.field-item_list-result'), $resCase);

		$scroll.mCustomScrollbar();
		if ( $num.size() ) $num.text($resCase.find('.list-item').length);

	}).on('click', '.js-object-list-select .field-item_list-result .list-item__remove', function(){
		var $t = $(this).closest('.list-item');
		var $wrap = $t.closest('.js-object-list-select');
		var $num = $wrap.find('.js-result-num');
		var $resCase = $wrap.find('.field-item_list-result .list-wrap');
		var val = $t.data('val');
		$wrap.find('.field-item_list').find('.list').find('.list-item').filter(function(){ return $(this).data('val') == val; }).removeClass('selected');

		$t.remove();
		moreObjectCheck($wrap.find('.field-item_list-result'), $resCase);
		if ( $num.size() )  $num.text($resCase.find('.list-item').length);

	}).on('click', '.field-box__add', function(e){
		e.stopPropagation();
		var $t = $(this);
		var $box = $t.closest('.field-box');
		var $wrap = $box.closest('.object-add__item');
		var stop = false;

		var $timeChooseWrap = $t.closest('.object-add__item_worktime');
		var required = $wrap.find('.required-field');

		$wrap.find('.must-required').removeClass('must-required');

		if ( required.length ){
			required.each(function(){
				if ( $(this).val() == 'false' || !$.trim($(this).val()) ){
					$(this).closest('.field-item').addClass('must-required');
					stop = true;
				}
			});
			if ( stop ) return false;
		}

		if ( $timeChooseWrap.size() ){
			if ( $timeChooseWrap.find('.field-box').size() > 6 ){
				return false;
			}
		}

		var $newBox = $('<div/>', { class:'field-box' }).html($box.data('code'));
		$newBox.find('.field-box__add').toggleClass('field-box__remove field-box__add');
		$newBox.appendTo($wrap);
		selectBoxInit();
	}).on('click', '.field-box__remove', function(){
		var $t = $(this);
		var $box = $t.closest('.field-box');
		$box.remove();
	}).on('input', '.js-local-search', function(){
		var $t = $(this);
		var wrap = $t.closest('.field-box');
		var list = wrap.find('.list');
		var item = list.find('.js-val');
		var val = $t.val();

		if ( val.length < 1 ){
			item.closest('.js-targ').removeClass('out-found');
		} else {
			var reg = new RegExp(val,'i');
			item.closest('.js-targ').addClass('out-found');
			item.filter(function(){return reg.test($(this).text()); }).closest('.js-targ').removeClass('out-found');
		}
	}).on('change', 'select', function(){
		if ( $(this).find('[data-change-example-link]').size() ){
			var $t = $(this);
			var val = $(this).val();
			var data = $(this).find('option').filter(function(){return $(this).val() == val }).data('change-example-link');
			if ( $t.closest('[data-example-link]').size() ){
				$t.closest('[data-example-link]').attr('data-example-link', data);
			}
		}
	}).on('change keyup input', '.js-select-search', function(){
		var $t = $(this);
		var wrap = $t.closest('.field-item');
		var list = wrap.find('.input__result');
		var item = list.find('.list-item');
		var val = $t.val();
		item.addClass('hidden');

		list.mCustomScrollbar();
		if ( val.length > 0 ){
			var reg = new RegExp(val,'i');
			var vis = item.filter(function(){return reg.test($(this).text()); }).removeClass('hidden');

			if ( vis.size() ){
				list.show();
			} else {
				list.hide();
			}
		} else {
			list.hide();
		}
	}).on('click', '.js-input-result .list-item', function(){
		var $t = $(this);
		var wrap = $t.closest('.field-item');
		var input = wrap.find('.js-select-search');
		var list = wrap.find('.input__result');

		input.val($t.text()).attr('data-val', $t.data('val'));
		list.hide();
	});



});

function moreObjectCheck(wrap, box){
	if ( !$.trim($(box).html()) ){
		$(wrap).addClass('clear');
	} else {
		$(wrap).removeClass('clear');
	}
}





$(function(){
	$(document).on('ajaxComplete', updateEvents);
});

function updateEvents(){
	dataUpdate();

	$('.modal-emploeeysrights__body').mCustomScrollbar();
	$('.modal-emploeeysobject__body .objects-wrap').mCustomScrollbar();
	$('.modal-region .nest').mCustomScrollbar();

	if ( $('.js-catalog-item-pie').size() ) $('.js-catalog-item-pie').knob({'draw' : function () { $(this.i).val(this.cv + '%'); }});

	datepicker();
	selectBoxInit();
	progressPie();
	dropzInit();
}

function dataUpdate(){
	$('.field-box').each(function(){
		var $t = $(this);
		if ( $t.find('.field-box__add').size() && !$t.data('code') ){
			$t.data('code', $t.html());
		}
	});
}

function selectBoxInit(){
	if ( $('select').size() ){

		$('select').each(function(){

			if( !$(this).hasClass('one_select') ){
				$(this).selectbox({
					effect: "fade",
					onOpen:function(inst){
						$(this).next('.sbHolder').find('.sbOptions').mCustomScrollbar();

					},
					onClose:function(inst){
					}
				});
			}

		});
	}
}

// date picker

function datepicker(){
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
			if ( !$(this).datepicker() ){
				$(this).datepicker()
					.on('show', function(e) {
						$(this).closest('.input-wrap').addClass('opened');
					})
					.on('hide', function(e) {
						$(this).closest('.input-wrap').removeClass('opened');
					});
			}
		});

		$('body').on('mousedown', function(e){
			if ( $('.datepicker').is(':visible')){
				if ( $(e.target).closest('.date-input').length || $(e.target).closest('.datepicker-dropdown').length ){ return false; }
				else { $('.datepicker').hide(); }
			}
		})

	}

}

function declOfNum(number, titles){
	cases = [2, 0, 1, 1, 1, 2];
	return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}



// dropzone

function dropzInit(){

	var $dz = $('.dropzone');

	if ( $dz.size() ){
		if ( window.Dropzone ){
			Dropzone.autoDiscover = false;
		}
		$dz.each(function(){
			var D = $(this);
			if ( D.is(':visible') && !D.hasClass('dropzone_inited') ){
				var id = 'dropZone_' + Math.floor(Math.random() * (9999 - 1000));
				var url = D.data('url');
				var maxFiles = D.data('max-files');
				var sponsor = D.data('sponsor') ? '<div class="footnote-input"><input type="text" placeholder="Название спонсора" class="js-input-uploaded-img"></div>' : '';

				//		console.log(id);
				D.attr('id', id).addClass('dropzone_inited');

				if ( window.Dropzone ){
					Dropzone.options['#' + id] = false;
				}

				var photoDropzone = new Dropzone('#' + id, {
					previewTemplate: '<div class="field-item field-item_file field-item_file-uploaded">'
					+					'<div class="file-img">'
					+						'<img data-dz-thumbnail src="img/240x170.gif">'
					+						'<div class="file-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'
					+					'</div>'
					//+					'<div class="file-name"><span class="file-name__item" data-dz-name></span> <span class="file-name__size" data-dz-size></span></div>'
					+						'<div class="file-footnote">'
						//+						'<span class="footnote-link">Скачать</span>'
					+						sponsor
					//+						'<span class="footnote-link js-remove-uploaded-img" data-id-remove >Удалить</span>'
					+						'<span class="file-remove js-remove-uploaded-img" data-id-remove ></span>'
					+					'</div></div>',
					thumbnailWidth: 240,
					thumbnailHeight: 170,
					acceptedFiles: 'image/jpeg,image/png,image/gif',
					previewsContainer: '#' + id + ' .js-upload-files-container',
					clickable: '#' + id + ' .js-upload-new-file',
					maxFiles: maxFiles ? maxFiles : null,
					dictDefaultMessage: 'Перетащите фото сюда',
					url: url
				});

				//	console.info(photoDropzone);

				photoDropzone.on('uploadprogress', function(file, progress, bytesSent){
					//console.info(progress);
					//console.info(bytesSent);
				});

				photoDropzone.on('success', function(file){
					//console.info(file);
					//console.info(file.xhr.response);
					var id = +file.xhr.response.replace('New ID: ', '');

					$(file.previewElement).find('[data-id-remove]').attr('data-id-remove', id);

					if ( sponsor ){
						$(file.previewElement).find('.footnote-input input').attr('data-id-val', id);
					}

				});

				photoDropzone.on('addedfile', function(file){

					if ( file.name && !/\.(jpg|jpeg|gif|png)$/i.test( file.name ) ) {
						alert( 'Вы выбрали неверный тип файла \nДопустимые типы файлов: jpg, gif, png.' );
						$(file.previewElement).remove();
					}

				});

			}
		});
	}

}

/*
addedfile: function(file),
addedfiles: function(),
canceled: function(file),
canceledmultiple:function(),
complete:function(file),
completemultiple:function(),
dragend:function(e),
dragenter:function(e),
dragleave:function(e),
dragover:function(e),
dragstart:function(),
drop:function(e),
error:function(file, message),
errormultiple:function(),
maxfilesexceeded:function(),
maxfilesreached:function(),
processing:function(file),
processingmultiple:function(),
queuecomplete:function(),
removedfile:function(file),
reset:function(),
sending:function(),
sendingmultiple:function(),
success:function(file),
successmultiple:function(),
thumbnail:function(file, dataUrl),
totaluploadprogress:function(),
uploadprogress:function(file, progress, bytesSent)
*/






//  main page

$(function(){

	$('body').on('click', '.block_aboutcompany .js-edit-aboutcompany', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.block_aboutcompany');
		$wrap.removeClass('block_aboutcompany-cup').addClass('block_aboutcompany-edit');
	}).on('click', '.block_aboutcompany .js-save-aboutcompany', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.block_aboutcompany');
		var text = $.trim($wrap.find('textarea').val());
		var nevText = $wrap.find('.block-body');

		$wrap.removeClass('block_aboutcompany-edit');

		if ( text ){
			nevText.html(text.replace(/\n/g,'<br>'));
		} else {
			$wrap.addClass('block_aboutcompany-cup')
		}
	}).on('click', '.block_aboutcompany .js-add-aboutcompany', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.block_aboutcompany');
		$wrap.removeClass('block_aboutcompany-cup').addClass('block_aboutcompany-edit');

	}).on('change', '.js-add-avatar', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.block-column_img');
		var $img = $wrap.find('.profile-img img');
		$.app.avatarCropper.upload(this, e)
	}).on('click', '.js-cropavatar-reload', function(e){
		e.preventDefault();
		$('.js-add-avatar').first().click();
	}).on('click', '.js-remove-avatar', function(e){
		e.preventDefault();
		$('.js-avatar-img').attr('src', 'img/profile-img_custom.svg');
		$('.profile-settings').addClass('profile-settings_no');
	}).on('click', '.js-lk-edit-profile-name', function(e){
		e.preventDefault();
		var targ = $(this).siblings('.js-lk-edit-profile-name_targ');
		var wrap = $(this).closest('.js-lk-edit-profile-name_wrap');
		var val = targ.text();
		wrap.addClass('edit');
		var input = $('<input type="text" value="' + val + '">');
		targ.html(input);
		input.focus();
	}).on('blur', '.js-lk-edit-profile-name_targ input', function(e){
		e.preventDefault();
		var name = $(this).closest('.js-lk-edit-profile-name_targ');
		var wrap = $(this).closest('.js-lk-edit-profile-name_wrap');
		var val = $(this).val();
		wrap.removeClass('edit');
		name.html(val);
	});



	$('body').on('click', '.catalog-item-info .list-responsible', function(e){
		e.preventDefault();
		$(this).next('.menu-responsible').fadeIn(200);
	}).on('click', '.catalog-item-info .menu-responsible__item .remove', function(e){
		e.preventDefault();
		$(this).closest('.menu-responsible__item').remove();
	}).on('click', '.catalog-item-info .menu-responsible__close', function(e){
		e.preventDefault();
		$(this).closest('.menu-responsible').fadeOut(200);
	});


});


(function(){
	var app = {

		avatarCropper: {

			uncroppedImg: '',

			template: '<div class="modal modal-cropavatar">'
					+		'<div class="modal-overlay"></div>'
					+		'<div class="modal-inner">'
					+			'<div class="modal__body">'
					+				'<div class="title">Фотография на Вашей странице</div>'
					+				'<div class="text">Выбранная область будет показываться на Вашей странице.<br>Если изображение ориентировано неправильно, фотографию можно повернуть.</div>'
					+				'<div class="img">'
					+					'<div class="rotate">'
					+						'<span class="rotate__cw"></span>'
					+						'<span class="rotate__ccw"></span>'
					+					'</div>'
					+					'<img id="avatarCropper" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">'
					+				'</div>'
					+			'</div>'
					+			'<div class="modal__footer">'
					+				'<a href="#" class="btn js-cropavatar-confirm">Сохранить</a>'
					+				'<a href="#" class="js-cropavatar-reload">Изменить изображение</a>'
					+			'</div>'
					+		'</div>'
					+	'</div>',

			upload: function(el, e){

				if (el.value && !/\.(jpg|jpeg|gif|png)$/i.test(el.value)) {
					alert('Вы выбрали не верный тип файла \nДопустимые типы файлов: jpg, gif, png.');
				} else if (el.value) {

					var file = e.target.files[0];
					var reader = new FileReader();

					reader.fileName = el.files[0].name;

					reader.onload = function(e){
						app.avatarCropper.crop(e.target.result);
					};

					reader.onerror = function(e) {alert('fileReader error ' + e);};

					reader.readAsDataURL(file);
				}

			},

			crop: function(src){

				app.avatarCropper.unCroppedImg = src;

				var $modal = $('.modal-cropavatar');

				if ( !$modal.size() ){
					var $modal = $(app.avatarCropper.template).appendTo('body');
				}

				var $img = $modal.find('#avatarCropper');
				$img.attr('src', src);

				if ( $img.cropper ){
					$img.cropper('destroy');
				}

				$img.cropper({
					guides: false,
					aspectRatio: 1,
					dragMode: 'move',
					viewMode: 1,
					movable: true,
					cropBoxMovable: false,
					cropBoxResizable: false,
					minContainerHeight: 400,
					//minCropBoxHeight: 300,
					//minCropBoxWidth: 300,
					//minCanvasWidth: 300,
					//minCanvasHeight: 300,
					built: function(){
						$(this).cropper('setCropBoxData', {
							'top': 70,
							'left': 34,
							'width': 270,
							'height': 270
						}).cropper('setCropBoxData', {
							//'top': 40
						});
					}
				});

				$modal.showModalLk();

			}
		},

		init: function(){

			$('body').on('click', '.rotate__cw', function(){
				$(this).closest('.modal-cropavatar').find('#avatarCropper').cropper('rotate', 90);
			}).on('click', '.rotate__ccw', function(){
				$(this).closest('.modal-cropavatar').find('#avatarCropper').cropper('rotate', -90);
			}).on('click', '.js-cropavatar-confirm', function(e){
				e.preventDefault();
				var img = $('#avatarCropper').cropper('getCroppedCanvas', {width: 160, height: 160}).toDataURL('image/png');
				$('.modal-cropavatar').fadeOut();
				$('.js-avatar-img').attr('src', img);
				$('.profile-settings_no').removeClass('profile-settings_no');
			});

		}
	};

	var appLoad = function(){
		jQuery.app = app;
		app.init();
	};
	var appInt = setInterval(function(){
		if (typeof jQuery !== 'function') return;
		clearInterval(appInt);
		$(function(){
			setTimeout(appLoad, 0);
		});

	}, 50);

})();
