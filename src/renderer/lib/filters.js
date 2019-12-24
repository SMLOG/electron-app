import { buildFilters } from "./tech-manager";
export const afilters = {
  海选: {
    name: "items2"
  },
  自选: {
    name: "items"
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
