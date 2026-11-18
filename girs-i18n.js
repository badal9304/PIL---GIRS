/* GIRS language layer — makes every screen follow the language chosen in the profile menu.
   English is the source. For another language it loads i18n-<lang>.js (built from tools/i18n/*.tsv)
   and translates visible text, placeholders, tooltips and accessible labels as the page renders,
   including pop-ups, menus and anything added later. Arabic also switches the layout to right-to-left.
   Data (codes, numbers, names, amounts) and the printed invoice document stay as they are. */
(function () {
  'use strict';
  var lang = 'en';
  try { lang = localStorage.getItem('girs.lang') || 'en'; } catch (e) {}
  if (lang === 'en') return;
  document.documentElement.lang = lang;
  if (lang === 'ar') document.documentElement.dir = 'rtl';

  var D = null, T = [], NUM = /\d+(?:[.,]\d+)*/g, ATTR = ['placeholder', 'title', 'aria-label'];
  var SKIP = 'script,style,textarea,code,.gi,.gl,.gd-paper,[translate="no"]';

  function look(t) {
    if (Object.prototype.hasOwnProperty.call(D, t)) return D[t];
    var nums = t.match(NUM);
    if (nums) {
      var k = t.replace(NUM, '#');
      if (Object.prototype.hasOwnProperty.call(D, k)) { var n = 0; return D[k].replace(/#/g, function () { return nums[n] != null ? nums[n++] : '#'; }); }
    }
    for (var i = 0; i < T.length; i++) { var m = T[i][2].exec(t); if (m && dataLike(m[1])) return T[i][1].replace('{x}', m[1]); }
    // "A · B · C": translate each part; only when every part is either translated or plain data (codes, numbers, names)
    if (t.indexOf(' · ') > 0) {
      var ok = true, ch = false, parts = t.split(' · ').map(function (p) { var x = look(p); if (x != null) { ch = true; return x; } if (!dataLike(p)) ok = false; return p; });
      if (ch && ok) return parts.join(' · ');
    }
    var c = /^([^:]{2,40}):\s(.+)$/.exec(t);
    if (c) { var a = look(c[1]); if (a != null) { var bb = look(c[2]); if (bb != null || dataLike(c[2])) return a + (lang === 'zh' ? '：' : ': ') + (bb != null ? bb : c[2]); } }
    return null;
  }
  // codes, numbers, dates, names in brackets or Title Case proper nouns — no ordinary lowercase words
  function dataLike(p) { return !/(^|[\s(])[a-z]{3,}/.test(p.replace(/\[[^\]]*\]/g, '')); }
  function tr(raw) {
    if (!raw || !/[A-Za-z]/.test(raw)) return null;
    var t = raw.replace(/\s+/g, ' ').trim();
    var r = look(t);
    if (r == null) return null;
    return raw.match(/^\s*/)[0] + r + raw.match(/\s*$/)[0];
  }
  function skip(el) { return !el || (el.closest && el.closest(SKIP)); }
  function doText(n) {
    if (skip(n.parentElement)) return;
    var r = tr(n.nodeValue); if (r != null && r !== n.nodeValue) n.nodeValue = r;
  }
  function doAttrs(el) {
    if (skip(el)) return;
    for (var i = 0; i < ATTR.length; i++) {
      var v = el.getAttribute(ATTR[i]); if (!v) continue;
      var r = tr(v); if (r != null && r !== v) el.setAttribute(ATTR[i], r);
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1 || skip(root)) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }
  var mo = null;
  function run(recs) {
    mo.disconnect();
    recs.forEach(function (r) {
      if (r.type === 'childList') r.addedNodes.forEach(walk);
      else if (r.type === 'characterData') doText(r.target);
      else if (r.type === 'attributes') doAttrs(r.target);
    });
    var t = tr(document.title); if (t) document.title = t;
    observe();
  }
  function observe() { mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR }); }
  function start() {
    var G = window.GIRS_I18N || {};
    D = G.dict || {};
    T = (G.tpl || []).map(function (p) {
      var re = new RegExp('^' + p[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{x\\}', '(.+)') + '$');
      return [p[0], p[1], re];
    });
    mo = new MutationObserver(run);
    walk(document.body); var t = tr(document.title); if (t) document.title = t;
    observe();
  }
  var s = document.createElement('script');
  s.src = 'i18n-' + lang + '.js';
  s.onload = function () { if (document.body) start(); else document.addEventListener('DOMContentLoaded', start); };
  document.head.appendChild(s);
})();
