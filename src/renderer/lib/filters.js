export const afilters = {
  海选: {
    name: "items2"
  },
  自选: {
    name: "items"
  }
};
export const filters = {
  /*海选: function(items, items2) {
    return items2;
  },
  自选: function(items) {
    return items;
  },*/
  /* 量价: function(items) {
    return items.filter(function(item) {
      return item.hili == 2;
    });
  },*/
  MA5: function(items) {
    return items.filter(function(item) {
      return item.now >= item.ma5;
    });
  },
  MA10: function(items) {
    return items.filter(function(item) {
      return item.now >= item.ma10;
    });
  },
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
