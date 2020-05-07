import storejs from "storejs";
import { getCacheData } from "./db";
import { loadReports } from "./getTable";
export const criteria = {
  scope: {
    market: {
      name: "market",
      op: "equal",
      label: "市场",
      values: { ALL: "所有", A: "A股", B: "B股" },
    },
    exchange: {
      name: "exchange",
      op: "equal",
      label: "交易所",
      values: { ALL: "所有", SH: "上海证券交易所", SZ: "深圳证券交易所" },
    },
    board: {
      name: "board",
      op: "equal",
      label: "板块",
      values: {
        ALL: "所有板块",
        MAIN_BOARD: "主板",
        SMALL_AND_MEDIUM_ENTERPRISES: "中小板",
        CHINEXT: "创业板",
      },
    },
    industry_classification_id: {
      name: "industry_classification_id",
      op: "startWith",
      label: "行业",
      values: {
        ALL: "所有行业",
        A: "农、林、牧、渔业",
        A01: "  农业",
        A02: "  林业",
        A03: "  畜牧业",
        A04: "  渔业",
        A05: "  农、林、牧、渔服务业",
        B: "采矿业",
        B06: "  煤炭开采和洗选业",
        B07: "  石油和天然气开采业",
        B08: "  黑色金属矿采选业",
        B09: "  有色金属矿采选业",
        B10: "  非金属矿采选业",
        B11: "  开采辅助活动",
        B12: "  其他采矿业",
        C: "制造业",
        C0: "  食品、饮料",
        C1: "  纺织、服装、皮毛",
        C13: "  农副食品加工业",
        C14: "  食品制造业",
        C15: "  酒、饮料和精制茶制造业",
        C16: "  烟草制品业",
        C17: "  纺织业",
        C18: "  纺织服装、服饰业",
        C19: "  皮革、毛皮、羽毛及其制品和制鞋业",
        C2: "  木材、家具",
        C20: "  木材加工和木、竹、藤、棕、草制品业",
        C21: "  家具制造业",
        C22: "  造纸和纸制品业",
        C23: "  印刷和记录媒介复制业",
        C24: "  文教、工美、体育和娱乐用品制造业",
        C25: "  石油加工、炼焦和核燃料加工业",
        C26: "  化学原料和化学制品制造业",
        C27: "  医药制造业",
        C28: "  化学纤维制造业",
        C29: "  橡胶和塑料制品业",
        C3: "  造纸、印刷",
        C30: "  非金属矿物制品业",
        C31: "  黑色金属冶炼和压延加工业",
        C32: "  有色金属冶炼和压延加工业",
        C33: "  金属制品业",
        C34: "  通用设备制造业",
        C35: "  专用设备制造业",
        C36: "  汽车制造业",
        C37: "  铁路、船舶、航空航天和其他运输设备制造业",
        C38: "  电气机械和器材制造业",
        C39: "  计算机、通信和其他电子设备制造业",
        C4: "  石油、化学、塑胶、塑",
        C40: "  仪器仪表制造业",
        C41: "  其他制造业",
        C42: "  废弃资源综合利用业",
        C43: "  金属制品、机械和设备修理业",
        C5: "  电子",
        C6: "  金属、非金属",
        C7: "  机械、设备、仪表",
        C8: "  医药、生物制品",
        D: "电力、热力、燃气及水生产和供应业",
        D44: "  电力、热力生产和供应业",
        D45: "  燃气生产和供应业",
        D46: "  水的生产和供应业",
        E: "建筑业",
        E47: "  房屋建筑业",
        E48: "  土木工程建筑业",
        E49: "  建筑安装业",
        E50: "  建筑装饰和其他建筑业",
        F: "批发和零售业",
        F51: "  批发业",
        F52: "  零售业",
        G: "交通运输、仓储和邮政业",
        G53: "  铁路运输业",
        G54: "  道路运输业",
        G55: "  水上运输业",
        G56: "  航空运输业",
        G57: "  管道运输业",
        G58: "  装卸搬运和运输代理业",
        G59: "  仓储业",
        G60: "  邮政业",
        H: "住宿和餐饮业",
        H61: "  住宿业",
        H62: "  餐饮业",
        I: "信息传输、软件和信息技术服务业",
        I63: "  电信、广播电视和卫星传输服务",
        I64: "  互联网和相关服务",
        I65: "  软件和信息技术服务业",
        J: "金融业",
        J66: "  货币金融服务",
        J67: "  资本市场服务",
        J68: "  保险业",
        J69: "  其他金融业",
        K: "房地产业",
        K70: "  房地产业",
        L: "租赁和商务服务业",
        L71: "  租赁业",
        L72: "  商务服务业",
        M: "科学研究和技术服务业",
        M73: "  研究和试验发展",
        M74: "  专业技术服务业",
        M75: "  科技推广和应用服务业",
        N: "水利、环境和公共设施管理业",
        N76: "  水利管理业",
        N77: "  生态保护和环境治理业",
        N78: "  公共设施管理业",
        O: "居民服务、修理和其他服务业",
        O79: "  居民服务业",
        O80: "  机动车、电子产品和日用产品修理业",
        O81: "  其他服务业",
        P: "教育",
        P82: "  教育",
        Q: "卫生和社会工作",
        Q83: "  卫生",
        Q84: "  社会工作",
        R: "文化、体育和娱乐业",
        R85: "  新闻和出版业",
        R86: "  广播、电视、电影和影视录音制作业",
        R87: "  文化艺术业",
        R88: "  体育",
        R89: "  娱乐业",
        S: "综合",
        S90: "  综合",
      },
    },
  },
  basic: {
    roe: {
      name: "roe",
      op: "between",
      label: "净资产收益率 ROE",
      unit: "%",
      get: async function(item) {
        let tb = await getCacheData(null, `tb_zycwzb${item.code}`);
        if (tb && tb.reportDate) {
          tb.reportDate[1];
          let n = "净资产收益率加权(%)";
          return (item.roe = parseFloat(tb[n][tb.reportDate[1]]));
        }
      },
    },
    roa: {
      name: "roa",
      op: "between",
      label: "总资产收益率 ROA",
      unit: "%",
    },
    gpm: {
      name: "gpm",
      op: "between",
      label: "毛利率 GPM",
      unit: "%",
    },
    epsgr: {
      name: "epsgr",
      op: "between",
      label: "利润增长率",
      unit: "%",
    },
    dar: {
      name: "dar",
      op: "between",
      label: "资产负债比",
      unit: "%",
    },
    pe: {
      name: "pe",
      op: "between",
      label: "市盈率 PE",
      unit: "倍",
      order: 1,
      is: function(item) {
        return (
          (item.pe_ttm || item.pe) > (this._value1 || Number.MIN_VALUE) &&
          (item.pe_ttm || item.pe) < (this._value2 || Number.MAX_VALUE)
        );
      },
    },
    pb: {
      name: "pb",
      op: "between",
      label: "市净率 PB",
      unit: "倍",
    },
    peg: {
      name: "peg",
      op: "between",
      label: "市盈增长比率 PEG",
      unit: "倍",
      order: 2,
      is: async function(e) {
        await loadReports(e);
        if (
          e.PEG > (this._value1 || Number.MIN_VALUE) &&
          e.PEG < (this._value2 || Number.MAX_VALUE) &&
          e.pe_ttm > 0 &&
          e.pe_ttm < 40 /*&&
          e.tbzz > 0*/
        ) {
          return true;
        }
      },
    },
    ev_ebit: {
      name: "ev_ebit",
      op: "between",
      label: "企业价值倍数 EV/EBIT",
      unit: "倍",
    },
    ps: {
      name: "ps",
      op: "between",
      label: "市销率 PS",
      unit: "倍",
    },
    avg_dividend_yield_ratio: {
      name: "avg_dividend_yield_ratio",
      op: "between",
      label: "股息率(平均)",
      unit: "%",
    },
    market_value: {
      name: "market_value",
      op: "between",
      label: "市值",
      unit: "亿",
    },
    latest_price: {
      name: "latest_price",
      op: "between",
      label: "股价",
      unit: "元",
    },
    others: {
      name: "others",
      label: "Others",
      unit: "",
      order: 0,
      is: function(item) {
        let d = new Date();
        d.setFullYear(d.getFullYear() - 3);
        return (
          item.lz > 100 &&
          // e.zf60 > 0 &&
          //  e.firstDay <= lastyearStr &&
          item.zf60 < 100 &&
          item.name.indexOf("ST") == -1
          //&& e.sz3
        );
      },
    },
  },
};

const isTypeFun = function(t) {
  return function(e) {
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
  let criterias = storejs.get("criterias") || [{}];
  for (let i = 0; i < criterias.length; i++) {
    criterias[i] = copy(Object.assign({}, criteria), criterias[i]);
  }
  return criterias;
}
window.getCriterias = getCriterias;
export function saveCriterias(cs) {
  storejs.set("criterias", cs);
}
