
var SEQ = "";
var title = "";

var param = {
	pageNo: 1,
	pageSize: 10,
}



$(function() {

	doInit("list");

	//신청일자 세팅
	$("#FROM_DATE").datepicker({
		showAnim: "slide",
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$("#TO_DATE").datepicker({
		showAnim: "slide",
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$("#FROM_DATE").val(dateMask(addDate("m", -1, Today())));
	$("#TO_DATE").val(dateMask(Today()));

	$("[id=FROM_DATE]").change(function() {
		fnChkFrDate();
	});

	$("[id=TO_DATE]").change(function() {
		fnChkFrDate();
	});

	getBoardList(param);

	// 글 작성 창으로 가는 것
	$("#writeBtn").click(function() {
		doInit("write");
	})
	$("#writeBtn2").click(function() {
		doInit("write");
	})

	// 글 저장 - 글 작성창에서 입력 후 저장
	$("#saveBtn").click(function() {
		savePost();
	});

	// 글 수정 - 수정 버튼 눌러서 수정 창 띄우기
	$("#modifyBtn").click(function() {
		doInit("modify");
		$('#modifyTitle').val($('#postTitle').text());
		$('#modifyContent').val($('#postContent').text());
	});

	// 글 수정 - 수정 후 등록
	$("#updateBtn").click(function() {
		modifyPost();
	});

	// 글 삭제
	$("#deleteBtn").click(function() {
		deletePost();
	});

	// 리플 등록
	$("#saveReplyBtn").click(function() {
		saveReply();
	})

	// 리플 삭제 - 모든 요소가 다 불러와진 뒤에 이벤트 실행해야 함. 그리고 id는 유일해야하는데 for문으로 계속 생성되므로 class로 해야함
	$(document).on('click', '.deleteReplyBtn', function() {
		var rseq = $(this).closest('tr').data('rseq');
		deleteReply(rseq);
	});

	// 검색창
	$("a#search").click(function() {
		getBoardList(param);
	})

	// 검색창 엔터키 이벤트
	$(document).on("keypress", function(e) {
		if (e.which == 13) {
			getBoardList(param);
		}
	});



	var $table = $(".memberinfo3");
	$table.on("click", "#BoardItemList > tr", function(e) {

		var $this = $(this);
		var $contents = $this.closest("tr");

		SEQ = $contents.find("#SEQ").val();	//공지사항ID

		if (SEQ != undefined && sNvl(SEQ, "") != "") {
			//공지사항ID 있는 경우 상세조회
			doInit("detail");
			detailPost();
		}

	});

	$('#pageNext').on('click', function() {
		pageNext();
	});

	$('#pagePrev').on('click', function() {
		pagePrev();
	});

})

//초기화
function doInit(gb) {


	if (gb == "list") {
		$("#list").show();
		$("#detail").hide();
		$("#write").hide();
		$("#modify").hide();
		title = "게시글 목록 조회";
	} else if (gb == "detail") {
		$("#list").hide();
		$("#detail").show();
		$("#write").hide();
		$("#modify").hide();
		title = "게시글 상세 보기";
	} else if (gb == "write") {
		$("#list").hide();
		$("#detail").hide();
		$("#write").show();
		$("#modify").hide();
		title = "게시글 작성";
	} else if (gb == "modify") {
		$("#list").hide();
		$("#detail").hide();
		$("#write").hide();
		$("#modify").show();
		title = "게시글 작성";
	}
}

// 게시글 목록 조회
var getBoardList = function(opt) {

	if (!$.isPlainObject(opt)) {
		opt = {
			pageNo: 1,
			pageSize: 10
		}
	}
	if (!opt.pageNo) opt.pageNo = 1;
	if (!opt.pageSize) opt.pageSize = 10;

	var fromDate = $("[id=FROM_DATE]").val().replaceAll(".", "");
	var toDate = $("[id=TO_DATE]").val().replaceAll(".", "");
	if (fromDate.length != 8 || toDate.length != 8) {
		mh.alert("조회일자를 입력하여 주십시오.");
		return;
	}

	var data = {
		"fromDate": fromDate
		, "toDate": toDate
		, "edt_text": sNvl($("[id=edt_text]").val(), "")
		, "pageNo": opt.pageNo
		, "pageSize": opt.pageSize
		,
	}

	$.ajax({
		url: '../../board/list',
		type: 'post',
		data: JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json'
	})
		.done(function(result) {

			var rdata = [];

			var totalCount = 0;

			if (result.code == 'S') {
				rdata = result.payload.pageData.dataList;
				totalCount = result.payload.pageData.totalCount;
				param = result.payload.pageData.param;

				var buffer = "";

				$("#BoardItemList > tr").remove();

				if (rdata.length == 0) {
					buffer += "<tr>";
					buffer += "  <td colspan=4></td>";
					buffer += "</tr>";
					buffer += "<tr class=\"win-font-17\">";
					buffer += "  <td colspan=4><span>검색 결과가 존재하지 않습니다.</span></td>";
					buffer += "</tr>";
				} else {
					for (var i = 0; i < rdata.length; i++) {
						buffer += "<tr class=\"win-font-17\">";
						buffer += "  <td><span>" + (rdata.length - i) + "</span></td>";

						// 제목 길이 줄이기..
						var title = rdata[i].title;
						if (title.length > 10) {
							title = title.substring(0, 10) + "...";
						}

						buffer += "  <td><span>" + title + "</span></td>";
						buffer += "  <td><span>" + rdata[i].loginId + "</span></td>";

						var date = new Date(rdata[i].crDate);
						buffer += "  <td><span>" + date.format("yyyy-MM-dd HH:mm") + "</span></td>";
						buffer += "    <input type=\"hidden\" id=\"SEQ\" value=\"" + rdata[i].seq + "\" />";//공지사항ID	 
						buffer += "</tr>";
						SEQ = rdata[i].seq;

					}
					buffer += '<tr>';

					buffer += '<td colspan="4" align="center">';

					if (param.pageNo > 1) {
						buffer += '<a href="javascript:pagePrev()" class="btn-type2 btn-size-54">이전</a>';
					} else {
						buffer += '<a href="#" class="btn-type1 btn-size-54">이전</a>';
					}
					if (param.pageNo < (totalCount / param.pageSize)) {
						buffer += '<a href="javascript:pageNext()" class="btn-type2 btn-size-54">다음</a>';
					} else {
						buffer += '<a href="#" class="btn-type1 btn-size-54">다음</a>';
					}
					buffer += '</td>';
					buffer += '</tr>\n';
				}
				param.pageNo = result.payload.pageData.param.pageNo;

				$("#BoardItemList").html(buffer);
			}
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
var pageNext = function() {
    getBoardList({
        pageNo: param.pageNo + 1,
        pageSize: param.pageSize
    });
}

var pagePrev = function() {
    getBoardList({
        pageNo: param.pageNo - 1,
        pageSize: param.pageSize
    });
}



// 게시글 상세 보기
function detailPost() {

	// 해당 입력값이 null인지 체크. common.js에 있음
	if (fn_IsNullChk(SEQ)) {
		return;
	}

	var data = {
		"seq": SEQ
	};

	$.ajax(
		{
			url: '../../board/post',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		}
	)
		.done(function(result) {

			console.log(result);
			var rdata = result.payload.pageData.dataList;

			$("#postTitle").text(rdata[0].title);			//제목
			$("#postContent").html(rdata[0].content);			//내용


			getReplyList();

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

// 글 등록
function savePost() {

	var title = $('#createTitle').val();
	var content = $('#createContent').val();
	content = content.replace(/\n/g, '<br>'); // 엔터를 <br> 태그로 변환
	var seq = $('#createSEQ').val();
	var orgFileName = $('#orgFileName').val();
	var filePath = $('filePath').val();

	if (title.length == 0) {
		alert("제목을 입력하세요");
		return;
	}

	if (content.length == 0) {
		alert("내용을 입력하세요");
		return;
	}

	var data = {
		"seq": seq,
		"writer": mh.login_id,
		"title": title,
		"crDate": "",
		"content": content,
		"loginId": mh.login_id,
		"deleteYn": "",
		"orgFileName": orgFileName,
		"filePath": filePath
	}

	$.ajax(
		{
			url: '../../board/save',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		}
	)
		.done(function(result) {
			alert("글 등록에 성공!");
			doInit("list");
			getBoardList();

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


// 글 삭제
function deletePost() {

	if (fn_IsNullChk(SEQ)) {
		return;
	}

	if (window.confirm("정말 삭제하시겠습니까?")) {
		var data = {
			"seq": SEQ
		};

		$.ajax(
			{
				url: '../../board/delete',
				type: 'post',
				data: JSON.stringify(data),
				contentType: 'application/json',
				dataType: 'json'
			}
		)
			.done(function(result) {

				doInit("list");
				getBoardList();

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
}

// 글 수정
function modifyPost() {

	var title = $('#modifyTitle').val();
	var content = $('#modifyContent').val();

	if (title.length == 0) {
		alert("제목을 입력하세요");
		return;
	}

	if (content.length == 0) {
		alert("내용을 입력하세요");
		return;
	}

	var data = {
		"seq": SEQ,
		"title": title,
		"crDate": "",
		"content": content
	}

	$.ajax(
		{
			url: '../../board/modify',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		}
	)
		.done(function(result) {
			alert("수정 성공!");
			doInit("detail");
			detailPost();
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

// 게시글 조회시 리플 가져오기

function getReplyList() {

	var data = {
		"idx": SEQ
	};

	$.ajax({
		url: '../../reply/list',
		type: 'post',
		data: JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json'
	}
	)
		.done(function(result) {

			console.log(result);
			var rdata = result.payload.pageData.dataList;
			var buffer = "";

			$("#replyItemList > tr").remove();

			for (var i = 0; i < rdata.length; i++) {
				buffer += "<tr class=\"win-font-17\" data-rseq=\"" + rdata[i].seq + "\">";  // 리플 삭제 하려면 각 리플마다 seq가 필요하니까..
				buffer += "  <td><span>" + rdata[i].loginId + "</span></td>";
				buffer += "  <td><span>" + rdata[i].content + "</span></td>";
				buffer += '<td><span><a href="#" class="deleteReplyBtn">삭제</a></span></td>';
				buffer += "</tr>";
			}
			$("#replyItemList").html(buffer);
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



// 리플 등록

function saveReply() {

	var content = $('#createReply').val();
	var rseq = $('#createRSEQ').val();

	if (content.length == 0) {
		alert("내용을 입력하세요");
		return;
	}

	var data = {
		"idx": SEQ,
		"content": content,
		"rdate": "",
		"loginId": mh.login_id,
		"deleteYn": ""
	}

	$.ajax(
		{
			url: '../../reply/save',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json'
		}
	)
		.done(function(result) {
			alert("리플 등록에 성공!");
			$('#createReply').val('');  // 입력창 초기화
			doInit("detail");
			detailPost();

			RSEQ = SEQ;

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

// 리플 삭제 - 글 삭제의 seq는 전역변수이지만 리플의 seq는 아니니까..
function deleteReply(rseq) {

	if (window.confirm("정말 삭제하시겠습니까?")) {
		var data = {
			"seq": rseq
		};

		$.ajax(
			{
				url: '../../reply/delete',
				type: 'post',
				data: JSON.stringify(data),
				contentType: 'application/json',
				dataType: 'json'
			}
		)
			.done(function(result) {

				doInit("detail");
				detailPost();

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
}

// 리플 수정
function modifyReply(rseq) {

	if (window.confirm("정말 삭제하시겠습니까?")) {
		var data = {
			"seq": rseq
		};

		$.ajax(
			{
				url: '../../reply/delete',
				type: 'post',
				data: JSON.stringify(data),
				contentType: 'application/json',
				dataType: 'json'
			}
		)
			.done(function(result) {

				doInit("detail");
				detailPost();

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
}



/**
 * 실행 후 실패 시 콜백
 * @param e
 */
function errorCallback(e) {
	mh.alert(e);
}


// crDate 타임스탬프에서 yyyymmdd 형식으로 변환하기 위해..
Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

String.prototype.string = function(len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function(len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function(len) { return this.toString().zf(len); };

/**********************************************************************************
 * 날짜 마스크 처리
 * @param sDate
 * @returns
 **********************************************************************************/
function detailDateMask(sDate) {
	var mskDate;

	if (sDate == undefined) {
		sDate = $(this).text();
	}

	if (sDate.length == 14 || sDate.length == 12) {
		mskDate = sDate.substring(0, 4) + "년 " + sDate.substring(4, 6) + "월 " + sDate.substring(6, 8) + "일 " + sDate.substring(8, 10) + "시 " + sDate.substring(10, 12) + "분";
	} else {
		mskDate = "";
	}
	return mskDate;
};

//시작일 체크
function fnChkFrDate() {

	var fromStr = $("[id=FROM_DATE]").val().replaceAll(".", "");
	var toStr = $("[id=TO_DATE]").val().replaceAll(".", "");

	if (Number(fromStr) > Number(toStr)) {
		mh.alert("시작일이 큰수입니다. 조회일을 확인하여 주세요");
		return false;
	}
}






