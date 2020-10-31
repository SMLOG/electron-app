const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*大事*/
    class Event extends Model {}
    Event.init(
      {
    "event_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "gpdm": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "gpdm"
    },
    "sjlx": {
        "type": DataTypes.STRING(10),
        "field": "sjlx"
    },
    "sjlxz": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "sjlxz"
    },
    "sjms": {
        "type": DataTypes.STRING(255),
        "field": "sjms"
    },
    "tszd": {
        "type": DataTypes.STRING(50),
        "field": "tszd"
    },
    "zdf": {
        "type": DataTypes.STRING(10),
        "field": "zdf"
    },
    "spj": {
        "type": DataTypes.STRING(10),
        "field": "spj"
    },
    "px": {
        "type": DataTypes.DOUBLE,
        "field": "px"
    },
    "rq_date": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique",
        "field": "rq_date"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "field": "code"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "event",
      }
    );
    module.exports = Event;
    