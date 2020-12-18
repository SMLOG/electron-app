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
    "_上5天": {
        "type": DataTypes.BOOLEAN,
        "field": "_上5天"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
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
    