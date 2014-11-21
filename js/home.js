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