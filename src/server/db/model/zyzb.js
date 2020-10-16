const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");

class zyzb extends Model {}
Profit.init(
  {
    id: {
      type: "DataTypes.INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: "DataTypes.STRING(30)",
      unique: "compositeIndex",
    },
    date: {
      type: "DataTypes.STRING(30)",
      field: "date",
      unique: "compositeIndex",
    },
    jbmgsy: {
      display: "基本每股收益(元)",
      type: "DataTypes.STRING(30)",
      field: "jbmgsy",
    },
    kfmgsy: {
      display: "扣非每股收益(元)",
      type: "DataTypes.STRING(30)",
      field: "kfmgsy",
    },
    xsmgsy: {
      display: "稀释每股收益(元)",
      type: "DataTypes.STRING(30)",
      field: "xsmgsy",
    },
    mgjzc: {
      display: "每股净资产(元)",
      type: "DataTypes.STRING(30)",
      field: "mgjzc",
    },
    mggjj: {
      display: "每股公积金(元)",
      type: "DataTypes.STRING(30)",
      field: "mggjj",
    },
    mgwfply: {
      display: "每股未分配利润(元)",
      type: "DataTypes.STRING(30)",
      field: "mgwfply",
    },
    mgjyxjl: {
      display: "每股经营现金流(元)",
      type: "DataTypes.STRING(30)",
      field: "mgjyxjl",
    },
    yyzsr: {
      display: "营业总收入(元)",
      type: "DataTypes.STRING(30)",
      field: "yyzsr",
    },
    mlr: {
      display: "毛利润(元)",
      type: "DataTypes.STRING(30)",
      field: "mlr",
    },
    gsjlr: {
      display: "归属净利润(元)",
      type: "DataTypes.STRING(30)",
      field: "gsjlr",
    },
    kfjlr: {
      display: "扣非净利润(元)",
      type: "DataTypes.STRING(30)",
      field: "kfjlr",
    },
    yyzsrtbzz: {
      display: "营业总收入同比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "yyzsrtbzz",
    },
    gsjlrtbzz: {
      display: "归属净利润同比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "gsjlrtbzz",
    },
    kfjlrtbzz: {
      display: "扣非净利润同比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "kfjlrtbzz",
    },
    yyzsrgdhbzz: {
      display: "营业总收入滚动环比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "yyzsrgdhbzz",
    },
    gsjlrgdhbzz: {
      display: "归属净利润滚动环比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "gsjlrgdhbzz",
    },
    kfjlrgdhbzz: {
      display: "扣非净利润滚动环比增长(%)",
      type: "DataTypes.STRING(30)",
      field: "kfjlrgdhbzz",
    },
    jqjzcsyl: {
      display: "加权净资产收益率(%)",
      type: "DataTypes.STRING(30)",
      field: "jqjzcsyl",
    },
    tbjzcsyl: {
      display: "摊薄净资产收益率(%)",
      type: "DataTypes.STRING(30)",
      field: "tbjzcsyl",
    },
    tbzzcsyl: {
      display: "摊薄总资产收益率(%)",
      type: "DataTypes.STRING(30)",
      field: "tbzzcsyl",
    },
    mll: {
      display: "毛利率(%)",
      type: "DataTypes.STRING(30)",
      field: "mll",
    },
    jll: {
      display: "净利率(%)",
      type: "DataTypes.STRING(30)",
      field: "jll",
    },
    sjsl: {
      display: "实际税率(%)",
      type: "DataTypes.STRING(30)",
      field: "sjsl",
    },
    yskyysr: {
      display: "预收款/营业收入",
      type: "DataTypes.STRING(30)",
      field: "yskyysr",
    },
    xsxjlyysr: {
      display: "销售现金流/营业收入",
      type: "DataTypes.STRING(30)",
      field: "xsxjlyysr",
    },
    jyxjlyysr: {
      display: "经营现金流/营业收入",
      type: "DataTypes.STRING(30)",
      field: "jyxjlyysr",
    },
    zzczzy: {
      display: "总资产周转率(次)",
      type: "DataTypes.STRING(30)",
      field: "zzczzy",
    },
    yszkzzts: {
      display: "应收账款周转天数(天)",
      type: "DataTypes.STRING(30)",
      field: "yszkzzts",
    },
    chzzts: {
      display: "存货周转天数(天)",
      type: "DataTypes.STRING(30)",
      field: "chzzts",
    },
    zcfzl: {
      display: "资产负债率(%)",
      type: "DataTypes.STRING(30)",
      field: "zcfzl",
    },
    ldzczfz: {
      display: "流动负债/总负债(%)",
      type: "DataTypes.STRING(30)",
      field: "ldzczfz",
    },
    ldbl: {
      display: "流动比率",
      type: "DataTypes.STRING(30)",
      field: "ldbl",
    },
    sdbl: {
      display: "速动比率",
      type: "DataTypes.STRING(30)",
      field: "sdbl",
    },
  },
  {
    sequelize: db,
    modelName: "zyzb",
  }
);
module.exports = zyzb;
