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

			this.datepicker();
			this.loadStatCity();
			this.tooltip();
			this.checkboxCheck();


			$('.pie-diagram').strokeStatCity();
			$(window).scroll(function(){
				app.loadStatCity();
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
		setTimeout(appLoad, 0);
	}, 50);

})();



$(function(){

	$('[data-modal-open]').click(function(){
		var targ = $(this).data('modal-open');
		$('[data-modal-target=' + targ + ']').fadeIn();
	});
	$('.modal-overlay').click(function(e){
		e.stopPropagation();
		if ( $(e.target).hasClass('modal-overlay') ){
			$(this).fadeOut();
		}
	});
	$('.modal-close').click(function(e){
		e.stopPropagation();
		$(this).closest('.modal-overlay').fadeOut();
	});

	$('.js-scrollbar').mCustomScrollbar();

	if ( $('select').size() ){
		$('select').selectbox();
	}

	if ( $('.head-carousel').size() ){
		$('.head-carousel').flexslider({
			animation: "fade",
			randomize: true,
			directionNav: false,
			keyboard: false
		});
	}




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

	$('.header-popup__close').click(function(){
		var $this = $(this);
		var $wrap = $this.closest('.header-popup');
		var ind = $wrap.data('profile-popup');
		$('[data-profile-menu=' + ind + ']').click();
	});

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

		if ( $item.find('.details-item__slider').length ){
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
		}



	}).on('click', '.catalog-item__fix', function(e){
		e.preventDefault();
		var $t = $(this);
		var $box = $t.closest('.catalog-item');

		if ( $box.hasClass('infixed') ){
			$box.removeClass('infixed');
		} else {
			$box.addClass('infixed');
		}

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
					.find('.catalog__body .aside_left').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-list-view') ){
				$wrap.removeClass('table-view map-view')
					.addClass('list-view')
					.find('.catalog__body .aside_left').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-map-view') ){
				var h = $(window).height();// - $wrap.find('.catalog__header').innerHeight();
				$wrap.removeClass('list-view table-view')
					.addClass('map-view')
					.find('.catalog__body')
					.height(h)
					.find('.aside_left').height(h-70).mCustomScrollbar();

				$('html,body').animate({scrollTop:$wrap.find('.catalog__body').offset().top}, 400)
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
		$(this).parent().toggleClass('closed');
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
			},
			slide: function(event, ui){
				$inputFrom.val(convertValToTime($this.slider('values', 0), time));
				$inputTo.val(convertValToTime($this.slider('values', 1), time));
				$this.find('.handle-start').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 0), time));
				$this.find('.handle-end').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 1), time));
			},
			stop: function(event, ui) {
				$inputFrom.val(convertValToTime($this.slider('values', 0), time));
				$inputTo.val(convertValToTime($this.slider('values', 1), time));
				$this.find('.handle-start').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 0), time));
				$this.find('.handle-end').find('.ui-slider-handle__val').text(convertValToTime($this.slider('values', 1), time));
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

