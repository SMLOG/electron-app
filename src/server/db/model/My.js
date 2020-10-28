const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*自选*/
    class My extends Model {}
    My.init(
      {
    "my_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
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
        modelName: "my",
      }
    );
    module.exports = My;
    