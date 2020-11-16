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
        "unique": "index_unique"
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
    