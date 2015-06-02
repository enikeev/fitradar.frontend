(function(){
	var app = {
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
						$(this).val(valDay + '.' + valMonth + '.' + valYear );
					}
				});

				$('.section_search__tabs-menu__target').each(function(){
					if ( $(this).find('.input-daterange').size() ){
						$(this).find('.input-daterange').datepicker();
					}
				});
			}
		},
		tooltip:function(){

			$('body').on('click', '.tooltip', function(){

				var $this = $(this);
				var tooltip = {
					title: $this.data('tooltip-title'),
					text: $this.data('tooltip-text'),
					link: $this.data('tooltip-link')
				};
				var top = $this.offset().top;
				var left = $this.offset().left;

				$('<div class="tooltip-popup">' +
				'<div class="tooltip-popup__title">' + tooltip.title + '</div>' +
				'<div class="tooltip-popup__text">' + tooltip.text + '</div>' +
				'<div class="tooltip-popup__more"><a href="' + tooltip.link + '">подробнее</a></div>' +
				'<div class="tooltip-popup__close"></div>' +
				'</div>').appendTo('body').css({top: top + 'px', left: left + 'px'}).show();

			});

			$('body').on('click', '.tooltip-popup__close', function(){
				$(this).parents('.tooltip-popup').remove();
			});

		},
		init: function(){

			this.datepicker();
			this.loadStatCity();
			this.tooltip();
			this.checkboxCheck();


			$('.pie-diagram').strokeStatCity();
			$(window).scroll(function(){
				app.loadStatCity();
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
		setTimeout(appLoad, 0);
	}, 50);

})();

$(function(){
	$('.js-scrollbar').mCustomScrollbar();

	$('.tab__menu-item').click(function(e){

		if ( !$(this).hasClass('tab__menu-item_active') ){
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
		if ( !$(this).hasClass('active')){
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


	$('.js-search-examp').click(function(){
		$(this).parents('.js-search').find('.js-search-targ').val($(this).text())
	});
	$('.js-search-clear').click(function(){
		$(this).parents('.js-search').find('.js-search-targ').val('');
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
	});

	$('.js-remove-all-notifications').click(function(e){
		e.preventDefault();
		$('.header-user .btn_notification .btn__number').fadeOut(400, function(){$(this).remove();});
		$(this).closest('.header-popup').addClass('clean').find('.header-popup__content').html('<div class="no-mes">Оповещений нет</div>');
		$(this).remove();
	});


	$('.js-checkbox-list-obj').on('change', 'input', app.checkboxCheck);

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
	})


});

