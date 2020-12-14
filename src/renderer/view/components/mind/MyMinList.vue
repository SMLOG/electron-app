<template>
  <div class="mylist" style="width: auto; top: 30px; bottom: 0; overflow: auto">
    <table>
      <tr>
        <th>名称({{ mylist.length }})</th>
        <th></th>
        <th></th>
        <th>行业</th>
        <th>PE(TTM)</th>
        <th>总市值</th>
        <th></th>
      </tr>
      <tr class="info" v-for="(info, i) in mylist" :key="info.code">
        <td>
          {{ i + 1 }}
          <font-awesome-icon
            :icon="['fas', 'trash']"
            size="xs"
            @click="$socket.emit('removeItem', info)"
          />
          <router-link :to="{ query: { code: info.code } }"
            ><span>{{ info.name }}</span></router-link
          >
        </td>
        <td>
          <span
            @mouseover="rightItem = info"
            @mouseout="rightItem = false"
            :class="{ red: info.change > 0, green: info.change < 0 }"
          >
            <span
              @click="$openlink(info, $event, `/static/tech.html?{{code}}&kd`)"
              >{{ info.close }}</span
            >
            <span @click="$togglePop(info, 'FinAnalyst2', 'fin')"
              >({{ info.change }}</span
            >,
            <span
              @click="
                $openlink(
                  info,
                  $event,
                  `https://caibaoshuo.com/companies/${info.code.replace(
                    /[a-z]+/g,
                    ''
                  )}/financials`
                )
              "
              >{{ info.changeP }})</span
            >
          </span>
        </td>
        <td>
          <font-awesome-icon
            :icon="['fas', 'arrow-circle-down']"
            @click="download(info)"
          />
          <font-awesome-icon
            :icon="['fas', 'info-circle']"
            @click="$togglePop(info, 'ChartIndex', 'fin')"
          />
        </td>
        <td>{{ info.hy }}</td>
        <td>{{ info.pe_ttm }}</td>
        <td>{{ $fmtNumber(info.zsz) }}</td>
        <td>{{ info.mid }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import { batchUpdateHQ } from "@/lib/getTable";

var self;
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({ mylist: (state) => state.ws.mylist }),
  },

  methods: {
    download(info) {
      let src =
        "http://localhost:8080/excel?code=" +
        info.code +
        "&name=" +
        encodeURIComponent(info.name);
      var eleLink = document.createElement("a");
      eleLink.href = src;
      eleLink.download = name;
      eleLink.style.display = "none";
      eleLink.href = src;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    },
  },
};
</script>
<style scoped>
table th {
  position: sticky;
  top: 0;
}
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
</style>
<style >
.tooltip {
  z-index: 10000;
}

.tooltip {
  position: fixed !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
.tooltip-inner {
  background: RED;
  color: white;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
  max-width: 250px;
}

.tooltip-arrow {
  border-color: blue;
}
.info span {
  padding: 0 3px;
}
.red {
  color: red;
}
.green {
  color: green;
}
.mylist {
  padding: 0;
  margin: 0;
  position: fixed;
  background: #ccc;
}
ul.mylist li {
  list-style: none;
  display: block !important;
  float: none !important;
}
</style>

<style scoped src="../../home.css" />
