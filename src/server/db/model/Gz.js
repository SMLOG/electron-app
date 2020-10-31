const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*估值*/
    class Gz extends Model {}
    Gz.init(
      {
    "gz_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITYCODE": {
        "display": "代码",
        "type": DataTypes.STRING(10),
        "field": "SECURITYCODE"
    },
    "SName": {
        "display": "股票简称 ",
        "type": DataTypes.STRING(10),
        "field": "SName"
    },
    "CompanyCode": {
        "type": DataTypes.STRING(10),
        "field": "CompanyCode"
    },
    "MKT": {
        "type": DataTypes.STRING(10),
        "field": "MKT"
    },
    "HYName": {
        "display": "所属行业",
        "type": DataTypes.STRING(10),
        "field": "HYName"
    },
    "HYCode": {
        "type": DataTypes.STRING(10),
        "field": "HYCode"
    },
    "TRADEDATE": {
        "display": "数据日期",
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "TRADEDATE"
    },
    "PE9": {
        "display": "PE(TTM)",
        "type": DataTypes.DOUBLE,
        "field": "PE9"
    },
    "PE7": {
        "display": "PE(静)",
        "type": DataTypes.DOUBLE,
        "field": "PE7"
    },
    "PB8": {
        "display": "市净率",
        "type": DataTypes.DOUBLE,
        "field": "PB8"
    },
    "PB7": {
        "type": DataTypes.DOUBLE,
        "field": "PB7"
    },
    "PCFJYXJL7": {
        "type": DataTypes.DOUBLE,
        "field": "PCFJYXJL7"
    },
    "PCFJYXJL9": {
        "display": "市现率",
        "type": DataTypes.DOUBLE,
        "field": "PCFJYXJL9"
    },
    "PS7": {
        "type": DataTypes.DOUBLE,
        "field": "PS7"
    },
    "PS9": {
        "display": "市销率",
        "type": DataTypes.DOUBLE,
        "field": "PS9"
    },
    "PEG1": {
        "display": "PEG值",
        "type": DataTypes.DOUBLE,
        "field": "PEG1"
    },
    "ZSZ": {
        "display": "总市值(元)",
        "type": DataTypes.DOUBLE,
        "field": "ZSZ"
    },
    "AGSZBHXS": {
        "display": "流通市值(元)",
        "type": DataTypes.DOUBLE,
        "field": "AGSZBHXS"
    },
    "ZGB": {
        "display": "总股本(股)",
        "type": DataTypes.DOUBLE,
        "field": "ZGB"
    },
    "LTAG": {
        "display": "流通股本",
        "type": DataTypes.DOUBLE,
        "field": "LTAG"
    },
    "NEW": {
        "display": "当日收盘价<br/>(元)",
        "type": DataTypes.DOUBLE,
        "field": "NEW"
    },
    "CHG": {
        "display": "当日涨跌幅<br/>(%)",
        "type": DataTypes.DOUBLE,
        "field": "CHG"
    },
    "HY_PE9": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PE9"
    },
    "HY_PE7": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PE7"
    },
    "HY_PB8": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PB8"
    },
    "HY_PB7": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PB7"
    },
    "HY_PCFJYXJL7": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PCFJYXJL7"
    },
    "HY_PCFJYXJL9": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PCFJYXJL9"
    },
    "HY_PS7": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PS7"
    },
    "HY_PS9": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PS9"
    },
    "HY_PEG1": {
        "type": DataTypes.DOUBLE,
        "field": "HY_PEG1"
    },
    "HY_ZSZ": {
        "type": DataTypes.DOUBLE,
        "field": "HY_ZSZ"
    },
    "HY_AGSZBHXS": {
        "type": DataTypes.DOUBLE,
        "field": "HY_AGSZBHXS"
    },
    "HY_ZGB": {
        "type": DataTypes.DOUBLE,
        "field": "HY_ZGB"
    },
    "HY_LTAG": {
        "type": DataTypes.DOUBLE,
        "field": "HY_LTAG"
    },
    "ORIGINALCODE": {
        "type": DataTypes.STRING(10),
        "field": "ORIGINALCODE"
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
        modelName: "gz",
      }
    );
    module.exports = Gz;
    