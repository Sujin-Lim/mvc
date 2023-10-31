package com.dpbs.biz.dao;

import java.util.List;
import java.util.Map;

import com.dpbs.biz.dto.Reply;

public interface ReplyDao {

	List<Reply> getReplyList(Map<String, Object> pMap) throws Exception;

	int saveReply(Reply reply) throws Exception;

	int deleteReply(Map<String, Object> pMap) throws Exception;

	int modifyReply(Reply reply) throws Exception;

}
