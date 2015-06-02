/**
 * Created by renike01 on 27.05.2015.
 */
;

/**
 *
 * @param lineWidth
 * @param startRotate
 * @param rotateTime
 * @returns {*}
 */


$.fn.strokeStatCity = function(){

	if( this.length == 0 ){
		return this;
	} else {
		return this.each(function(){ init($(this)) });
	}

	function init(el){

		var $el = el,
			w = $el.width(),
			h = $el.height(),
			pie = {
				lineWidth: $el.data('line-width') || 10,
				centerX: w/2,
				centerY: h/2,
				radius: ( w < h ) ? w/2 : h/2
			},
			end = $el.data('end') ? $el.data('end') : false,
			ctx, canvas;

		if ( $el.find('canvas').size() ){
			canvas = $el.find('canvas').attr({width: w, height: h}).get(0);
		} else {
			canvas = $('<canvas></canvas>').attr({width: w, height: h}).appendTo($el).get(0);
		}

		if ( end ){
			if ( $el.find('.pie-diagram__num').size() ){
				$el.find('.pie-diagram__num').text('0');
			} else {
				$('<span class="pie-diagram__num">0</span>').appendTo($el);
			}
		}

		ctx = canvas.getContext("2d");

		ctx.clearRect(0,0,canvas.width,canvas.height);

		ctx.beginPath();
		ctx.lineWidth = pie.lineWidth ;
		ctx.arc(pie.centerX, pie.centerY, (pie.radius - (pie.lineWidth/2)), 0, 2 * Math.PI);
		ctx.strokeStyle = '#272a33';
		ctx.stroke();
	}

};


$.fn.loadStatCity = function(startRotate, rotateTime){

	startRotate = -90;
	rotateTime = 1000;

	if( this.length == 0 ){
		return this;
	} else {
		return this.each(function(){ init($(this),startRotate, rotateTime) });
	}

	function init(el, startRotate, rotateTime){

		var $el = el,
			w = $el.width(),
			h = $el.height(),
			pie = {
				lineWidth: $el.data('line-width') || 10,
				centerX: w/2,
				centerY: h/2,
				radius: ( w < h ) ? w/2 : h/2,
				start: startRotate || 0    //grad
			},
			max = 100,
			intervalId = 0,
			perimeter = 0,
			percent = 0,
			int = rotateTime/max || 20,
			num = 0, numText,
			end = $el.data('end') ? $el.data('end') : false,
			lines = $el.data('lines').split('-'),
			ctx, canvas;

		for (var i = 0; i < lines.length; i++ ){
			lines[i] = lines[i].split('#');
			perimeter += parseInt(lines[i][0]);
		}

		if ( $el.find('canvas').size() ){
			canvas = $el.find('canvas').attr({width: w, height: h}).get(0);
		} else {
			canvas = $('<canvas></canvas>').attr({width: w, height: h}).appendTo($el).get(0);
		}

		if ( end ){
			if ( $el.find('.pie-diagram__num').size() ){
				numText = $el.find('.pie-diagram__num');
			} else {
				numText = $('<span class="pie-diagram__num"></span>').appendTo($el);
			}
			max = (end / perimeter) * 100;
			int = rotateTime/max;
		}

		ctx = canvas.getContext("2d");

		function declOfNumFormat(nStr){
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ' ' + '$2');
			}
			return x1 + x2;
		}

		function circle(){
			var pi = 2 / perimeter;
			var s = pie.start * (2/360);

			for (var j = 0; j < lines.length; j++ ){
				ctx.beginPath();
				ctx.lineWidth = pie.lineWidth;
				ctx.arc( pie.centerX, pie.centerY, (pie.radius - (pie.lineWidth/2)), s * Math.PI, ((lines[j][0] * pi + s) * Math.PI) );
				ctx.strokeStyle = lines[j][1] == 'null' ? 'rgba(0,0,0,0)' : '#' + lines[j][1];
				ctx.stroke();

				s = s + (lines[j][0] * pi);
			}
		}

		function anim() {

			ctx.clearRect(0,0,canvas.width,canvas.height);

			ctx.beginPath();
			ctx.lineWidth = pie.lineWidth ;
			ctx.arc(pie.centerX, pie.centerY, (pie.radius - (pie.lineWidth/2)), 0, 2* Math.PI);
			ctx.strokeStyle = '#272a33';
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = 0;
			ctx.arc(pie.centerX, pie.centerY, (pie.radius + (pie.lineWidth / 2)), pie.start * (2/360) * Math.PI, (( percent * (2/100)) + pie.start * (2/360))* Math.PI);
			ctx.lineTo(pie.centerX, pie.centerY);
			ctx.save();
			ctx.clip();

			circle();

			ctx.restore();

			if (end){
				numText.text(declOfNumFormat(Math.round(num)));
				num += max;
			}

			percent ++;

			if ( percent > max) {
				if (end){ numText.text(declOfNumFormat(end));}
				clearInterval(intervalId);
			}
		}

		intervalId = setInterval(anim, int);
	}
};