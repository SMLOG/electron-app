const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*解禁*/
    class Xsjj extends Model {}
    Xsjj.init(
      {
    "xsjj_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "gpdm": {
        "display": "代码",
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "gpdm"
    },
    "xsglx": {
        "display": "限售股类型",
        "type": DataTypes.STRING(30),
        "unique": "index_unique",
        "field": "xsglx"
    },
    "jjqesrzdf": {
        "display": "解禁前20涨跌幅",
        "type": DataTypes.STRING(30),
        "field": "jjqesrzdf"
    },
    "jjhesrzdf": {
        "display": "解禁后20涨跌幅",
        "type": DataTypes.STRING(30),
        "field": "jjhesrzdf"
    },
    "zb": {
        "display": "占解禁前流通市值比",
        "type": DataTypes.DOUBLE,
        "field": "zb"
    },
    "mkt": {
        "type": DataTypes.STRING(10),
        "field": "mkt"
    },
    "sname": {
        "display": "股票简称",
        "type": DataTypes.STRING(10),
        "field": "sname"
    },
    "newPrice": {
        "type": DataTypes.DOUBLE,
        "field": "newPrice"
    },
    "zzb": {
        "type": DataTypes.DOUBLE,
        "field": "zzb"
    },
    "gpcjjgds": {
        "type": DataTypes.DOUBLE,
        "field": "gpcjjgds"
    },
    "jjsl": {
        "display": "实际解禁数量(股)",
        "type": DataTypes.DOUBLE,
        "field": "jjsl"
    },
    "jjsz": {
        "display": "实际解禁市值(万元)",
        "type": DataTypes.DOUBLE,
        "field": "jjsz"
    },
    "yltsl": {
        "type": DataTypes.DOUBLE,
        "field": "yltsl"
    },
    "wltsl": {
        "type": DataTypes.DOUBLE,
        "field": "wltsl"
    },
    "kjjsl": {
        "display": "解禁数量(股)",
        "type": DataTypes.DOUBLE,
        "field": "kjjsl"
    },
    "kjjsz": {
        "type": DataTypes.DOUBLE,
        "field": "kjjsz"
    },
    "ltsj_date": {
        "type": DataTypes.STRING(10),
        "field": "ltsj_date"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "field": "code"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "xsjj",
      }
    );
    module.exports = Xsjj;
    