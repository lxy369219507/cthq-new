/**
 * Created by user on 2014/10/20.
 */
define(function(require, exports){

    $('.col-md-3').each(function(){

        $(this).mouseover(function(){
            $(this).find('.thumbnail').addClass('active');
        }).mouseout(function(){
            $(this).find('.thumbnail').removeClass('active');
        })

    });

});
/**
 * Created by user on 2014/10/20.
 */
define(function(require, exports){

    $('button').each(function() {
        $(this).click(function () {

            $('button').each(function () {
                $(this).removeClass('plan-active')
                $(this).find('.title').removeClass('active');
            });

            $(this).addClass('plan-active');
            $(this).find('.title').addClass('active');
	        $('#active_price').html($(this).attr('id'));

        });
    });

});
/**
 * Created by user on 2014/10/30.
 */
define(function (require, exports) {

	exports.moveBox = function(obj){
		var divTop = $(obj).offset().top;
		var divLeft = $(obj).offset().left;
		$(obj).css({ "position": "absolute", "z-index": "500", "left": divLeft + "px", "top": divTop + "px" });
		$(obj).animate({ "left": ($("#collectBox").offset().left - $("#collectBox").width()) + "px", "top": ($(document).scrollTop() + 30) + "px", "width": "100px", "height": "70px" }, 500, function () {
			$(obj).animate({ "left": $("#collectBox").offset().left + "px", "top": $("#cart").offset().top + "px" }, 500).fadeTo(0, 0.1).hide(0);
		});
	}
});
/**
 * Created by user on 2014/10/15.
 */

define(function(require, exports){

    //
    $('.navbar-nav li').each(function(){

        $(this).click(function(){

            $('.navbar-nav li').each(function(){
                $(this).removeClass('active');
            });

            if($(this).has('span').length==0){
                $(this).addClass('active');
            }
        })
    });
    setTimeout(function() {
        var affixE = $('#planaffix');
        affixE.affix({
            offset:{
                top: 10,
                bottom: function () {
                    //simpleplan div 的高度+上footer的高度。
                    return (this.bottom = $('#description').outerHeight(true) + $('footer').outerHeight(true))
                }
            }
        });
    }, 100);

	$('#cart').mouseover(function(){
		$('#items').show();
	}).mouseout(function(){
		$('#items').hide();
	});

});
