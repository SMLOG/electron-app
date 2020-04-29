<template>
  <div id="filterctr" ref="filterctr">
    <div>
      <div>
        <ul style="margin:0;padding:0;display:flex;justify-content:flex-end">
          <li ref="tree_ctrl" class="id tree_ctrl" @click="showTree=!showTree" title="tree"></li>
          <li class="id" :class="{cur:selectId<0}" @click="showAll">All</li>
          <draggable v-model="list" @update="dragEnd" tag="li">
            <li
              v-for="(id,i) in list"
              :key="i"
              :class="{cur:id==curFilterIds}"
              class="id"
              @click="selId(id)"
            >
              {{id}}
              <span v-if="countMap[id]">({{countMap[id][src]}})</span>
            </li>
          </draggable>
        </ul>
      </div>
      <ul class="tree" v-show="showTree" ref="tree">
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
  countMap,
  updateFiltersCount,
  removeAbandon
} from "@/lib/filters";
import { mapActions, mapGetters } from "vuex";
import storejs from "storejs";
import draggable from "vuedraggable";

export default {
  name: "filterCtr",
  data: function() {
    return {
      list: null,
      selectId: -1,
      listMap: null,
      countMap: countMap,
      showTree: false
    };
  },
  components: {
    draggable
  },
  mounted() {
    this.checkMap = {};
    this.list = (storejs.get("filter-id-list") || []).map(e =>
      removeAbandon(e)
    );
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
      if (
        !this.$refs.tree.contains(e.target) &&
        !this.$refs.tree_ctrl.contains(e.target)
      ) {
        this.showTree = false;
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
    dragEnd(e) {
      e.preventDefault();
      this.save();
    },
    selId(id) {
      this.setCurFilterIds(id);
      this.selectId = this.list.indexOf(id);
    },
    change(i, filter) {
      let names = Object.keys(this.listMap[i])
        .filter(e => this.listMap[i][e])
        .sort()
        .join("+");
      this.list[i] = names;
      this.setCurFilterIds(names);
      this.save();
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
    showAll() {
      this.selectId = -1;
      this.setCurFilterIds(null);
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
    ...mapGetters(["filters", "curFilterIds"])
  },
  watch: {
    selectId(nv, ov) {
      if (nv > -1) this.setCurFilterIds(this.list[nv]);
    }
  }
};
</script>
<style scoped>
.id {
  display: inline-block;
  padding: 3px;
  font-size: 60%;
  padding-left: 8px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  min-width: 15px;
}
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

.tree {
  position: fixed;
  background: white;
  margin: 0;
  border-left: 5px solid black;
}
.tree_ctrl {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGRlZnM+PHN0eWxlPi5pY29uLWNhbnZhcy10cmFuc3BhcmVudCwuaWNvbi12cy1vdXR7ZmlsbDojMjUyNTI2O30uaWNvbi1jYW52YXMtdHJhbnNwYXJlbnR7b3BhY2l0eTowO30uaWNvbi12cy1iZ3tmaWxsOiNjNWM1YzU7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5FbGxpcHNpc19ib2xkXzE2eDwvdGl0bGU+PGcgaWQ9ImNhbnZhcyI+PHBhdGggY2xhc3M9Imljb24tY2FudmFzLXRyYW5zcGFyZW50IiBkPSJNMTYsMFYxNkgwVjBaIi8+PC9nPjxnIGlkPSJvdXRsaW5lIiBzdHlsZT0iZGlzcGxheTogbm9uZTsiPjxwYXRoIGNsYXNzPSJpY29uLXZzLW91dCIgZD0iTTYsNy41QTIuNSwyLjUsMCwxLDEsMy41LDUsMi41LDIuNSwwLDAsMSw2LDcuNVpNOC41LDVBMi41LDIuNSwwLDEsMCwxMSw3LjUsMi41LDIuNSwwLDAsMCw4LjUsNVptNSwwQTIuNSwyLjUsMCwxLDAsMTYsNy41LDIuNSwyLjUsMCwwLDAsMTMuNSw1WiIgc3R5bGU9ImRpc3BsYXk6IG5vbmU7Ii8+PC9nPjxnIGlkPSJpY29uQmciPjxwYXRoIGNsYXNzPSJpY29uLXZzLWJnIiBkPSJNNSw3LjVBMS41LDEuNSwwLDEsMSwzLjUsNiwxLjUsMS41LDAsMCwxLDUsNy41Wk04LjUsNkExLjUsMS41LDAsMSwwLDEwLDcuNSwxLjUsMS41LDAsMCwwLDguNSw2Wm01LDBBMS41LDEuNSwwLDEsMCwxNSw3LjUsMS41LDEuNSwwLDAsMCwxMy41LDZaIi8+PC9nPjwvc3ZnPg==);
}
.cur {
  font-weight: bold;
}
</style>
