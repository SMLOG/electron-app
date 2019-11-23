import { getLastReportDate } from "../lib/utils";
import { cache, getCacheData } from "../lib/db";

const reportDate = getLastReportDate();
const fmtPercent = value => {
  if (value) return parseFloat(value).toFixed(2) + "%";
  return value;
};
export const headers = [
  {
    label: "HY",
    prop: "hy",
    type: "string",
    fmt: (e, item) => {
      getCacheData(null, "ind_2" + item.code).then(data => {
        item.hy =
          data &&
          cache[data.f12] &&
          `${cache[data.f12].f14}(${cache[data.f12].f3}%)`;
      });
      return item.hy;
    }
  },
  {
    label: "Now",
    prop: "now",
    type: "number",
    fmt: (e, item) => `${e}(${item.changeP})`
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
    type: "number"
  },
  {
    label: "TO%",
    prop: "turnover",
    type: "number"
  },
  {
    label: "流通亿股",
    prop: "ltg",
    type: "number",
    class: item => {
      return {
        link: true
      };
    },
    click: (item, event, openlink) => {
      openlink(
        item,
        event,
        "http://f10.eastmoney.com/ShareholderResearch/Index?type=web&code={{code}}#"
      );
    }
  },
  {
    label: "流值/总值",
    prop: "lz",
    type: "string",
    fmt: (e, item) => `${e}/${item.zsz}`
  },
  { label: "TTM", prop: "pe_ttm", type: "number" },
  {
    label: "PEG",
    prop: "PEG",
    type: "number",
    fmt: e => e && e.toFixed(2)
  },
  {
    label: "CAGR",
    prop: "zzl3",
    type: "number",

    class: item => {
      return {
        link: true
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
      e && `${parseFloat(e).toFixed(2)}%,${parseFloat(item.zzl2).toFixed(2)}%`
  },
  {
    label: "CP",
    prop: "tbzz",
    type: "number",
    fmt: fmtPercent,
    class: item => {
      if (item.reportDate == reportDate)
        return {
          reportUpdate: true
        };
    }
  },
  { label: "Cash", prop: "xjlzzl", type: "string" },
  {
    label: "Ben",
    prop: "zzl",
    type: "string",
    class: item => {
      return {
        link: true
      };
    },
    click: (item, event, openlink) => {
      let url = `http://stockhtm.finance.qq.com/sstock/ggcx/${item.code.replace(
        /[a-z]/gi,
        ""
      )}.shtml?pgv_ref=fi_quote_my_recent`;
      openlink(item, event, url);
    }
  },
  {
    label: "股息%",
    prop: "GXL",
    type: "number",
    fmt: (e, item) => {
      if (cache["xjfh_" + item.code])
        item.GXL = ((cache["xjfh_" + item.code] / 10 / item.now) * 100).toFixed(
          2
        );
      return item.GXL;
    }
  },
  {
    label: "分红%",
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
    }
  },
  {
    label: "ROE",
    prop: "roe",
    type: "number",
    fmt: (e, item) => {
      try {
        let tb = cache["tb_zycwzb" + item.code];
        if (tb && tb.reportDate) {
          tb.reportDate[1];
          let n = "净资产收益率加权(%)";
          return (item.roe = parseFloat(tb[n][tb.reportDate[1]]));
        }
      } catch (e) {}
    }
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
    }
  },
  {
    label: "毛利率",
    prop: "毛利率(%)",
    type: "number",
    fmt: (e, item) => {
      if (window["zyzb_" + item.code]) {
        let data = window["zyzb_" + item.code];
        return (item["毛利率(%)"] = parseFloat(
          data["毛利率(%)"][data["reportDate"][1]]
        ));
      }
    }
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
    }
  }
];
