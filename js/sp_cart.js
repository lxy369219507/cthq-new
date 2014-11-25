/**
 * Created by xiaoyang on 2014/7/14.
 *
 * 购物车实体中加入一个唯一属性用来进行增删改查操作。
 * 在购物车遍历展示的时候将id也保存到table中，然后修改数量的时候通过这个唯一表示来进行操作
 * 避免了在CUBJ中的时候那种通过多属性来确认商品。。
 *
 * CreateId 用来根据特殊属性和产品ID来生成唯一属性，这个根据商品来确定。(例如充值ID=productID+phonenumber)
 * Valid用来验证cookie中是否已经存在购物车
 * isExist用来验证是否已经存在该产品，需要两个参数（购物车串，ID）,通过解析购物车串循环比较ID是否存在。
 *serviceTypeId
 *productId
 *productName
 *productPrice
 *productCount
 *phoneNumber
 *color
 *cardType
 */

define(function(require, exports){
	exports.add = function(productObj, id){
	    var spStr = $.cookie('sp_str');
	    if(this.valid(spStr)){
	        var spJson = JSON.parse(spStr);
	        if(this.isExist(id,spStr)){
	            for(var i=0; i<spJson.length; i++){
	                if(spJson[i].id == id){
	                    spJson[i].productCount ++;
	                }
	            }
	        }else{
	            spJson.push(productObj);
	        }
	        this.save(spJson);
	    }else{
	        var productArray = new Array();
	        productArray.push(productObj);
	        this.save(productArray);
	    }
	};
	
	exports.remove = function(id){

	    var spStr = $.cookie('sp_str');
	    var spJson = JSON.parse(spStr);
	    for(var i=0; i<spJson.length; i++){
	        if(spJson[i].id === id){
	            spJson.splice(i, 1);
	        }
	    }
	    this.save(spJson);
	};
	
	exports.plus = function(id){
	    var spStr = $.cookie('sp_str');
	    var spJson = JSON.parse(spStr);
	    for(var i=0; i<spJson.length; i++){
	        if(spJson[i].id === id){
	            spJson[i].productCount ++;
	        }
	    }
	    this.save(spJson);
	};
	
	exports.minus = function(id){
	    var spStr = $.cookie('sp_str');
	    var spJson = JSON.parse(spStr);
	    for(var i=0; i<spJson.length; i++){
	        if(spJson[i].id === id ){
	            spJson[i].productCount --;
	        }
	    }
	    this.save(spJson);
	};
	
	exports.change = function(id, count){
	    var spStr = $.cookie('sp_str');
	    var spJson = JSON.parse(spStr);
	    for(var i=0; i<spJson.length; i++){
	        if(spJson[i].id === id ){
	        	spJson[i].productCount = count;
	        }
	    }
	    this.save(spJson);
	};
	
	exports.save = function(productArray){
	    var productJsonStr = JSON.stringify(productArray);
	    $.cookie('sp_str', productJsonStr);
			console.log(productJsonStr);
	};
	
	exports.valid = function(spStr){
	    if(spStr){
	        return true;
	    }else{
	        return false;
	    }
	};
	
	exports.isExist = function(id, spStr){
	    var result = false;
	    var spJson = JSON.parse(spStr);
	    for(var i=0; i<spJson.length; i++){
	        if(spJson[i].id === id){
	            result = true;
	        }
	    }
	    return result;
	};
	
	exports.createId = function(){
	    var id = '';
	    if(arguments.length == 0){
	        id = '';
	    }else{
	        for(var i=0; i<arguments.length; i++){
	            id += arguments[i];
	        }
	    }
	    return id;
	};
});
