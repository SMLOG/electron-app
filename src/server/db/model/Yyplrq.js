const { Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*预约披露日期列表*/
class Yyplrq extends Model {}
Yyplrq.init(
  {
    yyplrq_id: {
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
    REPORT_TYPE: {
      type: DataTypes.STRING(10),
      field: "REPORT_TYPE",
    },
    REPORT_YEAR: {
      type: DataTypes.STRING(10),
      field: "REPORT_YEAR",
    },
    FIRST_APPOINT_DATE: {
      display: "首次预约时间",
      type: DataTypes.STRING(10),
      field: "FIRST_APPOINT_DATE",
    },
    FIRST_CHANGE_DATE: {
      display: "一次变更时间",
      type: DataTypes.STRING(10),
      field: "FIRST_CHANGE_DATE",
    },
    SECOND_CHANGE_DATE: {
      display: "二次变更时间",
      type: DataTypes.STRING,
      field: "SECOND_CHANGE_DATE",
    },
    THIRD_CHANGE_DATE: {
      display: "三次变更时间",
      type: DataTypes.STRING,
      field: "THIRD_CHANGE_DATE",
    },
    ACTUAL_PUBLISH_DATE: {
      display: "实际披露时间",
      type: DataTypes.STRING(10),
      field: "ACTUAL_PUBLISH_DATE",
    },
    SECURITY_TYPE_CODE: {
      type: DataTypes.STRING(10),
      field: "SECURITY_TYPE_CODE",
    },
    SECURITY_TYPE: {
      type: DataTypes.STRING(10),
      field: "SECURITY_TYPE",
    },
    TRADE_MARKET_CODE: {
      type: DataTypes.STRING(20),
      field: "TRADE_MARKET_CODE",
    },
    TRADE_MARKET: {
      type: DataTypes.STRING(10),
      field: "TRADE_MARKET",
    },
    REPORT_DATE: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "REPORT_DATE",
    },
    APPOINT_PUBLISH_DATE: {
      type: DataTypes.STRING(10),
      field: "APPOINT_PUBLISH_DATE",
    },
    RESIDUAL_DAYS: {
      type: DataTypes.STRING,
      field: "RESIDUAL_DAYS",
    },
    REPORT_TYPE_NAME: {
      type: DataTypes.STRING(10),
      field: "REPORT_TYPE_NAME",
    },
    IS_PUBLISH: {
      type: DataTypes.STRING(10),
      field: "IS_PUBLISH",
    },
    MARKET: {
      type: DataTypes.STRING(10),
      field: "MARKET",
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
    modelName: "yyplrq",
  }
);
module.exports = Yyplrq;
