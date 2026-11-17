/* GIRS Exchange Rate Master: manual entry of today's rate, allowed only when today's LMS rate has not arrived.
   Entries are kept in this browser (localStorage 'girs.fx.v1') so the prototype remembers them. */
(function () {
  'use strict';
  var KEY = 'girs.fx.v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(all) { try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function stamp() { var d = new Date(), p = function (n) { return ('0' + n).slice(-2); }; return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); }

  // Replace values inside a record (title, fields, facts) but not inside its history / tables / audit.
  var SKIP = { t: 1, tables: 1, rail: 1, audit: 1, hist: 1 };
  function deep(x, map) {
    if (typeof x === 'string') { var s = x; map.forEach(function (m) { s = s.split(m[0]).join(m[1]); }); return s; }
    if (Array.isArray(x)) return x.map(function (y) { return deep(y, map); });
    if (x && typeof x === 'object') { var o = {}; Object.keys(x).forEach(function (k) { o[k] = SKIP[k] ? x[k] : deep(x[k], map); }); return o; }
    return x;
  }
  // Apply a saved manual rate to a record of any layout.
  function apply(rec, miss, today) {
    var m = miss[rec.id], e = load()[rec.id];
    if (!m || !e) return rec;
    var r = deep(rec, [[m.prev, e.rate], [m.prevEff, today], [m.src, 'Manual entry · LMS rate missing'], [m.ref, '—']]);
    var row = ['Manual rate entered · ' + e.rate + ' · ' + e.reason, e.by, e.at];
    if (Array.isArray(r.audit)) r.audit = r.audit.concat([row]);
    if (Array.isArray(r.rail)) r.rail = [row.concat([0])].concat(r.rail);
    if (r.hist && r.hist.rows) r.hist = Object.assign({}, r.hist, { rows: [row].concat(r.hist.rows) });
    if (Array.isArray(r.t)) r.t = [[m.prevEff, m.prev]].concat(r.t);
    if (Array.isArray(r.tables)) r.tables = r.tables.map(function (t) {
      if (!/^Previous rates/.test(t[0])) return t;
      var rows = [[m.prevEff, m.prev]].concat(t[2]);
      return [t[0].replace(/\d+$/, String(rows.length)), t[1], rows].concat(t.slice(3));
    });
    if (typeof r.railTitle === 'string' && Array.isArray(r.rail)) r.railTitle = r.railTitle.replace(/\d+$/, String(r.rail.length));
    return r;
  }

  var CSS = '.gfx-ov{position:fixed;inset:0;z-index:90;background:rgba(14,17,22,.42)}' +
    '.gfx{position:fixed;z-index:91;top:50%;left:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 48px));background:var(--surface,#fff);color:var(--ink,#161A21);border-radius:12px;box-shadow:0 24px 64px rgba(0,0,0,.28);font:14px/20px "IBM Plex Sans",system-ui,sans-serif;overflow:hidden}' +
    '.gfx-h{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:18px 24px 14px;border-bottom:1px solid var(--line2,#ECEEF2)}.gfx-h h2{margin:0;font-size:18px;line-height:24px;font-weight:600}.gfx-h p{margin:2px 0 0;font-size:13px;color:var(--muted,#5A6170)}' +
    '.gfx-b{padding:18px 24px;display:flex;flex-direction:column;gap:14px}.gfx-g{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px}' +
    '.gfx-k{font-size:12px;color:var(--muted,#5A6170)}.gfx-v{font-weight:500}.gfx-m{font-family:"IBM Plex Mono",monospace}' +
    '.gfx label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500}.gfx input,.gfx textarea{font:inherit;font-weight:400;height:36px;padding:0 10px;border:1px solid var(--bd,#C9CED6);border-radius:6px;background:var(--surface,#fff);color:inherit;box-sizing:border-box}' +
    '.gfx textarea{height:64px;padding-top:8px;resize:vertical}.gfx input:focus,.gfx textarea:focus{outline:2px solid var(--accent,#0071B7);outline-offset:0}' +
    '.gfx .err{color:var(--bad,#B3261E);font-size:12px;font-weight:400}.gfx .note{padding:10px 12px;border-radius:6px;background:var(--tint,#EAF4FB);color:var(--accent2,#005C96);font-size:13px}' +
    '.gfx-f{display:flex;justify-content:flex-end;gap:8px;padding:12px 24px;border-top:1px solid var(--line2,#ECEEF2);background:var(--sub,#F7F8FA)}' +
    '.gfx button{height:36px;padding:0 14px;border-radius:6px;border:1px solid var(--bd,#C9CED6);background:var(--surface,#fff);color:inherit;font:500 14px "IBM Plex Sans",sans-serif;cursor:pointer}' +
    '.gfx button.p{background:var(--accent,#0071B7);border-color:var(--accent,#0071B7);color:#fff}.gfx button:focus-visible{outline:2px solid var(--accent,#0071B7);outline-offset:2px}';

  // opts: { id, pair, rtype, loc, prev, prevEff, today, onSave }
  function open(o) {
    if (!document.getElementById('gfx-css')) { var st = document.createElement('style'); st.id = 'gfx-css'; st.textContent = CSS; document.head.appendChild(st); }
    var last = document.activeElement;
    var ov = document.createElement('div'); ov.className = 'gfx-ov';
    var el = document.createElement('div'); el.className = 'gfx'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'gfx-t');
    el.innerHTML = '<div class="gfx-h"><div><h2 id="gfx-t">Enter today\'s rate · ' + esc(o.pair) + '</h2><p>' + esc(o.rtype) + ' · ' + esc(o.loc) + '</p></div><button data-a="x" aria-label="Close">Close</button></div>' +
      '<div class="gfx-b"><div class="note">Today\'s LMS rate has not been received. Enter the rate to use for ' + esc(o.today) + '.</div>' +
      '<div class="gfx-g"><div><div class="gfx-k">Effective date</div><div class="gfx-v">' + esc(o.today) + '</div></div><div><div class="gfx-k">Last LMS rate · ' + esc(o.prevEff) + '</div><div class="gfx-v gfx-m">' + esc(o.prev) + '</div></div></div>' +
      '<label>Rate<input class="gfx-m" id="gfx-rate" inputmode="decimal" autocomplete="off"><span class="err" id="gfx-re" hidden>Enter a rate greater than 0</span></label>' +
      '<label>Reason<textarea id="gfx-why">LMS rate not received</textarea><span class="err" id="gfx-we" hidden>A reason is required</span></label></div>' +
      '<div class="gfx-f"><button data-a="x">Cancel</button><button class="p" data-a="ok">Save rate</button></div>';
    function close() { ov.remove(); el.remove(); document.removeEventListener('keydown', key, true); try { last && last.focus && last.focus(); } catch (e) {} }
    function key(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === 'Tab') { var f = el.querySelectorAll('button,input,textarea'), a = f[0], b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); } else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); } }
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-a]') : null; if (!b) return;
      if (b.getAttribute('data-a') === 'x') { close(); return; }
      var raw = el.querySelector('#gfx-rate').value.trim().replace(/,/g, ''), v = parseFloat(raw), why = el.querySelector('#gfx-why').value.trim();
      var bad = !(v > 0) || !/^\d*\.?\d+$/.test(raw);
      el.querySelector('#gfx-re').hidden = !bad; el.querySelector('#gfx-we').hidden = !!why;
      if (bad || !why) return;
      var dec = (o.prev.split('.')[1] || '').length || 4;
      var all = load(); all[o.id] = { rate: v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: Math.max(dec, 6) }), reason: why, by: 'Daniel Tan', at: stamp() }; save(all);
      close(); if (o.onSave) o.onSave(o.pair + ' rate for ' + o.today + ' saved · ' + all[o.id].rate);
    });
    ov.addEventListener('click', close);
    document.body.appendChild(ov); document.body.appendChild(el); document.addEventListener('keydown', key, true);
    el.querySelector('#gfx-rate').focus();
  }
  window.GirsFx = { open: open, apply: apply, has: function (id) { return !!load()[id]; } };
})();
