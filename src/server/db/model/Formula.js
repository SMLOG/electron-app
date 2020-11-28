const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*formula*/
    class Formula extends Model {}
    Formula.init(
      {
    "formula_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique",
        "field": "code"
    },
    "val": {
        "type": DataTypes.STRING(340),
        "field": "val"
    },
    "enalbe": {
        "type": DataTypes.DOUBLE,
        "field": "enalbe"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "formula",
      }
    );
    module.exports = Formula;
    