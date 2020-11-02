const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*分红送配*/
    class Fhsp extends Model {}
    Fhsp.init(
      {
    "fhsp_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "MarketType": {
        "type": DataTypes.STRING(10),
        "field": "MarketType"
    },
    "Name": {
        "display": "名称",
        "type": DataTypes.STRING(10),
        "field": "Name"
    },
    "SZZBL": {
        "display": "送转<br>总比例",
        "type": DataTypes.DOUBLE,
        "field": "SZZBL"
    },
    "SGBL": {
        "display": "送股<br>比例",
        "type": DataTypes.STRING(10),
        "field": "SGBL"
    },
    "ZGBL": {
        "display": "转股<br>比例",
        "type": DataTypes.STRING(10),
        "field": "ZGBL"
    },
    "XJFH": {
        "display": "现金分红<br>比例",
        "type": DataTypes.DOUBLE,
        "field": "XJFH"
    },
    "GXL": {
        "display": "股息<br>率(%)",
        "type": DataTypes.DOUBLE,
        "field": "GXL"
    },
    "YAGGR": {
        "display": "预案<br>公告日",
        "type": DataTypes.STRING(20),
        "field": "YAGGR"
    },
    "YAGGRHSRZF": {
        "type": DataTypes.DOUBLE,
        "field": "YAGGRHSRZF"
    },
    "GQDJRQSRZF": {
        "type": DataTypes.DOUBLE,
        "field": "GQDJRQSRZF"
    },
    "GQDJR": {
        "display": "股权<br>登记日",
        "type": DataTypes.STRING(20),
        "field": "GQDJR"
    },
    "CQCXR": {
        "display": "除权<br>除息日",
        "type": DataTypes.STRING(20),
        "field": "CQCXR"
    },
    "CQCXRHSSRZF": {
        "type": DataTypes.STRING(10),
        "field": "CQCXRHSSRZF"
    },
    "YCQTS": {
        "type": DataTypes.DOUBLE,
        "field": "YCQTS"
    },
    "TotalEquity": {
        "display": "总股本(亿)",
        "type": DataTypes.DOUBLE,
        "field": "TotalEquity"
    },
    "EarningsPerShare": {
        "display": "每股<br>收益(元)",
        "type": DataTypes.DOUBLE,
        "field": "EarningsPerShare"
    },
    "NetAssetsPerShare": {
        "display": "每股<br>净资产(元)",
        "type": DataTypes.DOUBLE,
        "field": "NetAssetsPerShare"
    },
    "MGGJJ": {
        "display": "每股<br>公积金(元)",
        "type": DataTypes.DOUBLE,
        "field": "MGGJJ"
    },
    "MGWFPLY": {
        "display": "每股<br>未分配<br>利润(元)",
        "type": DataTypes.DOUBLE,
        "field": "MGWFPLY"
    },
    "JLYTBZZ": {
        "display": "净利润<br>同比增长(%)",
        "type": DataTypes.DOUBLE,
        "field": "JLYTBZZ"
    },
    "ReportingPeriod": {
        "type": DataTypes.STRING(20),
        "field": "ReportingPeriod"
    },
    "ResultsbyDate": {
        "type": DataTypes.STRING(10),
        "field": "ResultsbyDate"
    },
    "ProjectProgress": {
        "display": "方案进度",
        "type": DataTypes.STRING(10),
        "field": "ProjectProgress"
    },
    "AllocationPlan": {
        "type": DataTypes.STRING(30),
        "field": "AllocationPlan"
    },
    "RowNum": {
        "type": DataTypes.DOUBLE,
        "field": "RowNum"
    },
    "EITIME": {
        "type": DataTypes.STRING(20),
        "field": "EITIME"
    },
    "EUTIME": {
        "type": DataTypes.STRING(20),
        "field": "EUTIME"
    },
    "NOTICEDATE": {
        "display": "最新<br>公告日期",
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "NOTICEDATE"
    },
    "Iskcb": {
        "type": DataTypes.DOUBLE,
        "field": "Iskcb"
    },
    "orgcode": {
        "type": DataTypes.STRING(10),
        "field": "orgcode"
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
        modelName: "fhsp",
      }
    );
    module.exports = Fhsp;
    