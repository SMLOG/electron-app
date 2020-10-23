const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*业绩预告*/
    class Yjyg extends Model {}
    Yjyg.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITY_CODE": {
        "display": "代码",
        "type": DataTypes.DOUBLE,
        "field": "SECURITY_CODE",
        "unique": "index_unique"
    },
    "SECURITY_NAME_ABBR": {
        "display": "名称",
        "type": DataTypes.STRING(10),
        "field": "SECURITY_NAME_ABBR"
    },
    "NOTICE_DATE": {
        "display": "公告日期",
        "type": DataTypes.STRING(19),
        "field": "NOTICE_DATE"
    },
    "REPORTDATE": {
        "type": DataTypes.STRING(19),
        "field": "REPORTDATE",
        "unique": "index_unique"
    },
    "FORECASTL": {
        "display": "预计净利润",
        "type": DataTypes.DOUBLE,
        "field": "FORECASTL"
    },
    "FORECASTT": {
        "type": DataTypes.DOUBLE,
        "field": "FORECASTT"
    },
    "INCREASEL": {
        "display": "业绩变动幅度",
        "type": DataTypes.DOUBLE,
        "field": "INCREASEL"
    },
    "INCREASET": {
        "type": DataTypes.DOUBLE,
        "field": "INCREASET"
    },
    "FORECASTCONTENT": {
        "type": DataTypes.STRING(98),
        "field": "FORECASTCONTENT"
    },
    "CHANGEREASONDSCRPT": {
        "type": DataTypes.TEXT,
        "field": "CHANGEREASONDSCRPT"
    },
    "FORECASTTYPE": {
        "display": "预告类型",
        "type": DataTypes.STRING(10),
        "field": "FORECASTTYPE"
    },
    "YEAREARLIER": {
        "display": "上年同期净利润",
        "type": DataTypes.DOUBLE,
        "field": "YEAREARLIER"
    },
    "TRADE_MARKET": {
        "type": DataTypes.STRING(10),
        "field": "TRADE_MARKET"
    },
    "TRADE_MARKET_CODE": {
        "type": DataTypes.DOUBLE,
        "field": "TRADE_MARKET_CODE"
    },
    "SECURITY_TYPE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITY_TYPE"
    },
    "SECURITY_TYPE_CODE": {
        "type": DataTypes.DOUBLE,
        "field": "SECURITY_TYPE_CODE"
    },
    "PUBLISHNAME": {
        "type": DataTypes.STRING(10),
        "field": "PUBLISHNAME"
    },
    "ORG_CODE": {
        "type": DataTypes.DOUBLE,
        "field": "ORG_CODE"
    },
    "INCREASEJZ": {
        "type": DataTypes.DOUBLE,
        "field": "INCREASEJZ"
    },
    "FORECASTJZ": {
        "type": DataTypes.DOUBLE,
        "field": "FORECASTJZ"
    },
    "FORECASTQK": {
        "type": DataTypes.STRING(10),
        "field": "FORECASTQK"
    },
    "ISLATEST": {
        "type": DataTypes.STRING(10),
        "field": "ISLATEST"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "yjyg",
      }
    );
    module.exports = Yjyg;
    