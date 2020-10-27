const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*现金流量表*/
    class Xjll extends Model {}
    Xjll.init(
      {
    "xjll_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECUCODE": {
        "type": DataTypes.STRING(10),
        "field": "SECUCODE"
    },
    "SECURITY_CODE": {
        "display": "代码",
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "SECURITY_CODE"
    },
    "INDUSTRY_CODE": {
        "type": DataTypes.STRING(10),
        "field": "INDUSTRY_CODE"
    },
    "ORG_CODE": {
        "type": DataTypes.STRING(20),
        "field": "ORG_CODE"
    },
    "SECURITY_NAME_ABBR": {
        "display": "名称",
        "type": DataTypes.STRING(10),
        "field": "SECURITY_NAME_ABBR"
    },
    "INDUSTRY_NAME": {
        "type": DataTypes.STRING(10),
        "field": "INDUSTRY_NAME"
    },
    "MARKET": {
        "type": DataTypes.STRING(10),
        "field": "MARKET"
    },
    "SECURITY_TYPE_CODE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITY_TYPE_CODE"
    },
    "TRADE_MARKET_CODE": {
        "type": DataTypes.STRING(20),
        "field": "TRADE_MARKET_CODE"
    },
    "DATE_TYPE_CODE": {
        "type": DataTypes.STRING(10),
        "field": "DATE_TYPE_CODE"
    },
    "REPORT_TYPE_CODE": {
        "type": DataTypes.STRING(10),
        "field": "REPORT_TYPE_CODE"
    },
    "DATA_STATE": {
        "type": DataTypes.DOUBLE,
        "field": "DATA_STATE"
    },
    "NOTICE_DATE": {
        "display": "公告日期",
        "type": DataTypes.STRING(10),
        "field": "NOTICE_DATE"
    },
    "REPORT_DATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "REPORT_DATE"
    },
    "NETCASH_OPERATE": {
        "display": "经营性现金流现金流量净额(元)",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_OPERATE"
    },
    "NETCASH_OPERATE_RATIO": {
        "display": "净现金流占比(%)",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_OPERATE_RATIO"
    },
    "SALES_SERVICES": {
        "type": DataTypes.DOUBLE,
        "field": "SALES_SERVICES"
    },
    "SALES_SERVICES_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "SALES_SERVICES_RATIO"
    },
    "PAY_STAFF_CASH": {
        "type": DataTypes.DOUBLE,
        "field": "PAY_STAFF_CASH"
    },
    "PSC_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "PSC_RATIO"
    },
    "NETCASH_INVEST": {
        "display": "投资性现金流现金流量净额(元)",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_INVEST"
    },
    "NETCASH_INVEST_RATIO": {
        "display": "净现金流占比(%)",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_INVEST_RATIO"
    },
    "RECEIVE_INVEST_INCOME": {
        "type": DataTypes.DOUBLE,
        "field": "RECEIVE_INVEST_INCOME"
    },
    "RII_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "RII_RATIO"
    },
    "CONSTRUCT_LONG_ASSET": {
        "type": DataTypes.DOUBLE,
        "field": "CONSTRUCT_LONG_ASSET"
    },
    "CLA_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "CLA_RATIO"
    },
    "NETCASH_FINANCE": {
        "display": "融资性现金流现金流量净额(元)",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_FINANCE"
    },
    "NETCASH_FINANCE_RATIO": {
        "display": "净现金流占比(%)  ",
        "type": DataTypes.DOUBLE,
        "field": "NETCASH_FINANCE_RATIO"
    },
    "CCE_ADD": {
        "display": "净现金流(元)",
        "type": DataTypes.DOUBLE,
        "field": "CCE_ADD"
    },
    "CCE_ADD_RATIO": {
        "display": "同比增长(%)",
        "type": DataTypes.DOUBLE,
        "field": "CCE_ADD_RATIO"
    },
    "CUSTOMER_DEPOSIT_ADD": {
        "type": DataTypes.DOUBLE,
        "field": "CUSTOMER_DEPOSIT_ADD"
    },
    "CDA_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "CDA_RATIO"
    },
    "DEPOSIT_IOFI_OTHER": {
        "type": DataTypes.DOUBLE,
        "field": "DEPOSIT_IOFI_OTHER"
    },
    "DIO_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "DIO_RATIO"
    },
    "LOAN_ADVANCE_ADD": {
        "type": DataTypes.DOUBLE,
        "field": "LOAN_ADVANCE_ADD"
    },
    "LAA_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "LAA_RATIO"
    },
    "RECEIVE_INTEREST_COMMISSION": {
        "type": DataTypes.DOUBLE,
        "field": "RECEIVE_INTEREST_COMMISSION"
    },
    "RIC_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "RIC_RATIO"
    },
    "INVEST_PAY_CASH": {
        "type": DataTypes.DOUBLE,
        "field": "INVEST_PAY_CASH"
    },
    "IPC_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "IPC_RATIO"
    },
    "BEGIN_CCE": {
        "type": DataTypes.DOUBLE,
        "field": "BEGIN_CCE"
    },
    "BEGIN_CCE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "BEGIN_CCE_RATIO"
    },
    "END_CCE": {
        "type": DataTypes.DOUBLE,
        "field": "END_CCE"
    },
    "END_CCE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "END_CCE_RATIO"
    },
    "RECEIVE_ORIGIC_PREMIUM": {
        "type": DataTypes.DOUBLE,
        "field": "RECEIVE_ORIGIC_PREMIUM"
    },
    "ROP_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ROP_RATIO"
    },
    "PAY_ORIGIC_COMPENSATE": {
        "type": DataTypes.DOUBLE,
        "field": "PAY_ORIGIC_COMPENSATE"
    },
    "POC_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "POC_RATIO"
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
        modelName: "xjll",
      }
    );
    module.exports = Xjll;
    