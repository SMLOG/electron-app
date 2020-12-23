import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
// 插件
import formater from "./plugin/formater"; // 引入
import VueSocketIO from "vue-socket.io";
import VTooltip from "v-tooltip";
import Peity from "vue-peity";

import axios from "axios";
Vue.prototype.$http = axios;

Vue.use(VTooltip);
Vue.use(Peity);
Vue.component("peity", Peity);
Vue.config.productionTip = false;

Vue.use(formater); // 添加
import $ from "jquery";
window.$ = $;
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
import echarts from "echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
Vue.prototype.$echarts = echarts;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "/socket.io",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    options: {}, //Optional options
  })
);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
