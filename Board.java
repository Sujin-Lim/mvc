package com.dpbs.biz.dto;

import java.io.Serializable;
import java.util.Date;

// Serializable란 객체를 저장하거나 전송하기 위해 자바 객체의 코드를 다시 복원가능한 형태의 Stream으로 직렬화 시켜주는 것을 말한다.
public class Board implements Serializable {
	/**
	 * 객체를 파일에 쓰거나 전송하기 위해서 직렬화를 해야하는데 그러기 위해선 객체 클래스에 Serializable 인터페이스를
	 * implements하게 된다. serialVersionUID는 직렬화에 사용되는 고유 아이디인데 선언하지 않으면 JVM에서 디폴트로
	 * 생성된다. 따라서 선언하지 않아도 동작하는데 문제는 없지만 불안하기 때문에 Java에서는 명시적으로 serialVersionUID를 선언할
	 * 것을 적극 권장하고 있다.
	 */
	private static final long serialVersionUID = 1L; // final static으로 선언하면 클래스 로딩시 메모리에 적재되어 있어 효율을 높인다.

	private int seq;
	private String writer;
	private String title;
	private Date crDate;
	private String content;
	private String loginId;
	private String deleteYn;
	private String orgFileName;
	private String filePath;
	private int rownum;
	private String startDate;
	private String endDate;

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public int getRownum() {
		return rownum;
	}

	public void setRownum(int rownum) {
		this.rownum = rownum;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getCrDate() {
		return crDate;
	}

	public void setCrDate(Date crDate) {
		this.crDate = crDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getOrgFileName() {
		return orgFileName;
	}

	public void setOrgFileName(String orgFileName) {
		this.orgFileName = orgFileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Board [rownum=" + rownum + ",seq=" + seq + ", writer=" + writer + ", title=" + title + ", crDate="
				+ crDate + ", content=" + content + ", loginId=" + loginId + ", deleteYn=" + deleteYn + ", orgFileName="
				+ orgFileName + ", filePath=" + filePath + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", getRownum()=" + getRownum() + ", getSeq()=" + getSeq() + ", getWriter()=" + getWriter()
				+ ", getTitle()=" + getTitle() + ", getCrDate()=" + getCrDate() + ", getContent()=" + getContent()
				+ ", getLoginId()=" + getLoginId() + ", getDeleteYn()=" + getDeleteYn() + ", getOrgFileName()= "
				+ getOrgFileName() + ", getFilePath()=" + getFilePath() + getStartDate() + ", getStartDate()= "
				+ getEndDate() + ", getEndDate()=" + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

}
