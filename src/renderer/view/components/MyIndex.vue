<template>
  <ul style="float:left">
    <li v-for="zi in zsItems" :code="zi.code" :key="zi.code" @click="openlink(zi, $event)">
      {{ zi.name }}
      <em
        :class="{ up: zi.change > 0, down: zi.change < 0 }"
      >{{ zi.close }}({{ zi.changeP }})</em>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import draggable from "vuedraggable";
import { syncZsItems } from "@/lib/getTable";
import { timeout } from "@/lib/utils";

export default {
  name: "myIndex",
  data: function () {
    return {
      zsItems: [
        { code: "sh000001", code2: "1.000001", name: "" },
        { code: "sz399001", code2: "0.399001" },
        { code: "hkHSI", code2: "100.HSI" },
        { code: "gb_$dji", code2: "100.DJIA" },
      ],
    };
  },
  components: {
    draggable,
  },
  mounted() {
    (async () => {
      for (;;) {
        await syncZsItems(this.zsItems);
        console.log(this.zsItems[0].name);

        await timeout(3000);
      }
    })();
  },

  props: {
    openlink: Function,
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style scoped>
.up {
  color: red;
}
.down {
  color: green;
}
li {
  list-style: none;
  margin: 3px;
  border: 1px solid #dadce0;
  padding: 3px;
  border-radius: 8px;
  float: left;
}
ul {
  padding: 0;
  margin: 0;
}
</style>
