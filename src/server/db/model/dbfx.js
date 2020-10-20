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
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "date": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "jzcsyl": {
        "type": DataTypes.STRING(10)
    },
    "zzcjll": {
        "type": DataTypes.STRING(10)
    },
    "gsmgsgddjlr": {
        "type": DataTypes.STRING(10)
    },
    "qycs": {
        "type": DataTypes.DOUBLE
    },
    "yyjlrl": {
        "type": DataTypes.STRING(10)
    },
    "zzczzl": {
        "type": DataTypes.STRING(10)
    },
    "zcfzl": {
        "display": "资产负债率(%)",
        "type": DataTypes.STRING(10)
    },
    "jlr": {
        "type": DataTypes.STRING(10)
    },
    "yysr": {
        "type": DataTypes.STRING(10)
    },
    "zcze": {
        "type": DataTypes.STRING(10)
    },
    "fzze": {
        "type": DataTypes.STRING(10)
    },
    "srze": {
        "type": DataTypes.STRING(10)
    },
    "cbze": {
        "type": DataTypes.STRING(10)
    },
    "ldzc": {
        "type": DataTypes.STRING(10)
    },
    "fldzc": {
        "type": DataTypes.STRING(10)
    },
    "yycb": {
        "type": DataTypes.STRING(10)
    },
    "qjfy": {
        "type": DataTypes.STRING(10)
    },
    "hbzj": {
        "type": DataTypes.STRING(10)
    },
    "kgcsjrzc": {
        "type": DataTypes.STRING(10)
    },
    "wxzc": {
        "type": DataTypes.STRING(10)
    },
    "gyjzbdsy": {
        "type": DataTypes.STRING(10)
    },
    "yysjjfj": {
        "type": DataTypes.STRING(10)
    },
    "jyxjrzc": {
        "type": DataTypes.STRING(10)
    },
    "cyzdqtz": {
        "type": DataTypes.STRING(10)
    },
    "kfzc": {
        "type": DataTypes.STRING(10)
    },
    "yywsr": {
        "type": DataTypes.STRING(10)
    },
    "sdsfy": {
        "type": DataTypes.STRING(10)
    },
    "cwfy": {
        "type": DataTypes.STRING(10)
    },
    "yszk": {
        "type": DataTypes.STRING(10)
    },
    "cqgqtz": {
        "type": DataTypes.STRING(10)
    },
    "sy": {
        "type": DataTypes.STRING(10)
    },
    "tzsy": {
        "type": DataTypes.STRING(10)
    },
    "zcjzss": {
        "type": DataTypes.STRING(10)
    },
    "xsfy": {
        "type": DataTypes.STRING(10)
    },
    "yfzk": {
        "type": DataTypes.STRING(10)
    },
    "tzxfdc": {
        "type": DataTypes.STRING(10)
    },
    "cqdtfy": {
        "type": DataTypes.STRING(10)
    },
    "yywzc": {
        "type": DataTypes.STRING(10)
    },
    "glfy": {
        "type": DataTypes.STRING(10)
    },
    "qtysk": {
        "type": DataTypes.STRING(10)
    },
    "gdzc": {
        "type": DataTypes.STRING(10)
    },
    "dysdszc": {
        "type": DataTypes.STRING(10)
    },
    "ch": {
        "type": DataTypes.STRING(10)
    },
    "zjgc": {
        "type": DataTypes.STRING(10)
    },
    "qtfldzc": {
        "type": DataTypes.STRING(10)
    },
    "qtldzc": {
        "type": DataTypes.STRING(10)
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
        modelName: "dbfx",
      }
    );
    module.exports = Dbfx;
    