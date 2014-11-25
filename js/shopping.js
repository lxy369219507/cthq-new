/**
	* Created by user on 2014/10/30.
	*/
define(function (require, exports) {

		var sp_cart = require('./sp_cart.js');

		var cardtypes = {
				1: "Standard SIM",
				2: "Standard SIM",
				3: "Micro SIM",
				4: "Micro SIM",
				5: "Nano SIM",
				6: "Nano SIM"
		};

		var colors = {
				1: "Black",
				2: "White",
				3: "Red",
				4: "Gray"
		};

		function init() {
				//var obj = [{
				//		"id": "14",
				//		"serviceTypeId": 1,
				//		"productId": "14",
				//		"productName": "ChinaNet Wi-Fi Week Pass",
				//		"productPrice": "5.99",
				//		"productCount": 1
				//}, {
				//		"id": "21",
				//		"productId": "2",
				//		"serviceTypeId": 5,
				//		"productName": "Mobile Plan B",
				//		"productPrice": "19.9900",
				//		"productCount": 1,
				//		"cardType": "1"
				//}, {
				//		"id": "8",
				//		"productId": "8",
				//		"serviceTypeId": 4,
				//		"productName": "USB Dongle",
				//		"productPrice": "94.9900",
				//		"productCount": 1
				//}];
				//$.cookie('sp_str', JSON.stringify(obj));
				var spStr = $.cookie('sp_str');
				var spJson = JSON.parse(spStr);
				var writeToHtml = '';
				var subTotal = 0;
				var total = 0;

				if (spJson.length == 0) {
						//$('.checkoutdiv').hide();
				}

				for (var i = 0; i < spJson.length; i++) {

						subTotal = spJson[i].productPrice * spJson[i].productCount;
						writeToHtml += '<tr>';

						if (spJson[i].phoneNumber) {
								writeToHtml += '<td>' + spJson[i].productName + ' (' + spJson[i].phoneNumber + ')' + '</td>';
						} else	if (spJson[i].color) {
								writeToHtml += '<td>' + spJson[i].productName + ' (' + colors[spJson[i].color] + ')' + '</td>';
						} else	if (spJson[i].cardType) {
								writeToHtml += '<td>' + spJson[i].productName + ' (' + cardtypes[spJson[i].cardType] + ')' + '</td>';
						} else {
								writeToHtml += '<td>' + spJson[i].productName + '</td>';
						}

						writeToHtml += '<td>$' + parseFloat(spJson[i].productPrice).toFixed(2) + '</td>'
						+ '<td>'
						+ '<i class="icon-minus-sign icon-2x mins" id="' + spJson[i].id + '"></i>'
						+ ' <input type="text" value="' + spJson[i].productCount + '" name="buyNum" id="' + spJson[i].id + '">'
						+ ' <i class="icon-plus-sign icon-2x add" id="' + spJson[i].id + '"></i>'
						+ '</td>'
						+ '<td><a href="javascript:void(0)" class="remove_a" id="' + spJson[i].id + '">Remove</a></td>'
						+ '<td class="orderdetailfont1">$ ' + parseFloat(subTotal).toFixed(2) + '</td>'
						+ '</tr>';
						total += subTotal;
				}
				$('#shopping_itmes').html(writeToHtml);
				$('#totalMoney').html('$' + parseFloat(total).toFixed(2));

				//if have a valid coupon code
				var couponAmount = $.cookie('couponAmount');
				var couponCode = $.cookie('couponCode');
				if (couponAmount && couponCode && total > 0) {
						total = total - parseFloat(couponAmount);
						$('#couponCode').val(couponCode);
						$('#disCount').html('$' + parseFloat(couponAmount).toFixed(2));
						if (total < 0) {
								$('#subTotalMoney').html('$ 0.00');
						} else {
								$('#subTotalMoney').html('$' + parseFloat(total).toFixed(2));
						}
				} else {
						$('#subTotalMoney').html('$' + parseFloat(total).toFixed(2));
				}

				loadBtn();
				loadminus();
				loadplus();
				loadCount();
				loadRemove();
		};

		function loadBtn() {
				$(".continueimg").hover(function () {
						$(this).attr("src", "images/continue1.jpg");
				}, function () {
						$(this).attr("src", "images/continue2.jpg");
				});

				$(".checkoutimg").hover(function () {
						$(this).attr("src", "images/checkout1.jpg");
				}, function () {
						$(this).attr("src", "images/checkout2.jpg");
				});
		}

		function loadminus() {
				$('.mins').each(function () {
						$(this).click(function () {
								var id = $(this).attr('id');
								var current = $(this).next().val();
								if (current == 1) {
										var body = 'Would you want to remove this?';
										$('#confirm-body').append(body);
										$('#confirm-modal').modal();
										$('.btn-success').click(function () {
												sp_cart.remove(id);
												$('#confirm-modal').modal('hide');
												init();
										});
								} else {
										sp_cart.minus(id);
										init();
								}
						});
				});
		}

		function loadplus() {
				$('.add').each(function () {
						$(this).click(function () {
								var id = $(this).attr('id');
								var current = $(this).prev().val();
								if (current == 99) {
										$('#alert-body').html("Quantity can't more than 100.");
										$('#alert-modal').modal();
								} else {
										sp_cart.plus(id);
										init();
								}
						});
				});
		}

		function loadRemove() {
				$('.remove_a').each(function () {
						$(this).click(function () {
								var id = $(this).attr('id');
								var body = 'Would you want to remove this?';
								$('#confirm-body').html(body);
								$('#confirm-modal').modal();
								$('.btn-success').click(function () {
										sp_cart.remove(id);
										$('#confirm-modal').modal('hide');
										init();
								});
						});
				});
		}

		function loadCount() {
				$('input[name=buyNum]').each(function () {
						$(this).change(function () {
								var id = $(this).attr('id');
								var count = $(this).val();
								if (count > 99) {
										count = 99;
								} else if (count < 1) {
										count = 1;
								}
								sp_cart.change(id, count);
								init();
						});
				});
		}

		$('#checkout').click(function () {
				var spStr = $.cookie('sp_str');
				var spJson = JSON.parse(spStr);

				var ids = [3, 4, 5, 6];
				var accessAddr = false;
				for (var i = 0; i < spJson.length; i++) {
						for (var j = 0; j < ids.length; j++) {
								if (spJson[i].serviceTypeId == ids[j]) {
										accessAddr = true;
								}
						}
				}
				if (accessAddr) {
						window.location.href = 'shipping.dhtml';
				} else {
						window.location.href = 'toPaymentPage.dhtml';
				}

		});

		$('#couponCode').keyup(function () {
				var couponCode = $(this).val();
				console.log(couponCode.length);
				if (couponCode.length == 6) {
						$.ajax({
								url: 'getCouponAmount.dhtml',
								type: 'post',
								data: "CouponCode=" + couponCode,
								success: function (txt) {
										var result = $.parseJSON(txt);
										if (result.ResponseCode == 0) {
												$('#disCount').html('$' + parseFloat(result.Discount).toFixed(2)); // show price
												$.cookie("couponCode", couponCode); // save coupon code
												$.cookie("couponAmount", result.Discount); //
												init();
										}
								}
						});
				}
		});

		$('#continue').click(function () {
				window.location.href = "home.dhtml";
		});

		exports.init = init;
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