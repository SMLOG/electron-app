export const YJ_KEY_MAP = {
  SECURITY_CODE: "代码",
  SECURITY_NAME_ABBR: "名称",
  BASIC_EPS: "每股收益",
  TOTAL_OPERATE_INCOME: "营业收入",
  YSTZ: "营业收入同比增长",
  YSHZ: "季度环比增长",
  PARENT_NETPROFIT: "净利润",
  SJLTZ: "净利润同比增长",
  SJLHZ: "季度环比增长",
  BPS: "每股净资产",
  WEIGHTAVG_ROE: "净资产收益率",
  MGJYXJJE: "每股现金流量",
  XSMLL: "销售毛利率",
  UPDATE_DATE: "公告日期",
  ASSIGNDSCRPT: "利润分配",
  UPDATE_DATE: "公告日期",
  PUBLISHNAME: "所属行业",
  UPDATE_DATE: "公告日期",
  ASSIGNDSCRPT: "利润分配",
  PUBLISHNAME: "所属行业",
  UPDATE_DATE: "公告日期",
};

export function mapKeys(arr, keyMap) {
  let ret = [];
  for (let i in arr) {
    let it = {};
    for (var k in arr[i]) {
      it[keyMap[k]] = arr[i][k];
    }
    ret.push(it);
  }
  return ret;
}
