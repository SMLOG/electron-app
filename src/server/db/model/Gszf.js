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
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
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
    