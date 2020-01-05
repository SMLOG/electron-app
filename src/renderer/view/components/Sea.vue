<template>
  <li ref="filteritem" class="filterItem" is="li">
    <slot></slot>
    <i
      class="arrow"
      :class="{ left: !show, down: show }"
      @click="show = !show"
      ref="arrow"
    ></i>
    <div v-show="show" class="items" style="width:700px;">
      <div id="search-criteria">
        <form action="javascript:void(0)" class="ng-pristine ng-valid">
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
                <option v-for="(v, k) in obj.values" :value="k" :key="k">{{
                  v
                }}</option>
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
                <td><input type="checkbox" autocomplete="off" /></td>
                <td>{{ v.label }}</td>
                <td class="number lower">
                  <input type="number" style="width:60px" />
                </td>

                <td class="number upper">
                  <input type="number" style="width:60px" />
                </td>
                <td>{{ v.unit }}</td>
              </tr>
            </tbody>
          </table>

          <div id="operation-bar" class="form-inline">
            <div class="form-group">
              <button class="btn btn-default" ng-click="screen()">选股</button>
            </div>
            <div class="form-group">
              <button
                class="btn btn-default"
                ng-disabled="disableComparison()"
                ng-click="compareStocks()"
                disabled="disabled"
              >
                比较
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </li>
</template>

<script>
import { filters, getCheckFilters } from "@/lib/filters";
import { criteria } from "@/lib/criteria";

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
      criteria: criteria
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
    selected: Boolean
  },
  methods: {
    ...mapActions(["setFilters"]),
    change() {
      this.filters[this.filter] = this.allfilters;
      this.setFilters(Object.assign({}, this.filters));
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
  background: white;
  padding: 10px;
  position: absolute;
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
}
.arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
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
