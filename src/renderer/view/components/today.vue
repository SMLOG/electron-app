<template>
  <div>
    <div v-for="(r,i) in rows" :key="i">
      <span @click="del(i)">-</span>
      <input type="checkbox" v-model="r.checked" />
      <input v-model="r.id" /> :
      <input v-model="r.w" /> x
      <input v-model="r.h" /> =
      <span v-if="r.w&&r.h">{{ee(r.w)*ee(r.h)|fixed2}}</span>平方
    </div>
    <div>
      总价:
      <input v-model="amount" />
      总共:{{total|fixed2}}平方
      平均
      <span v-if="total">{{(amount/total)|fixed2}}</span>每平方
    </div>
    <div>
      <span @click="add()">+</span>
    </div>
  </div>
</template>
<script>
import Dock from "@/view/components/Dock";
export default {
  name: "tody",
  data() {
    return {
      rows: [],
      amount: 0
    };
  },
  computed: {
    total() {
      return this.rows.reduce((t, r) => {
        return r.checked && r.w && r.h ? t + this.ee(r.w) * this.ee(r.h) : t;
      }, 0);
    }
  },
  filters: {
    fixed2: function(d) {
      return d.toFixed(2);
    }
  },
  methods: {
    ee(s) {
      return window.eval(s);
    },
    add() {
      this.rows.push({ w: 0, h: 0, checked: true });
    },
    del(i) {
      this.rows.splice(i, 1);
    }
  },
  components: {
    Dock
  }
};
</script>

<style scoped></style>
