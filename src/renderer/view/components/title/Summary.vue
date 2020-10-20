<template>
  <div @selectstart.stop="selectstart">
    <table>
      <tr>
        <th>日期</th>
        <th>ROE</th>
        净利润
        <th></th>
      </tr>
      <tr v-for="e in arr" :key="e.date">
        <td>{{ e.date }}</td>
        <td>{{ e.jzcsyl }}</td>
        <td>{{ e.jlr }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return { arr: [] };
  },

  props: ["item"],
  methods: {
    selectstart() {
      return true;
    },
    formateItem(item) {
      axios
        .get("/api/summary")
        .then((resp) => resp.data)
        .then((data) => {
          this.arr = data;
        });
    },
  },
  computed: {},
  watch: {
    item(n, o) {
      if (n) {
        this.formateItem(n);
      }
    },
  },
};
</script>

