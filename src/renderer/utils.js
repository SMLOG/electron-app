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
export function convert(data, code) {
  try {
    //港股
    if (code.toLowerCase().substring(0, 2) === "hk") {
      return {
        //temp[0]------CHEUNG KONG------名称
        name: data[1],
        open: data[2],
        closed: data[3],
        highPrice: data[4],
        lowPrice: data[5],
        price: data[6],
        diff: data[7],
        percent: data[8],
        buy1Price: data[9],
        sell1Price: data[10],
        total: data[11],
        volTotal: data[12],
        pe: data[13],
        weekRate: data[14],
        high52: data[15],
        low52: data[16],
        //temp[17]------2016/06/22------日期
        time: data[18] //temp[18]------16:01------时间
      };
    }
    //美股
    if (data[3].indexOf(":") > 0) {
      return {
        name: data[0],
        price: data[1],
        percent: data[2],
        time: data[3].split(/\s+/)[1],
        diff: data[4],
        open: data[5],
        highPrice: data[6],
        lowPrice: data[7],
        high52: data[8],
        low52: data[9],
        volTotal: data[10],
        total: data[11],
        marketValue: data[12],
        earningsPerShare: data[13],
        pe: data[14],
        beta: data[16],
        capital: data[17],
        //temp[20]------58.00------
        todayClose: data[21],
        //temp[22]------0.00------
        //temp[23]------0.00------
        //temp[24]------------
        //temp[25]------Jun 21 04:00PM EDT------
        closed: data[26] //temp[26]------49.26------昨日收盘价
        //temp[27]------0.00------
      };
    }
    return {
      name: data[0],
      open: data[1],
      closed: data[2],
      price: data[3],
      highPrice: data[4],
      lowPrice: data[5],
      buy1Price: data[6],
      sell1Price: data[7],
      volTotal: data[8],
      total: data[9],
      buy1Vol: data[10],
      //buy1Price: data[11],
      buy2Vol: data[12],
      buy2Price: data[13],
      buy3Vol: data[14],
      buy3Price: data[15],
      buy4Vol: data[16],
      buy4Price: data[17],
      buy5Vol: data[18],
      buy5Price: data[19],
      sell1Vol: data[20],
      //sell1Price: data[21],
      sell2Vol: data[22],
      sell2Price: data[23],
      sell3Vol: data[24],
      sell3Price: data[25],
      sell4Vol: data[26],
      sell4Price: data[27],
      sell5Vol: data[28],
      sell5Price: data[29],
      date: data[30],
      time: data[31]
    };
  } catch (e) {
    return {};
  }
}
//(hqstr, papercode)
export function parse(a, b) {
  var c, d, e, f, g;
  if (!a) {
    c = {};
    c.enName = c.name = c.open = c.preClose = c.low = c.high = c.now = c.change = c.changeP = c.buy = c.sell = c.volume = c.amount = c.pe = c.income = c.high52 = c.low52 = c.low52 = c.date = c.time = c.swing = c.kcb =
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
  ("02" != e.status && "03" != e.status) || e.buy || e.sell || (e.stopDay = !0);
  e.change = e.now - e.preClose;
  e.changeP = 100 * (e.change / e.preClose);
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
  e.kcb = d[33] || "";

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

export function toFixed(value, n) {
  let tmp = (value * 1).toFixed(n);
  if (tmp > 0) return `${tmp}`;
  return tmp;
}
export function toPercent(value, n) {
  let tmp = toFixed(value, n);
  return `${tmp}%`;
}
