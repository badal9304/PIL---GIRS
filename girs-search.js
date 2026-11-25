/* GIRS global search — one search box in the top bar that finds anything:
   screens, invoices, B/Ls ready to invoice, bookings, containers, vessel/voyages, customers,
   charge codes and master data (ports, tax codes, currencies, countries, cities, exchange rates, contracts).
   Data comes from girs-index.js (built by tools/build-search-index.js), loaded on first use.
   Shortcuts: Ctrl/⌘ + K or "/" focuses the search; ↑ ↓ move, Enter opens, Esc closes. */
(function () {
  'use strict';
  var MAX = { screen: 5, inv: 5, rdy: 5, bkg: 3, cntr: 3, vvd: 3, cust: 4, chg: 4, master: 5 };
  var GROUPS = [['screen', 'Screens'], ['inv', 'Invoices'], ['rdy', 'Ready to invoice'], ['cust', 'Customers'], ['bkg', 'Bookings'],
    ['cntr', 'Containers'], ['vvd', 'Vessel / Voyage'], ['chg', 'Charge codes'], ['master', 'Master data']];
  // extra words people use for a screen, so "tax", "gst", "fx" or "aging" find the right page
  var ALIAS = { 'tax-setup.html': 'gst vat tax code rate', 'exchange-rate-master.html': 'fx roe rate of exchange currency rate',
    'soa-aging.html': 'statement of account ageing aging overdue', 'receipting.html': 'receipt payment collection',
    'credit-note-list.html': 'cn credit note refund', 'credit-notes.html': 'cn credit note refund', 'enquiry.html': 'enquiry monitoring track',
    'invoice-list-v2.html': 'invoices ready to invoice generate', 'manual-invoice.html': 'manual misc invoice', 'einvoice-exceptions.html': 'e-invoice einvoice irn',
    'dar-console.html': 'dar daily activity report', 'month-end.html': 'close period month end', 'reconciliation.html': 'reconcile bank gfs' };
  var ICON = {
    screen: '<path d="M4 5h16v14H4z"/><path d="M4 9h16"/>', inv: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    rdy: '<path d="M5 12l4 4 10-10"/>', cust: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    bkg: '<path d="M6 3h12v18l-6-4-6 4z"/>', cntr: '<path d="M3 7h18v10H3z"/><path d="M7 7v10M11 7v10M15 7v10"/>',
    vvd: '<path d="M3 17l2 3h14l2-3M5 17V9h14v8M12 9V4"/>', chg: '<path d="M4 7h16M4 12h10M4 17h7"/>', master: '<path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    recent: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>', enq: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'
  };
  var IDX = null, loading = false, input = null, panel = null, items = [], act = -1, q = '';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase(); }
  function svg(k) { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[k] + '</svg>'; }
  function mark(text, toks) {
    var t = String(text || ''), low = t.toLowerCase(), hits = [];
    toks.forEach(function (k) { var w = !/[^a-z]/.test(k), i = low.indexOf(k); while (k && i >= 0) { if (!w || i === 0 || /[^a-z0-9]/.test(low.charAt(i - 1))) hits.push([i, i + k.length]); i = low.indexOf(k, i + k.length); } });
    if (!hits.length) return esc(t);
    hits.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', p = 0;
    hits.forEach(function (h) { if (h[0] < p) return; out += esc(t.slice(p, h[0])) + '<mark>' + esc(t.slice(h[0], h[1])) + '</mark>'; p = h[1]; });
    return out + esc(t.slice(p));
  }
  // score: every token must match; the main field matching exactly / at the start ranks highest
  function score(main, hay, toks, full) {
    var m = norm(main), h = norm(hay), s = 0, words = h.split(/[^a-z0-9]+/);
    // plain words match the start of a word ("paid" finds Paid, not Unpaid); codes and numbers match anywhere
    for (var i = 0; i < toks.length; i++) {
      var k = toks[i], ok = /[^a-z]/.test(k) ? h.indexOf(k) >= 0 : words.some(function (w) { return w.indexOf(k) === 0; });
      if (!ok) return 0;
    }
    if (m === full) s += 100; else if (m.indexOf(full) === 0) s += 60; else if (m.indexOf(full) >= 0) s += 35; else s += 10;
    return s;
  }

  function loadIndex(cb) {
    if (IDX) return cb();
    if (window.GIRS_INDEX) { IDX = build(window.GIRS_INDEX); return cb(); }
    if (loading) return; loading = true;
    var sc = document.createElement('script'); sc.src = 'girs-index.js';
    sc.onload = function () { if (window.GIRS_INDEX && window.GirsDates && GirsDates.deep) { var a0 = GirsDates.anchor; GirsDates.deep(window.GIRS_INDEX); } IDX = build(window.GIRS_INDEX || {}); loading = false; cb(); };
    sc.onerror = function () { IDX = build({}); loading = false; cb(); };
    document.head.appendChild(sc);
  }
  function screens() {
    return ((window.GIRS_INDEX || {}).screens || []).map(function (x) {
      return { g: 'screen', main: x[1], sub: x[2] || 'Screen', hay: x[1] + ' ' + x[2] + ' ' + (ALIAS[x[0]] || ''), href: x[0] };
    });
  }
  function build(D) {
    var R = screens(), uniq = function (g, list, href) {
      var c = {}; list.forEach(function (x) { if (!x[0]) return; (c[x[0]] = c[x[0]] || { n: 0, sub: x[1] }).n++; });
      Object.keys(c).forEach(function (k) { R.push({ g: g, main: k, sub: c[k].n + (c[k].n === 1 ? ' invoice' : ' invoices') + (c[k].sub ? ' · ' + c[k].sub : ''), hay: k, href: href(k) }); });
    };
    (D.inv || []).forEach(function (i) {
      R.push({ g: 'inv', main: i[0], sub: [i[1], i[4], i[2], i[7], i[8]].filter(Boolean).join(' · '), hay: i.join(' '), tag: i[10],
        href: 'invoice-list-v2.html?q=' + encodeURIComponent(i[0]) + '&open=' + encodeURIComponent(i[0]) });
    });
    (D.rdy || []).forEach(function (r) {
      R.push({ g: 'rdy', main: r[1], sub: [r[3], r[5], r[2]].filter(Boolean).join(' · '), hay: r.slice(1).join(' '), tag: r[6], href: 'invoice-list-v2.html?rv=' + encodeURIComponent(r[0]) });
    });
    var inv = D.inv || [];
    uniq('bkg', inv.map(function (i) { return [i[3], i[4]]; }).concat((D.rdy || []).map(function (r) { return [r[2], r[3]]; })), function (k) { return 'invoice-list-v2.html?q=' + encodeURIComponent(k); });
    uniq('cntr', inv.map(function (i) { return [i[5], i[4]]; }), function (k) { return 'invoice-list-v2.html?q=' + encodeURIComponent(k); });
    uniq('vvd', inv.map(function (i) { return [i[6], '']; }), function (k) { return 'invoice-list-v2.html?q=' + encodeURIComponent(k); });
    (D.cust || []).forEach(function (c) { R.push({ g: 'cust', main: c[1], sub: c[0] + (c[2] ? ' · ' + c[2] : ''), hay: c.join(' '), href: 'customer-master.html?q=' + encodeURIComponent(c[0]) }); });
    (D.chg || []).forEach(function (c) { R.push({ g: 'chg', main: c[0], sub: c[1], hay: c.join(' '), href: 'charge-master-v2c.html?q=' + encodeURIComponent(c[0]) }); });
    (D.master || []).forEach(function (m) {
      if (m[0] === 'charge-master.html' && (D.chg || []).some(function (c) { return c[0] === m[2]; })) return;
      R.push({ g: 'master', main: m[3] + (m[2] && m[2] !== m[3] ? '  ' + m[2] : ''), sub: m[1] + (m[4] ? ' · ' + m[4] : ''), hay: m.slice(1).join(' '), href: m[0] + '?q=' + encodeURIComponent(m[2]) });
    });
    return R;
  }

  function recent() { try { return JSON.parse(localStorage.getItem('girs.recent') || '[]'); } catch (e) { return []; } }
  function remember(it) {
    try { var r = recent().filter(function (x) { return x.href !== it.href; }); r.unshift({ g: it.g, main: it.main, sub: it.sub, href: it.href }); localStorage.setItem('girs.recent', JSON.stringify(r.slice(0, 6))); } catch (e) {}
  }

  function results(query) {
    var full = norm(query).trim(), toks = full.split(/\s+/).filter(Boolean), all = IDX || [], by = {};
    all.forEach(function (it) { var s = score(it.main, it.hay + ' ' + it.sub, toks, full); if (s) (by[it.g] = by[it.g] || []).push([s, it]); });
    var out = [];
    GROUPS.forEach(function (g) {
      var l = (by[g[0]] || []).sort(function (a, b) { return b[0] - a[0]; });
      if (!l.length) return;
      out.push({ head: g[1], n: l.length, best: l[0][0], items: l.slice(0, MAX[g[0]]).map(function (x) { return x[1]; }),
        more: l.length > MAX[g[0]] && g[0] === 'inv' ? { main: 'Show all ' + l.length + ' ' + g[1].toLowerCase() + ' in Invoice List', href: 'invoice-list-v2.html?q=' + encodeURIComponent(query.trim()), g: 'enq', more: true } : null });
    });
    // a group with an exact hit moves to the top (e.g. typing a full invoice number)
    out.sort(function (a, b) { return (b.best >= 100) - (a.best >= 100); });
    return { groups: out, toks: toks };
  }

  function render() {
    if (!panel) return;
    q = input.value;
    var html = '', n = 0; items = [];
    var row = function (it, toks) {
      var id = 'gs-o-' + n++; items.push(it);
      return '<a class="gs-row" role="option" id="' + id + '" href="' + esc(it.href) + '" data-i="' + (items.length - 1) + '" aria-selected="false">' +
        '<span class="gs-ic">' + svg(it.g === 'enq' ? 'enq' : (it.recent ? 'recent' : it.g)) + '</span><span class="gs-tx"><span class="gs-m' + (it.more ? ' gs-more' : '') + '">' + (toks ? mark(it.main, toks) : esc(it.main)) + '</span>' +
        (it.sub ? '<span class="gs-s">' + (toks ? mark(it.sub, toks) : esc(it.sub)) + '</span>' : '') + '</span>' +
        (it.tag ? '<span class="gs-tag gs-' + norm(it.tag) + '">' + esc(it.tag) + '</span>' : '') + '</a>';
    };
    if (!q.trim()) {
      var rc = recent();
      if (rc.length) { html += '<div class="gs-h">Recent<button type="button" class="gs-clear" aria-label="Clear recent searches" title="Clear recent searches">Clear</button></div>'; rc.forEach(function (r) { r.recent = true; html += row(r); }); }
      html += '<div class="gs-tip">Search invoice no., B/L, booking, container, vessel/voyage, customer, charge code, port, tax code, currency or any screen.</div>';
    } else if (!IDX) {
      html += '<div class="gs-tip">Loading…</div>';
    } else {
      var r = results(q);
      r.groups.forEach(function (g) {
        html += '<div class="gs-h">' + esc(g.head) + '<span>' + g.n + '</span></div>';
        g.items.forEach(function (it) { html += row(it, r.toks); });
        if (g.more) html += row(g.more);
      });
      if (!r.groups.length) html += '<div class="gs-empty">No results for “' + esc(q.trim()) + '”</div>';
      html += '<div class="gs-sep"></div>' + row({ g: 'enq', main: 'Search “' + q.trim() + '” in Enquiry & Monitoring', href: 'enquiry.html', enq: true });
    }
    html += '<div class="gs-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span><span style="margin-inline-start:auto"><kbd>Ctrl</kbd><kbd>K</kbd> search from anywhere</span></div>';
    panel.innerHTML = html;
    act = items.length && q.trim() ? 0 : -1;
    highlight();
  }
  function highlight() {
    var rows = panel.querySelectorAll('.gs-row');
    Array.prototype.forEach.call(rows, function (r, i) { r.setAttribute('aria-selected', i === act ? 'true' : 'false'); });
    if (act >= 0 && rows[act]) { rows[act].scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', rows[act].id); } else input.removeAttribute('aria-activedescendant');
  }
  function place() {
    if (!panel) return;
    var r = input.getBoundingClientRect(), w = Math.max(r.width, 560);
    panel.style.left = Math.min(r.left, window.innerWidth - w - 12) + 'px'; panel.style.top = (r.bottom + 6) + 'px'; panel.style.width = w + 'px';
    panel.style.maxHeight = Math.max(240, window.innerHeight - r.bottom - 24) + 'px';
  }
  function open() {
    if (!panel) {
      panel = document.createElement('div'); panel.id = 'gs-panel'; panel.setAttribute('role', 'listbox'); panel.setAttribute('aria-label', 'Search results');
      panel.addEventListener('mousedown', function (e) { e.preventDefault(); });
      panel.addEventListener('click', function (e) { if (e.target.closest('.gs-clear')) { e.preventDefault(); try { localStorage.removeItem('girs.recent'); } catch (x) {} render(); return; } var a = e.target.closest('.gs-row'); if (!a) return; e.preventDefault(); go(items[+a.getAttribute('data-i')]); });
      panel.addEventListener('mousemove', function (e) { var a = e.target.closest('.gs-row'); if (a && +a.getAttribute('data-i') !== act) { act = +a.getAttribute('data-i'); highlight(); } });
      document.body.appendChild(panel);
    }
    var th = document.querySelector('.theme');
    panel.className = 'theme gs-panel'; panel.setAttribute('data-theme', th ? th.getAttribute('data-theme') || 'light' : 'light');
    panel.hidden = false; input.setAttribute('aria-expanded', 'true'); place(); render();
    loadIndex(function () { if (panel && !panel.hidden) render(); });
  }
  function close() { if (panel) panel.hidden = true; if (input) { input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); } }
  function go(it) {
    if (!it) return;
    if (it.enq) { try { localStorage.setItem('girs.find', q.trim()); } catch (e) {} }
    if (!it.more && !it.enq) remember(it);
    close(); location.href = it.href;
  }

  function bind() {
    var el = document.getElementById('gq');
    if (!el || el === input) return;
    input = el;
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-controls', 'gs-panel'); input.setAttribute('aria-expanded', 'false');
    input.addEventListener('focus', open);
    input.addEventListener('input', function () { if (!panel || panel.hidden) open(); else render(); });
    input.addEventListener('blur', function () { setTimeout(close, 120); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!panel || panel.hidden) open(); if (!items.length) return; act = (act + (e.key === 'ArrowDown' ? 1 : items.length - 1) + (act < 0 && e.key === 'ArrowUp' ? 1 : 0)) % items.length; highlight(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (act >= 0) go(items[act]); else if (input.value.trim()) go({ g: 'enq', href: 'enquiry.html', enq: true }); }
      else if (e.key === 'Escape') { if (panel && !panel.hidden) { e.preventDefault(); close(); } else input.blur(); }
    });
  }
  // fill the page's own search box when a result links here with ?q= (master screens, credit notes …)
  function prefill() {
    var v; try { v = new URLSearchParams(location.search).get('q'); } catch (e) {}
    if (!v || /invoice-list-v2\.html$/.test(location.pathname)) return;
    var tries = 0, t = setInterval(function () {
      var f = Array.prototype.filter.call(document.querySelectorAll('input'), function (x) { return x.id !== 'gq' && x.offsetParent && /search/i.test((x.getAttribute('aria-label') || '') + ' ' + (x.placeholder || '')); })[0];
      if (f || ++tries > 20) { clearInterval(t); if (f) { f.value = v; f.dispatchEvent(new Event('input', { bubbles: true })); } }
    }, 100);
  }

  var css = document.createElement('style');
  css.textContent = [
    '.gs-panel{position:fixed;z-index:1000;overflow:auto;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:10px;box-shadow:0 16px 40px rgba(22,26,33,.18);padding:6px;box-sizing:border-box;font:13px/18px "IBM Plex Sans",system-ui,sans-serif}',
    '.gs-panel[hidden]{display:none}',
    '.gs-clear{all:unset;cursor:pointer;font-size:12px;font-weight:500;letter-spacing:0;text-transform:none;color:var(--accent);padding:2px 6px;border-radius:4px}.gs-clear:hover{background:var(--hover);text-decoration:underline}.gs-clear:focus-visible{outline:2px solid var(--accent)}',
    '.gs-h{display:flex;justify-content:space-between;align-items:center;padding:10px 10px 4px;font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}.gs-h span{font-weight:500;letter-spacing:0}',
    '.gs-row{display:flex;align-items:center;gap:10px;min-height:40px;padding:6px 10px;border-radius:6px;color:inherit;text-decoration:none;cursor:pointer}',
    '.gs-row[aria-selected=true]{background:var(--hover);box-shadow:inset 3px 0 0 var(--accent)}',
    '.gs-ic{flex:none;display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:6px;background:var(--sub);color:var(--muted2)}',
    '.gs-tx{display:flex;flex-direction:column;min-width:0;flex:1}.gs-m{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gs-more{color:var(--accent)}',
    '.gs-s{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.gs-panel mark{background:transparent;color:var(--accent);font-weight:700}',
    '.gs-tag{flex:none;height:22px;padding:0 8px;border-radius:11px;font-size:12px;line-height:22px;font-weight:500}.gs-ready,.gs-paid,.gs-receipted,.gs-reconciled{background:var(--okbg);color:var(--ok)}.gs-unpaid{background:var(--warnbg);color:var(--warn)}.gs-cancelled{background:var(--badbg);color:var(--bad)}.gs-warning{background:var(--warnbg);color:var(--warn)}.gs-blocked{background:var(--badbg);color:var(--bad)}',
    '.gs-tip,.gs-empty{padding:12px 10px;color:var(--muted)}.gs-sep{height:1px;background:var(--line2);margin:6px 4px}',
    '.gs-foot{display:flex;gap:14px;align-items:center;padding:8px 10px 4px;margin-top:6px;border-top:1px solid var(--line2);font-size:12px;color:var(--muted)}',
    '.gs-foot kbd{display:inline-block;min-width:16px;padding:0 4px;margin-inline-end:3px;border:1px solid var(--line);border-radius:4px;background:var(--sub);font:11px/16px "IBM Plex Mono",monospace;text-align:center;color:var(--muted2)}'
  ].join('\n');
  document.head.appendChild(css);

  document.addEventListener('keydown', function (e) {
    var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    if (((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) || (e.key === '/' && !typing)) { bind(); if (input) { e.preventDefault(); input.focus(); input.select(); } }
  });
  // Esc also closes the collapsed side menu's flyout
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var bd = document.querySelector('.ng-bd'); if (bd) bd.click(); } });
  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, true);
  // the page renders after load; keep binding until the top-bar search exists, and re-bind if it is re-created
  new MutationObserver(function () {
    bind();
    if (input && panel && !panel.hidden && input.getAttribute('aria-expanded') !== 'true') input.setAttribute('aria-expanded', 'true');
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-expanded'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { bind(); prefill(); }); else { bind(); prefill(); }
})();
