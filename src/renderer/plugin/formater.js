import {
  getLastReportDate,
  dateFormat,
  fmtNumber,
  fmtPercent,
} from "../lib/utils";
export default {
  install(Vue, options) {
    Vue.prototype.$fmtNumber = function(value) {
      return fmtNumber(value);
    };
    Vue.prototype.$fmtPercent = function(value) {
      return fmtPercent(value);
    };
    Vue.prototype.$openlink = function(
      item,
      event,
      link = `/static/tech.html?{{code}}&kd`
    ) {
      let _this = window.app;
      let _item = _this.$store.state.ws.curItem;
      let _link = _this.$store.state.ws.link;
      let _showType = _this.$store.state.ws.showType;
      if (_item && item.code == _item.code && link == _link) {
        _this.$store.commit("ws/setCurItem", {
          curItem: null,
          link: _link,
          showType: _showType,
        });
      } else {
        _this.$store.commit("ws/setCurItem", {
          curItem: item,
          link: link,
          showType: "link",
        });
      }
    };

    Vue.prototype.$curItem = function(item) {
      let _item = this.$store.state.ws.curItem;

      if (_item && item.code == _item.code) {
        this.$store.commit("ws/setCurItem", {
          ...this.$store.state.ws,
          curItem: null,
        });
      } else {
        this.$store.commit("ws/setCurItem", {
          ...this.$store.state.ws,
          curItem: item,
        });
      }
    };
    Vue.prototype.$togglePop = function(item, compName, type) {
      let _item = this.$store.state.ws.curItem;
      let _link = this.$store.state.ws.link;
      let _showType = this.$store.state.ws.showType;
      let _curComponentName = this.$store.state.ws.curComponentName;
      if (_item && item.code == _item.code && _curComponentName == compName) {
        this.$store.commit("ws/setCurItem", {
          ...this.$store.state.ws,
          curItem: null,
          showType: null,
        });
      } else {
        this.$store.commit("ws/setCurItem", {
          ...this.$store.state.ws,
          curItem: item,
          showType: type,
          curComponentName: compName,
        });
      }
    };
    Vue.prototype.$rightItem = function(rightItem) {
      this.$store.commit("ws/setRightItem", { rightItem });
    };
    Vue.prototype.$showComments = function(showMsgItem) {
      this.$store.commit("ws/setCurItem", {
        ...this.$store.state.ws,
        showMsgItem: showMsgItem,
      });
    };

    Vue.prototype.$getThis = function(cb) {
      if (cb) {
        cb(this);
      }
      return this;
    };
  },
};
