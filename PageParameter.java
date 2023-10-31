package com.dpbs.biz.dto;

import java.io.Serializable;

public class PageParameter implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -6575353521856493991L;
	private int lastRow;
	private int listCount;

	public static PageParameter parsePageParameter(int lastRow, int listCount) {

		PageParameter param = new PageParameter();

		param.setLastRow(lastRow);
		param.setListCount(listCount);

		return param;

	}

	public int getLastRow() {
		return lastRow;
	}

	public void setLastRow(int lastRow) {
		this.lastRow = lastRow;
	}

	public int getListCount() {
		return listCount;
	}

	public void setListCount(int listCount) {
		this.listCount = listCount;
	}

}
