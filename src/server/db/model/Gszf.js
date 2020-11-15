const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*增发*/
    class Gszf extends Model {}
    Gszf.init(
      {
    "gszf_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "scode": {
        "type": DataTypes.STRING(10),
        "field": "scode"
    },
    "name": {
        "type": DataTypes.STRING(10),
        "field": "name"
    },
    "type": {
        "type": DataTypes.STRING(10),
        "field": "type"
    },
    "total_vol": {
        "type": DataTypes.DOUBLE,
        "field": "total_vol"
    },
    "price": {
        "type": DataTypes.DOUBLE,
        "field": "price"
    },
    "newprice": {
        "type": DataTypes.DOUBLE,
        "field": "newprice"
    },
    "fxdate": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "fxdate"
    },
    "mkdate": {
        "type": DataTypes.STRING(10),
        "field": "mkdate"
    },
    "zfcode": {
        "type": DataTypes.STRING(10),
        "field": "zfcode"
    },
    "online": {
        "type": DataTypes.DOUBLE,
        "field": "online"
    },
    "zxgbdate": {
        "type": DataTypes.STRING(10),
        "field": "zxgbdate"
    },
    "zxrate": {
        "type": DataTypes.DOUBLE,
        "field": "zxrate"
    },
    "oneper": {
        "type": DataTypes.DOUBLE,
        "field": "oneper"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "gszf",
      }
    );
    module.exports = Gszf;
    