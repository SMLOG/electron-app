<template>
    <div>
      <div style="position:fixed;z-index:4;">
      <div>
        <ul class="nav">
        <li class="navItem" style="margin-left: 0;padding-left: 0" ref="mylist" @mouseover="showMylist=true" @mouseout="showMylist=false">
          <div v-if="info" style="display:inline-block;"  >
          <font-awesome-icon :icon="['fas', 'info-circle']" />
         <span   >{{info.name}}</span>
            <span    :class="{red:info.change>0,green:info.change<0}">
           <span @click="$openlink(info,$event,`/static/tech.html?{{code}}&kd`)">
           {{info.close}}
           </span>
           <span @click='togglePop(info, "FinAnalyst2", "fin");'>({{info.change}}</span>,
           <span @click='$openlink(info,$event,`https://caibaoshuo.com/companies/${info.code.replace(/[a-z]+/g, "")}/financials`)'>{{info.changeP}})</span>
          </span>


          </div>
        <my-min-list :style="{width:showMylist?'auto':'10px'}" @mouseover="showMylist=true" @mouseout="showMyList=false"/>
  
        </li>
        <li class="navItem" v-if="info">
                   <span @mouseover="autoScroll(1,-20)" @mouseout="autoScroll(0,0)">pe_ttm: {{info.pe_ttm}}</span>
         <span @mouseover="autoScroll(1,20)" @mouseout="autoScroll(0,1)">总市值: {{$fmtNumber(info.zsz)}}</span>
        </li>
        <li class="navItem"  v-for="node in mind.data.filter(e=>e.parentid=='root')" :key="node.id">
          <a  @mouseover="viewNode(node)" @mouseout="viewNode(node,true)" @click="toggleNode(node)">{{node.topic}}</a>
          </li>
        <li class="navItem"  style="float:right;">
          <div id="jsmind_tools" class="jsmind-tools">
            <ul  >
                <li v-for="(row,i) in mind.rawDatas[0]" :key="row.reportdate" :class="{cur:i==mind.selectIndex}" @click="mind.selectIndex=i">{{row.reportdate}}</li>
            </ul>
          </div>
        </li>
        </ul>
        </div>
    </div>
    <js-mind style="margin-top: 35px;"
      v-if="mind.data.length>0"
      :values="mind"
      :options="{}"
      ref="jsMind"
      :height="height+'px'"
      width:='100%'
    ></js-mind>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import JsMind from "./index";
import { batchUpdateHQ } from "@/lib/getTable";
import SearchPanel from "@/view/components/search-panel";
import WinView from "@/view/components/WinView";
import WinWrap from "@/view/components/WinWrap";
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import Right from "@/view/components/Right";
import MyMinList from "@/view/components/MyMinList.vue";

var self;
export default {
  data() {
    return {
      curComponent: null,
      showFin: false,
      item: null,
      link: null,
      rightItem: false,
      showType: null,
      showMylist: false,
      selectIndex: 0,
      info: null,
      height: 1000,
      mind: {
        selectIndex: 0,
        rawDatas: [],
        data: [],
      },
    };
  },
  components: {
    JsMind,
    SearchPanel,
    WinView,
    WinWrap,
    FinAnalyst2,
    Right,
    MyMinList,
  },
  mounted() {
    this.getDetail();
  },
  sockets: {
    hx(datas) {
      if (this.info) batchUpdateHQ([this.info], datas);
    },
  },
  computed: {
    ...mapState({ mylist: (state) => state.ws.mylist }),
  },
  watch: {
    $route: {
      handler() {
        this.code = this.$route.query.code;
        this.getDetail();
      },
      deep: true,
    },
  },
  methods: {
    autoScroll(enable, type) {
      clearInterval(this.stimer);
      if (enable) {
        this.stimer = setInterval(() => {
          $(".jsmind-inner")[0].scroll(
            0,
            $(".jsmind-inner")[0].scrollTop + type
          );
        }, 100);
      }
    },

    getDetail() {
      self = this;
      this.$route.query.code = (this.$route.query.code || "").replace(
        /[^\d]+/g,
        ""
      );
      if (
        !this.$route.query.code &&
        !this.$route.query.code.match(/^[036]\d{5}$/)
      ) {
        alert("请输入代码参数或者检查代码参数格式是否正确？");
        return;
      }

      (async () => {
        let mind = this.mind;

        let datas = [];
        mind.rawDatas.length = 0;

        for (let type of ["root", "gz"]) {
          let resp = await this.$http.get("/api/mind", {
            params: {
              type: type,
              code:
                (this.$route.query.code[0] == "6" ? "sh" : "sz") +
                this.$route.query.code,
            },
          });
          mind.rawDatas.push(resp.data.datas);
          if (resp.data.info) this.info = resp.data.info;

          await this.$http.get(`/static/${type}.json`).then((resp) => {
            if (type != "root") {
              let offsetid = datas[datas.length - 1].id;
              let subParentId;
              for (let n of resp.data) {
                if (n.parentid == 0) {
                  n.parentid = "root";
                  subParentId = n.id;
                  n.id = type;
                } else {
                  n.id += offsetid;
                  if (n.parentid == subParentId) n.parentid = type;
                  else n.parentid += offsetid;
                }
                datas.push(n);
                n.sourceId = mind.rawDatas.length - 1;
              }
            } else datas.push(...resp.data);
          });
        }
        mind.selectIndex = 0;
        mind.data.length = 0;
        mind.data.push(...datas);
        setTimeout(() => {
          this.jm = this.$refs.jsMind.jm;
          this.jmObj = this.$refs.jsMind.jmObj;
          $(window).resize(() => {
            this.height = $(window).height() - 35;
            // this.jm.resize();
          });
          this.jm.resize();
        }, 1000);
      })();
    },
    viewNode(node, isLeave) {
      if (!isLeave) {
        node.timer = setTimeout(() => {
          $(".curnode").removeClass("curnode");
          $(this.$el.querySelector(`#node${node.id}`)).addClass("curnode");
          this.$el.querySelector(`#node${node.id}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 400);
      } else {
        window.clearTimeout(node.timer);
      }
    },
  },
};
</script>
<style scoped>
body {
  overflow: hidden;
}
ul.nav {
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  z-index: 3;
  background: #ccc;
  right: 0;
  left: 0;
}
.navItem {
  float: left;
  display: inline-block;
  line-height: 28px;
  font-size: 14px;
  margin: 0 3px;
  padding: 3px;
  background: #ccc;
  cursor: pointer;
}
.jsmind-tools {
  position: fixed;
  top: 20px;
  right: -54px;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.3;
}
.jsmind-tools:hover {
  opacity: 1;
}
.jsmind-tools-active {
  border-color: gray;
  opacity: 1;
}
.jsmind-tools ul {
  float: left;
  margin: 0 3px;
  padding: 0;
  list-style: none;
}
.jsmind-tools li {
  height: 24px;
  overflow: hidden;
  line-height: 24px;
  opacity: 0.4;
  cursor: pointer;
}
.jsmind-tools li.visible {
  display: block;
}
.jsmind-tools li:hover {
  opacity: 1;
}
.jsmind-tools-active li.visible {
  opacity: 1;
}
.jsmind-tools-active li {
  display: block;
}
.jsmind-tools li.cur {
  font-weight: bold;
  opacity: 1;
  color: red;
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
