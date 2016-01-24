(function(){

	var keypad = {
		build: function(){
			var $kb = $('<div class="keypad-wrap keypad-wrap_rus"><div class="keypad-close"></div><div class="keypad-inner"><div class="keypad keypad_rus"><div class="key">ё</div><div class="key">1</div><div class="key">2</div><div class="key">3</div><div class="key">4</div><div class="key">5</div><div class="key">6</div><div class="key">7</div><div class="key">8</div><div class="key">9</div><div class="key">0</div><div class="key">-</div><div class="key">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key">й</div><div class="key">ц</div><div class="key">у</div><div class="key">к</div><div class="key">е</div><div class="key">н</div><div class="key">г</div><div class="key">ш</div><div class="key">щ</div><div class="key">з</div><div class="key">х</div><div class="key">ъ</div><div class="key">\</div><div class="key">«</div><div class="key key_multishift" data-key="multishift"></div><div class="key">ф</div><div class="key">ы</div><div class="key">в</div><div class="key">а</div><div class="key">п</div><div class="key">р</div><div class="key">о</div><div class="key">л</div><div class="key">д</div><div class="key">ж</div><div class="key">э</div><div class="key">!</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key">я</div><div class="key">ч</div><div class="key">с</div><div class="key">м</div><div class="key">и</div><div class="key">т</div><div class="key">ь</div><div class="key">б</div><div class="key">ю</div><div class="key">,</div><div class="key">.</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">English</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_rus-shift"><div class="key" data-key="">Ё</div><div class="key" data-key="">!</div><div class="key" data-key="">@</div><div class="key" data-key="">#</div><div class="key" data-key="">$</div><div class="key" data-key="">%</div><div class="key" data-key="">^</div><div class="key" data-key="">&</div><div class="key" data-key="">*</div><div class="key" data-key="">(</div><div class="key" data-key="">)</div><div class="key" data-key="">_</div><div class="key" data-key="">+</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">Й</div><div class="key" data-key="">Ц</div><div class="key" data-key="">У</div><div class="key" data-key="">К</div><div class="key" data-key="">Е</div><div class="key" data-key="">Н</div><div class="key" data-key="">Г</div><div class="key" data-key="">Ш</div><div class="key" data-key="">Щ</div><div class="key" data-key="">З</div><div class="key" data-key="">Х</div><div class="key" data-key="">Ъ</div><div class="key" data-key="">\</div><div class="key" data-key="">»</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">Ф</div><div class="key" data-key="">Ы</div><div class="key" data-key="">В</div><div class="key" data-key="">А</div><div class="key" data-key="">П</div><div class="key" data-key="">Р</div><div class="key" data-key="">О</div><div class="key" data-key="">Л</div><div class="key" data-key="">Д</div><div class="key" data-key="">Ж</div><div class="key" data-key="">Э</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">Я</div><div class="key" data-key="">Ч</div><div class="key" data-key="">С</div><div class="key" data-key="">М</div><div class="key" data-key="">И</div><div class="key" data-key="">Т</div><div class="key" data-key="">Ь</div><div class="key" data-key="">Б</div><div class="key" data-key="">Ю</div><div class="key" data-key="">;</div><div class="key" data-key="">:</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">English</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_eng"><div class="key" data-key="">`</div><div class="key" data-key="">1</div><div class="key" data-key="">2</div><div class="key" data-key="">3</div><div class="key" data-key="">4</div><div class="key" data-key="">5</div><div class="key" data-key="">6</div><div class="key" data-key="">7</div><div class="key" data-key="">8</div><div class="key" data-key="">9</div><div class="key" data-key="">0</div><div class="key" data-key="">-</div><div class="key" data-key="">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">q</div><div class="key" data-key="">w</div><div class="key" data-key="">e</div><div class="key" data-key="">r</div><div class="key" data-key="">t</div><div class="key" data-key="">y</div><div class="key" data-key="">u</div>				<div class="key" data-key="">i</div><div class="key" data-key="">o</div><div class="key" data-key="">p</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">\</div><div class="key" data-key="">"</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">a</div><div class="key" data-key="">s</div><div class="key" data-key="">d</div><div class="key" data-key="">f</div><div class="key" data-key="">g</div><div class="key" data-key="">h</div><div class="key" data-key="">j</div><div class="key" data-key="">k</div><div class="key" data-key="">l</div><div class="key" data-key="">;</div><div class="key" data-key="">\'</div><div class="key" data-key="">!</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">z</div><div class="key" data-key="">x</div><div class="key" data-key="">c</div><div class="key" data-key="">v</div><div class="key" data-key="">b</div><div class="key" data-key="">n</div><div class="key" data-key="">m</div><div class="key" data-key="">,</div><div class="key" data-key="">.</div><div class="key" data-key="">:</div><div class="key" data-key="">/</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">Русский</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div>			<div class="keypad keypad_eng-shift"><div class="key" data-key="">~</div><div class="key" data-key="">!</div><div class="key" data-key="">@</div><div class="key" data-key="">#</div><div class="key" data-key="">$</div><div class="key" data-key="">%</div><div class="key" data-key="">^</div><div class="key" data-key="">&</div><div class="key" data-key="">*</div><div class="key" data-key="">(</div><div class="key" data-key="">)</div><div class="key" data-key="">_</div><div class="key" data-key="">+</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">Q</div><div class="key" data-key="">W</div><div class="key" data-key="">E</div><div class="key" data-key="">R</div><div class="key" data-key="">T</div><div class="key" data-key="">Y</div><div class="key" data-key="">U</div><div class="key" data-key="">I</div><div class="key" data-key="">O</div><div class="key" data-key="">P</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">|</div><div class="key" data-key="">»</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">A</div><div class="key" data-key="">S</div><div class="key" data-key="">D</div><div class="key" data-key="">F</div><div class="key" data-key="">G</div><div class="key" data-key="">H</div><div class="key" data-key="">J</div><div class="key" data-key="">K</div><div class="key" data-key="">L</div><div class="key" data-key="">:</div><div class="key" data-key="">"</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">Z</div><div class="key" data-key="">X</div><div class="key" data-key="">C</div><div class="key" data-key="">V</div><div class="key" data-key="">B</div><div class="key" data-key="">N</div><div class="key" data-key="">M</div><div class="key" data-key=""><</div><div class="key" data-key="">></div><div class="key" data-key="">;</div><div class="key" data-key="">—</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">Русский</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_symbols"><div class="key" data-key="">°</div><div class="key" data-key="">±</div><div class="key" data-key="">¼</div><div class="key" data-key="">½</div><div class="key" data-key="">¾</div><div class="key" data-key="">¤</div><div class="key" data-key="">¬</div><div class="key" data-key="">²</div><div class="key" data-key="">³</div><div class="key" data-key="">¢</div><div class="key" data-key="">€</div><div class="key" data-key="">£</div><div class="key" data-key="">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">~</div><div class="key" data-key="">§</div><div class="key" data-key="">¶</div><div class="key" data-key="">:</div><div class="key" data-key="">;</div><div class="key" data-key=""></div><div class="key" data-key="">\'</div><div class="key" data-key="">"</div><div class="key" data-key="">«</div><div class="key" data-key="">»</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">{</div><div class="key" data-key="">}</div><div class="key key_multishift"></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key="">‘</div><div class="key" data-key="">’</div><div class="key" data-key="">„</div><div class="key" data-key="">“</div><div class="key" data-key="">”</div><div class="key" data-key=""></div><div class="key" data-key="">!</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left"></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""><</div><div class="key" data-key="">></div><div class="key" data-key="">–</div><div class="key" data-key="">—</div><div class="key" data-key="">\</div><div class="key" data-key="">|</div><div class="key" data-key="">/</div><div class="key key_shift right"></div><div class="key key_language"></div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div></div></div>');
			$('body').append($kb);
		},
		status: {
			oneShift: false,
			inited: false
		},
		init: function(){
		//	var that = this;
		//	console.info('init keypad');

			if ( !keypad.status.inited ){
				keypad.status.inited = true;
				keypad.build();
				var $keybordWrap = $('.keypad-wrap');
				$('body').on('click', '.js-input-notepad', function(){
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
				}).on('click', '.keypad-close', function(){
					$keybordWrap.removeClass('keypad-wrap_show');
					$('.js-input-targ-active').removeClass('js-input-targ-active');
				}).on('click', '.keypad .key', function(e){
					var $input = $('.js-input-targ-active');
					if ( keypad.status.oneShift || $(this).data('key')!== 'shift' ){
						keypad.status.oneShift = false;
						$keybordWrap.removeClass('keypad-wrap_oneshift');
					}
					if ( $(this).data('key') ){
						var v = $(this).data('key');
						keypad.btnPush[v]();
					} else {
						var nWord = $(this).text();
						var text = $input.val();
						$input.val(text + nWord);
					}
					$input.focus();
				}).on('mouseup', '.keypad .key', function(e){
					var $input = $('.js-input-targ-active');
					$input.focus();
					$input.trigger('change');
				}).on('mousedown', function(e){
					if ( $('.keypad-wrap_show').size() ){
						if ( $(e.target).closest('.keypad-wrap').length || $(e.target).closest('.js-input-wrap').length ){
							return;
						} else {
							$keybordWrap.removeClass('keypad-wrap_show');
							$(this).removeClass('js-input-targ-active');
						}
					}

					/*if ( $keybordWrap.hasClass('keypad-wrap_show') ){

					}*/
				});
			}
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
			shift: function(){
				var $keybordWrap = $('.keypad-wrap');
				$keybordWrap.removeClass('keypad-wrap_shift keypad-wrap_symbol');
				$keybordWrap.toggleClass('keypad-wrap_oneshift');
				if ( $keybordWrap.hasClass('keypad-wrap_shift') ){
					$keybordWrap.removeClass('keypad-wrap_shift');
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
				$keybordWrap.toggleClass('keypad-wrap_symbol');
			},
			enter: function(){
				var $input = $('.js-input-targ-active');
				var form = $input.closest('form');
				var val = $input.val();
				if ( $input.is('input') ){
					if ( form.length ) {
						form.submit();
					}
				} else {
					$input.val(val + '\n');
				}
			}
		}
	};

//	keypad.init();

	var keypadInt = setInterval(function(){

		if (typeof jQuery !== 'function' || typeof $ !== 'function') return;

		$(function(){ keypad.init(); });
		setTimeout(keypad.init, 0);
		clearInterval(keypadInt);
	}, 50);


})();

/*
function keyboard(){
	var $kb = $('<div class="keypad-wrap keypad-wrap_rus"><div class="keypad-close"></div><div class="keypad-inner"><div class="keypad keypad_rus"><div class="key">ё</div><div class="key">1</div><div class="key">2</div><div class="key">3</div><div class="key">4</div><div class="key">5</div><div class="key">6</div><div class="key">7</div><div class="key">8</div><div class="key">9</div><div class="key">0</div><div class="key">-</div><div class="key">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key">й</div><div class="key">ц</div><div class="key">у</div><div class="key">к</div><div class="key">е</div><div class="key">н</div><div class="key">г</div><div class="key">ш</div><div class="key">щ</div><div class="key">з</div><div class="key">х</div><div class="key">ъ</div><div class="key">\</div><div class="key">«</div><div class="key key_multishift" data-key="multishift"></div><div class="key">ф</div><div class="key">ы</div><div class="key">в</div><div class="key">а</div><div class="key">п</div><div class="key">р</div><div class="key">о</div><div class="key">л</div><div class="key">д</div><div class="key">ж</div><div class="key">э</div><div class="key">!</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key">я</div><div class="key">ч</div><div class="key">с</div><div class="key">м</div><div class="key">и</div><div class="key">т</div><div class="key">ь</div><div class="key">б</div><div class="key">ю</div><div class="key">,</div><div class="key">.</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">English</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_rus-shift"><div class="key" data-key="">Ё</div><div class="key" data-key="">!</div><div class="key" data-key="">@</div><div class="key" data-key="">#</div><div class="key" data-key="">$</div><div class="key" data-key="">%</div><div class="key" data-key="">^</div><div class="key" data-key="">&</div><div class="key" data-key="">*</div><div class="key" data-key="">(</div><div class="key" data-key="">)</div><div class="key" data-key="">_</div><div class="key" data-key="">+</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">Й</div><div class="key" data-key="">Ц</div><div class="key" data-key="">У</div><div class="key" data-key="">К</div><div class="key" data-key="">Е</div><div class="key" data-key="">Н</div><div class="key" data-key="">Г</div><div class="key" data-key="">Ш</div><div class="key" data-key="">Щ</div><div class="key" data-key="">З</div><div class="key" data-key="">Х</div><div class="key" data-key="">Ъ</div><div class="key" data-key="">\</div><div class="key" data-key="">»</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">Ф</div><div class="key" data-key="">Ы</div><div class="key" data-key="">В</div><div class="key" data-key="">А</div><div class="key" data-key="">П</div><div class="key" data-key="">Р</div><div class="key" data-key="">О</div><div class="key" data-key="">Л</div><div class="key" data-key="">Д</div><div class="key" data-key="">Ж</div><div class="key" data-key="">Э</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">Я</div><div class="key" data-key="">Ч</div><div class="key" data-key="">С</div><div class="key" data-key="">М</div><div class="key" data-key="">И</div><div class="key" data-key="">Т</div><div class="key" data-key="">Ь</div><div class="key" data-key="">Б</div><div class="key" data-key="">Ю</div><div class="key" data-key="">;</div><div class="key" data-key="">:</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">English</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_eng"><div class="key" data-key="">`</div><div class="key" data-key="">1</div><div class="key" data-key="">2</div><div class="key" data-key="">3</div><div class="key" data-key="">4</div><div class="key" data-key="">5</div><div class="key" data-key="">6</div><div class="key" data-key="">7</div><div class="key" data-key="">8</div><div class="key" data-key="">9</div><div class="key" data-key="">0</div><div class="key" data-key="">-</div><div class="key" data-key="">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">q</div><div class="key" data-key="">w</div><div class="key" data-key="">e</div><div class="key" data-key="">r</div><div class="key" data-key="">t</div><div class="key" data-key="">y</div><div class="key" data-key="">u</div>				<div class="key" data-key="">i</div><div class="key" data-key="">o</div><div class="key" data-key="">p</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">\</div><div class="key" data-key="">"</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">a</div><div class="key" data-key="">s</div><div class="key" data-key="">d</div><div class="key" data-key="">f</div><div class="key" data-key="">g</div><div class="key" data-key="">h</div><div class="key" data-key="">j</div><div class="key" data-key="">k</div><div class="key" data-key="">l</div><div class="key" data-key="">;</div><div class="key" data-key="">\'</div><div class="key" data-key="">!</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">z</div><div class="key" data-key="">x</div><div class="key" data-key="">c</div><div class="key" data-key="">v</div><div class="key" data-key="">b</div><div class="key" data-key="">n</div><div class="key" data-key="">m</div><div class="key" data-key="">,</div><div class="key" data-key="">.</div><div class="key" data-key="">:</div><div class="key" data-key="">/</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">Русский</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div>			<div class="keypad keypad_eng-shift"><div class="key" data-key="">~</div><div class="key" data-key="">!</div><div class="key" data-key="">@</div><div class="key" data-key="">#</div><div class="key" data-key="">$</div><div class="key" data-key="">%</div><div class="key" data-key="">^</div><div class="key" data-key="">&</div><div class="key" data-key="">*</div><div class="key" data-key="">(</div><div class="key" data-key="">)</div><div class="key" data-key="">_</div><div class="key" data-key="">+</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">Q</div><div class="key" data-key="">W</div><div class="key" data-key="">E</div><div class="key" data-key="">R</div><div class="key" data-key="">T</div><div class="key" data-key="">Y</div><div class="key" data-key="">U</div><div class="key" data-key="">I</div><div class="key" data-key="">O</div><div class="key" data-key="">P</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">|</div><div class="key" data-key="">»</div><div class="key key_multishift" data-key="multishift"></div><div class="key" data-key="">A</div><div class="key" data-key="">S</div><div class="key" data-key="">D</div><div class="key" data-key="">F</div><div class="key" data-key="">G</div><div class="key" data-key="">H</div><div class="key" data-key="">J</div><div class="key" data-key="">K</div><div class="key" data-key="">L</div><div class="key" data-key="">:</div><div class="key" data-key="">"</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left" data-key="shift"></div><div class="key" data-key="">Z</div><div class="key" data-key="">X</div><div class="key" data-key="">C</div><div class="key" data-key="">V</div><div class="key" data-key="">B</div><div class="key" data-key="">N</div><div class="key" data-key="">M</div><div class="key" data-key=""><</div><div class="key" data-key="">></div><div class="key" data-key="">;</div><div class="key" data-key="">—</div><div class="key key_shift right" data-key="shift"></div><div class="key key_language" data-key="language">Русский</div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div><div class="keypad keypad_symbols"><div class="key" data-key="">°</div><div class="key" data-key="">±</div><div class="key" data-key="">¼</div><div class="key" data-key="">½</div><div class="key" data-key="">¾</div><div class="key" data-key="">¤</div><div class="key" data-key="">¬</div><div class="key" data-key="">²</div><div class="key" data-key="">³</div><div class="key" data-key="">¢</div><div class="key" data-key="">€</div><div class="key" data-key="">£</div><div class="key" data-key="">=</div><div class="key key_backspace" data-key="backspace"></div><div class="key key_at" data-key="">@</div><div class="key" data-key="">~</div><div class="key" data-key="">§</div><div class="key" data-key="">¶</div><div class="key" data-key="">:</div><div class="key" data-key="">;</div><div class="key" data-key=""></div><div class="key" data-key="">\'</div><div class="key" data-key="">"</div><div class="key" data-key="">«</div><div class="key" data-key="">»</div><div class="key" data-key="">[</div><div class="key" data-key="">]</div><div class="key" data-key="">{</div><div class="key" data-key="">}</div><div class="key key_multishift"></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key="">‘</div><div class="key" data-key="">’</div><div class="key" data-key="">„</div><div class="key" data-key="">“</div><div class="key" data-key="">”</div><div class="key" data-key=""></div><div class="key" data-key="">!</div><div class="key" data-key="">?</div><div class="key key_enter" data-key="enter"></div><div class="key key_shift left"></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""></div><div class="key" data-key=""><</div><div class="key" data-key="">></div><div class="key" data-key="">–</div><div class="key" data-key="">—</div><div class="key" data-key="">\</div><div class="key" data-key="">|</div><div class="key" data-key="">/</div><div class="key key_shift right"></div><div class="key key_language"></div><div class="key key_space" data-key="space"></div><div class="key key_symbols" data-key="symbols">« » { } ~</div></div></div></div>');
	$('body').append($kb);
}
*/
