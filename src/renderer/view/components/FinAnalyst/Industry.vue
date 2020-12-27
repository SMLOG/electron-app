<template>
  <div>
    <table>
      <tr>
        <th class="sticky" v-for="name in Object.keys(items[0])" :key="name">
          {{ name }}
        </th>
      </tr>
      <tr v-for="it in items" :key="it.code">
        <td v-for="name in Object.keys(items[0])" :key="it.code + name">
          {{ fmt(name, it[name]) }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    item: Object,
    name: String,
  },
  data() {
    return { items: [{ name: "name" }] };
  },

  methods: {
    fmt(name, value) {
      if (name.indexOf("率") > -1) {
        return this.$fmtPercent(value);
      }
      if (name.indexOf("值") > -1) {
        return this.$fmtNumber(value);
      } else return value;
    },
    loadDatas() {
      var url = "/api/industry";
      var data = { code: this.item.code };

      this.$http
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => {
          this.items.length = 0;
          this.items.push(...result);
        });
    },
  },

  mounted() {
    this.loadDatas();
  },
  computed: {},
  watch: {
    item(n, o) {
      if (n) this.loadDatas();
    },
  },
};
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 30px;
}
</style>
<style scoped src="../../table.css" />




