const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*t_v_root*/
    class T_v_root extends Model {}
    T_v_root.init(
      {
    "t_v_root_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "基本每股收益": {
        "type": DataTypes.DOUBLE,
        "field": "基本每股收益"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "reportdate": {
        "type": DataTypes.STRING(10),
        "field": "reportdate"
    },
    "reporttype": {
        "type": DataTypes.DOUBLE,
        "field": "reporttype"
    },
    "typename": {
        "type": DataTypes.STRING(10),
        "field": "typename"
    },
    "扣除非经常性损益后的净利润": {
        "type": DataTypes.DOUBLE,
        "field": "扣除非经常性损益后的净利润"
    },
    "营业总收入": {
        "type": DataTypes.DOUBLE,
        "field": "营业总收入"
    },
    "营业收入": {
        "type": DataTypes.DOUBLE,
        "field": "营业收入"
    },
    "主营业务成本": {
        "type": DataTypes.DOUBLE,
        "field": "主营业务成本"
    },
    "销售收入": {
        "type": DataTypes.DOUBLE,
        "field": "销售收入"
    },
    "营业支出": {
        "type": DataTypes.DOUBLE,
        "field": "营业支出"
    },
    "营业成本": {
        "type": DataTypes.DOUBLE,
        "field": "营业成本"
    },
    "货物销售成本": {
        "type": DataTypes.DOUBLE,
        "field": "货物销售成本"
    },
    "净收益": {
        "type": DataTypes.DOUBLE,
        "field": "净收益"
    },
    "净利润": {
        "type": DataTypes.DOUBLE,
        "field": "净利润"
    },
    "财务费用": {
        "type": DataTypes.DOUBLE,
        "field": "财务费用"
    },
    "成本": {
        "type": DataTypes.DOUBLE,
        "field": "成本"
    },
    "销售费用": {
        "type": DataTypes.DOUBLE,
        "field": "销售费用"
    },
    "管理费用": {
        "type": DataTypes.DOUBLE,
        "field": "管理费用"
    },
    "研发费用": {
        "type": DataTypes.DOUBLE,
        "field": "研发费用"
    },
    "期初股东权益": {
        "type": DataTypes.DOUBLE,
        "field": "期初股东权益"
    },
    "期初短期借款": {
        "type": DataTypes.DOUBLE,
        "field": "期初短期借款"
    },
    "期初长期借款": {
        "type": DataTypes.DOUBLE,
        "field": "期初长期借款"
    },
    "期初应付债券": {
        "type": DataTypes.DOUBLE,
        "field": "期初应付债券"
    },
    "期初一年内到期的非流动性负债": {
        "type": DataTypes.DOUBLE,
        "field": "期初一年内到期的非流动性负债"
    },
    "期初长期融资租赁负债": {
        "type": DataTypes.DOUBLE,
        "field": "期初长期融资租赁负债"
    },
    "所得税": {
        "type": DataTypes.DOUBLE,
        "field": "所得税"
    },
    "负债和股东权益合计": {
        "type": DataTypes.DOUBLE,
        "field": "负债和股东权益合计"
    },
    "流动负债合计": {
        "type": DataTypes.DOUBLE,
        "field": "流动负债合计"
    },
    "短期借款": {
        "type": DataTypes.DOUBLE,
        "field": "短期借款"
    },
    "商誉": {
        "type": DataTypes.DOUBLE,
        "field": "商誉"
    },
    "货币资金": {
        "type": DataTypes.DOUBLE,
        "field": "货币资金"
    },
    "营业税金及附加": {
        "type": DataTypes.DOUBLE,
        "field": "营业税金及附加"
    },
    "手续费及佣金支出": {
        "type": DataTypes.DOUBLE,
        "field": "手续费及佣金支出"
    },
    "上期净利润": {
        "type": DataTypes.DOUBLE,
        "field": "上期净利润"
    },
    "上期主要业务收入": {
        "type": DataTypes.DOUBLE,
        "field": "上期主要业务收入"
    },
    "上期主营业务收入": {
        "type": DataTypes.DOUBLE,
        "field": "上期主营业务收入"
    },
    "本年营业利润总额": {
        "type": DataTypes.DOUBLE,
        "field": "本年营业利润总额"
    },
    "上年营业利润总额": {
        "type": DataTypes.DOUBLE,
        "field": "上年营业利润总额"
    },
    "利润总额": {
        "type": DataTypes.DOUBLE,
        "field": "利润总额"
    },
    "营业净利": {
        "type": DataTypes.DOUBLE,
        "field": "营业净利"
    },
    "营业利润": {
        "type": DataTypes.DOUBLE,
        "field": "营业利润"
    },
    "_基本每股收益": {
        "type": DataTypes.DOUBLE,
        "field": "_基本每股收益"
    },
    "营业活动净现金流量": {
        "type": DataTypes.DOUBLE,
        "field": "营业活动净现金流量"
    },
    "营业活动净现金流量二": {
        "type": DataTypes.DOUBLE,
        "field": "营业活动净现金流量二"
    },
    "筹资活动现金流出": {
        "type": DataTypes.DOUBLE,
        "field": "筹资活动现金流出"
    },
    "股东权益": {
        "type": DataTypes.DOUBLE,
        "field": "股东权益"
    },
    "流动资产": {
        "type": DataTypes.DOUBLE,
        "field": "流动资产"
    },
    "非流动资产": {
        "type": DataTypes.DOUBLE,
        "field": "非流动资产"
    },
    "非流动负债": {
        "type": DataTypes.DOUBLE,
        "field": "非流动负债"
    },
    "其他流动资产": {
        "type": DataTypes.DOUBLE,
        "field": "其他流动资产"
    },
    "应付款项": {
        "type": DataTypes.DOUBLE,
        "field": "应付款项"
    },
    "应收款项": {
        "type": DataTypes.DOUBLE,
        "field": "应收款项"
    },
    "有价证券": {
        "type": DataTypes.DOUBLE,
        "field": "有价证券"
    },
    "非流动负债合计": {
        "type": DataTypes.DOUBLE,
        "field": "非流动负债合计"
    },
    "固定资产": {
        "type": DataTypes.DOUBLE,
        "field": "固定资产"
    },
    "在建工程": {
        "type": DataTypes.DOUBLE,
        "field": "在建工程"
    },
    "工程物资": {
        "type": DataTypes.DOUBLE,
        "field": "工程物资"
    },
    "流动资产总额": {
        "type": DataTypes.DOUBLE,
        "field": "流动资产总额"
    },
    "流动负债总额": {
        "type": DataTypes.DOUBLE,
        "field": "流动负债总额"
    },
    "总资产": {
        "type": DataTypes.DOUBLE,
        "field": "总资产"
    },
    "期末总资产": {
        "type": DataTypes.DOUBLE,
        "field": "期末总资产"
    },
    "期初总资产": {
        "type": DataTypes.DOUBLE,
        "field": "期初总资产"
    },
    "归属于母公司股东的净利润": {
        "type": DataTypes.DOUBLE,
        "field": "归属于母公司股东的净利润"
    },
    "负债": {
        "type": DataTypes.DOUBLE,
        "field": "负债"
    },
    "负债总额": {
        "type": DataTypes.DOUBLE,
        "field": "负债总额"
    },
    "期初负债总额": {
        "type": DataTypes.DOUBLE,
        "field": "期初负债总额"
    },
    "存货": {
        "type": DataTypes.DOUBLE,
        "field": "存货"
    },
    "期末存货总额": {
        "type": DataTypes.DOUBLE,
        "field": "期末存货总额"
    },
    "预付费用": {
        "type": DataTypes.DOUBLE,
        "field": "预付费用"
    },
    "利息费用": {
        "type": DataTypes.DOUBLE,
        "field": "利息费用"
    },
    "期初存货总额": {
        "type": DataTypes.DOUBLE,
        "field": "期初存货总额"
    },
    "期初应付账款": {
        "type": DataTypes.DOUBLE,
        "field": "期初应付账款"
    },
    "期末应付账款": {
        "type": DataTypes.DOUBLE,
        "field": "期末应付账款"
    },
    "期初应收账款": {
        "type": DataTypes.DOUBLE,
        "field": "期初应收账款"
    },
    "期末应收账款": {
        "type": DataTypes.DOUBLE,
        "field": "期末应收账款"
    },
    "营业活动现金流量": {
        "type": DataTypes.DOUBLE,
        "field": "营业活动现金流量"
    },
    "投资活动现金流量": {
        "type": DataTypes.DOUBLE,
        "field": "投资活动现金流量"
    },
    "融资活动现金流量": {
        "type": DataTypes.DOUBLE,
        "field": "融资活动现金流量"
    },
    "归母收益总额": {
        "type": DataTypes.DOUBLE,
        "field": "归母收益总额"
    },
    "五年内分红": {
        "type": DataTypes.DOUBLE,
        "field": "五年内分红"
    },
    "五年内处置": {
        "type": DataTypes.DOUBLE,
        "field": "五年内处置"
    },
    "五年内购建": {
        "type": DataTypes.DOUBLE,
        "field": "五年内购建"
    },
    "最近5年度营业活动净现金流量": {
        "type": DataTypes.DOUBLE,
        "field": "最近5年度营业活动净现金流量"
    },
    "最近5年度利润": {
        "type": DataTypes.DOUBLE,
        "field": "最近5年度利润"
    },
    "五年前期初存货": {
        "type": DataTypes.DOUBLE,
        "field": "五年前期初存货"
    },
    "总市值": {
        "type": DataTypes.DOUBLE,
        "field": "总市值"
    },
    "负债占资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "负债占资产比率"
    },
    "长期资金占重资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "长期资金占重资产比率"
    },
    "流动比率": {
        "type": DataTypes.DOUBLE,
        "field": "流动比率"
    },
    "速动比率": {
        "type": DataTypes.DOUBLE,
        "field": "速动比率"
    },
    "营业利润率": {
        "type": DataTypes.DOUBLE,
        "field": "营业利润率"
    },
    "净利率": {
        "type": DataTypes.DOUBLE,
        "field": "净利率"
    },
    "收益含金量": {
        "type": DataTypes.DOUBLE,
        "field": "收益含金量"
    },
    "收入现金含量": {
        "type": DataTypes.DOUBLE,
        "field": "收入现金含量"
    },
    "营业利润增长率": {
        "type": DataTypes.DOUBLE,
        "field": "营业利润增长率"
    },
    "营业活动净现金流量增长率": {
        "type": DataTypes.DOUBLE,
        "field": "营业活动净现金流量增长率"
    },
    "现金流量允当比率": {
        "type": DataTypes.DOUBLE,
        "field": "现金流量允当比率"
    },
    "应收款项占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "应收款项占总资产比率"
    },
    "存货占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "存货占总资产比率"
    },
    "其他流动资产占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "其他流动资产占总资产比率"
    },
    "流动资产占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "流动资产占总资产比率"
    },
    "商誉比率": {
        "type": DataTypes.DOUBLE,
        "field": "商誉比率"
    },
    "非流动资产占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "非流动资产占总资产比率"
    },
    "应付款项占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "应付款项占总资产比率"
    },
    "非流动负债占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "非流动负债占总资产比率"
    },
    "股东权益比率": {
        "type": DataTypes.DOUBLE,
        "field": "股东权益比率"
    },
    "税后利润": {
        "type": DataTypes.DOUBLE,
        "field": "税后利润"
    },
    "息税前净利润": {
        "type": DataTypes.DOUBLE,
        "field": "息税前净利润"
    },
    "期初有息负债": {
        "type": DataTypes.DOUBLE,
        "field": "期初有息负债"
    },
    "IC": {
        "type": DataTypes.DOUBLE,
        "field": "IC"
    },
    "税率": {
        "type": DataTypes.DOUBLE,
        "field": "税率"
    },
    "息税前利润": {
        "type": DataTypes.DOUBLE,
        "field": "息税前利润"
    },
    "本期主营业务收入": {
        "type": DataTypes.DOUBLE,
        "field": "本期主营业务收入"
    },
    "营业利润利率": {
        "type": DataTypes.DOUBLE,
        "field": "营业利润利率"
    },
    "毛利": {
        "type": DataTypes.DOUBLE,
        "field": "毛利"
    },
    "利润增长率": {
        "type": DataTypes.DOUBLE,
        "field": "利润增长率"
    },
    "营业费用": {
        "type": DataTypes.DOUBLE,
        "field": "营业费用"
    },
    "流动负债": {
        "type": DataTypes.DOUBLE,
        "field": "流动负债"
    },
    "现金": {
        "type": DataTypes.DOUBLE,
        "field": "现金"
    },
    "约当现金": {
        "type": DataTypes.DOUBLE,
        "field": "约当现金"
    },
    "资产负债率": {
        "type": DataTypes.DOUBLE,
        "field": "资产负债率"
    },
    "扣非净利率": {
        "type": DataTypes.DOUBLE,
        "field": "扣非净利率"
    },
    "期末净资产": {
        "type": DataTypes.DOUBLE,
        "field": "期末净资产"
    },
    "期初净资产": {
        "type": DataTypes.DOUBLE,
        "field": "期初净资产"
    },
    "总资产周转率": {
        "type": DataTypes.DOUBLE,
        "field": "总资产周转率"
    },
    "平均总资产": {
        "type": DataTypes.DOUBLE,
        "field": "平均总资产"
    },
    "平均存货总额": {
        "type": DataTypes.DOUBLE,
        "field": "平均存货总额"
    },
    "期初期末应付账款平均值": {
        "type": DataTypes.DOUBLE,
        "field": "期初期末应付账款平均值"
    },
    "平均应收账款": {
        "type": DataTypes.DOUBLE,
        "field": "平均应收账款"
    },
    "_负债占资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "_负债占资产比率"
    },
    "_长期资金占重资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "_长期资金占重资产比率"
    },
    "_流动比率": {
        "type": DataTypes.DOUBLE,
        "field": "_流动比率"
    },
    "_速动比率": {
        "type": DataTypes.DOUBLE,
        "field": "_速动比率"
    },
    "利息保障倍数": {
        "type": DataTypes.DOUBLE,
        "field": "利息保障倍数"
    },
    "应收款项周转天数": {
        "type": DataTypes.DOUBLE,
        "field": "应收款项周转天数"
    },
    "应付款项周转天数": {
        "type": DataTypes.DOUBLE,
        "field": "应付款项周转天数"
    },
    "资产周转率": {
        "type": DataTypes.DOUBLE,
        "field": "资产周转率"
    },
    "资产回报率": {
        "type": DataTypes.DOUBLE,
        "field": "资产回报率"
    },
    "毛利率": {
        "type": DataTypes.DOUBLE,
        "field": "毛利率"
    },
    "营业费用率": {
        "type": DataTypes.DOUBLE,
        "field": "营业费用率"
    },
    "_收益含金量": {
        "type": DataTypes.DOUBLE,
        "field": "_收益含金量"
    },
    "_收入现金含量": {
        "type": DataTypes.DOUBLE,
        "field": "_收入现金含量"
    },
    "营收增长率": {
        "type": DataTypes.DOUBLE,
        "field": "营收增长率"
    },
    "_营业利润增长率": {
        "type": DataTypes.DOUBLE,
        "field": "_营业利润增长率"
    },
    "_营业活动净现金流量增长率": {
        "type": DataTypes.DOUBLE,
        "field": "_营业活动净现金流量增长率"
    },
    "净资本增长率": {
        "type": DataTypes.DOUBLE,
        "field": "净资本增长率"
    },
    "现金流量比率": {
        "type": DataTypes.DOUBLE,
        "field": "现金流量比率"
    },
    "_现金流量允当比率": {
        "type": DataTypes.DOUBLE,
        "field": "_现金流量允当比率"
    },
    "现金再投资比率": {
        "type": DataTypes.DOUBLE,
        "field": "现金再投资比率"
    },
    "现金占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "现金占总资产比率"
    },
    "_商誉比率": {
        "type": DataTypes.DOUBLE,
        "field": "_商誉比率"
    },
    "流动负债总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "流动负债总资产比率"
    },
    "净资产": {
        "type": DataTypes.DOUBLE,
        "field": "净资产"
    },
    "EBIT": {
        "type": DataTypes.DOUBLE,
        "field": "EBIT"
    },
    "期初投资资本": {
        "type": DataTypes.DOUBLE,
        "field": "期初投资资本"
    },
    "杠杆倍数": {
        "type": DataTypes.DOUBLE,
        "field": "杠杆倍数"
    },
    "权益乘数": {
        "type": DataTypes.DOUBLE,
        "field": "权益乘数"
    },
    "存货总额": {
        "type": DataTypes.DOUBLE,
        "field": "存货总额"
    },
    "存货周转率": {
        "type": DataTypes.DOUBLE,
        "field": "存货周转率"
    },
    "净资产收益率": {
        "type": DataTypes.DOUBLE,
        "field": "净资产收益率"
    },
    "扣非ROE": {
        "type": DataTypes.DOUBLE,
        "field": "扣非ROE"
    },
    "ROIC": {
        "type": DataTypes.DOUBLE,
        "field": "ROIC"
    },
    "_毛利率": {
        "type": DataTypes.DOUBLE,
        "field": "_毛利率"
    },
    "经营安全边际率": {
        "type": DataTypes.DOUBLE,
        "field": "经营安全边际率"
    },
    "_营收增长率": {
        "type": DataTypes.DOUBLE,
        "field": "_营收增长率"
    },
    "_现金流量比率": {
        "type": DataTypes.DOUBLE,
        "field": "_现金流量比率"
    },
    "_现金再投资比率": {
        "type": DataTypes.DOUBLE,
        "field": "_现金再投资比率"
    },
    "_现金占总资产比率": {
        "type": DataTypes.DOUBLE,
        "field": "_现金占总资产比率"
    },
    "投入资本": {
        "type": DataTypes.DOUBLE,
        "field": "投入资本"
    },
    "应收帐款周转天数": {
        "type": DataTypes.DOUBLE,
        "field": "应收帐款周转天数"
    },
    "应收款项周转率": {
        "type": DataTypes.DOUBLE,
        "field": "应收款项周转率"
    },
    "存货周转天数": {
        "type": DataTypes.DOUBLE,
        "field": "存货周转天数"
    },
    "资本回报率": {
        "type": DataTypes.DOUBLE,
        "field": "资本回报率"
    },
    "rank_id": {
        "type": DataTypes.DOUBLE,
        "unique": "index_unique",
        "field": "rank_id"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "t_v_root",
      }
    );
    module.exports = T_v_root;
    