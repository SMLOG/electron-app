export const BasicFieldMap = {
  jbmgsy: "基本每股收益(元)",
  kfmgsy: "扣非每股收益(元)",
  xsmgsy: "稀释每股收益(元)",
  mgjzc: "每股净资产(元)",
  mggjj: "每股公积金(元)",
  mgwfply: "每股未分配利润(元)",
  mgjyxjl: "每股经营现金流(元)",
  yyzsr: "营业总收入(元)",
  mlr: "毛利润(元)",
  gsjlr: "归属净利润(元)",
  kfjlr: "扣非净利润(元)",
  yyzsrtbzz: "营业总收入同比增长(%)",
  gsjlrtbzz: "归属净利润同比增长(%)",
  kfjlrtbzz: "扣非净利润同比增长(%)",
  yyzsrgdhbzz: "营业总收入滚动环比增长(%)",
  gsjlrgdhbzz: "归属净利润滚动环比增长(%)",
  kfjlrgdhbzz: "扣非净利润滚动环比增长(%)",
  jqjzcsyl: "加权净资产收益率(%)",
  tbjzcsyl: "摊薄净资产收益率(%)",
  tbzzcsyl: "摊薄总资产收益率(%)",
  mll: "毛利率(%)",
  jll: "净利率(%)",
  sjsl: "实际税率(%)",
  yskyysr: "预收款/营业收入",
  xsxjlyysr: "销售现金流/营业收入",
  jyxjlyysr: "经营现金流/营业收入",
  zzczzy: "总资产周转率(次)",
  yszkzzts: "应收账款周转天数(天)",
  chzzts: "存货周转天数(天)",
  zcfzl: "资产负债率(%)",
  ldzczfz: "流动负债/总负债(%)",
  ldbl: "流动比率",
  sdbl: "速动比率",
};

export function mapKeys(item, keyMap) {
  let it = {};
  for (var k in item) {
    it[keyMap[k] || k] = item[k];
  }
  return it;
}

export function toReadable(mapList, keyMap) {
  let retMapList = {};
  for (let code of Object.keys(mapList)) {
    let it = {};
    let item = mapList[code];
    for (var k in item) {
      it[keyMap[k] || k] = item[k];
    }
    retMapList[code] = it;
  }
  return retMapList;
}

export function compressToArray(mapList, keyMap) {
  let retArr = [];
  for (let code of Object.keys(mapList)) {
    let item = mapList[code];

    if (retArr.length == 0) {
      retArr.push(
        ["code"].concat(Object.keys(item).map((e) => keyMap[e] || e))
      );
    }
    retArr.push([code].concat(Object.values(item)));
  }
  return retArr;
}
export function decompressToMapList(arr) {
  let retMapList = {};
  if (arr.length > 1) {
    let keys = arr[0];
    for (let i = 1; i < arr.length; i++) {
      let item = {};
      retMapList[arr[i][0]] = item;
      for (let j = 0; j < keys.length; j++) {
        item[keys[j]] = arr[i][j];
      }
    }
  }

  return retMapList;
}
