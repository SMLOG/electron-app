import { getLastReportDate, dateFormat } from "../lib/utils";
import { getFields } from "../store/modules/suspension";
import _ from "lodash";
import axios from "axios";
const reportDate = getLastReportDate();
const fmtNumber = function(value) {
  if (_.isNumber(value)) {
    let abs = Math.abs(value);
    let r =
      abs > 100000000
        ? (value / 100000000).toFixed(2) + "亿"
        : abs > 10000
        ? (value / 10000).toFixed(2) + "万"
        : value.toFixed(2);
    return r;
  }
  return value;
};
const fmtPercent = (value) => {
  if (value) return parseFloat(value).toFixed(2) + "%";
  return value;
};
function getReportSub(item) {
  if (item["业绩_QDATE"])
    return item["业绩_QDATE"].indexOf("Q1") > -1
      ? 1
      : item["业绩_QDATE"].indexOf("Q2") > -1
      ? 2
      : item["业绩_QDATE"].indexOf("Q3") > -1
      ? 3
      : 4;
  return "";
}
export let headers = [
  {
    label: "Now",
    prop: "now",
    type: "number",
    fmt: (e, item) => (e ? `${e}(${item.changeP})` : "--"),
    class: (item) => {
      return {
        up: item.change > 0,
        down: item.change < 0,
        click: true,
      };
    },
    click: (item, event, openlink) => {
      openlink(item, event, "/static/tech.html?{{code}}&t1");
    },
  },
  {
    label: "行业",
    prop: "hy",
    filterable: true,
    type: "string",
    class: (item) => {
      //let hy = window.indMap[item.hy];
      //return hy && { down: hy < 0, up: hy > 0 };
    },
    fmt: (e, item) => {
      if (item.hy && window.indMap)
        return `${item.hy}(${window.indMap[item.hy]}%)`;
      return item.hy;
    },
  },
  {
    label: "披露日期",
    prop: "discloseDate",
    type: "string",
    click: (item, event, openlink) => {
      openlink(item, event, (item) => {
        return `http://data.eastmoney.com/stockcalendar/${item.code.replace(
          /[a-z]+/g,
          ""
        )}.html`;
      });
    },
  },
  {
    label: "TO%",
    prop: "turnover",
    type: "number",
  },
  {
    label: "流通/亿",
    prop: "ltg",
    type: "number",
    class: (item) => {
      return {
        link: true,
      };
    },
    click: (item, event, openlink) => {
      openlink(
        item,
        event,
        "/f10/ShareholderResearch/Index?type=web&code={{code}}"
      );
    },
  },
  {
    label: "流/总",
    prop: "lz",
    type: "string",
    fmt: (e, item) => `${fmtNumber(e)}/${fmtNumber(item.zsz)}`,
  },
  {
    label: "TTM",
    prop: "pe_ttm",
    type: "number",
    class: (item) => {
      return {
        link: true,
      };
    },
    click: (item, event, openlink, getThis) => {
      if (getThis) {
        getThis((self) => {
          self.togglePop(item, "ChartIndex", "fin");
        });
      }
    },
  },
  {
    label: "PEG",
    prop: "估值_PEG1",
    type: "number",
    fmt: (e) => e && e.toFixed(2),
  },

  {
    label: "净利率",
    prop: "净利率(%)",
    type: "number",
    fmt: (e, item) => {
      if (window["zyzb_" + item.code]) {
        let data = window["zyzb_" + item.code];
        return (item["净利率(%)"] = parseFloat(
          data["净利率(%)"][data["reportDate"][1]]
        ));
      }
    },
  },
  {
    label: "毛利率",
    prop: "毛利率(%)",
    type: "number",
    fmt: fmtPercent,
  },
  {
    label: "资产负债率",
    prop: "资产负债率(%)",
    type: "number",
    fmt: fmtPercent,
  },
  {
    label: "分",
    prop: "score",
    type: "number",
    fmt: (e, item) => e,
    title: (item) => item.score_desc,
  },

  {
    label: "TRADE_MARKET_CODE",
    prop: "TRADE_MARKET_CODE",
  },
  {
    label: "TRADE_MARKET",
    prop: "TRADE_MARKET",
  },
  {
    label: "SECURITY_TYPE_CODE",
    prop: "SECURITY_TYPE_CODE",
  },
  {
    label: "SECURITY_TYPE",
    prop: "SECURITY_TYPE",
  },
  {
    label: "公告日期",
    prop: "UPDATE_DATE",
  },
  {
    label: "REPORTDATE",
    prop: "REPORTDATE",
    click: (item, event, openlink, getThis) => {
      if (getThis) {
        getThis((self) => {
          if (self.yjitems[item.code]) self.yjitems[item.code] = null;
          else
            axios
              .get("/api/yjlist", { params: { code: item.code } })
              .then((resp) => {
                //self.yjitems[item.code] = resp.data;
                self.$set(self.yjitems, item.code, resp.data);
                //console.error(self.yjitems);
              });
        });
      }
    },
  },
  {
    label: "股收益",
    prop: "BASIC_EPS",
    fmt: fmtNumber,
  },
  {
    label: "扣非每股",
    prop: "DEDUCT_BASIC_EPS",
    fmt: function(e) {
      return e == null ? "--" : e.toFixed(2);
    },
  },
  {
    label: "营收",
    prop: "TOTAL_OPERATE_INCOME",
    fmt: fmtNumber,
  },
  {
    label: "净利润",
    prop: "PARENT_NETPROFIT",
    fmt: fmtNumber,
  },
  {
    label: "ROE",
    prop: "WEIGHTAVG_ROE",
    fmt: fmtPercent,
    click: (item, event, openlink) => {
      openlink(
        item,
        event,
        (item) =>
          `http://data.eastmoney.com/stockdata/${item.code.replace(
            /[a-z]+/g,
            ""
          )}.html`
      );
    },
  },
  {
    label: "营收同比",
    prop: "YSTZ",
    fmt: fmtPercent,
  },
  {
    label: "净利同比",
    prop: "SJLTZ",
    fmt: fmtPercent,
    click: (item, event, openlink, getThis) => {
      if (getThis) {
        getThis((self) => {
          self.togglePop(item, "FinAnalyst2", "fin");
        });
      }
      //openlink(item, event, url);
    },
  },
  {
    label: "每股净资产",
    prop: "BPS",
    fmt: fmtNumber,
  },
  {
    label: "每股现金流量",
    prop: "MGJYXJJE",
    fmt: fmtNumber,
    click: (item, event, openlink) => {
      let url = `/proxy/http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code={{code}}#zyzb-0`;
      openlink(item, event, url);
    },
  },
  {
    label: "销售毛利率",
    prop: "XSMLL",
    fmt: fmtPercent,
  },
  {
    label: "季度环比增长",
    prop: "YSHZ",
    fmt: fmtPercent,
  },
  {
    label: "季度环比增长",
    prop: "SJLHZ",
    fmt: fmtPercent,
  },
  {
    label: "利润分配",
    prop: "ASSIGNDSCRPT",
  },
  {
    label: "PAYYEAR",
    prop: "PAYYEAR",
  },
  {
    label: "所属行业",
    prop: "PUBLISHNAME",
  },
  {
    label: "ZXGXL",
    prop: "ZXGXL",
  },
  {
    label: "NOTICE_DATE",
    prop: "NOTICE_DATE",
  },
  {
    label: "ORG_CODE",
    prop: "ORG_CODE",
  },
  {
    label: "TRADE_MARKET_ZJG",
    prop: "TRADE_MARKET_ZJG",
  },
  {
    label: "ISNEW",
    prop: "ISNEW",
  },
  {
    label: "QDATE",
    prop: "QDATE",
  },
  {
    label: "DATATYPE",
    prop: "DATATYPE",
  },
  {
    label: "DATAYEAR",
    prop: "DATAYEAR",
  },
  {
    label: "DATEMMDD",
    prop: "DATEMMDD",
  },
  {
    label: "EITIME",
    prop: "EITIME",
  },
];

export function getCheckFields(onlyCheck = true) {
  let checkFields = getFields();
  let checked = checkFields.filter((e) => e.checked).map((e) => e.prop);
  let all = checkFields.map((e) => e.prop);
  headers.map((f) => {
    f.order = all.indexOf(f.prop) > -1 ? all.indexOf(f.prop) : headers.length;

    checked.indexOf(f.prop) > -1 && (f.checked = true);
    return f;
  });
  headers = headers.slice().sort((a, b) => a.order - b.order);

  if (onlyCheck) return headers.filter((e) => e.checked);
  else return headers;
}
