const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*request*/
    class Request extends Model {}
    Request.init(
      {
    "request_id": {
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
        "type": DataTypes.TEXT,
        "field": "url"
    },
    "params": {
        "type": DataTypes.STRING(260),
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
        modelName: "request",
      }
    );
    module.exports = Request;
    