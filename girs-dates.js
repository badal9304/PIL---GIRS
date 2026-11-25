/* GIRS prototype · dynamic dates
   The sample data in each screen was written around a fixed "today" (the anchor).
   Before the screen renders, this script moves every sample date by the number of days
   between the anchor and the real current date, so the prototype always looks current
   and the gaps between dates (due in 5 days, overdue by 3 days, ageing) stay the same.
   - Anchor: the page's own TODAY constant if it has one, else data-anchor, else 2026-11-20.
   - Only dates within 120 days of the anchor move. Older history and far-future dates stay.
   - The 1st and the last day of a month move by whole months, so period dates stay on month boundaries.
   - Dates built in code with new Date(2026, …) move by the same number of days.
   - data-off="1" on the script tag leaves the page unchanged (used for real client payloads). */
(function () {
  var me = document.currentScript;
  var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var ML = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var W = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], WL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var ymd = function (y, m, d) { return new Date(y, m, d); };
  var now = new Date(), T = ymd(now.getFullYear(), now.getMonth(), now.getDate());
  var api = { delta: 0, today: iso(T), anchor: '', shiftText: function (s) { return s; }, deep: function (o) { return o; }, mk: function (y, m, d, h, mi, sec) { return new Date(y, m, d == null ? 1 : d, h || 0, mi || 0, sec || 0); } };
  window.GirsDates = api;
  if (me && me.getAttribute('data-off') === '1') return;
  var tpl = document.getElementById('tpl'), logic = document.getElementById('logic');
  var code = logic ? logic.textContent : '';
  var am = code.match(/const\s+[A-Z0-9_]*TODAY\s*=\s*(?:Date\.parse\()?'(\d{4})-(\d\d)-(\d\d)'/);
  var a = am ? [am[1], am[2], am[3]] : ((me && me.getAttribute('data-anchor')) || '2026-11-20').split('-');
  var A = ymd(+a[0], +a[1] - 1, +a[2]), WIN = 120;
  var delta = Math.round((T - A) / 864e5), months = Math.round(delta / 30.44);
  api.anchor = iso(A); api.delta = delta;
  if (!delta) return;
  var near = function (d) { return Math.abs((d - A) / 864e5) <= WIN; };
  var lastDay = function (d) { return ymd(d.getFullYear(), d.getMonth() + 1, 0).getDate() === d.getDate(); };
  var move = function (d) {
    if (!near(d)) return null;
    if (d.getDate() === 1) return ymd(d.getFullYear(), d.getMonth() + months, 1);
    if (lastDay(d)) return ymd(d.getFullYear(), d.getMonth() + months + 1, 0);
    return ymd(d.getFullYear(), d.getMonth(), d.getDate() + delta);
  };
  var valid = function (y, m, d) { var x = ymd(y, m, d); return x.getMonth() === m && x.getDate() === d ? x : null; };
  var mi = function (t) { var i = M.indexOf(t.slice(0, 3)); return i; };
  var reIso = /\b(20\d\d)-(\d\d)-(\d\d)\b/g;
  var reDmy = /\b([0-3]\d)\/([01]\d)\/(20\d\d)\b/g;
  var reTxt = /\b(?:(Sun|Mon|Tue|Wed|Thu|Fri|Sat)(day|sday|nesday|rsday|urday)?(,?) )?(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(uary|ruary|ch|il|e|y|ust|tember|ober|ember)?\b(?:( |, )(20\d\d)\b)?/g;
  function shiftText(s) {
    if (!s || typeof s !== 'string') return s;
    s = s.replace(reIso, function (all, y, m, d) { var x = valid(+y, +m - 1, +d); var n = x && move(x); return n ? iso(n) : all; });
    s = s.replace(reDmy, function (all, d, m, y) { var x = valid(+y, +m - 1, +d); var n = x && move(x); return n ? pad(n.getDate()) + '/' + pad(n.getMonth() + 1) + '/' + n.getFullYear() : all; });
    s = s.replace(reTxt, function (all, wd, wdl, comma, d, mon, monl, sep, y) {
      var m = mi(mon); if (m < 0) return all;
      var yr = y ? +y : A.getFullYear();
      var x = valid(yr, m, +d); if (!x) return all;
      if (!y && !near(x)) { x = valid(yr + (x > A ? -1 : 1), m, +d); if (!x) return all; }
      var n = move(x); if (!n) return all;
      var dd = d.length === 2 && d.charAt(0) === '0' ? pad(n.getDate()) : String(n.getDate());
      var mo = monl ? ML[n.getMonth()] : M[n.getMonth()];
      var out = (wd ? (wdl ? WL[n.getDay()] : W[n.getDay()]) + comma + ' ' : '') + dd + ' ' + mo;
      if (y) out += sep + n.getFullYear();
      return out;
    });
    return s;
  }
  function deep(o, seen) {
    if (!o || typeof o !== 'object') return o; seen = seen || [];
    if (seen.indexOf(o) >= 0) return o; seen.push(o);
    for (var k in o) { if (!Object.prototype.hasOwnProperty.call(o, k)) continue; var v = o[k]; if (typeof v === 'string') o[k] = shiftText(v); else if (v && typeof v === 'object') deep(v, seen); }
    return o;
  }
  api.shiftText = shiftText; api.deep = function (o) { return deep(o); };
  // Dates built in code from numbers, e.g. new Date(2026, 9, day), move by the same number of days.
  api.mk = function (y, m, d, h, mi, sec) { var x = new Date(y, m, d == null ? 1 : d, h || 0, mi || 0, sec || 0); x.setDate(x.getDate() + delta); return x; };
  var shiftCode = function (c) { return c.replace(/new Date\(\s*(20\d\d)\s*,/g, 'GirsDates.mk($1,'); };
  if (tpl) tpl.textContent = shiftText(tpl.textContent);
  if (logic) logic.textContent = shiftCode(shiftText(code));
})();
