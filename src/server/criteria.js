import { get } from "./data";
export const criteria = {
  scope: {},
  basic: {
    roe: {
      label: "净资产收益率 ROE",
      _enable: false,
    },
    roa: {
      label: "总资产收益率 ROA",
      _enable: false,
    },
    gpm: {
      label: "毛利率 GPM",
      _enable: false,
    },
    epsgr: {
      label: "利润增长率",
      _enable: false,
    },
    dar: {
      label: "资产负债比",
      _enable: false,
    },
    pe: {
      label: "市盈率 PE",
      order: 1,
      _value1: 0,
      _value2: 60,
      _enable: true,
      is: function (item) {
        return (
          (item.pe_ttm || item.pe) > (this._value1 || Number.MIN_VALUE) &&
          (item.pe_ttm || item.pe) < (this._value2 || Number.MAX_VALUE)
        );
      },
    },
    pb: {
      label: "市净率 PB",
      _enable: false,
    },
    peg: {
      label: "市盈增长比率 PEG",
      order: 2,
      _enable: true,
      _value1: 0,
      _value2: 2,
      is: async function (e) {
        let peg = await get(e, "PEG");
        console.log(`${e.code} ${peg} ${e.pe_ttm}`);
        if (
          (peg > (this._value1 || Number.MIN_VALUE) &&
            peg < (this._value2 || Number.MAX_VALUE)) ||
          e.pe_ttm < 20
        ) {
          return true;
        }
      },
    },

    latest_price: {
      label: "股价",
      order: 0,
      is: function (e) {
        return (
          e.now >= (this._value1 || Number.MIN_VALUE) &&
          e.now <= (this._value2 || Number.MAX_VALUE)
        );
      },
      _enable: false,
    },
    others: {
      label: "Others",
      order: 0,
      is: function (item) {
        return (
          item.lz > 100 && item.zf60 < 100 && item.name.indexOf("ST") == -1
        );
      },
      _enable: true,
    },
  },
};

const isTypeFun = function (t) {
  return function (e) {
    return {}.toString.call(e) == "[object " + t + "]";
  };
};
const isObject = isTypeFun("Object");

function copy(target, src) {
  for (let k in src) {
    if (src.hasOwnProperty(k)) {
      if (isObject(target[k]) && isObject(src[k])) copy(target[k], src[k]);
      else if (k[0] == "_") target[k] = src[k];
    }
  }
  return target;
}
export function getCriterias() {
  return criteria;
}
//筛选函数
let recursivFiltersSync = (item, filters) => {
  if (filters.length == 0) return true;
  let f = filters.pop();
  return f.is(item) && recursivFiltersSync(item, filters);
};
let recursivFiltersAsync = async (item, filters) => {
  if (filters.length == 0) return true;
  let f = filters.pop();
  return (await f.is(item)) && (await recursivFiltersAsync(item, filters));
};
let recursivFiltersTopSync = (item, filters) => {
  if (filters.length == 0) return true;
  let f = filters.pop();
  return (
    recursivFiltersSync(item, f) ||
    (filters.length > 0 && recursivFiltersTopSync(item, filters))
  );
};

let recursivFiltersTopAsync = async (item, filters) => {
  if (filters.length == 0) return true;
  let f = filters.pop();
  return (
    (await recursivFiltersAsync(item, f)) ||
    (filters.length > 0 && (await recursivFiltersTopAsync(item, filters)))
  );
};
//基本面筛选
export async function getFilterList(datalist) {
  let crs = getCriterias();
  let ccArrList = [crs].map((cr) => {
    return []
      .concat(Object.values(cr.scope))
      .concat(Object.values(cr.basic))
      .filter((e) => e && e._enable);
  });

  datalist = datalist.filter((item) =>
    recursivFiltersTopSync(
      item,
      ccArrList.map((a) => a.filter((e) => e.order == 0))
    )
  );
  console.log("0:", datalist);

  datalist = datalist.filter((item) =>
    recursivFiltersTopSync(
      item,
      ccArrList.map((a) => a.filter((e) => e.order == 1))
    )
  );
  console.log("1:", datalist);

  let ret = [];
  for (let i = 0; i < datalist.length; i++) {
    let item = datalist[i];
    try {
      if (
        await recursivFiltersTopAsync(
          item,
          ccArrList.map((a) => a.filter((e) => e.order == 2))
        )
      ) {
        ret.push(item);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return ret;
}
