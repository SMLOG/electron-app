import { db } from "!/db/db";
import { ifNoExistGenModel } from "!/db/utils";
import { callFun, techMaplist } from "!/TechMan";
import { getMyList, getSeaList } from "./HQws";

export async function upDateTechDatas(force = false) {
  let sampleRow = techMaplist.reduce((r, it) => {
    r["_" + it] = true;
    return r;
  }, {});
  sampleRow.code = "code";
  sampleRow.score = 0;
  sampleRow.utime = new Date();
  let model = await ifNoExistGenModel(
    [sampleRow],
    "tech",
    {},
    ["code"],
    "tech",
    {},
    "BOOLEAN"
  );

  let techDetailModel = await ifNoExistGenModel(
    [
      {
        code: "code",
        name: "KD 昨日放量 今日高开低走KD 昨日放量 今日高开低走",
        display: "display",
        score: 1,
      },
    ],
    "tech_detail",
    {},
    ["code", "name"],
    "tech_detail",
    {},
    "String"
  );

  let all = await getMyList();
  all.push(...(await getSeaList()));

  let updatedList = [];
  for (let item of all) {
    if (!item.code) continue;

    let techs = await db.query(
      `select code from tech where code = :code and  date_add(utime, interval + 5 minute) > now()`,
      {
        type: db.QueryTypes.SELECT,
        replacements: {
          code: item.code,
        },
      }
    );
    if (force || techs.length == 0) {
      let [r, techDetails] = await callFun(item);
      r.utime = new Date();
      // console.log(r);
      let kd = techDetails.kd;
      let kw = techDetails.kw;
      let details = [];
      let detail = { code: item.code, name: "", display: "", score: 0 };

      if (true) {
        let i = kd.length - 1;

        //大涨
        if ((item.close - item.preclose) / item.preclose > 0.03) {
          if (item.lb < 0.8 && item.close >= kd[i - 1].high) {
            //缩量
            detail.score = 1;
            detail.name = "KD 涨大于3%缩量 分歧小 上涨概率大";
            details.push(Object.assign({}, detail));
          } else if (item.lb > 1.5) {
            //放量
            detail.score = -1;
            detail.name = "KD 涨大于3%放量 分歧大 可能回跌";
            details.push(Object.assign({}, detail));
          } else {
            //放量
            detail.score = 1;
            detail.name = "KD 涨大于3%缓量 分歧小 可能小涨";
            details.push(Object.assign({}, detail));
          }
        }

        //大跌
        else if ((item.close - item.preclose) / item.preclose < -0.03) {
          if (item.lb < 0.8) {
            //缩量
            detail.score = -1;
            detail.name = "KD 大跌缩量 分歧小  继续下跌";
            details.push(Object.assign({}, detail));
          } else if (item.lb > 1.5) {
            //放量
            detail.score = 1;
            detail.name = "KD 大跌放量 分歧大 可能回涨";
            details.push(Object.assign({}, detail));
          } else {
            //缓量
            detail.score = -1;
            detail.name = "KD 大跌缓量 分歧小 可能阴跌";
            details.push(Object.assign({}, detail));
          }
        } else {
        }

        if (kd[i].KDJ_K > kd[i - 1].KDJ_K) detail.score = 1;
        else detail.score = -1;
        detail.name = "KD KDJ";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average5) detail.score = 1;
        else detail.score = -1;

        detail.name = "KD MA5";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average10) detail.score = 1;
        else detail.score = -1;
        detail.name = "KD MA10";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average20) detail.score = 1;
        else detail.score = -1;
        detail.name = "KD MA20";
        details.push(Object.assign({}, detail));
      }
      if (true) {
        let j = kw.length - 1;
        let wbar0 = 2 * (kw[j].MACD_DIF - kw[j].MACD_DEA);
        let wbar1 = 2 * (kw[j - 1].MACD_DIF - kw[j - 1].MACD_DEA);
        let wbar2 = 2 * (kw[j - 2].MACD_DIF - kw[j - 2].MACD_DEA);
        if (wbar0 > wbar1) {
          detail.score = 1;
          if (wbar0 > -0.2 && wbar0 < 0.2) detail.score = 2;
        } else detail.score = -1;

        detail.name = "KW MACD";
        details.push(Object.assign({}, detail));

        if (kw[j].KDJ_K > kw[j - 1].KDJ_K) detail.score = 1;
        else detail.score = -1;
        detail.name = "KW KDJ";
        details.push(Object.assign({}, detail));

        if (
          kw[j].close < kw[j].open &&
          item.close < kw[j].Average5 &&
          kw[j].volume >= 2 * kw[j].volume5
        )
          detail.score = 1;
        else detail.score = 0;

        detail.name = "KW 放量下跌";
        details.push(Object.assign({}, detail));

        let maxHigh20W = Math.max.apply(
          null,
          kw.slice(-20).map((e) => e.high)
        );
        let low20W = Math.min.apply(
          null,
          kw.slice(-20).map((e) => e.low)
        );
        if (item.close >= maxHigh20W && kw[j].volume >= 2 * kw[j].volume5)
          detail.score = -2;
        else detail.score = 0;

        detail.name = "KW 股价20周最高放量,下跌调整可能性大";
        details.push(Object.assign({}, detail));

        if (item.close <= low20W && kw[j].volume <= 0.5 * kw[j].volume5)
          detail.score = 2;
        else detail.score = 0;

        detail.name = "KW 股价20周最低缩量,调整结束可能性大";
        details.push(Object.assign({}, detail));

        let score = details.reduce((t, d) => t + d.score, 0);
        console.log(
          `${item.name} 20周 最低：${low20W}  最高:${maxHigh20W} 现价:${item.close} 分数：${score}`
        );
        r.score = score;
      }
      r.score = details.reduce((t, d) => t + d.score, 0);
      //console.log(r);

      await db.query(`delete from tech_detail where code=:code`, {
        replacements: {
          code: item.code,
        },
      });

      await techDetailModel.bulkCreate(details, {
        updateOnDuplicate: Object.keys(details[0]),
        logging: false,
      });

      await model.bulkCreate([r], {
        updateOnDuplicate: Object.keys(r),
        logging: false,
      });
      updatedList.push(r);
    }
  }
  return updatedList;
}
/**
 缩量上涨还将上涨， 
 1、缩量下跌还将下跌， 
 2、放量上涨必将回落； 
 3、放量下跌必将反弹； 
 4、缩量不跌，筑底成功； 
 5、放量不涨，头部将现； 
 6、量大成头，量小成底； 
 7、无量顶下跌，后市必将大涨； 
 8、放量顶下跌，后市调整漫长。 
 9、后量超前量，股价也跟上。
 不冲高不卖，不跳水不买，横盘不交易。
 2、买阴不买阳，卖阳不卖阴，逆市而动，方为英雄
3、高低盘整，再等一等
4、高位横盘再冲高，抓住时机赶紧抛；低位横盘又新低，全仓买进好时机。
5、未曾下手先认错，宁可买少勿买多
6、套牢补仓求保本，奢求盈利乃为贪
7、一推二荐就不涨，只好往下再震仓
8、绿荫丛中一线红，抓紧买入莫放松
9、下跌趋缓，反弹亦缓；下跌加速，反弹亦速
10、平静水面一波高，当心后面大波涛
11、底部长阳第一次，坚决持股到收市
12、一根巨阳头顶光，尾市抢盘我清仓

 */
(async () => {
  // let r = await callFun({ code: "sh603369" });
  //console.log(r);
  await upDateTechDatas(true);
  console.log("===========done=============");
})();
