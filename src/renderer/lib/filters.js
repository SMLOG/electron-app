import { buildFilters } from "./tech-manager";
import { getFilters } from "../store/modules/suspension";
import { getFindList } from "@/lib/getTable";
import store from "../localdata";

export const afilters = {
  海选: {
    name: "items2",
    get: async function(cb) {
      await getFindList(e => {
        this.items.push(e);
      });
    },
    items: []
  },
  自选: {
    name: "items",
    get: function(cb) {
      this.items.concat(store.fetch());
    },
    items: []
  }
};

export let filters = {
  Focus: function(items) {
    return items.filter(function(item) {
      return item.isFocus;
    });
  }
};
filters = Object.assign(filters, buildFilters());

export function getCheckFilters(name) {
  let checkFields = getFilters()[name] || [];
  let checked = checkFields.filter(e => e.checked).map(e => e.name);
  let filters_arr = Object.keys(filters);
  let ret = filters_arr.map(f => {
    return { name: f, checked: checked.indexOf(f) > -1 };
  });

  return ret;
}
export const filtersCount = [];
{
  const keys = Object.keys(filters);
  const akeys = Object.keys(afilters);

  for (let i = 0; i < keys.length; i++) {
    let arr = [];
    for (let k = i; k < keys.length; k++) {
      let it = { name: keys[k] };
      for (let j of akeys) it[j] = 0;
      arr.push(it);
    }
    filtersCount.push(arr);
  }
}
export function toFiltersCount(item, src, type = "+") {
  for (let cn = 0; cn < filtersCount.length; cn++) {
    for (let ri = 0; ri < filtersCount.length - cn; ri++) {
      let it = filtersCount[ri][cn];
      if (filters[it.name]([item]).length > 0) {
        it[src] += type == "-" ? -1 : 1;
      } else break;
    }
  }
}
export function updateFiltersCount() {
  const keys = Object.keys(filters);
  const akeys = Object.keys(afilters);

  for (let i = 0; i < keys.length; i++) {
    for (let k = 0; k < keys.length - i; k++) {
      let it = filtersCount[i][k];
      if (!it) filtersCount[i][k] = { name: keys[k + i] };
      let fcs = getFilterChain(i, k);
      for (let j of akeys) {
        let items = afilters[j].items;
        for (let fc of fcs) {
          items = fc(items);
        }
        it[j] = items.length;
      }
    }
  }
}
window.updateFiltersCount = updateFiltersCount;

export function getFilterChain(ri, ci) {
  if (ri < 0 || ci < 0) return [];
  return new Array(ri + 1)
    .fill(0)
    .map((a, i) => filters[filtersCount[i][ci].name]);
}
window.getFilterChain = getFilterChain;
