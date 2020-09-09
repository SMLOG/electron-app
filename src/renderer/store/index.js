import Vue from "vue";
import Vuex from "vuex";

import suspension from "./modules/suspension";
import ws from "./modules/ws";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    suspension,
    ws,
  },
});
