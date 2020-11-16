const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*行情*/
    class Hq extends Model {}
    Hq.init(
      {
    "hq_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "name": {
        "type": DataTypes.STRING(10),
        "field": "name"
    },
    "now": {
        "type": DataTypes.DOUBLE,
        "field": "now"
    },
    "close": {
        "type": DataTypes.DOUBLE,
        "field": "close"
    },
    "changePV": {
        "type": DataTypes.DOUBLE,
        "field": "changePV"
    },
    "changeP": {
        "type": DataTypes.STRING(10),
        "field": "changeP"
    },
    "changeV": {
        "type": DataTypes.DOUBLE,
        "field": "changeV"
    },
    "change": {
        "type": DataTypes.DOUBLE,
        "field": "change"
    },
    "open": {
        "type": DataTypes.DOUBLE,
        "field": "open"
    },
    "preclose": {
        "type": DataTypes.DOUBLE,
        "field": "preclose"
    },
    "turnover": {
        "type": DataTypes.DOUBLE,
        "field": "turnover"
    },
    "pe": {
        "type": DataTypes.DOUBLE,
        "field": "pe"
    },
    "lb": {
        "type": DataTypes.DOUBLE,
        "field": "lb"
    },
    "pe_ttm": {
        "type": DataTypes.DOUBLE,
        "field": "pe_ttm"
    },
    "volume": {
        "type": DataTypes.DOUBLE,
        "field": "volume"
    },
    "ltg": {
        "type": DataTypes.DOUBLE,
        "field": "ltg"
    },
    "amount": {
        "type": DataTypes.DOUBLE,
        "field": "amount"
    },
    "high": {
        "type": DataTypes.DOUBLE,
        "field": "high"
    },
    "zf": {
        "type": DataTypes.DOUBLE,
        "field": "zf"
    },
    "low": {
        "type": DataTypes.DOUBLE,
        "field": "low"
    },
    "zsz": {
        "type": DataTypes.DOUBLE,
        "field": "zsz"
    },
    "lz": {
        "type": DataTypes.DOUBLE,
        "field": "lz"
    },
    "avg": {
        "type": DataTypes.DOUBLE,
        "field": "avg"
    },
    "zf60": {
        "type": DataTypes.DOUBLE,
        "field": "zf60"
    },
    "zf250": {
        "type": DataTypes.DOUBLE,
        "field": "zf250"
    },
    "firstDay": {
        "type": DataTypes.DOUBLE,
        "field": "firstDay"
    },
    "hy": {
        "type": DataTypes.STRING(10),
        "field": "hy"
    },
    "date": {
        "type": DataTypes.DATE,
        "field": "date"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "hq",
      }
    );
    module.exports = Hq;
    