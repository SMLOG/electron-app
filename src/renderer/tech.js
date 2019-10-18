(async () => {
  let symbols = ["sz000002"];
  for (let i = 0; i < symbols.length; i++) {
    let dom = document.createElement("DIV");
    document.body.appendChild(dom);
    dom.setAttribute("id", "h5Figure");
    dom.innerHTML = "";
    dom.style.display = "none";
    await new Promise((resolve, reject) => {
      KKE.api(
        "plugins.tchart.get",
        {
          symbol: symbols[i],
          mt: "cnlv1",
          dom_id: "h5Figure",
          type: "tech"
        },
        function(chart_) {}
      );
      let handler = () => {
        console.log("checking");
        let techs = window["techs"];
        let names = ["VOLUME", "MACD"];
        let ready = false;
        if (techs) {
          techs = techs[0];
          for (let k = 0; k < names.length; k++) {
            let name = names[k];
            if (!techs[name] || techs[name].symbol != symbols[i]) {
              ready = false;
              break;
            }
            ready = true;
          }
        }
        if (ready) {
          let datas = techs["MACD"].datas;
          let prices = window["techs"][1];
          let buyi = -1;
          let mmd = [];
          for (let j = 1; j < datas.length; j++) {
            if (
              parseFloat(datas[j].bar) > 0 &&
              parseFloat(datas[j - 1].bar) <= 0
            ) {
              buyi = j;
            }
            // 空动能
            else if (
              buyi > 0 &&
              parseFloat(datas[j].bar) <= parseFloat(datas[buyi].bar) &&
              parseFloat(datas[j - 1].bar) >= parseFloat(datas[buyi].bar)
            ) {
              if (datas[buyi]) {
                // console.log(datas[j], datas[j - 1], datas[buyi]);
                let profit = (prices[j].close - prices[buyi].close).toFixed(2);

                console.log(
                  `buy ${fmtDate(datas[buyi].date)} ${fmtDate(
                    prices[buyi].date
                  )}  sell ${fmtDate(datas[j].date)} ${fmtDate(
                    prices[j].date
                  )} price:${prices[j].close.toFixed(2)} - ${prices[
                    buyi
                  ].close.toFixed(2)} profit:${profit}`
                );
                datas[j].close = prices[j].close;
                datas[buyi].close = prices[buyi].close;

                mmd.push([datas[buyi], datas[j], j - buyi]);
              }
            }
          }
          window.mmd = mmd;

          let i2019 = mmd.filter(p => p[0].date.getFullYear() == 2018);
          console.log(i2019);
          i2019.reduce((total, prev, arr, i) => {
            let profit = prev[1].close - prev[0].close;
            total += profit;
            console.log(
              fmtDate(prev[0].date),
              "to",

              fmtDate(prev[1].date),

              prev[2] + "天",
              `买入价${prev[0].close.toFixed(2)} 卖出价${prev[1].close.toFixed(
                2
              )}`,
              "当期盈利" + profit.toFixed(2),
              "总盈利" + total.toFixed(2)
            );
            return total;
          }, 0);

          return resolve();
        }
        setTimeout(() => {
          handler();
        }, 2000);
        // resolve();
      };
      handler();
    });
  }
})();
