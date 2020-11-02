const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*urls*/
    class Urls extends Model {}
    Urls.init(
      {
    "urls_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
    },
    "job": {
        "type": DataTypes.STRING(10),
        "field": "job"
    },
    "url": {
        "type": DataTypes.STRING(500),
        "unique": "index_unique",
        "field": "url"
    },
    "params": {
        "type": DataTypes.STRING(260),
        "unique": "index_unique",
        "field": "params"
    },
    "status": {
        "type": DataTypes.DOUBLE,
        "field": "status"
    },
    "udate": {
        "type": DataTypes.DATE,
        "field": "udate"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "urls",
      }
    );
    module.exports = Urls;
    