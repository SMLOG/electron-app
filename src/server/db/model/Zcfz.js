const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*资产负债表*/
    class Zcfz extends Model {}
    Zcfz.init(
      {
    "zcfz_id": {
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
    "TOTAL_ASSETS": {
        "display": "资产总计(元)",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_ASSETS"
    },
    "FIXED_ASSET": {
        "type": DataTypes.DOUBLE,
        "field": "FIXED_ASSET"
    },
    "MONETARYFUNDS": {
        "display": "\"货币资金(元)",
        "type": DataTypes.DOUBLE,
        "field": "MONETARYFUNDS"
    },
    "MONETARYFUNDS_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "MONETARYFUNDS_RATIO"
    },
    "ACCOUNTS_RECE": {
        "display": "应收账款(元)",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTS_RECE"
    },
    "ACCOUNTS_RECE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTS_RECE_RATIO"
    },
    "INVENTORY": {
        "display": "存货(元)",
        "type": DataTypes.DOUBLE,
        "field": "INVENTORY"
    },
    "INVENTORY_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "INVENTORY_RATIO"
    },
    "TOTAL_LIABILITIES": {
        "display": "负债总计(元)",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_LIABILITIES"
    },
    "ACCOUNTS_PAYABLE": {
        "display": "应付账款(元)",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTS_PAYABLE"
    },
    "ACCOUNTS_PAYABLE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTS_PAYABLE_RATIO"
    },
    "ADVANCE_RECEIVABLES": {
        "display": "预收账款(元)   ",
        "type": DataTypes.DOUBLE,
        "field": "ADVANCE_RECEIVABLES"
    },
    "ADVANCE_RECEIVABLES_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ADVANCE_RECEIVABLES_RATIO"
    },
    "TOTAL_EQUITY": {
        "display": "所有者权益合计(元)",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_EQUITY"
    },
    "TOTAL_EQUITY_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_EQUITY_RATIO"
    },
    "TOTAL_ASSETS_RATIO": {
        "display": "总资产同比(%)",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_ASSETS_RATIO"
    },
    "TOTAL_LIAB_RATIO": {
        "display": "总负债同比(%)",
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_LIAB_RATIO"
    },
    "CURRENT_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "CURRENT_RATIO"
    },
    "DEBT_ASSET_RATIO": {
        "display": "资产负债率(%)",
        "type": DataTypes.DOUBLE,
        "field": "DEBT_ASSET_RATIO"
    },
    "CASH_DEPOSIT_PBC": {
        "display": "存放中央银行款项</br>(元)",
        "type": DataTypes.DOUBLE,
        "field": "CASH_DEPOSIT_PBC"
    },
    "CDP_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "CDP_RATIO"
    },
    "LOAN_ADVANCE": {
        "display": "发放贷款及垫款(元)",
        "type": DataTypes.DOUBLE,
        "field": "LOAN_ADVANCE"
    },
    "LOAN_ADVANCE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "LOAN_ADVANCE_RATIO"
    },
    "AVAILABLE_SALE_FINASSET": {
        "display": "可供出售金融资产(元)",
        "type": DataTypes.DOUBLE,
        "field": "AVAILABLE_SALE_FINASSET"
    },
    "ASF_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ASF_RATIO"
    },
    "LOAN_PBC": {
        "display": "向中央银行借款(元)",
        "type": DataTypes.DOUBLE,
        "field": "LOAN_PBC"
    },
    "LOAN_PBC_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "LOAN_PBC_RATIO"
    },
    "ACCEPT_DEPOSIT": {
        "display": "吸收存款(元)",
        "type": DataTypes.DOUBLE,
        "field": "ACCEPT_DEPOSIT"
    },
    "ACCEPT_DEPOSIT_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ACCEPT_DEPOSIT_RATIO"
    },
    "SELL_REPO_FINASSET": {
        "display": "卖出回购金融资产款(元)",
        "type": DataTypes.DOUBLE,
        "field": "SELL_REPO_FINASSET"
    },
    "SRF_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "SRF_RATIO"
    },
    "SETTLE_EXCESS_RESERVE": {
        "display": "结算备付金(元)",
        "type": DataTypes.DOUBLE,
        "field": "SETTLE_EXCESS_RESERVE"
    },
    "SER_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "SER_RATIO"
    },
    "BORROW_FUND": {
        "display": "拆入资金(元)",
        "type": DataTypes.DOUBLE,
        "field": "BORROW_FUND"
    },
    "BORROW_FUND_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "BORROW_FUND_RATIO"
    },
    "AGENT_TRADE_SECURITY": {
        "display": "代理买卖证券款(元)",
        "type": DataTypes.DOUBLE,
        "field": "AGENT_TRADE_SECURITY"
    },
    "ATS_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ATS_RATIO"
    },
    "PREMIUM_RECE": {
        "display": "应收保费(元))",
        "type": DataTypes.DOUBLE,
        "field": "PREMIUM_RECE"
    },
    "PREMIUM_RECE_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "PREMIUM_RECE_RATIO"
    },
    "SHORT_LOAN": {
        "display": "短期借款(元)",
        "type": DataTypes.DOUBLE,
        "field": "SHORT_LOAN"
    },
    "SHORT_LOAN_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "SHORT_LOAN_RATIO"
    },
    "ADVANCE_PREMIUM": {
        "display": "预收保费(元)",
        "type": DataTypes.DOUBLE,
        "field": "ADVANCE_PREMIUM"
    },
    "ADVANCE_PREMIUM_RATIO": {
        "type": DataTypes.DOUBLE,
        "field": "ADVANCE_PREMIUM_RATIO"
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
        modelName: "zcfz",
      }
    );
    module.exports = Zcfz;
    