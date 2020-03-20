<template>
  <div ref="filterctr" style="float:right;">
    <span
      style="
     position: fixed;
    right: 35px;
    top: 5px;
    display: inline-block;
    height: 22px;
    width: 22px;
    background: gray;
    border-radius: 11px;
    cursor: pointer;
    z-index: 10000;
    "
      @click="show=!show"
    >His</span>
    <div id="his" v-show="show">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <th>Date</th>
          <th>Name</th>

          <th>Price</th>
          <th v-for="(filter,i) in keys" :key="i">{{filter}}</th>
        </tr>

        <tr v-for="item in his" :key="item.code">
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.now}}</td>
          <td v-for="(filter,i) in keys" :key="i">{{item['_'+filter]?'Y':''}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { filters } from "@/lib/filters";
import storejs from "storejs";

let keys = Object.keys(filters);

export default {
  name: "His",
  data: function() {
    return {
      keys: keys,
      show: false,
      his: [],
      n: new Date().getDate() % 28
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.filterctr.contains(e.target)) {
      } else {
        this.show = false;
      }
    });
    this.his = storejs.get("his" + this.n) || [];
  },
  props: {
    items: Array
  },
  methods: {},
  computed: {
    ...mapGetters(["filters"])
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
#his.showAll {
  height: auto;
}
tr th {
  background: #ccc;
}
th {
  position: sticky;
  top: 0;
}
#his {
  position: fixed;
  top: 30px;
  right: 0px;
  z-index: 10000;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  margin-left: 10px;
  bottom: 0;
  overflow: auto;
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
  border-bottom: 1px #ccc dashed;
}
</style>
