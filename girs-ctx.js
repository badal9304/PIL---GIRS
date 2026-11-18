/* GIRS hand-off between screens.
   An action on one screen (e.g. Invoice List → "Request refund") stores what was selected, then opens the
   target screen. The target screen takes the context once, pre-selects the record / opens the action, and
   shows a small "Opened from Invoice List" bar with a way back. */
(function () {
  'use strict';
  var KEY = 'girs.ctx', TTL = 10 * 60 * 1000;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function put(ctx) { try { ctx.at = Date.now(); localStorage.setItem(KEY, JSON.stringify(ctx)); } catch (e) {} }
  // Returns the context meant for this page (and keeps it for the bar), or null.
  var taken = null;
  function take(page) {
    if (taken && taken.page === page) return taken;
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!c || c.page !== page || Date.now() - (c.at || 0) > TTL) return null;
      localStorage.removeItem(KEY);
      taken = c; setTimeout(bar, 0);
      return c;
    } catch (e) { return null; }
  }

  var CSS = '.gx-bar{position:fixed;z-index:65;left:50%;bottom:20px;transform:translateX(-50%);display:flex;align-items:center;gap:12px;max-width:calc(100vw - 48px);' +
    'padding:6px 6px 6px 14px;border-radius:8px;background:#0E2A40;color:#fff;font:500 13px/18px "IBM Plex Sans",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25)}' +
    '.gx-bar b{font-weight:600}.gx-bar .m{font-family:"IBM Plex Mono",monospace;color:#BFE0F7}' +
    '.gx-bar a,.gx-bar button{height:28px;display:inline-flex;align-items:center;padding:0 10px;border-radius:6px;border:1px solid rgba(255,255,255,.28);background:transparent;color:#fff;font:inherit;text-decoration:none;cursor:pointer;white-space:nowrap}' +
    '.gx-bar a:hover,.gx-bar button:hover{background:rgba(255,255,255,.12)}.gx-bar button.x{border:0;width:28px;padding:0;justify-content:center}' +
    '.gx-bar a:focus-visible,.gx-bar button:focus-visible{outline:2px solid #5AB0E8;outline-offset:2px}';
  function bar() {
    var c = taken; if (!c || document.getElementById('gx-bar')) return;
    if (!document.getElementById('gx-css')) { var st = document.createElement('style'); st.id = 'gx-css'; st.textContent = CSS; document.head.appendChild(st); }
    var el = document.createElement('div'); el.id = 'gx-bar'; el.className = 'gx-bar'; el.setAttribute('role', 'status');
    el.innerHTML = '<span>Opened from <b>' + esc(c.fromName || 'Invoice List') + '</b> · ' + esc(c.label || '') + ' <span class="m">' + esc(c.inv || '') + '</span></span>' +
      '<a href="' + esc(c.back || 'invoice-list-v2.html') + (c.inv ? '?q=' + encodeURIComponent(c.inv) : '') + '">Back to ' + esc(c.fromName || 'Invoice List') + '</a>' +
      '<button class="x" aria-label="Dismiss"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
    el.querySelector('button.x').addEventListener('click', function () { el.remove(); });
    document.body.appendChild(el);
  }

  window.GirsCtx = { put: put, take: take };
})();
