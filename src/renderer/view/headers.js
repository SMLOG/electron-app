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
    label: "HY",
    prop: "hy",
    filterable: true,
    type: "string",
    fmt: (e, item) => {
      item._hy = storejs.get(item.code);
      if (item._hy) item.hy = `${item._hy}(${storejs.get(item._hy)}%)`;

      return item.hy;
    },
  },
  {
    label: "Forecast",
    prop: "forecast",
    type: "string",
    title: (item) => {
      return item.forecast_title;
    },
    fmt: (e, item) => {
      getCacheData(null, "Performance forecast_" + item.code).then((data) => {
        item.forecast = data && data[0].forecasttype;
        item.forecast_title = data && data[0].str;
      });
      return item.forecast;
    },
  },
  {
    label: "披露日期",
    prop: "disclosure",
    type: "string",

    fmt: (e, item) => {
      let data = storejs.get(`disclosure_date_${item.code}`);
      if (data) {
        item.disclosure = dateFormat(new Date(data.last), "yyyy-MM-dd");
      }

      return item.disclosure;
    },
  },
  /* {
    label: "V",
    prop: "vol",
    type: "number",
    fmt: (e, item) => {
      return (item.vol = `${((item.volume - item.preVolume) / 100).toFixed(
        0
      )}/${item.bsVols && (item.bsVols[5] / 100).toFixed(0)}`);
    }
  },*/

  {
    label: "52周%",
    prop: "52weekPer",
    type: "number",
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
        "http://f10.eastmoney.com/ShareholderResearch/Index?type=web&code={{code}}"
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
    label: "CAGR",
    prop: "zzl3",
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
        "http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code={{code}}"
      );
    },
    fmt: (e, item) =>
      e && `${parseFloat(e).toFixed(2)}%,${parseFloat(item.zzl2).toFixed(2)}%`,
  },
  {
    label: "CP",
    prop: "tbzz",
    type: "number",
    fmt: fmtPercent,
    class: (item) => {
      if (item.reportDate == reportDate)
        return {
          reportUpdate: true,
        };
    },
  },
  {
    label: "Cash",
    prop: "xjlzzl",
    type: "string",
    click: (item, event, openlink) => {
      let url = `http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=${item.code}#zyzb-0`;
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
      };
    },
    click: (item, event, openlink) => {
      let url = `http://f10.eastmoney.com/OperationsRequired/Index?type=web&code=${item.code}#`;
      openlink(item, event, url);
    },
  },
  {
    label: "息%",
    prop: "GXL",
    type: "number",
    fmt: (e, item) => {
      if (cache["xjfh_" + item.code])
        item.GXL = ((cache["xjfh_" + item.code] / 10 / item.now) * 100).toFixed(
          2
        );
      return item.GXL;
    },
  },
  {
    label: "红%",
    prop: "FHL",
    type: "number",
    fmt: (e, item) => {
      if (cache["xjfh_" + item.code])
        item.FHL = (
          (cache["xjfh_" + item.code] /
            cache["EarningsPerShare_" + item.code] /
            10) *
          100
        ).toFixed(2);
      return item.FHL;
    },
  },
  {
    label: "ROE",
    prop: "roe",
    type: "number",
    click: (item, event, openlink) => {
      let url = `http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=${item.code}#dbfx-0`;
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
