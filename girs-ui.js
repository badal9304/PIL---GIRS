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
