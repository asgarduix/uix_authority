function createTable(tableId, columns, tableConfigs) {
	// tableId(String): HTML element id. ex: <div id="table1"> tableId="table1"
	// columns(Array): tabulator formatted columns. use createTableColumns.js or design yourself
	// tableConfigs(Object): any tabulator params. replace any default config ex: { height:"500px" }

	let tableConfigsDefault = {
		height: "100%", //根據資料行高設定, 100%為資料全展開 無scroll bar, 建議根據資料筆數再用 .setHeight("450px")重設
		layout: "fitColumns",   //尚有其他格式 參考 http://tabulator.info/docs/4.9/layout
		selectable: true,   //selectable與selectableRangeMode為 shift多選的用法
		// selectableRangeMode: "click",
		history: true, // 可還原上一步的修改紀錄 .undo()
		reactiveData: true,
		movableColumns: false,	//表格column移動
		columnHeaderVertAlign: "center",
		columns: columns,	//表格欄位設定，由外部傳入
		pagination: "local",	//設定為"local"即可開啟
		paginationSize: 25,
		paginationSizeSelector: [100, 50, 25],
		paginationButtonCount: 5,
		paginationAddRow: "page",   // page 為新增於該頁, table 新增於第一頁
		placeholder: "搜尋無資料", //display message to user on empty table
		validationMode: "highlight",
		dataSorted: function (sorters, rows) {
			$(`#${tableId}-pagination .curPageNum`).val(1)
		},
		rowAdded: function (row) {
		},
		rowSelected: function (row) {
		},
		rowDeselected: function (row) {
		},
		rowSelectionChanged: function (data, rows) {
			//可以抓到shift的選取事件
		},
		rowDeleted: function (row) {
		},
		rowClick: function (e, row) {
		},
		rowMouseOver: function (e, row) {
		},
		rowMouseLeave: function (e, row) {
		},
		cellEditing: function (cell) {
		},
		cellEdited: function (cell) {
		}
	}

	//更新外部傳入設定
	tableConfigsDefault = { ...tableConfigsDefault, ...tableConfigs }

	//製作tabulator本體
	let table = new Tabulator(`#${tableId}`, tableConfigsDefault);

	return table
}

function elementsChangeClass(elements, behavior, classNames) {
	// 使用方式
	// elements: 可接受格式 
	//      1. "#add, #edit, #del"  // CSS selector字串
	//      2. $("#add, #edit, #del")   // jQuery格式元素
	//      3. document.querySelectorAll("#add, #edit, #del")   // 原生javascript格式元素
	// behavior: "add" or "remove"
	// classNames: "btn-hide otherclass1 otherclass2" 中間以空白間隔

	if (behavior === "add") {
		$(elements).each(function (index, element) {
			$(element).addClass(classNames)
		})
	} else if (behavior === "remove") {
		$(elements).each(function (index, element) {
			$(element).removeClass(classNames)
		})
	}
}

function isNullSpace(val) {
	if (!val?.length && typeof (val) !== "number") {
		return true
	} else {
		if (typeof (val) === "number" && isNaN(val)) {
			return true
		}
		return false
	}
}

function loadData(tableId, data, heightConfig) {
	let table = Tabulator.prototype.findTable(`#${tableId}`)[0];

	//載入資料
	table.setData(data)

	elementsChangeClass(`#${tableId}-add, #${tableId}-edit, #${tableId}-copy, #${tableId}-del`, "remove", "btn-hide")

	let heightType = heightConfig.type
	if (heightType === "height") {
		table.setHeight(heightConfig.value)
	} else if (heightType === "dataCount") {
		let displayRowsNum = heightConfig.value
		if (data.length > displayRowsNum) {
			//根據載入資料數量調整table高度, 無資料(length===0)時建議 height="100%"

			//假設行高是固定的
			let headerHeight = table.element.children[0].offsetHeight
			let rowHeight = table.getRows()[0].getElement().offsetHeight
			let newHeight = headerHeight + rowHeight * displayRowsNum
			table.setHeight(`${newHeight}px`)
		} else {
			table.setHeight("100%")
		}

	}

}

