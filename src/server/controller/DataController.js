import axios from "axios";
const Sequelize = require("sequelize");

import { fn } from "../lib/fn";
const Lrb = require("../db/model/Lrb");
const Zcfzb = require("../db/model/Zcfzb");
const Xjllb = require("../db/model/Xjllb");
const Zyzb = require("../db/model/Zyzb");
const Dbfx = require("../db/model/Dbfx");
const Yj = require("../db/model/Yj");
const Notice = require("../db/model/Notice");
const { db } = require("../db/db");
const fieldMap = {
  jbmgsy: "基本每股收益(元)",
  kfmgsy: "扣非每股收益(元)",
  xsmgsy: "稀释每股收益(元)",
  mgjzc: "每股净资产(元)",
  mggjj: "每股公积金(元)",
  mgwfply: "每股未分配利润(元)",
  mgjyxjl: "每股经营现金流(元)",
  yyzsr: "营业总收入(元)",
  mlr: "毛利润(元)",
  gsjlr: "归属净利润(元)",
  kfjlr: "扣非净利润(元)",
  yyzsrtbzz: "营业总收入同比增长(%)",
  gsjlrtbzz: "归属净利润同比增长(%)",
  kfjlrtbzz: "扣非净利润同比增长(%)",
  yyzsrgdhbzz: "营业总收入滚动环比增长(%)",
  gsjlrgdhbzz: "归属净利润滚动环比增长(%)",
  kfjlrgdhbzz: "扣非净利润滚动环比增长(%)",
  jqjzcsyl: "加权净资产收益率(%)",
  tbjzcsyl: "摊薄净资产收益率(%)",
  tbzzcsyl: "摊薄总资产收益率(%)",
  mll: "毛利率(%)",
  jll: "净利率(%)",
  sjsl: "实际税率(%)",
  yskyysr: "预收款/营业收入",
  xsxjlyysr: "销售现金流/营业收入",
  jyxjlyysr: "经营现金流/营业收入",
  zzczzy: "总资产周转率(次)",
  yszkzzts: "应收账款周转天数(天)",
  chzzts: "存货周转天数(天)",
  zcfzl: "资产负债率(%)",
  ldzczfz: "流动负债/总负债(%)",
  ldbl: "流动比率",
  sdbl: "速动比率",
};

module.exports = {
  summary: async (ctx) => {
    let code = ctx.query.code;
    let data = await Dbfx.findAll({
      where: {
        REPORTTYPE: 0,
      },
      order: [["reportDate", "DESC"]],
    });
    ctx.body = data;
  },
  yjlist: async (ctx) => {
    let code = ctx.query.code;

    let data = await Yj.findAll({ where: { code: code } });
    ctx.body = data;
  },
  notices: async (ctx) => {
    let type = ctx.query.type;
    let p = ctx.query.p || 0;

    let sql = `select * from notice a left join  v_latest_yj b on b.code=a.code where 1=1 ${
      type ? "and a.column_name like '%" + type + "%'" : ""
    } order by a.notice_date desc limit 20 offset :offset`;

    let rows = await db.query(sql, {
      type: db.QueryTypes.SELECT,
      raw: true,
      replacements: { offset: 20 * p },
    });
    /* let data = await Notice.findAndCountAll({
      where: type ? { column_name: { [Sequelize.Op.like]: `%${type}%` } } : {},
      limit: 20,
      offset: 20 * p,
    });*/
    let data = {};
    data.rows = rows;
    data.count = 10000;
    data.pages = Math.ceil(10000 / 20);
    data.pageSize = 20;
    data.page = p;
    ctx.body = data;
  },
};

class fn财务分析_主要指标 extends fn {
  constructor([item]) {
    super(`${item.code}/财务分析_主要指标.json`);
    this.code = item.code;
    this.get = async function() {
      let url = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0&code=${this.code}`;
      return await axios.get(url).then((resp) => resp.data);
    };
  }
}

class DataController {
  static async 财务分析(ctx) {
    let code = ctx.query.code;
    let res = await fn.cacheObject(fn财务分析_主要指标, { code: code });
    console.log(res);
    let xData = res.map((e) => e.date).reverse();
    let yData = res.map((e) => e.kfjlrgdhbzz).reverse();
    console.log(yData);
    chart(xData, yData);
    //(ctx.body = items)
  }
}

function chart(xData, yData) {
  //2，生成图片数据
  var option = {
    color: ["#a11110"],
    title: {
      text: "",
      left: "right",
      top: "top",
    },
    tooltip: {
      formatter: "{b}：{c}",
    },
    grid: {
      x: 3,
      y: 3,
      x2: 40,
      y2: 40,
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {},
    series: {
      type: "bar",
      barWidth: "3",
      data: yData,
    },
  }; //模块引入
  var node_echarts = require("node-echarts");
  var path = require("path");

  node_echarts({
    width: 100, // Image width, type is number.
    height: 100, // Image height, type is number.
    option: option, // Echarts configuration, type is Object.
    //If the path  is not set, return the Buffer of image.
    path: path.join(__dirname, "../image1.png"), // Path is filepath of the image which will be created.
    enableAutoDispose: true, //Enable auto-dispose echarts after the image is created.
  });
}
(async () => {
  DataController.财务分析({ query: { code: "sh600062" } });
})();
