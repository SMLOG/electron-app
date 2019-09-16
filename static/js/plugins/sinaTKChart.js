xh5_define("plugins.sinaTKChart", ["utils.util"], function(utils_util) {
  "use strict";
  function SinaTKChart(configObj) {
    function isAIndex(symbol) {
      return /^sh000001|sz399001|sz399006|sz399415|sz399416|sz399300|sz000300$/.test(
        symbol
      )
        ? ((user_obj.DKpChart = "dpdk"), (user_obj.DKtChart = "dpdks"), !0)
        : !1;
    }
    function p(t, e) {
      var red = "#f11200",
        green = "#00a800",
        gray = "#666666";
      if (
        "US" == user_obj.market ||
        "HK" == user_obj.market ||
        "LSE" === user_obj.market
      ) {
        var i = red;
        (red = green), (green = i);
      }
      var r = e ? e : 0,
        s = gray;
      return t > r ? (s = red) : r > t && (s = green), s;
    }
    function h(t) {
      for (
        var e = [
            "USDTRY",
            "USDZAR",
            "AUDUSD",
            "USDCAD",
            "USDCHF",
            "USDCNH",
            "CZKUSD",
            "DKKUSD",
            "EURUSD",
            "GBPUSD",
            "USDHKD",
            "USDHUF",
            "ILSUSD",
            "USDINR",
            "USDJPY",
            "USDMXN",
            "MYRUSD",
            "USDNOK",
            "NZDUSD",
            "PLNUSD",
            "USDRUB",
            "SEKUSD",
            "SGDUSD",
            "ARSUSD",
            "USDPHP",
            "USDKRW",
            "USDIDR"
          ],
          a = e.length;
        a--;

      )
        if (t === "fx_s" + e[a].toLowerCase()) return !0;
      return !1;
    }
    function getMarketSetting(marketCode) {
      var o = {
          api: {
            t: {},
            k: {}
          },
          param: {
            t: {},
            k: {}
          }
        },
        TKFColorSettings = {
          K_RISE: "#23bc01",
          K_FALL: "#f11200",
          T_RISE: "#23bc01",
          T_FALL: "#f11200",
          F_RISE: "#23bc01",
          F_FALL: "#f11200"
        },
        r = {
          dim: {},
          menu: {
            menu_rek: !1,
            user_obj: user_obj,
            tab: [
              {
                lab: "分时",
                v: "ts",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ]
          },
          param: {
            t: {
              theme: TKFColorSettings
            },
            k: {
              theme: TKFColorSettings
            }
          },
          api: {
            t: {
              tCharts: [
                [
                  {
                    name: "TVOL"
                  }
                ]
              ],
              setCustom: {
                show_floater: !1,
                mousewheel_zoom: !1,
                touch_prevent: !1
              }
            },
            k: {
              tCharts: [
                [
                  {
                    name: "VOLUME"
                  }
                ]
              ],
              setCustom: {
                show_floater: !1,
                touch_prevent: !1
              },
              showRangeSelector: {
                display: !1
              }
            }
          }
        },
        s = {
          dim: {},
          menu: {
            user_obj: user_obj,
            menu_rek: !1
          },
          param: {
            t: {
              theme: TKFColorSettings
            },
            k: {
              theme: TKFColorSettings
            }
          },
          api: {
            t: {
              setCustom: {
                indicator_reheight: !0,
                allow_indicator_edit: !0,
                storage_lv: 2
              },
              showRangeSelector: {
                display: !0
              }
            },
            k: {
              setCustom: {
                indicator_reheight: !0,
                allow_indicator_edit: !0,
                storage_lv: 2
              },
              showRangeSelector: {
                display: !0
              }
            }
          }
        };
      if (user_obj.iswap || (user_obj.menu && user_obj.menu.menu_wapmore)) {
        var l = {
          tCharts: tSetting,
          setCustom: {
            allow_indicator_edit: !0,
            mousewheel_zoom: !0
          }
        };
        switch (
          (user_obj.menu &&
            user_obj.menu.menu_wapmore &&
            ("HK" != marketCode &&
              (l.showRangeSelector = {
                display: !0
              }),
            (r.api.t = l),
            (r.api.k = {
              pCharts: [
                [
                  {
                    name: "MA"
                  }
                ]
              ],
              tCharts: t2Setting,
              setCustom: {
                allow_indicator_edit: !0,
                mousewheel_zoom: !0
              },
              showRangeSelector: {
                display: !0
              }
            })),
          marketCode)
        ) {
          case "OTC":
            r.param = o.param;
            break;
          case "global_index":
            r.menu.tab = [
              {
                lab: "分时",
                v: "ts",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "op_m":
            r.menu.tab = [
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "US":
            switch (
              ((r.menu.tab = [
                {
                  lab: "分时",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "5日",
                  v: "t5",
                  t: "T"
                },
                {
                  lab: "日K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "周K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "月K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "更多",
                  v: "more",
                  t: "K"
                }
              ]),
              (r.menu.more = [
                {
                  lab: "5分",
                  v: "k5",
                  t: "K"
                },
                {
                  lab: "15分",
                  v: "k15",
                  t: "K"
                },
                {
                  lab: "30分",
                  v: "k30",
                  t: "K"
                },
                {
                  lab: "1月",
                  v: "km1",
                  t: "K"
                },
                {
                  lab: "3月",
                  v: "km3",
                  t: "K"
                },
                {
                  lab: "1年",
                  v: "km12",
                  t: "K"
                }
              ]),
              (r.api.t.setLineStyle = {
                linetype: "mountain"
              }),
              (r.api.t.showScale = "pct"),
              user_obj.symbol)
            ) {
              case "gb_dji":
                user_obj.symbol = "gb_$dji";
                break;
              case "gb_ixic":
                user_obj.symbol = "gb_$ixic";
                break;
              case "gb_inx":
                user_obj.symbol = "gb_$inx";
            }
            break;
          case "CN":
          case "REPO":
            var c = [
                {
                  lab: "分时",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "日K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "周K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "月K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "更多",
                  v: "more",
                  t: "K"
                }
              ],
              m = [
                {
                  lab: "分时",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "B/S点",
                  v: "kdd",
                  t: "K"
                },
                {
                  lab: "日K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "周K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "月K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "更多",
                  v: "more",
                  t: "K"
                }
              ];
            (r.menu.tab =
              isA(user_obj.symbol) &&
              user_obj.mt &&
              (user_obj.iswap || (user_obj.menu && !user_obj.menu.menu_wapmore))
                ? m
                : c),
              (r.menu.more = [
                {
                  lab: "5分",
                  v: "k5",
                  t: "K"
                },
                {
                  lab: "15分",
                  v: "k15",
                  t: "K"
                },
                {
                  lab: "30分",
                  v: "k30",
                  t: "K"
                },
                {
                  lab: "60分",
                  v: "k60",
                  t: "K"
                }
              ]),
              (r.param = o.param);
            break;
          case "HF":
            (r.menu.tab = [
              {
                lab: "分时",
                v: "ts",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ]),
              (r.api.t.showScale = "pct"),
              (r.param = o.param);
            break;
          case "HK":
        }
        o = r;
      } else {
        switch (marketCode) {
          case "GOODS":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "ts",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ]),
              (s.api.t = {
                tCharts: [
                  [
                    {
                      name: "TVOL"
                    },
                    {
                      name: "BLANKCTN"
                    }
                  ],
                  {
                    callback: function() {
                      indicatorTab(_tChart);
                    }
                  }
                ],
                setCustom: {
                  allow_indicator_edit: !0,
                  storage_lv: 2,
                  mousewheel_zoom: !1
                }
              }),
              (s.api.t.showScale = "pct"),
              (s.param = o.param);
            break;
          case "LSE":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "ts",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ]),
              (s.api.t = {
                setCustom: {
                  allow_indicator_edit: !0,
                  storage_lv: 2,
                  mousewheel_zoom: !1
                }
              }),
              (s.api.t.showScale = "pct");
            break;
          case "BTC":
            var d =
              "btc_btcokcoin" == user_obj.symbol
                ? [
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                    }
                  ]
                : [
                    {
                      lab: "1分",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                    }
                  ];
            (s.menu.tab = d), (s.param.k.view = "kd");
            break;
          case "forex":
          case "forex_yt":
            (s.menu.tab =
              "forex" == marketCode
                ? [
                    {
                      lab: "1分",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "年K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60分",
                      v: "k60",
                      t: "K"
                    },
                    {
                      lab: "4H",
                      v: "k240",
                      t: "K"
                    }
                  ]
                : [
                    {
                      lab: "1分",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "年K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                    }
                  ]),
              (s.param.k.view = h(user_obj.symbol) ? "k1" : "kd"),
              (s.param = {
                t: {
                  theme: null
                },
                k: {
                  theme: null
                }
              }),
              (s.param.k.nfloat = 4);
            break;
          case "OTC":
            (s.menu.tab = a(configObj.symbol)
              ? [
                  {
                    lab: "年线",
                    v: "kcl",
                    t: "K"
                  },
                  {
                    lab: "日K",
                    v: "kd",
                    t: "K"
                  },
                  {
                    lab: "周K",
                    v: "kw",
                    t: "K"
                  },
                  {
                    lab: "月K",
                    v: "km",
                    t: "K"
                  },
                  {
                    lab: "年K",
                    v: "ky",
                    t: "K"
                  }
                ]
              : [
                  {
                    lab: "分时",
                    v: "t1",
                    t: "T"
                  },
                  {
                    lab: "年线",
                    v: "kcl",
                    t: "K"
                  },
                  {
                    lab: "日K",
                    v: "kd",
                    t: "K"
                  },
                  {
                    lab: "周K",
                    v: "kw",
                    t: "K"
                  },
                  {
                    lab: "月K",
                    v: "km",
                    t: "K"
                  },
                  {
                    lab: "年K",
                    v: "ky",
                    t: "K"
                  }
                ]),
              (s.param = o.param),
              (s.param.k.candlenum = 70),
              (s.api.t = {
                tCharts: [
                  [
                    {
                      name: "TVOL"
                    },
                    {
                      name: "LB"
                    },
                    {
                      name: "BLANKCTN"
                    }
                  ],
                  {
                    callback: function() {
                      indicatorTab(_tChart);
                    }
                  }
                ],
                setCustom: {
                  allow_indicator_edit: !0,
                  storage_lv: 2,
                  mousewheel_zoom: !1
                }
              });
            break;
          case "US":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "t1",
                t: "T"
              },
              {
                lab: "5日",
                v: "t5",
                t: "T"
              },
              {
                lab: "年线",
                v: "kcl",
                t: "K"
              },
              {
                lab: "YTD",
                v: "ytd",
                t: "K"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              },
              {
                lab: "年K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5分",
                v: "k5",
                t: "K"
              },
              {
                lab: "15分",
                v: "k15",
                t: "K"
              },
              {
                lab: "30分",
                v: "k30",
                t: "K"
              },
              {
                lab: "60分",
                v: "k60",
                t: "K"
              }
            ]),
              (s.api.t.setLineStyle = {
                linetype: "mountain"
              }),
              (s.api.t.showScale = "pct");
            break;
          case "HK":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "t1",
                t: "T"
              },
              {
                lab: "5日",
                v: "t5",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              },
              {
                lab: "年K",
                v: "ky",
                t: "K"
              }
            ]),
              (s.menu.menu_rek = !0);
            break;
          case "op_m":
            s.menu.tab = [
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "global_index":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "t1",
                t: "T"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              },
              {
                lab: "年K",
                v: "ky",
                t: "K"
              }
            ]),
              (s.api.t.setCustom.mousewheel_zoom = !1),
              (s.api.t.showRangeSelector.display = !1);
            break;
          case "HF":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "t1",
                t: "T"
              },
              {
                lab: "年线",
                v: "kcl",
                t: "K"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              },
              {
                lab: "年K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5分",
                v: "k5",
                t: "K"
              },
              {
                lab: "15分",
                v: "k15",
                t: "K"
              },
              {
                lab: "30分",
                v: "k30",
                t: "K"
              },
              {
                lab: "60分",
                v: "k60",
                t: "K"
              }
            ]),
              (s.api.t.showScale = "pct"),
              (s.tchartobject = {
                t: [
                  "MACD",
                  "BOLL",
                  "RSI",
                  "BBIBOLL",
                  "ROC",
                  "TRIX",
                  "DMA",
                  "EXPMA",
                  "BIAS",
                  "VR"
                ],
                k: [
                  "MACD",
                  "ASI",
                  "BIAS",
                  "BRAR",
                  "CCI",
                  "DMA",
                  "DMI",
                  "KDJ",
                  "PSY",
                  "ROC",
                  "RSI",
                  "SAR",
                  "TRIX",
                  "WR"
                ]
              }),
              (s.param = o.param),
              (s.api.t.setCustom.mousewheel_zoom = !1),
              (s.api.t.showRangeSelector.display = !1);
            break;
          case "CN":
          case "REPO":
            (s.menu.tab =
              (user_obj.mt &&
                ("cnlv1" == user_obj.mt ||
                  "cnlv2" == user_obj.mt ||
                  "cntouzi2" == user_obj.mt) &&
                isAIndex(user_obj.symbol)) ||
              isA(user_obj.symbol)
                ? [
                    {
                      lab: "分时",
                      v: "t1",
                      t: "T"
                    },
                    {
                      lab: "5日",
                      v: "t5",
                      t: "T"
                    },
                    {
                      lab: "年线",
                      v: "kcl",
                      t: "K"
                    },
                    {
                      lab: "B/S点",
                      v: "kdd",
                      t: "K"
                    },
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "年K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60分",
                      v: "k60",
                      t: "K"
                    }
                  ]
                : [
                    {
                      lab: "分时",
                      v: "t1",
                      t: "T"
                    },
                    {
                      lab: "5日",
                      v: "t5",
                      t: "T"
                    },
                    {
                      lab: "年线",
                      v: "kcl",
                      t: "K"
                    },
                    {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "月K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "年K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60分",
                      v: "k60",
                      t: "K"
                    }
                  ]),
              (s.menu.menu_rek = !0),
              (s.param = o.param);
            break;
          case "NF":
            (s.menu.tab = [
              {
                lab: "分时",
                v: "t1",
                t: "T"
              },
              {
                lab: "5日",
                v: "t5",
                t: "T"
              },
              {
                lab: "年线",
                v: "kcl",
                t: "K"
              },
              {
                lab: "日K",
                v: "kd",
                t: "K"
              },
              {
                lab: "周K",
                v: "kw",
                t: "K"
              },
              {
                lab: "月K",
                v: "km",
                t: "K"
              },
              {
                lab: "年K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5分",
                v: "k5",
                t: "K"
              },
              {
                lab: "15分",
                v: "k15",
                t: "K"
              },
              {
                lab: "30分",
                v: "k30",
                t: "K"
              },
              {
                lab: "60分",
                v: "k60",
                t: "K"
              }
            ]),
              (s.api.t.tCharts = [
                [
                  {
                    name: "TVOL"
                  },
                  {
                    name: "POSITION"
                  },
                  {
                    name: "BLANKCTN"
                  }
                ],
                {
                  callback: function() {
                    indicatorTab(_tChart);
                  }
                }
              ]),
              (s.api.t.showScale = "pct"),
              (s.param = o.param);
        }
        o = s;
      }
      return o;
    }
    function b(t) {
      for (var e, a = 0; 6 > a; a++) {
        e = $C("span");
        e.style.display = "block";
        e.style.styleFloat = "left";
        e.style.cssFloat = "left";
        e.style.width = "33%";
        e.style.lineHeight = "normal";
        t.appendChild(e);
      }
    }
    function v() {
      (config.dim = {
        H_T_G: 40,
        H_T_T: 0,
        posX: 55
      }),
        (h5kOptions.dim = {
          H_T_G: 40,
          H_T_T: 0,
          posX: 45
        }),
        (h5kOptions.candlenum = 45);
    }
    function k(t) {
      switch (t) {
        case 0:
        case 1:
        case 2:
          return "t";
        case 23:
        case 24:
        case 25:
          return 23;
        case 167:
        case 168:
        case 169:
          return 167;
        case 719:
        case 720:
        case 721:
          return 719;
        default:
          return t;
      }
    }
    function f(e) {
      if (e.info.data) {
        var viewRangeState = e.info.viewRangeState,
          viewId = k(viewRangeState.viewId);
        if (!isNaN(viewRangeState.start) && !isNaN(viewRangeState.end)) {
          var o,
            i,
            r,
            s,
            l,
            c,
            m = document.getElementById("mainarea_" + e.chart.getChartId());
          if (
            ("t" == e.type
              ? ((s = e.info.data[0].length),
                (l = [viewRangeState.start * s, viewRangeState.end * s - 1]),
                (c = e.chart.getSymbols()[0] + "|" + viewId))
              : ((l =
                  viewRangeState.dataLength < e.info.minCandleNum
                    ? [0, e.info.minCandleNum - 1]
                    : [viewRangeState.start, viewRangeState.end]),
                (c = e.chart.getSymbols()[0] + "|" + viewId)),
            e.info.isCompare
              ? "t" == e.type
                ? ((i = e.info.data[0][0].prevclose),
                  (o = [(e.info.range[0] + 1) * i, (e.info.range[1] + 1) * i]))
                : ((r = e.info.data[0]),
                  (i = r.close / (1 + r.percent)),
                  (o = [(e.info.range[1] + 1) * i, (e.info.range[0] + 1) * i]))
              : (o =
                  "t" == e.type
                    ? e.info.range
                    : [e.info.range[1], e.info.range[0]]),
            user_obj.dotTool && "k" == e.type)
          )
            if (user_obj.dotTool.inited)
              ~[23, 24, 25, 364, 365, 366].indexOf(viewId)
                ? (user_obj.dotTool.show(),
                  user_obj.dotTool.update({
                    zoom: l,
                    domain: o,
                    width: e.info.width,
                    height: e.info.height,
                    top: e.info.top,
                    left: e.info.left,
                    rangeData: e.info.data
                  }))
                : user_obj.dotTool.hide();
            else {
              var d = user_obj.settingCfg.tkChart.showDotTool;
              user_obj.dotTool.init({
                parentDiv: m,
                width: e.info.width,
                height: e.info.height,
                top: e.info.top,
                left: e.info.left,
                zoom: l,
                domain: o,
                rangeData: e.info.data,
                onclick: function(e) {
                  utils_util.suda("go_LHB"), window.open(e.data[0].url);
                },
                tip: {
                  show: !0,
                  formatter: function(t) {
                    return t.date + ":龙虎榜";
                  }
                },
                alwaysHide: d && !d.alwaysShow
              });
            }
          if (user_obj.paintTool)
            if (user_obj.paintTool.param) {
              var p = {
                zoom: l,
                domain: o,
                parentDiv: m,
                width: e.info.width,
                height: e.info.height,
                top: e.info.top,
                left: e.info.left,
                shapeListName: c
              };
              "k" == e.type &&
                (p.data = chartH5t.getExtraData({
                  name: "currentK",
                  clone: !1
                })),
                user_obj.paintTool.update(p);
            } else {
              var h = {
                shapeListName: c,
                localStorage: !0,
                parentDiv: m,
                width: e.info.width,
                height: e.info.height,
                top: e.info.top,
                left: e.info.left,
                showZIndex: 35,
                interactZIndex: 55,
                zoom: l,
                domain: e.info.range,
                style: {
                  strokeStyle: "#000",
                  lineWidth: 1
                },
                paintOnEachCenter: !0,
                saveKeyPreName: "sinatkchart_paintSth_",
                checkIfNotSave: function(t) {
                  return (
                    t && t.match(/sinatkchart_paintSth_[\S]*\|(t|5|15|30|60)/)
                  );
                }
              };
              "k" == e.type &&
                (h.data = chartH5t.getExtraData({
                  name: "currentK",
                  clone: !1
                })),
                user_obj.paintTool.init(h);
            }
          viewId != j && sinaTKChartObj.re("PAINTTOOL_VIEW_CHANGEED", viewId),
            (j = viewId);
        }
      }
    }
    function getDefaultChartSetting() {
      var a = new Date().getTime() + Math.floor(987654321 * Math.random() + 1);
      return {
        charts_dom_id: "KKE_chart_" + a,
        //  charts_Start: "T",
        charts_Start: "K",
        charts_hasTChart: !1,
        stock_stutas: void 0,
        compare: {
          color: ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"],
          userObj: user_obj,
          tkchart: sinaTKChartObj,
          dis_compare: !1,
          compare_dom_id: "KKE_compare_" + a,
          compare_dom_left: "5px",
          compare_dom_h: 23
        },
        menu: {
          dis_menu: !0,
          menu_rek: void 0,
          menu_wapmore: !1,
          menu_dom_id: "KKE_menu_" + a,
          menu_dom_h: 30
        },
        zoom: {
          zoom_btn: !1
        },
        range: {
          rangeCon: "",
          rangeColor: ["#666", "#666", "#666", "#666", "#666", "#666"],
          rangeLabel:
            "margin-left:2px;margin-right:1px;border:#ffffff solid 1px;padding: 1px 2px;text-align: center;",
          rangeValue: "display: inline-block;",
          range_font: void 0,
          range_dom_id: "KKE_range_" + a,
          range_dom_h: 20,
          dis_range: !0
        },
        dim: {
          H_T_B: 0,
          H_BLK: 22,
          I_V_O: -22
        },
        param: {
          t: {
            onrange: function(t) {
              f({
                chart: _tChart,
                info: t,
                type: "t"
              });
            },
            oninnerresize: function(t) {
              configObj.paintTool && configObj.paintTool.resize(t);
            },
            onviewprice: function(e) {
              if (e.data && $DOM(chartsSetting.range.range_dom_id)) {
                var a = e.data,
                  n =
                    user_obj.iswap ||
                    (user_obj.menu && user_obj.menu.menu_wapmore)
                      ? a.time
                      : a.day,
                  o = Number(a.volume);
                Number(o) < 0 && (o = 0), a.price < 0 && (a.price = 0);
                var i = 2;
                if (user_obj) {
                  switch (user_obj.market) {
                    case "US":
                    case "HK":
                      i =
                        user_obj.param &&
                        user_obj.param.t &&
                        user_obj.param.t.nfloat
                          ? user_obj.param.t.nfloat
                          : utils_util.strUtil.nfloat(a.price);
                      break;
                    case "LSE":
                      i = 3;
                  }
                  user_obj.param &&
                    user_obj.param.t &&
                    user_obj.param.t.ennfloat &&
                    (i = user_obj.param.t.nfloat || 2);
                }
                (a.percent = isNaN(a.percent)
                  ? "--"
                  : (100 * a.percent).toFixed(2)),
                  (o = 0 == o ? 0 : utils_util.strUtil.vs(o, !0));
                var s = Number(a.avg_price).toFixed(i),
                  l = [
                    n,
                    " 价:",
                    Number(a.price).toFixed(i),
                    " 均:",
                    s,
                    " 量:",
                    o,
                    " 幅:",
                    a.percent + "%"
                  ];
                if (user_obj) {
                  var c = user_obj.market;
                  if (("US" === c && l.splice(3, 2), "HK" === c)) {
                    var m = user_obj.symbol.length;
                    user_obj.symbol.substring(m - 1, m) >= "A" &&
                      (s = l[4] = "-");
                  }
                  ("LSE" === c || "US" === c) && (s = "--");
                }
                var d;
                if (
                  user_obj.iswap ||
                  (user_obj.menu && user_obj.menu.menu_wapmore)
                ) {
                  var h = $DOM(chartsSetting.range.range_dom_id).childNodes;
                  for (d = 0; d < h.length; d++) {
                    var u;
                    (h[d].innerHTML = ""),
                      l[2 * d] &&
                        ((u = 0 == d ? l[2 * d] : l[2 * d - 1] + l[2 * d]),
                        (h[d].innerHTML = u));
                  }
                } else {
                  var b =
                    e.curname.length > 4
                      ? e.curname.substring(0, 5) + ".."
                      : e.curname;
                  ((utils_util.isObj(e.data_array) &&
                    e.data_array.length > 1) ||
                    e.data_array > 1) &&
                    (l[0] = l[0] + " [" + b + "] ");
                  var v, k;
                  "HF" == user_obj.market
                    ? (v = k = "")
                    : ((v =
                        '<span style="color:' +
                        param.range.rangeColor[2] +
                        ';" class="' +
                        param.range.rangeLabel +
                        '">量</span>'),
                      (k =
                        '<span class="' +
                        param.range.rangeValue +
                        '">' +
                        o +
                        "</span>"));
                  var f = [
                    l[0],
                    '<span style="color:' +
                      param.range.rangeColor[0] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">价</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      Number(a.price).toFixed(i) +
                      "</span>",
                    '<span style="color:' +
                      param.range.rangeColor[1] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">均</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      s +
                      "</span>",
                    v,
                    k,
                    '<span style="color:' +
                      param.range.rangeColor[3] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">幅</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.percent +
                      "%</span>"
                  ];
                  if ("cntouzi2" != user_obj.mt)
                    for (d = 0; d < f.length; d++)
                      (f[d] = f[d].replace('" class="', " ")),
                        (f[d] = f[d].replace("class", "style"));
                  $DOM(chartsSetting.range.range_dom_id).innerHTML = f.join("");
                }
              }
            }
          },
          k: {
            onrange: function(t) {
              f({
                chart: chartH5t,
                info: t,
                type: "k"
              });
            },
            oninnerresize: function(t) {
              configObj.paintTool && configObj.paintTool.resize(t),
                configObj.dotTool && configObj.dotTool.update(t);
            },
            onviewprice: function(e) {
              if ($DOM(chartsSetting.range.range_dom_id)) {
                var a = e.data,
                  n = a.close / (1 + Number(a.percent));
                (a.percent = isNaN(a.percent)
                  ? "--"
                  : (100 * a.percent).toFixed(2)),
                  (a.ampP = isNaN(a.ampP) ? "--" : (100 * a.ampP).toFixed(2));
                var o = Number(a.volume);
                o = 0 == o ? 0 : utils_util.strUtil.vs(o, !0);
                var i = "";
                if (
                  (menuTab &&
                    "CN" == user_obj.market &&
                    isA(user_obj.symbol)) ||
                  "HK" === user_obj.market
                ) {
                  var s = 0;
                  bridge.load(
                    {
                      uid: [
                        user_obj.CFGSETTING_IFRAME_PREFIX,
                        new Date().getTime(),
                        Math.floor(987654321 * Math.random() + 1)
                      ].join("|"),
                      key: user_obj.CFGSETTING_IFRAME_PREFIX
                    },
                    function(t) {
                      if (
                        ((s = t ? JSON.parse(t).kChart.setReK : 0),
                        "kd" == menuTab.chooseTab.tab ||
                          "kw" == menuTab.chooseTab.tab ||
                          "km" == menuTab.chooseTab.tab ||
                          "kcl" == menuTab.chooseTab.tab)
                      )
                        switch (s) {
                          case "0":
                            i = "";
                            break;
                          case "1":
                            i = '<span style="color:#ff0000">[后复权]</span>';
                            break;
                          case "-1":
                            i = '<span style="color:#ff0000">[前复权]</span>';
                        }
                      else
                        "kdd" == menuTab.chooseTab.tab &&
                          (i = '<span style="color:#ff0000">[前复权]</span>');
                    },
                    !0
                  );
                }
                if (e.data_array.length > 1) {
                  var l =
                    e.curname.length > 4
                      ? e.curname.substring(0, 5) + ".."
                      : e.curname;
                  i = '<span style="color:#000000">[' + l + "]</span>";
                }
                var c = [
                  a.day,
                  " ",
                  a.time || "",
                  i,
                  " 开:",
                  a.open.toFixed(2),
                  " 高:",
                  a.high.toFixed(2),
                  " 幅:",
                  a.percent + "%",
                  " 收:",
                  a.close && a.close.toFixed(2),
                  " 低:",
                  a.low.toFixed(2),
                  " 量:",
                  o
                ];
                if (
                  user_obj.iswap ||
                  (user_obj.menu && user_obj.menu.menu_wapmore)
                ) {
                  var m = $DOM(chartsSetting.range.range_dom_id).childNodes;
                  c.splice(0, 4), c.unshift(a.day);
                  for (var h, u = 0, b = m.length; b > u; u++)
                    (h = 0 == u ? c[2 * u] : c[2 * u - 1] + c[2 * u]),
                      (m[u].innerHTML = h);
                } else {
                  var v, k;
                  "HF" == user_obj.market
                    ? (v = k = "")
                    : ((k =
                        '<span style="color:' +
                        param.range.rangeColor[4] +
                        ';" class="' +
                        param.range.rangeLabel +
                        '">量</span>'),
                      (v =
                        '<span class="' +
                        param.range.rangeValue +
                        '">' +
                        o +
                        "</span>"));
                  var f = [
                    c[0],
                    '<span style="color:' +
                      param.range.rangeColor[0] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">开</span>',
                    '<span style="color:' +
                      p(a.open, n) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.open.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      param.range.rangeColor[1] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">高</span>',
                    '<span style="color:' +
                      p(a.high, n) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.high.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      param.range.rangeColor[2] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">收</span>',
                    '<span style="color:' +
                      p(a.close, n) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.close.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      param.range.rangeColor[3] +
                      ';" class="' +
                      param.range.rangeLabel +
                      '">低</span>',
                    '<span style="color:' +
                      p(a.low, n) +
                      ';" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.low.toFixed(2) +
                      "</span>",
                    k,
                    v,
                    '<span style="color:' +
                      p(a.change) +
                      ';margin-left: 4px;;" class="' +
                      param.range.rangeValue +
                      '">' +
                      a.percent +
                      "%</span>"
                  ];
                  if (
                    ("CN" !== user_obj.market ||
                      (23 !== j && 24 !== j && 25 !== j) ||
                      !utils_util.isCNK(user_obj.symbol) ||
                      (a.postVol &&
                        (f = f.concat([
                          '<span style="color:' +
                            param.range.rangeColor[4] +
                            ';" class="' +
                            param.range.rangeLabel +
                            '">盘后量|额</span>',
                          '<span class="' +
                            param.range.rangeValue +
                            '">' +
                            (0 === a.postVol
                              ? 0
                              : utils_util.strUtil.vs(a.postVol, !0)) +
                            " " +
                            (0 === a.postAmt
                              ? 0
                              : utils_util.strUtil.vs(a.postAmt, !0)) +
                            "</span>"
                        ]))),
                    "cntouzi2" != user_obj.mt)
                  )
                    for (u = 0; u < f.length; u++)
                      (f[u] = f[u].replace('" class="', " ")),
                        (f[u] = f[u].replace("class", "style"));
                  $DOM(chartsSetting.range.range_dom_id).innerHTML = f.join("");
                }
              }
            }
          }
        },
        api: {
          t: {
            setCustom: {
              show_underlay_vol: !1
            },
            tCharts: tSetting
          },
          k: {
            setCustom: {
              show_underlay_vol: !1
            },
            pCharts: [
              [
                {
                  name: "MA"
                }
              ]
            ],
            tCharts: t2Setting
          }
        }
      };
    }
    function K(t) {
      for (var e = [], a = 0, n = t.length; n > a; a++)
        e.push({
          date: t[a].dt.replace(/-/g, "/"),
          data: [
            {
              url: t[a].url
            }
          ]
        });
      return e;
    }
    function _() {
      var t = h(user_obj.symbol) ? "k1" : "kd";
      "k1" != t &&
        C({
          view: t
        });
      var e = new Date(),
        a = new Date();
      "k1" == t &&
        chartH5t.showView("k1", {
          callback: function() {
            chartH5t.setLineStyle({
              linetype: "line"
            });
            chartH5t.pCharts(null, {
              toremove: !0,
              noLog: 1
            });
            var t = 60 * e.getTimezoneOffset() * 1e3;
            e.setTime(e.getTime() + t);
            e.setHours(e.getHours() + 4);
            a = new Date(99999, 9, 9);
            chartH5t.dateFromTo(e, a);
            KKE.api(
              "patch.forex.newhqtime",
              {
                symbol: user_obj.symbol,
                timeSymbol: "sys_time",
                interval: 30,
                offset: 30
              },
              function(t) {
                t &&
                  chartH5t.pushData({
                    symbol: user_obj.symbol,
                    data: t
                  }),
                  chartH5t.pCharts(null, {
                    toremove: !0,
                    noLog: 1
                  });
              }
            );
          }
        });
    }
    function w() {
      cookieUtil.get("kke_CnLv1_PPT_v2") ||
        !user_obj.mt ||
        ("cnlv1" != user_obj.mt && "cnlv2" != user_obj.mt) ||
        KKE.api(
          "tools.pptsetting.get",
          function() {
            KKE.api(
              "ppt.ppt.get",
              {
                menu: menuTab,
                userObj: user_obj
              },
              null
            );
          },
          null
        );
    }
    function y() {
      KKE.api("plugins.paintSth.get", {}, function(t) {
        (user_obj.paintTool = t),
          t.bind("save", function() {
            try {
              var t = JSON.parse(arguments[1]);
              for (var e in t)
                if (t.hasOwnProperty(e))
                  for (var a = t[e].length; a--; ) delete t[e][a].style;
              SUDA.uaTrack(
                "chart_draw",
                encodeURIComponent(arguments[0]) +
                  "$$$$" +
                  encodeURIComponent(JSON.stringify(t))
              );
            } catch (n) {}
          });
      });
      user_obj.uParam = param.menu.menu_dom_h + 2 + param.range.range_dom_h;
      KKE.api(
        "plugins.userpanel.get",
        {
          userObj: user_obj,
          chartId: param.domid,
          menu: menuTab,
          chart: sinaTKChartObj
        },
        function() {}
      );
    }
    function C(t) {
      if (!param.iswap && !param.menu.menu_wapmore) {
        for (var e = 0; e < param.menu.tab.length; e++) {
          var a = param.menu.tab[e].v;
          if (a == t.view) {
            !t.active && (t.active = e);
            break;
          }
        }
        menuTab &&
          ((menuTab.chooseTab.tye = "t" == t.view.substring(0, 1) ? "T" : "K"),
          menuTab.setTarget(t.active || 0));
      }
    }
    utils_util.xh5_EvtDispatcher.call(this);
    var _tChart,
      chartH5t,
      menuTab,
      sinaTKChartObj = this,
      user_obj = configObj;
    this.me = sinaTKChartObj;
    var indicatorTabLogger = {},
      indicatorTab = function(t) {
        var e,
          a,
          n,
          o,
          chartId = t.getChartId(),
          r = "blankctn_" + chartId,
          type = t.type;
        if ("h5k" == type) {
          e =
            "HF" != user_obj.market
              ? [
                  "无",
                  "MACD",
                  "KDJ",
                  "RSI",
                  "BOLL",
                  "WR",
                  "DMI",
                  "BBIBOLL",
                  "ROC",
                  "PSY",
                  "OBV",
                  "WVAD",
                  "CCI",
                  "TRIX",
                  "DMA",
                  "EXPMA",
                  "BIAS",
                  "ASI",
                  "VR",
                  "EMV",
                  "BRAR"
                ]
              : [
                  "无",
                  "MACD",
                  "KDJ",
                  "RSI",
                  "BOLL",
                  "WR",
                  "DMI",
                  "BBIBOLL",
                  "ROC",
                  "PSY",
                  "CCI",
                  "TRIX",
                  "DMA",
                  "EXPMA",
                  "BIAS",
                  "ASI",
                  "BRAR"
                ];
          switch (user_obj.market) {
            case "HF":
            case "forex":
            case "forex_yt":
            case "BTC":
            case "global_index":
              a = "无";
              break;
            default:
              a = "VOLUME";
          }
          (o = 1), (n = "k");
        } else {
          switch (((o = 60), user_obj.market)) {
            case "HF":
            case "global_index":
              (e = [
                "无",
                "MACD",
                "BOLL",
                "RSI",
                "BBIBOLL",
                "ROC",
                "TRIX",
                "DMA",
                "EXPMA",
                "BIAS",
                "VR"
              ]),
                (a = "无");
              break;
            case "NF":
              (e = [
                "无",
                "POSITION",
                "LB",
                "MACD",
                "BOLL",
                "RSI",
                "BBIBOLL",
                "ROC",
                "TRIX",
                "DMA",
                "EXPMA",
                "BIAS",
                "VR"
              ]),
                (a = "TVOL");
              break;
            default:
              (e =
                "cnlv2" == user_obj.mt
                  ? [
                      "无",
                      "TFLOW",
                      "LB",
                      "MACD",
                      "BOLL",
                      "RSI",
                      "BBIBOLL",
                      "ROC",
                      "TRIX",
                      "DMA",
                      "EXPMA",
                      "BIAS",
                      "VR"
                    ]
                  : [
                      "无",
                      "LB",
                      "MACD",
                      "BOLL",
                      "RSI",
                      "BBIBOLL",
                      "ROC",
                      "TRIX",
                      "DMA",
                      "EXPMA",
                      "BIAS",
                      "VR"
                    ]),
                (a = "TVOL");
          }
          n = "t";
        }
        KKE.api(
          "plugins.indicatortab.get",
          {
            charts: [t],
            rightW: o,
            fix: {
              firsts: [a],
              lasts: ["BLANKCTN"]
            },
            tabs: e,
            active: 1,
            type: n,
            domid: r
          },
          function(t) {
            indicatorTabLogger[type] = t;
          }
        );
      },
      settingCfg = {
        kChart: {
          pCharts: [
            {
              name: "MA"
            }
          ],
          setCustom: {
            centerZoom: !0,
            history_t: "window",
            show_k_rangepercent: !0,
            show_ext_marks: !0,
            show_floater: !0
          },
          setReK: 0,
          setLineStyle: {
            linetype: "solid"
          }
        },
        tChart: {
          setCustom: {
            show_floater: !0
          },
          setLineStyle: {
            linetype: "line"
          }
        },
        tkChart: {
          showView: "t1",
          showDotTool: {
            alwaysShow: !0
          }
        }
      };
    user_obj.indicatorTab = indicatorTab;
    user_obj.indicatorTabLogger = indicatorTabLogger;
    user_obj.CFGSETTING_IFRAME_PREFIX = "sinatkchart_settingcfgpanel~";
    user_obj.REKSETTING_PREFIX = "sinatkchart_reksetting~";
    user_obj.REKSETTING_COOKIE = "kCookieRek";
    user_obj.EXTEND_PERFIX = "sinatkchart_extendsettingV2";
    user_obj.settingCfg = void 0;
    user_obj.settingRek = void 0;
    user_obj.market = utils_util.market(user_obj.symbol);
    user_obj.DKpChart = "TZY";
    user_obj.DKtChart = "TZYS";
    var isA = function(symbol) {
      return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(symbol);
    };
    !(function() {
      bridge.load(
        {
          uid: [
            user_obj.CFGSETTING_IFRAME_PREFIX,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: user_obj.CFGSETTING_IFRAME_PREFIX
        },
        function(t) {
          t
            ? (user_obj.settingCfg = oc(settingCfg, JSON.parse(t)))
            : ("US" == user_obj.market &&
                (settingCfg.tChart.setLineStyle.linetype = "mountain"),
              (user_obj.settingCfg = settingCfg));
        },
        !0
      );
    })();
    var tSetting;
    !(function() {
      switch (user_obj.market) {
        case "NF":
          tSetting = [
            [
              {
                name: "POSITION"
              },
              {
                name: "TVOL"
              },
              {
                name: "LB"
              },
              {
                name: "BLANKCTN"
              }
            ],
            {
              callback: function() {
                indicatorTab(_tChart);
              }
            }
          ];
          break;
        case "HF":
        case "global_index":
          tSetting = [
            [
              {
                name: "MACD"
              },
              {
                name: "BLANKCTN"
              }
            ],
            {
              callback: function() {
                indicatorTab(_tChart);
              }
            }
          ];
          break;
        default:
          tSetting =
            "cnlv2" == user_obj.mt
              ? [
                  [
                    {
                      name: "TVOL"
                    },
                    {
                      name: "TFLOW"
                    },
                    {
                      name: "BLANKCTN"
                    }
                  ],
                  {
                    callback: function() {
                      indicatorTab(_tChart);
                    }
                  }
                ]
              : [
                  [
                    {
                      name: "TVOL"
                    },
                    {
                      name: "LB"
                    },
                    {
                      name: "BLANKCTN"
                    }
                  ],
                  {
                    callback: function() {
                      indicatorTab(_tChart);
                    }
                  }
                ];
      }
    })();
    var t2Setting;
    switch (user_obj.market) {
      case "HF":
      case "forex_yt":
      case "BTC":
      case "forex":
        t2Setting = [
          [
            {
              name: "MACD"
            },
            {
              name: "BLANKCTN"
            }
          ],
          {
            callback: function() {
              indicatorTab(chartH5t);
            }
          }
        ];
        break;
      default:
        t2Setting = [
          [
            {
              name: "VOLUME"
            },
            {
              name: "MACD"
            },
            {
              name: "BLANKCTN"
            }
          ],
          {
            callback: function() {
              indicatorTab(chartH5t);
            }
          }
        ];
    }
    var tkSetting,
      B,
      charts_dom,
      U,
      V,
      marketSetting,
      config,
      h5kOptions,
      chartsSetting,
      j,
      G,
      param = void 0,
      apiCompare = function(t, e) {
        KKE.api("plugins.compare.get", param.compare, function(a) {
          (G = a), t.appendChild(e);
        });
      },
      createMenu = function(parentDom) {
        param.menu.dis_menu
          ? ((B = $C("div")),
            (B.id = param.menu.menu_dom_id),
            user_obj.iswap && (param.menu.menu_dom_h = 39),
            (B.style.height = param.menu.menu_dom_h + "px"),
            (param.menu.iswap = user_obj.iswap),
            parentDom.appendChild(B))
          : (param.menu.menu_dom_h = 0);
      },
      createCompare = function() {
        param.compare.dis_compare
          ? ((V = $C("div")),
            (V.id = param.compare.compare_dom_id),
            (V.style.clear = "both"),
            (V.style.marginLeft = param.compare.compare_dom_left),
            (V.style.paddingTop = "7px"),
            (V.style.lineHeight = V.style.height =
              param.compare.compare_dom_h + "px"),
            (param.compare.compare_dom_h = 30))
          : (param.compare.compare_dom_h = 0);
      },
      dis_range = function(parentDom) {
        if (param.range.dis_range) {
          if (
            ((U = $C("div")),
            (U.id = param.range.range_dom_id),
            (U.style.clear = "both"),
            (U.style.whiteSpace = "nowrap"),
            param.range.rangeCon
              ? (U.className = param.range.rangeCon)
              : (U.style.marginLeft = "5px"),
            user_obj.iswap || param.menu.menu_wapmore)
          )
            (U.style.fontSize = "10px"),
              (U.style.marginLeft = "25px"),
              b(U),
              (param.range.range_dom_h = 30),
              (U.style.height = param.range.range_dom_h + "px");
          else {
            U.style.fontSize = "12px";
            var e = 4;
            (U.style.paddingTop = e + "px"),
              (U.style.lineHeight = U.style.height =
                param.range.range_dom_h + "px"),
              (param.range.range_dom_h += e);
          }
          parentDom.appendChild(U);
        } else param.range_dom_h = 0;
      },
      q = function(parentDom) {
        createMenu(parentDom);
        dis_range(parentDom);
        createCompare(parentDom);
      },
      Q = function(tkChartDom) {
        param.compare.dis_compare
          ? (tkChartDom.appendChild(V), apiCompare(tkChartDom, V))
          : (param.compare.compare_dom_h = 0);
      },
      tt = function() {
        param.charts_hasTChart ||
          "US" !== user_obj.market ||
          1 !== param.stock_stutas ||
          (param.menu.tab = [
            {
              lab: "日K",
              v: "kd",
              t: "K"
            },
            {
              lab: "周K",
              v: "kw",
              t: "K"
            },
            {
              lab: "月K",
              v: "km",
              t: "K"
            }
          ]);
      },
      createtkChartDom = function() {
        var e = utils_util.$C("div");
        return (
          (e.style.width = e.style.height = "100%"),
          (e.style.position = "relative"),
          (user_obj.dom_id = e.id = "tkChart_wwy" + user_obj.symbol),
          e
        );
      },
      render = function() {
        var h5FigureDIV = $DOM(user_obj.dom_id),
          tkChartDom = createtkChartDom();
        h5FigureDIV.appendChild(tkChartDom);
        tkChartDom.style.webkitUserSelect = tkChartDom.style.userSelect = tkChartDom.style.MozUserSelect =
          "none";
        chartsSetting = getDefaultChartSetting();
        param = oc(chartsSetting, param || null);
        param = config = h5kOptions = oc(param, user_obj || null);
        param.domid = chartsSetting.charts_dom_id;
        param.symbol = user_obj.symbol;
        ("forex" == user_obj.market ||
          "forex_yt" == user_obj.market ||
          "BTC" == user_obj.market) &&
          (param.charts_Start = "K");
        marketSetting = getMarketSetting(user_obj.market);
        param = oc(param, marketSetting);
        param = oc(param, user_obj);
        config = oc(param.param.t, config || null);
        h5kOptions = oc(param.param.k, h5kOptions || null);
        h5kOptions.pcm = 2;
        user_obj.iswap && v();
        charts_dom = $C("div");
        charts_dom.id = chartsSetting.charts_dom_id;
        q(tkChartDom);
        var a = tkChartDom.offsetHeight,
          n =
            tkChartDom.offsetHeight -
            param.menu.menu_dom_h -
            2 -
            param.range.range_dom_h -
            param.compare.compare_dom_h,
          s = (n / a) * 100;
        charts_dom.style.height = s + "%";
        tkChartDom.appendChild(charts_dom);
        Q(tkChartDom);
        tt();
        "op_m" == user_obj.market && (param.charts_Start = "K");
        tkSetting = param.api;
      },
      nt = function() {
        var e = user_obj.settingCfg.kChart;
        for (var a in e)
          e.hasOwnProperty(a) && "setCustom" == a && chartH5t[a](e[a]);
        menuTab && menuTab.setPPT("block"),
          chartH5t.setCustom({
            allow_indicator_edit: !0
          }),
          chartH5t.setCustom({
            storage_lv: 2
          }),
          utils_util.suda("m_bs"),
          chartH5t.showView("kd"),
          chartH5t.setDimension({
            I_V_O: 0
          }),
          chartH5t.pCharts(
            [
              {
                name: user_obj.DKpChart
              }
            ],
            {
              isexclusive: !0,
              noLog: 1
            }
          ),
          "cnlv1wap" == user_obj.mt
            ? (chartH5t.tCharts(
                [
                  {
                    name: user_obj.DKtChart
                  }
                ],
                {
                  isexclusive: !0,
                  noLog: 1
                }
              ),
              chartH5t.showRangeSelector({
                display: !1
              }))
            : (chartH5t.tCharts(
                [
                  {
                    name: user_obj.DKtChart
                  },
                  {
                    name: "volume"
                  }
                ],
                {
                  isexclusive: !0,
                  noLog: 1
                }
              ),
              chartH5t.showRangeSelector({
                display: !0
              })),
          "TZY" == user_obj.DKpChart && chartH5t.setReK(-1);
      },
      ot = function(t) {
        var e = new Date(),
          a = new Date();
        switch (t) {
          case "km12":
            e.setDate(e.getDate() - 264);
            break;
          case "km1":
            e.setDate(e.getDate() - 22);
            break;
          case "km3":
            e.setDate(e.getDate() - 66);
            break;
          case "ytd":
            e = new Date(e.getFullYear(), 0, 1);
            break;
          case "k1":
            var n = 60 * e.getTimezoneOffset() * 1e3;
            e.setTime(e.getTime() + n),
              e.setHours(e.getHours() + 4),
              (a = new Date(99999, 9, 9)),
              chartH5t.dateFromTo(e, a),
              KKE.api(
                "patch.forex.newhqtime",
                {
                  symbol: user_obj.symbol,
                  timeSymbol: "sys_time",
                  interval: 30,
                  offset: 30
                },
                function(t) {
                  t &&
                    chartH5t.pushData({
                      symbol: symbol,
                      data: t
                    });
                }
              );
        }
        chartH5t.showView("kd", {
          callback: function() {
            chartH5t.setLineStyle({
              linetype: "line"
            });
          }
        }),
          chartH5t.showYTD(),
          chartH5t.showRangeSelector({
            from: e,
            to: a
          });
      },
      it = function(t, e, a) {
        var n = void 0;
        n = "t" == e ? user_obj.settingCfg.tChart : user_obj.settingCfg.kChart;
        for (var o in n)
          if (n.hasOwnProperty(o))
            if ("pCharts" == o || "tCharts" == o) {
              if (menuTab && "k1" == menuTab.chooseTab.tab) continue;
              t[o](n[o], {
                isexclusive: !0,
                callback: function() {
                  n.setCustom &&
                    n.setCustom.show_underlay_vol &&
                    t.setCustom({
                      show_underlay_vol: n.setCustom.show_underlay_vol
                    });
                }
              });
            } else if ("setReK" == o)
              isA(user_obj.symbol) && t[o](n[o]),
                "HK" === user_obj.market && t[o](n[o]);
            else if ("showView" == o)
              sinaTKChartObj[o]({
                view: n[o]
              });
            else {
              if (
                menuTab &&
                "kcl" == menuTab.chooseTab.tab &&
                "setLineStyle" == o
              ) {
                t.setLineStyle.linetype = "line";
                continue;
              }
              t[o](n[o]);
            }
        if ("init" == a)
          for (o in user_obj.settingCfg.tkChart)
            user_obj.settingCfg.tkChart.hasOwnProperty(o) &&
              sinaTKChartObj[o](
                "showView" === o
                  ? {
                      view: user_obj.settingCfg.tkChart[o]
                    }
                  : user_obj.settingCfg.tkChart[o]
              );
      },
      rt = function() {
        if (_tChart && _tChart.getSymbols().length > 1)
          for (var t = "line", e = 1; e < _tChart.getSymbols().length; e++)
            chartH5t.compare({
              symbol: _tChart.getSymbols()[e],
              linecolor: {
                K_N: param.compare.color[e - 1]
              },
              linetype: t
            });
      },
      st = 0,
      initK = function(a, view, rek, i) {
        st > 0 ||
          (st++,
          KKE.api("chart.h5k.get", h5kOptions, function(t) {
            sinaTKChartObj.kChart = chartH5t = t;
            if (view && "kdd" == view) {
              nt();
              i &&
                C({
                  view: view,
                  active: i
                });
            } else {
              for (var e in tkSetting.k)
                if (tkSetting.k.hasOwnProperty(e)) {
                  var r = tkSetting.k[e];
                  isArr(r) || (r = [r]),
                    ("pCharts" != e || param.iswap) &&
                      isFunc(chartH5t[e]) &&
                      chartH5t[e].apply(null, r);
                }
              "km1" == view || "km3" == view || "km12" == view || "ytd" == view
                ? ot(view)
                : view && chartH5t.showView(view),
                ((rek && isA(user_obj.symbol)) ||
                  (rek && "HK" === user_obj.market)) &&
                  chartH5t.setReK("cnlv1wap" === user_obj.mt ? 0 : rek),
                param.iswap || "cnlv1wap" == user_obj.mt
                  ? "cnlv1wap" === user_obj.mt &&
                    chartH5t.tCharts(
                      [
                        {
                          name: "MACD"
                        }
                      ],
                      {
                        isexclusive: !0,
                        noLog: 1
                      }
                    )
                  : (menuTab && it(chartH5t),
                    "kcl" == view && chartH5t.showView(view));
            }
            if ((rt(), a)) {
              var l = user_obj.iswap || param.menu.menu_wapmore ? 1 : 2;
              menuTab && menuTab.setTarget(l), chartH5t.compare(a.obj, a.rm);
            }
            menuTab
              ? (menuTab.setChart({
                  k: chartH5t,
                  o: user_obj
                }),
                i &&
                  C({
                    view: view,
                    active: i
                  }))
              : param.menu.dis_menu &&
                apiMenu(
                  param.menu,
                  {
                    type: "k",
                    chart: chartH5t
                  },
                  function() {
                    it(chartH5t), _();
                  }
                );
          }),
          (sinaTKChartObj.chartUserobj = user_obj),
          "CN" === utils_util.market(configObj.symbol) &&
            isA(configObj.symbol) &&
            KKE.api("plugins.dotTool.get", {}, function(e) {
              user_obj.dotTool = e;
              var a = new Date();
              (a =
                a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()),
                utils_util.load(
                  "//finance.sina.com.cn/touzi/lhstockskx/" +
                    user_obj.symbol +
                    ".js?" +
                    a,
                  function() {
                    user_obj.dotTool.pushData({
                      key: "tzylhb",
                      data: K(window["tzy_lhstock_kx_" + user_obj.symbol]),
                      dotStyle: {
                        position: "absolute",
                        width: "8px",
                        height: "8px",
                        borderRadius: "8px",
                        color: "white",
                        backgroundColor: "#349FF9",
                        zIndex: 99,
                        opacity: 1,
                        filter: "alpha(opacity=100)",
                        boxShadow: null
                      },
                      dotHoverStyle: {
                        opacity: 0.8,
                        filter: "alpha(opacity=80)",
                        boxShadow: "0px 0px 5px 2px #349FF9"
                      },
                      tipStyle: {
                        position: "absolute",
                        backgroundColor: "#349FF9",
                        color: "white",
                        zIndex: 999,
                        padding: "5px 10px",
                        textIndent: "18px",
                        borderRadius: "5px",
                        backgroundImage:
                          "url(//n.sinaimg.cn/finance/h5chart/toast.png)",
                        backgroundPosition: "0px -55px",
                        minWidth: "110px",
                        lineHeight: "15px",
                        height: "15px",
                        fontSize: "12px"
                      }
                    });
                  }
                );
            }));
      },
      initT = function() {
        KKE.api("chart.h5t.get", config, function(tChart) {
          var e = user_obj.market;
          sinaTKChartObj.tChart = _tChart = tChart;
          for (var a in tkSetting.t)
            if (tkSetting.t.hasOwnProperty(a)) {
              var tchartOptions = tkSetting.t[a];
              isArr(tchartOptions) || (tchartOptions = [tchartOptions]),
                isFunc(_tChart[a]) &&
                  ("US" != e || 1 !== param.stock_stutas) &&
                  _tChart[a].apply(null, tchartOptions);
            }
          menuTab
            ? menuTab.setChart({
                t: _tChart
              })
            : param.menu.dis_menu &&
              apiMenu(param.menu, {
                type: "t",
                chart: _tChart
              }),
            param.iswap ||
              param.menu.menu_wapmore ||
              it(
                _tChart,
                "t",
                "t1" == user_obj.settingCfg.tkChart.showView ? "click" : "init"
              ),
            param.menu.dis_menu || sinaTKChartObj.re("T_DATA_LOADED", null);
        });
      };
    this.menuTab = menuTab;
    this.setTKChart = function(t) {
      user_obj.settingCfg = t;
      menuTab && menuTab.setCfg(t);
      menuTab &&
        "kdd" != menuTab.chooseTab.tab &&
        "k1" != menuTab.chooseTab.tab &&
        (chartH5t && it(chartH5t), _tChart && it(_tChart, "t"));
      t.tkChart.showDotTool && this.showDotTool(t.tkChart.showDotTool);
      bridge.save({
        uid: [user_obj.CFGSETTING_IFRAME_PREFIX, new Date().getTime()].join(
          "|"
        ),
        key: user_obj.CFGSETTING_IFRAME_PREFIX,
        value: t
      });
    };
    var apiMenu = function(t, a, n) {
        var o = a.type,
          i = {};
        switch (o) {
          case "t":
            i = {
              t: a.chart
            };
            break;
          case "k":
            i = {
              k: a.chart
            };
        }
        param.menu.me = sinaTKChartObj;
        param.menu[o + "chart"] = a.chart;
        KKE.api("plugins.menu.get", param.menu, function(t) {
          sinaTKChartObj.re("T_DATA_LOADED", null);
          menuTab = t;
          sinaTKChartObj.menuTab = menuTab;
          param.iswap ||
            param.menu.menu_wapmore ||
            (configObj.nocfg || y(), w());
          "forex" == user_obj.market || "forex_yt" == user_obj.market
            ? pt
              ? C(pt)
              : (menuTab.chooseTab = {
                  tye: "K",
                  tab: "kd"
                })
            : C({
                view: user_obj.settingCfg.tkChart.showView
              });
          n && n();
        });
      },
      dt = function(type) {
        if (utils_util.isStr(type)) {
          var a = String(type).toLowerCase();
          switch (a) {
            case "t":
              initT();
              break;
            case "k":
              initK();
          }
          xh5_EvtUtil.addHandler(window, "resize", function() {
            sinaTKChartObj.onresize();
          });
        }
      };
    render();
    dt(param.charts_Start);
    this.chartUserobj = user_obj;
    this.initK = initK;
    this.initT = initT;
    this.compare = function(e, a) {
      var n = utils_util.market(e.symbol),
        o = user_obj.market;
      if ((e.linetype || (e.linetype = "line"), n === o))
        _tChart && _tChart.compare(e, a), chartH5t && chartH5t.compare(e, a);
      else if ((_tChart && _tChart.hide(), chartH5t)) {
        var i = user_obj.iswap || param.menu.menu_wapmore ? 1 : 2;
        menuTab && menuTab.setTarget("kdd" == menuTab.chooseTab.tab ? 3 : i),
          chartH5t.show(),
          chartH5t.compare(e, a);
      } else
        initK({
          obj: e,
          rm: a
        });
    };
    var pt,
      ht = new (function() {
        var t = 0,
          e = function(a, n, o) {
            var i;
            o || (o = 100);
            try {
              i = chartH5t;
            } catch (r) {}
            return i
              ? n()
              : void (
                  t++ < 10 &&
                  setTimeout(function() {
                    e(a, n, o);
                  }, 1.2 * o)
                );
          };
        this.waitFor = e;
      })(),
      ut = 0;
    this.showView = function(options) {
      if (
        options.active &&
        0 == ut &&
        "t1" != user_obj.settingCfg.tkChart.showView
      )
        return (
          ut++,
          void ht.waitFor("", function() {
            "kdd" == options.view
              ? (nt(), C(options))
              : sinaTKChartObj.showView(options),
              (ut = 0);
          })
        );
      switch (options.view) {
        case "t1":
        case "ts":
          chartH5t && chartH5t.hide(), _tChart.showView(options.view);
          break;
        case "t5":
          _tChart.showView(options.view);
          break;
        case "ytd":
        case "kdd":
        case "kd":
        case "kw":
        case "km":
        case "kcl":
        case "k5":
        case "k15":
        case "k30":
        case "k60":
          _tChart && _tChart.hide();
          chartH5t
            ? chartH5t.showView(options.view)
            : initK(!1, options.view, void 0, options.active);
      }
      pt = options;
      C(options);
    };
    this.showDotTool = function(t) {
      var e = t.alwaysShow;
      user_obj.dotTool &&
        (e ? user_obj.dotTool.show(!0) : user_obj.dotTool.hide(!0));
    };
    this.pushData = function(t) {
      _tChart && _tChart.pushData(t.obj, t.num),
        user_obj.iswap ||
          param.menu.menu_wapmore ||
          (chartH5t && chartH5t.pushData(t.obj, t.num));
    };
    this.resizePaintTool = function() {
      var t,
        e,
        a = user_obj.paintTool,
        n = user_obj.dotTool;
      menuTab &&
        ("K" == menuTab.chooseTab.tye && chartH5t
          ? ((e = chartH5t.getDimension()),
            (t = {
              width: e.w_k,
              height: e.h_k,
              left: e.RIGHT_W,
              top: e.T_F_T
            }))
          : _tChart &&
            ((e = _tChart.getDimension()),
            (t = {
              width: e.w_t,
              height: e.h_t,
              left: e.RIGHT_W,
              top: e.T_F_T
            })),
        t && a && a.resize(t),
        t && n && n.update(t));
    };
    this.onresize = function() {
      _tChart && _tChart.resize(),
        chartH5t && chartH5t.resize(),
        sinaTKChartObj.resizePaintTool();
    };
    this.update = function() {
      _tChart && _tChart.update(), chartH5t && chartH5t.update();
    };
    this.param = param;
  }
  function a(symbol) {
    return (
      "sb899001" === symbol ||
      "sb899305" === symbol ||
      "sb899306" === symbol ||
      "sb899307" === symbol ||
      "sb899003" === symbol
    );
  }
  function sinaTKChart$() {
    this.VER = "1.4.2";
    this.get = function(config, callback) {
      var i = new SinaTKChart(config);
      var r = function(e) {
        i.me.rl(e, r);
        utils_util.isFunc(callback) && callback(i);
        window.sinaTKChartV1 = i;
        a(config.symbol) &&
          i.showView({
            view: "kcl",
            active: 0
          });
      };
      i.me.al("T_DATA_LOADED", r, !1);
    };
  }
  var $C = utils_util.$C,
    oc = utils_util.oc,
    $DOM = utils_util.$DOM,
    isFunc = utils_util.isFunc,
    xh5_EvtUtil = utils_util.xh5_EvtUtil,
    isArr = utils_util.isArr,
    cookieUtil = utils_util.cookieUtil,
    bridge = utils_util.bridge;
  utils_util.fInherit(SinaTKChart, utils_util.xh5_EvtDispatcher);
  return sinaTKChart$;
});
