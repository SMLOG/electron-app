import { fmtNumber, fmtPercent } from "../lib/utils";
import { getFields } from "../store/modules/suspension";
import _ from "lodash";

export let headers = [
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
    prop: "净利率",
    type: "number",
    fmt: fmtPercent,
  },
  {
    label: "毛利率",
    prop: "毛利率",
    type: "number",
    fmt: fmtPercent,
  },
  {
    label: "营收增长率",
    prop: "营收增长率",
    type: "number",
    fmt: fmtPercent,
    class: (item, val) => {
      return {
        bad: val < 0,
      };
    },
  },
  {
    label: "EPS",
    prop: "基本每股收益",
    type: "number",
    fmt: fmtNumber,
  },

  {
    cp: "Field",
    label: "ROE",
    prop: "近3年净资产收益率",
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
