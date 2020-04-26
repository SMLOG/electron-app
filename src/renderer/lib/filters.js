import { buildFilters } from "./tech-manager";
import { getFilters } from "../store/modules/suspension";
import { getFilterList } from "@/lib/getTable";
import store from "../localdata";

export const afilters = {
  海选: {
    name: "items2",
    is_search: true,
    get: async function(cb) {
      await getFilterList((e) => {
        this.items.push(e);
      });
    },
    items: [],
  },
  自选: {
    name: "items",
    get: function(cb) {
      this.items.concat(store.fetch());
    },
    items: [],
  },
};

export let filters = {
  /*Focus: function(items) {
    return items.filter(function(item) {
      return item.isFocus;
    });
  }*/
};
filters = Object.assign(filters, buildFilters());

export function getCheckFilters(name) {
  let checkFields = getFilters()[name] || [];
  let checked = checkFields.filter((e) => e.checked).map((e) => e.name);
  let filters_arr = Object.keys(filters);
  let ret = filters_arr.map((f) => {
    return { name: f, checked: checked.indexOf(f) > -1 };
  });

  return ret;
}
export const filtersCount = [];
{
  const keys = Object.keys(filters);
  const akeys = Object.keys(afilters);

  for (let k = 0; k < keys.length; k++) {
    let it = { name: keys[k] };
    for (let j of akeys) it[j] = 0;
    filtersCount.push(it);
  }
}
export function toFiltersCount(item, src, type = "+") {
  const keys = Object.keys(filters);

  for (let i = 0; i < keys.length; i++) {
    let it = filtersCount[i];
    let fc = filters[it.name];
    items = fc([item]);
    it[src] += fc([item]) ? (type == "+" ? 1 : -1) : 0;
  }
}
export function updateFiltersCount() {
  const keys = Object.keys(filters);
  const akeys = Object.keys(afilters);

  for (let i = 0; i < keys.length; i++) {
    let it = filtersCount[i];
    let fc = filters[it.name];
    for (let j of akeys) {
      let items = afilters[j].items;
      items = fc(items);
      it[j] = items.length;
    }
  }
}
window.updateFiltersCount = updateFiltersCount;

export function getFilterChain(ids) {
  if (!ids) return [];
  return ids.split("+").map((e) => filters[e]);
}
window.getFilterChain = getFilterChain;

export function orFiltersItem(item, filters) {
  if (filters.length == 0) return false;
  let f = filters.pop();
  return f([item]).length > 0 || orFiltersItem(item, filters);
}
export function getOrFiltersItems(items) {
  return items.filter((item) => orFiltersItem(item, Object.values(filters)));
}
