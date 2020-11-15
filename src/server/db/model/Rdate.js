const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*rdate*/
    class Rdate extends Model {}
    Rdate.init(
      {
    "rdate_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "rd": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "rd"
    },
    "type": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "type"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "rdate",
      }
    );
    module.exports = Rdate;
    