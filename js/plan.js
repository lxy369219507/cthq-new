/**
	* Created by user on 2014/10/20.
	*/
define(function (require, exports) {

		$('button').each(function () {
				$(this).click(function () {

						$('button').each(function () {
								$(this).removeClass('plan-active')
								$(this).find('.title').removeClass('active');
						});

						$(this).addClass('plan-active');
						$(this).find('.title').addClass('active');
						$('#active_price').html($(this).attr('id'));

				});

				//setTimeout(function () {
				//		var affixE = $('#planaffix');
				//		affixE.affix({
				//				offset: {
				//						top: 10,
				//						bottom: function () {
				//								//description div + feature div 的高度+上footer的高度。
				//								return (this.bottom = $('#description').outerHeight(true)+$('#feature').outerHeight(true) + $('footer').outerHeight(true))
				//						}
				//				}
				//		});
				//}, 100);

				if ($(this).hasClass('plan-active')) {
						$('#active_price').html($(this).attr('id'));
				}
		});
});