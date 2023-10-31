package com.dpbs.biz.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dpbs.biz.dao.ReplyDao;
import com.dpbs.biz.dto.PageData;
import com.dpbs.biz.dto.Reply;
import com.dpbs.security.dto.SignedUser;

@Service("biz.ReplyService")
public class ReplyService {

	@Autowired
	ReplyDao replyDao;

	// 리플 목록 불러오기
	@Transactional(value = "txManager")
	public PageData<Reply> getReplyList(Map<String, Object> pMap) throws Exception {

		List<Reply> list = new ArrayList<Reply>();

		list = replyDao.getReplyList(pMap);

		PageData<Reply> pageData = new PageData<Reply>();
		pageData.setDataList(list);

		return pageData;
	}

	// 리플 등록하기
	@Transactional(value = "txManager")
	public String saveReply(Reply reply) throws Exception {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String loginId = ((SignedUser) principal).getUser().getLoginId();

		reply.setLoginId(loginId);

		replyDao.saveReply(reply);
		return "OK";
	}

	// 리플 삭제
	@Transactional(value = "txManager")
	public void deleteReply(Map<String, Object> pMap) throws Exception {
		int delete = replyDao.deleteReply(pMap);
	}
}
