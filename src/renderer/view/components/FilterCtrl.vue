<template>
  <div
    id="filterctr"
    ref="filterctr"
    :class="{showAll:showAll}"
    @mouseover="showAll=true"
    @mouseout="save();showAll=false"
  >
    <div>
      <div v-if="selectId>-1">
        {{list[selectId]}}
        <span v-if="countMap[list[selectId]]">({{countMap[list[selectId]][src]}})</span>
      </div>
      <ul>
        <li v-for="(id,i) in list" :key="i" class="item">
          <div @click="selectId=i;" :class="{select:selectId==i}" class="it">
            <span>+</span>
            <span>{{id}}</span>
            <span v-if="countMap[id]">({{countMap[id][src]}})</span>
          </div>
          <div v-show="selectId==i" class="sub">
            <ul>
              <li v-for="(filter,k) in filtersCount" :key="k">
                <div>
                  <span>{{ filter.name}}({{filter[src]}})</span>
                  <input
                    type="checkbox"
                    @change="change(i,filter)"
                    v-model="listMap[i][filter.name]"
                    style="float:right"
                  />
                </div>
              </li>
              <li>
                <a @click="del(i)">删除</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <span @click="add">+</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  filters,
  getCheckFilters,
  countMap,
  updateFiltersCount
} from "@/lib/filters";
import { mapActions, mapGetters } from "vuex";
import storejs from "storejs";

export default {
  name: "filterCtr",
  data: function() {
    return {
      showAll: false,
      list: null,
      selectId: -1,
      listMap: null,
      countMap: countMap
    };
  },
  mounted() {
    this.checkMap = {};
    this.list = storejs.get("filter-id-list") || [];
    this.listMap = [];
    for (let i = 0; i < this.list.length; i++) {
      let fs = this.list[i].split("+");
      let map = {};
      this.listMap.push(map);
      for (let j = 0; j < fs.length; j++) {
        map[fs[j]] = true;
      }
    }
    window.addEventListener("click", e => {
      if (this.$refs.filterctr.contains(e.target)) {
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
    src: String,
    r: Number,
    c: Number
  },
  methods: {
    change(i, filter) {
      let names = Object.keys(this.listMap[i])
        .filter(e => this.listMap[i][e])
        .join("+");
      console.log(names);
      this.list[i] = names;
      this.setCurFilterIds(names);
      updateFiltersCount();
    },
    del(i) {
      this.list.splice(i, 1);
      this.listMap.splice(i, 1);
      this.selectId -= 1;
    },
    add() {
      this.selectId = this.list.length;
      this.list.push("");
      this.listMap.push({});
    },
    save() {
      storejs.set(
        "filter-id-list",
        this.list.filter(e => e)
      );
    },
    ...mapActions(["setCurFilterIds", "setCurFilterIdsAndSave"])
  },
  computed: {
    ...mapGetters(["filters"])
  },
  watch: {
    selectId(nv, ov) {
      if (nv > -1) this.setCurFilterIds(this.list[nv]);
    }
  }
};
</script>
<style scoped>
.select {
  font-weight: bold;
}
.sub {
  font-size: 80%;
}
.item {
  display: list-item;
}
td {
  padding: 3px 7px;
}
table {
  width: auto !important;
}
#filterctr.showAll {
  height: auto;
}
#filterctr {
  float: left;
  background: white;
  height: 25px;
  overflow: hidden;
  border: 1px solid #dadce0;
  border-radius: 8px;
  margin-left: 10px;
}
.curCol {
  border-bottom: 1px solid #222;
}
.cur {
  background: #222;
  color: white;
}
.filters {
  list-style: none;
}
ul {
  padding: 3px 7px;
  list-style: none;
}
.item ul {
  margin-left: 10px;
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

td {
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
