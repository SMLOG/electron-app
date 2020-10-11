<template>
  <div>
    <ul>
      <li v-for="e in arr" :key="e[0]">
        <span>{{ e[0] }}</span
        >:<span>{{ e[1] }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return { arr: [] };
  },

  props: ["item"],
  methods: {
    formateItem(item) {
      this.arr.length = 0;
      for (let i in item) {
        if (typeof item[i] != "Object") {
          this.arr.push([i, item[i]]);
        }
      }
      return this.arr;
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

