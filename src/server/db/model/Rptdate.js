const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*rptdate*/
    class Rptdate extends Model {}
    Rptdate.init(
      {
    "rptdate_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "p": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "p"
    },
    "type": {
        "type": DataTypes.STRING(10),
        "field": "type"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "rptdate",
      }
    );
    module.exports = Rptdate;
    