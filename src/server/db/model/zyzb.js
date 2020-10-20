const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");

    class Zyzb extends Model {}
    Zyzb.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "date": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "jbmgsy": {
        "display": "基本每股收益(元)",
        "type": DataTypes.DOUBLE
    },
    "kfmgsy": {
        "display": "扣非每股收益(元)",
        "type": DataTypes.DOUBLE
    },
    "xsmgsy": {
        "display": "稀释每股收益(元)",
        "type": DataTypes.DOUBLE
    },
    "mgjzc": {
        "display": "每股净资产(元)",
        "type": DataTypes.DOUBLE
    },
    "mggjj": {
        "display": "每股公积金(元)",
        "type": DataTypes.DOUBLE
    },
    "mgwfply": {
        "display": "每股未分配利润(元)",
        "type": DataTypes.DOUBLE
    },
    "mgjyxjl": {
        "display": "每股经营现金流(元)",
        "type": DataTypes.DOUBLE
    },
    "yyzsr": {
        "display": "营业总收入(元)",
        "type": DataTypes.STRING(10)
    },
    "mlr": {
        "display": "毛利润(元)",
        "type": DataTypes.STRING(10)
    },
    "gsjlr": {
        "display": "归属净利润(元)",
        "type": DataTypes.STRING(10)
    },
    "kfjlr": {
        "display": "扣非净利润(元)",
        "type": DataTypes.STRING(10)
    },
    "yyzsrtbzz": {
        "display": "营业总收入同比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "gsjlrtbzz": {
        "display": "归属净利润同比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "kfjlrtbzz": {
        "display": "扣非净利润同比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "yyzsrgdhbzz": {
        "display": "营业总收入滚动环比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "gsjlrgdhbzz": {
        "display": "归属净利润滚动环比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "kfjlrgdhbzz": {
        "display": "扣非净利润滚动环比增长(%)",
        "type": DataTypes.DOUBLE
    },
    "jqjzcsyl": {
        "display": "加权净资产收益率(%)",
        "type": DataTypes.DOUBLE
    },
    "tbjzcsyl": {
        "display": "摊薄净资产收益率(%)",
        "type": DataTypes.DOUBLE
    },
    "tbzzcsyl": {
        "display": "摊薄总资产收益率(%)",
        "type": DataTypes.DOUBLE
    },
    "mll": {
        "display": "毛利率(%)",
        "type": DataTypes.DOUBLE
    },
    "jll": {
        "display": "净利率(%)",
        "type": DataTypes.DOUBLE
    },
    "sjsl": {
        "display": "实际税率(%)",
        "type": DataTypes.DOUBLE
    },
    "yskyysr": {
        "display": "预收款/营业收入",
        "type": DataTypes.STRING(10)
    },
    "xsxjlyysr": {
        "display": "销售现金流/营业收入",
        "type": DataTypes.DOUBLE
    },
    "jyxjlyysr": {
        "display": "经营现金流/营业收入",
        "type": DataTypes.DOUBLE
    },
    "zzczzy": {
        "display": "总资产周转率(次)",
        "type": DataTypes.DOUBLE
    },
    "yszkzzts": {
        "display": "应收账款周转天数(天)",
        "type": DataTypes.DOUBLE
    },
    "chzzts": {
        "display": "存货周转天数(天)",
        "type": DataTypes.DOUBLE
    },
    "zcfzl": {
        "display": "资产负债率",
        "type": DataTypes.DOUBLE
    },
    "ldzczfz": {
        "display": "流动负债/总负债(%)",
        "type": DataTypes.DOUBLE
    },
    "ldbl": {
        "display": "流动比率",
        "type": DataTypes.DOUBLE
    },
    "sdbl": {
        "display": "速动比率",
        "type": DataTypes.DOUBLE
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTTYPE",
        "unique": "compositeIndex"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE",
        "unique": "compositeIndex"
    },
    "reportDate": {
        "type": DataTypes.STRING(10),
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
    