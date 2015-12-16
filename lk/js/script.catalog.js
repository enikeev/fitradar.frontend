(function(){
	var app = {

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

			this.tooltip();

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
					.find('.catalog__body').css('height', 'auto').find('.aside_left').css('height', 'auto').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-list-view') ){
				$wrap.removeClass('table-view map-view')
					.addClass('list-view')
					.find('.catalog__body').css('height', 'auto').find('.aside_left').css('height', 'auto').mCustomScrollbar("destroy");
			} else if ($t.hasClass('js-show-map-view') ){
				var h = $(window).height() - $wrap.find('.catalog__header').outerHeight();
				$wrap.removeClass('list-view table-view')
					.addClass('map-view')
					.find('.catalog__body')
					.height(h - 50)
					.find('.aside_left').height(h-120).mCustomScrollbar();

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




function modalOpen(data){
	var $targ = $('[data-modal-target=' + data + ']');
	var wh = $(window).height();
	var ws = $(window).scrollTop();

	$targ.add('.modal-overlay').fadeIn();
	$targ.css({top: ( (wh > $targ.outerHeight()) ? (wh - $targ.outerHeight())/2 + ws : 0)});
}

