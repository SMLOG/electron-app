import { getLastReportDate, dateFormat } from "../lib/utils";
import { cache, getCacheData } from "../lib/db";
import { getFields } from "../store/modules/suspension";
import storejs from "storejs";

const reportDate = getLastReportDate();
const fmtPercent = (value) => {
  if (value) return parseFloat(value).toFixed(2) + "%";
  return value;
};
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
      openlink(
        item,
        event,
        "http://localhost:9080/static/tech.html?{{code}}&t1"
      );
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
  { label: "TTM", prop: "pe_ttm", type: "number" },
  {
    label: "PEG",
    prop: "PEG",
    type: "number",
    fmt: (e) => e && e.toFixed(2),
  },
  {
    label: "同比",
    prop: "扣非净利润同比增长(%)",
    type: "number",
    fmt: fmtPercent,
    class: (item) => {
      if (item["报告"] == reportDate)
        return {
          reportUpdate: true,
          up: item.tbzz > 0,
          down: item.tbzz < 0,
        };
    },
    click: (item, event, openlink, getThis) => {
      let url = `/#/finAnalyst/{{code}}`;
      if (getThis) {
        getThis((self) => {
          self.link = null;
          if (item == self.item) (self.item = null), (self.showType = null);
          else (self.showType = "fin"), (self.item = item);
        });
      }
      //openlink(item, event, url);
    },
  },
  {
    label: "现金流",
    prop: "xjlzzl",
    type: "string",
    click: (item, event, openlink) => {
      let url = `/proxy/http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code={{code}}#zyzb-0`;
      openlink(item, event, url);
    },
  },
  {
    label: "扣非净利润",
    prop: "zzl",
    type: "string",
    title: (item) => {
      return item.reportDate;
    },
    class: (item) => {
      return {
        link: true,
        down: item.tbzz < 0,
        up: item.tbzz > 0,
      };
    },
    click: (item, event, openlink) => {
      let url = `http://localhost:9080/static/finance_visual.html#/report?date=20200630&securityCode=${item.code.replace(
        /[a-z]+/gi,
        ""
      )}`;
      openlink(item, event, url);
    },
  },
  {
    label: "ROE",
    prop: "roe",
    type: "number",
    click: (item, event, openlink) => {
      let url = `/f10/NewFinanceAnalysis/Index?type=web&code={{item.code}}#dbfx-0`;
      openlink(item, event, url);
    },
    fmt: (e, item) => {
      try {
        let tb = cache["tb_zycwzb" + item.code];
        if (tb && tb.reportDate) {
          tb.reportDate[1];
          let n = "净资产收益率加权(%)";
          return (item.roe = parseFloat(tb[n][tb.reportDate[1]]));
        }
      } catch (e) {}
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
    fmt: (e, item) => {
      if (window["zyzb_" + item.code]) {
        let data = window["zyzb_" + item.code];
        if (item["毛利率(%)"])
          return (item["毛利率(%)"] = parseFloat(
            data["毛利率(%)"][data["reportDate"][1]]
          ));
      }
    },
  },
  {
    label: "资产负债率",
    prop: "资产负债率(%)",
    type: "number",
    fmt: (e, item) => {
      if (window["zyzb_" + item.code]) {
        let data = window["zyzb_" + item.code];
        return (item["资产负债率(%)"] = parseFloat(
          data["资产负债率(%)"][data["reportDate"][1]]
        ));
      }
    },
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
