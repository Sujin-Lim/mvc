package com.dpbs.controller.customer;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dpbs.biz.dto.Board;
import com.dpbs.biz.dto.packet.ResponseData;
import com.dpbs.biz.service.BoardService;
import com.dpbs.biz.service.ResourceService;
import com.dpbs.controller.common.AbstractCommonController;

@Controller
public class BoardController extends AbstractCommonController {

	@Autowired
	BoardService boardService;

	@Autowired
	ResourceService resourceService;

	// 글 목록 불러오기 - 페이징 처리까지
	@RequestMapping(value = "/board/list", method = RequestMethod.POST)
	@ResponseBody
	public ResponseData<Map<String, Object>> getBoardList(@RequestBody Map<String, Object> pMap,
			HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> reVal = new HashMap<String, Object>();
		reVal.put("pageData", boardService.getBoardList(pMap));
		return resultMap(request, reVal);
	}

	// 글 상세 보기
	@RequestMapping(value = "/board/post", method = RequestMethod.POST)
	@ResponseBody
	public ResponseData<Map<String, Object>> detailPost(@RequestBody Map<String, Object> pMap,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> reVal = new HashMap<String, Object>();
		reVal.put("pageData", boardService.detailPost(pMap));
//		logger.debug("controller reVal => {}", reVal);
		return resultMap(request, reVal);
	}

	// 글 등록하기
	@RequestMapping(value = "/board/save", method = RequestMethod.POST)
	@ResponseBody
	public ResponseData<Map<String, Object>> savePost(@RequestBody Board board, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> reVal = new HashMap<String, Object>();
		reVal.put("result", boardService.savePost(board));
//		logger.debug("controller reVal => {}", reVal);
		return resultMap(request, reVal);
	}

	// 글 삭제
	@RequestMapping(value = "/board/delete", method = RequestMethod.POST)
	@ResponseBody
	public ResponseData<Map<String, Object>> deletePost(@RequestBody Map<String, Object> pMap,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		boardService.deletePost(pMap);
		Map<String, Object> reVal = new HashMap<String, Object>();
		reVal.put("result", "success");
		return resultMap(request, reVal);
	}

	// 글 수정
	@RequestMapping(value = "/board/modify", method = RequestMethod.POST)
	@ResponseBody
	public ResponseData<Map<String, Object>> modifyPost(@RequestBody Board board, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> reVal = new HashMap<String, Object>();
		reVal.put("result", boardService.modifyPost(board));
//			logger.debug("controller reVal => {}", reVal);
		return resultMap(request, reVal);
	}

}
