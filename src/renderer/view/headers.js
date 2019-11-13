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
  {
    label: "HL",
    prop: "hl",
    type: "number",
    fmt: (e, item) =>
      (item.hl = `${(item.high - item.preClose).toFixed(2)},${(
        item.low - item.preClose
      ).toFixed(2)}`)
  },
  {
    label: "V",
    prop: "vol",
    type: "number",
    fmt: (e, item) => {
      return (item.vol = `${((item.volume - item.preVolume) / 100).toFixed(
        0
      )}/${item.bsVols && (item.bsVols[5] / 100).toFixed(0)}`);
    }
  },
  {
    label: "TO%",
    prop: "turnover",
    type: "number"
  },

  {
    label: "LZ/ZZ",
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
  { label: "Ben", prop: "zzl", type: "string" },
  {
    label: "净利率",
    prop: "净利率(%)",
    type: "number",
    fmt: (e, item) => {
      if (window["zyzb_" + item.code]) {
        let data = window["zyzb_" + item.code];
        return data["净利率(%)"][data["reportDate"][1]];
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
        return data["毛利率(%)"][data["reportDate"][1]];
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
        return data["资产负债率(%)"][data["reportDate"][1]];
      }
    }
  },
  {
    label: "ROE",
    prop: "roe",
    type: "string",
    fmt: (e, item) => {
      try {
        let tb = cache["tb_zycwzb" + item.code];
        if (tb && tb.reportDate) {
          tb.reportDate[1];
          let n = "净资产收益率加权(%)";
          return (item.roe = `${tb[n][tb.reportDate[1]]},${
            tb[n][tb.reportDate[5]]
          },${tb[n][tb.reportDate[9]]}`);
        }
      } catch (e) {}
    }
  }
];
