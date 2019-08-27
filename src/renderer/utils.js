export function loadScripts(scripts) {
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



export const hqParser = new (function () {
  function a(a, b) {
    var c, d, e;
    if (!a) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = a.split(",");
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


    return e;
  }
  function b(a, b) {
    var c, d, e, f;
    if (!a) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = a.split(",");
    e = {};
    b && (e.sym = b);
    e.name = d[0];
    e.now = 1 * d[1];
    e.changeP = 1 * d[2];
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
  function c(a, b) {
    var c, d, e, f, g;
    if (!a) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = a.split(",");
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
    e.change = toFixed(e.now - e.preClose, 2);
    e.changeP = toFixed(100 * (e.change / e.preClose), 2);
    if (!e.open) {
      e.open = "--";
      e.high = "--";
      e.low = "--";
    }
    if (!e.now || "--" == e.open) {
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
    e.now = e.now || e.preClose;
    return e;
  }
  function d(a) {
    var c, d, e;
    if (!a) {
      c = {};
      c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing =
        "--";
      return c;
    }
    d = a.split(",");
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
  function e(a) {
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
  function g(a, b) {
    var d = a.split(",");

    var _data = {};
    var _unit = 4;
    if ((d[3] * 1).toFixed(4) == '0.0000') {
      _unit = 6;
    }
    _data.sym = b
    _data.name = d[9].replace('\u5373\u671F\u6C47\u7387', '');
    _data.now = (1 * d[8]).toFixed(_unit);
    _data.preClose = (1 * d[3]).toFixed(_unit);
    _data.open = (1 * d[5]).toFixed(_unit);
    _data.higner = (1 * d[6]).toFixed(_unit);
    _data.lower = (1 * d[7]).toFixed(_unit);
    _data.updownCount = (1 * (d[8] - d[3])).toFixed(_unit);
    _data.fullcompany = d[13];
    _data.swing = 1 * (d[6] - d[7]).toFixed(_unit);
    _data.date = d[17] + ' ' + d[0];
    _data.change = _data.updownCount;
    _data.changeP = _data.percent = ((10000 * (d[8] - d[3]) / d[3]).toFixed(4) / 100).toFixed(4) + "%";
    console.log(_data)
    return _data;

  }
  function f(a, b, c) {
    var d = arguments.callee[a];
    return d ? d(a, b, c) : {};
  }
  f.a = c;
  f.b = d;
  f.hk = a;
  f.us = b;
  f.hf = e;
  f.fx = g;
  return f;
})();

//(hqstr, papercode)
export function parse(a, b) {

  if (b.match(/^(sh)|(sz)\d+/i)) { return hqParser.a(a, b); }
  if (b.match(/^fx_/i)) return hqParser.fx(a, b);
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
