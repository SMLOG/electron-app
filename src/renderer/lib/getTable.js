import { loadScripts, dateFormat, ConvertUnit } from "./utils";

//const dict = {1: 'YJBB', 2: 'YJKB', 3: 'YJYG',4: 'YYPL', 5: 'ZCFZB', 6: 'LRB', 7: 'XJLLB',XSJJ_NJ_PC}

function decode(str, codes) {
  str = str.toString();
  for (var i = 0; i < codes.length; i++) {
    var re = new RegExp(codes[i].code, "g");
    str = str.replace(re, codes[i].value);
  }
  return str;
}

export async function getXSJJTable() {
  if (window.xsjj) return window.xsjj;
  let params = {
    type: "XSJJ_NJ_PC",
    token: "70f12f2f4f091e459a279469fe49eca5", // # 访问令牌，必须
    st: "ltsj",
    sr: 1,
    p: 1,
    ps: 30,
    js: "var VDOQAFpi={pages:(tp),data:(x),font:(font)}",
    filter: "(mkt=)(ltsj>=^2019-10-19^ and ltsj<=^2021-10-19^)",
    rt: 51294261
  };
  let url = "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?";

  let arr = [];
  for (let p in params) {
    arr.push(`${p}=${encodeURIComponent(params[p])}`);
  }
  url += arr.join("&");
  console.log(url);
  //let text = await fetch(url ).then(resp=>resp.text());
  await loadScripts([url]);
  console.log(window.VDOQAFpi);

  window.xsjj = {};
  if (window.VDOQAFpi.data)
    for (let d of window.VDOQAFpi.data) {
      let mk = "sz";
      if (d.gpdm.substring(0, 1) == 6) {
        mk = "sh";
      }
      d.ltsj = dateFormat(d.ltsj, "yyyy-MM-dd");
      for (var key in d) {
        var html = d[key];
        try {
          d[key] = decode(html, window.VDOQAFpi.font.FontMapping);
        } catch (err) {}
      }
      d.kjjsl = ConvertUnit(d.kjjsl * 10000);
      d.jjsz = ConvertUnit(d.jjsz * 10000);
      d.zb = parseFloat(d.zb * 100).toFixed(2);
      window.xsjj[`${mk}${d.gpdm}`] = d;
    }
  return window.xsjj;
}
