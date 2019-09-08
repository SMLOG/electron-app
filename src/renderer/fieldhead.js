//http://push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&fltt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f193,f196,f194,f195,f197,f80,f280,f281,f282,f284,f285,f286,f287&secid=0.000063&cb=jQuery18307043337174798645_1567238815056&_=1567238840267
export const FieldHead = {
  bankuai: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  zijinliu: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber_0(e);
        },
        show: !0
      },
      {
        title: "主力净占比",
        key: "f184",
        color: "f184",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  hushenAStock: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        color: "f4",
        order: !0,
        show: !0,
        name: "Change",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        }
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Low"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Open"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "量比",
        key: "f10",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "VolumeRate"
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "市盈率(动态)",
        key: "f9",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PERation"
      },
      {
        title: "市净率",
        key: "f23",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PB"
      },
      {
        title: "总市值",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "流通市值",
        key: "f21",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "60日涨跌幅",
        key: "f24",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f24",
        show: !1
      },
      {
        title: "年初至今涨跌幅",
        key: "f25",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f25",
        order: !0,
        show: !1
      },
      {
        title: "涨速",
        key: "f22",
        color: "f22",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "5分钟涨跌",
        key: "f11",
        color: "f11",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  opsnewgu: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        color: "f4",
        order: !0,
        show: !0,
        name: "Change",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        }
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Low"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        color: "_f18",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "Open"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        order: !0,
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "市盈率(动态)",
        key: "f9",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PERation"
      },
      {
        title: "市净率",
        key: "f23",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PB"
      },
      {
        title: "上市时间",
        key: "f26",
        order: !0,
        show: !0,
        name: "shtime",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "总市值",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "流通市值",
        key: "f21",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "60日涨跌幅",
        key: "f24",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f24",
        show: !1
      },
      {
        title: "年初至今涨跌幅",
        key: "f25",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f25",
        order: !0,
        show: !1
      },
      {
        title: "涨速",
        key: "f22",
        color: "f22",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "5分钟涨跌",
        key: "f11",
        color: "f11",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "量比",
        key: "f10",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1,
        name: "VolumeRate"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  abgu: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f201,f202,f203,f196,f197,f199,f195,f200",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "B股代码",
        key: "f201",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f202", "f201"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f203",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f202", "f201"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f202", "f201"],
        show: !0,
        name: "Links_abgu"
      },
      {
        title: "最新价",
        key: "f196",
        fixedkey: "f200",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f195",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f197",
        color: "f197",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "A股代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "比价（A/B）",
        key: "f199",
        color: "",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 20
  },
  ahgu: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f193",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Name"
      },
      {
        title: "H股代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "港股吧",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f13", "f12"],
        show: !0,
        name: ""
      },
      {
        title: "A股代码",
        key: "f191",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(RMB)",
        key: "f186",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f185",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f187",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f187",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "A股吧",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f192", "f191"],
        show: !0,
        name: "gangguba"
      },
      {
        title: "比价（A/H）",
        key: "f189",
        color: "",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "溢价（A/H）%",
        key: "f188",
        color: "",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 5
  },
  ahgu2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f193",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Name"
      },
      {
        title: "H股代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "港股吧",
        key: "",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f13", "f12"],
        show: !0,
        name: ""
      },
      {
        title: "A股代码",
        key: "f191",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(RMB)",
        key: "f186",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f185",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f187",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f187",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "A股吧",
        key: "",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f192", "f191"],
        show: !0,
        name: "gangguba"
      },
      {
        title: "比价（A/H）",
        key: "f189",
        color: "",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "溢价（A/H）%",
        key: "f188",
        color: "f188",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 20
  },
  ahgu3: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f191,f192,f193,f186,f185,f187,f189,f188",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f193",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Name"
      },
      {
        title: "H股代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "港股吧",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f13", "f12"],
        show: !0,
        name: ""
      },
      {
        title: "A股代码",
        key: "f191",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f192", "f191"],
        show: !0,
        name: "Code"
      },
      {
        title: "最新价(RMB)",
        key: "f186",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f185",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f187",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f187",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "A股吧",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'>A股吧</a>",
        data: ["f192", "f191"],
        show: !0,
        name: "gangguba"
      },
      {
        title: "比价（A/H）",
        key: "f189",
        color: "",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "溢价（A/H）%",
        key: "f188",
        color: "",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  shhkBoard: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "市盈率(动态)",
        key: "f9",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PERation"
      },
      {
        title: "市净率",
        key: "f23",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PB"
      },
      {
        title: "上市时间",
        key: "f26",
        order: !0,
        show: !0,
        name: "shtime",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "总市值",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "流通市值",
        key: "f21",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !1
      },
      {
        title: "60日涨跌幅",
        key: "f24",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f4",
        show: !1
      },
      {
        title: "年初至今涨跌幅",
        key: "f25",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f4",
        order: !0,
        show: !1
      },
      {
        title: "涨速",
        key: "f22",
        color: "f22",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "5分钟涨跌",
        key: "f11",
        color: "f11",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !1
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  staqnetBoard: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "neeq_stocks"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "委比",
        key: "f33",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberFlag2(e, f);
        },
        order: !0,
        show: !0,
        name: "weibi"
      }
    ],
    sumcount: 20
  },
  indexsh: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "成交量(股)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "量比",
        key: "f10",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "VolumeRate"
      }
    ],
    sumcount: 20
  },
  neeqstocks: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "neeq_stocks"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "委比",
        key: "f33",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberFlag2(e, f);
        },
        color: "f33",
        order: !0,
        show: !0,
        name: "weibi"
      }
    ],
    sumcount: 20
  },
  hkshstocks: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "hk_stocks"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(股)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额(港元)",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  hkstocks: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "hk_stocks"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(股)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额(港元)",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  hkindex: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价(HKD)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        key: "f17",
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(股)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额(港元)",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      }
    ],
    sumcount: 20
  },
  usstocks: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价(美元)",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "开盘价",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高价",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低价",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收价",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "总市值(美元)",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "市盈率",
        key: "f115",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0
      }
    ],
    sumcount: 20
  },
  usindex: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "开盘价",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高价",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低价",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收价",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "zhenfu"
      },
      {
        title: "最新行情时间",
        key: "f124",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberTime(e);
        },
        name: "newtime"
      }
    ],
    sumcount: 20
  },
  globalamerica: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "开盘价",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高价",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低价",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收价",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "zhenfu"
      },
      {
        title: "最新行情时间",
        key: "f124",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberTime(e);
        },
        name: "newtime"
      }
    ],
    sumcount: 20
  },
  globalamerica2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 21
  },
  globalamericaOz: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 23
  },
  globalamerica3: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 6
  },
  globalamerica4: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "usindex_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 3
  },
  conceptboard: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f222",
    head: [
      {
        title: "排名",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "板块名称",
        key: "f14",
        order: !0,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "concept_board"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "总市值",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0
      },
      {
        title: "上涨家数",
        key: "f104",
        color: "red",
        order: !0,
        show: !0
      },
      {
        title: "下跌家数",
        key: "f105",
        color: "green",
        order: !0,
        show: !0
      },
      {
        title: "领涨股票",
        key: "f128",
        order: !0,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f141", "f140"],
        show: !0,
        name: "name",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 20
  },
  conceptboardDatil: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "量比",
        key: "f10",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "VolumeRate"
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "市盈率(动态)",
        key: "f9",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PERation"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 20
  },
  hsgt: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  qhsc_jq: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "所属交易所",
        key: "f13",
        order: !1,
        data: ["f13"],
        newcb: function(e) {
          return r.formatNumberQhsc(e);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  ggsc: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  hkadr: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f213,f214,f220,f219,f217,f218",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "港股名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "港股代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "ADR代码",
        key: "f213",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f214", "f213"],
        show: !0,
        name: "Code"
      },
      {
        title: "ADR收市价(USD)",
        key: "f219",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f217",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f217",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f217",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f218",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f218",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "折合每股港元",
        key: "f220",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "Close"
      }
    ],
    sumcount: 20
  },
  fundcloseend: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "fundcloseend_Links"
      },
      {
        title: "最新价",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        key: "f2",
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "开盘价",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高价",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低价",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  fundcloseend2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "fundcloseend_Links"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "开盘价",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高价",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低价",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 5
  },
  Zqzqzs: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      }
    ],
    sumcount: 5
  },
  bond: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      }
    ],
    sumcount: 20
  },
  bondnew: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      }
    ],
    sumcount: 20
  },
  bondmine: {
    fields: "f1,f2,f3,f4,f14,f12,f13,f62,f128,f136,f152,f184",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      }
    ],
    sumcount: 5
  },
  forex: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  whpj: {
    fields: "f1,f12,f13,f14,f31,f32,f142,f143,f124",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        show: !0
      },
      {
        title: "现汇买入价",
        key: "f31",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "现钞买入价",
        key: "f142",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "现汇卖出价",
        key: "f32",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "现钞卖出价",
        key: "f143",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "更新时间",
        key: "f124",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberTime(e);
        },
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  forex2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "开盘",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 5
  },
  qqsc: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f108,f163,f161,f162",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "持仓量",
        key: "f108",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "行权价",
        key: "f161",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "剩余日",
        key: "f162",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "日增",
        key: "f163",
        order: !0,
        color: "f163",
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Open"
      }
    ],
    sumcount: 20
  },
  gold: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f124",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "品种",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "更新时间",
        key: "f124",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberTime(e);
        },
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  gold2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f28,f11,f62,f128,f136,f115,f152,f133,f124",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "品种",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !1,
        show: !0,
        name: "Low"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "更新时间",
        key: "f124",
        order: !1,
        cb: function(e, f) {
          return r.formatNumberTime(e);
        },
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 5
  },
  hsbk: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105",
    head: [
      {
        title: "排名",
        type: "seq",
        show: !0,
        order: !1,
        name: "number"
      },
      {
        title: "板块名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "concept_board"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "换手率",
        key: "f8",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "涨跌家数",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "zhangdiejia"
      },
      {
        title: "领涨股票",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f136",
        order: !1,
        show: !0
      }
    ],
    sumcount: 10
  },
  hsbkd: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105,f128,f136,f207,f208,f209,f222",
    head: [
      {
        title: "排名",
        type: "seq",
        show: !0,
        order: !1,
        name: "number"
      },
      {
        title: "板块名称",
        key: "f14",
        order: !1,
        href: '<a href="//quote.eastmoney.com/unify/r/{{0}}.{{1}}"></a>',
        data: ["f13", "f12"],
        show: !0,
        name: "name"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "concept_board"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "换手率",
        key: "f8",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "涨跌家数",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "zhangdiejia"
      },
      {
        title: "领跌股票",
        key: "f207",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f209", "f208"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f222",
        color: "f222",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 10
  },
  hsbklz: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f133,f104,f105",
    head: [
      {
        title: "板块名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f136",
        order: !1,
        show: !0
      }
    ],
    sumcount: 5
  },
  hszs: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      }
    ],
    sumcount: 5
  },
  hszs2: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨收",
        key: "f18",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      }
    ],
    sumcount: 12
  },
  mgsc: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "mgsc_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      }
    ],
    sumcount: 5
  },
  mgsc3: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f11,f62,f128,f136,f115,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "mgsc_name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      }
    ],
    sumcount: 5
  },
  indexqh: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f31,f32,f108,f163,f211,f212,f5,f30",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "买入价",
        key: "f31",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "卖出价",
        key: "f32",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "买量",
        key: "f211",
        color: "red",
        order: !0,
        show: !0,
        name: "buycount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "卖量",
        key: "f212",
        color: "green",
        order: !0,
        show: !0,
        name: "sellcount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "总量",
        key: "f5",
        color: "",
        order: !0,
        show: !0,
        name: "Change",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "现量",
        key: "f30",
        color: "",
        order: !0,
        show: !0,
        name: "Change",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "持仓量",
        key: "f108",
        show: !0,
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "日增",
        key: "f163",
        order: !0,
        color: "f163",
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨结算",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  indexqhNew: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f31,f32,f108,f163,f211,f212,f5,f30",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "买入价",
        key: "f31",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "卖出价",
        key: "f32",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "买量",
        key: "f211",
        color: "red",
        order: !0,
        show: !0,
        name: "buycount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "卖量",
        key: "f212",
        color: "green",
        order: !0,
        show: !0,
        name: "sellcount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "总量",
        key: "f5",
        color: "",
        order: !0,
        show: !0,
        name: "Change",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "现量",
        key: "f30",
        color: "",
        order: !0,
        show: !0,
        name: "Change",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "持仓量",
        key: "f108",
        show: !0,
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "日增",
        key: "f163",
        order: !0,
        color: "f163",
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "昨结算",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      }
    ],
    sumcount: 20
  },
  zjs: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f28,f22,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f28",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "买盘(外盘)",
        key: "f34",
        show: !0,
        order: !0
      },
      {
        title: "卖盘(内盘)",
        key: "f35",
        show: !0,
        order: !0
      },
      {
        title: "持仓量",
        key: "f108",
        show: !0,
        order: !0
      }
    ],
    sumcount: 20
  },
  gjqh: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Low"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !0,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "买盘(外盘)",
        key: "f34",
        show: !0,
        order: !0
      },
      {
        title: "卖盘(内盘)",
        key: "f35",
        show: !0,
        order: !0
      },
      {
        title: "持仓量",
        key: "f108",
        show: !0,
        order: !0
      }
    ],
    sumcount: 20
  },
  hjqh: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108,f211,f212",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "代码",
        key: "f12",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !1,
        show: !0,
        name: "Change"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !1,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "今开",
        key: "f17",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Open"
      },
      {
        title: "最高",
        key: "f15",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Hign"
      },
      {
        title: "最低",
        key: "f16",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !1,
        show: !0,
        name: "Low"
      },
      {
        title: "昨结",
        key: "f28",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        order: !1,
        show: !0,
        name: "PreviousClose"
      },
      {
        title: "成交量(手)",
        key: "f5",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "买量(手)",
        key: "f211",
        color: "red",
        order: !1,
        show: !0,
        name: "buycount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "卖量(手)",
        key: "f212",
        color: "green",
        order: !1,
        show: !0,
        name: "sellcount",
        cb: function(e, f) {
          return r.formatNumber(e);
        }
      },
      {
        title: "持仓(手)",
        key: "f108",
        show: !0,
        order: !1
      }
    ],
    sumcount: 5
  },
  hkstocks_cp_asc: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      }
    ],
    sumcount: 5
  },
  CommonVolume: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交量",
        key: "f5",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Volume"
      }
    ],
    sumcount: 5
  },
  CommonAmount: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      }
    ],
    sumcount: 5
  },
  sh_a_cp_desc: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨跌额",
        key: "f4",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f4",
        order: !0,
        show: !0,
        name: "Change"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  AB5MinChangePercent: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "五分钟涨跌幅",
        key: "f11",
        color: "f11",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABTurnoverRate: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABVolumeRate: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "量比",
        key: "f10",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber4(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABAmplitude: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "振幅",
        key: "f7",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "Amplitude"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABAmount: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABPE: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "市盈率",
        key: "f9",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PERation"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABPB: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "市净率",
        key: "f23",
        order: !0,
        show: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        name: "PB"
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABFlowCapitalValue: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "流通市值",
        key: "f21",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABMarketValue: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "总市值",
        key: "f20",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  AB60DayChangePercent: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "60日涨跌幅",
        key: "f24",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f24",
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  AB360DayChangePercent: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "年初至今涨跌幅",
        key: "f25",
        order: !0,
        suffix: "%",
        color: "f25",
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  ABSpeed: {
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f28,f11,f62,f128,f136,f115,f152,f34,f35,f108",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "_f18",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "涨速",
        key: "f22",
        order: !0,
        suffix: "%",
        color: "f22",
        show: !0
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 5
  },
  BoardsCPAsc: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  BoardsCPAscd: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f207,f208,f209,f222",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0
      },
      {
        title: "领跌股",
        key: "f207",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f209", "f208"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f222",
        color: "f222",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  BoardsTurnoverRate: {
    fields: "f1,f2,f3,f8,f14,f12,f13,f62,f128,f136,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "换手率",
        key: "f8",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  BoardsSpeed: {
    fields: "f1,f2,f3,f8,f14,f12,f13,f22,f62,f128,f136,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "涨速",
        key: "f22",
        color: "f22",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber2(e);
        },
        show: !0,
        name: "TurnoverRate"
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 6
  },
  BoardsAmount: {
    fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "成交额",
        key: "f6",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "Amount"
      },
      {
        title: "领涨股",
        key: "f128",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f141", "f140"],
        show: !0,
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "涨跌幅",
        key: "f136",
        color: "f136",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 6
  },
  BoardsPosition: {
    fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152,f184,f225,f226",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "增仓占比",
        key: "f184",
        color: "f184",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberZCZB(e);
        },
        show: !0,
        name: "zczb"
      },
      {
        title: "排名",
        key: "f225",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "paim"
      },
      {
        title: "排行变化",
        key: "f226",
        color: "f226",
        order: !0,
        cb: function(e, f) {
          return r.formatPaiming(e);
        },
        show: !0,
        name: "pmchange"
      }
    ],
    sumcount: 6
  },
  MainCaptialFlow: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber_0(e);
        },
        show: !0
      },
      {
        title: "净占比",
        key: "f184",
        color: "f184",
        order: !1,
        cb: function(e, f) {
          return r.formatNumberJZB(e);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  FFRanking: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184,f223",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0
      },
      {
        title: "净占比",
        key: "f184",
        color: "f184",
        order: !1,
        cb: function(e, f) {
          return r.formatNumberJZB(e);
        },
        show: !0
      },
      {
        title: "排名",
        key: "f223",
        order: !0,
        cb: function(e, f) {
          return r.formatNumber(e);
        },
        show: !0,
        name: "paim"
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  BoardsCaptialFlow: {
    fields: "f1,f2,f3,f6,f8,f14,f12,f13,f22,f62,f128,f136,f152,f204,f184",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href:
          "<a href='//quote.eastmoney.com/center/boardlist.html#boards-{{0}}1'></a>",
        data: ["f12"],
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber_0(e);
        },
        show: !0
      },
      {
        title: "净占比",
        key: "f184",
        color: "f184",
        order: !1,
        cb: function(e, f) {
          return r.formatNumberJZB(e);
        },
        show: !0
      },
      {
        title: "主力流入最大股",
        key: "f204",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f206", "f205"],
        show: !0
      }
    ],
    sumcount: 5
  },
  zijinliuGegu: {
    fields: "f1,f2,f3,f14,f12,f13,f62,f128,f136,f152,f184",
    head: [
      {
        title: "名称",
        key: "f14",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !1,
        show: !0
      },
      {
        title: "涨跌幅",
        key: "f3",
        color: "f3",
        order: !1,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0
      },
      {
        title: "主力净流入",
        key: "f62",
        color: "f62",
        order: !1,
        cb: function(e, f) {
          return r.formatNumber_0(e);
        },
        show: !0
      },
      {
        title: "净占比",
        key: "f184",
        color: "f184",
        order: !1,
        cb: function(e, f) {
          return r.formatNumberJZB(e);
        },
        show: !0
      }
    ],
    sumcount: 5
  },
  fullscreenlist: {
    fields:
      "f1,f152,f2,f3,f12,f13,f14,f227,f228,f229,f230,f231,f232,f233,f234,f235,f236,f237,f238,f239,f240,f241,f242,f26,f243",
    head: [
      {
        title: "序号",
        type: "seq",
        show: !0,
        name: "number"
      },
      {
        title: "转债代码",
        key: "f12",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Code"
      },
      {
        title: "转债名称",
        key: "f14",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f2",
        fixedkey: "f1",
        newcb: function(e, f) {
          return r.formatNumberFlag(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f3",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f3",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "相关链接",
        key: "",
        order: !1,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f13", "f12"],
        show: !0,
        name: "fullscreen_Links"
      },
      {
        title: "正股代码",
        key: "f232",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f233", "f232"],
        show: !0,
        name: "Code"
      },
      {
        title: "正股名称",
        key: "f234",
        order: !0,
        href: "<a href='//quote.eastmoney.com/unify/r/{{0}}.{{1}}'></a>",
        data: ["f233", "f232"],
        show: !0,
        name: "Name"
      },
      {
        title: "最新价",
        key: "f229",
        fixedkey: "f1",
        cb: function(e, f) {
          return r.formatNumberJiaZ(e, 2);
        },
        color: "f230",
        order: !0,
        show: !0,
        name: "Close"
      },
      {
        title: "涨跌幅",
        key: "f230",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        color: "f230",
        order: !0,
        show: !0,
        name: "ChangePercent"
      },
      {
        title: "转股价",
        key: "f235",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "转股价值",
        key: "f236",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberJiaZ(e, 4);
        },
        show: !0,
        name: "zgValue"
      },
      {
        title: "转股溢价率",
        key: "f237",
        order: !0,
        color: "f237",
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0,
        name: "zgYjb"
      },
      {
        title: "纯债溢价率",
        key: "f238",
        color: "f238",
        order: !0,
        fixedkey: "f152",
        newcb: function(e, f) {
          return r.formatNumberIndexZdf(e, f);
        },
        show: !0,
        name: "czYjl"
      },
      {
        title: "回售触发价",
        key: "f239",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0,
        name: "hsCfj"
      },
      {
        title: "强赎触发价",
        key: "f240",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0,
        name: "qsCfj"
      },
      {
        title: "到期赎回价",
        key: "f241",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0,
        name: "dqShj"
      },
      {
        title: "纯债价值",
        key: "f227",
        order: !0,
        cb: function(e, f) {
          return r.formatNumberSyl(e);
        },
        show: !0,
        name: "Volume"
      },
      {
        title: "开始转股日",
        key: "f242",
        order: !0,
        show: !0,
        name: "shtime",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "上市日期",
        key: "f26",
        order: !0,
        show: !0,
        name: "shtime",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "申购日期",
        key: "f243",
        order: !0,
        show: !0,
        name: "shtime",
        cb: function(e, f) {
          return r.formatNumber3(e);
        }
      },
      {
        title: "加自选",
        key: "addzixuan",
        order: !1,
        show: !0,
        name: "Links"
      }
    ],
    sumcount: 50
  }
};
