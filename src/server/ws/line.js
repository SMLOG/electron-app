const ml = require("ml-regression");
import { axios } from "!/axios";

const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};
async function getLeline5Result(code) {
  const SLR = ml.SLR; // 线性回归
  let x = [],
    y = [];

  //let file = `${CONFIG_DIR}/sz000568/klines.json`;
  //let { kd: dItems, kw: wItems } = JSON.parse(fs.readFileSync(file));

  let url = `http://${Math.floor(
    99 * Math.random() + 1
  )}.push2his.eastmoney.com/api/qt/stock/kline/get?cb=cb&secid=${code
    .replace(/sz/i, "0.")
    .replace(
      /sh/i,
      "1."
    )}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=102&fqt=1&end=20500101&lmt=179&_=${+new Date()}`;
  console.log(url);
  let wData = await axios
    .get(url)
    .then((resp) => eval("function cb(d){ return d;};" + resp.data + ";"));

  let wData2 = await axios
    .get(
      `https://caibaoshuo.com/stock_charts/history?symbol=${
        code.match(/^(sz|6)/i) ? "SZSE" : "SHSE"
      }:${code
        .replace(/sz/i, "")
        .replace(
          /sh/i,
          ""
        )}&resolution=M&from=1497985669&to=1608361669&type=split_adjusted`
    )
    .then((resp) => resp.data);
  y = wData.data.klines.map((e) => parseFloat(e.split(",")[2]));
  //y = wData2.c;

  x = y.map((e, i) => 1 + i);
  let regressionModel = new SLR(x, y);
  console.log(regressionModel.toString(3));
  let answer = x.length;

  let priceTL = regressionModel.predict(parseFloat(answer));
  console.log(regressionModel.toString(3));

  console.log(`当X = ${answer}时, 预测值y =${priceTL}`);

  let ytl = y.map((e, i) => e - regressionModel.predict(parseFloat(i + 1)));

  let SD = standardDeviation(ytl);

  console.log("priceTL：", priceTL);
  console.log("TL-SD：", priceTL - SD);
  console.log("TL-2SD：", priceTL - 2 * SD);
  console.log("SD:", SD);
}

(async () => {
  await getLeline5Result("sz002458");
})();
