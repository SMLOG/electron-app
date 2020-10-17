const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
const { defaults } = require("lodash");

class Dbfx extends Model {}
Dbfx.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(30),
      unique: "compositeIndex",
    },
    date: {
      type: DataTypes.STRING(30),
      field: "date",
      unique: "compositeIndex",
    },
    jzcsyl: {
      type: DataTypes.STRING(30),
      field: "jzcsyl",
    },
    zzcjll: {
      type: DataTypes.STRING(30),
      field: "zzcjll",
    },
    gsmgsgddjlr: {
      type: DataTypes.STRING(30),
      field: "gsmgsgddjlr",
    },
    qycs: {
      type: DataTypes.STRING(30),
      field: "qycs",
    },
    yyjlrl: {
      type: DataTypes.STRING(30),
      field: "yyjlrl",
    },
    zzczzl: {
      type: DataTypes.STRING(30),
      field: "zzczzl",
    },
    zcfzl: {
      display: "资产负债率(%)",
      type: DataTypes.STRING(30),
      field: "zcfzl",
    },
    jlr: {
      type: DataTypes.STRING(30),
      field: "jlr",
    },
    yysr: {
      type: DataTypes.STRING(30),
      field: "yysr",
    },
    zcze: {
      type: DataTypes.STRING(30),
      field: "zcze",
    },
    fzze: {
      type: DataTypes.STRING(30),
      field: "fzze",
    },
    srze: {
      type: DataTypes.STRING(30),
      field: "srze",
    },
    cbze: {
      type: DataTypes.STRING(30),
      field: "cbze",
    },
    ldzc: {
      type: DataTypes.STRING(30),
      field: "ldzc",
    },
    fldzc: {
      type: DataTypes.STRING(30),
      field: "fldzc",
    },
    yycb: {
      type: DataTypes.STRING(30),
      field: "yycb",
    },
    qjfy: {
      type: DataTypes.STRING(30),
      field: "qjfy",
    },
    hbzj: {
      type: DataTypes.STRING(30),
      field: "hbzj",
    },
    kgcsjrzc: {
      type: DataTypes.STRING(30),
      field: "kgcsjrzc",
    },
    wxzc: {
      type: DataTypes.STRING(30),
      field: "wxzc",
    },
    gyjzbdsy: {
      type: DataTypes.STRING(30),
      field: "gyjzbdsy",
    },
    yysjjfj: {
      type: DataTypes.STRING(30),
      field: "yysjjfj",
    },
    jyxjrzc: {
      type: DataTypes.STRING(30),
      field: "jyxjrzc",
    },
    cyzdqtz: {
      type: DataTypes.STRING(30),
      field: "cyzdqtz",
    },
    kfzc: {
      type: DataTypes.STRING(30),
      field: "kfzc",
    },
    yywsr: {
      type: DataTypes.STRING(30),
      field: "yywsr",
    },
    sdsfy: {
      type: DataTypes.STRING(30),
      field: "sdsfy",
    },
    cwfy: {
      type: DataTypes.STRING(30),
      field: "cwfy",
    },
    yszk: {
      type: DataTypes.STRING(30),
      field: "yszk",
    },
    cqgqtz: {
      type: DataTypes.STRING(30),
      field: "cqgqtz",
    },
    sy: {
      type: DataTypes.STRING(30),
      field: "sy",
    },
    tzsy: {
      type: DataTypes.STRING(30),
      field: "tzsy",
    },
    zcjzss: {
      type: DataTypes.STRING(30),
      field: "zcjzss",
    },
    xsfy: {
      type: DataTypes.STRING(30),
      field: "xsfy",
    },
    yfzk: {
      type: DataTypes.STRING(30),
      field: "yfzk",
    },
    tzxfdc: {
      type: DataTypes.STRING(30),
      field: "tzxfdc",
    },
    cqdtfy: {
      type: DataTypes.STRING(30),
      field: "cqdtfy",
    },
    yywzc: {
      type: DataTypes.STRING(30),
      field: "yywzc",
    },
    glfy: {
      type: DataTypes.STRING(30),
      field: "glfy",
    },
    qtysk: {
      type: DataTypes.STRING(30),
      field: "qtysk",
    },
    gdzc: {
      type: DataTypes.STRING(30),
      field: "gdzc",
    },
    dysdszc: {
      type: DataTypes.STRING(30),
      field: "dysdszc",
    },
    ch: {
      type: DataTypes.STRING(30),
      field: "ch",
    },
    zjgc: {
      type: DataTypes.STRING(30),
      field: "zjgc",
    },
    qtfldzc: {
      type: DataTypes.STRING(30),
      field: "qtfldzc",
    },
    qtldzc: {
      type: DataTypes.STRING(30),
      field: "qtldzc",
    },
  },
  {
    sequelize: db,
    modelName: "dbfx",
  }
);
module.exports = Dbfx;
