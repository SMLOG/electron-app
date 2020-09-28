module.exports = function (URI) {
    'use strict';
  
    var p = URI.prototype;
    // old fragment handler we need to wrap
    var f = p.fragment;
  
    // make fragmentPrefix configurable
    URI.fragmentPrefix = '?';
    var _parts = URI._parts;
    URI._parts = function() {
      var parts = _parts();
      parts.fragmentPrefix = URI.fragmentPrefix;
      return parts;
    };
    p.fragmentPrefix = function(v) {
      this._parts.fragmentPrefix = v;
      return this;
    };
  
    // add fragment(true) and fragment({key: value}) signatures
    p.fragment = function(v, build) {
      var prefix = this._parts.fragmentPrefix;
      var fragment = this._parts.fragment || '';
  
      if (v === true) {
        if (fragment.substring(0, prefix.length) !== prefix) {
          return {};
        }
  
        return URI.parseQuery(fragment.substring(prefix.length));
      } else if (v !== undefined && typeof v !== 'string') {
        this._parts.fragment = prefix + URI.buildQuery(v);
        this.build(!build);
        return this;
      } else {
        return f.call(this, v, build);
      }
    };
    p.addFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.addQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.removeFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.removeQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.setFragment = function(name, value, build) {
      var prefix = this._parts.fragmentPrefix;
      var data = URI.parseQuery((this._parts.fragment || '').substring(prefix.length));
      URI.setQuery(data, name, value);
      this._parts.fragment = prefix + URI.buildQuery(data);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.addHash = p.addFragment;
    p.removeHash = p.removeFragment;
    p.setHash = p.setFragment;
  
    // extending existing object rather than defining something new
    return URI;
  };