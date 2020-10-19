const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
    const { defaults } = require("lodash");

    class Dbfx extends Model {}
    Dbfx.init(
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
    "jzcsyl": {
        "type": DataTypes.STRING(30)
    },
    "zzcjll": {
        "type": DataTypes.STRING(30)
    },
    "gsmgsgddjlr": {
        "type": DataTypes.STRING(30)
    },
    "qycs": {
        "type": DataTypes.STRING(30)
    },
    "yyjlrl": {
        "type": DataTypes.STRING(30)
    },
    "zzczzl": {
        "type": DataTypes.STRING(30)
    },
    "zcfzl": {
        "display": "资产负债率(%)",
        "type": DataTypes.STRING(30)
    },
    "jlr": {
        "type": DataTypes.STRING(30)
    },
    "yysr": {
        "type": DataTypes.STRING(30)
    },
    "zcze": {
        "type": DataTypes.STRING(30)
    },
    "fzze": {
        "type": DataTypes.STRING(30)
    },
    "srze": {
        "type": DataTypes.STRING(30)
    },
    "cbze": {
        "type": DataTypes.STRING(30)
    },
    "ldzc": {
        "type": DataTypes.STRING(30)
    },
    "fldzc": {
        "type": DataTypes.STRING(30)
    },
    "yycb": {
        "type": DataTypes.STRING(30)
    },
    "qjfy": {
        "type": DataTypes.STRING(30)
    },
    "hbzj": {
        "type": DataTypes.STRING(30)
    },
    "kgcsjrzc": {
        "type": DataTypes.STRING(30)
    },
    "wxzc": {
        "type": DataTypes.STRING(30)
    },
    "gyjzbdsy": {
        "type": DataTypes.STRING(30)
    },
    "yysjjfj": {
        "type": DataTypes.STRING(30)
    },
    "jyxjrzc": {
        "type": DataTypes.STRING(30)
    },
    "cyzdqtz": {
        "type": DataTypes.STRING(30)
    },
    "kfzc": {
        "type": DataTypes.STRING(30)
    },
    "yywsr": {
        "type": DataTypes.STRING(30)
    },
    "sdsfy": {
        "type": DataTypes.STRING(30)
    },
    "cwfy": {
        "type": DataTypes.STRING(30)
    },
    "yszk": {
        "type": DataTypes.STRING(30)
    },
    "cqgqtz": {
        "type": DataTypes.STRING(30)
    },
    "sy": {
        "type": DataTypes.STRING(30)
    },
    "tzsy": {
        "type": DataTypes.STRING(30)
    },
    "zcjzss": {
        "type": DataTypes.STRING(30)
    },
    "xsfy": {
        "type": DataTypes.STRING(30)
    },
    "yfzk": {
        "type": DataTypes.STRING(30)
    },
    "tzxfdc": {
        "type": DataTypes.STRING(30)
    },
    "cqdtfy": {
        "type": DataTypes.STRING(30)
    },
    "yywzc": {
        "type": DataTypes.STRING(30)
    },
    "glfy": {
        "type": DataTypes.STRING(30)
    },
    "qtysk": {
        "type": DataTypes.STRING(30)
    },
    "gdzc": {
        "type": DataTypes.STRING(30)
    },
    "dysdszc": {
        "type": DataTypes.STRING(30)
    },
    "ch": {
        "type": DataTypes.STRING(30)
    },
    "zjgc": {
        "type": DataTypes.STRING(30)
    },
    "qtfldzc": {
        "type": DataTypes.STRING(30)
    },
    "qtldzc": {
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
        modelName: "dbfx",
      }
    );
    module.exports = Dbfx;
    