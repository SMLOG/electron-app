<template>
  <div>
    <div class="fixed">
      <Setting />
      <search-panel></search-panel>
    </div>
    <div>
      <ul id="top">
        <li v-for="(fitem, name) in cats" :key="name">
          <a>{{ name }}({{ fitem.items.length }})</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import SearchPanel from "@/view/components/search-panel";
import Setting from "@/view/components/setting";

export default {
  name: "index",
  data: function() {
    return {
      cats: {
        海选: {
          is_search: true,

          items: [],
        },
        自选: {
          items: [],
        },
      },
    };
  },
  mounted() {},

  directives: {},
  components: {
    SearchPanel,
    Setting,
  },
  filters: {},
  sockets: {
    connect(data) {
      console.log("ws connect");
    },
    disconnect() {
      console.log("ws disconnect");
    },
    reconnect(data) {},
    broadcast(data) {
      //console.log(data);
      // this.$socket.emit("echo", data);
    },
  },

  watch: {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
* {
  font-size: 12px;
}
#top {
  float: left;
  margin: 0;
  padding: 0;
}
#top li {
  float: left;
  list-style: none;
  margin: 3px;
  border: 1px solid #dadce0;
  padding: 3px;
  border-radius: 8px;
}
</style>
