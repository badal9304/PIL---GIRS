/* GIRS prototype runtime: renders each page's template with its Component logic. */
(function () {
  'use strict';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var VOID = /<(input|img|br|hr|meta|link|source|col|wbr)(\s[^<>]*?)?\s*\/?>/g;
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\{\{\s*([^}]+?)\s*\}\}$/;

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (u) {
    var next = typeof u === 'function' ? u(this.state, this.props) : u;
    this.state = Object.assign({}, this.state, next);
    if (this.__render) this.__render();
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__render) this.__render(); };

  function lookup(path, scope) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }
  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) { var v = lookup(p, scope); return v == null ? '' : String(v); });
  }

  function listen(el) {
    if (el.__bound) return;
    el.__bound = {};
  }
  function setEvents(el, on) {
    el.__on = on;
    if (!el.__bound) el.__bound = {};
    Object.keys(on).forEach(function (type) {
      if (el.__bound[type]) return;
      el.__bound[type] = true;
      el.addEventListener(type, function (e) {
        var h = el.__on && el.__on[type];
        if (typeof h === 'function') { if (type === 'click') e.stopPropagation(); h(e); }
      });
    });
  }

  function build(tpl, scope, inSvg, out) {
    if (tpl.nodeType === 3) {
      var t = tpl.nodeValue;
      out.push(document.createTextNode(t.indexOf('{{') >= 0 ? interp(t, scope) : t));
      return;
    }
    if (tpl.nodeType !== 1) return;
    var tag = tpl.localName;
    if (tag === 'sc-for') {
      var list = lookup((tpl.getAttribute('list') || '').replace(/^\{\{\s*|\s*\}\}$/g, ''), scope) || [];
      var as = tpl.getAttribute('as') || 'item';
      list.forEach(function (item, i) {
        var s = Object.create(scope); s[as] = item; s.$index = i;
        kids(tpl, s, inSvg, out);
      });
      return;
    }
    if (tag === 'sc-if') {
      var v = lookup((tpl.getAttribute('value') || '').replace(/^\{\{\s*|\s*\}\}$/g, ''), scope);
      if (v) kids(tpl, scope, inSvg, out);
      return;
    }
    var svg = inSvg || tag === 'svg';
    var el = svg ? document.createElementNS(SVG_NS, tag) : document.createElement(tag);
    var on = {}, props = {};
    for (var i = 0; i < tpl.attributes.length; i++) {
      var a = tpl.attributes[i], name = a.name, raw = a.value;
      if (name.indexOf('hint-') === 0 || name === 'xmlns') continue;
      var m = raw.match(WHOLE), val = m ? lookup(m[1], scope) : (raw.indexOf('{{') >= 0 ? interp(raw, scope) : raw);
      if (/^on[A-Z]/.test(name)) { on[name.slice(2).toLowerCase()] = val; continue; }
      if (!svg && (name === 'checked' || name === 'disabled' || name === 'selected')) {
        var b = val === true || val === 'true' || (m === null && raw !== 'false');
        props[name] = b; if (b) el.setAttribute(name, ''); continue;
      }
      if (!svg && name === 'value' && (tag === 'input' || tag === 'select' || tag === 'textarea')) { props.value = val == null ? '' : String(val); if (tag === 'input') el.setAttribute('value', props.value); continue; }
      if (val === false || val == null) continue;
      el.setAttribute(name === 'className' ? 'class' : name, String(val));
    }
    var children = [];
    kids(tpl, scope, svg, children);
    children.forEach(function (c) { el.appendChild(c); });
    el.__props = props;
    applyProps(el, props);
    setEvents(el, on);
    out.push(el);
  }
  function kids(tpl, scope, inSvg, out) {
    for (var n = tpl.firstChild; n; n = n.nextSibling) build(n, scope, inSvg, out);
  }
  function applyProps(el, props) {
    if ('checked' in props) el.checked = props.checked;
    if ('disabled' in props) el.disabled = props.disabled;
    if ('selected' in props) el.selected = props.selected;
    if ('value' in props && el.value !== props.value) el.value = props.value;
  }

  function patch(parent, oldNodes, newNodes) {
    var len = Math.max(oldNodes.length, newNodes.length);
    for (var i = 0; i < len; i++) {
      var o = oldNodes[i], n = newNodes[i];
      if (!o) { parent.appendChild(n); continue; }
      if (!n) { parent.removeChild(o); continue; }
      if (o.nodeType !== n.nodeType || o.nodeName !== n.nodeName || o.namespaceURI !== n.namespaceURI) { parent.replaceChild(n, o); continue; }
      if (o.nodeType === 3) { if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue; continue; }
      var j, oa = o.attributes, na = n.attributes;
      for (j = oa.length - 1; j >= 0; j--) if (!n.hasAttribute(oa[j].name)) o.removeAttribute(oa[j].name);
      for (j = 0; j < na.length; j++) if (o.getAttribute(na[j].name) !== na[j].value) o.setAttribute(na[j].name, na[j].value);
      patch(o, Array.prototype.slice.call(o.childNodes), Array.prototype.slice.call(n.childNodes));
      setEvents(o, n.__on || {});
      o.__props = n.__props || {};
      applyProps(o, o.__props);
    }
  }

  function boot() {
    var tplText = document.getElementById('tpl').textContent;
    var code = document.getElementById('logic').textContent;
    var xml = '<root xmlns="http://www.w3.org/1999/xhtml">' + tplText.replace(VOID, function (s, t, rest) { return '<' + t + (rest || '') + '/>'; }).replace(/&nbsp;/g, '&#160;') + '</root>';
    var doc = new DOMParser().parseFromString(xml, 'application/xhtml+xml');
    var err = doc.getElementsByTagName('parsererror')[0];
    if (err) { document.body.textContent = 'Template error: ' + err.textContent; return; }
    var root = doc.documentElement, body = [];
    for (var n = root.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n.localName === 'helmet') {
        for (var h = n.firstChild; h; h = h.nextSibling) {
          if (h.nodeType !== 1) continue;
          var e = document.createElement(h.localName);
          for (var i = 0; i < h.attributes.length; i++) e.setAttribute(h.attributes[i].name, h.attributes[i].value);
          e.textContent = h.textContent;
          document.head.appendChild(e);
        }
      } else body.push(n);
    }
    var Component = new Function('DCLogic', code + '\nreturn Component;')(DCLogic);
    var comp = new Component({});
    var app = document.getElementById('app');
    comp.__render = function () {
      var vals = comp.renderVals(), out = [];
      body.forEach(function (n) { build(n, vals, false, out); });
      patch(app, Array.prototype.slice.call(app.childNodes), out);
    };
    comp.__render();
    if (typeof comp.componentDidMount === 'function') comp.componentDidMount();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
