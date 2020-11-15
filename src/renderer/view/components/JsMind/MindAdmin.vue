<!-- 思维导图编辑器 -->
<template>
  <div class="app">
    <div id="jsmind_tools" class="jsmind-tools">
      <ul>
        <li
          action="toggle"
          class="icon-cog visible"
          title="click for more function"
        >
          Toggle
        </li>
        <li action="open" class="icon-popup" title="open a mindmap from ...">
          Open
        </li>
        <li
          action="save"
          class="icon-export"
          title="export current mindmap to ..."
        >
          Save
        </li>
        <li
          action="screenshot"
          class="icon-camera"
          title="take a screenshot on current mindmap"
        >
          Screenshot
        </li>
        <li
          action="share"
          class="icon-share"
          title="share current mindmap to ..."
        >
          Share
        </li>
        <li
          action="rebuild"
          class="icon-trash"
          title="clean current mindmap and create new one"
        >
          Rebuild
        </li>
        <li action="help" class="icon-help" title="how to use jsMind ...">
          Usage
        </li>
      </ul>
    </div>
    <js-mind
      :values="mind"
      :options="options"
      ref="jsMind"
      height="1000px"
      width:='100%'
    ></js-mind>
  </div>
</template>

<script>
import JsMind from "./index";
import axios from "axios";

var self;
export default {
  data() {
    return {
      rawDatas: [],
      theme_value: "",
      mind: {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        meta: {
          name: "example",
          author: "906106844@qq.com",
          version: "0.2",
        },
        getTopic(node) {
          let type =
            node.topic.indexOf("%") > 0 ||
            (node.topic.indexOf("率") > 0 && node.topic.indexOf("周转") == -1)
              ? 1
              : 0;
          return `<div><span class="label">${node.topic.replace(
            "(%)",
            ""
          )}</span><span class="value">${
            (rawDatas[0][node.alias] &&
              self &&
              (type ? self.$fmtPercent : self.$fmtNumber)(
                (type ? 100 : 1) * rawDatas[0][node.alias]
              )) ||
            ""
          }</span></div>`;
        },
        /* 数据格式声明 */
        format: "node_array",
        /* 数据内容 */
        data: [],
        options: {
          // mode:'side'
        },
        shortCutVal: "",
        keyCode: "",
      },
    };
  },
  components: { JsMind },
  mounted() {
    self = this;
    axios.get("/api/mind?code=sh600031").then((resp) => {
      window.rawDatas = resp.data;

      axios.get("/static/test.json").then((resp) => {
        this.mind.data = this.mind.data.concat(resp.data);
        this.jm = this.$refs.jsMind.jm;
        //this.jm.enable_edit();
      });
    });
  },
  methods: {
    addNode() {
      var selected_node = this.jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        alert("please select a node first.");
        return;
      }

      var nodeid = jsMind.util.uuid.newid();
      var topic = "new Node";
      var node = this.jm.add_node(selected_node, nodeid, topic);
    },
    onMoveUp() {
      var selected_id = this.jm.get_selected_node();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }
      this.jm.move_node(selected_id, "_first_");
    },
    onMoveDown() {
      var selected_id = this.jm.get_selected_node();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }

      this.jm.move_node(selected_id, "_last_");
    },
    onRemoveNode() {
      var selected_id = this.get_selected_nodeid();
      console.log(selected_id);
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }
      this.jm.remove_node(selected_id);
    },
    addImageNode() {
      var imageChooser = document.getElementById("image-chooser");
      const _this = this;
      imageChooser.addEventListener(
        "change",
        function (event) {
          // Read file here.
          var reader = new FileReader();
          reader.onloadend = function () {
            var selected_node = _this.jm.get_selected_node();
            var nodeid = jsMind.util.uuid.newid();
            var topic = undefined;
            var data = {
              "background-image": reader.result,
              width: "100",
              height: "100",
            };
            var node = _this.jm.add_node(selected_node, nodeid, topic, data);
          };

          var file = imageChooser.files[0];
          if (file) {
            reader.readAsDataURL(file);
          }
        },
        false
      );
      var selected_node = this.jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        alert("please select a node first.");
        return;
      }

      imageChooser.focus();
      imageChooser.click();
    },
    openLocalFile() {
      var file_input = this.$refs.input;
      var files = file_input.files;
      const _this = this;
      if (files.length > 0) {
        var file_data = files[0];
        jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
          var mind = jsMind.util.json.string2json(jsmind_data);
          if (!!mind) {
            _this.mind = mind;
            _this.jm.show(mind);
          } else {
            alert("can not open this file as mindmap");
          }
        });
      } else {
        alert("please choose a file first");
      }
    },
    saveLocalFile() {
      var mind_data = this.jm.get_data();
      var mind_name = mind_data.meta.name;
      var mind_str = jsMind.util.json.json2string(mind_data);
      jsMind.util.file.save(mind_str, "text/jsmind", mind_name + ".jm");
    },
    fontSize() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }
      this.jm.set_node_font_style(selected_id, 28);
    },
    fontColor() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }
      this.jm.set_node_color(selected_id, null, "#000");
    },
    bgColor() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }

      this.jm.set_node_color(selected_id, "#eee", null);
    },
    bgImage() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        alert("please select a node first.");
        return;
      }
      this.jm.set_node_background_image(selected_id, "ant.png", 100, 100);
    },
    set_theme() {
      this.jm.set_theme(this.theme_value);
    },
    zoomOut() {
      if (this.jm.view.zoomOut()) {
        this.$refs.zoomOut.disabled = false;
      } else {
        this.$refs.zoomOut.disabled = true;
      }
    },
    zoomIn() {
      if (this.jm.view.zoomIn()) {
        this.$refs.zoomIn.disabled = false;
      } else {
        this.$refs.zoomIn.disabled = true;
      }
    },
    screenshot() {
      this.jm.screenshot.shootDownload();
    },
    // 获取选中标签的 ID
    get_selected_nodeid() {
      var selected_node = this.jm.get_selected_node();
      if (!!selected_node) {
        return selected_node.id;
      } else {
        return null;
      }
    },
    changeOption() {
      this.options = {
        mode: "side",
      };
    },
    // 只支持绑定单个按键
    shortcutSet(value) {
      if (value.key === "Backspace" || value.key === "Delete") {
        this.shortCutVal = this.shortCutVal.substring(
          0,
          this.shortCutVal.lastIndexOf("+")
        );
        this.keyCode = this.keyCode.substring(0, this.keyCode.lastIndexOf("+"));
        return;
      }
      if (this.shortCutVal) {
        this.shortCutVal += " + ";
        this.keyCode += "+";
      }
      this.shortCutVal += value.key;
      this.keyCode += value.keyCode;
      console.log("keyCode", this.keyCode);
      this.options = {
        shortcut: {
          mapping: {
            // 快捷键映射
            addchild: this.keyCode,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
html,
body,
header {
  margin: 0;
  padding: 0;
}

br.clear {
  font-size: 1px;
  clear: both;
}

/* z-index:100 */
header {
  height: 60px;
  background-color: #eee;
  border-bottom: solid 1px #aaa;
  z-index: 100;
}
header h1 {
  float: left;
  margin: 0 15px;
  color: #444;
  text-shadow: 1px 1px 1px #fff;
  font: bold 32px/60px "Microsoft YaHei", simhei, STHeiTi, sans-serif, Verdana;
}
header nav {
  margin-left: 256px;
}
header nav a {
  float: left;
  color: #333;
  text-decoration: none;
  border: solid 1px gray;
  border-radius: 3px;
  padding: 5px 10px;
  text-shadow: 1px 1px 1px #fff;
  margin: 25px 20px 0 0;
  white-space: nowrap;
  font: normal 14px/1 Verdana, Arial, Helvetica, sans-serif;
}
header nav a.latest {
  float: right;
  border: none;
}
header nav a:hover {
  color: #0a0;
  background-color: #f8f8f8;
}

.jsmind-container {
  clear: both;
}

.jsmind-tools {
  position: absolute;
  z-index: 100;
  top: 70px;
  left: 10px;
  border: solid 1px #fff;
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
  float: left;
  display: none;
  width: 36px;
  height: 36px;
  overflow: hidden;
  font-size: 24px;
  line-height: 36px;
  text-indent: 6px;
  letter-spacing: 6px;
  opacity: 0.4;
  cursor: default;
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

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  overflow: hidden;
  background-color: #f2f2f2;
  border-top: solid 1px #bbb;
}
footer nav {
  font: normal 13px/30px Verdana, Arial, Helvetica, sans-serif;
  margin-left: 10px;
}
footer nav a {
  color: #666;
  text-decoration: none;
}

@media screen and (max-device-width: 1024px) {
  .jsmind-tools li {
    opacity: 1;
  }
}

@media screen and (max-width: 1023px) {
  header {
    height: 36px;
  }
  header h1 {
    margin: 0 4px;
    font-size: 18px;
    line-height: 36px;
  }
  header h1:first-letter {
    line-height: 16px;
  } /* Wingdings v */
  header nav {
    margin-left: 150px;
  }
  header nav a {
    margin-top: 10px;
  }

  .jsmind-tools {
    top: 44px;
    left: 8px;
  }

  footer {
    height: 20px;
  }
  footer nav {
    line-height: 20px;
  }
}
</style>