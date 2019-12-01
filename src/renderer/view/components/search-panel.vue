<template>
  <div>
    <!-- 组件不能写到template的根节点上，即每个组件只有一个根节点，这里的div就是这个template的根节点 -->
    <!--  getindex是自定义事件 -->
    <div class="search-input">
      <!-- $event是实参，表示event对象 -->
      <!--
                输入搜索内容即时搜索，所以有一个keyup事件。
                按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
                按上下键可以选择列表条目
      -->
      <input
        type="text"
        v-model="keyword"
        @keyup="get($event)"
        @keydown.enter="search()"
        @keydown.down="selectDown()"
        @keydown.up.prevent="selectUp()"
        @keydown.esc.prevent="clearInput()"
      />
      <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
      <span class="search-reset" @click="clearInput()">&times;</span>
      <button class="search-btn" @click="search()">搜一下</button>
      <div class="search-select">
        <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
        <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
          <li
            v-for="(value,index) in myData"
            :class="{selectback:index==now}"
            class="search-select-option search-select-list"
            @mouseover="selectHover(index)"
            @click="selectClick(index)"
            :key="value.id"
          >
            <span>{{value.oname}}</span>
            <span>{{value.code}}</span>
            <span>{{value.name}}</span>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// import xxx from someSrc     es6中得到模块的方法。
import { loadScripts, parse, toFixed, toPercent } from "@/lib/utils";
import store from "@/localdata";

export default {
  data: function() {
    return {
      myData: [], //用来接收ajax得到的数据
      keyword: "", //v-model绑定的输入框的value
      now: -1,
      searchIndex: 0,
      logoData: [
        {
          name: "360搜索",
          searchSrc: "https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="
        },
        {
          name: "百度搜索",
          searchSrc:
            "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd="
        },
        {
          name: "搜狗搜索",
          searchSrc: "https://www.sogou.com/web?query="
        }
      ]
    };
  },
  methods: {
    onSuggestionsFetchRequested() {
      let name = "suggestdata_" + +new Date();
      let url = `https://suggest3.sinajs.cn/suggest/type=&key=${this.keyword}&name=${name}`;

      loadScripts([url]).then(() => {
        let items = window[name].split(";");
        //万科A,11,000002,sz000002,万科A,,万科A,99

        let options = items
          .map((eStr, i) => {
            if (!eStr) return null;
            let item = eStr.split(",");
            let code = item[3];
            switch (parseInt(item[1])) {
              case 31:
                code = `hk${item[3]}`;
                break;
              case 33:
                code = `rt_hk${item[0]}`;
                break;

              case 41:
                code = `gb_${item[3].replace(/\./g, "$")}`;
                break;
              case 71:
                code = `fx_s${item[3]}`;
                break;
              default:
                code = item[3];
            }

            return {
              id: i,
              oname: item[0],
              name: item[4],
              countryID: item[1],
              code: code,
              orgCode: item[3]
            };
          })
          .filter(e => e);
        options.unshift({ id: -1, oname: "选项", name: "名称", code: "代码" });

        this.myData = options;
      });
    },
    // &event是实参，表示event对象
    get: function(ev) {
      // 如果按得键是上或者下，就不进行ajax
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        return;
      }
      this.now = 1;
      this.onSuggestionsFetchRequested();
      /* this.$http
        .jsonp(
          "https://sug.so.360.cn/suggest?word=" +
            this.keyword +
            "&encodein=utf-8&encodeout=utf-8"
        )
        .then(function(res) {
          this.myData = res.data.s;
        });*/
    },
    selectDown: function() {
      this.now++;
      //到达最后一个时，再按下就回到第一个
      if (this.now == this.myData.length) {
        this.now = 1;
      }
      // this.keyword = this.myData[this.now];
    },
    selectUp: function() {
      this.now--;
      //同上
      if (this.now == 0) {
        this.now = this.myData.length - 1;
      }
      // this.keyword = this.myData[this.now];
    },
    search: function(selectItem, index) {
      if (index != 0) {
        if (!selectItem && this.myData.length > 1) selectItem = this.myData[1];
        this.$emit("select", selectItem);
      }

      this.myData = [];

      //datas.push({ code: myData[this.searchIndex].code });
      //打开对应的搜索界面
      // window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
    },
    selectHover: function(index) {
      this.now = index;
    },
    selectClick: function(index) {
      //this.keyword = this.myData[index];
      this.search(this.myData[index], index);
    },
    clearInput: function() {
      this.keyword = "";
      this.myData = [];
    },
    getIndex: function(index) {
      this.searchIndex = index;
    }
  }
};
</script>

<style type="text/css">
.search-input {
  height: 25px;
  margin: 0 auto;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  height: 25px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}

.search-btn {
  height: 45px;
  width: 100px;
  border: 1px solid mediumseagreen;
  background-color: mediumseagreen;
  color: white;
  font-size: 16px;
  font-weight: bold;
  float: left;
  display: none;
}

.search-btn {
  cursor: pointer;
}

.search-select {
  position: absolute;
  top: 45px;
  width: 500px;
  box-sizing: border-box;
  z-index: 999;
}

.search-select li {
  border: 1px solid #d4d4d4;
  border-top: none;
  border-bottom: none;
  background-color: #fff;
  width: 100%;
}

.search-select-option {
  box-sizing: border-box;
  padding: 7px 10px;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}

input::-ms-clear {
  display: none;
}

.search-reset {
  width: 21px;
  height: 11px;
  position: absolute;
  display: block;
  line-height: 11px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 10px;
  top: 12px;
}

.search-select-list {
  transition: all 0.5s;
}

.itemfade-enter,
.itemfade-leave-active {
  opacity: 0;
}

.itemfade-leave-active {
  position: absolute;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
.search-select ul {
  margin: 0;
  text-align: left;
  list-style: none;
  padding: 0;
}
.search-select ul li span {
  width: 30%;
  display: inline-block;
}
</style>