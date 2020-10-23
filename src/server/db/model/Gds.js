const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*股东数*/
    class Gds extends Model {}
    Gds.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SecurityCode": {
        "type": DataTypes.DOUBLE,
        "unique": "index_unique"
    },
    "SecurityName": {
        "type": DataTypes.STRING(10)
    },
    "LatestPrice": {
        "type": DataTypes.DOUBLE
    },
    "PriceChangeRate": {
        "type": DataTypes.DOUBLE
    },
    "HolderNum": {
        "type": DataTypes.DOUBLE
    },
    "PreviousHolderNum": {
        "type": DataTypes.DOUBLE
    },
    "HolderNumChange": {
        "type": DataTypes.DOUBLE
    },
    "HolderNumChangeRate": {
        "type": DataTypes.DOUBLE
    },
    "RangeChangeRate": {
        "type": DataTypes.DOUBLE
    },
    "EndDate": {
        "type": DataTypes.STRING(10)
    },
    "PreviousEndDate": {
        "type": DataTypes.STRING(10)
    },
    "HolderAvgCapitalisation": {
        "type": DataTypes.DOUBLE
    },
    "HolderAvgStockQuantity": {
        "type": DataTypes.DOUBLE
    },
    "TotalCapitalisation": {
        "type": DataTypes.DOUBLE
    },
    "CapitalStock": {
        "type": DataTypes.DOUBLE
    },
    "NoticeDate": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique"
    },
    "code": {
        "type": DataTypes.STRING(10)
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
    