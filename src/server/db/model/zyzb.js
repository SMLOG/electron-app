const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
    const { defaults } = require("lodash");

    class Zyzb extends Model {}
    Zyzb.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "date": {
        "type": DataTypes.STRING(30),
        "unique": "compositeIndex"
    },
    "jbmgsy": {
        "display": "基本每股收益(元)",
        "type": DataTypes.STRING(30)
    },
    "kfmgsy": {
        "display": "扣非每股收益(元)",
        "type": DataTypes.STRING(30)
    },
    "xsmgsy": {
        "display": "稀释每股收益(元)",
        "type": DataTypes.STRING(30)
    },
    "mgjzc": {
        "display": "每股净资产(元)",
        "type": DataTypes.STRING(30)
    },
    "mggjj": {
        "display": "每股公积金(元)",
        "type": DataTypes.STRING(30)
    },
    "mgwfply": {
        "display": "每股未分配利润(元)",
        "type": DataTypes.STRING(30)
    },
    "mgjyxjl": {
        "display": "每股经营现金流(元)",
        "type": DataTypes.STRING(30)
    },
    "yyzsr": {
        "display": "营业总收入(元)",
        "type": DataTypes.STRING(30)
    },
    "mlr": {
        "display": "毛利润(元)",
        "type": DataTypes.STRING(30)
    },
    "gsjlr": {
        "display": "归属净利润(元)",
        "type": DataTypes.STRING(30)
    },
    "kfjlr": {
        "display": "扣非净利润(元)",
        "type": DataTypes.STRING(30)
    },
    "yyzsrtbzz": {
        "display": "营业总收入同比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "gsjlrtbzz": {
        "display": "归属净利润同比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "kfjlrtbzz": {
        "display": "扣非净利润同比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "yyzsrgdhbzz": {
        "display": "营业总收入滚动环比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "gsjlrgdhbzz": {
        "display": "归属净利润滚动环比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "kfjlrgdhbzz": {
        "display": "扣非净利润滚动环比增长(%)",
        "type": DataTypes.STRING(30)
    },
    "jqjzcsyl": {
        "display": "加权净资产收益率(%)",
        "type": DataTypes.STRING(30)
    },
    "tbjzcsyl": {
        "display": "摊薄净资产收益率(%)",
        "type": DataTypes.STRING(30)
    },
    "tbzzcsyl": {
        "display": "摊薄总资产收益率(%)",
        "type": DataTypes.STRING(30)
    },
    "mll": {
        "display": "毛利率(%)",
        "type": DataTypes.STRING(30)
    },
    "jll": {
        "display": "净利率(%)",
        "type": DataTypes.STRING(30)
    },
    "sjsl": {
        "display": "实际税率(%)",
        "type": DataTypes.STRING(30)
    },
    "yskyysr": {
        "display": "预收款/营业收入",
        "type": DataTypes.STRING(30)
    },
    "xsxjlyysr": {
        "display": "销售现金流/营业收入",
        "type": DataTypes.STRING(30)
    },
    "jyxjlyysr": {
        "display": "经营现金流/营业收入",
        "type": DataTypes.STRING(30)
    },
    "zzczzy": {
        "display": "总资产周转率(次)",
        "type": DataTypes.STRING(30)
    },
    "yszkzzts": {
        "display": "应收账款周转天数(天)",
        "type": DataTypes.STRING(30)
    },
    "chzzts": {
        "display": "存货周转天数(天)",
        "type": DataTypes.STRING(30)
    },
    "zcfzl": {
        "display": "资产负债率(%)",
        "type": DataTypes.STRING(30)
    },
    "ldzczfz": {
        "display": "流动负债/总负债(%)",
        "type": DataTypes.STRING(30)
    },
    "ldbl": {
        "display": "流动比率",
        "type": DataTypes.STRING(30)
    },
    "sdbl": {
        "display": "速动比率",
        "type": DataTypes.STRING(30)
    },
    "REPORTTYPE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTTYPE",
        "unique": "compositeIndex"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTDATETYPE",
        "unique": "compositeIndex"
    },
    "reportDate": {
        "type": DataTypes.STRING(30),
        "unique": "compositeIndex"
    }
}
    ,
      {
        sequelize: db,
        modelName: "zyzb",
      }
    );
    module.exports = Zyzb;
    