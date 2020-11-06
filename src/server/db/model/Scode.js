const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*并购重组*/
    class Scode extends Model {}
    Scode.init(
      {
    "scode_id": {
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
        modelName: "scode",
      }
    );
    module.exports = Scode;
    