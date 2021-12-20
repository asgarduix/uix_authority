
function createTableColumns(colDefines) {


	function columnFormat(colDefine) {
		let column
		var param = colDefine;
		if (param[0] === "checkbox") {
			column = {
				formatter: "rowSelection",
				titleFormatter: titleCheckboxFormatter,
				titleFormatterParams: param[1],	// default = { selectOnlyPage: false, showBtn: false }
				headerHozAlign: "center",
				hozAlign: "center",
				headerSort: false,
				resizable: false,
				cellClick: function (e, cell) {
					e.stopPropagation();
					cell.getRow().toggleSelect();
				},
				cellMouseEnter(e, cell) {
					cell.getElement().classList.add("tabulator-defaultCursor")
				},
				width: 60
			};
		} else if (param[0] === "group") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				headerHozAlign: "center",
				columns: param[2].map(arry => { return columnFormat(arry) })
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[0] === "rownum") {
			// 不隨資料排序而變動，僅表示表格資料索引
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				formatter: "rownum",
				resizable: false,
				headerSort: false,
				headerHozAlign: "center",
				hozAlign: "center",
				width: 60,
				headerClick: handleHeaderClick
			};
			if (param[2]) { column = { ...column, ...param[2] } }
		} else if (param[0] === "button") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				formatter: buttonFormatt,
				formatterParams: param[2],	//formatter中需要的參數由此傳入
				headerHozAlign: "center",
				hozAlign: "center",
				resizable: false,
				headerSort: false,
				headerClick: handleHeaderClick
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		}  else if (param[0] === "icon") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				formatter: iconFormatt,
				formatterParams: param[2],	//formatter中需要的參數由此傳入
				headerHozAlign: "center",
				resizable: false,
				hozAlign: "center",
				headerSort: false,
				headerClick: handleHeaderClick
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "select") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				headerHozAlign: "center",
				editable: editCheck,
				editor: "select",
				editorParams: {
					values: param[3]	//[val1, val2]
				}
			}
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "select1") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				formatter: selectFormatt,
				formatterParams: reverseKeyValue(param[3]),	//為配合Tabulator 反直覺的為value:key {val1:key1, val2:key2, ...}
				headerHozAlign: "center",
				editable: editCheck,
				editor: "select",
				editorParams: {
					values: reverseKeyValue(param[3])
				}
			}
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "display") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				headerHozAlign: "center",
				headerClick: handleHeaderClick,
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "input") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				headerHozAlign: "center",
				editor: "input",
				// sorter: "string",
				// resizable: false,
				editable: editCheck,
				headerClick: handleHeaderClick,
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "inputCenter") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: "input",
				// sorter: "string",
				// resizable: false,
				editable: editCheck,
				headerClick: handleHeaderClick,
				headerHozAlign: "center",
				hozAlign: "center",
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "number") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: "input",
				sorter: "number",
				editable: editCheck,
				headerClick: handleHeaderClick,
				headerHozAlign: "center",
				hozAlign: "right",
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "money") {
			//全部幣值以 0,0.00 格式顯示
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: `input`,
				sorter: "number",
				formatter: customMoneyFormatter, //"money",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "right"
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "money1") {
			//全部幣值以 0,0 格式顯示 (純台幣使用)
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: "input",
				sorter: "number",
				formatter: customMoneyFormatter1, //"money",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "right"
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "money2") {
			//用以需判定幣別者
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: `input`,
				sorter: "number",
				formatter: customMoneyFormatter2,
				formatterParams: param[3],	//formatter中需要的參數由此傳入 { curField: "幣別欄位的field", curVal: 對應欄位的台幣名稱 }
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "right"
			};
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "money3") {
			//純台幣使用
			//數字不為0者為紅色
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: `input`,
				sorter: "number",
				formatter: customMoneyFormatter3, //"money",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "right"
			};
			if (param[3]) { column = { ...column, ...param[3] } }
		} else if (param[2] === "inputPlaceholder") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: `input`,
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "left",
				formatter: (cell, formatterParams, onRendered) => {
					let val = cell.getValue()
					if (val || val === 0) {
						return val
					} else {
						return `<div class="table-placeholder">${formatterParams.placeholder}</div>`
					}
				},
				formatterParams: param[3],
			};
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "numberPlaceholder") {
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: "input",
				sorter: "number",
				editable: editCheck,
				headerClick: handleHeaderClick,
				headerHozAlign: "center",
				hozAlign: "right",
				formatter: (cell, formatterParams, onRendered) => {
					let val = cell.getValue()
					if (val || val === 0) {
						return val
					} else {
						return `<div class="table-placeholder">${formatterParams.placeholder}</div>`
					}
				},
				formatterParams: param[3],
			};
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "dateJQ") {
			// jquery-ui西元/民國年 月曆
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: dateEditorJQ,
				editorParams: param[3],
				sorter: "string",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "left",
			};
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "datetime") {
			// javascript 原生input type
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: datetimeEditor,
				editorParams: param[3],
				sorter: "string",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "left",
				formatter: datetimeFormatter,
				formatterParams: param[3],
			};
			if (param[4]) { column = { ...column, ...param[4] } }
		} else if (param[2] === "custom") {
			// 客製化使用，param[3]為欄位設定參數
			column = {
				title: param[1].charAt(0).toUpperCase() + param[1].slice(1),
				field: param[0],
				editor: "string",
				editable: editCheck,
				headerHozAlign: "center",
				hozAlign: "left"
			};
			column = { ...column, ...param[3] }
		}
		return column
	}

	function handleHeaderClick(e, column) {

	}

	function editCheck(cell) {
		return !!cell.getRow().getData()._edit
	}


	//button
	function buttonFormatt(cell, formatterParams, onRendered) {
		let div = document.createElement('div');
		let row = cell.getRow()
		console.log(formatterParams)
		formatterParams.forEach(btnConfig => {
			let btn = document.createElement('button');
			btn.innerText = btnConfig.name
			btn.addEventListener("click", () => { btnConfig.func(row) });
			div.appendChild(btn)
		});
		return div
	}

	//icon
	function iconFormatt(cell, formatterParams, onRendered) {
		let div = document.createElement('div');
		let row = cell.getRow()
		div.classList.add("table-icon-container");
		formatterParams.forEach(iconConfig => {
			let i = document.createElement('i');
			i.classList.add(iconConfig.icon);
			i.addEventListener("click", () => { iconConfig.func(row) });
			div.appendChild(i)
		});
		return div
	}

	//select
	function selectFormatt(cell, formatterParams, onRendered) {
		let val = cell.getValue()
		let selectOpts = formatterParams	// {val1:key1, val1:key1, ...}
		if (val === undefined) {
			return `<div class="table-select"></div>`
		}
		return `<div class="table-select">${selectOpts[val]}</div>`
	}

	//money formatter 其他外幣使用
	function customMoneyFormatter(cell, formatterParams, onRendered) {
		if (cell.getValue() < 0) {
			cell.getElement().style.color = "#FF0000";
		}
		let formatted = cell.getValue();
		if (cell.getValue()) {
			formatted = numeral(cell.getValue()).format("0,0.00")
		}
		return formatted;
	}

	//money1 formatter 台幣用
	function customMoneyFormatter1(cell, formatterParams, onRendered) {
		if (cell.getValue() < 0) {
			cell.getElement().style.color = "#FF0000";
		}
		let formatted = cell.getValue();
		if (cell.getValue()) {
			formatted = numeral(cell.getValue()).format("0,0")
		}
		return formatted;
	}

	//money2 formatter 需辨別幣別者
	function customMoneyFormatter2(cell, formatterParams, onRendered) {
		let curField = formatterParams.curField;
		let currVal = formatterParams.curVal;
		let currency = cell.getRow().getData()[curField]

		if (cell.getValue() < 0) {
			cell.getElement().style.color = "#FF0000";
		}
		let formatted = cell.getValue();
		if (cell.getValue()) {
			if (currency === currVal) {
				formatted = numeral(cell.getValue()).format("0,0")
			} else {
				formatted = numeral(cell.getValue()).format("0,0.00")
			}
		}
		return formatted;
	}

	//money3 formatter 台幣用 不為0者改紅色
	function customMoneyFormatter3(cell, formatterParams, onRendered) {
		if (cell.getValue() !== 0) {
			cell.getElement().style.color = "#FF0000";
		}
		let formatted = cell.getValue();
		if (cell.getValue()) {
			formatted = numeral(cell.getValue()).format("0,0")
		}
		return formatted;
	}

	function titleCheckboxFormatter(cell, formatterParams, onRendered) {
		let table = this.table
		let div = document.createElement('div');
		if (formatterParams.showBtn) {	// column header是否顯示全選
			let checkbox = document.createElement('input');
			checkbox.setAttribute("class", "tabulator-select")
			checkbox.setAttribute("type", "checkbox")
			checkbox.addEventListener('change', function (e) {
				let checked = e.target.checked
				if (formatterParams.selectOnlyPage) {	// 若有為多頁模式，全選按鈕選擇 當頁資料 或 跨頁全選
					let curPage = table.getPage();
					let dpPerPg = table.getPageSize();
					let startIndex = (curPage - 1) * dpPerPg;
					let endIndex = startIndex + dpPerPg;
					let rows = table.getRows().slice(startIndex, endIndex);
					rows.forEach((row) => {
						checked ? row.select() : row.deselect()
					})
				} else {
					checked ? table.selectRow() : table.deselectRow()
				}
			});
			div.appendChild(checkbox)
		}
		return div
	}

	function reverseKeyValue(jsonObj) {
		let keys = Object.keys(jsonObj)
		let reverseObj = keys.reduce((newObj, key) => {
			let val = jsonObj[key]
			if (val in newObj) {
				return { ...newObj, [val]: `${newObj[val]}/${key}` }
			} else {
				return { ...newObj, [val]: key }
			}
		}, {})
		return reverseObj
	}

	function dateEditorJQ(cell, onRendered, success, cancel, editorParams) {
		let cellValue = cell.getValue()
		let input = document.createElement("input");

		input.setAttribute("type", "text");
		input.classList.add("table-datepicker");

		input.value = typeof cellValue !== "undefined" ? cellValue : "";

		onRendered(function () {
			$(input).datepicker({
				changeYear: true,
				changeMonth: true,
				dateFormat: editorParams.type === "民國" ? "Rmmdd" : "yy/mm/dd",
				onClose: onChange
			});
			input.focus();
		});

		function onChange() {
			if (((cellValue === null || typeof cellValue === "undefined") && input.value !== "") || input.value != cellValue) {
				let selectDate = input.value
				if (editorParams.format) {
					let [Y, M, D] = selectDate.split("/")
					selectDate = editorParams.format.replace("YYYY", Y).replace("MM", M).replace("DD", D)
				}
				success(selectDate);
			} else {
				cancel();
			}
		}
		return input;
	}

	function datetimeEditor(cell, onRendered, success, cancel, editorParams) {
		let cellValue = cell.getValue()
		let input = document.createElement("input");
		let inputType = editorParams.type

		input.setAttribute("type", inputType);
		input.classList.add("table-datepicker");

		input.value = typeof cellValue !== "undefined" ? cellValue : "";
		input.addEventListener("blur", onChange);

		onRendered(function () {
			input.focus();
		});

		function onChange() {
			if (((cellValue === null || typeof cellValue === "undefined") && input.value !== "") || input.value != cellValue) {
				success(input.value);
			} else {
				cancel();
			}
		}
		return input;
	}
	function datetimeFormatter(cell, formatterParams, onRendered) {
		let val = cell.getValue()
		let inputType = formatterParams.type
		let inputFormat = formatterParams.displayFormat
		if (val || val === 0) {
			if (inputFormat) {
				if (inputType === "date") {
					let [Y, M, D] = val.split("-")
					val = inputFormat.replace("YYYY", Y).replace("MM", M).replace("DD", D)
				} else if (inputType === "time") {
					let [h, m] = val.split(":")
					val = inputFormat.replace("hh", h).replace("mm", m)
				} else if (inputType === "datetime-local") {
					let [date, time] = val.split("T")
					let [Y, M, D] = date.split("-")
					let [h, m] = time.split(":")
					val = inputFormat.replace("YYYY", Y).replace("MM", M).replace("DD", D).replace("hh", h).replace("mm", m)
				} else if (inputType === "month") {
					let [Y, M] = val.split("-")
					val = inputFormat.replace("YYYY", Y).replace("MM", M)
				}
			}
			return val
		} else {
			return ""
		}
	}

	let columns = colDefines.map((colDefine) => { return columnFormat(colDefine) })

	return columns;

}