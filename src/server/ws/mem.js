import { getMyList, getSeaList } from "./HQws";
import { CONFIG_DIR } from "../config";
import { attachExtractInfoToItems } from "../helper";
import { buildFilters } from "../TechMan";
import { inds, hx } from "./HQws";
import { emitter } from "../jobs/jobIndex";
import My from "../db/model/My";
import { db } from "../db/db";
import _ from "lodash";
import fs from "fs";
const sleep = (t) => new Promise((res, rej) => setTimeout(res, t));

export async function timeout(afn, timeout, def) {
  return Promise.race([afn, sleep(timeout).then((r) => def)]);
}
const myfile = `${CONFIG_DIR}/my.json`;
let indMap = {};
export const filters = buildFilters();
export const cats = {
  海选: {
    items: [],
  },
  自选: {
    items: [],
  },
};
export function initmem(io) {
  io.on("connection", (socket) => {
    console.log(`connect ${new Date()}`);
    socket.on("disconnect", () => {
      console.log(`disconnect ${new Date()}`);
    });

    socket.on("filter-id-list", (data) => {
      console.log("filter-id-list", data);
      fs.writeFileSync(filterIdListFile, JSON.stringify(data));
      updateFiltersCount();
      socket.emit("sealist", cats["海选"].items);
      socket.emit("countMap", countMap);
      console.log(countMap);
      socket.emit("filtersCount", filtersCount);
    });
    setTimeout(() => {
      (async () => {
        console.error("initmem");
        // cats["自选"].items = await getMyList();
        cats["自选"].items = await db.query(
          `select h.* from my a left join hq h on a.code = h.code  `,
          {
            type: db.QueryTypes.SELECT,
          }
        );
        socket.emit("mylist", cats["自选"].items);
        socket.emit("filters", Object.keys(filters));
        updateFiltersCount();
        socket.emit("sealist", cats["海选"].items);
        socket.emit("countMap", countMap);
        console.log(countMap);
        socket.emit("filtersCount", filtersCount);
      })();
    }, 500);

    socket.on("addItem", (item) => {
      (async () => {
        if (cats["自选"].items.filter((e) => e.code == item.code).length == 0) {
          My.create(item);

          cats["自选"].items.push(item);
          await attachExtractInfoToItems([item]);
          fs.writeFileSync(myfile, JSON.stringify(cats["自选"].items));
          toFiltersCount(item, "自选", "+");
          // socket.emit("mylist", cats["自选"].items);
          socket.emit("filtersCount", filtersCount);
          socket.emit("countMap", countMap);
          socket.emit("addItem", item);
          socket.emit("mylist", cats["自选"].items);
        }
      })();
    });

    socket.on("updateItems", (items) => {
      (async () => {
        cats["自选"].items = items;
        fs.writeFileSync(myfile, JSON.stringify(cats["自选"].items));
        await My.destroy({ where: {}, truncate: true });
        items = items.map((e) => ((e.id = null), e));
        console.log(items);
        await My.bulkCreate(items);
      })();
    });
    socket.on("removeItem", (item) => {
      (async () => {
        let the = cats["自选"].items.filter((e) => e.code == item.code);
        if (the.length > 0) {
          cats["自选"].items = cats["自选"].items.filter(function(v) {
            return the.indexOf(v) === -1;
          });
          fs.writeFileSync(myfile, JSON.stringify(cats["自选"].items));
          toFiltersCount(item, "自选", "-");
          socket.emit("mylist", cats["自选"].items);
          socket.emit("filtersCount", filtersCount);
          socket.emit("countMap", countMap);
          socket.emit("removeItem", item);
        }
        await My.destroy({ where: { code: [item.code] } });
      })();
    });
  });

  emitter.addListener("hx", function(datas) {
    console.log("emitter", datas);
  });

  setInterval(() => {
    console.log("setinterval:" + new Date());
  }, 30000);
  (async () => {
    for (; true; ) {
      if (cats["海选"].items.length == 0) {
        cats["海选"].items = await timeout(
          getSeaList(),
          60000,
          cats["海选"].items
        );
        console.log("海选:" + cats["海选"].items.length);
        updateFiltersCount();

        io.emit("sealist", cats["海选"].items);
        io.emit("countMap", countMap);
        console.log("countMap", countMap);
        io.emit("filtersCount", filtersCount);
      } else {
        return;
      }
      sleep(350000);
    }
  })();
  (async () => {
    for (; true; ) {
      try {
        console.log(new Date());

        io.clients((error, clients) => {
          if (error) throw error;
          console.log(clients);
        });
        let hxlist = await timeout(hx(), 10000, []);
        io.emit("hx", hxlist);
        console.log(new Date(), "hx", hxlist.length);
        indMap = await timeout(inds(), 10000, indMap);
        io.emit("indMap", indMap);

        await sleep(2000);
      } catch (e) {
        console.log(e);
      }
    }
  })();
}
export const filtersCount = [];
{
  const keys = Object.keys(filters);
  const ckeys = Object.keys(cats);

  for (let k = 0; k < keys.length; k++) {
    let it = { name: keys[k] };
    for (let j of ckeys) it[j] = 0;
    filtersCount.push(it);
  }
  console.error(filtersCount);
}
export function toFiltersCount(item, src, type = "+") {
  const keys = Object.keys(filters);

  for (let i = 0; i < keys.length; i++) {
    let it = filtersCount[i];
    let fc = filters[it.name];
    it[src] += fc([item]) ? (type == "+" ? 1 : -1) : 0;
  }
}
export let countMap = {};
let filterIdListFile = `${CONFIG_DIR}/filter-id-list.json`;

export function updateFiltersCount() {
  const keys = Object.keys(filters);
  const akeys = Object.keys(cats);

  for (let i = 0; i < keys.length; i++) {
    let it = filtersCount[i];
    let fc = filters[it.name];
    for (let j of akeys) {
      let items = cats[j].items;
      items = fc(items);
      it[j] = items.length;
    }
  }
  let list = [];
  if (fs.existsSync(filterIdListFile)) {
    list = JSON.parse(fs.readFileSync(filterIdListFile)) || [];
  }
  let fcs = list.map((e) => [
    e,
    e
      .split("+")
      .map((t) => filters[t])
      .filter((e) => e),
  ]);
  let ret = fcs.map((e) => {
    let ret = { name: e[0] };
    for (let j of akeys) {
      let items = cats[j].items;
      ret[j] = calRes(e[1], items, 0);
    }
    return ret;
  });
  countMap = ret.reduce((map, item) => {
    map[item.name] = item;
    return map;
  }, countMap);
  console.error(countMap);
}
function calRes(fnArr, items, index) {
  if (fnArr.length <= index || items.length == 0) return items.length;

  let f = fnArr[index];
  return calRes(fnArr, f(items), ++index);
}
function removeAbandon(id) {
  return id
    .split("+")
    .filter((t) => filters[t])
    .join("+");
}
