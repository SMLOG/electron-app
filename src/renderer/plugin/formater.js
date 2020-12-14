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
      let _item = this.$store.state.ws.curItem;
      let _link = this.$store.state.ws.link;
      let _showType = this.$store.state.ws.showType;
      if (_item && item.code == _item.code && link == _link) {
        this.$store.commit("ws/setCurItem", {
          curItem: null,
          link: _link,
          showType: _showType,
        });
      } else {
        this.$store.commit("ws/setCurItem", {
          curItem: item,
          link: link,
          showType: "link",
        });
      }
    };

    Vue.prototype.$togglePop = function(item, comp, type) {
      let _item = this.$store.state.ws.curItem;
      let _link = this.$store.state.ws.link;
      let _showType = this.$store.state.ws.showType;
      let _curComponent = this.$store.state.ws.curComponent;
      if (_item && item.code == _item.code && _curComponent == comp) {
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
          curComponent: comp,
        });
      }
    };
    Vue.prototype.$rightItem = function(rightItem) {
      this.$store.commit("ws/setRightItem", { rightItem });
    };
  },
};
