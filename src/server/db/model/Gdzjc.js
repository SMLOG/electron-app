const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*股东增减持*/
    class Gdzjc extends Model {}
    Gdzjc.init(
      {
    "gdzjc_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SHCode": {
        "type": DataTypes.STRING(10),
        "field": "SHCode"
    },
    "CompanyCode": {
        "type": DataTypes.STRING(10),
        "field": "CompanyCode"
    },
    "SCode": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "SCode"
    },
    "Close": {
        "type": DataTypes.DOUBLE,
        "field": "Close"
    },
    "ChangePercent": {
        "type": DataTypes.DOUBLE,
        "field": "ChangePercent"
    },
    "SName": {
        "type": DataTypes.STRING(10),
        "field": "SName"
    },
    "ShareHdName": {
        "type": DataTypes.STRING(50),
        "unique": "index_unique",
        "field": "ShareHdName"
    },
    "FX": {
        "type": DataTypes.STRING(10),
        "field": "FX"
    },
    "ChangeNum": {
        "type": DataTypes.DOUBLE,
        "field": "ChangeNum"
    },
    "BDSLZLTB": {
        "type": DataTypes.DOUBLE,
        "field": "BDSLZLTB"
    },
    "BDZGBBL": {
        "type": DataTypes.DOUBLE,
        "field": "BDZGBBL"
    },
    "JYFS": {
        "type": DataTypes.STRING(10),
        "field": "JYFS"
    },
    "BDHCGZS": {
        "type": DataTypes.DOUBLE,
        "field": "BDHCGZS"
    },
    "BDHCGBL": {
        "type": DataTypes.DOUBLE,
        "field": "BDHCGBL"
    },
    "BDHCYLTGSL": {
        "type": DataTypes.DOUBLE,
        "field": "BDHCYLTGSL"
    },
    "BDHCYLTSLZLTGB": {
        "type": DataTypes.DOUBLE,
        "field": "BDHCYLTSLZLTGB"
    },
    "BDKS": {
        "type": DataTypes.STRING(10),
        "field": "BDKS"
    },
    "BDJZ": {
        "type": DataTypes.STRING(10),
        "field": "BDJZ"
    },
    "NOTICEDATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "NOTICEDATE"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "gdzjc",
      }
    );
    module.exports = Gdzjc;
    