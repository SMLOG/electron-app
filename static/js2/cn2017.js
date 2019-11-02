var n = "kd";
var delistList = ["kd", "kw", "km", "more"];
var tabList = ["t1", "t5", "kd", "kw", "km", "more"];
var config = {
  cssClass: {
    riseColor: "red",
    fallColor: "green",
    equalColor: "equal",
    themeRed: "#de3639",
    themeGreen: "#1bc07d",
    themeEqual: "#999",
    themeEqualC: "#333",
    themeBlack: "#999"
  },
  riseColor: "riseRed",
  chartRed: "#f11200",
  chartGreen: "#23bc01",
  theme: {
    T_RISE: void 0,
    T_FALL: void 0,
    K_RISE: void 0,
    K_FALL: void 0
  },
  newsUrl:
    "//cj.sina.cn/api/ct_news/get_news?market=cn&symbol=$symbol&su2cu=1&page=$page&num=10&fr=wap&mi=1",
  commentUrl:
    "//guba.sina.com.cn/api/?s=h5bar&dpc=1&bname=$symbol.cn&jsonpflag=1&callback=var ",
  guBaUrl: "//guba.sina.com.cn/api/?s=h5bar&bname=$symbol.cn&dpc=1",
  bkUrl:
    "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolSW2?symbol=$symbol&source=apage&dpc=1",
  gnUrl:
    "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolCHGN?symbol=$symbol&source=apage&dpc=1",
  detailUrl:
    "//vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=10&symbol=$symbol&dpc=1&" +
    1e3 * Math.random(),
  varBK: "cnBk",
  varGN: "cnGn",
  varNews: "cnNews",
  varData: "cnData",
  varComment: "cnComment",
  info: "cnInfo",
  newsHtml:
    '<a href="@href"><dl style="height:@dlhg;"><dt><img src="@src" alt="@alt" style="display: @display;"></dt><dd style="height:@ddhg"><h3 style="height:@h3hg;">@content</h3><p><span>@source</span><span>@time</span></p></dd></dl></a>',
  positionHtml: function(e) {
    var t = e,
      n = e.color,
      a = Number(t.price)
        ? "<li style=color:" + n + ">" + t.price + "</li>"
        : "<li>--</li>",
      i = Number(t.volume) ? "<li>" + t.volume + "</li>" : "<li>--</li>";
    return (
      '<li><ul class="cn-pos" style="border-top:' +
      t.style +
      '"><li>' +
      t.time +
      "</li>" +
      a +
      i +
      "</ul></li>"
    );
  },
  detailHtml: function(e) {
    var t = e,
      n = e.color,
      a = e.bsColor,
      i = e.type;
    return (
      '<li><ul class="cn-detail"><li>' +
      t.time +
      '</li><li style="color:' +
      n +
      '">' +
      t.price +
      "</li><li>" +
      t.volume +
      '<span style="color:' +
      a +
      '">' +
      i +
      "</span></li></ul></li>"
    );
  },
  bkHtml: function(e, t) {
    var n = e,
      i = n.type,
      r =
        n.percent > 0
          ? "+" + n.percent.toFixed(2) + "%"
          : n.percent.toFixed(2) + "%",
      o = n.lead_cname,
      s =
        n.increase > 0
          ? "+" + n.increase.toFixed(2) + "%"
          : n.increase.toFixed(2) + "%",
      l = a(n.percent, L.cssClass),
      c = a(n.increase, L.cssClass);
    return (
      '<ul class="cn-bk"><li><a href="//gu.sina.cn/m/#/stock/blockdetail?id=' +
      i +
      '"><p>' +
      n.name +
      '</p></a></li><li><a href="//gu.sina.cn/m/#/stock/blockdetail?id=' +
      i +
      '"><p style="color:' +
      l +
      '">' +
      r +
      '</p></a></li><li><a href="//quotes.sina.cn/hs/company/quotes/view/' +
      n.lead_shares +
      '/"><span>' +
      o +
      '</span><span style="color:' +
      c +
      '">' +
      s +
      "</span></a></li></ul>"
    );
  },
  follow: function(e) {
    var t = e,
      n = t.title.length > 20 ? t.title.substring(0, 19) + "..." : t.title;
    return (
      '<li class="cn-panel"><a href="' +
      t.stockUrl +
      '"><div class="name">' +
      t.name +
      '</div><div class="code">' +
      t.code.toUpperCase() +
      '</div><div class="price" style="color:' +
      t.color +
      '">' +
      t.price +
      '</div><div><span class="diff" style="color:' +
      t.color +
      '">' +
      t.change +
      '</span><span class="percent" style="color:' +
      t.color +
      '">' +
      t.percent +
      '</span></div><div></a><span class="title">\u4e8b\u4ef6</span><a href="' +
      t.news_url +
      '"><span class="content">' +
      n +
      "</span></a></div></li>"
    );
  },
  tradeMore:
    '<div class="trade-more"><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/cjmx.php?code=' +
    paperCode +
    '&page=1"><div>\u67e5\u770b\u6210\u4ea4\u660e\u7ec6 ></div></a><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/stock_history.php?code=' +
    paperCode +
    '"><div>\u67e5\u770b\u5386\u53f2\u4ea4\u6613 ></div></a></div>',
  nothing:
    '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u4e2a\u80a1\u8d44\u8baf\uff0c\u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></span></div>',
  nothingComment:
    '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></span></div>',
  nothingMore:
    '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></div>',
  nothingCommentMore:
    '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></div>',
  relatedHtml:
    '<a href="@href"><ul class="cn-relate"><li><div class="cn-relate-name">@name</div><div class="cn-relate-name gray">@symbol</div></li><li data-attr="@attr">@price</li><li><span data-color="a" class="cn-relate-color" style="background-color:@color">@zdf</span></li></ul></a>',
  guHtml:
    '<a href="@url"><dl><dt><img src="@src"></dt><dd class="cn-comment-user"><span>@nick</span><span>@time</span></dd><dd><div class="cn-comment-content"><span>@content</span></div></dd></dl></a>',
  more:
    '<p class="cn-news-more"><a href="@href">\u67e5\u770b\u66f4\u591a<i class="cn-arrow-more"></i></a></p>'
};
var paperCode = document.location.href.split("?")[1];
var dom = document.getElementById("h5Chart");
KKE.api(
  "plugins.sinaAppTKChart.get",
  {
    wrap: {
      dom: dom
    },
    chart: {
      symbol: paperCode,
      initView: n,
      kInitParam: {
        rate: 20,
        theme: config.theme
      },
      kChart: {
        pCharts: [
          {
            name: "MA",
            param: [
              {
                v: 5,
                color: "#FC9CB8"
              },
              {
                v: 10,
                color: "#12BDD9"
              },
              {
                v: 20,
                color: "#EE2F72"
              }
            ]
          }
        ]
      },
      tChart: {
        toggleExtend: "on",
        setLineStyle: {
          linetype: "mountain"
        }
      },
      tInitParam: {
        rate: 20,
        theme: config.theme
      }
    },
    info: {
      upColor: config.chartRed,
      downColor: config.chartGreen
    },
    bsCallUp: {
      more: [
        {
          name: "\u5e74\u7ebf",
          v: "kcl"
        },
        {
          name: "5\u5206",
          v: "k5"
        },
        {
          name: "15\u5206",
          v: "k15"
        },
        {
          name: "30\u5206",
          v: "k30"
        },
        {
          name: "60\u5206",
          v: "k60"
        }
      ],
      tabs: [
        {
          name: "\u4e94\u65e5",
          v: "t5"
        },
        {
          name: "\u5468K",
          v: "kw"
        },
        {
          name: "\u6708K",
          v: "km"
        }
      ],
      show: !1
    },
    zoomBar: {
      show: true
    },
    clinicStock: {
      show: false
    }
  },
  function(e) {
    // T = t.chart = e,
    // t.resizeChart(e)
  }
);
