export function loadScripts(scripts) {
  return scripts.reduce((currentPromise, scriptUrl) => {
    return currentPromise.then(() => {
      return new Promise((resolve, reject) => {
        var script = document.createElement("script");
        script.async = true;
        script.src = scriptUrl;
        script.onload = () => resolve();
        script.onreadystatechange = script.onerror = function() {
          if (
            !this.readyState ||
            this.readyState === "loaded" ||
            this.readyState === "complete"
          ) {
            reject();
          }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    });
  }, Promise.resolve());
}

export async function fetchEval(urls, encode, callback) {
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let text;
    if (encode) {
      let blob = await fetch(url).then(res => res.blob());
      text = await new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function(e) {
          var text = reader.result;
          resolve(text);
        };
        reader.readAsText(blob, encode || "utf-8");
      });
    } else {
      let charset;
      let blob = await fetch(url).then(res => {
        let contentType = res.headers.get("content-type");
        charset = contentType.match(/.*?charset=(.+)/);
        charset = charset && charset[1];
        return res.blob();
      });
      text = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function(e) {
          let text = reader.result;
          resolve(text);
        };
        reader.readAsText(blob, charset || "utf-8");
      });
    }

    eval.bind(window)(text);
  }

  callback && callback();
}

window.loadScripts = loadScripts;

export const hqParser = new (function() {
  function hk(item) {
    let hqstr = window[`hq_str_${item.code}`];
    let b = item.name;
    var c, d, e;
    if (!hqstr) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = hqstr.split(",");
    e = {};
    if (b)
      if (b.indexOf("hk") > -1) {
        e.symbol = b;
        e.sym = b.replace("hk", "");
      } else {
        e.symbol = "hk" + b;
        e.sym = b;
      }
    e.enName = d[0];
    e.name = d[1];
    e.open = 1 * d[2];
    e.preClose = 1 * d[3];
    e.high = 1 * d[4];
    e.low = 1 * d[5];
    e.now = 1 * d[6];
    e.change = toFixed(1 * d[7], 2);
    e.changeP = toFixed(1 * d[8], 2);
    e.buy = 1 * d[9];
    e.sell = 1 * d[10];
    e.volume = 1 * d[12];
    e.amount = 1 * d[11];
    e.pe = 1 * d[13];
    e.pe = e.pe || "--";
    e.income = 1 * d[14];
    e.income = e.income || "--";
    e.high52 = 1 * d[15];
    e.low52 = 1 * d[16];
    e.date = d[17];
    e.time = d[18];
    if (!e.open) {
      e.open = "--";
      if (!e.now) {
        e.high = "--";
        e.low = "--";
      }
    }
    if (!e.now) {
      e.change = "--";
      e.changeP = "--";
    }
    if (e.preClose) {
      e.swing = 100 * ((e.high - e.low) / e.preClose);
      e.swing = isNaN(e.swing) ? "--" : e.swing;
    } else {
      e.preClose = "--";
      e.swing = "--";
    }

    return e;
  }
  function us(item) {
    let hqstr = window[`hq_str_${item.code}`];
    let b = item.name;
    var c, d, e, f;
    if (!hqstr) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = hqstr.split(",");
    e = {};
    b && (e.sym = b);
    e.name = d[0];
    e.now = 1 * d[1];
    e.changeP = 1 * d[2] + "%";
    e.updateTime = d[3];
    e.change = 1 * d[4];
    e.open = 1 * d[5];
    e.high = 1 * d[6];
    e.low = 1 * d[7];
    e.high52 = 1 * d[8];
    e.low52 = 1 * d[9];
    e.volume = 1 * d[10];
    e.averageVolume = 1 * d[11];
    e.totalShare = 1 * d[12];
    e.eps = 1 * d[13];
    e.pe = 1 * d[14];
    e.pe = e.pe || "--";
    e.beta = 1 * d[16];
    e.dividend = 1 * d[17];
    e.dividend = e.dividend || "--";
    e.income = 1 * d[18];
    e.income = e.income || "--";
    e.shares = 1 * d[19];
    e.hourTradingPrice = 1 * d[21];
    e.hourTradingChangeP = 1 * d[22];
    e.hourTradingChange = 1 * d[23];
    e.hourTradingDateTime = d[24];
    f = d[24].split(" ");
    e.hourTradingDate = f[0] + " " + f[1];
    e.hourTradingTime = f[2] || "";
    e.dateTime = d[25];
    f = d[25].split(" ");
    e.date = f[0] + " " + f[1];
    e.time = f[2];
    e.preClose = 1 * d[26];
    e.hourTradingVolume = 1 * d[27];
    if (!e.open) {
      e.open = "--";
      e.high = "--";
      e.low = "--";
    }
    if (!((e.now && "--" != e.open) || e.change)) {
      e.change = "--";
      e.changeP = "--";
    }
    if (e.preClose) {
      e.swing = 100 * ((e.high - e.low) / e.preClose);
      e.swing = isNaN(e.swing) ? "--" : e.swing;
    } else {
      e.preClose = "--";
      e.swing = "--";
    }
    return e;
  }
  function a(item) {
    let hqstr = window[`hq_str_${item.code}`];
    let b = item.name;
    var c, d, e, f, g;
    if (!hqstr) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = hqstr.split(",");
    e = {};
    if (b)
      if (b.indexOf("s") > -1) {
        e.symbol = b;
        e.sym = b.replace(/s[hz]/, "");
      } else {
        e.sym = b;
        f = b.charAt(0);
        "69".indexOf(f) > -1 && (e.symbol = "sh" + b);
        "023".indexOf(f) > -1 && (e.symbol = "sz" + b);
      }
    e.name = d[0];
    e.open = 1 * d[1];
    e.preClose = 1 * d[2];
    e.now = 1 * d[3];
    e.high = 1 * d[4];
    e.low = 1 * d[5];
    e.buy = 1 * d[6];
    e.sell = 1 * d[7];
    e.volume = 1 * d[8];
    e.symbol && /^(sh000|sh580)\d*/.test(e.symbol) && (e.volume *= 100);
    e.amount = 1 * d[9];
    e.date = d[30];
    e.time = d[31];
    e.status = d[32];
    g = {
      "00": "",
      "01": "临停1H",
      "02": "停牌",
      "03": "停牌",
      "04": "临停",
      "05": "停1/2",
      "07": "暂停",
      "-1": "无记录",
      "-2": "未上市",
      "-3": "退市"
    };
    e.statusWord = "00" == e.status || e.buy || e.sell ? "" : g[e.status];
    ("02" != e.status && "03" != e.status) ||
      e.buy ||
      e.sell ||
      (e.stopDay = !0);

    if (!e.open) {
      e.now = d[11];
    }
    e.now = toFixed(e.now, 2);
    e.change = toFixed(e.now - e.preClose, 2);
    e.changeP = toFixed(100 * (e.change / e.preClose), 2);
    e.changePV = e.changeP;

    e.changeP = e.percent = `${e.changeP}%`;
    if (!e.open) {
      e.open = "--";
      e.high = "--";
      e.low = "--";
    }
    if (!e.now) {
      e.change = "--";
      e.changeP = "--";
    }
    if (e.preClose) {
      e.swing = 100 * ((e.high - e.low || 0) / e.preClose);
      e.swing = isNaN(e.swing) ? "--" : e.swing;
    } else {
      e.preClose = "--";
      e.swing = "--";
    }
    //e.now = e.now; //|| e.preClose;

    let bsPrices = [];
    let bsVols = [];

    for (let j = 28; j >= 20; j -= 2) {
      bsVols.push(1 * d[j]);
      bsPrices.push(d[j + 1]);
    }

    for (let k = 10; k < 20; k += 2) {
      bsVols.push(1 * d[k]);
      bsPrices.push(d[k + 1]);
    }

    e.bsPrices = bsPrices;
    e.bsVols = bsVols;

    let once_hq_i = window["hq_str_" + item.code + "_i"];
    if (once_hq_i) {
      let _data_i = once_hq_i.split(",");

      e.totalcapital = _data_i[7]; //总股本
      e.zgb = _data_i[7] * 10000; //总股本
      e.kcbinfo = _data_i[23]; //科创板信息 "C|W|10|16000000|8000000"
      e.currcapital = _data_i ? _data_i[8] : e.totalcapital;
      e.turnover = (e.volume / e.currcapital / 10000) * 100;
      e.totalShare = e.now > 0 ? e.now * e.totalcapital * 10000 : "--";
      e.cvs = e.now > 0 ? e.now * e.currcapital * 10000 : "--";
      e.ltgb = 1 * e.currcapital * 10000;
    }
    if (window[`v_${item.code}`]) {
      let arr = window[`v_${item.code}`].split("~");
      e.pe_ttm = parseFloat(arr[39]);
      e.turnover = arr[38];
      e.lz = arr[44];
      e.zsz = arr[45];
      e.ltg = parseFloat((e.lz / e.now).toFixed(2));
    }

    e.mk = item.code && item.code.indexOf("sh") > -1 ? "sh" : "sz";

    return e;
  }
  function b(item) {
    let hqstr = window[`hq_str_${item.code}`];
    let b = item.name;
    var c, d, e;
    if (!hqstr) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = hqstr.split(",");
    e = {};
    e.name = d[0];
    e.now = 1 * d[1];
    e.change = 1 * d[2];
    e.changeP = 1 * d[3];
    e.time = d[4];

    if (!e.now) {
      e.change = "--";
      e.changeP = "--";
    }
    return e;
  }
  function hf(a) {
    var c, d, e;
    if (!a) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = a.split(",");
    e = {};
    e.now = 1 * d[0];
    e.change = e.now - d[7];
    e.changeP = 1 * d[1];
    if (!e.now) {
      e.change = "--";
      e.changeP = "--";
    }
    return e;
  }
  function fx(item) {
    let hqstr = window[`hq_str_${item.code}`];
    let b = item.name;
    var d = hqstr.split(",");

    var _data = {};
    var _unit = 4;
    if ((d[3] * 1).toFixed(4) == "0.0000") {
      _unit = 6;
    }
    _data.sym = b;
    _data.name = d[9].replace("\u5373\u671F\u6C47\u7387", "").substring(0, 4);
    _data.now = (1 * d[8]).toFixed(_unit);
    _data.preClose = (1 * d[3]).toFixed(_unit);
    _data.open = (1 * d[5]).toFixed(_unit);
    _data.high = (1 * d[6]).toFixed(_unit);
    _data.low = (1 * d[7]).toFixed(_unit);
    _data.updownCount = (1 * (d[8] - d[3])).toFixed(_unit);
    _data.fullcompany = d[13];
    _data.swing = 1 * (d[6] - d[7]).toFixed(_unit);
    _data.date = d[17] + " " + d[0];
    _data.change = _data.updownCount;
    _data.changePV = (
      ((10000 * (d[8] - d[3])) / d[3]).toFixed(4) / 100
    ).toFixed(4);

    _data.changeP = _data.percent = _data.changePV + "%";
    return _data;
  }
  function f(a, b, c) {
    var d = arguments.callee[a];
    return d ? d(a, b, c) : {};
  }
  f.a = a;
  f.b = b;
  f.hk = hk;
  f.us = us;
  f.hf = hf;
  f.fx = fx;
  return f;
})();

const handleMap = {
  "11": "a",
  "12": "a",
  "71": "fx",
  "41": "us",
  "31": "hk",
  "33": "hk"
};
//(hqstr, papercode)
export function parse(item) {
  if (handleMap[item.countryID])
    return hqParser[handleMap[item.countryID]](item);
  else return hqParser.a(item);
}

export function toFixed(value, n) {
  let tmp = (value * 1).toFixed(n);
  if (tmp > 0) return `${tmp}`;
  return tmp;
}
export function toPercent(value, n) {
  let tmp = toFixed(value, n);
  return `${tmp}%`;
}

export const ObjectType = {
  "11": "A 股",
  "12": "B 股",
  "13": "权证",
  "14": "期货",
  "15": "债券",
  "21": "开基",
  "22": "ETF",
  "23": "LOF",
  "24": "货基",
  "25": "QDII",
  "26": "封基",
  "31": "港股",
  "32": "窝轮",
  "33": "港指数",
  "41": "美股",
  "42": "外期",
  "71": "外汇",
  "72": "基金",
  "73": "新三板",
  "74": "板块",
  "75": "板块",
  "76": "板块",
  "77": "板块",
  "78": "板块",
  "79": "板块",
  "80": "板块",
  "81": "债券",
  "82": "债券",
  "85": "期货",
  "86": "期货",
  "87": "期货",
  "88": "期货",
  "100": "指数",
  "101": "基金",
  "102": "指数",
  "103": "英股",
  "104": "国债",
  "105": "ETF",
  "106": "ETF",
  "107": "msci",
  "111": "A股",
  "120": "债券"
};

export function getLink(item) {
  let a, s;
  switch (item.countryID) {
    case "11":
    case "12":
      (a = "\u6caa\u6df1"),
        (s = "//quotes.sina.cn/hs/company/quotes/view/" + item.orgCode);
      break;
    case "31":
    case "32":
    case "33":
      (a = "\u6e2f\u80a1"),
        (s = "//quotes.sina.cn/hk/company/quotes/view/" + item.orgCode);
      break;
    case "41":
      (a = "\u7f8e\u80a1"),
        (s = "//gu.sina.cn/us/hq/quotes.php?code=" + item.orgCode);
      break;
    case "73":
      (a = "\u65b0\u4e09\u677f"),
        (s = "//gu.sina.cn/tm/hq/quotes.php?code=" + item.orgCode);
      break;
    case "100":
      (a = "\u5168\u7403\u6307\u6570"),
        (s = "//quotes.sina.cn/global/hq/quotes.php?code=" + item.orgCode);
      break;

    case "21":

    case "22":

    case "23":

    case "24":

    case "25":

    case "26":
      s = "//stocks.sina.cn/fund/?code=" + item.orgCode;
    default:
      s = "//gu.sina.cn/fx/hq/quotes.php?code=" + item.orgCode;
  }

  return "https:" + s;
}
//
let klinewin;
export function openKlineWindow(target, item) {
  //let url = `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`;
  let url = `http://localhost:9080/static/tech.html?${item.code}`;
  try {
    if (klinewin) {
      if (klinewin.isVisible()) {
        if (klinewin.code == item.code) {
          klinewin.close();
        } else klinewin.loadURL(url);
        return;
      } else klinewin = null;
    }
  } catch (e) {
    klinewin = null;
  }

  const size = target.$electron.remote.screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高

  klinewin = new target.$electron.remote.BrowserWindow({
    width: size.width * 0.8,
    height: 400,
    x: 0,
    y: 0,
    // transparent: true, //设置透明
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: "http://localhost:9080/static/preload-kline.js"
    }
  });
  klinewin.setMenu(null);
  let winsize = klinewin.getSize();
  klinewin.setPosition(size.width - winsize[0], 30);
  klinewin.loadURL(url);
  let win = target.$electron.remote.getCurrentWindow();
  win.focus();
  klinewin.webContents.on("dom-ready", e => {
    klinewin.webContents.executeJavaScript(`function loadScripts(scripts) {
  return scripts.reduce((currentPromise, scriptUrl) => {
  return currentPromise.then(() => {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.async = true;
      script.src = scriptUrl;
      script.onload = () => resolve();
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  });
  }, Promise.resolve());
  }
  loadScripts(['http://localhost:9080/static/preload-kline.js'])`);
  });
  klinewin.code = item.code;
}
export function openWin2(target, item) {
  let app = target.$electron.remote.app;
  if (app.openwin) {
    try {
      app.openwin.close();
      if (app.openwin.code == item.code) {
        delete app.openwin;

        return;
      }
      delete app.openwin;
    } catch (e) {}
  }
  let win = target.$electron.remote.getCurrentWindow();
  let winPos = win.getPosition();
  let openwin = (app.openwin = new target.$electron.remote.BrowserWindow({
    width: 400,
    height: 600,
    x: winPos[0] - 410,
    y: winPos[1],
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: "http://localhost:9080/static/preload.js"
    }
  }));
  openwin.setMenu(null);
  let url = `https://emwap.eastmoney.com/home/HttpSearch?type=14&input=${encodeURIComponent(
    item.name.replace(/\s+/g, "")
  )}`;
  let url2 = `https://emwap.eastmoney.com/home/HttpSearch?type=14&input=${encodeURIComponent(
    item.orgCode.replace(/[^0-9]+/g, "")
  )}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.TotalCount > 0) return data;
      else {
        return fetch(url2).then(res => res.json());
      }
    })
    .then(data => {
      let i = data.Data.reduce((i, cur, curIndex, arr) => {
        if (item.code.toLowerCase().indexOf(cur.Code.toLowerCase()) > -1)
          return curIndex;
        else return i;
      }, 0);
      if (data.TotalCount > 0) {
        openwin.loadURL(
          `https://emwap.eastmoney.com/quota/stock/index/${data.Data[i].ID}`
        );

        openwin.webContents.on("dom-ready", e => {
          openwin.webContents.executeJavaScript(`function loadScripts(scripts) {
      return scripts.reduce((currentPromise, scriptUrl) => {
      return currentPromise.then(() => {
        return new Promise((resolve, reject) => {
          var script = document.createElement("script");
          script.async = true;
          script.src = scriptUrl;
          script.onload = () => resolve();
          document.getElementsByTagName("head")[0].appendChild(script);
        });
      });
      }, Promise.resolve());
      }
      loadScripts(['http://localhost:9080/static/preload.js'])`);
        });
      }

      //openwin.webContents.openDevTools();
      /* window.openwin = this.openwin = window.open(
          `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`,
          "item"
        );*/
      openwin.code = item.code;
    });

  //let win = this.$electron.remote.getCurrentWindow();
  // win.focus();
}

export function openWin(target, item) {
  let app = target.$electron.remote.app;
  if (app.openwin) {
    try {
      app.openwin.close();
      if (app.openwin.code == item.code) {
        delete app.openwin;

        return;
      }
      delete app.openwin;
    } catch (e) {}
  }
  let win = target.$electron.remote.getCurrentWindow();
  let winPos = win.getPosition();
  let openwin = (app.openwin = new target.$electron.remote.BrowserWindow({
    width: 400,
    height: 600,
    x: winPos[0] - 410,
    y: winPos[1],
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: "http://localhost:9080/static/preload.js"
    }
  }));
  openwin.setMenu(null);

  openwin.loadURL(getLink(item));

  openwin.webContents.on("dom-ready", e => {
    openwin.webContents.executeJavaScript(`function loadScripts(scripts) {
return scripts.reduce((currentPromise, scriptUrl) => {
return currentPromise.then(() => {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    script.onload = () => resolve();
    document.getElementsByTagName("head")[0].appendChild(script);
  });
});
}, Promise.resolve());
}
loadScripts(['http://localhost:9080/static/preload.js'])`);
  });

  //openwin.webContents.openDevTools();
  /* window.openwin = this.openwin = window.open(
      `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`,
      "item"
    );*/
  openwin.code = item.code;

  //let win = this.$electron.remote.getCurrentWindow();
  // win.focus();
}

export function openSite(target) {
  let app = target.$electron.remote.app;

  let win = target.$electron.remote.getCurrentWindow();
  let winPos = win.getPosition();
  let openwin = (app.openwin = new target.$electron.remote.BrowserWindow({
    width: 800,
    height: 600,
    x: winPos[0] - 410,
    y: winPos[1],
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: "http://localhost:9080/static/preload.js"
    }
  }));
  openwin.setMenu(null);

  openwin.loadURL(`https://xtrade.newone.com.cn/ssologin?t=jykstd`);

  openwin.webContents.on("dom-ready", e => {
    openwin.webContents.executeJavaScript(`function loadScripts(scripts) {
return scripts.reduce((currentPromise, scriptUrl) => {
return currentPromise.then(() => {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    script.onload = () => resolve();
    document.getElementsByTagName("head")[0].appendChild(script);
  });
});
}, Promise.resolve());
}
loadScripts(['http://localhost:9080/static/preload2.js'])`);
  });

  //openwin.webContents.openDevTools();
  /* window.openwin = this.openwin = window.open(
      `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`,
      "item"
    );*/
  openwin.code = item.code;

  //let win = this.$electron.remote.getCurrentWindow();
  // win.focus();
}

export function fmtdig(Data, Mat, F, Unit, AutoF) {
  var res = Data;
  if (Data != "" && Data != "--" && Data != "-") {
    var _temp = Math.abs(parseFloat(Data));
    var temp = parseFloat(Data);
    if (AutoF) {
      if (_temp > 1000000000000) {
        Mat = 100000000;
        Unit = "亿";
        F = "0";
      } else {
        if (_temp > 100000000000) {
          Mat = 100000000;
          Unit = "亿";
          F = "0";
        } else {
          if (_temp > 10000000000) {
            Mat = 100000000;
            Unit = "亿";
            F = "1";
          } else {
            if (_temp > 1000000000) {
              Mat = 100000000;
              Unit = "亿";
              F = "2";
            } else {
              if (_temp > 100000000) {
                Mat = 100000000;
                Unit = "亿";
                F = "2";
              } else {
                if (_temp > 10000000) {
                  Mat = 10000;
                  Unit = "万";
                  F = "0";
                } else {
                  if (_temp > 1000000) {
                    Mat = 10000;
                    Unit = "万";
                    F = "1";
                  } else {
                    if (_temp > 100000) {
                      Mat = 10000;
                      Unit = "万";
                      F = "2";
                    } else {
                      if (_temp > 10000) {
                        Mat = 10000;
                        Unit = "万";
                        F = "2";
                      } else {
                        if (_temp > 1000) {
                          Mat = 1;
                          Unit = "";
                          F = "2";
                        } else {
                          if (_temp > 100) {
                            Mat = 1;
                            Unit = "";
                            F = "2";
                          } else {
                            if (_temp > 10) {
                              Mat = 1;
                              Unit = "";
                              F = "2";
                            } else {
                              Mat = 1;
                              Unit = "";
                              F = "3";
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    res = ForDight(temp / Mat, F);
  }
  return res + Unit;
}
function ForDight(Dight, How) {
  let rDight = parseFloat(Dight).toFixed(How);
  if (rDight == "NaN") {
    rDight = "--";
  }
  return rDight;
}
export function time() {
  let d = new Date();
  let getTime = (d, hh, mm, ss) => {
    d.setHours(hh);
    d.setMinutes(mm);
    d.setSeconds(ss);
    return d.getTime() / 1000;
  };
  let t = d.getTime(),
    t1 = getTime(d, 9, 30, 0),
    t2 = getTime(d, 11, 30, 0),
    t3 = getTime(d, 13, 0, 0),
    t4 = getTime(d, 15, 0, 0);
  let diff = 0;
  if (t > t1 && t <= t2) diff = t2 - t;
  else if (t > t2 && t <= t3) diff = t2 - t1;
  else if (t > t3 && t <= t4) diff = t - t3 + t2 - t1;
  else if (t > t4) diff = t4 - t3 + t2 - t1;
  return {
    t: diff,
    percent: (diff / 4) * 3600
  };
}

function vlookup(search, index, code, tbname, match) {
  let tb = window["tb_" + tbname + code];
  if (match) {
    if (tb[search] && tb[search][index] != undefined) {
      return parseFloat(tb[search][index]);
    }
    return null;
  }
}
export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getLastReportDate() {
  let d = new Date();

  let now = (d =>
    ("0" + (d.getMonth() + 1)).substr(-2, 2) +
    ("0" + d.getDate()).substr(-2, 2))(new Date());
  for (let e of ["09-30", "06-30", "03-31"]) {
    if (now > e) {
      return d.getFullYear() + "-" + e;
    }
  }

  return d.getFullYear() + "-12-31";
}
//get historitical data for one code
//http://quotes.money.163.com/service/chddata.html?code=0600900&start=20191001&end=20191014&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP
//http://api.money.126.net/data/feed/0000001,0601857,0601600,0600900,1002024,money.api?callback=_ntes_quote_callback82292434
//fetch('http://vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=11&symbol=sz000002&rn=26185407').then(res=>res.text()).then(text=>console.log(text));

export function ConvertUnit(oridata, power) {
  let v;
  if (oridata === "" || oridata === "-") {
    return "-";
  }
  var m = Math.abs(oridata);
  if (!isNaN(power)) {
    m = m * Math.pow(10, power);
  }
  if (m < 10000) {
    v = (m / 1).toFixed(0);
  } else if (m >= 10000 && m < 1000000) {
    v = (m / 10000).toFixed(2) + "万";
  } else if (m >= 1000000 && m < 100000000) {
    v = (m / 10000).toFixed(0) + "万";
  } else if (m >= 100000000 && m < 10000000000) {
    v = (m / 100000000).toFixed(2) + "亿";
  } else {
    v = (m / 100000000).toFixed(2) + "亿";
  }

  return v;
}

export function dateFormat(dateS, part) {
  if (dateS == "-" || typeof dateS == "undefined") {
    return "-";
  }
  if (dateS.length > 10) {
    dateS = dateS.split("T")[0].replace(/-/g, "/");
  }
  var date = new Date(dateS);
  var datecopy;
  var redate = "";
  part = part == null ? "yyyy-MM-dd HH:mm:ss" : part;
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var H = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var MM = M > 9 ? M : "0" + M;
  var dd = d > 9 ? d : "0" + d;
  var HH = H > 9 ? H : "0" + H;
  var mm = m > 9 ? m : "0" + m;
  var ss = s > 9 ? s : "0" + s;
  redate = part
    .replace("yyyy", y)
    .replace("MM", MM)
    .replace("dd", dd)
    .replace("HH", HH)
    .replace("mm", mm)
    .replace("ss", ss)
    .replace("M", M)
    .replace("d", d)
    .replace("H", H)
    .replace("m", m)
    .replace("s", s);
  return redate;
}

//字符串转日期格式，strDate要转为日期格式的字符串
export function getDate(strDate) {
  var date = eval(
    "new Date(" +
      strDate
        .replace(/\d+(?=-[^-]+$)/, function(a) {
          return parseInt(a, 10) - 1;
        })
        .match(/\d+/g) +
      ")"
  );
  return date;
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

//将包含parm的字符串 后面截取掉
export function split(str, parm) {
  if (str.indexOf(parm) != -1) {
    var a = str.split(parm);
    return a[0];
  } else {
    return str;
  }
}

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
export function getCookie(cname, def) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return def;
}

export async function retry(fn, times, delay) {
  var err = null;
  return new Promise(function(resolve, reject) {
    var attempt = function() {
      fn()
        .then(resolve)
        .catch(function(err) {
          console.log(`Attempt #${times} failed`);
          if (0 == times) {
            reject(err);
          } else {
            times--;
            setTimeout(function() {
              attempt();
            }, delay);
          }
        });
    };

    attempt();
  });
}
let rirand = 1;
export function rid(name) {
  return `${name}${rirand++}`;
}
export async function awaitTimeout(fn, ts = 15000) {
  return retry(fn, 5, ts).catch(e => {
    alert("fail");
    return Promise.reject(e);
  });

  /*return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("exception ...." + promise);
        reject();
      }, ts);
    })
  ]);*/
}
window.awaitTimeout = awaitTimeout;

export function isObjectEmpty(property) {
  if (!property) {
    return true;
  }

  var i;
  var isEmpty = true;
  for (i in property) {
    if (Object.prototype.hasOwnProperty.call(property, i)) {
      isEmpty = false;
    }
  }

  return isEmpty;
}

export function deepCopy(obj, cache = []) {
  function find(list, f) {
    return list.filter(f)[0];
  }

  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}
