const { Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*股权质押*/
class Gqjy extends Model {}
Gqjy.init(
  {
    gqjy_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    scode: {
      display: "股票代码",
      type: DataTypes.STRING(10),
      field: "scode",
    },
    sname: {
      type: DataTypes.STRING(10),
      field: "sname",
    },
    eitime: {
      type: DataTypes.STRING(20),
      field: "eitime",
    },
    eutime: {
      type: DataTypes.STRING(20),
      field: "eutime",
    },
    eid: {
      type: DataTypes.DOUBLE,
      field: "eid",
    },
    ccode: {
      type: DataTypes.STRING(10),
      field: "ccode",
    },
    ndate: {
      display: "公告日期",
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "ndate",
    },
    upd: {
      type: DataTypes.STRING(10),
      field: "upd",
    },
    sharehdcode: {
      type: DataTypes.STRING(10),
      field: "sharehdcode",
    },
    gdmc: {
      display: "股东名称",
      type: DataTypes.STRING(50),
      unique: "index_unique",
      field: "gdmc",
    },
    sharehd: {
      type: DataTypes.STRING(40),
      field: "sharehd",
    },
    sharehdnum: {
      type: DataTypes.DOUBLE,
      field: "sharehdnum",
    },
    sdate: {
      display: "质押开始日期",
      type: DataTypes.STRING(10),
      field: "sdate",
    },
    jysj: {
      type: DataTypes.STRING(20),
      field: "jysj",
    },
    enddate: {
      type: DataTypes.STRING(10),
      field: "enddate",
    },
    fcode: {
      type: DataTypes.STRING(10),
      field: "fcode",
    },
    jgmc: {
      display: "质押机构",
      type: DataTypes.STRING(60),
      field: "jgmc",
    },
    jglx: {
      type: DataTypes.STRING(10),
      field: "jglx",
    },
    amtsharefrozen: {
      type: DataTypes.DOUBLE,
      field: "amtsharefrozen",
    },
    amtfrozenratio: {
      type: DataTypes.DOUBLE,
      field: "amtfrozenratio",
    },
    pledgepur: {
      type: DataTypes.DOUBLE,
      field: "pledgepur",
    },
    frozenreason: {
      type: DataTypes.STRING(255),
      field: "frozenreason",
    },
    remark: {
      type: DataTypes.TEXT,
      field: "remark",
    },
    newprice: {
      type: DataTypes.DOUBLE,
      field: "newprice",
    },
    instcode: {
      type: DataTypes.STRING(10),
      field: "instcode",
    },
    relinstcode: {
      type: DataTypes.STRING(10),
      field: "relinstcode",
    },
    jg_scode: {
      type: DataTypes.STRING(10),
      field: "jg_scode",
    },
    zyjg_ccode: {
      type: DataTypes.STRING(10),
      field: "zyjg_ccode",
    },
    pname: {
      type: DataTypes.STRING(10),
      field: "pname",
    },
    yjx_pcx_type: {
      type: DataTypes.DOUBLE,
      field: "yjx_pcx_type",
    },
    syscbl: {
      type: DataTypes.DOUBLE,
      field: "syscbl",
    },
    syscsz: {
      type: DataTypes.DOUBLE,
      field: "syscsz",
    },
    gd_count: {
      type: DataTypes.STRING(10),
      field: "gd_count",
    },
    jg_sname: {
      type: DataTypes.STRING(10),
      field: "jg_sname",
    },
    yjx_min: {
      type: DataTypes.STRING(10),
      field: "yjx_min",
    },
    yjx_max: {
      type: DataTypes.STRING(10),
      field: "yjx_max",
    },
    yjx_row: {
      type: DataTypes.STRING(10),
      field: "yjx_row",
    },
    pcx_min: {
      type: DataTypes.STRING(10),
      field: "pcx_min",
    },
    pcx_max: {
      type: DataTypes.STRING(10),
      field: "pcx_max",
    },
    pcx_row: {
      type: DataTypes.STRING(10),
      field: "pcx_row",
    },
    datatype: {
      type: DataTypes.DOUBLE,
      field: "datatype",
    },
    sharefrozennum: {
      display: "质押股份<br/>数量(股)",
      type: DataTypes.DOUBLE,
      field: "sharefrozennum",
    },
    frozenratio: {
      display: "占所持股份比例(%)",
      type: DataTypes.DOUBLE,
      field: "frozenratio",
    },
    frozenintotal: {
      display: "占总股本比例(%)",
      type: DataTypes.DOUBLE,
      field: "frozenintotal",
    },
    newprice_new: {
      display: "最新价(元)",
      type: DataTypes.DOUBLE,
      field: "newprice_new",
    },
    spj: {
      display: "质押日收盘价(元)",
      type: DataTypes.DOUBLE,
      field: "spj",
    },
    pcx: {
      display: "预估平<br/>仓线(元)",
      type: DataTypes.DOUBLE,
      field: "pcx",
    },
    sz: {
      type: DataTypes.DOUBLE,
      field: "sz",
    },
    yjx: {
      type: DataTypes.DOUBLE,
      field: "yjx",
    },
    code: {
      type: DataTypes.STRING(10),
      unique: "index_unique",
      field: "code",
    },
  },
  {
    sequelize: db,
    charset: "utf8",
    modelName: "gqjy",
  }
);
module.exports = Gqjy;
