<template>
  <div id="filterctr" :class="{showAll:showAll}">
    <ul class="filters">
      <li v-for="(k,filter) in afilters" :key="filter">
        <a>{{filter}}</a>
      </li>
    </ul>
    <table>
      <tr v-for="(filters,i) in filtersCount" :key="i">
        <td v-for="(filter,k) in filters" :key="k">
          <div>{{ filter.name }}({{filter[src]}})</div>
        </td>
        <td>
          <i v-if="i==0" class="arrow left" @click="showAll=!showAll"></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { filters, getCheckFilters, afilters } from "@/lib/filters";
import { mapActions, mapGetters } from "vuex";

let keys = Object.keys(filters);

let filterArry = [];
for (let i = 0; i < keys.length; i++) {
  let arr = [];
  for (let k = i; k < keys.length; k++) {
    arr.push(keys[k]);
  }
  filterArry.push(arr);
}

export default {
  name: "filterCtr",
  data: function() {
    return {
      afilters: afilters,

      showAll: false
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.filteritem.contains(e.target)) {
      } else {
        this.show = false;
      }
    });
  },
  props: {
    filter: String,
    filtersCount: Array,
    selected: Boolean,
    items: Array,
    src: String
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
td {
  padding: 3px 7px;
  margin: 3px;
}
table {
  width: auto !important;
}
#filterctr.showAll {
  height: 25px;
  overflow: hidden;
}
#filterctr {
  position: fixed;
  background: white;
  z-index: 10000;
}
.filters {
  list-style: none;
}
ul {
  padding: 3px 7px;
  margin: 3px;
  float: left;
}
ul li {
  float: left;
}
table {
  float: left;
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
