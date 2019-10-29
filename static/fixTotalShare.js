//init of h5:
var _compareColor = ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"];
var _cnChart;

var initH5 = new (function() {
  this.init = function() {
    if (!window.KKE) {
      getScript(
        "//finance.sina.com.cn/sinafinancesdk/js/sf_sdk.js",
        function() {
          getH5img();
        }
      );
    } else {
      getH5img();
    }

    function getH5img() {
      KKE.api(
        "plugins.sinaTKChart.get",
        {
          compare: {
            color: _compareColor
          },
          symbol: "sh000001", //证券代码
          mt: "cnlv1",
          dom_id: "h5Figure" //放置图形的dom容器id
        },
        function(chart_) {
          _cnChart = chart_;
          //多空
          if (window.location.search.indexOf("showBBI") != -1) {
            _cnChart.showView({
              view: "kdd",
              active: 3
            });
            $(document.body).scrollTop(480);
          }
          //compareH5.init();
        }
      );
    }
  };
})();
initH5.init();
