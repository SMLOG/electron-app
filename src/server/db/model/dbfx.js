const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  
    class Dbfx extends Model {}
    Dbfx.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "date": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    },
    "jzcsyl": {
        "display": "roe",
        "type": DataTypes.STRING(10)
    },
    "zzcjll": {
        "display": "总资产净利率",
        "type": DataTypes.STRING(10)
    },
    "gsmgsgddjlr": {
        "display": "归属母公司股东的净利润占比",
        "type": DataTypes.STRING(10)
    },
    "qycs": {
        "display": "权益乘数",
        "type": DataTypes.DOUBLE
    },
    "yyjlrl": {
        "display": "营业净利润",
        "type": DataTypes.STRING(10)
    },
    "zzczzl": {
        "display": "总资产周转率",
        "type": DataTypes.STRING(10)
    },
    "zcfzl": {
        "display": "资产负债率",
        "type": DataTypes.STRING(10)
    },
    "jlr": {
        "display": "净利润",
        "type": DataTypes.STRING(10)
    },
    "yysr": {
        "display": "营业总收入",
        "type": DataTypes.STRING(10)
    },
    "zcze": {
        "display": "资产总额",
        "type": DataTypes.STRING(10)
    },
    "fzze": {
        "display": "负债总额",
        "type": DataTypes.STRING(10)
    },
    "srze": {
        "display": "收入总额",
        "type": DataTypes.STRING(10)
    },
    "cbze": {
        "display": "成本总额",
        "type": DataTypes.STRING(10)
    },
    "ldzc": {
        "display": "流动资产",
        "type": DataTypes.STRING(10)
    },
    "fldzc": {
        "display": "非流动资产",
        "type": DataTypes.STRING(10)
    },
    "yycb": {
        "display": "营业成本",
        "type": DataTypes.STRING(10)
    },
    "qjfy": {
        "display": "期间费用",
        "type": DataTypes.STRING(10)
    },
    "hbzj": {
        "display": "货币资金",
        "type": DataTypes.STRING(10)
    },
    "kgcsjrzc": {
        "display": "可供出售金融资产",
        "type": DataTypes.STRING(10)
    },
    "wxzc": {
        "display": "无形资产",
        "type": DataTypes.STRING(10)
    },
    "gyjzbdsy": {
        "display": "公允价值变动收益",
        "type": DataTypes.STRING(10)
    },
    "yysjjfj": {
        "display": "营业税金及附加",
        "type": DataTypes.STRING(10)
    },
    "jyxjrzc": {
        "display": "交易性金融资产",
        "type": DataTypes.STRING(10)
    },
    "cyzdqtz": {
        "display": "持有至到期投资",
        "type": DataTypes.STRING(10)
    },
    "kfzc": {
        "display": "开发支出",
        "type": DataTypes.STRING(10)
    },
    "yywsr": {
        "display": "营业外收入",
        "type": DataTypes.STRING(10)
    },
    "sdsfy": {
        "display": "所得税费用",
        "type": DataTypes.STRING(10)
    },
    "cwfy": {
        "display": "财务费用",
        "type": DataTypes.STRING(10)
    },
    "yszk": {
        "display": "应收账款",
        "type": DataTypes.STRING(10)
    },
    "cqgqtz": {
        "display": "长期股权投资",
        "type": DataTypes.STRING(10)
    },
    "sy": {
        "display": "商誉",
        "type": DataTypes.STRING(10)
    },
    "tzsy": {
        "display": "投资收益",
        "type": DataTypes.STRING(10)
    },
    "zcjzss": {
        "display": "资产减值损失",
        "type": DataTypes.STRING(10)
    },
    "xsfy": {
        "display": "销售费用",
        "type": DataTypes.STRING(10)
    },
    "yfzk": {
        "display": "应付账款",
        "type": DataTypes.STRING(10)
    },
    "tzxfdc": {
        "display": "投资性房地产",
        "type": DataTypes.STRING(10)
    },
    "cqdtfy": {
        "display": "长期待摊费用",
        "type": DataTypes.STRING(10)
    },
    "yywzc": {
        "display": "营业外收入",
        "type": DataTypes.STRING(10)
    },
    "glfy": {
        "display": "管理费用",
        "type": DataTypes.STRING(10)
    },
    "qtysk": {
        "display": "其他应收款",
        "type": DataTypes.STRING(10)
    },
    "gdzc": {
        "display": "固定资产",
        "type": DataTypes.STRING(10)
    },
    "dysdszc": {
        "display": "递延所得税资产",
        "type": DataTypes.STRING(10)
    },
    "ch": {
        "display": "存货",
        "type": DataTypes.STRING(10)
    },
    "zjgc": {
        "display": "在建工程",
        "type": DataTypes.STRING(10)
    },
    "qtfldzc": {
        "display": "其他非流动资产",
        "type": DataTypes.STRING(10)
    },
    "qtldzc": {
        "display": "其他流动资产",
        "type": DataTypes.STRING(10)
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTTYPE",
        "unique": "compositeIndex"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE",
        "unique": "compositeIndex"
    },
    "reportDate": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    }
}
    ,
      {
        sequelize: db,
        modelName: "dbfx",
      }
    );
    module.exports = Dbfx;
    