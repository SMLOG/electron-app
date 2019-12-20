import storejs from "storejs";

const fileds_key = "fields_key";
const state = {
  show: storejs.get("showSuspension"),
  fields: getFields()
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
    storejs.set(fileds_key, fields);
    state.fields = fields;
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

export function getFields() {
  return storejs.get(fileds_key) || [];
}
export default {
  state,
  actions,
  getters,
  mutations
};
