import storejs from "storejs";
import { batchUpdateHQ } from "@/lib/getTable";

const fileds_key = "fields_key";
const filters_key = "filters_key";

const MUTATION_TYPE = {
  SET_FIELDS: "SET_FIELDS",
  SET_FILTERS: "SET_FILTERS",
  SET_CURFILTERIDS: "SET_CURFILTERIDS",
};
const state = {
  show: storejs.get("showSuspension"),
  fields: getFields(),
  filters: getFilters(),
  curFilterIds: storejs.get("curFilterIds"),
  filtersCount: [],
  countMap: [],
  wsfilters: {},
  hx: [],
  curItem: {},
  curComponent: "",
  curComponentName: "",
  showType: "",
  rightItem: false,
  link: null,
  showMsgItem: false,
  cats: {
    海选: {
      items: [],
    },
    自选: {
      items: [],
    },
  },
};
const mutations = {
  [MUTATION_TYPE.SET_FIELDS](state, fields) {
    state.fields = fields;
  },
  [MUTATION_TYPE.SET_FILTERS](state, filters) {
    state.filters = filters;
  },
  [MUTATION_TYPE.SET_CURFILTERIDS](state, ids) {
    state.curFilterIds = ids;
  },
  SOCKET_filtersCount(state, data) {
    state.filtersCount = data;
  },
  SOCKET_countMap(state, data) {
    state.countMap = data;
  },
  SOCKET_filters(state, data) {
    state.wsfilters = data;
  },
  SOCKET_mylist(state, data) {
    state.cats["自选"] = data;
  },
  SOCKET_sealist(state, data) {
    state.cats["海选"] = data;
  },
  SOCKET_hx(state, data) {
    batchUpdateHQ(...state.cats["自选"], ...state.cats["海选"], data);
    // commit("SOCKET_mylist", state.mylist);
  },
  SOCKET_techdatas(state, data) {
    batchUpdateHQ(...state.cats["自选"], ...state.cats["海选"], data);
  },
  setCurItem(state, data) {
    Object.assign(state, data);
  },
  setRightItem(state, data) {
    Object.assign(state, data);
  },
};
const actions = {
  setRightItem: function({ state, commit }, data) {
    commit("setRightItem", data);
  },
  setCurItem: function({ state, commit }, data) {
    commit("setCurItem", data);
  },
  showSuspension: function({ state, commit }) {
    let status = true;
    storejs.set("showSuspension", status);
    state.show = status;
  },
  setCurFilterIds: function({ state, commit }, curFilterIds) {
    state.curFilterIds = curFilterIds;
    commit(MUTATION_TYPE.SET_CURFILTERIDS, curFilterIds);
    storejs.set("curFilterIds", curFilterIds);
  },
  setCurFilterIdsAndSave: function({ state, commit }, curFilterIds) {
    storejs.set("curFilterIds", curFilterIds);
    state.curFilterIds = curFilterIds;
    commit(MUTATION_TYPE.SET_CURFILTERIDS, curFilterIds);
  },
  hideSuspension: function({ state, commit }) {
    let status = false;
    storejs.set("showSuspension", status);
    state.show = status;
  },
  setFields: function({ state, commit }, fields) {
    storejs.set(fileds_key, fields);
    state.fields = fields;
    commit(MUTATION_TYPE.SET_FIELDS, fields);
  },
  setFilters: function({ state, commit }, filters) {
    storejs.set(filters_key, filters);
    state.filters = filters;
    commit(MUTATION_TYPE.SET_FILTERS, filters);
  },
};

const getters = {
  fields: (state) => state.fields,
  filters: (state) => state.filters,
  curFilterIds: (state) => state.curFilterIds,
  wsfilters: (state) => state.wsfilters,
};

export function getFields() {
  return storejs.get(fileds_key) || [];
}
export function getFilters() {
  return storejs.get(filters_key) || {};
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
