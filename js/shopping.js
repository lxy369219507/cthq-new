/**
	* Created by user on 2014/10/30.
	*/
define(function (require, exports) {

		exports.moveBox = function (obj) {

				var flyElm = $(obj).clone().css('opacity', '0.8');
				flyElm.css({
						'z-index': 99999,
						'display': 'block',
						'position': 'absolute',
						'top': $(obj).offset().top + 'px',
						'left': $(obj).offset().left + 'px',
						'width': $(obj).width() + 'px',
						'height': $(obj).height() + 'px'
				});
				$('body').append(flyElm);
				flyElm.animate({
						top: $('#cart').offset().top,
						left: $('#cart').offset().left,
						width: 30,
						height: 30
				}, 'slow', function () {
						$(this).hide();
				});

		}
});