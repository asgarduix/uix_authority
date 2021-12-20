/*啟動名稱*/
$(function() {
	$(".mingo").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "Rmmdd",
		showButtonPanel:false
	});
	
	$(".datepicker").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: "y/mm/dd",
		showButtonPanel:false
	});
});


/*民國年設定*/
$(function() {
	//先設定預設西元年的datepicker必要功能
	var old_generateMonthYearHeader = $.datepicker._generateMonthYearHeader;
	var old_formatDate = $.datepicker.formatDate;
	var old_parseDate = $.datepicker.parseDate;

	$.extend($.datepicker, {
		//選擇日期之後的value
		formatDate: function(format, date, settings) {
			var oformatDate = old_formatDate(format, date, settings);
			if (format == 'Rmmdd') {
				var d = date.getDate();
				var m = date.getMonth() + 1;
				var y = date.getFullYear();
				var fm = function(v) {
					return (v < 10 ? '0' : '') + v;
				};

				if ((y - 1911) >= 100) { y = y - 1911; } else { y = "0" + String(y - 1911); }
				return (y) + '/' + fm(m) + '/' + fm(d);
			}
			return oformatDate;

		},
		//點取已存在日期的parse
		parseDate: function(format, value, settings) {
			var v = new String(value);
			var Y, M, D;
			if (format == 'Rmmdd') {
				if (v.length == 7) { /*1001215*/
					Y = v.substring(0, 3) - 0 + 1911;
					M = v.substring(3, 5) - 0 - 1;
					D = v.substring(5, 7) - 0;
					return (new Date(Y, M, D));
				} else if (v.length == 6) { /*0981215*/

					Y = "0" + String(v.substring(0, 2) - 0 + 1911);
					M = v.substring(2, 4) - 0 - 1;
					D = v.substring(4, 6) - 0;
					return (new Date(Y, M, D));
				}
				return (new Date());
			} else {
				var oparseDate = old_parseDate.apply(this, [format, value, settings]);
				return (oparseDate);
			}

		},
		//改變小工具的年
		_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var dateFormat = this._get(inst, "dateFormat");
			var htmlYearMonth = old_generateMonthYearHeader.apply(this, [inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort]);
			if (dateFormat == 'Rmmdd') {
				if ($(htmlYearMonth).find(".ui-datepicker-year").length > 0) {
					var _ress = "";
					htmlYearMonth = $(htmlYearMonth).find(".ui-datepicker-year").find("option").each(function(i, e) {
						//console.log(e.textContent);
						_ress += e.textContent + "|";
						if (Number(e.value) - 1911 > 0) { $(e).text(Number(e.textContent) - 1911); }

					}).end().end().get(0).outerHTML;
					console.log(_ress);
				}
			}
			return htmlYearMonth;
		}
	});
});


/*翻譯*/
$(function() {

	$.datepicker.regional['zh-TW'] = {
		closeText: '關閉',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '今天',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
			'七月', '八月', '九月', '十月', '十一月', '十二月'
		],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月',
			'七月', '八月', '九月', '十月', '十一月', '十二月'
		],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true
	};
	$.datepicker.setDefaults($.datepicker.regional['zh-TW']);

});