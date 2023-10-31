package com.dpbs.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dpbs.biz.dao.BoardDao;
import com.dpbs.biz.dto.Board;
import com.dpbs.biz.dto.PageData;
import com.dpbs.security.dto.SignedUser;

@Service("biz.BoardService")
public class BoardService {

	@Autowired
	BoardDao boardDao;

	// 글 목록 불러오기 - 페이징 처리
	@Transactional(value = "txManager")
	public PageData<Board> getBoardList(Map<String, Object> pMap) throws Exception {

		int pageNo = Integer.parseInt("" + pMap.get("pageNo"));
		int pageSize = Integer.parseInt("" + pMap.get("pageSize"));

		if (pageNo < 1)
			pageNo = 1;

		pMap.put("pageSize", pageSize);

		Map<String, Object> option = new HashMap<String, Object>();

		option.put("offset", (pageNo - 1) * pageSize);
		option.put("size", pageSize);
		option.put("edt_text", pMap.get("edt_text"));
		option.put("fromDate", pMap.get("fromDate"));
		option.put("toDate", pMap.get("toDate"));

		int count = boardDao.findByCnt(option); // 총 게시물 갯수
		List<Board> list = null;
		if (count > 0) {
			list = boardDao.getBoardList(option);

		} else {
			list = new ArrayList<Board>();
		}

		PageData<Board> pageData = new PageData<Board>();
		pageData.setTotalCount(count);
		pageData.setDataList(list);
		pageData.setParam(pMap);

		return pageData;
	}

	// 글 목록 불러오기
	/*
	 * @Transactional(value = "txManager") public PageData<Board>
	 * getBoardList(Map<String, Object> pMap) throws Exception {
	 * 
	 * List<Board> list = new ArrayList<Board>();
	 * 
	 * list = boardDao.getBoardList(pMap);
	 * 
	 * PageData<Board> pageData = new PageData<Board>(); pageData.setDataList(list);
	 * 
	 * return pageData;
	 * 
	 * }
	 */

	// 글 상세내용 보기
	@Transactional(value = "txManager")
	public PageData<Board> detailPost(Map<String, Object> pMap) throws Exception {

		List<Board> list = new ArrayList<Board>();

		list = boardDao.getPost(pMap);

		PageData<Board> pageData = new PageData<Board>();
		pageData.setDataList(list);

		return pageData;

	}

	// 글 등록하기
	@Transactional(value = "txManager")
	public String savePost(Board board) throws Exception {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String loginId = ((SignedUser) principal).getUser().getLoginId();

		board.setLoginId(loginId);
		board.setWriter(loginId);

		boardDao.savePost(board);
		return "OK";
	}

	// 글 삭제
	@Transactional(value = "txManager")
	public void deletePost(Map<String, Object> pMap) throws Exception {
		int delete = boardDao.deletePost(pMap);
	}

	// 글 수정
	// 글 등록하기
	@Transactional(value = "txManager")
	public String modifyPost(Board board) throws Exception {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String loginId = ((SignedUser) principal).getUser().getLoginId();

		board.setLoginId(loginId);
		board.setWriter(loginId);

		boardDao.modifyPost(board);
		return "OK";
	}

}
