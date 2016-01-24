(function(){
	var app = {
		auth: {
			userRegCheck: function(){
				var $box = $('.auth-box_reg');
				var n = $box.find('[name=reg]').filter(':checked').val();

				$box.removeClass('auth-box_reg-coach auth-box_reg-org');

				if ( n == 3 ){
					$box.addClass('auth-box_reg-org');
				} else if ( n == 2 ) {
					$box.addClass('auth-box_reg-coach');
				}
			},

			regPassStatus: function($el){
				var $box = $el.next('.pass-security');

				if ( $box ){
					var val = $el.val();
					var statusBox = $box.find('.status');
					var statusText = $box.find('.status-text');

					var wrongSymb = /\s/;
					var regNum = /[0-9]/;
					var regLatLC = /[a-z]/;
					var regLatAC = /[A-Z]/;
					var regSymb = /\W/;

					if ( wrongSymb.test(val) ) {
						statusBox.removeClass('status_2 status_3 status_1');
						statusText.text('Неподходящий');
					} else if ( val.length >= 6 && regLatLC.test(val) && regLatAC.test(val) && regNum.test(val) && regSymb.test(val) ){
						statusBox.addClass('status_3');
						statusText.text('Сильный');
					} else if ( val.length >= 6 && regLatLC.test(val) && regLatAC.test(val) && regNum.test(val) ){
						statusBox.removeClass('status_3').addClass('status_2');
						statusText.text('Средний');
					} else if ( val.length >= 6 && regLatLC.test(val) && regLatAC.test(val) ){
						statusBox.removeClass('status_3 status_2').addClass('status_1');
						statusText.text('Слабый');
					} else {
						statusBox.removeClass('status_2 status_3 status_1');
						statusText.text('Неподходящий');
					}


					if ( val.length > 0 && $box.is(':hidden') ){
						$box.fadeIn();
					} else if (val.length == 0 && $box.is(':visible')) {
						$box.fadeOut();
					}
				}
			},

			init: function(){
				var regRadio = $('.auth-box_reg').find('[name=reg]');

				if ( regRadio.size() ){
					app.auth.userRegCheck();

					regRadio.change(app.auth.userRegCheck)
				}

				$('.js-reg-pass-security').on('keyup', function(){
					app.auth.regPassStatus($(this));
				}).on('blur', function(){
					$(this).next('.pass-security').fadeOut();
				});

				$('.pass-security .close').on('click', function(){
					$(this).closest('.pass-security').fadeOut();
				});

				$('.box-content_pass-recovery .recover-pass').click(function(){
					$(this).slideUp().next('.recover-form').slideDown();
				});

				$('.password-eye').on('mousedown', function(){
					$(this).next('input').attr('type', 'text').addClass('focus');
				}).on('mouseup mouseleave', function(){
					$(this).next('input').attr('type', 'password').removeClass('focus');
				});

				$('.js-change-auth-box').on('click', function(e){
					e.preventDefault();
					var $thisBox = $(this).closest('.auth-box');
					var $anotherBox = $('.auth-box_hidden');

					$thisBox.animate({
						left: '80%',
						opacity: '0'
					}, 300, function(){
						$thisBox.addClass('auth-box_hidden').removeAttr('style');
					});

					$anotherBox.css({
						display: 'block',
						opacity: '0'
					}).animate({
						left: '50%',
						opacity: '1'
					}, 300, function(){
						$anotherBox.removeClass('auth-box_hidden').removeAttr('style');
					});
				});

			}
		},
		calculator: {
			sexCheck: function(){
				$('input[name^=sex]').filter(':checked').each(function(){
					var $t = $(this),
					wrap = $t.closest('.calculator'),
					sex = $t.val();

					if ( sex == 'male' ){
						wrap.removeClass('calculator_female').addClass('calculator_male');
					} else if ( sex == 'female' ){
						wrap.removeClass('calculator_male').addClass('calculator_female');
					}

				});
			},
			init: function(){

				app.calculator.sexCheck();

				$('input[name^=sex]').change(function(){
					var wrap = $(this).closest('.calculator');
					if ( $(this).val() == 'male' ){
						wrap.removeClass('calculator_female').addClass('calculator_male');
					} else if ( $(this).val() == 'female' ){
						wrap.removeClass('calculator_male').addClass('calculator_female');
					}
				})
			}
		},
		pictureBox: {
			init: function(){
				$('body').on('click', '.rb-viewer', function(e){
					e.preventDefault();
					var $t = $(this),
						curSrc = $t.attr('href'),
						curAlt = $t.data('rb-alt') ? $t.data('rb-alt') : '',
						pbGroup = $t.data('rb-group'),
						pbImgList = '',
						$pb = $('.picture-box');

					if ( !$pb.size() ){
						$pb = $('<div/>', {
							class:  'picture-box'
						});

						$pb.append('<div class="pb-overlay"></div>'
							+'<div class="pb-viewer">'
								+'<div class="pb-viewer__box">'
									+'<div class="pb-viewer__head">'
										+'<div class="pb-tc">'
											+'<div class="pb-viewer__head-wrap">'
												+'<div class="pb-viewer__head-left">'
													+'<div class="pb-name"></div>'
												+'</div>'
												+'<div class="pb-viewer__head-right">'
													+'<div class="pb-openbig"></div>'
													+'<div class="pb-download"></div>'
													+'<div class="pb-print"></div>'
												+'</div>'
											+'</div>'
										+'</div>'
									+'</div>'
									+'<div class="pb-viewer__body">'
										+'<div class="pb-tc">'
											+'<div class="pb-viewer__img">'
												+'<img src="" alt="">'
											+'</div>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<div class="pb-viewer__control pb-viewer__control_close"></div>'
								+'<div class="pb-viewer__control pb-viewer__control_prev"></div>'
								+'<div class="pb-viewer__control pb-viewer__control_next"></div>'
							+'</div>'
							+'<div class="pb-thumbs">'
								+'<div class="pb-thumbs__wrap">'
									+'<ul class="pb-thumbs__list">'
									+'</ul>'
								+'</div>'
							+'</div>')
							.hide()
							.appendTo('body');
					}

					$pb.find('.pb-name').text(curAlt);
					$pb.find('.pb-viewer__img img').attr('src', curSrc);

					var $imgInGroup = $('[data-rb-group = ' + pbGroup + ']');

					if ( $imgInGroup.length ){
						for ( var i = 0; i < $imgInGroup.length; i++ ){

							var active = $imgInGroup.eq(i).attr('href') == curSrc ? 'active' : '';
							var text = $imgInGroup.eq(i).data('rb-alt') ? $imgInGroup.eq(i).data('rb-alt') : '';
							var altSrc = ( $imgInGroup.eq(i).data('rb-preview') && $.trim($imgInGroup.eq(i).data('rb-preview')) !== '' ) ? $imgInGroup.eq(i).data('rb-preview') : $imgInGroup.eq(i).attr('href');

							pbImgList += '<li class="pb-thumbs__item"><span class="pb-thumbs__link ' + active + '"><img src="' + altSrc + '" alt="' + text + '" data-pb-href="' + $imgInGroup.eq(i).attr('href') + '"><b></b></span></li>'
						}
					} else {
						pbImgList = '<li class="pb-thumbs__item"><span class="pb-thumbs__link"><img src="' + curSrc + '" alt="' + curAlt + '"><b></b></span></li>'
					}

					$pb.find('.pb-thumbs__list').html(pbImgList);

					app.pictureBox.dim();

					$('html').addClass('pb-view');
					$pb.fadeIn(200, function(){
						$('.pb-thumbs__list').mCustomScrollbar({
							axis:"x",
							advanced:{autoExpandHorizontalScroll:true}
						});
					});


				});

				$('body').on('click', '.pb-thumbs__link', function(){
					var $t = $(this);
					var $img = $(this).find('img');
					var src = $img.data('pb-href');
					var alt = $img.attr('alt') ? $img.attr('alt') : '';

					if ( !$t.hasClass('active') ){

						$('.pb-thumbs__link').filter('.active').removeClass('active');
						$t.addClass('active');

						$('.pb-viewer__img img').attr({
							'src': src,
							'alt': alt
						});

						$('.pb-name').text(alt);

					}

				}).on('click', '.pb-print', function(){
					app.pictureBox.printImg($('.pb-viewer__img img').attr('src'));
				}).on('click', '.pb-download', function(){
					var a = $("<a>")
						.attr('href', $('.pb-viewer__img img').attr('src'))
						.attr('download', $('.pb-viewer__img img').attr('src'))
						.appendTo("body");
					a[0].click();
					a.remove();
				}).on('click', '.pb-openbig', function(){
					var a = $("<a>")
						.attr('href', $('.pb-viewer__img img').attr('src'))
						.attr('target', '_blank')
						.appendTo('body');
					a[0].click();
					a.remove();
				}).on('click', '.pb-viewer__control_close', function(){
					$('.picture-box').fadeOut(200);
					$('html').removeClass('pb-view');
				}).on('click', '.pb-viewer__control', function(e){
					e.stopPropagation();
					var lngth = $('.pb-thumbs__list .pb-thumbs__link').length,
						ind = $('.pb-thumbs__list .pb-thumbs__link.active').index('.pb-thumbs__list .pb-thumbs__link'),
						j;
					if ( $(this).hasClass('pb-viewer__control_prev') ){
						j = ((ind - 1) >= 0) ? (ind - 1) : lngth - 1;
					} else {
						j = (ind + 1) % lngth;
					}
					$('.pb-thumbs__item').eq(j).find('.pb-thumbs__link').click();
				});

				$(window).resize(function(){
					if ( $('.picture-box').size() ){
						app.pictureBox.dim();
					}
				});

			},
			dim: function(){
				var $w = $(window).width(),
					$h = $(window).height(),
					$pb = $('.picture-box'),
					$pbmh = $pb.find('.pb-viewer__head'),
					$pbmf = $pb.find('.pb-thumbs'),
					$pbm = $pb.find('.pb-viewer__img img');

				$pbm.css({
					'max-width': $w + 'px',
					'max-height': $h - $pbmh.height() - $pbmf.height() + 'px'
				})
			},
			printImg: function(src){
				pwin = window.open(src, "_blank");
				pwin.onload = function () {
					window.print();
					pwin.close();
				}
			}
		},
		fixmenu: function(){
			var $nav = $('.nav');

			if ( $nav.size() ){

				var nt = $nav.position().top;

				var $head = $('.header');
				var ht = $head.position().top;

				var wt = $(window).scrollTop();

				if ( nt+18 <= wt + $head.outerHeight() ){
					$nav.addClass('fixed');
				} else {
					$nav.removeClass('fixed');
				}

				if ( ht+18 <= wt ){
					$head.addClass('fixed');
				} else {
					$head.removeClass('fixed');
				}
				/*
				var frontSearch = $('.wrapper_front .header-search');
				var frontSearchBig = $('.section_search__finder');

				if ( frontSearch.size() && frontSearchBig.size() ){
					var ft = frontSearchBig.position().top;

					if ( ft <= wt - frontSearchBig.outerHeight() ){
						frontSearch.css({display: 'inline-block'});
					} else {
						frontSearch.css({display: 'none'});
					}
				}*/
			}

		},
		keypad: {
			status: {
				oneShift: false
			},
			init: function(){

				var $keybordWrap = $('.keypad-wrap');

				$('.js-input-notepad').click(function(){

					var $this = $(this);
					var $input = $this.closest('.js-input-wrap').find('.js-input-targ');

					if ( $('.js-input-targ-active').size() && !$input.hasClass('js-input-targ-active') ){
						$('.js-input-targ-active').removeClass('js-input-targ-active');
						$input.addClass('js-input-targ-active').focus();
					} else if ( $keybordWrap.hasClass('keypad-wrap_show') ){
						$keybordWrap.removeClass('keypad-wrap_show');
						$input.removeClass('js-input-targ-active');
					} else {
						$keybordWrap.addClass('keypad-wrap_show');
						$input.addClass('js-input-targ-active').focus();
					}

				});
				$('body').on('click', '.keypad-close', function(){
					$keybordWrap.removeClass('keypad-wrap_show');
					$('.js-input-targ-active').removeClass('js-input-targ-active');
				}).on('click', '.keypad .key', function(e){

					if ( app.keypad.status.oneShift || $(this).data('key')!== 'shift' ){
						app.keypad.status.oneShift = false;
						$keybordWrap.removeClass('keypad-wrap_oneshift');
						//console.log(app.keypad.status.oneShift)
						//console.log($(this).data('key'))
					}

					if ( $(this).data('key') ){
						var v = $(this).data('key');
						app.keypad.btnPush[v]();
					} else {
						var nWord = $(this).text();
						var $input = $('.js-input-targ-active');
						var text = $input.val();
						$input.val(text + nWord);
					}

				});
			},
			btnPush: {
				clear:function(){
					var $keybordWrap = $('.keypad-wrap');
					$keybordWrap.removeClass('keypad-wrap_shift keypad-wrap_oneshift keypad-wrap_symbol');
				},
				backspace: function(){
					var $input = $('.js-input-targ-active');
					var val = $input.val();
					$input.val(val.substring(0, val.length - 1))
				},
				multishift: function(){
					var $keybordWrap = $('.keypad-wrap');
					$keybordWrap.removeClass('keypad-wrap_oneshift keypad-wrap_symbol');
					$keybordWrap.toggleClass('keypad-wrap_shift')
				},
				enter: function(){},
				shift: function(){

				//	console.log(app.keypad.status.oneShift);

					var $keybordWrap = $('.keypad-wrap');
					$keybordWrap.removeClass('keypad-wrap_shift keypad-wrap_symbol');
					$keybordWrap.toggleClass('keypad-wrap_oneshift');

					if ( $keybordWrap.hasClass('keypad-wrap_shift') ){
						$keybordWrap.removeClass('keypad-wrap_shift')
					}

				},
				language: function(){
					var $keybordWrap = $('.keypad-wrap');
					$keybordWrap.toggleClass('keypad-wrap_rus keypad-wrap_eng')
				},
				space: function(){
					var $input = $('.js-input-targ-active');
					var val = $input.val();
					$input.val(val + ' ');
				},
				symbols: function(){
					var $keybordWrap = $('.keypad-wrap');

					$keybordWrap.removeClass('keypad-wrap_shift keypad-wrap_oneshift');
					$keybordWrap.toggleClass('keypad-wrap_symbol')
				}
			}
		},
		inputRateCheck: function(){
			var $box = $('.feedback-field__input-rate');
			if ( $box.size() ){
				$box.each(function(){
					var $this = $(this);
					var $status = $this.next('.feedback-field__input-rate-status');
					var $inpt = $this.find('input').filter(':checked');

					$status.text($inpt.data('rate-status') + ' ' + $inpt.data('rate-name'));
				});
			}
		},
		loadStatCity: function(){
			var $screen = $('.section_stat');

			if ( $screen.size() && !$screen.hasClass('stat-loaded') ){

				var st = $(window).scrollTop();
				var sh = $(window).height();
				var t = $screen.offset().top;

				if ( st >= t - sh/4 ){
					$screen.addClass('stat-loaded');
					$('.pie-diagram').loadStatCity();
				}
			}
		},
		checkboxCheck: function(){
			$('.js-checkbox-list-obj').each(function(){
				var $box = $(this).closest('.section_search__tabs-screen');
				var $res = $box.find('.js-checkbox-list-result');
				var $input = $box.find('input');

				var text = '';
				var sum = 0;

				for ( var i = 0; i < $input.length; i++ ){
					if ( $input.eq(i).is(':checked') ){
						text += ' <span class="result-item"><i class="result-item__remove"></i>' + $input.eq(i).val() + '</span>';
						sum++;
					}
				}
				text = sum > 0 ? '<div class="result"><span class="result-title">Выбранные виды спорта:</span>' + text + '</div>' : '';

				$res.html(text);
			});
		},
		datepicker: function(){

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

				$('.input-daterange').each(function(){
					$(this).datepicker();
				});

			}

		},
		tooltip:function(){

			$('body').on('click', '.tooltip', function(e){

				e.stopPropagation();
				e.preventDefault();

				var $this = $(this);
				var tooltip = {
					title: $this.data('tooltip-title'),
					text: $this.data('tooltip-text'),
					link: $this.data('tooltip-link')
				};
				var title = tooltip.title ? '<div class="tooltip-popup__title">' + tooltip.title + '</div>' : '';
				var text = tooltip.text ? '<div class="tooltip-popup__text">' + tooltip.text + '</div>' : '';
				var link = tooltip.link ? '<div class="tooltip-popup__more"><a href="' + tooltip.link + '">подробнее</a></div>' : '';

				var top = $this.offset().top;
				var left = $this.offset().left;

				$('<div class="tooltip-popup">' +
				title +
				text +
				link +
				'<div class="tooltip-popup__close"></div>' +
				'</div>').appendTo('body').css({top: top + 'px', left: left + 'px'}).show();

			}).on('click', '.tooltip-popup__close', function(){
				$(this).parents('.tooltip-popup').remove();
			}).on('click', function(e){
				if ( $('.tooltip-popup').size() ){
					var target = e && e.target || event.srcElement;
					if ( $(target).closest('.tooltip-popup').length ) return;

					$('.tooltip-popup').remove();

				}
			});

		},
		init: function(){

			this.auth.init();
			this.datepicker();
			this.loadStatCity();
			this.fixmenu();
			this.tooltip();
			this.keypad.init();
			this.checkboxCheck();
			this.inputRateCheck();
			this.pictureBox.init();
			this.calculator.init();

			$('.feedback-field__input-rate').on('change', 'input', app.inputRateCheck);

			if ( $('.pie-diagram').size() ){
				$('.pie-diagram').strokeStatCity();
			}

			$(window).scroll(function(){
				app.loadStatCity();
				app.fixmenu();
			});
			$('.js-checkbox-list-obj').on('change', 'input', app.checkboxCheck);
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

function checkSearchResult(inpt){
	var wrap = inpt.closest('.js-input-wrap');
	var resWrp = wrap.find('.result-wrap');
	var resInr = wrap.find('.result-wrap__inner');

	if ( resWrp.size() && ( resWrp.height() < resInr.height() ) ){
		resWrp.mCustomScrollbar();
	} else if ( resWrp.size() && ( resWrp.height() >= resInr.height() ) ){
		resWrp.mCustomScrollbar("destroy");
	}
}

$(function(){

	$('.js-input-targ').on('keyup change blur', function(){
		checkSearchResult($(this));
	});

	$('[data-modal-open]').click(function(e){
		e.preventDefault();
		var $this = $(this);
		var data = $this.data('modal-open');

		modalOpen(data);

	});
	$('.modal-overlay').click(function(e){
		e.stopPropagation();

		$(this).fadeOut();
		$('.modal').fadeOut();
		/*if ( $(e.target).hasClass('modal-overlay') ){
			$(this).fadeOut();
		}*/
	});
	$('.js-modal-close').click(function(e){
		e.stopPropagation();
		$('.modal-overlay').fadeOut();
		$('.modal').fadeOut();
	});


	$('.js-scrollbar').mCustomScrollbar();

	$('select').each(function(){
		$(this).selectbox();
	});

	if ( $('.head-carousel').size() ){
		$('.head-carousel').flexslider({
			animation: "fade",
			randomize: true,
			directionNav: false,
			keyboard: false
		});
	}

	if ( $('.news-carousel').size() ){
		$('.news-carousel').flexslider({
			animation: "fade",
			randomize: false,
			directionNav: true,
			keyboard: false
		});
	}




	$('.tab__menu-item').click(function(e){


		if ( !$(this).hasClass('tab__menu-item_active') && !$(this).hasClass('disabled')) {

			var ind = $(this).index(),
				$link = $('.tab__menu-item'),
				$tab = $('.tab__screen-item');

			$('.tab__menu-item_active').removeClass('tab__menu-item_active');
			$link.eq(ind).addClass('tab__menu-item_active');

			$('.tab__screen-item_active').removeClass('tab__screen-item_active');
			$tab.eq(ind).addClass('tab__screen-item_active');
		}
	});

	$('.header-location').click(function(){

		$('html,body').animate({scrollTop: 0 }, 500);

		var $box = $('.section-location');

		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$box.stop().slideUp();
			$('.js-stat-city').removeClass('active');
			$('.section_stat-location').hide();
		} else {
			$(this).addClass('active');
			$box.stop().slideDown();
		}

	});

	$('.js-close-location-screen').click(function(){


		$('html,body').animate({scrollTop: 0 }, 500);

		if ( $('.header-location').hasClass('active') ) $('.header-location').removeClass('active');
		$('.section-location').stop().slideUp();
	});

	$('.js-stat-city').click(function(){
		var t = $(this).offset().top + $(this).outerHeight();
		var $box = $('.section_stat-location');
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$box.stop().fadeOut();
		} else {
			$(this).addClass('active');$box.css({top: t - 1 + 'px'}).slideDown();
		}
	});

	$('.js-close-stat-location-screen').click(function(){
		if ( $('.js-stat-city').hasClass('active') ) $('.js-stat-city').removeClass('active');
		$('.section_stat-location').stop().slideUp();
	});

	$('.section_search__tabs-menu__item').click(function(){
		if ( !$(this).hasClass('active') && !$(this).hasClass('disabled') ){
			var i = $(this).data('tabs-menu');
			$('.section_search__tabs-menu__item').filter('.active').removeClass('active');
			$(this).addClass('active');
			$('.section_search__tabs-menu__target').filter('.active').removeClass('active');
			$('[data-tabs-target="'+i+'"]').addClass('active');
			$('.section_search__tabs-field__item').filter('.active').removeClass('active');
			$('.section_search__tabs-screen__item').filter('.active').removeClass('active');

			$('.section_search .section-bg_item').filter('.active').removeClass('active');
			$('[data-bg="'+i+'"]').addClass('active');
		}
	});

	$('.section_search__tabs-field__item[data-subj]').click(function(){
		var $this = $(this);
		var i = $this.data('subj');

		if ( !$this.hasClass('active') ){
			var $subj = $this.parent().parent().find('[data-obj="'+i+'"]');

			if ($this.hasClass('narrow')){
				var l = $this.position().left;
				var w = $this.innerWidth();

				$subj.css({
					width: w + 'px',
					height: 'auto',
					marginLeft: l + 'px'
				});

			}

			$('.section_search__tabs-field__item').removeClass('active');
			$this.parent().parent().find('[data-obj]').filter('.active').removeClass('active');
			$this.addClass('active');
			$subj.addClass('active');
		} else {
			$this.removeClass('active').parent().parent().find('[data-obj="'+i+'"]').removeClass('active');
		}
	});


	$('.js-search-examp').click(function(e){
		e.preventDefault();
		$(this).closest('.js-search').find('.js-input-targ').val($(this).text())
	});
	$('.js-input-clear').click(function(e){
		e.preventDefault();
		$(this).closest('.js-input-wrap').find('.js-input-targ').val('');
	});
	$('.js-input-showpass').on('mousedown', function(e){
		e.preventDefault();
		$(this).closest('.js-input-wrap').find('.js-input-targ').attr('type', 'text');
	}).on('mouseup', function(e){
		e.preventDefault();
		$(this).closest('.js-input-wrap').find('.js-input-targ').attr('type', 'password');
	});



	$('[data-profile-menu]').click(function(e){
		e.preventDefault();
		var k = $(this).data('profile-menu');

		if ( $(this).hasClass('active') ){
			$(this).add('[data-profile-popup="' + k + '"]').removeClass('active');
		} else {
			$(this).siblings('[data-profile-menu]').add('[data-profile-popup]').removeClass('active');
			$(this).add('[data-profile-popup="' + k + '"]').addClass('active');
		}
	});



	$('.js-remove-all-messages').click(function(e){
		e.preventDefault();
		$('.header-user .btn_message .btn__number').fadeOut(400, function(){$(this).remove();});
		$(this).parents('.header-popup').addClass('clean').find('.header-popup__content').html('<div class="no-mes">Непрочитанных сообщений нет</div>');
		$(this).remove();
		$('.tooltip-hint').hide();
	});

	$('.js-remove-all-notifications').click(function(e){
		e.preventDefault();
		$('.header-user .btn_notification .btn__number').fadeOut(400, function(){$(this).remove();});
		$(this).closest('.header-popup').addClass('clean').find('.header-popup__content').html('<div class="no-mes">Оповещений нет</div>');
		$(this).remove();
		$('.tooltip-hint').hide();
	});

	$('.header-popup__close').click(function(){
		var $this = $(this);
		var $wrap = $this.closest('.header-popup');
		var ind = $wrap.data('profile-popup');
		$('[data-profile-menu=' + ind + ']').click();
	});

	$('body')
		.on('click', '.js-popup-city-confirm', function(){ $(this).closest('.header-popup').hide(); })
		.on('click', '.js-popup-city-choose', function(){ $('.js-location-current').click(); $(this).closest('.header-popup').hide(); })
		.on('click', '.header-popup_city .header-popup__close', function(){ $(this).closest('.header-popup').hide(); });




	$('body').on('click', '.result-item__remove', function(){
		var $this = $(this);
		var $item = $this.parents('.result-item');
		var val = $item.text();
		var $box = $this.parents('.js-checkbox-list-result').siblings('.js-checkbox-list-obj');
		$box.find('input[value="'+ val +'"]').prop('checked', false);
		$item.remove();
	});

	$('.tabs-field_head__btns-item_close .btn_close').click(function(){
		$('.section_search__tabs-field__item').filter('.active').removeClass('active');
		$('.section_search__tabs-screen__item').filter('.active').removeClass('active');
	});


	$('.catalog-item').hover(function(){
		$(this).addClass('infocus');
	}, function(){
		$(this).removeClass('infocus');
	});

	$('body').on('click', '.tabs-field_list__arrowborder [data-targ]', function(e){
		e.preventDefault();
		var $t = $(this);
		var ind = $t.data('targ');
		var $wrap = $t.closest('.tabs-field_body');

		if ( !$t.hasClass('active') ){
			$t.addClass('active').siblings().filter('.active').removeClass('active');
			$wrap.find('[data-obj='+ ind +']').addClass('active').siblings().filter('.active').removeClass('active');
		}
	}).on('click', '.catalog-item .menu-item', function(e){
		e.preventDefault();

		var $t = $(this);
		var i = $t.index();
		var $box = $t.closest('.catalog-item');
		var $wrap = $t.closest('.section_catalog');
		var $item = $t.closest('.catalog-item');

		if ( $box.hasClass('active') ){
			if ( $t.hasClass('active') ){
				$t.removeClass('active');
				$box.removeClass('active').find('.details-item').filter('.active').removeClass('active');
			} else {
				$box.find('.details-item').filter('.active').removeClass('active');
				$box.find('.menu-item').filter('.active').removeClass('active');
				$t.addClass('active');
				$box.find('.details-item').eq(i).addClass('active');
			}
		} else {
			$t.addClass('active');
			$box.addClass('active');
			$box.find('.details-item').eq(i).addClass('active');

			if ($wrap.hasClass('list-view')) $('html,body').animate({scrollTop:$box.offset().top - 10}, 400);
		}

		if ( $item.find('.details-item.active').find('.details-item__slider').length ){
			setTimeout(function(){
				$item.find('.details-item__slider').flexslider({
					animation: "slide",
					animationLoop: false,
					itemWidth: 186,
					itemMargin: 5,
					controlNav: false,
					directionNav: true,
					slideshow: false,
					move: 1
				});
			}, 0);
		}

	}).on('click', '.catalog-info .menu-item', function(e){
		e.preventDefault();

		var $t = $(this);
		var i = $t.index();
		var $box = $t.closest('.catalog-info');

		if ( !$t.hasClass('active') ){
			$box.find('.menu-item').filter('.active').removeClass('active');
			$t.addClass('active');
			$box.find('.details-item').filter('.active').removeClass('active');
			$box.find('.details-item').eq(i).addClass('active');
		}

	}).on('click', '.catalog-item__fix', function(e){
		e.preventDefault();
		var $t = $(this);
		var $box = $t.closest('.catalog-item');

		/*if ( $box.hasClass('infixed') ){
			$box.removeClass('infixed');
		} else {
			$box.addClass('infixed');
		}*/

		$box.removeClass('active infocus').find('.menu-item ').filter('.active').removeClass('active');
		$box.find('.details-item').filter('.active').removeClass('active');

	}).on('click', '.catalog-details__close .btn', function(e){
		e.preventDefault();
		var $t = $(this);
		var $box = $t.closest('.catalog-item');
		$box.removeClass('active').find('.menu-item ').filter('.active').removeClass('active');
		$box.find('.details-item').filter('.active').removeClass('active');
	}).on('click', '.section__nav-field_btns .btn', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.section_catalog');

		if ( !$t.hasClass('active')){

			$t.addClass('active').siblings('.btn').filter('.active').removeClass('active');

			if ($t.hasClass('js-show-table-view') ){
				$wrap.removeClass('list-view map-view')
					.addClass('table-view')
					.find('.catalog__body').css('height', 'auto').find('.aside_right').css('height', 'auto').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-list-view') ){
				$wrap.removeClass('table-view map-view')
					.addClass('list-view')
					.find('.catalog__body').css('height', 'auto').find('.aside_right').css('height', 'auto').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-map-view') ){
				var h = $(window).height() - $wrap.find('.catalog__header').outerHeight();
				$wrap.removeClass('list-view table-view')
					.addClass('map-view')
					.find('.catalog__body')
					.height(h - 50)
					.find('.aside_right').height(h-120).mCustomScrollbar();

				$('html,body').animate({scrollTop:$wrap.find('.catalog__body').offset().top - 120}, 400)
			}
		}
	}).on('click', '.aside_right .filter-head', function(e){
		e.preventDefault();
		var $t = $(this);
		var $wrap = $t.closest('.filter-item');
		var $box = $wrap.find('.filter-body');

		if ( !$wrap.hasClass('opened') ){
			$box.stop(true, true).slideDown(200);
			$wrap.addClass('opened');

		} else {
			$box.stop(true, true).slideUp(200);
			$wrap.removeClass('opened')
		}
	}).on('click', '.slide-box__head', function(){
		var $this = $(this);
		$this.parent().toggleClass('closed');

		$slider = $this.next('.slide-box__body').find('.slide-box__slider');

		if ( $slider.length ){
			setTimeout(function(){
				$slider.flexslider({
					animation: "slide",
					animationLoop: false,
					itemWidth: 250,
					itemMargin: 20,
					controlNav: false,
					directionNav: true,
					slideshow: false,
					move: 1
				});
			}, 0);
		}

	}).on('click', '.js-leave-feedback', function(){
		$(this).closest('.feedback').find('.feedback-leave').hide().next('.feedback-item_send').show();
	}).on('click', '.js-leave-feedback-send-close', function(){
		$(this).closest('.feedback').find('.feedback-leave').show().next('.feedback-item_send').hide();
	}).on('click', '.js-show-full-feedback', function(e){
		e.preventDefault();
		$(this).closest('.feedback-item_compact').removeClass('feedback-item_compact');
	}).on('click', '.comments-menu__item', function(){
		var $this = $(this);
		var ind = $this.index();
		var $wrap = $this.closest('.comments');
		if ( !$this.hasClass('active') ){
			$wrap.find('.comments-menu__item').removeClass('active').eq(ind).addClass('active');
			$wrap.find('.comments-tab__item').removeClass('active').eq(ind).addClass('active');
		}
	}).on('click', '.link-review-answer', function(){
		var $this = $(this);
		$this.parent().next('.review-answer').stop(true, true).slideToggle();
	}).on('click', '.review-answers-wrap .on_switch', function(){
		var $this = $(this);
		$this.parent('.review-answers-wrap').find('.review-answers-wrap__inner').slideToggle('fast', function(){
			$this.parent('.review-answers-wrap').toggleClass('closed opened')
		});


	}).on('click', '.details-item__text_cover-open', function(){
		var $this = $(this);
		$this.parent('.details-item__text_cover').removeClass('details-item__text_cover');
	}).on('click', '.aside_right__label', function(){
		var $this = $(this);
		$this.closest('.aside_right').toggleClass('aside_right_show');
	});

	function convertVal(val) {
		var hours = parseInt(val / 60);
		var minutes = val % 60;
		var days = parseInt(minutes / 60);
		hours = hours % 60;
		if(String(hours).length != 2) hours = "0" + hours;
		if(String(minutes).length != 2) minutes = "0" + minutes;
		if( days == 0 ) { return hours + ":" + minutes; }
		return days + ":" + hours + ":" + minutes;
	}



	if ( $('.details-item__slider').length ){
		$('.details-item__slider').each(function(){
			var $this = $(this);
			if ( $this.closest('.details-item').hasClass('active')){

				setTimeout(function(){
					$this.flexslider({
						animation: "slide",
						animationLoop: false,
						itemWidth: 186,
						itemMargin: 5,
						controlNav: false,
						directionNav: true,
						slideshow: false,
						move: 1
					});
				}, 0);
			}
		});
	}

	$('.slider-line').each(function(){

		var $this = $(this);
		var $wrap = $this.closest('.filter-field_slider');

		var time = $this.hasClass('slider-time') ? true : false;

		var rangeMin = $this.data('range-min'),
			rangeMax = $this.data('range-max'),
			valMin = $this.data('val-min') || rangeMin,
			valMax = $this.data('val-max') || rangeMax,
			$inputFrom = $wrap.find('.i-from'),
			$inputTo = $wrap.find('.i-to');

		$inputFrom.val(convertValToTime(valMin, time));
		$inputTo.val(convertValToTime(valMax, time));

		$this.slider({
			min: rangeMin,
			max: rangeMax,
			values: [valMin, valMax],
			range: true,
			create: function(event, ui){
				$this.find('.ui-slider-handle').eq(0).addClass('handle-start').find('.ui-slider-handle__val').text(convertValToTime(valMin, time));
				$this.find('.ui-slider-handle').eq(1).addClass('handle-end').find('.ui-slider-handle__val').text(convertValToTime(valMax, time));
				$this.find('.slider-line__min').text(convertValToTime(rangeMin, time));
				$this.find('.slider-line__max').text(convertValToTime(rangeMax, time));
				console.info('1')
			},
			slide: function(event, ui){
				$inputFrom.val(convertValToTime($this.slider('values', 0), time));
				$inputTo.val(convertValToTime($this.slider('values', 1), time));
				$this.find('.handle-start').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 0), time));
				$this.find('.handle-end').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 1), time));
				console.info('2')
			},
			stop: function(event, ui) {
				$inputFrom.val(convertValToTime($this.slider('values', 0), time));
				$inputTo.val(convertValToTime($this.slider('values', 1), time));
				$this.find('.handle-start').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 0), time));
				$this.find('.handle-end').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 1), time));
				console.info('3')
			}
		});

	});

	$('body').on('click', '.section__nav-field_filter .btn', function(){

		var $this = $(this);
		var $popup = $this.parent().next('.section__nav-field_filter-popup').find('.section_search__tabs-screen__item')

		if ( $this.hasClass('active') ){
			$this.removeClass('active');
			$popup.removeClass('active');

		} else {
			$this.addClass('active');
			$popup.addClass('active');
		}

	});



/*tabs*/

	$('.js-tabs-wrap').on('click', '[data-tab-item]', function(e){
		e.preventDefault();
		var $t = $(this),
			$w = $t.closest('.js-tabs-wrap'),
			$item = $t.data('tab-group') ? $w.find('[data-tab-group]').filter('.active') : $w.find('[data-tab-item]'),
			$box = $w.find('[data-tab-box]'),
			ind = $t.data('tab-item'),
			$box_targ = $w.find('[data-tab-box=' + ind + ']');

		if ( $t.data('tab-group') ){
			$item.removeClass('active');
		} else {
			$item.filter('.active').removeClass('active');
			$box.filter('.active').removeClass('active');
		}
		$t.addClass('active');
		$box_targ.addClass('active');
	});



	$('.filter-field_slider input').on('change',function(){

		var $this = $(this);

		if ( $this.val().match(/[^0-9]/g) ) {
			var _newVal = $this.val().replace(/[^0-9]/g, '');
			$this.val(_newVal);
		}

		var $wrap = $this.closest('.filter-field_slider');
		var $slider = $wrap.find('.slider-line');

		var time = $slider.hasClass('slider-time') ? true : false;

		var max = $slider.data('range-max');

		var iMin = $wrap.find('.i-from');
		var iMax = $wrap.find('.i-to');

		var val1 = iMin.val();
		var val2 = iMax.val();

		if ( $this.hasClass('i-from') ){
			if(parseInt(val1) > parseInt(val2)){
				val1 = val2;
				iMin.val(val1);
			}
			$slider.slider('values', 0, val1);
			$slider.find('.handle-start i').text(val1);

		} else if ( $this.hasClass('i-to') ){
			if (val2 > max) {
				val2 = max;
				iMax.val(max);
			}

			if(parseInt(val1) > parseInt(val2)){
				val2 = val1;
				iMax.val(val2);
			}

			$slider.slider('values', 1, val2);
			$slider.find('.handle-end i').text(val2);
		}
	}).on('click', function(){
		$(this).select();
		$(this).data('num', $(this).val());
	}).on('keyup input', function(e) {
		if ( $(this).val().match(/[^0-9]/g) ) {
			var _newVal = $(this).val().replace(/[^0-9]/g, '');
			$(this).val(_newVal);
		}

		if (e.keyCode == 13){ $(this).blur(); }
		if (e.keyCode == 27){
			$(this).val($(this).data('num'));
			$(this).blur();
		}

	}).on('keyup', function(e) {

	}).on('keydown', function(e) {
		var v = +$(this).val() || 0, num;
		if (e.keyCode ==  107 || e.keyCode ==  61 || e.keyCode ==  38 || e.keyCode ==  39){
			num = (v+1) > 0 ? v+1 : 0;
			$(this).val(num);
		}
		if (e.keyCode ==  109 || e.keyCode ==  173 || e.keyCode ==  37 || e.keyCode ==  40){
			num = (v-1) > 0 ? v-1 : 0;
			$(this).val(num);
		}
		$(this).trigger('change');
	}).on('focusout', function(e) {
		if ( !$(this).val() ) {
			$(this).val('0');
		}
	}).on('change', function() {
		if ( !$(this).val() ) {
			$(this).val('0');
		}
	});

	function convertValToTime(val, t) {
		if ( !t ) return val;
		var hours = parseInt(val / 60);
		var minutes = val % 60;
		var days = parseInt(minutes / 60);
		hours = hours % 60;
		if(String(hours).length != 2) hours = "0" + hours;
		if(String(minutes).length != 2) minutes = "0" + minutes;
		if( days == 0 ) { return hours + ":" + minutes; }
		return days + ":" + hours + ":" + minutes;
	}

	function convertTimeToVal(val, t) {
		if ( !t ) return val;
		var r = /\d\d/g;
		return ( parseInt(val.match(r)[0]) * 60 ) + parseInt(val.match(r)[1]);
	}



});






$(function(){

	$('body').on('mouseenter', '[data-hint]', function(e){
		var text = $(this).data('hint');
		var $hint = $('.tooltip-hint');

		if ( !$hint.size() ){
			$hint = $('<div class="tooltip-hint"></div>').appendTo('body');
		}

		$hint.html(text).show().css({
			top: $(e.target).offset().top + $(e.target).outerHeight() + 10,
			left: $(e.target).offset().left + $(e.target).outerWidth()/2,
			marginLeft: - $hint.outerWidth()/2
		});

	}).on('mouseleave mouseout', '[data-hint]', function(){
		$('.tooltip-hint').hide();
	}).on('click', '.filter-field__search-submit', function(e){
		e.stopPropagation();
		$(this).closest('.header-search_compact').removeClass('header-search_compact');
		return false;
	}).on('click', function(e){
		$('.tooltip-hint').hide();
	});


	$('.js-height-label-obj').each(function(){
		var $t = $(this),
			$tatg = $('.js-height-label-targ'),
			top = $tatg.offset().top,
			h = top - $t.offset().top;
		$t.height(h);
	});

	$('body').keydown(function(e){

		var $modal = $('.modal_info-typoerror');

		if (e.ctrlKey && e.keyCode == 13 && $modal.size() && $modal.is(':hidden') ) {
			modalOpen('mes-typoerror');
			$modal.find('.message').text('...' + selectedText() + '...');
		}
	});

});

function selectedText(){
	var txt;

	if(window.getSelection) {txt = window.getSelection().toString();}
	else if(document.getSelection) {txt = document.getSelection();}
	else if(document.selection) {txt = document.selection.createRange().text;}

	return txt;
}

function modalOpen(data){
	var $targ = $('[data-modal-target=' + data + ']');
	var wh = $(window).height();
	var ws = $(window).scrollTop();

	$targ.add('.modal-overlay').fadeIn();
	$targ.css({top: ( (wh > $targ.outerHeight()) ? (wh - $targ.outerHeight())/2 + ws : 0)});
}

$(function(){
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
