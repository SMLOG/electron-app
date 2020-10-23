const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*行情*/
class Hq extends Model {}
Hq.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
    },
    name: {
      type: DataTypes.STRING(10),
    },
    now: {
      type: DataTypes.DOUBLE,
    },
    close: {
      type: DataTypes.DOUBLE,
    },
    changePV: {
      type: DataTypes.DOUBLE,
    },
    changeP: {
      type: DataTypes.STRING(10),
    },
    changeV: {
      type: DataTypes.DOUBLE,
    },
    change: {
      type: DataTypes.DOUBLE,
    },
    open: {
      type: DataTypes.DOUBLE,
    },
    preClose: {
      type: DataTypes.DOUBLE,
    },
    preclose: {
      type: DataTypes.DOUBLE,
    },
    turnover: {
      type: DataTypes.DOUBLE,
    },
    pe: {
      type: DataTypes.DOUBLE,
    },
    lb: {
      type: DataTypes.STRING(10),
    },
    pe_ttm: {
      type: DataTypes.DOUBLE,
    },
    volume: {
      type: DataTypes.DOUBLE,
    },
    ltg: {
      type: DataTypes.DOUBLE,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    high: {
      type: DataTypes.DOUBLE,
    },
    zf: {
      type: DataTypes.DOUBLE,
    },
    low: {
      type: DataTypes.DOUBLE,
    },
    zsz: {
      type: DataTypes.DOUBLE,
    },
    lz: {
      type: DataTypes.DOUBLE,
    },
    avg: {
      type: DataTypes.DOUBLE,
    },
    zf60: {
      type: DataTypes.DOUBLE,
    },
    zf250: {
      type: DataTypes.DOUBLE,
    },
    firstDay: {
      type: DataTypes.DOUBLE,
    },
    hy: {
      type: DataTypes.STRING(10),
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    charset: "utf8",
    modelName: "hq",
  }
);
module.exports = Hq;
