const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*利润表*/
class Lr extends Model {}
Lr.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SECUCODE: {
      type: DataTypes.STRING(10),
      field: "SECUCODE",
    },
    SECURITY_CODE: {
      display: "代码",
      type: DataTypes.DOUBLE,
      field: "SECURITY_CODE",
      unique: "index_unique",
    },
    INDUSTRY_CODE: {
      type: DataTypes.DOUBLE,
      field: "INDUSTRY_CODE",
    },
    ORG_CODE: {
      type: DataTypes.DOUBLE,
      field: "ORG_CODE",
    },
    SECURITY_NAME_ABBR: {
      display: "名称",
      type: DataTypes.STRING(10),
      field: "SECURITY_NAME_ABBR",
    },
    INDUSTRY_NAME: {
      type: DataTypes.STRING(10),
      field: "INDUSTRY_NAME",
    },
    MARKET: {
      type: DataTypes.STRING(10),
      field: "MARKET",
    },
    SECURITY_TYPE_CODE: {
      type: DataTypes.DOUBLE,
      field: "SECURITY_TYPE_CODE",
    },
    TRADE_MARKET_CODE: {
      type: DataTypes.DOUBLE,
      field: "TRADE_MARKET_CODE",
    },
    DATE_TYPE_CODE: {
      type: DataTypes.DOUBLE,
      field: "DATE_TYPE_CODE",
    },
    REPORT_TYPE_CODE: {
      type: DataTypes.DOUBLE,
      field: "REPORT_TYPE_CODE",
    },
    DATA_STATE: {
      type: DataTypes.DOUBLE,
      field: "DATA_STATE",
    },
    NOTICE_DATE: {
      display: "公告日期",
      type: DataTypes.STRING(19),
      field: "NOTICE_DATE",
    },
    REPORT_DATE: {
      type: DataTypes.STRING(19),
      field: "REPORT_DATE",
      unique: "index_unique",
    },
    PARENT_NETPROFIT: {
      display: "归母净利润(元)",
      type: DataTypes.DOUBLE,
      field: "PARENT_NETPROFIT",
    },
    TOTAL_OPERATE_INCOME: {
      display: "营业总收入(元)",
      type: DataTypes.DOUBLE,
      field: "TOTAL_OPERATE_INCOME",
    },
    TOTAL_OPERATE_COST: {
      display: "营业总支出(元)",
      type: DataTypes.DOUBLE,
      field: "TOTAL_OPERATE_COST",
    },
    TOE_RATIO: {
      type: DataTypes.DOUBLE,
      field: "TOE_RATIO",
    },
    OPERATE_COST: {
      display: "营业支出(元)",
      type: DataTypes.DOUBLE,
      field: "OPERATE_COST",
    },
    OPERATE_EXPENSE: {
      display: "营业总支出(元)",
      type: DataTypes.DOUBLE,
      field: "OPERATE_EXPENSE",
    },
    OPERATE_EXPENSE_RATIO: {
      type: DataTypes.DOUBLE,
      field: "OPERATE_EXPENSE_RATIO",
    },
    SALE_EXPENSE: {
      display: "销售费用(元)",
      type: DataTypes.DOUBLE,
      field: "SALE_EXPENSE",
    },
    MANAGE_EXPENSE: {
      display: "管理费用(元)",
      type: DataTypes.DOUBLE,
      field: "MANAGE_EXPENSE",
    },
    FINANCE_EXPENSE: {
      display: "财务费用(元)  ",
      type: DataTypes.DOUBLE,
      field: "FINANCE_EXPENSE",
    },
    OPERATE_PROFIT: {
      display: "营业利润(元)",
      type: DataTypes.DOUBLE,
      field: "OPERATE_PROFIT",
    },
    TOTAL_PROFIT: {
      display: "利润总额(元)",
      type: DataTypes.DOUBLE,
      field: "TOTAL_PROFIT",
    },
    INCOME_TAX: {
      type: DataTypes.DOUBLE,
      field: "INCOME_TAX",
    },
    OPERATE_TAX_ADD: {
      display: "营业税</br>金及附</br>加(元)",
      type: DataTypes.DOUBLE,
      field: "OPERATE_TAX_ADD",
    },
    TOI_RATIO: {
      display: "营业总收入同比(%)",
      type: DataTypes.DOUBLE,
      field: "TOI_RATIO",
    },
    OPERATE_PROFIT_RATIO: {
      type: DataTypes.DOUBLE,
      field: "OPERATE_PROFIT_RATIO",
    },
    PARENT_NETPROFIT_RATIO: {
      display: "净利润同比(%)",
      type: DataTypes.DOUBLE,
      field: "PARENT_NETPROFIT_RATIO",
    },
    DEDUCT_PARENT_NETPROFIT: {
      type: DataTypes.DOUBLE,
      field: "DEDUCT_PARENT_NETPROFIT",
    },
    DPN_RATIO: {
      type: DataTypes.DOUBLE,
      field: "DPN_RATIO",
    },
    code: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
    },
    INTEREST_NI: {
      display: "利息净收入(元)",
      type: DataTypes.DOUBLE,
      field: "INTEREST_NI",
    },
    FEE_COMMISSION_NI: {
      display: "手续费及佣金净收入(元)",
      type: DataTypes.DOUBLE,
      field: "FEE_COMMISSION_NI",
    },
    FCN_CALCULATE: {
      type: DataTypes.DOUBLE,
      field: "FCN_CALCULATE",
    },
    INTEREST_NI_CALCULATE: {
      type: DataTypes.DOUBLE,
      field: "INTEREST_NI_CALCULATE",
    },
    OPERATE_INCOME: {
      display: "营业总收入(元)",
      type: DataTypes.DOUBLE,
      field: "OPERATE_INCOME",
    },
    INTEREST_NI_RATIO: {
      type: DataTypes.DOUBLE,
      field: "INTEREST_NI_RATIO",
    },
    MANAGE_EXPENSE_BANK: {
      display: "管理费用(元)",
      type: DataTypes.DOUBLE,
      field: "MANAGE_EXPENSE_BANK",
    },
    FCN_RATIO: {
      type: DataTypes.DOUBLE,
      field: "FCN_RATIO",
    },
  },
  {
    sequelize: db,
    charset: "utf8",
    modelName: "lr",
  }
);
module.exports = Lr;
