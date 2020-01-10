<template>
  <li ref="filteritem" class="filterItem" is="li">
    <div :class="{ selected: selected }">
      <slot></slot>
      <i
        v-if="is_search"
        class="arrow"
        :class="{ left: !show, down: show }"
        @click="show = !show"
        ref="arrow"
      ></i>
    </div>
    <div v-if="is_search" v-show="show" class="items" style="width:700px;">
      <div id="operation-bar" class="form-inline">
        <div class="form-group">
          <button class="btn btn-default" @click="apply">Apply</button>
        </div>
      </div>
      <div id="search-criteria">
        <form
          v-for="(criteria, i) in criterias"
          :key="i"
          action="javascript:void(0)"
          class="ng-pristine ng-valid"
        >
          <div id="basic-search-criteria" class="form-inline">
            <div
              v-for="(obj, type) in criteria.scope"
              class="form-group"
              :key="type"
            >
              <label>{{ obj.label }}</label>
              <select
                class="form-control"
                :data-factor="type"
                :data-operator="obj.op"
              >
                <option v-for="(v, k) in obj.values" :value="k" :key="k">
                  {{ v }}
                </option>
              </select>
            </div>
          </div>

          <table id="search-criterias" class="table table-condensed borderless">
            <thead>
              <tr>
                <th>启用</th>
                <th>条件</th>
                <th>最低</th>
                <th>最高</th>
                <th>单位</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v, k) in criteria.basic"
                :key="k"
                class="first"
                :data-factor="k"
                :data-operator="v.op"
                data-min-value="0"
                data-max-value="100"
                data-step="1"
                data-unit-value="1"
              >
                <td>
                  <input
                    type="checkbox"
                    v-model="v._enable"
                    autocomplete="off"
                    @click="clickCheckBox(v)"
                  />
                </td>
                <td>{{ v.label }}</td>
                <td class="number lower">
                  <input type="number" style="width:60px" v-model="v._value1" />
                </td>

                <td class="number upper">
                  <input type="number" style="width:60px" v-model="v._value2" />
                </td>
                <td>{{ v.unit }}</td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </li>
</template>

<script>
import { filters, getCheckFilters } from "@/lib/filters";
import { getCriterias, saveCriterias } from "@/lib/criteria";

import { mapActions, mapGetters } from "vuex";

import $ from "jquery";
window.jQuery = $;
jQuery = $;
window.$ = window.jQuery;
export default {
  name: "filterItem",
  data: function() {
    return {
      allfilters: getCheckFilters(this.filter),
      show: false,
      criterias: getCriterias()
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.filteritem) {
        if (this.$refs.filteritem.contains(e.target)) {
        } else {
          this.show = false;
        }
      }
    });
  },
  props: {
    filter: String,
    filterCounts: Number,
    selected: Boolean,
    is_search: Boolean
  },
  methods: {
    ...mapActions(["setFilters"]),
    change() {
      this.filters[this.filter] = this.allfilters;
      this.setFilters(Object.assign({}, this.filters));
    },
    apply() {
      console.log(this.criterias);
      saveCriterias(this.criterias);
    },
    clickCheckBox(v) {
      console.log(v);
    }
  },
  computed: {
    ...mapGetters(["filters"])
  }
};
</script>
<style scoped>
#search-criterias {
  width: 100%;
  margin: 10px 0;
}
body,
input,
button,
select,
textarea {
  font: 12px/1.5 Tahoma, "Microsoft Yahei", "Simsun";
  color: #444;
}
.selected {
  background: #222;
  color: white;
}
table {
  empty-cells: show;
  border-collapse: collapse;
}
* {
  word-wrap: break-word;
}
#search-criterias th {
  min-width: 40px;
}
#search-criteria {
  max-height: calc(100vh - 100px);
  overflow: auto;
}
.form-group {
  display: table-cell;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-inline .form-control {
  display: inline-block;
  width: auto;
  vertical-align: middle;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.items {
  margin-top: 10px;
  background: white;
  padding: 10px;
  position: absolute;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.filterItem li {
  display: inline;
}
.items li {
  display: block;
}

li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
}

li.selected {
  border-color: rgba(175, 47, 47, 0.2);
  border-bottom: 1px solid #ccc;
}

i.arrow {
  display: inline-block;
  border-style: solid;
  border-width: 0 0 8px 8px;
  border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
  flex: 0;
  cursor: pointer;
  transition: transform 0.25s ease-in-out, color 0.25s ease-in-out;
  margin-right: 5px;
}
.arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.selected i.arrow {
  border-color: transparent transparent rgba(255, 255, 255, 0.8) transparent;
}
.arrow.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
