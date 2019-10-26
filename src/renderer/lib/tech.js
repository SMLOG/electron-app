import { timeout } from "./utils";
import { getCacheData } from "./db";

export async function getTechDatas(item) {
  let techId = "tech_" + item.code;
  if (window[techId]) return window[techId];

  return (window[techId] = await getCacheData(item.date, techId, async () => {
    let dom =
      document.getElementById("h5Figure") || document.createElement("DIV");
    document.body.appendChild(dom);
    dom.setAttribute("id", "h5Figure");
    dom.innerHTML = "";
    dom.style.display = "none";

    KKE.api(
      "plugins.tchart.get",
      {
        symbol: item.code,
        mt: "cnlv1",
        dom_id: "h5Figure",
        type: "tech"
      },
      function(chart_) {}
    );

    do {
      console.log(new Date());
      if (window["tech_" + item.code]) {
        //document.body.remove(dom);
        return window["tech_" + item.code];
      }
      await timeout(100);
    } while (true);
  }));
}
