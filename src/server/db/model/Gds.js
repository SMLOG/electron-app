const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*股东数*/
    class Gds extends Model {}
    Gds.init(
      {
    "gds_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SecurityCode": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "SecurityCode"
    },
    "SecurityName": {
        "type": DataTypes.STRING(10),
        "field": "SecurityName"
    },
    "LatestPrice": {
        "type": DataTypes.DOUBLE,
        "field": "LatestPrice"
    },
    "PriceChangeRate": {
        "type": DataTypes.DOUBLE,
        "field": "PriceChangeRate"
    },
    "HolderNum": {
        "type": DataTypes.DOUBLE,
        "field": "HolderNum"
    },
    "PreviousHolderNum": {
        "type": DataTypes.DOUBLE,
        "field": "PreviousHolderNum"
    },
    "HolderNumChange": {
        "type": DataTypes.DOUBLE,
        "field": "HolderNumChange"
    },
    "HolderNumChangeRate": {
        "type": DataTypes.DOUBLE,
        "field": "HolderNumChangeRate"
    },
    "RangeChangeRate": {
        "type": DataTypes.DOUBLE,
        "field": "RangeChangeRate"
    },
    "EndDate": {
        "type": DataTypes.STRING(10),
        "field": "EndDate"
    },
    "PreviousEndDate": {
        "type": DataTypes.STRING(10),
        "field": "PreviousEndDate"
    },
    "HolderAvgCapitalisation": {
        "type": DataTypes.DOUBLE,
        "field": "HolderAvgCapitalisation"
    },
    "HolderAvgStockQuantity": {
        "type": DataTypes.DOUBLE,
        "field": "HolderAvgStockQuantity"
    },
    "TotalCapitalisation": {
        "type": DataTypes.DOUBLE,
        "field": "TotalCapitalisation"
    },
    "CapitalStock": {
        "type": DataTypes.DOUBLE,
        "field": "CapitalStock"
    },
    "NoticeDate": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "NoticeDate"
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
        modelName: "gds",
      }
    );
    module.exports = Gds;
    