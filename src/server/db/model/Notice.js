const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*公告*/
    class Notice extends Model {}
    Notice.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "notice_date": {
        "type": DataTypes.STRING(10)
    },
    "art_code": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique"
    },
    "title": {
        "type": DataTypes.STRING(110)
    },
    "short_name": {
        "type": DataTypes.STRING(10)
    },
    "market_code": {
        "type": DataTypes.STRING(10)
    },
    "ann_type": {
        "type": DataTypes.STRING(20),
        "unique": "index_unique"
    },
    "stock_code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
    },
    "column_code": {
        "type": DataTypes.STRING(30)
    },
    "column_name": {
        "type": DataTypes.STRING(20)
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
    