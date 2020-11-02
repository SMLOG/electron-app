const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*回购*/
    class Gphg extends Model {}
    Gphg.init(
      {
    "gphg_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "repuramountlimit": {
        "type": DataTypes.DOUBLE,
        "field": "repuramountlimit"
    },
    "repuramountlower": {
        "display": "计划回购金额</br>区间(元)",
        "type": DataTypes.DOUBLE,
        "field": "repuramountlower"
    },
    "repurcode": {
        "type": DataTypes.STRING(10),
        "field": "repurcode"
    },
    "repurenddate": {
        "type": DataTypes.STRING(10),
        "field": "repurenddate"
    },
    "repurnumcap": {
        "type": DataTypes.DOUBLE,
        "field": "repurnumcap"
    },
    "repurnumlower": {
        "display": "计划回购数量区间(股)",
        "type": DataTypes.DOUBLE,
        "field": "repurnumlower"
    },
    "repurobjective": {
        "type": DataTypes.TEXT,
        "field": "repurobjective"
    },
    "repurpricecap": {
        "type": DataTypes.DOUBLE,
        "field": "repurpricecap"
    },
    "repurpricelower": {
        "display": "已回购股</br>份价格区</br>间(元)",
        "type": DataTypes.DOUBLE,
        "field": "repurpricelower"
    },
    "repurprogress": {
        "type": DataTypes.DOUBLE,
        "field": "repurprogress"
    },
    "repurstartdate": {
        "display": "回购起始时间",
        "type": DataTypes.STRING(10),
        "field": "repurstartdate"
    },
    "dim_scode": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "dim_scode"
    },
    "securityshortname": {
        "type": DataTypes.STRING(10),
        "field": "securityshortname"
    },
    "sharetype": {
        "type": DataTypes.STRING(10),
        "field": "sharetype"
    },
    "shmrsltnoticedate": {
        "type": DataTypes.STRING(10),
        "field": "shmrsltnoticedate"
    },
    "updatedate": {
        "type": DataTypes.STRING(10),
        "field": "updatedate"
    },
    "finishdate": {
        "type": DataTypes.STRING(10),
        "field": "finishdate"
    },
    "companycode": {
        "type": DataTypes.STRING(10),
        "field": "companycode"
    },
    "dim_date": {
        "type": DataTypes.STRING(10),
        "field": "dim_date"
    },
    "remark": {
        "type": DataTypes.TEXT,
        "field": "remark"
    },
    "repuradvancedate": {
        "type": DataTypes.STRING(10),
        "field": "repuradvancedate"
    },
    "dim_tradedate": {
        "type": DataTypes.STRING(10),
        "field": "dim_tradedate"
    },
    "newprice": {
        "display": "最新价",
        "type": DataTypes.DOUBLE,
        "field": "newprice"
    },
    "agszbhxs": {
        "type": DataTypes.DOUBLE,
        "field": "agszbhxs"
    },
    "zsz": {
        "type": DataTypes.DOUBLE,
        "field": "zsz"
    },
    "cprice": {
        "type": DataTypes.DOUBLE,
        "field": "cprice"
    },
    "reportdate": {
        "type": DataTypes.STRING(10),
        "field": "reportdate"
    },
    "dim_scode2": {
        "type": DataTypes.DOUBLE,
        "field": "dim_scode2"
    },
    "companycode2": {
        "type": DataTypes.DOUBLE,
        "field": "companycode2"
    },
    "dim_date3": {
        "type": DataTypes.STRING(10),
        "field": "dim_date3"
    },
    "noticedate": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "noticedate"
    },
    "remark2": {
        "type": DataTypes.STRING(255),
        "field": "remark2"
    },
    "repuramount": {
        "display": "已回购金额",
        "type": DataTypes.DOUBLE,
        "field": "repuramount"
    },
    "dim_ucode": {
        "type": DataTypes.STRING(10),
        "field": "dim_ucode"
    },
    "repurnum": {
        "display": "已回购股</br>份数量</br>(股)",
        "type": DataTypes.DOUBLE,
        "field": "repurnum"
    },
    "repurpricecap1": {
        "type": DataTypes.DOUBLE,
        "field": "repurpricecap1"
    },
    "repurpricelower1": {
        "type": DataTypes.DOUBLE,
        "field": "repurpricelower1"
    },
    "zszxx": {
        "display": "占公告前</br>一日总股</br>本比例(%)",
        "type": DataTypes.DOUBLE,
        "field": "zszxx"
    },
    "zszsx": {
        "type": DataTypes.DOUBLE,
        "field": "zszsx"
    },
    "ltszxx": {
        "type": DataTypes.DOUBLE,
        "field": "ltszxx"
    },
    "ltszsx": {
        "type": DataTypes.DOUBLE,
        "field": "ltszsx"
    },
    "zjjg": {
        "type": DataTypes.DOUBLE,
        "field": "zjjg"
    },
    "zjsl": {
        "type": DataTypes.DOUBLE,
        "field": "zjsl"
    },
    "zjje": {
        "type": DataTypes.DOUBLE,
        "field": "zjje"
    },
    "zjszbl": {
        "type": DataTypes.DOUBLE,
        "field": "zjszbl"
    },
    "market": {
        "type": DataTypes.DOUBLE,
        "field": "market"
    },
    "zjltbl": {
        "type": DataTypes.DOUBLE,
        "field": "zjltbl"
    },
    "lbrq": {
        "type": DataTypes.STRING(10),
        "field": "lbrq"
    },
    "sffhsp": {
        "type": DataTypes.DOUBLE,
        "field": "sffhsp"
    },
    "zgj": {
        "type": DataTypes.DOUBLE,
        "field": "zgj"
    },
    "zdj": {
        "type": DataTypes.DOUBLE,
        "field": "zdj"
    },
    "slsx": {
        "type": DataTypes.DOUBLE,
        "field": "slsx"
    },
    "slxx": {
        "type": DataTypes.DOUBLE,
        "field": "slxx"
    },
    "jesx": {
        "type": DataTypes.DOUBLE,
        "field": "jesx"
    },
    "jexx": {
        "type": DataTypes.DOUBLE,
        "field": "jexx"
    },
    "edate": {
        "type": DataTypes.STRING(10),
        "field": "edate"
    },
    "upd": {
        "display": "公告日期",
        "type": DataTypes.STRING(10),
        "field": "upd"
    },
    "bz": {
        "type": DataTypes.TEXT,
        "field": "bz"
    },
    "jhjg_vag": {
        "type": DataTypes.DOUBLE,
        "field": "jhjg_vag"
    },
    "jhsl_vag": {
        "type": DataTypes.DOUBLE,
        "field": "jhsl_vag"
    },
    "jhje_vag": {
        "type": DataTypes.DOUBLE,
        "field": "jhje_vag"
    },
    "hgjg_vag": {
        "type": DataTypes.DOUBLE,
        "field": "hgjg_vag"
    },
    "rchange1dcp": {
        "type": DataTypes.DOUBLE,
        "field": "rchange1dcp"
    },
    "rchange20dcp_cp": {
        "type": DataTypes.DOUBLE,
        "field": "rchange20dcp_cp"
    },
    "rchange20dc_cp": {
        "type": DataTypes.DOUBLE,
        "field": "rchange20dc_cp"
    },
    "rchange20dc": {
        "type": DataTypes.DOUBLE,
        "field": "rchange20dc"
    },
    "rchange20dcp": {
        "type": DataTypes.DOUBLE,
        "field": "rchange20dcp"
    },
    "process_status": {
        "type": DataTypes.STRING(10),
        "field": "process_status"
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
        modelName: "gphg",
      }
    );
    module.exports = Gphg;
    