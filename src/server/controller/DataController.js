import axios from "axios";
const Sequelize = require("sequelize");
import moment from "moment";

import { fn } from "../lib/fn";
const Lrb = require("../db/model/Lrb");
const Zcfzb = require("../db/model/Zcfzb");
const Xjllb = require("../db/model/Xjllb");
const Zyzb = require("../db/model/Zyzb");
const Dbfx = require("../db/model/Dbfx");
const Yj = require("../db/model/Yj");
const Notice = require("../db/model/Notice");
const { db } = require("../db/db");
const { getReportDatas } = require("!/db/reports");
import _ from "lodash";

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
  mind: async (ctx) => {
    let code = ctx.query.code;
    let ret = {};

    let infos = await db.query(`select * from hq where code = :code`, {
      logging: console.log,
      type: db.QueryTypes.SELECT,
      raw: true,
      replacements: {
        code: code,
      },
    });
    if (infos.length == 1) {
      let rows = await db.query(
        `select * from v_summary where code = :code order by reportdate desc`,
        {
          logging: console.log,
          type: db.QueryTypes.SELECT,
          raw: true,
          replacements: {
            code: code,
          },
        }
      );
      if (rows.length == 0) {
        await getReportDatas(code);
        rows = await db.query(
          `select * from v_summary where code = :code order by reportdate desc`,
          {
            logging: console.log,
            type: db.QueryTypes.SELECT,
            raw: true,
            replacements: {
              code: code,
            },
          }
        );
      }

      ret.datas = rows;
      ret.info = infos[0];
    }

    ctx.body = ret;
  },
  notices: async (ctx) => {
    let type_id = ctx.query.type_id;
    let p = ctx.query.p || 1;
    p < 1 && (p = 1);
    let pageSize = 30;

    let sql = `select code,max(notice_date) notice_date from notice where (:type_id<>0 and type_id=:type_id) or (:type_id=0) group by code`;
    let count = (
      await db.query(`select count(1) as count from (${sql}) t `, {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        limit: pageSize,
        offset: pageSize * (p - 1),
        replacements: {
          type_id: type_id,
        },
      })
    )[0].count;
    let codeRows = await db.query(
      `${sql} order by notice_date desc limit :limit offset :offset`,
      {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        replacements: {
          type_id: type_id,
          limit: pageSize,
          offset: pageSize * (p - 1),
        },
      }
    );

    let rows2 = await db.query(
      `select * from notice where code in(:codes) and notice_date >=:notice_date order by notice_date desc`,
      {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        replacements: {
          codes: codeRows.map((e) => e.code),
          notice_date: _.min(codeRows.map((e) => e.notice_date)),
        },
      }
    );
    let yjrows = await db.query(
      `select * from yj where code in(:codes) order by reportdate desc`,
      {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        replacements: {
          codes: codeRows.map((e) => e.code),
        },
      }
    );

    let eventRows = await db.query(
      `select * from event where code in(:codes) and rq_date <:fdate  order by rq_date desc`,
      {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        replacements: {
          codes: codeRows.map((e) => e.code),
          fdate: moment()
            .add(30, "days")
            .format("YYYY-MM-DD"),
        },
      }
    );

    let rowsMap = rows2.reduce((m, r) => {
      let code = r.code;
      if (!m[code]) m[code] = [];
      m[code].push(r);
      return m;
    }, {});

    let yjMap = yjrows.reduce((m, r) => {
      let code = r.code;
      if (!m[code]) m[code] = [];
      m[code].push(r);
      return m;
    }, {});
    let eventMap = eventRows.reduce((m, r) => {
      let code = r.code;
      if (!m[code]) m[code] = [];
      m[code].push(r);
      return m;
    }, {});

    let gzRows = await db.query(
      `select  * from gz where tradedate=(select max(tradedate) from gz) and code in(:codes)`,
      {
        logging: console.log,
        type: db.QueryTypes.SELECT,
        raw: true,
        replacements: {
          codes: codeRows.map((e) => e.code),
        },
      }
    );
    let gzMap = gzRows.reduce((m, r) => {
      let code = r.code;
      if (!m[code]) m[code] = [];
      m[code].push(r);
      return m;
    }, {});
    codeRows.map(
      (r) => (
        (r.noticedetails = rowsMap[r.code]),
        (r.yjdetails = yjMap[r.code]),
        (r.gzs = gzMap[r.code]),
        (r.events = eventMap[r.code])
      )
    );
    console.log(count, codeRows, rows2);

    let data = {};
    //data.rows = rows;
    //data.count = 10000;
    data.pages = Math.ceil(count / pageSize);
    data.pageSize = pageSize;
    data.page = p;
    data.rows = codeRows;
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
