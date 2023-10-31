package com.dpbs.biz.dao;

import java.util.List;
import java.util.Map;

import com.dpbs.biz.dto.Board;

public interface BoardDao {

	List<Board> getBoardList(Map<String, Object> pMap) throws Exception; // 게시글 목록 조회

	List<Board> getPost(Map<String, Object> pMap) throws Exception; // 게시글 상세 보기

	int savePost(Board board) throws Exception; // 게시글 등록

	int deletePost(Map<String, Object> pMap) throws Exception; // 게시글 삭제

	int modifyPost(Board board) throws Exception; // 게시글 수정

	int findByCnt(Map<String, Object> pMap);

}
