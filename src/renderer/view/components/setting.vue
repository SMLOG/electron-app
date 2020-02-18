<template>
  <div>
    <div id="setting" ref="settings">
      <span @click="showSetting=!showSetting" title="设置"></span>
      <div id="setting_contents" v-show="showSetting">
        <table border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <a @click="clearTechData">Clear Tech Data</a>
              </td>
            </tr>
          </tbody>
        </table>
        <draggable v-model="cols" @update="dragEnd" tag="ul">
          <li v-for="col in cols" :key="col.prop">
            {{col.label}}
            <input type="checkbox" v-model="col.checked" @change="changeCols" />
          </li>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/localdata";
import { getCheckFields } from "../headers";
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "setting",
  data: function() {
    return {
      showSetting: false,
      cols: getCheckFields(false)
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if (this.$refs.settings) {
        if (this.$refs.settings.contains(e.target)) {
        } else {
          this.showSetting = false;
        }
      }
    });
  },
  components: {
    draggable
  },
  watch: {},

  methods: {
    dragEnd() {
      this.changeCols();
    },
    changeCols() {
      this.setFields(this.cols);
    },
    clearTechData() {
      store.setSetting("tech", +new Date());
      this.showSetting = false;
    },
    ...mapActions(["setFields"])
  }
};
</script>
<style scoped >
a {
  cursor: pointer;
}
#setting span {
  position: fixed;
  right: 5px;
  top: 5px;
  display: inline-block;
  height: 22px;
  width: 22px;
  background: gray;
  border-radius: 11px;
  cursor: pointer;
  z-index: 10000;
}
#setting_contents {
  position: fixed;
  right: 5px;
  top: 30px;
  display: inline-block;
  border-radius: 1px;
  background: #fff;
  z-index: 100000;
  padding: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
</style>