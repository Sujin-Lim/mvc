

$(function() {
	$("a.popup-close, .closebutton").click(function() {
		$(".popup").hide();
	});
	
	$("a.click").click(function() {
		$(".popup").show();
	});
	
	$("#search").click(function(){
		findCorp();
	})

})

function doInit(gb) {
	if(gb=="popup"){
		$("#popup").show();
		$(".on").show();
	} else {
		$("#popup").hide();
		$(".on").show();
	}
}

function findCorp(){
	
	var num1 = '123';
	var num2 = $('#n2').val();
	var num3 = $('#n3').val();
	
	var data = {
		corpId: num1 + '-' + num2 + '-' + num3
	};
	
	$.ajax(
		{
			url: '../../corp/find',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'text'
		}
	)
		.done(function(result) {
			console.log(result);
			
			$("#corp").text(result);

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error(jqXHR);
			console.error(textStatus);
			console.error(errorThrown);
			if (jqXHR.status == 403) {
				mh.alert("세션이 끊어졌습니다. 다시 로그인해주세요.");
				goNextPage("./../../login.html");
			} else {
				mh.alert("처리중 오류가 발생했습니다.");
			}
		});
}