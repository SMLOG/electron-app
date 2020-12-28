const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*tech*/
    class Tech extends Model {}
    Tech.init(
      {
    "tech_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "_MACD周": {
        "type": DataTypes.BOOLEAN,
        "field": "_MACD周"
    },
    "_KDJ周": {
        "type": DataTypes.BOOLEAN,
        "field": "_KDJ周"
    },
    "_换手率大1": {
        "type": DataTypes.BOOLEAN,
        "field": "_换手率大1"
    },
    "_上5周均线": {
        "type": DataTypes.BOOLEAN,
        "field": "_上5周均线"
    },
    "_20天线": {
        "type": DataTypes.BOOLEAN,
        "field": "_20天线"
    },
    "_B": {
        "type": DataTypes.BOOLEAN,
        "field": "_B"
    },
    "_S": {
        "type": DataTypes.BOOLEAN,
        "field": "_S"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "score": {
        "type": DataTypes.DOUBLE,
        "field": "score"
    },
    "utime": {
        "type": DataTypes.DATE,
        "field": "utime"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "tech",
      }
    );
    module.exports = Tech;
    