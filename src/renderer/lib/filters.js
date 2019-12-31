import { buildFilters } from "./tech-manager";
import { getFilters } from "../store/modules/suspension";
import { updateItem, getMeetList, getFindList } from "@/lib/getTable";
import store from "../localdata";

export const afilters = {
  海选: {
    name: "items2",
    get: async function(cb) {
      await getFindList(e => {
        cb(e);
      });
    }
  },
  自选: {
    name: "items",
    get: function(cb) {
      cb(store.fetch());
    }
  }
};

export let filters = {
  Strong: items => {
    return items.filter(function(item) {
      return (
        item.now >= item.ma5 && item.ma5 >= item.ma10 && item.ma10 > item.ma20
      );
    });
  },
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
