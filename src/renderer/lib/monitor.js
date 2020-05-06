import { getTdatas } from "./tech";
import {
  getTables,
  loadReports,
  techAnalyst,
  isNotTradeTime,
} from "./getTable";
import { cache } from "./db";

export async function monitor(items) {
  /* for (let i = 0; i < items.length; i++) {
    let item = items[i];
    await techAnalyst(item);

    loadReports(item);

    Object.assign(item, cache[name]);
  }*/
}

getTables();
