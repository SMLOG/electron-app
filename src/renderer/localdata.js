const STORAGE_KEY = "datas";

export default {
  fetch: function() {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  },

  save: function(items) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items));
  }
};
