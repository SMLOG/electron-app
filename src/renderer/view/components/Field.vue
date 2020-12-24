<template>
  <div>
    <peity :type="'bar'" :data="item[col.prop]"></peity>
    <span>
      {{ $fmtPercent(item["扣非ROE"]) }}
    </span>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  props: {
    col: Object,
    item: Object,
  },

  watch: {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
</style>
