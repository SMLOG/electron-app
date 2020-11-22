import $ from "jquery";
import _ from "lodash";
var __name__ = "jsMind";
var __version__ = "0.4.6";
var __author__ = "hizzgdev@163.com";

var _noop = function() {};
var logger =
  typeof console === "undefined"
    ? {
        log: _noop,
        debug: _noop,
        error: _noop,
        warn: _noop,
        info: _noop,
      }
    : console;

var $d = document;
var $w = window;
var $g = function(id) {
  return $d.getElementById(id);
};
var $c = function(tag) {
  return $d.createElement(tag);
};
var $t = function(n, t) {
  if (n.hasChildNodes()) {
    n.firstChild.nodeValue = t;
  } else {
    n.appendChild($d.createTextNode(t));
  }
};

// detect isElement
var $i = function(el) {
  return (
    !!el &&
    typeof el === "object" &&
    el.nodeType === 1 &&
    typeof el.style === "object" &&
    typeof el.ownerDocument === "object"
  );
};
if (typeof String.prototype.startsWith != "function") {
  String.prototype.startsWith = function(p) {
    return this.slice(0, p.length) === p;
  };
}

var DEFAULT_OPTIONS = {
  container: "", // id of the container
  editable: false, // you can change it in your options
  theme: null,
  mode: "full", // full or side
  support_html: true,

  view: {
    engine: "canvas",
    hmargin: 100,
    vmargin: 50,
    line_width: 2,
    line_color: "#555",
  },
  layout: {
    hspace: 30,
    vspace: 20,
    pspace: 13,
  },
  default_event_handle: {
    enable_mousedown_handle: true,
    enable_click_handle: true,
    enable_dblclick_handle: true,
  },
};

// core object
const JM = function(options) {
  this.version = __version__;
  var opts = _.defaultsDeep({}, options, DEFAULT_OPTIONS);

  if (!opts.container) {
    logger.error("the options.container should not be null or empty.");
    return;
  }
  this.options = opts;
  this.inited = false;
  this.mind = null;
  this.event_handles = [];
  this.init();
};

// ============= static object =============================================
JM.direction = { left: -1, center: 0, right: 1 };
JM.event_type = { show: 1, resize: 2, edit: 3, select: 4 };
JM.key = { meta: 1 << 13, ctrl: 1 << 12, alt: 1 << 11, shift: 1 << 10 };

JM.node = function(
  sId,
  iIndex,
  sTopic,
  oData,
  bIsRoot,
  oParent,
  eDirection,
  bExpanded
) {
  if (!sId) {
    logger.error("invalid nodeid");
    return;
  }
  if (typeof iIndex != "number") {
    logger.error("invalid node index");
    return;
  }
  if (typeof bExpanded === "undefined") {
    bExpanded = true;
  }
  this.id = sId;
  this.index = iIndex;
  this.topic = sTopic;
  this.data = oData || {};
  this.isroot = bIsRoot;
  this.parent = oParent;
  this.direction = eDirection;
  this.expanded = !!bExpanded;
  this.children = [];
  this._data = {};
};

JM.node.compare = function(node1, node2) {
  // '-1' is alwary the last
  var r = 0;
  var i1 = node1.index;
  var i2 = node2.index;
  if (i1 >= 0 && i2 >= 0) {
    r = i1 - i2;
  } else if (i1 == -1 && i2 == -1) {
    r = 0;
  } else if (i1 == -1) {
    r = 1;
  } else if (i2 == -1) {
    r = -1;
  } else {
    r = 0;
  }
  //logger.debug(i1+' <> '+i2+'  =  '+r);
  return r;
};

JM.node.inherited = function(pnode, node) {
  if (!!pnode && !!node) {
    if (pnode.id === node.id) {
      return true;
    }
    if (pnode.isroot) {
      return true;
    }
    var pid = pnode.id;
    var p = node;
    while (!p.isroot) {
      p = p.parent;
      if (p.id === pid) {
        return true;
      }
    }
  }
  return false;
};

JM.node.prototype = {
  get_location: function() {
    var vd = this._data.view;
    return {
      x: vd.abs_x,
      y: vd.abs_y,
    };
  },
  get_size: function() {
    var vd = this._data.view;
    return {
      w: vd.width,
      h: vd.height,
    };
  },
};

JM.mind = function() {
  this.name = null;
  this.author = null;
  this.version = null;
  this.root = null;
  this.selected = null;
  this.nodes = {};
};

JM.mind.prototype = {
  get_node: function(nodeid) {
    if (nodeid in this.nodes) {
      return this.nodes[nodeid];
    } else {
      logger.warn("the node[id=" + nodeid + "] can not be found");
      return null;
    }
  },

  set_root: function(nodeid, topic, data) {
    if (this.root == null) {
      this.root = new JM.node(nodeid, 0, topic, data, true);
      this._put_node(this.root);
    } else {
      logger.error("root node is already exist");
    }
  },

  add_node: function(
    parent_node,
    nodeid,
    topic,
    data,
    idx,
    direction,
    expanded
  ) {
    if (!JM.util.is_node(parent_node)) {
      var the_parent_node = this.get_node(parent_node);
      if (!the_parent_node) {
        logger.error(
          "the parent_node[id=" + parent_node + "] can not be found."
        );
        return null;
      } else {
        return this.add_node(
          the_parent_node,
          nodeid,
          topic,
          data,
          idx,
          direction,
          expanded
        );
      }
    }
    var nodeindex = idx || -1;
    var node = null;
    if (parent_node.isroot) {
      var d = JM.direction.right;
      if (isNaN(direction)) {
        var children = parent_node.children;
        var children_len = children.length;
        var r = 0;
        for (var i = 0; i < children_len; i++) {
          if (children[i].direction === JM.direction.left) {
            r--;
          } else {
            r++;
          }
        }
        d = children_len > 1 && r > 0 ? JM.direction.left : JM.direction.right;
      } else {
        d =
          direction != JM.direction.left
            ? JM.direction.right
            : JM.direction.left;
      }
      node = new JM.node(
        nodeid,
        nodeindex,
        topic,
        data,
        false,
        parent_node,
        d,
        expanded
      );
    } else {
      node = new JM.node(
        nodeid,
        nodeindex,
        topic,
        data,
        false,
        parent_node,
        parent_node.direction,
        expanded
      );
    }
    if (this._put_node(node)) {
      parent_node.children.push(node);
      this._reindex(parent_node);
    } else {
      logger.error(
        "fail, the nodeid '" + node.id + "' has been already exist."
      );
      node = null;
    }
    return node;
  },

  insert_node_before: function(node_before, nodeid, topic, data) {
    if (!JM.util.is_node(node_before)) {
      var the_node_before = this.get_node(node_before);
      if (!the_node_before) {
        logger.error(
          "the node_before[id=" + node_before + "] can not be found."
        );
        return null;
      } else {
        return this.insert_node_before(the_node_before, nodeid, topic, data);
      }
    }
    var node_index = node_before.index - 0.5;
    return this.add_node(node_before.parent, nodeid, topic, data, node_index);
  },

  get_node_before: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return null;
      } else {
        return this.get_node_before(the_node);
      }
    }
    if (node.isroot) {
      return null;
    }
    var idx = node.index - 2;
    if (idx >= 0) {
      return node.parent.children[idx];
    } else {
      return null;
    }
  },

  insert_node_after: function(node_after, nodeid, topic, data) {
    if (!JM.util.is_node(node_after)) {
      var the_node_after = this.get_node(node_before);
      if (!the_node_after) {
        logger.error("the node_after[id=" + node_after + "] can not be found.");
        return null;
      } else {
        return this.insert_node_after(the_node_after, nodeid, topic, data);
      }
    }
    var node_index = node_after.index + 0.5;
    return this.add_node(node_after.parent, nodeid, topic, data, node_index);
  },

  get_node_after: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return null;
      } else {
        return this.get_node_after(the_node);
      }
    }
    if (node.isroot) {
      return null;
    }
    var idx = node.index;
    var brothers = node.parent.children;
    if (brothers.length >= idx) {
      return node.parent.children[idx];
    } else {
      return null;
    }
  },

  move_node: function(node, beforeid, parentid, direction) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return null;
      } else {
        return this.move_node(the_node, beforeid, parentid, direction);
      }
    }
    if (!parentid) {
      parentid = node.parent.id;
    }
    return this._move_node(node, beforeid, parentid, direction);
  },

  _flow_node_direction: function(node, direction) {
    if (typeof direction === "undefined") {
      direction = node.direction;
    } else {
      node.direction = direction;
    }
    var len = node.children.length;
    while (len--) {
      this._flow_node_direction(node.children[len], direction);
    }
  },

  _move_node_internal: function(node, beforeid) {
    if (!!node && !!beforeid) {
      if (beforeid == "_last_") {
        node.index = -1;
        this._reindex(node.parent);
      } else if (beforeid == "_first_") {
        node.index = 0;
        this._reindex(node.parent);
      } else {
        var node_before = !!beforeid ? this.get_node(beforeid) : null;
        if (
          node_before != null &&
          node_before.parent != null &&
          node_before.parent.id == node.parent.id
        ) {
          node.index = node_before.index - 0.5;
          this._reindex(node.parent);
        }
      }
    }
    return node;
  },

  _move_node: function(node, beforeid, parentid, direction) {
    if (!!node && !!parentid) {
      if (node.parent.id != parentid) {
        // remove from parent's children
        var sibling = node.parent.children;
        var si = sibling.length;
        while (si--) {
          if (sibling[si].id == node.id) {
            sibling.splice(si, 1);
            break;
          }
        }
        node.parent = this.get_node(parentid);
        node.parent.children.push(node);
      }

      if (node.parent.isroot) {
        if (direction == JM.direction.left) {
          node.direction = direction;
        } else {
          node.direction = JM.direction.right;
        }
      } else {
        node.direction = node.parent.direction;
      }
      this._move_node_internal(node, beforeid);
      this._flow_node_direction(node);
    }
    return node;
  },

  remove_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return false;
      } else {
        return this.remove_node(the_node);
      }
    }
    if (!node) {
      logger.error("fail, the node can not be found");
      return false;
    }
    if (node.isroot) {
      logger.error("fail, can not remove root node");
      return false;
    }
    if (this.selected != null && this.selected.id == node.id) {
      this.selected = null;
    }
    // clean all subordinate nodes
    var children = node.children;
    var ci = children.length;
    while (ci--) {
      this.remove_node(children[ci]);
    }
    // clean all children
    children.length = 0;
    // remove from parent's children
    var sibling = node.parent.children;
    var si = sibling.length;
    while (si--) {
      if (sibling[si].id == node.id) {
        sibling.splice(si, 1);
        break;
      }
    }
    // remove from global nodes
    delete this.nodes[node.id];
    // clean all properties
    for (var k in node) {
      delete node[k];
    }
    // remove it's self
    node = null;
    //delete node;
    return true;
  },

  _put_node: function(node) {
    if (node.id in this.nodes) {
      logger.warn("the nodeid '" + node.id + "' has been already exist.");
      return false;
    } else {
      this.nodes[node.id] = node;
      return true;
    }
  },

  _reindex: function(node) {
    if (node instanceof JM.node) {
      node.children.sort(JM.node.compare);
      for (var i = 0; i < node.children.length; i++) {
        node.children[i].index = i + 1;
      }
    }
  },
};

JM.format = {
  node_array: {
    example: {
      meta: {
        name: __name__,
        author: __author__,
        version: __version__,
      },
      format: "node_array",
      data: [{ id: "root", topic: "jsMind Example" }],
    },

    get_mind: function(source) {
      var df = JM.format.node_array;
      var mind = new JM.mind();
      df._parse(mind, source.data);
      return mind;
    },

    get_data: function(mind) {
      var df = JM.format.node_array;
      var json = {};
      json.meta = {
        name: mind.name,
        author: mind.author,
        version: mind.version,
      };
      json.format = "node_array";
      json.data = [];
      df._array(mind, json.data);
      return json;
    },

    _parse: function(mind, node_array) {
      var df = JM.format.node_array;
      var narray = node_array.slice(0);
      // reverse array for improving looping performance
      narray.reverse();
      var root_id = df._extract_root(mind, narray);
      if (!!root_id) {
        df._extract_subnode(mind, root_id, narray);
      }
    },

    _extract_root: function(mind, node_array) {
      var df = JM.format.node_array;
      var i = node_array.length;

      var root_json = node_array[i - 1];
      var data = root_json;
      mind.set_root(root_json.id, root_json.topic, data);
      node_array.splice(i - 1, 1);
      return root_json.id;
    },

    _extract_subnode: function(mind, parentid, node_array) {
      var df = JM.format.node_array;
      var i = node_array.length;
      var node_json = null;
      var data = null;
      var extract_count = 0;
      while (i--) {
        node_json = node_array[i];
        if (node_json.parentid == parentid) {
          data = node_json;
          var d = null;
          var node_direction = node_json.direction;
          if (!!node_direction) {
            d =
              node_direction == "left" ? JM.direction.left : JM.direction.right;
          }
          mind.add_node(
            parentid,
            node_json.id,
            (mind.getTopic && mind.getTopic(node_json)) || node_json.topic,
            data,
            null,
            d,
            node_json.expanded
          );
          node_array.splice(i, 1);
          extract_count++;
          var sub_extract_count = df._extract_subnode(
            mind,
            node_json.id,
            node_array
          );
          if (sub_extract_count > 0) {
            // reset loop index after extract subordinate node
            i = node_array.length;
            extract_count += sub_extract_count;
          }
        }
      }
      return extract_count;
    },

    _array: function(mind, node_array) {
      var df = JM.format.node_array;
      df._array_node(mind.root, node_array);
    },

    _array_node: function(node, node_array) {
      var df = JM.format.node_array;
      if (!(node instanceof JM.node)) {
        return;
      }
      var o = {
        id: node.id,
        topic: node.topic,
        expanded: node.expanded,
      };
      if (!!node.parent) {
        o.parentid = node.parent.id;
      }
      if (node.isroot) {
        o.isroot = true;
      }
      if (!!node.parent && node.parent.isroot) {
        o.direction = node.direction == JM.direction.left ? "left" : "right";
      }
      if (node.data != null) {
        var node_data = node.data;
        for (var k in node_data) {
          o[k] = node_data[k];
        }
      }
      node_array.push(o);
      var ci = node.children.length;
      for (var i = 0; i < ci; i++) {
        df._array_node(node.children[i], node_array);
      }
    },
  },
};

// ============= utility object =============================================

JM.util = {
  is_node: function(node) {
    return !!node && node instanceof JM.node;
  },

  dom: {
    add_event: function(t, e, h) {
      if (!!t.addEventListener) {
        t.addEventListener(e, h, false);
      } else {
        t.attachEvent("on" + e, h);
      }
    },
  },

  uuid: {
    newid: function() {
      return (
        new Date().getTime().toString(16) +
        Math.random()
          .toString(16)
          .substr(2)
      ).substr(2, 16);
    },
  },
};

JM.prototype = {
  init: function() {
    if (this.inited) {
      return;
    }
    this.inited = true;

    var opts = this.options;
    this.data = new JM.data_provider(this);
    this.layout = new JM.layout_provider(this, opts.layout);
    this.view = new JM.view_provider(this, opts);

    this.data.init();
    this.layout.init();
    this.view.init();

    this._event_bind();
  },

  enable_edit: function() {
    this.options.editable = true;
  },

  disable_edit: function() {
    this.options.editable = false;
  },

  // call enable_event_handle('dblclick')
  // options are 'mousedown', 'click', 'dblclick'
  enable_event_handle: function(event_handle) {
    this.options.default_event_handle[
      "enable_" + event_handle + "_handle"
    ] = true;
  },

  // call disable_event_handle('dblclick')
  // options are 'mousedown', 'click', 'dblclick'
  disable_event_handle: function(event_handle) {
    this.options.default_event_handle[
      "enable_" + event_handle + "_handle"
    ] = false;
  },

  get_editable: function() {
    return this.options.editable;
  },

  set_theme: function(theme) {
    var theme_old = this.options.theme;
    this.options.theme = !!theme ? theme : null;
    if (theme_old != this.options.theme) {
      this.view.reset_theme();
      this.view.reset_custom_style();
    }
  },
  _event_bind: function() {
    this.view.add_event(this, "mousedown", this.mousedown_handle);
    this.view.add_event(this, "click", this.click_handle);
    this.view.add_event(this, "dblclick", this.dblclick_handle);
  },

  mousedown_handle: function(e) {
    if (!this.options.default_event_handle["enable_mousedown_handle"]) {
      return;
    }
    var element = e.target || event.srcElement;
    var nodeid = this.view.get_binded_nodeid(element);
    if (!!nodeid) {
      if ($(element).hasClass("jmnode")) {
        this.select_node(nodeid);
      }
    } else {
      this.select_clear();
    }
  },

  click_handle: function(e) {
    if (!this.options.default_event_handle["enable_click_handle"]) {
      return;
    }
    var element = e.target || event.srcElement;
    var isexpander = this.view.is_expander(element);
    if (isexpander) {
      var nodeid = this.view.get_binded_nodeid(element);
      if (!!nodeid) {
        this.toggle_node(nodeid);
      }
    }
  },

  dblclick_handle: function(e) {
    if (!this.options.default_event_handle["enable_dblclick_handle"]) {
      return;
    }
    if (this.get_editable()) {
      var element = e.target || event.srcElement;
      var nodeid = this.view.get_binded_nodeid(element);
      if (!!nodeid) {
        this.begin_edit(nodeid);
      }
    }
  },

  begin_edit: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return false;
      } else {
        return this.begin_edit(the_node);
      }
    }
    if (this.get_editable()) {
      this.view.edit_node_begin(node);
    } else {
      logger.error("fail, this mind map is not editable.");
      return;
    }
  },

  end_edit: function() {
    this.view.edit_node_end();
  },

  toggle_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.toggle_node(the_node);
      }
    }
    if (node.isroot) {
      return;
    }
    this.view.save_location(node);
    this.layout.toggle_node(node);
    this.view.relayout();
    this.view.restore_location(node);
  },

  expand_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.expand_node(the_node);
      }
    }
    if (node.isroot) {
      return;
    }
    this.view.save_location(node);
    this.layout.expand_node(node);
    this.view.relayout();
    this.view.restore_location(node);
  },

  collapse_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.collapse_node(the_node);
      }
    }
    if (node.isroot) {
      return;
    }
    this.view.save_location(node);
    this.layout.collapse_node(node);
    this.view.relayout();
    this.view.restore_location(node);
  },

  expand_all: function() {
    this.layout.expand_all();
    this.view.relayout();
  },

  collapse_all: function() {
    this.layout.collapse_all();
    this.view.relayout();
  },

  expand_to_depth: function(depth) {
    this.layout.expand_to_depth(depth);
    this.view.relayout();
  },

  _reset: function() {
    this.view.reset();
    this.layout.reset();
    this.data.reset();
  },

  _show: function(mind) {
    var m = mind || JM.format.node_array.example;

    this.mind = this.data.load(m);
    if (!this.mind) {
      logger.error("data.load error");
      return;
    } else {
      logger.debug("data.load ok");
    }

    this.view.load();
    logger.debug("view.load ok");

    this.layout.layout();
    logger.debug("layout.layout ok");

    this.view.show(true);
    logger.debug("view.show ok");

    this.invoke_event_handle(JM.event_type.show, { data: [mind] });
  },

  show: function(mind) {
    this._reset();
    this._show(mind);
  },

  get_meta: function() {
    return {
      name: this.mind.name,
      author: this.mind.author,
      version: this.mind.version,
    };
  },

  get_data: function(data_format) {
    var df = data_format || "node_tree";
    return this.data.get_data(df);
  },

  get_root: function() {
    return this.mind.root;
  },

  get_node: function(nodeid) {
    return this.mind.get_node(nodeid);
  },

  add_node: function(parent_node, nodeid, topic, data) {
    if (this.get_editable()) {
      var node = this.mind.add_node(parent_node, nodeid, topic, data);
      if (!!node) {
        this.view.add_node(node);
        this.layout.layout();
        this.view.show(false);
        this.view.reset_node_custom_style(node);
        this.expand_node(parent_node);
        this.invoke_event_handle(JM.event_type.edit, {
          evt: "add_node",
          data: [parent_node.id, nodeid, topic, data],
          node: nodeid,
        });
      }
      return node;
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  insert_node_before: function(node_before, nodeid, topic, data) {
    if (this.get_editable()) {
      var beforeid = JM.util.is_node(node_before)
        ? node_before.id
        : node_before;
      var node = this.mind.insert_node_before(node_before, nodeid, topic, data);
      if (!!node) {
        this.view.add_node(node);
        this.layout.layout();
        this.view.show(false);
        this.invoke_event_handle(JM.event_type.edit, {
          evt: "insert_node_before",
          data: [beforeid, nodeid, topic, data],
          node: nodeid,
        });
      }
      return node;
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  insert_node_after: function(node_after, nodeid, topic, data) {
    if (this.get_editable()) {
      var afterid = JM.util.is_node(node_after) ? node_after.id : node_after;
      var node = this.mind.insert_node_after(node_after, nodeid, topic, data);
      if (!!node) {
        this.view.add_node(node);
        this.layout.layout();
        this.view.show(false);
        this.invoke_event_handle(JM.event_type.edit, {
          evt: "insert_node_after",
          data: [afterid, nodeid, topic, data],
          node: nodeid,
        });
      }
      return node;
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  remove_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return false;
      } else {
        return this.remove_node(the_node);
      }
    }
    if (this.get_editable()) {
      if (node.isroot) {
        logger.error("fail, can not remove root node");
        return false;
      }
      var nodeid = node.id;
      var parentid = node.parent.id;
      var parent_node = this.get_node(parentid);
      this.view.save_location(parent_node);
      this.view.remove_node(node);
      this.mind.remove_node(node);
      this.layout.layout();
      this.view.show(false);
      this.view.restore_location(parent_node);
      this.invoke_event_handle(JM.event_type.edit, {
        evt: "remove_node",
        data: [nodeid],
        node: parentid,
      });
      return true;
    } else {
      logger.error("fail, this mind map is not editable");
      return false;
    }
  },

  update_node: function(nodeid, topic) {
    if (this.get_editable()) {
      if (JM.util.text.is_empty(topic)) {
        logger.warn("fail, topic can not be empty");
        return;
      }
      var node = this.get_node(nodeid);
      if (!!node) {
        if (node.topic === topic) {
          logger.info("nothing changed");
          this.view.update_node(node);
          return;
        }
        node.topic = topic;
        this.view.update_node(node);
        this.layout.layout();
        this.view.show(false);
        this.invoke_event_handle(JM.event_type.edit, {
          evt: "update_node",
          data: [nodeid, topic],
          node: nodeid,
        });
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return;
    }
  },

  move_node: function(nodeid, beforeid, parentid, direction) {
    if (this.get_editable()) {
      var node = this.mind.move_node(nodeid, beforeid, parentid, direction);
      if (!!node) {
        this.view.update_node(node);
        this.layout.layout();
        this.view.show(false);
        this.invoke_event_handle(JM.event_type.edit, {
          evt: "move_node",
          data: [nodeid, beforeid, parentid, direction],
          node: nodeid,
        });
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return;
    }
  },

  select_node: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.select_node(the_node);
      }
    }
    if (!this.layout.is_visible(node)) {
      return;
    }
    this.mind.selected = node;
    this.view.select_node(node);
  },

  get_selected_node: function() {
    if (!!this.mind) {
      return this.mind.selected;
    } else {
      return null;
    }
  },

  select_clear: function() {
    if (!!this.mind) {
      this.mind.selected = null;
      this.view.select_clear();
    }
  },

  is_node_visible: function(node) {
    return this.layout.is_visible(node);
  },

  find_node_before: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.find_node_before(the_node);
      }
    }
    if (node.isroot) {
      return null;
    }
    var n = null;
    if (node.parent.isroot) {
      var c = node.parent.children;
      var prev = null;
      var ni = null;
      for (var i = 0; i < c.length; i++) {
        ni = c[i];
        if (node.direction === ni.direction) {
          if (node.id === ni.id) {
            n = prev;
          }
          prev = ni;
        }
      }
    } else {
      n = this.mind.get_node_before(node);
    }
    return n;
  },

  find_node_after: function(node) {
    if (!JM.util.is_node(node)) {
      var the_node = this.get_node(node);
      if (!the_node) {
        logger.error("the node[id=" + node + "] can not be found.");
        return;
      } else {
        return this.find_node_after(the_node);
      }
    }
    if (node.isroot) {
      return null;
    }
    var n = null;
    if (node.parent.isroot) {
      var c = node.parent.children;
      var getthis = false;
      var ni = null;
      for (var i = 0; i < c.length; i++) {
        ni = c[i];
        if (node.direction === ni.direction) {
          if (getthis) {
            n = ni;
            break;
          }
          if (node.id === ni.id) {
            getthis = true;
          }
        }
      }
    } else {
      n = this.mind.get_node_after(node);
    }
    return n;
  },

  set_node_color: function(nodeid, bgcolor, fgcolor) {
    if (this.get_editable()) {
      var node = this.mind.get_node(nodeid);
      if (!!node) {
        if (!!bgcolor) {
          node.data["background-color"] = bgcolor;
        }
        if (!!fgcolor) {
          node.data["foreground-color"] = fgcolor;
        }
        this.view.reset_node_custom_style(node);
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  set_node_font_style: function(nodeid, size, weight, style) {
    if (this.get_editable()) {
      var node = this.mind.get_node(nodeid);
      if (!!node) {
        if (!!size) {
          node.data["font-size"] = size;
        }
        if (!!weight) {
          node.data["font-weight"] = weight;
        }
        if (!!style) {
          node.data["font-style"] = style;
        }
        this.view.reset_node_custom_style(node);
        this.view.update_node(node);
        this.layout.layout();
        this.view.show(false);
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  set_node_background_image: function(nodeid, image, width, height, rotation) {
    if (this.get_editable()) {
      var node = this.mind.get_node(nodeid);
      if (!!node) {
        if (!!image) {
          node.data["background-image"] = image;
        }
        if (!!width) {
          node.data["width"] = width;
        }
        if (!!height) {
          node.data["height"] = height;
        }
        if (!!rotation) {
          node.data["background-rotation"] = rotation;
        }
        this.view.reset_node_custom_style(node);
        this.view.update_node(node);
        this.layout.layout();
        this.view.show(false);
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  set_node_background_rotation: function(nodeid, rotation) {
    if (this.get_editable()) {
      var node = this.mind.get_node(nodeid);
      if (!!node) {
        if (!node.data["background-image"]) {
          logger.error(
            "fail, only can change rotation angle of node with background image"
          );
          return null;
        }
        node.data["background-rotation"] = rotation;
        this.view.reset_node_custom_style(node);
        this.view.update_node(node);
        this.layout.layout();
        this.view.show(false);
      }
    } else {
      logger.error("fail, this mind map is not editable");
      return null;
    }
  },

  resize: function() {
    this.view.resize();
  },

  // callback(type ,data)
  add_event_listener: function(callback) {
    if (typeof callback === "function") {
      this.event_handles.push(callback);
    }
  },

  invoke_event_handle: function(type, data) {
    var j = this;
    $w.setTimeout(function() {
      j._invoke_event_handle(type, data);
    }, 0);
  },

  _invoke_event_handle: function(type, data) {
    var l = this.event_handles.length;
    for (var i = 0; i < l; i++) {
      this.event_handles[i](type, data);
    }
  },
};

// ============= data provider =============================================

JM.data_provider = function(jm) {
  this.jm = jm;
};

JM.data_provider.prototype = {
  init: function() {
    logger.debug("data.init");
  },

  reset: function() {
    logger.debug("data.reset");
  },

  load: function(mind_data) {
    var mind = null;

    mind = JM.format.node_array.get_mind(mind_data);

    return mind;
  },

  get_data: function(data_format) {
    var data = null;
    if (data_format == "node_array") {
      data = JM.format.node_array.get_data(this.jm.mind);
    } else {
      logger.error("unsupported " + data_format + " format");
    }
    return data;
  },
};

// ============= layout provider ===========================================

JM.layout_provider = function(jm, options) {
  this.opts = options;
  this.jm = jm;
  this.isside = this.opts.mode == "side";
  this.bounds = null;

  this.cache_valid = false;
};

JM.layout_provider.prototype = {
  init: function() {
    logger.debug("layout.init");
  },
  reset: function() {
    logger.debug("layout.reset");
    this.bounds = { n: 0, s: 0, w: 0, e: 0 };
  },
  layout: function() {
    logger.debug("layout.layout");
    this.layout_direction();
    this.layout_offset();
  },

  layout_direction: function() {
    this._layout_direction_root();
  },

  _layout_direction_root: function() {
    var node = this.jm.mind.root;
    // logger.debug(node);
    var layout_data = null;
    if ("layout" in node._data) {
      layout_data = node._data.layout;
    } else {
      layout_data = {};
      node._data.layout = layout_data;
    }
    var children = node.children;
    var children_count = children.length;
    layout_data.direction = JM.direction.center;
    layout_data.side_index = 0;
    if (this.isside) {
      var i = children_count;
      while (i--) {
        this._layout_direction_side(children[i], JM.direction.right, i);
      }
    } else {
      var i = children_count;
      var subnode = null;
      while (i--) {
        subnode = children[i];
        if (subnode.direction == JM.direction.left) {
          this._layout_direction_side(subnode, JM.direction.left, i);
        } else {
          this._layout_direction_side(subnode, JM.direction.right, i);
        }
      }
    }
  },

  _layout_direction_side: function(node, direction, side_index) {
    var layout_data = null;
    if ("layout" in node._data) {
      layout_data = node._data.layout;
    } else {
      layout_data = {};
      node._data.layout = layout_data;
    }
    var children = node.children;
    var children_count = children.length;

    layout_data.direction = direction;
    layout_data.side_index = side_index;
    var i = children_count;
    while (i--) {
      this._layout_direction_side(children[i], direction, i);
    }
  },

  layout_offset: function() {
    var node = this.jm.mind.root;
    var layout_data = node._data.layout;
    layout_data.offset_x = 0;
    layout_data.offset_y = 0;
    layout_data.outer_height = 0;
    var children = node.children;
    var i = children.length;
    var left_nodes = [];
    var right_nodes = [];
    var subnode = null;
    while (i--) {
      subnode = children[i];
      if (subnode._data.layout.direction == JM.direction.right) {
        right_nodes.unshift(subnode);
      } else {
        left_nodes.unshift(subnode);
      }
    }
    layout_data.left_nodes = left_nodes;
    layout_data.right_nodes = right_nodes;
    layout_data.outer_height_left = this._layout_offset_subnodes(left_nodes);
    layout_data.outer_height_right = this._layout_offset_subnodes(right_nodes);
    this.bounds.e = node._data.view.width / 2;
    this.bounds.w = 0 - this.bounds.e;
    //logger.debug(this.bounds.w);
    this.bounds.n = 0;
    this.bounds.s = Math.max(
      layout_data.outer_height_left,
      layout_data.outer_height_right
    );
  },

  // layout both the x and y axis
  _layout_offset_subnodes: function(nodes) {
    var total_height = 0;
    var nodes_count = nodes.length;
    var i = nodes_count;
    var node = null;
    var node_outer_height = 0;
    var layout_data = null;
    var base_y = 0;
    var pd = null; // parent._data
    while (i--) {
      node = nodes[i];
      layout_data = node._data.layout;
      if (pd == null) {
        pd = node.parent._data;
      }

      node_outer_height = this._layout_offset_subnodes(node.children);
      if (!node.expanded) {
        node_outer_height = 0;
        this.set_visible(node.children, false);
      }
      node_outer_height = Math.max(node._data.view.height, node_outer_height);

      layout_data.outer_height = node_outer_height;
      layout_data.offset_y = base_y - node_outer_height / 2;
      layout_data.offset_x =
        this.opts.hspace * layout_data.direction +
        (pd.view.width * (pd.layout.direction + layout_data.direction)) / 2;
      if (!node.parent.isroot) {
        layout_data.offset_x += this.opts.pspace * layout_data.direction;
      }

      base_y = base_y - node_outer_height - this.opts.vspace;
      total_height += node_outer_height;
    }
    if (nodes_count > 1) {
      total_height += this.opts.vspace * (nodes_count - 1);
    }
    i = nodes_count;
    var middle_height = total_height / 2;
    while (i--) {
      node = nodes[i];
      node._data.layout.offset_y += middle_height;
    }
    return total_height;
  },

  // layout the y axis only, for collapse/expand a node
  _layout_offset_subnodes_height: function(nodes) {
    var total_height = 0;
    var nodes_count = nodes.length;
    var i = nodes_count;
    var node = null;
    var node_outer_height = 0;
    var layout_data = null;
    var base_y = 0;
    var pd = null; // parent._data
    while (i--) {
      node = nodes[i];
      layout_data = node._data.layout;
      if (pd == null) {
        pd = node.parent._data;
      }

      node_outer_height = this._layout_offset_subnodes_height(node.children);
      if (!node.expanded) {
        node_outer_height = 0;
      }
      node_outer_height = Math.max(node._data.view.height, node_outer_height);

      layout_data.outer_height = node_outer_height;
      layout_data.offset_y = base_y - node_outer_height / 2;
      base_y = base_y - node_outer_height - this.opts.vspace;
      total_height += node_outer_height;
    }
    if (nodes_count > 1) {
      total_height += this.opts.vspace * (nodes_count - 1);
    }
    i = nodes_count;
    var middle_height = total_height / 2;
    while (i--) {
      node = nodes[i];
      node._data.layout.offset_y += middle_height;
      //logger.debug(node.topic);
      //logger.debug(node._data.layout.offset_y);
    }
    return total_height;
  },

  get_node_offset: function(node) {
    var layout_data = node._data.layout;
    var offset_cache = null;
    if ("_offset_" in layout_data && this.cache_valid) {
      offset_cache = layout_data._offset_;
    } else {
      offset_cache = { x: -1, y: -1 };
      layout_data._offset_ = offset_cache;
    }
    if (offset_cache.x == -1 || offset_cache.y == -1) {
      var x = layout_data.offset_x;
      var y = layout_data.offset_y;
      if (!node.isroot) {
        var offset_p = this.get_node_offset(node.parent);
        x += offset_p.x;
        y += offset_p.y;
      }
      offset_cache.x = x;
      offset_cache.y = y;
    }
    return offset_cache;
  },

  get_node_point: function(node) {
    var view_data = node._data.view;
    var offset_p = this.get_node_offset(node);
    //logger.debug(offset_p);
    var p = {};
    p.x =
      offset_p.x + (view_data.width * (node._data.layout.direction - 1)) / 2;
    p.y = offset_p.y - view_data.height / 2;
    //logger.debug(p);
    return p;
  },

  get_node_point_in: function(node) {
    var p = this.get_node_offset(node);
    return p;
  },

  get_node_point_out: function(node) {
    var layout_data = node._data.layout;
    var pout_cache = null;
    if ("_pout_" in layout_data && this.cache_valid) {
      pout_cache = layout_data._pout_;
    } else {
      pout_cache = { x: -1, y: -1 };
      layout_data._pout_ = pout_cache;
    }
    if (pout_cache.x == -1 || pout_cache.y == -1) {
      if (node.isroot) {
        pout_cache.x = 0;
        pout_cache.y = 0;
      } else {
        var view_data = node._data.view;
        var offset_p = this.get_node_offset(node);
        pout_cache.x =
          offset_p.x +
          (view_data.width + this.opts.pspace) * node._data.layout.direction;
        pout_cache.y = offset_p.y;
        //logger.debug('pout');
        //logger.debug(pout_cache);
      }
    }
    return pout_cache;
  },

  get_expander_point: function(node) {
    var p = this.get_node_point_out(node);
    var ex_p = {};
    if (node._data.layout.direction == JM.direction.right) {
      ex_p.x = p.x - this.opts.pspace;
    } else {
      ex_p.x = p.x;
    }
    ex_p.y = p.y - Math.ceil(this.opts.pspace / 2);
    return ex_p;
  },

  get_min_size: function() {
    var nodes = this.jm.mind.nodes;
    var node = null;
    var pout = null;
    for (var nodeid in nodes) {
      node = nodes[nodeid];
      pout = this.get_node_point_out(node);
      if (pout.x > this.bounds.e) {
        this.bounds.e = pout.x;
      }
      if (pout.x < this.bounds.w) {
        this.bounds.w = pout.x;
      }
    }
    return {
      w: this.bounds.e - this.bounds.w,
      h: this.bounds.s - this.bounds.n,
    };
  },

  toggle_node: function(node) {
    if (node.isroot) {
      return;
    }
    if (node.expanded) {
      this.collapse_node(node);
    } else {
      this.expand_node(node);
    }
  },

  expand_node: function(node) {
    node.expanded = true;
    this.part_layout(node);
    this.set_visible(node.children, true);
  },

  collapse_node: function(node) {
    node.expanded = false;
    this.part_layout(node);
    this.set_visible(node.children, false);
  },

  expand_all: function() {
    var nodes = this.jm.mind.nodes;
    var c = 0;
    var node;
    for (var nodeid in nodes) {
      node = nodes[nodeid];
      if (!node.expanded) {
        node.expanded = true;
        c++;
      }
    }
    if (c > 0) {
      var root = this.jm.mind.root;
      this.part_layout(root);
      this.set_visible(root.children, true);
    }
  },

  collapse_all: function() {
    var nodes = this.jm.mind.nodes;
    var c = 0;
    var node;
    for (var nodeid in nodes) {
      node = nodes[nodeid];
      if (node.expanded && !node.isroot) {
        node.expanded = false;
        c++;
      }
    }
    if (c > 0) {
      var root = this.jm.mind.root;
      this.part_layout(root);
      this.set_visible(root.children, true);
    }
  },

  expand_to_depth: function(target_depth, curr_nodes, curr_depth) {
    if (target_depth < 1) {
      return;
    }
    var nodes = curr_nodes || this.jm.mind.root.children;
    var depth = curr_depth || 1;
    var i = nodes.length;
    var node = null;
    while (i--) {
      node = nodes[i];
      if (depth < target_depth) {
        if (!node.expanded) {
          this.expand_node(node);
        }
        this.expand_to_depth(target_depth, node.children, depth + 1);
      }
      if (depth == target_depth) {
        if (node.expanded) {
          this.collapse_node(node);
        }
      }
    }
  },

  part_layout: function(node) {
    var root = this.jm.mind.root;
    if (!!root) {
      var root_layout_data = root._data.layout;
      if (node.isroot) {
        root_layout_data.outer_height_right = this._layout_offset_subnodes_height(
          root_layout_data.right_nodes
        );
        root_layout_data.outer_height_left = this._layout_offset_subnodes_height(
          root_layout_data.left_nodes
        );
      } else {
        if (node._data.layout.direction == JM.direction.right) {
          root_layout_data.outer_height_right = this._layout_offset_subnodes_height(
            root_layout_data.right_nodes
          );
        } else {
          root_layout_data.outer_height_left = this._layout_offset_subnodes_height(
            root_layout_data.left_nodes
          );
        }
      }
      this.bounds.s = Math.max(
        root_layout_data.outer_height_left,
        root_layout_data.outer_height_right
      );
      this.cache_valid = false;
    } else {
      logger.warn("can not found root node");
    }
  },

  set_visible: function(nodes, visible) {
    var i = nodes.length;
    var node = null;
    var layout_data = null;
    while (i--) {
      node = nodes[i];
      layout_data = node._data.layout;
      if (node.expanded) {
        this.set_visible(node.children, visible);
      } else {
        this.set_visible(node.children, false);
      }
      if (!node.isroot) {
        node._data.layout.visible = visible;
      }
    }
  },

  is_expand: function(node) {
    return node.expanded;
  },

  is_visible: function(node) {
    var layout_data = node._data.layout;
    if ("visible" in layout_data && !layout_data.visible) {
      return false;
    } else {
      return true;
    }
  },
};

JM.graph_canvas = function(view) {
  this.opts = view.opts;
  this.e_canvas = $("canvas", this.container)[0] || $c("canvas");
  this.canvas_ctx = this.e_canvas.getContext("2d");
  this.size = { w: 0, h: 0 };
};

JM.graph_canvas.prototype = {
  element: function() {
    return this.e_canvas;
  },

  set_size: function(w, h) {
    this.size.w = w;
    this.size.h = h;
    this.e_canvas.width = w;
    this.e_canvas.height = h;
  },

  clear: function() {
    this.canvas_ctx.clearRect(0, 0, this.size.w, this.size.h);
  },

  draw_line: function(pout, pin, offset) {
    var ctx = this.canvas_ctx;
    ctx.strokeStyle = this.opts.line_color;
    ctx.lineWidth = this.opts.line_width;
    ctx.lineCap = "round";

    this._bezier_to(
      ctx,
      pin.x + offset.x,
      pin.y + offset.y,
      pout.x + offset.x,
      pout.y + offset.y
    );
  },

  copy_to: function(dest_canvas_ctx, callback) {
    dest_canvas_ctx.drawImage(this.e_canvas, 0, 0);
    !!callback && callback();
  },

  _bezier_to: function(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + ((x2 - x1) * 2) / 3, y1, x1, y2, x2, y2);
    ctx.stroke();
  },

  _line_to: function(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  },
};

JM.graph_svg = function(view) {
  this.view = view;
  this.opts = view.opts;
  this.e_svg = JM.graph_svg.c("svg");
  this.size = { w: 0, h: 0 };
  this.lines = [];
};

JM.graph_svg.c = function(tag) {
  return $d.createElementNS("http://www.w3.org/2000/svg", tag);
};

JM.graph_svg.prototype = {
  element: function() {
    return this.e_svg;
  },

  set_size: function(w, h) {
    this.size.w = w;
    this.size.h = h;
    this.e_svg.setAttribute("width", w);
    this.e_svg.setAttribute("height", h);
  },

  clear: function() {
    var len = this.lines.length;
    while (len--) {
      this.e_svg.removeChild(this.lines[len]);
    }
    this.lines.length = 0;
  },

  draw_line: function(pout, pin, offset) {
    var line = JM.graph_svg.c("path");
    line.setAttribute("stroke", this.opts.line_color);
    line.setAttribute("stroke-width", this.opts.line_width);
    line.setAttribute("fill", "transparent");
    this.lines.push(line);
    this.e_svg.appendChild(line);
    this._bezier_to(
      line,
      pin.x + offset.x,
      pin.y + offset.y,
      pout.x + offset.x,
      pout.y + offset.y
    );
  },

  copy_to: function(dest_canvas_ctx, callback) {
    var img = new Image();
    img.onload = function() {
      dest_canvas_ctx.drawImage(img, 0, 0);
      !!callback && callback();
    };
    img.src =
      "data:image/svg+xml;base64," +
      btoa(new XMLSerializer().serializeToString(this.e_svg));
  },

  _bezier_to: function(path, x1, y1, x2, y2) {
    path.setAttribute(
      "d",
      "M" +
        x1 +
        " " +
        y1 +
        " C " +
        (x1 + ((x2 - x1) * 2) / 3) +
        " " +
        y1 +
        ", " +
        x1 +
        " " +
        y2 +
        ", " +
        x2 +
        " " +
        y2
    );
  },

  _line_to: function(path, x1, y1, x2, y2) {
    path.setAttribute("d", "M " + x1 + " " + y1 + " L " + x2 + " " + y2);
  },
};

// view provider
JM.view_provider = function(jm, options) {
  this.opts = options;
  this.jm = jm;
  this.layout = jm.layout;

  this.container = null;
  this.e_panel = null;
  this.e_nodes = null;

  this.size = { w: 0, h: 0 };

  this.selected_node = null;
  this.editing_node = null;

  this.graph = null;
};

JM.view_provider.prototype = {
  init: function() {
    logger.debug("view.init");

    this.container = $i(this.opts.container)
      ? this.opts.container
      : $g(this.opts.container);
    if (!this.container) {
      logger.error("the options.view.container was not be found in dom");
      return;
    }
    this.e_panel = $(".jsmind-inner", this.container)[0];
    this.e_nodes = $(".jmnodes", this.container)[0]; //|| $c("jmnodes");
    this.e_editor = $c("input");

    this.graph =
      this.opts.engine.toLowerCase() === "svg"
        ? new JM.graph_svg(this)
        : new JM.graph_canvas(this);

    this.actualZoom = 1;
    this.zoomStep = 0.1;
    this.minZoom = 0.5;
    this.maxZoom = 2;
  },

  add_event: function(obj, event_name, event_handle) {
    JM.util.dom.add_event(this.e_nodes, event_name, function(e) {
      var evt = e || event;
      event_handle.call(obj, evt);
    });
  },

  get_binded_nodeid: function(element) {
    if (element == null) {
      return null;
    }
    var tagName = element.tagName.toLowerCase();
    if (
      $(element).hasClass("jmnodes") ||
      tagName == "body" ||
      tagName == "html"
    ) {
      return null;
    }
    if ($(element).hasClass("jmnode") || $(element).hasClass("jmexpander")) {
      return element.getAttribute("nodeid");
    } else {
      return this.get_binded_nodeid(element.parentElement);
    }
  },

  is_expander: function(element) {
    return $(element).hasClass("jmexpander"); //element.tagName.toLowerCase() == "jmexpander";
  },

  reset: function() {
    logger.debug("view.reset");
    this.selected_node = null;
    this.clear_lines();
    this.reset_theme();
  },

  reset_theme: function() {
    var theme_name = this.jm.options.theme;
    if (!!theme_name) {
      this.e_nodes.className = "theme-" + theme_name + " jmnodes";
    } else {
      this.e_nodes.className = "jmnodes";
    }
  },

  reset_custom_style: function() {
    var nodes = this.jm.mind.nodes;
    for (var nodeid in nodes) {
      this.reset_node_custom_style(nodes[nodeid]);
    }
  },

  load: function() {
    logger.debug("view.load");
    this.init_nodes();
  },

  expand_size: function() {
    var min_size = this.layout.get_min_size();
    var min_width = min_size.w + this.opts.hmargin * 2;
    var min_height = min_size.h + this.opts.vmargin * 2;
    var client_w = this.e_panel.clientWidth;
    var client_h = this.e_panel.clientHeight;
    if (client_w < min_width) {
      client_w = min_width;
    }
    if (client_h < min_height) {
      client_h = min_height;
    }
    this.size.w = client_w;
    this.size.h = client_h;
  },

  init_nodes_size: function(node) {
    var view_data = node._data.view;
    view_data.width = view_data.element.clientWidth;
    view_data.height = view_data.element.clientHeight;
  },

  init_nodes: function() {
    var nodes = this.jm.mind.nodes;
    // var doc_frag = $d.createDocumentFragment();
    for (var nodeid in nodes) {
      this.create_node_element(nodes[nodeid]);
    }
    //this.e_nodes.appendChild(doc_frag);
    for (var nodeid in nodes) {
      this.init_nodes_size(nodes[nodeid]);
    }
  },

  add_node: function(node) {
    this.create_node_element(node, this.e_nodes);
    this.init_nodes_size(node);
  },

  create_node_element: function(node) {
    var view_data = null;
    if ("view" in node._data) {
      view_data = node._data.view;
    } else {
      view_data = {};
      node._data.view = view_data;
    }

    var d = $(".jmnode[nodeid=" + node.id + "]", this.container)[0];
    if (node.isroot) {
      d.className = "root jmnode";
    } else {
      var d_e = $(".jmexpander[nodeid=" + node.id + "]", this.container)[0];
      $t(d_e, "-");
      d_e.setAttribute("nodeid", node.id);
      d_e.style.visibility = "hidden";
      //parent_node.appendChild(d_e);
      view_data.expander = d_e;
    }
    if (!!node.topic) {
      if (this.opts.support_html) {
        //$h(d, node.topic);
      } else {
        //$t(d, node.topic);
      }
    }
    d.setAttribute("nodeid", node.id);
    d.style.visibility = "hidden";
    this._reset_node_custom_style(d, node.data);

    //parent_node.appendChild(d);
    view_data.element = d;
  },

  remove_node: function(node) {
    if (this.selected_node != null && this.selected_node.id == node.id) {
      this.selected_node = null;
    }
    if (this.editing_node != null && this.editing_node.id == node.id) {
      node._data.view.element.removeChild(this.e_editor);
      this.editing_node = null;
    }
    var children = node.children;
    var i = children.length;
    while (i--) {
      this.remove_node(children[i]);
    }
    if (node._data.view) {
      var element = node._data.view.element;
      var expander = node._data.view.expander;
      this.e_nodes.removeChild(element);
      this.e_nodes.removeChild(expander);
      node._data.view.element = null;
      node._data.view.expander = null;
    }
  },

  update_node: function(node) {
    var view_data = node._data.view;
    var element = view_data.element;

    view_data.width = element.clientWidth;
    view_data.height = element.clientHeight;
  },

  select_node: function(node) {
    if (!!this.selected_node) {
      this.selected_node._data.view.element.className = this.selected_node._data.view.element.className.replace(
        /\s*selected\b/i,
        ""
      );
      this.reset_node_custom_style(this.selected_node);
    }
    if (!!node) {
      this.selected_node = node;
      node._data.view.element.className += " selected";
      this.clear_node_custom_style(node);
    }
  },

  select_clear: function() {
    this.select_node(null);
  },

  get_editing_node: function() {
    return this.editing_node;
  },

  is_editing: function() {
    return !!this.editing_node;
  },

  edit_node_begin: function(node) {
    if (!node.topic) {
      logger.warn("don't edit image nodes");
      return;
    }
    if (this.editing_node != null) {
      this.edit_node_end();
    }
    this.editing_node = node;
    var view_data = node._data.view;
    var element = view_data.element;
    var topic = node.topic;
    var ncs = getComputedStyle(element);
    this.e_editor.value = topic;
    this.e_editor.style.width =
      element.clientWidth -
      parseInt(ncs.getPropertyValue("padding-left")) -
      parseInt(ncs.getPropertyValue("padding-right")) +
      "px";
    element.innerHTML = "";
    element.appendChild(this.e_editor);
    element.style.zIndex = 5;
    this.e_editor.focus();
    this.e_editor.select();
  },

  edit_node_end: function() {
    if (this.editing_node != null) {
      var node = this.editing_node;
      this.editing_node = null;
      var view_data = node._data.view;
      var element = view_data.element;
      element.style.zIndex = "auto";
      element.removeChild(this.e_editor);

      //this.jm.update_node(node.id, topic);
    }
  },

  get_view_offset: function() {
    var bounds = this.layout.bounds;
    var _x = (this.size.w - bounds.e - bounds.w) / 2;
    var _y = this.size.h / 2;
    return { x: _x, y: _y };
  },

  resize: function() {
    this.graph.set_size(1, 1);
    this.e_nodes.style.width = "1px";
    this.e_nodes.style.height = "1px";
    this.init_nodes();
    this.jm.layout.layout();
    this.jm.view.show(false);
    this.expand_size();
    this._show();
    window.jm = this;
  },

  _show: function() {
    this.graph.set_size(this.size.w, this.size.h);
    this.e_nodes.style.width = this.size.w + "px";
    this.e_nodes.style.height = this.size.h + "px";
    this.show_nodes();
    this.show_lines();
    //this.layout.cache_valid = true;
    this.jm.invoke_event_handle(JM.event_type.resize, { data: [] });
  },

  zoomIn: function() {
    return this.setZoom(this.actualZoom + this.zoomStep);
  },

  zoomOut: function() {
    return this.setZoom(this.actualZoom - this.zoomStep);
  },

  setZoom: function(zoom) {
    if (zoom < this.minZoom || zoom > this.maxZoom) {
      return false;
    }
    this.actualZoom = zoom;
    for (var i = 0; i < this.e_panel.children.length; i++) {
      this.e_panel.children[i].style.transform = "scale(" + zoom + ")";
    }
    this.show(true);
    return true;
  },

  _center_root: function() {
    // center root node
    var outer_w = this.e_panel.clientWidth;
    var outer_h = this.e_panel.clientHeight;
    if (this.size.w > outer_w) {
      var _offset = this.get_view_offset();
      this.e_panel.scrollLeft = _offset.x - outer_w / 2;
    }
    if (this.size.h > outer_h) {
      this.e_panel.scrollTop = (this.size.h - outer_h) / 2;
    }
  },

  show: function(keep_center) {
    logger.debug("view.show");
    this.expand_size();
    this._show();
    if (!!keep_center) {
      this._center_root();
    }
  },

  relayout: function() {
    this.expand_size();
    this._show();
  },

  save_location: function(node) {
    var vd = node._data.view;
    vd._saved_location = {
      x: parseInt(vd.element.style.left) - this.e_panel.scrollLeft,
      y: parseInt(vd.element.style.top) - this.e_panel.scrollTop,
    };
  },

  restore_location: function(node) {
    var vd = node._data.view;
    this.e_panel.scrollLeft =
      parseInt(vd.element.style.left) - vd._saved_location.x;
    this.e_panel.scrollTop =
      parseInt(vd.element.style.top) - vd._saved_location.y;
  },

  show_nodes: function() {
    var nodes = this.jm.mind.nodes;
    var node = null;
    var node_element = null;
    var expander = null;
    var p = null;
    var p_expander = null;
    var expander_text = "-";
    var view_data = null;
    var _offset = this.get_view_offset();
    for (var nodeid in nodes) {
      node = nodes[nodeid];
      view_data = node._data.view;
      node_element = view_data.element;
      expander = view_data.expander;
      if (!this.layout.is_visible(node)) {
        node_element.style.display = "none";
        expander.style.display = "none";
        continue;
      }
      this.reset_node_custom_style(node);
      p = this.layout.get_node_point(node);
      view_data.abs_x = _offset.x + p.x;
      view_data.abs_y = _offset.y + p.y;
      node_element.style.left = _offset.x + p.x + "px";
      node_element.style.top = _offset.y + p.y + "px";
      node_element.style.display = "";
      node_element.style.visibility = "visible";
      if (!node.isroot) {
        if (node.children.length > 0 || node.topic.indexOf("@") == 0) {
          expander_text = node.expanded ? "-" : "+";
          p_expander = this.layout.get_expander_point(node);
          expander.style.left = _offset.x + p_expander.x + "px";
          expander.style.top = _offset.y + p_expander.y + "px";
          expander.style.display = "";
          expander.style.visibility = "visible";
          $t(expander, expander_text);
        } else {
          expander.style.display = "none";
          expander.style.visibility = "hidden";
        }
      }
    }
  },

  reset_node_custom_style: function(node) {
    this._reset_node_custom_style(node._data.view.element, node.data);
  },

  _reset_node_custom_style: function(node_element, node_data) {
    if ("background-color" in node_data) {
      node_element.style.backgroundColor = node_data["background-color"];
    }
    if ("foreground-color" in node_data) {
      node_element.style.color = node_data["foreground-color"];
    }
    if ("width" in node_data) {
      node_element.style.width = node_data["width"] + "px";
    }
    if ("height" in node_data) {
      node_element.style.height = node_data["height"] + "px";
    }
    if ("font-size" in node_data) {
      node_element.style.fontSize = node_data["font-size"] + "px";
    }
    if ("font-weight" in node_data) {
      node_element.style.fontWeight = node_data["font-weight"];
    }
    if ("font-style" in node_data) {
      node_element.style.fontStyle = node_data["font-style"];
    }
    if ("background-image" in node_data) {
      var backgroundImage = node_data["background-image"];
      if (
        backgroundImage.startsWith("data") &&
        node_data["width"] &&
        node_data["height"]
      ) {
        var img = new Image();

        img.onload = function() {
          var c = $c("canvas");
          c.width = node_element.clientWidth;
          c.height = node_element.clientHeight;
          var img = this;
          if (c.getContext) {
            var ctx = c.getContext("2d");
            ctx.drawImage(
              img,
              2,
              2,
              node_element.clientWidth,
              node_element.clientHeight
            );
            var scaledImageData = c.toDataURL();
            node_element.style.backgroundImage = "url(" + scaledImageData + ")";
          }
        };
        img.src = backgroundImage;
      } else {
        node_element.style.backgroundImage = "url(" + backgroundImage + ")";
      }
      node_element.style.backgroundSize = "99%";

      if ("background-rotation" in node_data) {
        node_element.style.transform =
          "rotate(" + node_data["background-rotation"] + "deg)";
      }
    }
  },

  clear_node_custom_style: function(node) {
    var node_element = node._data.view.element;
    node_element.style.backgroundColor = "";
    node_element.style.color = "";
  },

  clear_lines: function() {
    this.graph.clear();
  },

  show_lines: function() {
    this.clear_lines();
    var nodes = this.jm.mind.nodes;
    var node = null;
    var pin = null;
    var pout = null;
    var _offset = this.get_view_offset();
    for (var nodeid in nodes) {
      node = nodes[nodeid];
      if (!!node.isroot) {
        continue;
      }
      if ("visible" in node._data.layout && !node._data.layout.visible) {
        continue;
      }
      pin = this.layout.get_node_point_in(node);
      pout = this.layout.get_node_point_out(node.parent);
      this.graph.draw_line(pout, pin, _offset);
    }
  },
};

JM.show = function(options, mind) {
  var _jm = new JM(options);
  _jm.show(mind);
  return _jm;
};

export default JM;
