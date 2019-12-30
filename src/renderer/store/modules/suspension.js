import storejs from "storejs";
import { stat } from "fs";

const fileds_key = "fields_key";
const filters_key = "filters_key";
const state = {
  show: storejs.get("showSuspension"),
  fields: getFields(),
  filters: getFilters()
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
  },
  setFilters: function({ state, commit }, filters) {
    storejs.set(filters_key, filters);
    state.filters = filters;
    commit(SET_FILTERS, filters);
  }
};

const getters = {
  fields: state => state.fields,
  filters: state => state.filters
};

const SET_FIELDS = "SET_FIELDS";
const SET_FILTERS = "SET_FILTERS";
const mutations = {
  [SET_FIELDS](state, fields) {
    state.fields = fields;
  },
  [SET_FILTERS](state, filters) {
    state.filters = filters;
  }
};

export function getFields() {
  return storejs.get(fileds_key) || [];
}
export function getFilters() {
  return storejs.get(filters_key) || {};
}
export default {
  state,
  actions,
  getters,
  mutations
};
