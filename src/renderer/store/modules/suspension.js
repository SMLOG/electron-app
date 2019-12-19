import storejs from "storejs";

const state = {
  show: storejs.get("showSuspension"),
  fields: storejs.get("fields") || []
};

const actions = {
  showSuspension: function({ state, commit }) {
    let status = true;
    storejs.set("showSuspension", status);
    state.show = status;
  },

  hideSuspension: function({ state, commit }) {
    let status = false;
    storejs.set("showSuspension", status);
    state.show = status;
  },
  setFields: function({ state, commit }, fields) {
    storejs.set("fields", fields);
    state.fields = fields;
    console.log(state);
    commit(SET_FIELDS, fields);
  }
};

const getters = { fields: state => state.fields };

const SET_FIELDS = "SET_FIELDS";
const mutations = {
  [SET_FIELDS](state, fields) {
    state.fields = fields;
  }
};
export default {
  state,
  actions,
  getters,
  mutations
};
