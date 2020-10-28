const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*大事*/
    class Event extends Model {}
    Event.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "gpdm": {
        "type": DataTypes.DOUBLE,
        "unique": "index_unique"
    },
    "sjlx": {
        "type": DataTypes.STRING(10)
    },
    "sjlxz": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
    },
    "rq": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique"
    },
    "sjms": {
        "type": DataTypes.STRING(210)
    },
    "tszd": {
        "type": DataTypes.STRING(50)
    },
    "zdf": {
        "type": DataTypes.STRING(10)
    },
    "spj": {
        "type": DataTypes.STRING(10)
    },
    "px": {
        "type": DataTypes.DOUBLE
    },
    "code": {
        "type": DataTypes.STRING(10)
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
    