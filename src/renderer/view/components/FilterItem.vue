<template>
  <li ref="filteritem" class="filterItem" is="li">
    <a>{{ filter }}({{ filterCounts }})</a>
    <i
      class="arrow"
      :class="{left:!(selected&&show),down:selected&&show}"
      @click="show=!show"
      ref="arrow"
    ></i>
    <ul v-show="selected&&show" class="items">
      <li v-for="f in allfilters" :key="f.name">
        <input type="checkbox" v-model="f.checked" @change="change" />
        {{ f.name }}
      </li>
    </ul>
  </li>
</template>

<script>
import { filters, getCheckFilters } from "@/lib/filters";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "filterItem",
  data: function() {
    return {
      allfilters: getCheckFilters(this.filter),
      show: false
    };
  },
  mounted() {
    window.addEventListener("click", e => {
      if(this.$refs.filteritem){
      if (this.$refs.filteritem.contains(e.target)) {
      } else {
        this.show = false;
      }
      }

    });
  },
  props: {
    filter: String,
    filterCounts: Number,
    selected: Boolean,
    items:Array
  },
  methods: {
    ...mapActions(["setFilters"]),
    change() {
      this.filters[this.filter] = this.allfilters;
      this.setFilters(Object.assign({}, this.filters));
    }
  },
  computed: {
    ...mapGetters(["filters"])
  }
};
</script>
<style scoped>
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

li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
}

li.selected {
  border-color: rgba(175, 47, 47, 0.2);
  border-bottom: 1px solid #ccc;
}

i.arrow {
  display: inline-block;
  border-style: solid;
  border-width: 0 0 8px 8px;
  border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
  flex: 0;
  cursor: pointer;
}
.arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.arrow.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
