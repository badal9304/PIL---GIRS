/* GIRS document viewer.
   Shows an invoice or credit note using the SAME template as the Invoice Template Previewer screen
   (invoice-previewer.html): same fields, same order, same placeholders. Values the invoice record holds are
   filled in; everything else stays as the previewer's [placeholder]. Also shows a receipt, and downloads
   each document as a real PDF (written byte by byte, no libraries). Used by Invoice List A–D,
   Invoice Generate and Enquiry. */
(function () {
  'use strict';

  // Same country table as invoice-previewer.html (SG, IN, SA, MY, MX). Other countries keep placeholders.
  var C = {
    SG: { regime: 'Peppol / InvoiceNow', taxName: 'GST 9%', dual: false },
    IN: { regime: 'GSTN e-Invoice (IRN)', taxName: 'IGST 18%', dual: true },
    SA: { regime: 'ZATCA Phase 2', taxName: 'VAT 15%', dual: false },
    MY: { regime: 'MyInvois', taxName: 'SST 8%', dual: false },
    MX: { regime: 'CFDI', taxName: 'IVA 16%', dual: false }
  };

  // ---------------------------------------------------------------- helpers
  function f2(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rateOf(code) { if (!code || code === '—') return 0; if (/^ZR/.test(code)) return 0; var m = String(code).match(/-(\d+(?:\.\d+)?)$/); return m ? Number(m[1]) : 0; }
  function val(v, ph) { return v && v !== '—' ? v : ph; }
  // Previewer schedule text: "International — zero-rated" or "Domestic — GST 9%"
  function schedOf(tax, cc) {
    if (!tax || tax === '—') return '[Tax schedule]';
    if (/^ZR/.test(tax)) return 'International — zero-rated';
    var c = C[cc]; return 'Domestic — ' + (c ? c.taxName : String(tax));
  }
  function taxNameOf(tax, cc) { var c = C[cc]; return c ? c.taxName : 'Tax ' + rateOf(tax) + '%'; }

  // 21 × 21 statutory QR placeholder, same drawing rule as the previewer (three finder boxes + seeded noise)
  function qrCells(key) {
    var seed = 0; for (var i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) % 233280;
    var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var out = [];
    for (var r = 0; r < 21; r++) for (var c = 0; c < 21; c++) {
      var f = -1;
      [[0, 0], [0, 14], [14, 0]].forEach(function (b) {
        if (r >= b[0] && r < b[0] + 7 && c >= b[1] && c < b[1] + 7) { var y = r - b[0], x = c - b[1]; f = (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)) ? 1 : 0; }
      });
      out.push(f === 1 || (f === -1 && rnd() > 0.52) ? 1 : 0);
    }
    return out;
  }

  // ---------------------------------------------------------------- invoice model (previewer template)
  // inv: { kind?, no, type, date, due, bkg, bl, cntr, vvd, port, gov, orig?, cust: { code, name, tax }, lines: [{ code, name, amt, cur, tax }] }
  function invoiceModel(inv) {
    var credit = inv.kind === 'credit', sign = credit ? -1 : 1;
    var cc = String(inv.port || '').slice(0, 2), cty = C[cc];
    var dir = String(inv.no || '').charAt(3); // LOC + O/I + charge type + YY + run
    var cust = inv.cust || {};
    var lines = (inv.lines || []).map(function (l) { return { desc: l.name || l.code, sched: schedOf(l.tax, cc), ccy: l.cur, amt: f2(sign * l.amt) }; });
    // totals in the previewer's order: subtotals, tax lines, totals
    var per = {}, order = [];
    (inv.lines || []).forEach(function (l) {
      if (!per[l.cur]) { per[l.cur] = { ex: 0, tx: 0, tax: null }; order.push(l.cur); }
      per[l.cur].ex += l.amt; var t = Math.round(l.amt * rateOf(l.tax)) / 100;
      if (t) { per[l.cur].tx += t; per[l.cur].tax = l.tax; }
    });
    var totals = [];
    order.forEach(function (c) { totals.push({ label: 'Subtotal ' + c, val: f2(sign * per[c].ex) }); });
    order.forEach(function (c) { if (per[c].tx) totals.push({ label: taxNameOf(per[c].tax, cc) + ' (' + c + ')', val: f2(sign * per[c].tx) }); });
    order.forEach(function (c, k) { totals.push({ label: 'Total ' + c, val: f2(sign * (per[c].ex + per[c].tx)), bold: true, rule: k === 0 }); });
    var party = dir === 'I' ? 'Consignee' : 'Shipper';
    return {
      kind: credit ? 'credit' : 'invoice', no: inv.no, file: (credit ? 'Credit-note-' : 'Invoice-') + inv.no,
      carrier: 'Pacific International Lines', carrierSub: '[Local company name & address]',
      title: credit ? 'Credit Note' : (inv.type === 'Proforma' ? 'Proforma Invoice' : 'Tax Invoice'),
      ref: credit ? val(inv.orig, '[Original invoice no.]') : null,
      taxIds: [['Tax ID — Corporate HQ', '[HQ tax registration no.]']].concat(cty && cty.dual ? [['Tax ID — Local Agency GSTIN', '[Local agency GSTIN]']] : []),
      billed: [['', val(cust.name, '[Billed-To party]'), false], ['', 'Customer code: ' + val(cust.code, '[Customer code]'), true, true], ['', val(cust.tax, '[Customer tax ID]'), true, true],
        ['Customer reference no.', '[Customer reference]', true], ['Due date', val(inv.due, '[Due date]'), true]],
      grid: [['B/L #', val(inv.bl, '[B/L no.]'), true], ['Voyage (VVD)', val(inv.vvd, '[Voyage]'), true], ['POL / POD', dir === 'I' ? '[POL] → ' + val(inv.port, '[POD]') : val(inv.port, '[POL]') + ' → [POD]', true],
        [dir === 'I' ? 'ETA (import)' : 'ETD (export)', '[Date]', true], ['Shipment no.', val(inv.bkg, '[Shipment no.]'), true], ['POR / DEL', '[POR] / [DEL]', true],
        ['Container no.', val(inv.cntr, '[Container no.]'), true], [party, '[' + party + ' name]', false], ['Cargo gross weight', '[Weight]', true]],
      cols: ['Description', 'Schedule', 'Ccy', 'Amount'], lines: lines,
      qr: qrCells(inv.no || 'x'), regime: cty ? cty.regime : '[E-invoice regime]',
      qrRef: inv.gov && inv.gov !== '—' ? inv.gov : (cc === 'IN' ? 'IRN: [64-char hash]' : '[Clearance reference]'),
      totals: totals,
      foot: [['Bank account details', '[Local-currency account] · [USD account]', true], ['Issued by', '[User ID]', true],
        ['Late payment notification', '[Late payment wording · interest as configured]', false], ['Agency mandatory text', '[Agency-specific mandatory text]', false],
        ['Terms & conditions', '[T&C link]', false, true]]
    };
  }

  // ---------------------------------------------------------------- receipt model
  // The previewer has no receipt template, so the receipt uses the same header and styling with receipt fields only.
  // rc: { no, date, inv, bl, amt, cur, port, cust: { code, name, tax }, items?: [{ inv, bl, cur, amt }] }
  function receiptModel(rc) {
    var cust = rc.cust || {}, items = rc.items || [{ inv: rc.inv, bl: rc.bl, cur: rc.cur, amt: rc.amt }];
    var per = {}, order = [];
    items.forEach(function (x) { if (!(x.cur in per)) { per[x.cur] = 0; order.push(x.cur); } per[x.cur] += x.amt; });
    return {
      kind: 'receipt', no: rc.no, file: 'Receipt-' + String(rc.inv || rc.no).replace(/[^A-Za-z0-9-]/g, ''),
      carrier: 'Pacific International Lines', carrierSub: '[Local company name & address]', title: 'Receipt', ref: null,
      taxIds: [['Tax ID — Corporate HQ', '[HQ tax registration no.]']],
      billed: [['', val(cust.name, '[Customer]'), false], ['', 'Customer code: ' + val(cust.code, '[Customer code]'), true, true], ['', val(cust.tax, '[Customer tax ID]'), true, true]],
      billedLabel: 'Received from',
      grid: [['Receipt date', val(rc.date, '[Date]'), true], ['Invoice no.', val(rc.inv, '[Invoice no.]'), true], ['B/L #', val(rc.bl, '[B/L no.]'), true]],
      cols: ['Invoice no.', 'B/L #', 'Ccy', 'Amount received'],
      lines: items.map(function (x) { return { desc: x.inv || '—', sched: x.bl || '—', ccy: x.cur, amt: f2(x.amt), mono: true }; }),
      qr: null, totals: order.map(function (c, k) { return { label: 'Total received ' + c, val: f2(per[c]), bold: true, rule: k === 0 }; }),
      foot: [['Issued by', '[User ID]', true]]
    };
  }

  // ---------------------------------------------------------------- screen renderer (mirrors the previewer's paper)
  var CSS = [
    '.gd-paper,.gd-paper *{box-sizing:border-box;letter-spacing:normal}',
    '.gd-scrim{position:fixed;inset:0;z-index:200;background:rgba(14,17,22,.62);display:flex;flex-direction:column;align-items:center;font-family:"IBM Plex Sans",system-ui,sans-serif}',
    '.gd-bar{width:100%;box-sizing:border-box;display:flex;align-items:center;gap:8px;padding:10px 20px;background:#161A21;color:#fff;flex:none}',
    '.gd-bar .t{font-weight:600;font-size:14px;margin-right:auto;display:flex;gap:10px;align-items:baseline;min-width:0}',
    '.gd-bar .t span{font-family:"IBM Plex Mono",monospace;font-weight:500;color:#C3CAD5;font-size:13px}',
    '.gd-btn{height:32px;padding:0 14px;border-radius:6px;border:1px solid #3A4350;background:#232A34;color:#fff;font:500 13px "IBM Plex Sans",sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}',
    '.gd-btn:hover{background:#2C333E}.gd-btn.p{background:#0071B7;border-color:#0071B7}.gd-btn.p:hover{background:#005C96}',
    '.gd-btn:focus-visible,.gd-x:focus-visible{outline:2px solid #5AB0E8;outline-offset:2px}',
    '.gd-x{width:32px;height:32px;border-radius:6px;border:0;background:transparent;color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.gd-x:hover{background:#2C333E}',
    '.gd-scroll{flex:1;overflow:auto;width:100%;padding:24px;box-sizing:border-box;background:#E4E7EC;display:flex;justify-content:center;align-items:flex-start}',
    // paper: same as invoice-previewer .paper (light surface, 820 max, padding 28/40, gap 16)
    '.gd-paper{width:100%;max-width:820px;min-width:640px;background:#fff;color:#161A21;box-shadow:0 1px 3px rgba(22,26,33,.12),0 8px 24px rgba(22,26,33,.08);padding:28px 40px;display:flex;flex-direction:column;gap:16px;font-size:13px;line-height:20px}',
    '.gd-paper .k{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#5A6170;font-weight:600;line-height:16px}',
    '.gd-paper .mono{font-family:"IBM Plex Mono",ui-monospace,monospace}.gd-paper .mu{color:#5A6170}',
    '.gd-hd{display:flex;justify-content:space-between;gap:24px;align-items:flex-start}',
    '.gd-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}',
    '.gd-gs{display:grid;grid-template-columns:232px minmax(0,1fr);gap:16px;border-top:1px solid #ECEEF2;border-bottom:1px solid #ECEEF2;padding:16px 0}',
    '.gd-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 12px;align-content:start}',
    '.gd-paper table{width:100%;border-collapse:separate;border-spacing:0;table-layout:auto}',
    '.gd-paper th{position:static;height:auto;background:none;font-size:12px;text-transform:uppercase;letter-spacing:.04em;padding:8px 10px;border-bottom:1px solid #C9CED6;text-align:start;font-weight:600;color:#5A6170;white-space:nowrap}',
    '.gd-paper td{height:auto;padding:9px 10px;vertical-align:top;border-bottom:1px solid #ECEEF2;white-space:normal;text-align:start}',
    '.gd-paper tbody tr:hover td{background:none}.gd-paper .r{text-align:end}',
    '.gd-bt{display:flex;justify-content:space-between;gap:24px;align-items:flex-end}',
    '.gd-qr{width:105px;height:105px;display:grid;grid-template-columns:repeat(21,minmax(0,1fr));border:4px solid #fff;outline:1px solid #ECEEF2}',
    '.gd-tot{min-width:280px;display:flex;flex-direction:column;gap:6px}.gd-tot>div{display:flex;justify-content:space-between;gap:16px;font-size:13px}',
    '.gd-ft{border-top:1px solid #ECEEF2;padding-top:16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 24px;font-size:12px;line-height:16px}',
    '@media (max-width:760px){.gd-scroll{padding:12px}}'
  ].join('');

  function paperHtml(m) {
    var h = '';
    h += '<div class="gd-hd"><div style="display:flex;flex-direction:column;gap:6px"><div style="font-size:18px;font-weight:700;letter-spacing:.02em">' + esc(m.carrier) + '</div><div style="font-size:12px" class="mu">' + esc(m.carrierSub) + '</div></div>' +
      '<div style="text-align:end;display:flex;flex-direction:column;gap:4px"><div style="font-size:20px;font-weight:700">' + esc(m.title) + '</div><div class="mono" style="font-size:13px">' + esc(m.no) + '</div>' +
      (m.ref ? '<div class="mono mu" style="font-size:12px">Ref. invoice: ' + esc(m.ref) + '</div>' : '') + '</div></div>';
    h += '<div class="gd-g2">' + m.taxIds.map(function (t) { return '<div><span class="k">' + esc(t[0]) + '</span><div class="mono" style="font-size:13px;margin-top:4px">' + esc(t[1]) + '</div></div>'; }).join('') + '</div>';
    h += '<div class="gd-gs"><div style="display:flex;flex-direction:column;gap:4px"><span class="k">' + esc(m.billedLabel || 'Billed to') + '</span>' +
      m.billed.map(function (b) { return (b[0] ? '<span class="k" style="margin-top:8px">' + esc(b[0]) + '</span>' : '') + '<span class="' + (b[2] ? 'mono ' : '') + (b[3] ? 'mu' : '') + '" style="font-size:' + (b[2] ? 12 : 13) + 'px">' + esc(b[1]) + '</span>'; }).join('') + '</div>' +
      '<div class="gd-g3">' + m.grid.map(function (g) { return '<div style="padding:2px"><span class="k">' + esc(g[0]) + '</span><div class="' + (g[2] ? 'mono' : '') + '" style="font-size:12px;margin-top:2px">' + esc(g[1]) + '</div></div>'; }).join('') + '</div></div>';
    h += '<div style="padding:4px"><table><thead><tr>' + m.cols.map(function (c, i) { return '<th class="' + (i === 3 ? 'r' : '') + '">' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      m.lines.map(function (l) { return '<tr><td class="' + (l.mono ? 'mono' : '') + '" style="font-size:13px">' + esc(l.desc) + '</td><td class="' + (l.mono ? 'mono ' : '') + 'mu" style="font-size:12px">' + esc(l.sched) + '</td><td class="mono" style="font-size:13px">' + esc(l.ccy) + '</td><td class="mono r" style="font-size:13px">' + esc(l.amt) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    var qr = m.qr ? '<div style="display:flex;gap:16px;align-items:flex-end"><div class="gd-qr" role="img" aria-label="Statutory QR code placeholder">' + m.qr.map(function (q) { return '<span style="background:' + (q ? '#161A21' : '#fff') + '"></span>'; }).join('') + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:4px"><span class="k">Statutory QR</span><span style="font-size:13px;font-weight:600">' + esc(m.regime) + '</span><span class="mono mu" style="font-size:12px">' + esc(m.qrRef) + '</span></div></div>' : '<div></div>';
    h += '<div class="gd-bt">' + qr + '<div class="gd-tot"><div class="k" style="display:block">' + (m.kind === 'receipt' ? 'Totals' : 'Tax breakdown &amp; totals') + '</div>' +
      m.totals.map(function (t) { return '<div style="' + (t.bold ? 'font-weight:600;' : '') + (t.rule ? 'border-top:1px solid #C9CED6;padding-top:6px' : '') + '"><span>' + esc(t.label) + '</span><span class="mono">' + esc(t.val) + '</span></div>'; }).join('') + '</div></div>';
    h += '<div class="gd-ft">' + m.foot.map(function (f) { return '<div' + (f[3] ? ' style="grid-column:span 2"' : '') + '><span class="k">' + esc(f[0]) + '</span><div class="' + (f[1] && f[2] ? 'mono' : 'mu') + '" style="margin-top:4px' + (f[3] ? ';color:#0071B7;text-decoration:underline' : '') + '">' + esc(f[1]) + '</div></div>'; }).join('') + '</div>';
    return '<article class="gd-paper" aria-label="' + esc(m.title) + ' ' + esc(m.no) + '">' + h + '</article>';
  }

  var openEl = null, lastFocus = null;
  function close() {
    if (!openEl) return;
    openEl.remove(); openEl = null; document.removeEventListener('keydown', onKey, true);
    try { if (lastFocus && lastFocus.focus) lastFocus.focus(); } catch (e) {}
  }
  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === 'Tab' && openEl) {
      var f = openEl.querySelectorAll('button'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  function ensureCss() { var s = document.getElementById('gd-css'); if (!s) { s = document.createElement('style'); s.id = 'gd-css'; document.head.appendChild(s); } s.textContent = CSS; }

  function show(m, opts) {
    opts = opts || {};
    ensureCss(); close();
    lastFocus = document.activeElement;
    var label = m.kind === 'receipt' ? 'Receipt' : (m.kind === 'credit' ? 'Credit note' : 'Invoice');
    var el = document.createElement('div');
    el.className = 'gd-scrim'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', label + ' ' + m.no);
    el.innerHTML = '<div class="gd-bar"><div class="t">' + label + '<span>' + esc(m.no) + '</span></div>' +
      (opts.json ? '<button class="gd-btn" data-a="json">Download JSON</button>' : '') +
      '<button class="gd-btn" data-a="print">Print</button>' +
      '<button class="gd-btn p" data-a="pdf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Download PDF</button>' +
      '<button class="gd-x" data-a="close" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="gd-scroll">' + paperHtml(m) + '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-a]') : null;
      if (!b) { if (e.target === el || e.target.classList.contains('gd-scroll')) close(); return; }
      var a = b.getAttribute('data-a');
      if (a === 'close') close();
      else if (a === 'pdf') { download([m]); if (opts.onDone) opts.onDone(m.file + '.pdf downloaded'); }
      else if (a === 'json') { saveFile(m.file + '.json', JSON.stringify(opts.json, null, 2), 'application/json'); if (opts.onDone) opts.onDone(m.file + '.json downloaded'); }
      else if (a === 'print') printDoc(m);
    });
    document.body.appendChild(el); openEl = el;
    document.addEventListener('keydown', onKey, true);
    var pdfBtn = el.querySelector('[data-a="pdf"]'); if (pdfBtn) pdfBtn.focus();
  }
  function printDoc(m) {
    try {
      var w = window.open('', '_blank'); if (!w) return;
      w.document.write('<!doctype html><title>' + esc(m.file) + '</title><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><style>' + CSS +
        'body{margin:0;font-family:"IBM Plex Sans",sans-serif}.gd-paper{box-shadow:none;max-width:none;min-width:0}@page{size:A4;margin:12mm}</style>' + paperHtml(m));
      w.document.close(); setTimeout(function () { w.focus(); w.print(); }, 500);
    } catch (e) {}
  }

  // ---------------------------------------------------------------- PDF writer (Helvetica, WinAnsi)
  var HW = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  var HB = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
  var WIN = { '—': [151, 1000], '–': [150, 556], '·': [183, 278], '×': [215, 584], '’': [146, 222], '‘': [145, 222], '•': [149, 350] };
  function winChar(ch) {
    var c = ch.charCodeAt(0); if (c >= 32 && c < 127) return [c, null];
    if (ch === '→') return ['->', 917]; if (ch === '−') return [45, 333];
    var w = WIN[ch]; return w ? [w[0], w[1]] : [63, 556];
  }
  function width(str, bold, size) {
    var t = bold ? HB : HW, w = 0; str = String(str);
    for (var i = 0; i < str.length; i++) { var c = str.charCodeAt(i); w += (c >= 32 && c < 127) ? t[c - 32] : winChar(str[i])[1]; }
    return w * size / 1000;
  }
  function pdfStr(str) {
    var out = ''; str = String(str);
    for (var i = 0; i < str.length; i++) {
      var x = winChar(str[i]), c = x[0];
      if (c === '->') { out += '->'; continue; }
      if (c === 40 || c === 41 || c === 92) out += '\\' + String.fromCharCode(c);
      else if (c >= 32 && c < 127) out += String.fromCharCode(c);
      else out += '\\' + ('00' + c.toString(8)).slice(-3);
    }
    return '(' + out + ')';
  }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255].map(function (v) { return v.toFixed(3); }).join(' '); }
  function wrap(text, bold, size, maxW) {
    var words = String(text).split(' '), lines = [], cur = '';
    words.forEach(function (w) { var t = cur ? cur + ' ' + w : w; if (width(t, bold, size) > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur); return lines.length ? lines : [''];
  }

  var PH = 842, PW = 595;
  function Page() { this.ops = []; }
  Page.prototype.text = function (x, y, s, o) {
    o = o || {}; var size = o.size || 9, bold = !!o.bold, w = width(s, bold, size);
    if (o.align === 'r') x -= w;
    this.ops.push('BT ' + rgb(o.color || '#161A21') + ' rg /' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf ' + x.toFixed(2) + ' ' + (PH - y).toFixed(2) + ' Td ' + pdfStr(s) + ' Tj ET');
    return w;
  };
  Page.prototype.rect = function (x, y, w, h, fill) { this.ops.push(rgb(fill) + ' rg ' + x.toFixed(2) + ' ' + (PH - y - h).toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re f'); };
  Page.prototype.line = function (x1, y1, x2, y2, color, lw) { this.ops.push('q ' + rgb(color || '#ECEEF2') + ' RG ' + (lw || 0.75) + ' w ' + x1.toFixed(2) + ' ' + (PH - y1).toFixed(2) + ' m ' + x2.toFixed(2) + ' ' + (PH - y2).toFixed(2) + ' l S Q'); };

  // A4, points. Proportions follow the previewer paper (820px wide → 515pt content).
  var K = { size: 7, bold: true, color: '#5A6170' }; // .k label
  function kText(p, x, y, s) { p.text(x, y, s.toUpperCase(), K); }
  function drawDoc(m) {
    var pages = [], p = new Page(), L = 40, R = PW - 40, W = R - L, y;
    pages.push(p);
    // header
    p.text(L, 52, m.carrier, { size: 13.5, bold: true });
    p.text(L, 66, m.carrierSub, { size: 8, color: '#5A6170' });
    p.text(R, 52, m.title, { size: 15, bold: true, align: 'r' });
    p.text(R, 67, m.no, { size: 9.5, align: 'r' });
    if (m.ref) p.text(R, 79, 'Ref. invoice: ' + m.ref, { size: 8.5, color: '#5A6170', align: 'r' });
    // tax IDs
    y = 98;
    m.taxIds.forEach(function (t, i) { var x = L + i * (W / 2 + 6); kText(p, x, y, t[0]); p.text(x, y + 13, t[1], { size: 9.5 }); });
    // billed-to + shipment grid between rules
    y = 128; p.line(L, y, R, y);
    var bx = L, gx = L + 174 + 12, gw = (R - gx - 18) / 3, by = y + 16;
    kText(p, bx, by, m.billedLabel || 'Billed to'); by += 13;
    m.billed.forEach(function (b) {
      if (b[0]) { by += 6; kText(p, bx, by, b[0]); by += 12; }
      wrap(b[1], false, b[2] ? 8.5 : 9.5, 170).forEach(function (t) { p.text(bx, by, t, { size: b[2] ? 8.5 : 9.5, color: b[3] ? '#5A6170' : '#161A21' }); by += 12; });
    });
    var gy = y + 16, rowH = 30;
    m.grid.forEach(function (g, i) {
      var cx = gx + (i % 3) * (gw + 9), cy = gy + Math.floor(i / 3) * rowH;
      kText(p, cx, cy, g[0]);
      p.text(cx, cy + 12, wrap(g[1], false, 8.5, gw)[0], { size: 8.5 });
    });
    y = Math.max(by, gy + Math.ceil(m.grid.length / 3) * rowH) + 4;
    p.line(L, y, R, y);
    // lines table
    y += 18;
    var cx = [L + 3, L + 200, L + 395, R - 3];
    kText(p, cx[0], y, m.cols[0]); kText(p, cx[1], y, m.cols[1]); kText(p, cx[2], y, m.cols[2]);
    p.text(cx[3], y, m.cols[3].toUpperCase(), { size: 7, bold: true, color: '#5A6170', align: 'r' });
    y += 7; p.line(L, y, R, y, '#C9CED6');
    m.lines.forEach(function (l) {
      if (y > PH - 250) { p = new Page(); pages.push(p); y = 48; }
      var d = wrap(l.desc, false, 9.5, 190), s = wrap(l.sched, false, 8.5, 185), n = Math.max(d.length, s.length);
      for (var k = 0; k < n; k++) {
        if (d[k]) p.text(cx[0], y + 16 + k * 12, d[k], { size: 9.5 });
        if (s[k]) p.text(cx[1], y + 16 + k * 12, s[k], { size: 8.5, color: '#5A6170' });
      }
      p.text(cx[2], y + 16, l.ccy, { size: 9.5 }); p.text(cx[3], y + 16, l.amt, { size: 9.5, align: 'r' });
      y += 24 + (n - 1) * 12; p.line(L, y, R, y);
    });
    // QR + totals
    y += 20;
    var tw = 210, tx = R - tw, ty = y;
    kText(p, tx, ty, m.kind === 'receipt' ? 'Totals' : 'Tax breakdown & totals'); ty += 16;
    m.totals.forEach(function (t) {
      if (t.rule) { ty += 2; p.line(tx, ty - 9, R, ty - 9, '#C9CED6'); ty += 4; }
      p.text(tx, ty, t.label, { size: 9.5, bold: !!t.bold }); p.text(R, ty, t.val, { size: 9.5, bold: !!t.bold, align: 'r' }); ty += 15;
    });
    var qh = 0;
    if (m.qr) {
      var qs = 72, cell = qs / 21, qy = Math.max(ty - qs - 6, y - 4);
      for (var i = 0; i < m.qr.length; i++) if (m.qr[i]) p.rect(L + (i % 21) * cell, qy + Math.floor(i / 21) * cell, cell + 0.05, cell + 0.05, '#161A21');
      kText(p, L + qs + 12, qy + qs - 30, 'Statutory QR');
      p.text(L + qs + 12, qy + qs - 16, m.regime, { size: 9.5, bold: true });
      p.text(L + qs + 12, qy + qs - 3, m.qrRef, { size: 8.5, color: '#5A6170' });
      qh = qy + qs;
    }
    y = Math.max(ty, qh) + 14;
    // footer blocks
    p.line(L, y, R, y); y += 18;
    var colW = (W - 24) / 2;
    m.foot.forEach(function (f, i) {
      var full = !!f[3], x = full || i % 2 === 0 ? L : L + colW + 24;
      kText(p, x, y, f[0]);
      p.text(x, y + 13, f[1], { size: 8.5, color: full ? '#0071B7' : (f[2] ? '#161A21' : '#5A6170') });
      if (full || i % 2 === 1 || i === m.foot.length - 1) y += 34;
    });
    return pages;
  }

  function buildPdf(models, title) {
    var pages = []; models.forEach(function (m) { pages = pages.concat(drawDoc(m)); });
    var enc = function (s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; };
    var objs = [], add = function (s) { objs.push(enc(s)); };
    var first = 6, kids = []; for (var i = 0; i < pages.length; i++) kids.push((first + i * 2) + ' 0 R');
    add('<< /Type /Catalog /Pages 2 0 R >>');
    add('<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + pages.length + ' >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    var d = new Date(), pad = function (n) { return ('0' + n).slice(-2); };
    add('<< /Title ' + pdfStr(title) + ' /Producer (GIRS prototype) /CreationDate (D:' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + '00) >>');
    pages.forEach(function (pg, n) {
      var content = pg.ops.join('\n');
      add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + (first + n * 2 + 1) + ' 0 R >>');
      add('<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');
    });
    var chunks = [enc('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')], off = chunks[0].length, xref = [];
    objs.forEach(function (o, n) {
      xref.push(off);
      var head = enc((n + 1) + ' 0 obj\n'), tail = enc('\nendobj\n');
      chunks.push(head, o, tail); off += head.length + o.length + tail.length;
    });
    chunks.push(enc('xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + xref.map(function (o) { return ('000000000' + o).slice(-10) + ' 00000 n \n'; }).join('') +
      'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R /Info 5 0 R >>\nstartxref\n' + off + '\n%%EOF\n'));
    return new Blob(chunks, { type: 'application/pdf' });
  }

  function saveFile(name, data, type) {
    try {
      var b = data instanceof Blob ? data : new Blob([data], { type: type });
      var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    } catch (e) {}
  }
  function download(models, name) { var file = name || models[0].file; saveFile(file + '.pdf', buildPdf(models, file), 'application/pdf'); }

  window.GirsDocs = {
    invoice: function (inv, opts) { show(invoiceModel(inv), opts); },
    receipt: function (rc, opts) { show(receiptModel(rc), opts); },
    invoicePdf: function (list, name) { list = [].concat(list); download(list.map(invoiceModel), name); },
    receiptPdf: function (rc) { download([receiptModel(rc)]); },
    json: function (name, obj) { saveFile(name + '.json', JSON.stringify(obj, null, 2), 'application/json'); },
    close: close
  };
})();
