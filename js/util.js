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
});
