const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*公告*/
    class Notice extends Model {}
    Notice.init(
      {
    "notice_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "notice_date": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "notice_date"
    },
    "art_code": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique",
        "field": "art_code"
    },
    "title": {
        "type": DataTypes.STRING(80),
        "field": "title"
    },
    "short_name": {
        "type": DataTypes.STRING(10),
        "field": "short_name"
    },
    "market_code": {
        "type": DataTypes.STRING(10),
        "field": "market_code"
    },
    "ann_type": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "ann_type"
    },
    "stock_code": {
        "type": DataTypes.STRING(10),
        "field": "stock_code"
    },
    "column_code": {
        "type": DataTypes.STRING(30),
        "field": "column_code"
    },
    "column_name": {
        "type": DataTypes.STRING(20),
        "field": "column_name"
    },
    "type": {
        "type": DataTypes.STRING(20),
        "field": "type"
    },
    "type_id": {
        "type": DataTypes.DOUBLE,
        "field": "type_id"
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
        modelName: "notice",
      }
    );
    module.exports = Notice;
    