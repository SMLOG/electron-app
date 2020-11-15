const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*并购重组*/
    class Bgcz extends Model {}
    Bgcz.init(
      {
    "bgcz_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "MXID": {
        "type": DataTypes.STRING(40),
        "field": "MXID"
    },
    "H_COMNAME": {
        "type": DataTypes.STRING(100),
        "field": "H_COMNAME"
    },
    "G_GOMNAME": {
        "type": DataTypes.STRING(280),
        "field": "G_GOMNAME"
    },
    "S_COMNAME": {
        "type": DataTypes.STRING(330),
        "field": "S_COMNAME"
    },
    "SCODE": {
        "display": "股票代码",
        "type": DataTypes.STRING(10),
        "field": "SCODE"
    },
    "SNAME": {
        "display": "股票简称",
        "type": DataTypes.STRING(10),
        "field": "SNAME"
    },
    "ZRBL": {
        "display": "股权转让比例",
        "type": DataTypes.DOUBLE,
        "field": "ZRBL"
    },
    "OBJTYPE": {
        "type": DataTypes.STRING(10),
        "field": "OBJTYPE"
    },
    "JYJE": {
        "display": "交易金额",
        "type": DataTypes.DOUBLE,
        "field": "JYJE"
    },
    "JD": {
        "type": DataTypes.STRING(10),
        "field": "JD"
    },
    "ZRFS": {
        "display": "并购方式",
        "type": DataTypes.STRING(20),
        "field": "ZRFS"
    },
    "SCGGRQ": {
        "display": "披露日期",
        "type": DataTypes.STRING(20),
        "unique": "index_unique",
        "field": "SCGGRQ"
    },
    "ANNOUNDATE": {
        "display": "公告日期",
        "type": DataTypes.STRING(10),
        "field": "ANNOUNDATE"
    },
    "BZNAME": {
        "type": DataTypes.STRING(10),
        "field": "BZNAME"
    },
    "TJEBZH": {
        "display": "币种",
        "type": DataTypes.STRING(10),
        "field": "TJEBZH"
    },
    "MKT": {
        "type": DataTypes.STRING(10),
        "field": "MKT"
    },
    "REORGANIZECODE": {
        "type": DataTypes.STRING(10),
        "field": "REORGANIZECODE"
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
        modelName: "bgcz",
      }
    );
    module.exports = Bgcz;
    