xh5_define("plugins.tchart", ["utils.util"], function(utils_util) {
  "use strict";
  function sinaTKChart(configObj) {
    function n(symbol) {
      return /^sh000001|sz399001|sz399006|sz399415|sz399416|sz399300|sz000300$/.test(
        symbol
      )
        ? ((configObj2.DKpChart = "dpdk"), (configObj2.DKtChart = "dpdks"), !0)
        : !1;
    }
    function p(t, e) {
      var a = "#f11200",
        n = "#00a800",
        o = "#666666";
      if (
        "US" == configObj2.market ||
        "HK" == configObj2.market ||
        "LSE" === configObj2.market
      ) {
        var i = a;
        (a = n), (n = i);
      }
      var r = e ? e : 0,
        s = o;
      return t > r ? (s = a) : r > t && (s = n), s;
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
    function u(marketCode) {
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
            user_obj: configObj2,
            tab: [
              {
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
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
            user_obj: configObj2,
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
      if (
        configObj2.iswap ||
        (configObj2.menu && configObj2.menu.menu_wapmore)
      ) {
        var l = {
          tCharts: O,
          setCustom: {
            allow_indicator_edit: !0,
            mousewheel_zoom: !0
          }
        };
        switch (
          (configObj2.menu &&
            configObj2.menu.menu_wapmore &&
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
              tCharts: defaultE,
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
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "op_m":
            r.menu.tab = [
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "US":
            switch (
              ((r.menu.tab = [
                {
                  lab: "\u5206\u65f6",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "5\u65e5",
                  v: "t5",
                  t: "T"
                },
                {
                  lab: "\u65e5K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "\u5468K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "\u6708K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "\u66f4\u591a",
                  v: "more",
                  t: "K"
                }
              ]),
              (r.menu.more = [
                {
                  lab: "5\u5206",
                  v: "k5",
                  t: "K"
                },
                {
                  lab: "15\u5206",
                  v: "k15",
                  t: "K"
                },
                {
                  lab: "30\u5206",
                  v: "k30",
                  t: "K"
                },
                {
                  lab: "1\u6708",
                  v: "km1",
                  t: "K"
                },
                {
                  lab: "3\u6708",
                  v: "km3",
                  t: "K"
                },
                {
                  lab: "1\u5e74",
                  v: "km12",
                  t: "K"
                }
              ]),
              (r.api.t.setLineStyle = {
                linetype: "mountain"
              }),
              (r.api.t.showScale = "pct"),
              configObj2.symbol)
            ) {
              case "gb_dji":
                configObj2.symbol = "gb_$dji";
                break;
              case "gb_ixic":
                configObj2.symbol = "gb_$ixic";
                break;
              case "gb_inx":
                configObj2.symbol = "gb_$inx";
            }
            break;
          case "CN":
          case "REPO":
            var c = [
                {
                  lab: "\u5206\u65f6",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "\u65e5K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "\u5468K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "\u6708K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "\u66f4\u591a",
                  v: "more",
                  t: "K"
                }
              ],
              m = [
                {
                  lab: "\u5206\u65f6",
                  v: "ts",
                  t: "T"
                },
                {
                  lab: "B/S\u70b9",
                  v: "kdd",
                  t: "K"
                },
                {
                  lab: "\u65e5K",
                  v: "kd",
                  t: "K"
                },
                {
                  lab: "\u5468K",
                  v: "kw",
                  t: "K"
                },
                {
                  lab: "\u6708K",
                  v: "km",
                  t: "K"
                },
                {
                  lab: "\u66f4\u591a",
                  v: "more",
                  t: "K"
                }
              ];
            (r.menu.tab =
              N(configObj2.symbol) &&
              configObj2.mt &&
              (configObj2.iswap ||
                (configObj2.menu && !configObj2.menu.menu_wapmore))
                ? m
                : c),
              (r.menu.more = [
                {
                  lab: "5\u5206",
                  v: "k5",
                  t: "K"
                },
                {
                  lab: "15\u5206",
                  v: "k15",
                  t: "K"
                },
                {
                  lab: "30\u5206",
                  v: "k30",
                  t: "K"
                },
                {
                  lab: "60\u5206",
                  v: "k60",
                  t: "K"
                }
              ]),
              (r.param = o.param);
            break;
          case "HF":
            (r.menu.tab = [
              {
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
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
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
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
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
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
              "btc_btcokcoin" == configObj2.symbol
                ? [
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "15\u5206",
                      v: "k15",
                      t: "K"
                    }
                  ]
                : [
                    {
                      lab: "1\u5206",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "15\u5206",
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
                      lab: "1\u5206",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "\u5e74K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5\u5206",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15\u5206",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30\u5206",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60\u5206",
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
                      lab: "1\u5206",
                      v: "k1",
                      t: "K"
                    },
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "\u5e74K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5\u5206",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "30\u5206",
                      v: "k30",
                      t: "K"
                    }
                  ]),
              (s.param.k.view = h(configObj2.symbol) ? "k1" : "kd"),
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
                    lab: "\u5e74\u7ebf",
                    v: "kcl",
                    t: "K"
                  },
                  {
                    lab: "\u65e5K",
                    v: "kd",
                    t: "K"
                  },
                  {
                    lab: "\u5468K",
                    v: "kw",
                    t: "K"
                  },
                  {
                    lab: "\u6708K",
                    v: "km",
                    t: "K"
                  },
                  {
                    lab: "\u5e74K",
                    v: "ky",
                    t: "K"
                  }
                ]
              : [
                  {
                    lab: "\u5206\u65f6",
                    v: "t1",
                    t: "T"
                  },
                  {
                    lab: "\u5e74\u7ebf",
                    v: "kcl",
                    t: "K"
                  },
                  {
                    lab: "\u65e5K",
                    v: "kd",
                    t: "K"
                  },
                  {
                    lab: "\u5468K",
                    v: "kw",
                    t: "K"
                  },
                  {
                    lab: "\u6708K",
                    v: "km",
                    t: "K"
                  },
                  {
                    lab: "\u5e74K",
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
                lab: "\u5206\u65f6",
                v: "t1",
                t: "T"
              },
              {
                lab: "5\u65e5",
                v: "t5",
                t: "T"
              },
              {
                lab: "\u5e74\u7ebf",
                v: "kcl",
                t: "K"
              },
              {
                lab: "YTD",
                v: "ytd",
                t: "K"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              },
              {
                lab: "\u5e74K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5\u5206",
                v: "k5",
                t: "K"
              },
              {
                lab: "15\u5206",
                v: "k15",
                t: "K"
              },
              {
                lab: "30\u5206",
                v: "k30",
                t: "K"
              },
              {
                lab: "60\u5206",
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
                lab: "\u5206\u65f6",
                v: "t1",
                t: "T"
              },
              {
                lab: "5\u65e5",
                v: "t5",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              },
              {
                lab: "\u5e74K",
                v: "ky",
                t: "K"
              }
            ]),
              (s.menu.menu_rek = !0);
            break;
          case "op_m":
            s.menu.tab = [
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              }
            ];
            break;
          case "global_index":
            (s.menu.tab = [
              {
                lab: "\u5206\u65f6",
                v: "t1",
                t: "T"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              },
              {
                lab: "\u5e74K",
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
                lab: "\u5206\u65f6",
                v: "t1",
                t: "T"
              },
              {
                lab: "\u5e74\u7ebf",
                v: "kcl",
                t: "K"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              },
              {
                lab: "\u5e74K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5\u5206",
                v: "k5",
                t: "K"
              },
              {
                lab: "15\u5206",
                v: "k15",
                t: "K"
              },
              {
                lab: "30\u5206",
                v: "k30",
                t: "K"
              },
              {
                lab: "60\u5206",
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
              (configObj2.mt &&
                ("cnlv1" == configObj2.mt ||
                  "cnlv2" == configObj2.mt ||
                  "cntouzi2" == configObj2.mt) &&
                n(configObj2.symbol)) ||
              N(configObj2.symbol)
                ? [
                    {
                      lab: "\u5206\u65f6",
                      v: "t1",
                      t: "T"
                    },
                    {
                      lab: "5\u65e5",
                      v: "t5",
                      t: "T"
                    },
                    {
                      lab: "\u5e74\u7ebf",
                      v: "kcl",
                      t: "K"
                    },
                    {
                      lab: "B/S\u70b9",
                      v: "kdd",
                      t: "K"
                    },
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "\u5e74K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5\u5206",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15\u5206",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30\u5206",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60\u5206",
                      v: "k60",
                      t: "K"
                    }
                  ]
                : [
                    {
                      lab: "\u5206\u65f6",
                      v: "t1",
                      t: "T"
                    },
                    {
                      lab: "5\u65e5",
                      v: "t5",
                      t: "T"
                    },
                    {
                      lab: "\u5e74\u7ebf",
                      v: "kcl",
                      t: "K"
                    },
                    {
                      lab: "\u65e5K",
                      v: "kd",
                      t: "K"
                    },
                    {
                      lab: "\u5468K",
                      v: "kw",
                      t: "K"
                    },
                    {
                      lab: "\u6708K",
                      v: "km",
                      t: "K"
                    },
                    {
                      lab: "\u5e74K",
                      v: "ky",
                      t: "K"
                    },
                    {
                      lab: "5\u5206",
                      v: "k5",
                      t: "K"
                    },
                    {
                      lab: "15\u5206",
                      v: "k15",
                      t: "K"
                    },
                    {
                      lab: "30\u5206",
                      v: "k30",
                      t: "K"
                    },
                    {
                      lab: "60\u5206",
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
                lab: "\u5206\u65f6",
                v: "t1",
                t: "T"
              },
              {
                lab: "5\u65e5",
                v: "t5",
                t: "T"
              },
              {
                lab: "\u5e74\u7ebf",
                v: "kcl",
                t: "K"
              },
              {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
              },
              {
                lab: "\u5468K",
                v: "kw",
                t: "K"
              },
              {
                lab: "\u6708K",
                v: "km",
                t: "K"
              },
              {
                lab: "\u5e74K",
                v: "ky",
                t: "K"
              },
              {
                lab: "5\u5206",
                v: "k5",
                t: "K"
              },
              {
                lab: "15\u5206",
                v: "k15",
                t: "K"
              },
              {
                lab: "30\u5206",
                v: "k30",
                t: "K"
              },
              {
                lab: "60\u5206",
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
      for (var e, a = 0; 6 > a; a++)
        (e = o("span")),
          (e.style.display = "block"),
          (e.style.styleFloat = "left"),
          (e.style.cssFloat = "left"),
          (e.style.width = "33%"),
          (e.style.lineHeight = "normal"),
          t.appendChild(e);
    }
    function v() {
      (config.dim = {
        H_T_G: 40,
        H_T_T: 0,
        posX: 55
      }),
        (z.dim = {
          H_T_G: 40,
          H_T_T: 0,
          posX: 45
        }),
        (z.candlenum = 45);
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
        var a = e.info.viewRangeState,
          n = k(a.viewId);
        if (!isNaN(a.start) && !isNaN(a.end)) {
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
                (l = [a.start * s, a.end * s - 1]),
                (c = e.chart.getSymbols()[0] + "|" + n))
              : ((l =
                  a.dataLength < e.info.minCandleNum
                    ? [0, e.info.minCandleNum - 1]
                    : [a.start, a.end]),
                (c = e.chart.getSymbols()[0] + "|" + n)),
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
            configObj2.dotTool && "k" == e.type)
          )
            if (configObj2.dotTool.inited)
              ~[23, 24, 25, 364, 365, 366].indexOf(n)
                ? (configObj2.dotTool.show(),
                  configObj2.dotTool.update({
                    zoom: l,
                    domain: o,
                    width: e.info.width,
                    height: e.info.height,
                    top: e.info.top,
                    left: e.info.left,
                    rangeData: e.info.data
                  }))
                : configObj2.dotTool.hide();
            else {
              var d = configObj2.settingCfg.tkChart.showDotTool;
              configObj2.dotTool.init({
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
                    return t.date + ":\u9f99\u864e\u699c";
                  }
                },
                alwaysHide: d && !d.alwaysShow
              });
            }
          if (configObj2.paintTool)
            if (configObj2.paintTool.param) {
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
                (p.data = S.getExtraData({
                  name: "currentK",
                  clone: !1
                })),
                configObj2.paintTool.update(p);
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
                (h.data = S.getExtraData({
                  name: "currentK",
                  clone: !1
                })),
                configObj2.paintTool.init(h);
            }
          n != j && sinaTKChartObj.re("PAINTTOOL_VIEW_CHANGEED", n), (j = n);
        }
      }
    }
    function defaultsetting() {
      var a = new Date().getTime() + Math.floor(987654321 * Math.random() + 1);
      return {
        charts_dom_id: "KKE_chart_" + a,
        charts_Start: "K",
        charts_hasTChart: !1,
        stock_stutas: void 0,
        compare: {
          color: ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"],
          userObj: configObj2,
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
              if (e.data && r(X.range.range_dom_id)) {
                var a = e.data,
                  n =
                    configObj2.iswap ||
                    (configObj2.menu && configObj2.menu.menu_wapmore)
                      ? a.time
                      : a.day,
                  o = Number(a.volume);
                Number(o) < 0 && (o = 0), a.price < 0 && (a.price = 0);
                var i = 2;
                if (configObj2) {
                  switch (configObj2.market) {
                    case "US":
                    case "HK":
                      i =
                        configObj2.param &&
                        configObj2.param.t &&
                        configObj2.param.t.nfloat
                          ? configObj2.param.t.nfloat
                          : utils_util.strUtil.nfloat(a.price);
                      break;
                    case "LSE":
                      i = 3;
                  }
                  configObj2.param &&
                    configObj2.param.t &&
                    configObj2.param.t.ennfloat &&
                    (i = configObj2.param.t.nfloat || 2);
                }
                (a.percent = isNaN(a.percent)
                  ? "--"
                  : (100 * a.percent).toFixed(2)),
                  (o = 0 == o ? 0 : utils_util.strUtil.vs(o, !0));
                var s = Number(a.avg_price).toFixed(i),
                  l = [
                    n,
                    " \u4ef7:",
                    Number(a.price).toFixed(i),
                    " \u5747:",
                    s,
                    " \u91cf:",
                    o,
                    " \u5e45:",
                    a.percent + "%"
                  ];
                if (configObj2) {
                  var c = configObj2.market;
                  if (("US" === c && l.splice(3, 2), "HK" === c)) {
                    var m = configObj2.symbol.length;
                    configObj2.symbol.substring(m - 1, m) >= "A" &&
                      (s = l[4] = "-");
                  }
                  ("LSE" === c || "US" === c) && (s = "--");
                }
                var d;
                if (
                  configObj2.iswap ||
                  (configObj2.menu && configObj2.menu.menu_wapmore)
                ) {
                  var h = r(X.range.range_dom_id).childNodes;
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
                  "HF" == configObj2.market
                    ? (v = k = "")
                    : ((v =
                        '<span style="color:' +
                        whatW.range.rangeColor[2] +
                        ';" class="' +
                        whatW.range.rangeLabel +
                        '">\u91cf</span>'),
                      (k =
                        '<span class="' +
                        whatW.range.rangeValue +
                        '">' +
                        o +
                        "</span>"));
                  var f = [
                    l[0],
                    '<span style="color:' +
                      whatW.range.rangeColor[0] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u4ef7</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      Number(a.price).toFixed(i) +
                      "</span>",
                    '<span style="color:' +
                      whatW.range.rangeColor[1] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u5747</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      s +
                      "</span>",
                    v,
                    k,
                    '<span style="color:' +
                      whatW.range.rangeColor[3] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u5e45</span>',
                    '<span style="color:' +
                      p(a.change) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.percent +
                      "%</span>"
                  ];
                  if ("cntouzi2" != configObj2.mt)
                    for (d = 0; d < f.length; d++)
                      (f[d] = f[d].replace('" class="', " ")),
                        (f[d] = f[d].replace("class", "style"));
                  r(X.range.range_dom_id).innerHTML = f.join("");
                }
              }
            }
          },
          k: {
            onrange: function(t) {
              f({
                chart: S,
                info: t,
                type: "k"
              });
            },
            oninnerresize: function(t) {
              configObj.paintTool && configObj.paintTool.resize(t),
                configObj.dotTool && configObj.dotTool.update(t);
            },
            onviewprice: function(e) {
              if (r(X.range.range_dom_id)) {
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
                    "CN" == configObj2.market &&
                    N(configObj2.symbol)) ||
                  "HK" === configObj2.market
                ) {
                  var s = 0;
                  d.load(
                    {
                      uid: [
                        configObj2.CFGSETTING_IFRAME_PREFIX,
                        new Date().getTime(),
                        Math.floor(987654321 * Math.random() + 1)
                      ].join("|"),
                      key: configObj2.CFGSETTING_IFRAME_PREFIX
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
                            i =
                              '<span style="color:#ff0000">[\u540e\u590d\u6743]</span>';
                            break;
                          case "-1":
                            i =
                              '<span style="color:#ff0000">[\u524d\u590d\u6743]</span>';
                        }
                      else
                        "kdd" == menuTab.chooseTab.tab &&
                          (i =
                            '<span style="color:#ff0000">[\u524d\u590d\u6743]</span>');
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
                  " \u5f00:",
                  a.open.toFixed(2),
                  " \u9ad8:",
                  a.high.toFixed(2),
                  " \u5e45:",
                  a.percent + "%",
                  " \u6536:",
                  a.close && a.close.toFixed(2),
                  " \u4f4e:",
                  a.low.toFixed(2),
                  " \u91cf:",
                  o
                ];
                if (
                  configObj2.iswap ||
                  (configObj2.menu && configObj2.menu.menu_wapmore)
                ) {
                  var m = r(X.range.range_dom_id).childNodes;
                  c.splice(0, 4), c.unshift(a.day);
                  for (var h, u = 0, b = m.length; b > u; u++)
                    (h = 0 == u ? c[2 * u] : c[2 * u - 1] + c[2 * u]),
                      (m[u].innerHTML = h);
                } else {
                  var v, k;
                  "HF" == configObj2.market
                    ? (v = k = "")
                    : ((k =
                        '<span style="color:' +
                        whatW.range.rangeColor[4] +
                        ';" class="' +
                        whatW.range.rangeLabel +
                        '">\u91cf</span>'),
                      (v =
                        '<span class="' +
                        whatW.range.rangeValue +
                        '">' +
                        o +
                        "</span>"));
                  var f = [
                    c[0],
                    '<span style="color:' +
                      whatW.range.rangeColor[0] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u5f00</span>',
                    '<span style="color:' +
                      p(a.open, n) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.open.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      whatW.range.rangeColor[1] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u9ad8</span>',
                    '<span style="color:' +
                      p(a.high, n) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.high.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      whatW.range.rangeColor[2] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u6536</span>',
                    '<span style="color:' +
                      p(a.close, n) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.close.toFixed(2) +
                      "</span>",
                    '<span style="color:' +
                      whatW.range.rangeColor[3] +
                      ';" class="' +
                      whatW.range.rangeLabel +
                      '">\u4f4e</span>',
                    '<span style="color:' +
                      p(a.low, n) +
                      ';" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.low.toFixed(2) +
                      "</span>",
                    k,
                    v,
                    '<span style="color:' +
                      p(a.change) +
                      ';margin-left: 4px;;" class="' +
                      whatW.range.rangeValue +
                      '">' +
                      a.percent +
                      "%</span>"
                  ];
                  if (
                    ("CN" !== configObj2.market ||
                      (23 !== j && 24 !== j && 25 !== j) ||
                      !utils_util.isCNK(configObj2.symbol) ||
                      (a.postVol &&
                        (f = f.concat([
                          '<span style="color:' +
                            whatW.range.rangeColor[4] +
                            ';" class="' +
                            whatW.range.rangeLabel +
                            '">\u76d8\u540e\u91cf|\u989d</span>',
                          '<span class="' +
                            whatW.range.rangeValue +
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
                    "cntouzi2" != configObj2.mt)
                  )
                    for (u = 0; u < f.length; u++)
                      (f[u] = f[u].replace('" class="', " ")),
                        (f[u] = f[u].replace("class", "style"));
                  r(X.range.range_dom_id).innerHTML = f.join("");
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
            tCharts: O
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
            tCharts: defaultE
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
      var t = h(configObj2.symbol) ? "k1" : "kd";
      "k1" != t &&
        C({
          view: t
        });
      var e = new Date(),
        a = new Date();
      "k1" == t &&
        S.showView("k1", {
          callback: function() {
            S.setLineStyle({
              linetype: "line"
            }),
              S.pCharts(null, {
                toremove: !0,
                noLog: 1
              });
            var t = 60 * e.getTimezoneOffset() * 1e3;
            e.setTime(e.getTime() + t),
              e.setHours(e.getHours() + 4),
              (a = new Date(99999, 9, 9)),
              S.dateFromTo(e, a),
              KKE.api(
                "patch.forex.newhqtime",
                {
                  symbol: configObj2.symbol,
                  timeSymbol: "sys_time",
                  interval: 30,
                  offset: 30
                },
                function(t) {
                  t &&
                    S.pushData({
                      symbol: configObj2.symbol,
                      data: t
                    }),
                    S.pCharts(null, {
                      toremove: !0,
                      noLog: 1
                    });
                }
              );
          }
        });
    }
    function w() {
      m.get("kke_CnLv1_PPT_v2") ||
        !configObj2.mt ||
        ("cnlv1" != configObj2.mt && "cnlv2" != configObj2.mt) ||
        KKE.api(
          "tools.pptsetting.get",
          function() {
            KKE.api(
              "ppt.ppt.get",
              {
                menu: menuTab,
                userObj: configObj2
              },
              null
            );
          },
          null
        );
    }
    function y() {
      KKE.api("plugins.paintSth.get", {}, function(t) {
        (configObj2.paintTool = t),
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
      }),
        (configObj2.uParam =
          whatW.menu.menu_dom_h + 2 + whatW.range.range_dom_h),
        KKE.api(
          "plugins.userpanel.get",
          {
            userObj: configObj2,
            chartId: whatW.domid,
            menu: menuTab,
            chart: sinaTKChartObj
          },
          function() {}
        );
    }
    function C(t) {
      if (!whatW.iswap && !whatW.menu.menu_wapmore) {
        for (var e = 0; e < whatW.menu.tab.length; e++) {
          var a = whatW.menu.tab[e].v;
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
      S,
      menuTab,
      sinaTKChartObj = this,
      configObj2 = configObj;
    this.me = sinaTKChartObj;
    var indicatorTabLogger = {},
      indicatorTab = function(t) {
        var e,
          a,
          n,
          o,
          i = t.getChartId(),
          r = "blankctn_" + i,
          s = t.type;
        if ("h5k" == s) {
          switch (
            ((e =
              "HF" != configObj2.market
                ? [
                    "\u65e0",
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
                    "\u65e0",
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
                  ]),
            configObj2.market)
          ) {
            case "HF":
            case "forex":
            case "forex_yt":
            case "BTC":
            case "global_index":
              a = "\u65e0";
              break;
            default:
              a = "VOLUME";
          }
          (o = 1), (n = "k");
        } else {
          switch (((o = 60), configObj2.market)) {
            case "HF":
            case "global_index":
              (e = [
                "\u65e0",
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
                (a = "\u65e0");
              break;
            case "NF":
              (e = [
                "\u65e0",
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
                "cnlv2" == configObj2.mt
                  ? [
                      "\u65e0",
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
                      "\u65e0",
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
            indicatorTabLogger[s] = t;
          }
        );
      },
      A = {
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
    (configObj2.indicatorTab = indicatorTab),
      (configObj2.indicatorTabLogger = indicatorTabLogger),
      (configObj2.CFGSETTING_IFRAME_PREFIX = "sinatkchart_settingcfgpanel~"),
      (configObj2.REKSETTING_PREFIX = "sinatkchart_reksetting~"),
      (configObj2.REKSETTING_COOKIE = "kCookieRek"),
      (configObj2.EXTEND_PERFIX = "sinatkchart_extendsettingV2"),
      (configObj2.settingCfg = void 0),
      (configObj2.settingRek = void 0),
      (configObj2.market = utils_util.market(configObj2.symbol)),
      (configObj2.DKpChart = "TZY"),
      (configObj2.DKtChart = "TZYS");
    var N = function(symbol) {
      return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(symbol);
    };
    !(function() {
      d.load(
        {
          uid: [
            configObj2.CFGSETTING_IFRAME_PREFIX,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: configObj2.CFGSETTING_IFRAME_PREFIX
        },
        function(t) {
          t
            ? (configObj2.settingCfg = i(A, JSON.parse(t)))
            : ("US" == configObj2.market &&
                (A.tChart.setLineStyle.linetype = "mountain"),
              (configObj2.settingCfg = A));
        },
        !0
      );
    })();
    var O;
    !(function() {
      switch (configObj2.market) {
        case "NF":
          O = [
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
          O = [
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
          O =
            "cnlv2" == configObj2.mt
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
    var defaultE;
    switch (configObj2.market) {
      case "HF":
      case "forex_yt":
      case "BTC":
      case "forex":
        defaultE = [
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
              indicatorTab(S);
            }
          }
        ];
        break;
      default:
        defaultE = [
          [
            { name: "MA" },
            {
              name: "VOLUME"
            },
            {
              name: "BOLL"
            },
            {
              name: "MACD"
            },
            {
              name: "KDJ"
            },
            {
              name: "BLANKCTN"
            }
          ],
          {
            callback: function() {
              indicatorTab(S);
            }
          }
        ];
    }
    var whatF,
      B,
      M,
      U,
      V,
      H,
      config,
      z,
      X,
      j,
      G,
      whatW = void 0,
      $ = function(t, e) {
        KKE.api("plugins.compare.get", whatW.compare, function(a) {
          (G = a), t.appendChild(e);
        });
      },
      Y = function(t) {
        whatW.menu.dis_menu
          ? ((B = o("div")),
            (B.id = whatW.menu.menu_dom_id),
            configObj2.iswap && (whatW.menu.menu_dom_h = 39),
            (B.style.height = whatW.menu.menu_dom_h + "px"),
            (whatW.menu.iswap = configObj2.iswap),
            t.appendChild(B))
          : (whatW.menu.menu_dom_h = 0);
      },
      Z = function() {
        whatW.compare.dis_compare
          ? ((V = o("div")),
            (V.id = whatW.compare.compare_dom_id),
            (V.style.clear = "both"),
            (V.style.marginLeft = whatW.compare.compare_dom_left),
            (V.style.paddingTop = "7px"),
            (V.style.lineHeight = V.style.height =
              whatW.compare.compare_dom_h + "px"),
            (whatW.compare.compare_dom_h = 30))
          : (whatW.compare.compare_dom_h = 0);
      },
      J = function(t) {
        if (whatW.range.dis_range) {
          if (
            ((U = o("div")),
            (U.id = whatW.range.range_dom_id),
            (U.style.clear = "both"),
            (U.style.whiteSpace = "nowrap"),
            whatW.range.rangeCon
              ? (U.className = whatW.range.rangeCon)
              : (U.style.marginLeft = "5px"),
            configObj2.iswap || whatW.menu.menu_wapmore)
          )
            (U.style.fontSize = "10px"),
              (U.style.marginLeft = "25px"),
              b(U),
              (whatW.range.range_dom_h = 30),
              (U.style.height = whatW.range.range_dom_h + "px");
          else {
            U.style.fontSize = "12px";
            var e = 4;
            (U.style.paddingTop = e + "px"),
              (U.style.lineHeight = U.style.height =
                whatW.range.range_dom_h + "px"),
              (whatW.range.range_dom_h += e);
          }
          t.appendChild(U);
        } else whatW.range_dom_h = 0;
      },
      q = function(t) {
        Y(t), J(t), Z(t);
      },
      Q = function(t) {
        whatW.compare.dis_compare
          ? (t.appendChild(V), $(t, V))
          : (whatW.compare.compare_dom_h = 0);
      },
      tt = function() {
        whatW.charts_hasTChart ||
          "US" !== configObj2.market ||
          1 !== whatW.stock_stutas ||
          (whatW.menu.tab = [
            {
              lab: "\u65e5K",
              v: "kd",
              t: "K"
            },
            {
              lab: "\u5468K",
              v: "kw",
              t: "K"
            },
            {
              lab: "\u6708K",
              v: "km",
              t: "K"
            }
          ]);
      },
      et = function() {
        var e = utils_util.$C("div");
        return (
          (e.style.width = e.style.height = "100%"),
          (e.style.position = "relative"),
          (configObj2.dom_id = e.id = "tkChart_wwy" + configObj2.symbol),
          e
        );
      },
      at = function() {
        var h5FigureDIV = r(configObj2.dom_id),
          e = et();
        h5FigureDIV.appendChild(e),
          (e.style.webkitUserSelect = e.style.userSelect = e.style.MozUserSelect =
            "none"),
          (X = defaultsetting()),
          (whatW = i(X, whatW || null)),
          (whatW = config = z = i(whatW, configObj2 || null)),
          (whatW.domid = X.charts_dom_id),
          (whatW.symbol = configObj2.symbol),
          ("forex" == configObj2.market ||
            "forex_yt" == configObj2.market ||
            "BTC" == configObj2.market) &&
            (whatW.charts_Start = "K"),
          (H = u(configObj2.market)),
          (whatW = i(whatW, H)),
          (whatW = i(whatW, configObj2)),
          (config = i(whatW.param.t, config || null)),
          (z = i(whatW.param.k, z || null)),
          (z.pcm = 2),
          configObj2.iswap && v(),
          (M = o("div")),
          (M.id = X.charts_dom_id),
          q(e);
        var a = e.offsetHeight,
          n =
            e.offsetHeight -
            whatW.menu.menu_dom_h -
            2 -
            whatW.range.range_dom_h -
            whatW.compare.compare_dom_h,
          s = (n / a) * 100;
        (M.style.height = s + "%"),
          e.appendChild(M),
          Q(e),
          tt(),
          "op_m" == configObj2.market && (whatW.charts_Start = "K"),
          (whatF = whatW.api);
      },
      nt = function() {
        var e = configObj2.settingCfg.kChart;
        for (var a in e) e.hasOwnProperty(a) && "setCustom" == a && S[a](e[a]);
        menuTab && menuTab.setPPT("block"),
          S.setCustom({
            allow_indicator_edit: !0
          }),
          S.setCustom({
            storage_lv: 2
          }),
          utils_util.suda("m_bs"),
          S.showView("kd"),
          S.setDimension({
            I_V_O: 0
          }),
          S.pCharts(
            [
              {
                name: configObj2.DKpChart
              }
            ],
            {
              isexclusive: !0,
              noLog: 1
            }
          ),
          "cnlv1wap" == configObj2.mt
            ? (S.tCharts(
                [
                  {
                    name: configObj2.DKtChart
                  }
                ],
                {
                  isexclusive: !0,
                  noLog: 1
                }
              ),
              S.showRangeSelector({
                display: !1
              }))
            : (S.tCharts(
                [
                  {
                    name: configObj2.DKtChart
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
              S.showRangeSelector({
                display: !0
              })),
          "TZY" == configObj2.DKpChart && S.setReK(-1);
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
              S.dateFromTo(e, a),
              KKE.api(
                "patch.forex.newhqtime",
                {
                  symbol: configObj2.symbol,
                  timeSymbol: "sys_time",
                  interval: 30,
                  offset: 30
                },
                function(t) {
                  t &&
                    S.pushData({
                      symbol: symbol,
                      data: t
                    });
                }
              );
        }
        S.showView("kd", {
          callback: function() {
            S.setLineStyle({
              linetype: "line"
            });
          }
        }),
          S.showYTD(),
          S.showRangeSelector({
            from: e,
            to: a
          });
      },
      it = function(t, e, a) {
        var n = void 0;
        n =
          "t" == e
            ? configObj2.settingCfg.tChart
            : configObj2.settingCfg.kChart;
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
              N(configObj2.symbol) && t[o](n[o]),
                "HK" === configObj2.market && t[o](n[o]);
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
          for (o in configObj2.settingCfg.tkChart)
            configObj2.settingCfg.tkChart.hasOwnProperty(o) &&
              sinaTKChartObj[o](
                "showView" === o
                  ? {
                      view: configObj2.settingCfg.tkChart[o]
                    }
                  : configObj2.settingCfg.tkChart[o]
              );
      },
      rt = function() {
        if (_tChart && _tChart.getSymbols().length > 1)
          for (var t = "line", e = 1; e < _tChart.getSymbols().length; e++)
            S.compare({
              symbol: _tChart.getSymbols()[e],
              linecolor: {
                K_N: whatW.compare.color[e - 1]
              },
              linetype: t
            });
      },
      st = 0,
      initK = function(a, n, o, i) {
        st > 0 ||
          (st++,
          KKE.api("chart.h5k.get", z, function(t) {
            if (((sinaTKChartObj.kChart = S = t), n && "kdd" == n))
              nt(),
                i &&
                  C({
                    view: n,
                    active: i
                  });
            else {
              for (var e in whatF.k)
                if (whatF.k.hasOwnProperty(e)) {
                  var r = whatF.k[e];
                  c(r) || (r = [r]),
                    ("pCharts" != e || whatW.iswap) &&
                      s(S[e]) &&
                      S[e].apply(null, r);
                }
              "km1" == n || "km3" == n || "km12" == n || "ytd" == n
                ? ot(n)
                : n && S.showView(n),
                ((o && N(configObj2.symbol)) ||
                  (o && "HK" === configObj2.market)) &&
                  S.setReK("cnlv1wap" === configObj2.mt ? 0 : o),
                whatW.iswap || "cnlv1wap" == configObj2.mt
                  ? "cnlv1wap" === configObj2.mt &&
                    S.tCharts(
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
                  : (menuTab && it(S), "kcl" == n && S.showView(n));
            }
            if ((rt(), a)) {
              var l = configObj2.iswap || whatW.menu.menu_wapmore ? 1 : 2;
              menuTab && menuTab.setTarget(l), S.compare(a.obj, a.rm);
            }
            menuTab
              ? (menuTab.setChart({
                  k: S,
                  o: configObj2
                }),
                i &&
                  C({
                    view: n,
                    active: i
                  }))
              : whatW.menu.dis_menu &&
                mt(
                  whatW.menu,
                  {
                    type: "k",
                    chart: S
                  },
                  function() {
                    it(S), _();
                  }
                );
          }),
          (sinaTKChartObj.chartUserobj = configObj2),
          "CN" === utils_util.market(configObj.symbol) &&
            N(configObj.symbol) &&
            KKE.api("plugins.dotTool.get", {}, function(e) {
              configObj2.dotTool = e;
              var a = new Date();
              (a =
                a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()),
                utils_util.load(
                  "//finance.sina.com.cn/touzi/lhstockskx/" +
                    configObj2.symbol +
                    ".js?" +
                    a,
                  function() {
                    configObj2.dotTool.pushData({
                      key: "tzylhb",
                      data: K(window["tzy_lhstock_kx_" + configObj2.symbol]),
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
          var e = configObj2.market;
          sinaTKChartObj.tChart = _tChart = tChart;
          for (var a in whatF.t)
            if (whatF.t.hasOwnProperty(a)) {
              var n = whatF.t[a];
              c(n) || (n = [n]),
                s(_tChart[a]) &&
                  ("US" != e || 1 !== whatW.stock_stutas) &&
                  _tChart[a].apply(null, n);
            }
          menuTab
            ? menuTab.setChart({
                t: _tChart
              })
            : whatW.menu.dis_menu &&
              mt(whatW.menu, {
                type: "t",
                chart: _tChart
              }),
            whatW.iswap ||
              whatW.menu.menu_wapmore ||
              it(
                _tChart,
                "t",
                "t1" == configObj2.settingCfg.tkChart.showView
                  ? "click"
                  : "init"
              ),
            whatW.menu.dis_menu || sinaTKChartObj.re("T_DATA_LOADED", null);
        });
      };
    (this.menuTab = menuTab),
      (this.setTKChart = function(t) {
        (configObj2.settingCfg = t),
          menuTab && menuTab.setCfg(t),
          menuTab &&
            "kdd" != menuTab.chooseTab.tab &&
            "k1" != menuTab.chooseTab.tab &&
            (S && it(S), _tChart && it(_tChart, "t")),
          t.tkChart.showDotTool && this.showDotTool(t.tkChart.showDotTool),
          d.save({
            uid: [
              configObj2.CFGSETTING_IFRAME_PREFIX,
              new Date().getTime()
            ].join("|"),
            key: configObj2.CFGSETTING_IFRAME_PREFIX,
            value: t
          });
      });
    var mt = function(t, a, n) {
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
        (whatW.menu.me = sinaTKChartObj),
          (whatW.menu[o + "chart"] = a.chart),
          KKE.api("plugins.menu.get", whatW.menu, function(t) {
            sinaTKChartObj.re("T_DATA_LOADED", null),
              (menuTab = t),
              (sinaTKChartObj.menuTab = menuTab),
              whatW.iswap ||
                whatW.menu.menu_wapmore ||
                (configObj.nocfg || y(), w()),
              "forex" == configObj2.market || "forex_yt" == configObj2.market
                ? pt
                  ? C(pt)
                  : (menuTab.chooseTab = {
                      tye: "K",
                      tab: "kd"
                    })
                : C({
                    view: configObj2.settingCfg.tkChart.showView
                  }),
              n && n();
          });
      },
      dt = function(e) {
        if (utils_util.isStr(e)) {
          var a = String(e).toLowerCase();
          switch (a) {
            case "t":
              initT();
              break;
            case "k":
              initK();
          }
          l.addHandler(window, "resize", function() {
            sinaTKChartObj.onresize();
          });
        }
      };
    at(),
      dt(whatW.charts_Start),
      (this.chartUserobj = configObj2),
      (this.initK = initK),
      (this.initT = initT),
      (this.compare = function(e, a) {
        var n = utils_util.market(e.symbol),
          o = configObj2.market;
        if ((e.linetype || (e.linetype = "line"), n === o))
          _tChart && _tChart.compare(e, a), S && S.compare(e, a);
        else if ((_tChart && _tChart.hide(), S)) {
          var i = configObj2.iswap || whatW.menu.menu_wapmore ? 1 : 2;
          menuTab && menuTab.setTarget("kdd" == menuTab.chooseTab.tab ? 3 : i),
            S.show(),
            S.compare(e, a);
        } else
          initK({
            obj: e,
            rm: a
          });
      });
    var pt,
      ht = new (function() {
        var t = 0,
          e = function(a, n, o) {
            var i;
            o || (o = 100);
            try {
              i = S;
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
    (this.showView = function(t) {
      if (t.active && 0 == ut && "t1" != configObj2.settingCfg.tkChart.showView)
        return (
          ut++,
          void ht.waitFor("", function() {
            "kdd" == t.view ? (nt(), C(t)) : sinaTKChartObj.showView(t),
              (ut = 0);
          })
        );
      switch (t.view) {
        case "t1":
        case "ts":
          S && S.hide(), _tChart.showView(t.view);
          break;
        case "t5":
          _tChart.showView(t.view);
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
          _tChart && _tChart.hide(),
            S ? S.showView(t.view) : initK(!1, t.view, void 0, t.active);
      }
      (pt = t), C(t);
    }),
      (this.showDotTool = function(t) {
        var e = t.alwaysShow;
        configObj2.dotTool &&
          (e ? configObj2.dotTool.show(!0) : configObj2.dotTool.hide(!0));
      }),
      (this.pushData = function(t) {
        _tChart && _tChart.pushData(t.obj, t.num),
          configObj2.iswap ||
            whatW.menu.menu_wapmore ||
            (S && S.pushData(t.obj, t.num));
      }),
      (this.resizePaintTool = function() {
        var t,
          e,
          a = configObj2.paintTool,
          n = configObj2.dotTool;
        menuTab &&
          ("K" == menuTab.chooseTab.tye && S
            ? ((e = S.getDimension()),
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
      }),
      (this.onresize = function() {
        _tChart && _tChart.resize(),
          S && S.resize(),
          sinaTKChartObj.resizePaintTool();
      }),
      (this.update = function() {
        _tChart && _tChart.update(), S && S.update();
      }),
      (this.param = whatW);
  }
  function a(t) {
    return (
      "sb899001" === t ||
      "sb899305" === t ||
      "sb899306" === t ||
      "sb899307" === t ||
      "sb899003" === t
    );
  }
  function sinaTKChart$() {
    (this.VER = "1.4.2"),
      (this.get = function(config, callback) {
        var i = new sinaTKChart(config);
        var r = function(e) {
          i.me.rl(e, r),
            utils_util.isFunc(callback) && callback(i),
            (window.sinaTKChartV1 = i),
            a(config.symbol) &&
              i.showView({
                view: "kcl",
                active: 0
              });
        };
        i.me.al("T_DATA_LOADED", r, !1);
      });
  }
  var o = utils_util.$C,
    i = utils_util.oc,
    r = utils_util.$DOM,
    s = utils_util.isFunc,
    l = utils_util.xh5_EvtUtil,
    c = utils_util.isArr,
    m = utils_util.cookieUtil,
    d = utils_util.bridge;
  return (
    utils_util.fInherit(sinaTKChart, utils_util.xh5_EvtDispatcher), sinaTKChart$
  );
});
