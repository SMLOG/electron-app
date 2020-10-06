import _ from "lodash";

export function kcbMyformatNum(num) {
  if (num == undefined || num == "" || isNaN(num) || num == "-") {
    return "";
  }

  var hz = "";
  var num2 = "";

  if (num >= 0 && num <= 99.999999999) {
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 100 && num <= 999) {
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 1000) {
    num2 = parseFloat(num).toFixed(0);
  }

  //处理小于0
  if (num < 0) {
    num = Math.abs(num);

    if (num >= 0 && num <= 99) {
      num2 = parseFloat(num).toFixed(2);
    } else if (num >= 100 && num <= 999) {
      num2 = parseFloat(num).toFixed(1);
    } else if (num >= 1000) {
      num2 = parseFloat(num).toFixed(0);
    }
    num2 = "-" + num2;
  }
  return num2.toString() + hz;
}
export function formatNum(num) {
  if (num == 0) {
    return num;
  }
  if (num == undefined || num == "" || isNaN(num) || num == "-") {
    return "-";
  }

  var hz = "";
  var num2 = "";
  if (num >= 10000000000000) {
    num = num / 1000000000000;
    hz = "万亿";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 1000000000000 && num < 10000000000000) {
    num = num / 1000000000000;
    hz = "万亿";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 100000000000 && num < 1000000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 10000000000 && num < 100000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 100000000 && num < 10000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 10000000 && num < 100000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 1000000 && num < 10000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 10000 && num < 1000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 1000 && num < 10000) {
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 100 && num < 1000) {
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 1 && num < 100) {
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 0 && num < 1) {
    num2 = parseFloat(num).toFixed(3);
  } else if (num < 0) {
    num2 = parseFloat(num).toFixed(2);
  } else {
    num2 = parseFloat(num).toFixed(2);
    // return num;
  }
  // if(parseInt(num) >= 1000){ //整数部分超过4位
  //   num2 = num.toFixed(1);
  // }

  return num2.toString() + hz;
}

export function formatHead(d, empty = false) {
  let item = {
    buy5: d.f11,
    buy5Volume: d.f12,
    buy4: d.f13,
    buy4Volume: d.f14,
    buy3: d.f15,
    buy3Volume: d.f16,
    buy2: d.f17,
    buy2Volume: d.f18,
    buy1: d.f19,
    buy1Volume: d.f20,
    sell5: d.f31,
    sell5Volume: d.f32,
    sell4: d.f33,
    sell4Volume: d.f34,
    sell3: d.f35,
    sell3Volume: d.f36,
    sell2: d.f37,
    sell2Volume: d.f38,
    sell1: d.f39,
    sell1Volume: d.f40,
    close: d.f43,
    high: d.f44,
    low: d.f45,
    open: d.f46,
    volume: d.f47,
    amount: d.f48,
    lb: d.f50,
    涨停: d.f51,
    跌停: d.f52,
    name: d.f58,
    preClose: d.f60,
    totalValue: d.f116,
    flowValue: d.f117,
    decimal: d.f152,
    pe: d.f162,
    pb: d.f167,
    turnover: d.f168 + "%",
    change: d.f169,
    changeP: d.f170,
    weiby: d.f191,
    委差: d.f192,
    差量: d.f206,
    volumePh: d.f260,
    amountPh: d.f261,
    isSameRight: d.f279,
    是否盈利: d.f288,
  };
  if (empty) {
    return Object.keys(item).map((e) => (item[e] = "-"));
  } else {
    return _.pickBy(item, _.identity);
  }
}
