package com.dpbs.biz.dto;

import java.io.Serializable;
import java.sql.Date;

public class Reply implements Serializable {

	private static final long serialVersionUID = 1L;

	private int seq;
	private int idx;
	private String content;
	private Date rdate;
	private String loginId;
	private String deleteYn;

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getRdate() {
		return rdate;
	}

	public void setRDate(Date rdate) {
		this.rdate = rdate;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Reply [seq=" + seq + ", idx=" + idx + ", content" + content + ", rdate=" + rdate + ", loginId="
				+ loginId + ", deleteYn=" + deleteYn + ", getSeq()=" + getSeq() + ", getIdx()=" + getIdx()
				+ ", getContent()=" + getContent() + ", getRdate()=" + getRdate() + ", getLoginId()=" + getLoginId()
				+ ", getDeleteYn()=" + getDeleteYn() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

}
