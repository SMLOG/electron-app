import { getLastReportDate, dateFormat } from "../lib/utils";
import { getFields } from "../store/modules/suspension";

const reportDate = getLastReportDate();
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
    fmt: (e, item) => `${e}(${item.changeP})`,
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
    prop: "ACTUAL_PUBLISH_DATE",
    type: "string",

    fmt: (e, item) => {
      let date = item.ACTUAL_PUBLISH_DATE;
      if (date) {
        item.ACTUAL_PUBLISH_DATE = dateFormat(new Date(date), "yyyy-MM-dd");
      }

      return item.ACTUAL_PUBLISH_DATE;
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
    fmt: (e, item) => `${e}/${item.zsz}`,
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
    label: "同比",
    prop: "业绩_净利润同比增长",
    type: "number",
    fmt: (e, item) => e + "%(" + getReportSub(item) + ")",
    class: (item, value) => {
      return {
        reportUpdate: item["报告"] == reportDate && true,
        up: value > 0,
        down: value < 0,
      };
    },
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
    label: "现金流",
    prop: "业绩_每股现金流量",
    type: "string",
    click: (item, event, openlink) => {
      let url = `/proxy/http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code={{code}}#zyzb-0`;
      openlink(item, event, url);
    },
    fmt: (value, item) => {
      if (value) return value.toFixed(2);
      return "";
    },
    class: (item, value) => {
      return {
        link: true,
        down: value < 0,
        up: value > 0,
      };
    },
  },
  {
    label: "每股收益",
    prop: "业绩_每股收益",
    type: "string",
    title: (item) => {
      return item.reportDate;
    },
    class: (item, value) => {
      return {
        link: true,
        down: value < 0,
        up: value > 0,
      };
    },
  },
  {
    label: "ROE",
    prop: "业绩_净资产收益率",
    type: "number",
    click: (item, event, openlink) => {
      let url = `http://data.eastmoney.com/stockdata/${item.code.replace(
        /[a-z]+/g,
        ""
      )}.html`;
      openlink(item, event, url);
    },
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
