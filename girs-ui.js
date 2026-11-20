/* GIRS shared UI helpers.
   Truncation tooltip: wherever text is cut off with "…" because its box is too narrow (table cells, chips,
   labels, side menu, inputs and selects), hovering or focusing it shows the full text in a tooltip.
   Elements that already carry their own title keep it. */
(function () {
  'use strict';
  var tip = null, timer = 0, cur = null, canvas = null;

  function full(el) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return el.value || '';
    if (el.tagName === 'SELECT') { var o = el.options[el.selectedIndex]; return o ? o.text : ''; }
    return (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function textWidth(el, text) {
    canvas = canvas || document.createElement('canvas');
    var c = canvas.getContext('2d'), cs = getComputedStyle(el);
    c.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    return c.measureText(text).width;
  }
  function cut(el) {
    if (!el || el.nodeType !== 1 || el.closest('#gs-panel') || el.closest('.sr') || el.clientWidth < 8) return false;
    var cs = getComputedStyle(el);
    if (el.tagName === 'SELECT') {
      var pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      return textWidth(el, full(el)) > el.clientWidth - pad + 1;
    }
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return el.scrollWidth > el.clientWidth + 1 && !!el.value;
    // text boxes only — never a scroll area, panel or table
    if (!el.firstChild || el.querySelector('div,p,table,ul,ol,section,article,nav,input,select,textarea,button')) return false;
    var clipX = cs.textOverflow === 'ellipsis' || (cs.overflowX === 'hidden' && cs.whiteSpace.indexOf('nowrap') === 0);
    var clipY = cs.webkitLineClamp && cs.webkitLineClamp !== 'none';
    return (clipX && el.scrollWidth > el.clientWidth + 1) || (clipY && el.scrollHeight > el.clientHeight + 1);
  }
  // the truncated element is usually the hovered one or a near ancestor (e.g. a cell around a link)
  function find(t) {
    for (var el = t, i = 0; el && el !== document.body && i < 4; el = el.parentElement, i++) {
      if (el.hasAttribute && el.hasAttribute('title') && el.getAttribute('title')) return null;
      if (cut(el)) return el;
    }
    return null;
  }
  function show(el) {
    var text = full(el);
    if (!text) return;
    if (!tip) {
      tip = document.createElement('div'); tip.id = 'girs-tip'; tip.setAttribute('role', 'tooltip');
      tip.style.cssText = 'position:fixed;z-index:2000;max-width:min(420px,calc(100vw - 24px));padding:6px 10px;border-radius:6px;background:#161A21;color:#fff;' +
        'font:12px/17px "IBM Plex Sans",system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.22);pointer-events:none;white-space:normal;overflow-wrap:anywhere';
      document.body.appendChild(tip);
    }
    tip.textContent = text; tip.hidden = false;
    var r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12)), top = r.top - h - 6;
    if (top < 8) top = r.bottom + 6;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    el.setAttribute('aria-describedby', 'girs-tip'); cur = el;
  }
  function hide() {
    clearTimeout(timer);
    if (tip) tip.hidden = true;
    if (cur) { cur.removeAttribute('aria-describedby'); cur = null; }
  }
  function enter(e) {
    var el = find(e.target);
    if (el === cur) return;
    hide();
    if (el) timer = setTimeout(function () { if (document.contains(el) && cut(el)) show(el); }, 350);
  }
  document.addEventListener('mouseover', enter, true);
  document.addEventListener('focusin', enter, true);
  document.addEventListener('mouseout', function (e) { if (cur && (!e.relatedTarget || !cur.contains(e.relatedTarget))) hide(); else if (!cur) clearTimeout(timer); }, true);
  document.addEventListener('focusout', hide, true);
  document.addEventListener('scroll', hide, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  window.addEventListener('blur', hide);
})();

/* System health — top-bar icon next to the approvals bell, on every screen.
   Names, states and details are the ones shown in the Integration Monitor. The ROE feed follows the
   port selected in the top bar and turns green once a rate is entered in Voyage Invoicing. */
(function () {
  'use strict';
  var PAIR = { SIN: 'USD → SGD', NSA: 'USD → INR', LCH: 'USD → THB', PKG: 'USD → MYR', JED: 'USD → SAR', ZLO: 'USD → MXN' };
  window.GIRS_HEALTH = function (comp, s) {
    var pair = PAIR[s.__hub] || PAIR.SIN, roeOk = false;
    try { roeOk = !!((JSON.parse(localStorage.getItem('girs.home') || '{}') || {}).roeSet || {})[pair]; } catch (e) {}
    var Y = [
      ['LMS', 'ok', 'B/L, booking and container data · last message 11:52'],
      ['Government tax portals', 'bad', '4 e-invoices rejected in validation · 11:58'],
      ['Treasury · ROE feed', roeOk ? 'ok' : 'warn', roeOk ? pair + ' rate entered manually' : pair + ' not received today · expected by 08:00'],
      ['GFS (Oracle Fusion)', 'warn', '1 receipt posting batch retrying · 11:40'],
      ['Email delivery', 'warn', '2 invoice emails bounced · 11:15'],
      ['Banks', 'ok', 'CAMT.053 statement imported · 11:22'],
      ['ODeX', 'ok', 'Invoice request accepted · 11:48'],
      ['Qwiik', 'ok', 'No errors today'],
      ['FAM', 'ok', 'Invoice request accepted · 11:02'],
      ['PowerBI · data lake · AI agents', 'ok', 'Business events delivered · 10:44']
    ];
    var ST = { ok: 'Connected', warn: 'Delayed', bad: 'Errors' };
    var iss = Y.filter(function (y) { return y[1] !== 'ok'; }), bad = Y.some(function (y) { return y[1] === 'bad'; });
    var order = { bad: 0, warn: 1, ok: 2 };
    var open = !!s.__hl;
    return {
      open: open, aria: open ? 'true' : 'false', n: String(iss.length), hasN: iss.length > 0,
      cls: 'btn btn-icon ghl-btn' + (iss.length ? (bad ? ' bad' : ' warn') : ''),
      label: iss.length ? 'System health: ' + iss.length + ' of ' + Y.length + ' need attention' : 'System health: all systems connected',
      sum: iss.length ? iss.length + ' of ' + Y.length + ' need attention' : 'All ' + Y.length + ' connected',
      items: Y.slice().sort(function (a, b) { return order[a[1]] - order[b[1]]; }).map(function (y) {
        return { name: y[0], detail: y[2], dot: 'ghl-d ' + y[1], state: y[0].indexOf('Treasury') === 0 ? (y[1] === 'ok' ? 'Received' : 'Not received') : ST[y[1]], sc: 'ghl-s ' + y[1] };
      }),
      toggle: function () { comp.setState({ __hl: !s.__hl, __um: false }); },
      close: function () { comp.setState({ __hl: false }); }
    };
  };
  try { document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var b = document.querySelector('.ghl-p'); if (b) { var x = document.querySelector('.ghl-scrim'); if (x) x.click(); } } }); } catch (e) {}
})();
