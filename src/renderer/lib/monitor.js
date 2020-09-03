import { techAnalyst } from "./getTable";
import { cache } from "./db";

export async function monitor(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    await techAnalyst(item);

    Object.assign(item, cache[name]);
  }
}
