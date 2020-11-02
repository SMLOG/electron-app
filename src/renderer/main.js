import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
// 插件
import formater from "./plugin/formater"; // 引入
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

Vue.use(formater); // 添加

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
