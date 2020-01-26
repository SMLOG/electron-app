<template>
  <div
    id="topFocus"
    :class="{ showAll: showAll }"
    ref="topFocus"
    @mouseover="showAll = true"
    @mouseout="showAll = false"
  >
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td v-for="(item, k) in items" :key="k">
          <div>
            <a
              @click="openlink(item, $event)"
              :class="{ up: item.change > 0, down: item.change < 0 }"
              >{{ item.name }} {{ item.now }}({{ item.change }})</a
            >
          </div>
        </td>
        <td>
          <i
            class="arrow"
            :class="{ left: !showAll, down: showAll }"
            @click="showAll = !showAll"
          ></i>
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
  name: "topFocus",
  data: function() {
    return {
      afilters: afilters,
      showAll: false
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.topFocus.contains(e.target)) {
      } else {
        this.show = false;
      }
    });
  },
  props: {
    items: Array
  },
  methods: {
    selectFilterChain(r, c) {
      this.$emit("filterChainChange", r, c);
      this.showAll = false;
    },
    openlink(item, $event) {
      this.$emit("openlink", item, $event);
    }
  }
};
</script>
<style scoped>
td {
  padding: 3px 7px;
}
table {
  width: auto !important;
}
#topFocus.showAll {
  height: auto;
}
#topFocus {
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
.down {
  color: green;
}
.up {
  color: red;
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
