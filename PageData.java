package com.dpbs.biz.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PageData<T> { // 페이지 정보

	private List<T> dataList;
	private int totalCount;
	private Map<String, Object> param;
	
	public List<T> getDataList() {
		return dataList;
	}
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public Map<String, Object> getParam() {
		return param;
	}
	public void setParam(Map<String, Object> param) {
		this.param = param;
	}
}
