<template>
  <div ref="his" style="float:right;">
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
          <th>#</th>
          <th>Start</th>
          <th>End</th>
          <th>Days</th>
          <th>Name</th>

          <th>Price</th>
          <th>EPrice</th>
          <th>Ben(%)</th>
          <th v-for="(filter,i) in keys" :key="i">{{filter}}</th>
        </tr>

        <tr v-for="(item,i) in his" :key="i">
          <td>{{i+i}}</td>
          <td>{{item.startDate|dt}}</td>
          <td>{{item.endDate|dt}}</td>
          <td>{{item.startDate|dd(item.endDate||new Date())}}</td>
          <td>
            <a @click="showChart(item,$event)">{{item.name}}</a>
          </td>
          <td @click="scrollIntoView(item.code,$event)">{{item.now}}</td>
          <td>{{item.startNow}}</td>
          <td
            :class="{red:item.now-item.startNow>0,green:item.now-item.startNow<0}"
          >{{(item.now-item.startNow).toFixed(2)}}({{((item.now-item.startNow)/item.startNow*100).toFixed(2)}}%)</td>
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
import { tj } from "@/lib/tech-manager";
import moment from "moment";

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
  filters: {
    dt(date) {
      return date ? moment(date).format("MM-DD HH:mm") : "";
    },
    dd(d1, d2) {
      return moment(d2).diff(d1, "days");
    }
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.his.contains(e.target)) {
      } else {
        this.show = false;
        let a = document.querySelector(".align");
        a && a.classList.remove("align");
      }
    });
    this.his = tj();
  },
  props: {
    items: Array
  },
  methods: {
    scrollIntoView(id, event) {
      let el = document.querySelector("#r" + id);
      if (el) {
        el.style.top = event.clientY + "px";
        let a = document.querySelector(".align");
        a && a.classList.remove("align");

        el.classList.add("align");
      }
    },
    showChart(item, event) {
      this.$emit("showChart", item, event);
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
.red {
  color: red;
}
.green {
  color: green;
}
table tr:nth-of-type(even) td {
  background: whitesmoke;
}
table tr:nth-of-type(odd) td {
  background: white;
}
* {
  font-size: 12px;
}
</style>
