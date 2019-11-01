export const filters = {
  Find: function(items, items2) {
    return items2;
  },
  All: function(items) {
    return items;
  },
  Option1: function(items) {
    return items.filter(function(item) {
      return item.candidateType > 0;
    });
  },
  Option2: function(items) {
    return items.filter(function(item) {
      return item.candidateType > 1;
    });
  },
  Strong: items => {
    return items.filter(
      e => e.changePV > 0 && (e.avgzs > 20 || e.upArgCount > 120)
      /*&&
        e.trend &&
        e.trend.split("-").filter(x => x.trim()).length < 4*/
    );
  },
  Safe: items => {
    return items.filter(
      e => e.avgzs > 0 && e.upArgCount > 100 && e.changePV > 0 && e.changePV < 4
    );
  },
  Focus: function(items) {
    return items.filter(function(item) {
      return item.isFocus;
    });
  }
};
