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
  },
};
