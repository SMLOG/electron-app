const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*业绩快报*/
    class Yjkb extends Model {}
    Yjkb.init(
      {
    "yjkb_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITY_CODE": {
        "display": "代码",
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "SECURITY_CODE"
    },
    "SECURITY_NAME_ABBR": {
        "display": "名称",
        "type": DataTypes.STRING(10),
        "field": "SECURITY_NAME_ABBR"
    },
    "TRADE_MARKET": {
        "type": DataTypes.STRING(10),
        "field": "TRADE_MARKET"
    },
    "TRADE_MARKET_CODE": {
        "type": DataTypes.STRING(20),
        "field": "TRADE_MARKET_CODE"
    },
    "SECURITY_TYPE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITY_TYPE"
    },
    "SECURITY_TYPE_CODE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITY_TYPE_CODE"
    },
    "UPDATE_DATE": {
        "display": "公告日期",
        "type": DataTypes.STRING(10),
        "field": "UPDATE_DATE"
    },
    "REPORT_DATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "REPORT_DATE"
    },
    "BASIC_EPS": {
        "display": "每股收益",
        "type": DataTypes.DOUBLE,
        "field": "BASIC_EPS"
    },
    "TOTAL_OPERATE_INCOME": {
        "display": "营业收入",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OPERATE_INCOME"
    },
    "TOTAL_OPERATE_INCOME_SQ": {
        "display": "去年同期营业收入",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OPERATE_INCOME_SQ"
    },
    "PARENT_NETPROFIT": {
        "display": "净利润",
        "type": DataTypes.DOUBLE,
        "field": "PARENT_NETPROFIT"
    },
    "PARENT_NETPROFIT_SQ": {
        "display": "净利润去年同期",
        "type": DataTypes.DOUBLE,
        "field": "PARENT_NETPROFIT_SQ"
    },
    "PARENT_BVPS": {
        "display": "每股净资产",
        "type": DataTypes.DOUBLE,
        "field": "PARENT_BVPS"
    },
    "WEIGHTAVG_ROE": {
        "display": "净资产收益率",
        "type": DataTypes.DOUBLE,
        "field": "WEIGHTAVG_ROE"
    },
    "YSTZ": {
        "display": "营业收入同比增长",
        "type": DataTypes.DOUBLE,
        "field": "YSTZ"
    },
    "JLRTBZCL": {
        "display": "净利润同比增长",
        "type": DataTypes.DOUBLE,
        "field": "JLRTBZCL"
    },
    "DJDYSHZ": {
        "display": "季度环比增长",
        "type": DataTypes.DOUBLE,
        "field": "DJDYSHZ"
    },
    "DJDJLHZ": {
        "display": "季度环比增长",
        "type": DataTypes.DOUBLE,
        "field": "DJDJLHZ"
    },
    "PUBLISHNAME": {
        "display": "所属行业",
        "type": DataTypes.STRING(10),
        "field": "PUBLISHNAME"
    },
    "ORG_CODE": {
        "type": DataTypes.STRING(20),
        "field": "ORG_CODE"
    },
    "NOTICE_DATE": {
        "type": DataTypes.STRING(10),
        "field": "NOTICE_DATE"
    },
    "QDATE": {
        "type": DataTypes.STRING(10),
        "field": "QDATE"
    },
    "DATATYPE": {
        "type": DataTypes.STRING(10),
        "field": "DATATYPE"
    },
    "MARKET": {
        "type": DataTypes.DOUBLE,
        "field": "MARKET"
    },
    "ISNEW": {
        "type": DataTypes.DOUBLE,
        "field": "ISNEW"
    },
    "EITIME": {
        "type": DataTypes.STRING(20),
        "field": "EITIME"
    },
    "SECUCODE": {
        "type": DataTypes.STRING(10),
        "field": "SECUCODE"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "yjkb",
      }
    );
    module.exports = Yjkb;
    