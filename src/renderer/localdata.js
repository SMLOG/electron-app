const STORAGE_KEY = "datas";
const STORAGE_SETTING_KEY = "setting_datas";

export default {
  fetch: function() {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  },

  save: function(items) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items));
  },

  getSetting: function(key) {
    return window.JSON.parse(
      window.localStorage.getItem(STORAGE_SETTING_KEY) || "{}"
    )[key];
  },
  setSetting: function(key, value) {
    let data =
      window.JSON.parse(
        window.localStorage.getItem(STORAGE_SETTING_KEY) || "{}"
      ) || {};
    data[key] = value;
    window.localStorage.setItem(
      STORAGE_SETTING_KEY,
      window.JSON.stringify(data)
    );
  },
  isShouldRemove: function(id, date) {
    if (id) {
      let data = window.JSON.parse(
        window.localStorage.getItem(STORAGE_SETTING_KEY) || "{}"
      );
      let key = id.split("_")[0];
      if (data[key] && date && date.getTime() < data[key]) return true;
    }
    return false;
  }
};
