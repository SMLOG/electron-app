xh5_define("datas.kdatas", ["utils.util"], function(util) {
  return new (function() {
    this.get = function(callback) {
      callback(util);
    };
  })();
});
