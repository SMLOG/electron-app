const { Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*业绩*/
class Yj extends Model {}
Yj.init(
  {
    yj_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SECURITY_CODE: {
      display: "代码",
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "SECURITY_CODE",
    },
    SECURITY_NAME_ABBR: {
      display: "名称",
      type: DataTypes.STRING(10),
      field: "SECURITY_NAME_ABBR",
    },
    TRADE_MARKET_CODE: {
      type: DataTypes.STRING(20),
      field: "TRADE_MARKET_CODE",
    },
    TRADE_MARKET: {
      type: DataTypes.STRING(10),
      field: "TRADE_MARKET",
    },
    SECURITY_TYPE_CODE: {
      type: DataTypes.STRING(10),
      field: "SECURITY_TYPE_CODE",
    },
    SECURITY_TYPE: {
      type: DataTypes.STRING(10),
      field: "SECURITY_TYPE",
    },
    UPDATE_DATE: {
      display: "公告日期",
      type: DataTypes.STRING(10),
      field: "UPDATE_DATE",
    },
    REPORTDATE: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "REPORTDATE",
    },
    BASIC_EPS: {
      display: "每股收益",
      type: DataTypes.DOUBLE,
      field: "BASIC_EPS",
    },
    DEDUCT_BASIC_EPS: {
      type: DataTypes.DOUBLE,
      field: "DEDUCT_BASIC_EPS",
    },
    TOTAL_OPERATE_INCOME: {
      display: "营业收入",
      type: DataTypes.DOUBLE,
      field: "TOTAL_OPERATE_INCOME",
    },
    PARENT_NETPROFIT: {
      display: "净利润",
      type: DataTypes.DOUBLE,
      field: "PARENT_NETPROFIT",
    },
    WEIGHTAVG_ROE: {
      display: "净资产收益率",
      type: DataTypes.DOUBLE,
      field: "WEIGHTAVG_ROE",
    },
    YSTZ: {
      display: "营业收入同比增长",
      type: DataTypes.DOUBLE,
      field: "YSTZ",
    },
    SJLTZ: {
      display: "净利润同比增长",
      type: DataTypes.DOUBLE,
      field: "SJLTZ",
    },
    BPS: {
      display: "每股净资产",
      type: DataTypes.DOUBLE,
      field: "BPS",
    },
    MGJYXJJE: {
      display: "每股现金流量",
      type: DataTypes.DOUBLE,
      field: "MGJYXJJE",
    },
    XSMLL: {
      display: "销售毛利率",
      type: DataTypes.DOUBLE,
      field: "XSMLL",
    },
    YSHZ: {
      display: "季度环比增长",
      type: DataTypes.DOUBLE,
      field: "YSHZ",
    },
    SJLHZ: {
      display: "季度环比增长",
      type: DataTypes.DOUBLE,
      field: "SJLHZ",
    },
    ASSIGNDSCRPT: {
      display: "利润分配",
      type: DataTypes.STRING(50),
      field: "ASSIGNDSCRPT",
    },
    PAYYEAR: {
      type: DataTypes.DOUBLE,
      field: "PAYYEAR",
    },
    PUBLISHNAME: {
      display: "所属行业",
      type: DataTypes.STRING(10),
      field: "PUBLISHNAME",
    },
    ZXGXL: {
      type: DataTypes.DOUBLE,
      field: "ZXGXL",
    },
    NOTICE_DATE: {
      type: DataTypes.STRING(10),
      field: "NOTICE_DATE",
    },
    ORG_CODE: {
      type: DataTypes.STRING(20),
      field: "ORG_CODE",
    },
    TRADE_MARKET_ZJG: {
      type: DataTypes.DOUBLE,
      field: "TRADE_MARKET_ZJG",
    },
    ISNEW: {
      type: DataTypes.DOUBLE,
      field: "ISNEW",
    },
    QDATE: {
      type: DataTypes.STRING(10),
      field: "QDATE",
    },
    DATATYPE: {
      type: DataTypes.STRING(10),
      field: "DATATYPE",
    },
    DATAYEAR: {
      type: DataTypes.DOUBLE,
      field: "DATAYEAR",
    },
    DATEMMDD: {
      type: DataTypes.STRING(10),
      field: "DATEMMDD",
    },
    EITIME: {
      type: DataTypes.STRING(20),
      field: "EITIME",
    },
    SECUCODE: {
      type: DataTypes.STRING(10),
      field: "SECUCODE",
    },
    code: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "code",
    },
  },
  {
    sequelize: db,
    charset: "utf8",
    modelName: "yj",
  }
);
/*
let fields = [];
for (var i in Yj.rawAttributes)
  fields.push(`{
    label: "${Yj.rawAttributes[i].display || Yj.rawAttributes[i].field}",
    prop: "${Yj.rawAttributes[i].field}",
  }`);
console.error(fields.join(",\n"));*/
module.exports = Yj;
