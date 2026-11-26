/* Shared credit note data for pages that show credit notes outside the Credit Note List
   (same sample data and merge rules as credit-note-list.html). */
(function () {
  const ME = 'Daniel Tan';
  function all() {
    const L = (c, n, a, t, r, cu) => [c, n, a, t, r, cu];
    const SEED = [
      { no: 'SINOF2600341CR', orig: 'SINOF2602298', party: 'Straits Harbour Logistics (SG)', src: 'Auto', reason: 'FCA approval', ref: 'FCA-26-0158', date: '20 Nov 2026', by: 'GIRS rule BR-CRN-003',
        lines: [L('OFT', 'Ocean Freight', 5200, 'ZR-INTL', 0, 'USD'), L('THC-O', 'Origin THC', 920, 'SG-SR-9', 9, 'SGD')], status: 'Generated', gfs: 'JV-SG-26-118402', repl: 'SINOF2602437', steps: { val: 'done', cxl: 'done', cn: 'done', inv: 'done', gfs: 'done' } },
      { no: 'SINOD2600311CR', orig: 'SINOD2602150', party: 'Straits Harbour Logistics (MY)', src: 'Auto', reason: 'DAR waiver', ref: 'DAR-26-0087', date: '18 Nov 2026', by: 'DAR workflow',
        lines: [L('DEM', 'Demurrage', 4200, 'SG-SR-9', 9, 'SGD')], status: 'Generated', gfs: 'JV-SG-26-118377', repl: '', steps: { val: 'done', cxl: 'done', cn: 'done', gfs: 'done' } },
      { no: 'PKGOF2600045CR', orig: 'PKGOF2600917', party: 'Kinabalu Home Furnishings (MY)', src: 'Auto', reason: 'FCA approval', ref: 'FCA-26-0151', date: '20 Nov 2026', by: 'GIRS rule BR-CRN-003',
        lines: [L('OFT', 'Ocean Freight', 1650, 'MY-SST-8', 8, 'USD')], status: 'Exception', gfs: '', repl: '', steps: { val: 'fail' },
        exc: 'Revised charges for BL-MY-24003 not received from LMS. The credit note and new invoice can\'t be generated until LMS sends them.' },
      { no: 'SINOF2600347CR', orig: 'SINOF2602281', party: 'Meridian Agro Exports (SG)', src: 'Auto', reason: 'FCA approval', ref: 'FCA-26-0160', date: '19 Nov 2026', by: 'GIRS rule BR-CRN-003',
        lines: [L('OFT', 'Ocean Freight', 62400, 'ZR-INTL', 0, 'USD')], status: 'Exception', gfs: '', repl: '', steps: { val: 'done', cxl: 'done', cn: 'done', inv: 'done', gfs: 'fail' },
        exc: 'GFS posting failed: accounting period 2026-11 is closed for entity PIL-SG. Credit note and new invoice are created but not yet posted.' },
      { no: 'NSAOF2600071CR', orig: 'NSAOF2601044', party: 'Straits Harbour Logistics (IN)', src: 'Manual', reason: 'Invoice amendment', ref: '', file: 'Corrected-billing-party-IN-300552.pdf', date: '12 Nov 2026', by: 'Priya Nair',
        lines: [L('OFT', 'Ocean Freight', 980, 'IN-GST-18', 18, 'USD'), L('DOC', 'Documentation', 220, 'IN-GST-18', 18, 'INR')], status: 'Generated', gfs: 'JV-IN-26-084415', repl: 'NSAOF2601062', remark: 'Billing party should be the consignee, confirmed by customer service.',
        appr: [['L1 · Agency Finance', 'Rahul Mehta', 'Approved', '12 Nov 2026 14:10', ''], ['L2 · Finance Approver', 'Thushy (PIL)', 'Approved', '12 Nov 2026 16:42', 'OK']] },
      { no: 'SINOF2600329CR', orig: 'SINOF2602405', party: 'Meridian Agro Exports (SG)', src: 'Manual', reason: 'Pricing correction', ref: '', file: 'RFA-SGLB260031-agreed-rate.pdf', date: '14 Nov 2026', by: 'Daniel Tan',
        lines: [L('OFT', 'Ocean Freight', 3200, 'ZR-INTL', 0, 'USD')], status: 'Generated', gfs: 'JV-SG-26-118120', repl: 'SINOF2602412', remark: 'Spot rate billed instead of the RFA rate.',
        appr: [['L1 · Agency Finance', 'Mei Lin Ong', 'Approved', '14 Nov 2026 11:05', ''], ['L2 · Finance Approver', 'Thushy (PIL)', 'Approved', '14 Nov 2026 15:30', '']] },
      { no: 'SINOF2600324CR', orig: 'SINOF2602401', party: 'Straits Harbour Logistics (SG)', src: 'Manual', reason: 'Pricing correction', ref: '', file: 'Contract-rate-SG-100231.pdf', date: '20 Nov 2026', by: 'Daniel Tan',
        lines: [L('OFT', 'Ocean Freight', 1850, 'ZR-INTL', 0, 'USD'), L('BAF', 'Bunker Adjustment Factor', 320, 'ZR-INTL', 0, 'USD'), L('THC-O', 'Origin THC', 305, 'SG-SR-9', 9, 'SGD')], status: 'Pending approval', remark: 'BAF billed at the old quarter rate.',
        appr: [['L1 · Agency Finance', 'Mei Lin Ong', 'Approved', '20 Nov 2026 10:12', 'Checked against Charge Master'], ['L2 · Finance Approver', 'Thushy (PIL)', 'Pending', '', '']] },
      { no: 'LCHOD2600012CR', orig: 'LCHOD2600198', party: 'Andaman Bay Traders (TH)', src: 'Manual', reason: 'Invoice amendment', ref: '', file: 'Consignee-change-request.eml', date: '13 Nov 2026', by: 'Somchai P.',
        lines: [L('DET', 'Detention', 1440, 'TH-VAT-7', 7, 'THB')], status: 'Rejected', remark: '',
        appr: [['L1 · Agency Finance', 'Niran K.', 'Rejected', '13 Nov 2026 17:20', 'Consignee change is not approved by the shipper. Raise again with the shipper\'s confirmation.'], ['L2 · Finance Approver', '—', 'Not reached', '', '']] },
      { no: 'NSAOF2600078CR', orig: 'NSAOF2601051', party: 'Orchid Lane Polymers (IN)', src: 'Manual', reason: 'Invoice amendment', ref: '', file: '', date: '19 Nov 2026', by: 'Daniel Tan',
        lines: [L('OFT', 'Ocean Freight', 1500, 'IN-GST-18', 18, 'USD')], status: 'Draft', remark: '' }
    ];
    let extra = [];
    try { extra = (JSON.parse(localStorage.getItem('girs.cn.v1') || '[]') || []).filter((c) => c && c.no); } catch (e) {}
    const fromPopup = extra.filter((c, i, a) => a.findIndex((y) => y.no === c.no) === i && !SEED.some((y) => y.no === c.no)).map((c) => ({
      no: c.no, orig: c.orig, party: c.party || '—', src: c.src || 'Manual', reason: c.reason, ref: c.ref && c.ref !== '—' ? c.ref : '', file: c.file || '', date: c.date || '', by: c.by || ME, remark: c.remark || '',
      lines: Array.isArray(c.lines) && c.lines.length && Array.isArray(c.lines[0]) ? c.lines : [L('—', 'Invoice total', c.amount || 0, (c.taxrev || '—').split(' · ')[0], 0, c.cur || 'USD')],
      status: c.appr === 'Approved' ? 'Generated' : (c.appr || 'Pending approval'), appr: [['L1 · Agency Finance', 'Mei Lin Ong', 'Pending', '', ''], ['L2 · Finance Approver', 'Thushy (PIL)', 'Not reached', '', '']] }));
    let local = {};
    try { local = JSON.parse(localStorage.getItem('girs.cnl.v2') || '{}') || {}; } catch (e) {}
    return fromPopup.concat(SEED).map((r) => { const o = local[r.no]; return o ? Object.assign({}, r, o) : r; });
  }
  function flowOf(r) {
      const auto = r.src === 'Auto', fca = r.reason === 'FCA approval', repl = auto ? fca : !!r.repl || r.status === 'Pending approval' && (fca || r.reason === 'Pricing correction' || r.reason === 'Invoice amendment');
      const st = r.steps || {};
      const done = r.status === 'Generated';
      const S = auto ? [['trg', 'Trigger received', (fca ? 'FCA ' : 'DAR waiver ') + r.ref + ' from ' + (fca ? 'LMS' : 'DAR workflow')], ['val', 'Data check', 'Revised charges, ROE and tax from the original invoice'],
          ['cxl', 'Original invoice cancelled', r.orig], ['cn', 'Credit note generated', r.no]].concat(fca ? [['inv', 'New invoice generated', r.repl || 'With the revised charges · UN-PAID']] : []).concat([['gfs', 'Posted to GFS', r.gfs || 'AR credit']])
        : [['req', 'Requested', 'By ' + r.by + (r.date ? ' · ' + r.date : '')], ['l1', 'L1 approval', 'Agency Finance'], ['l2', 'L2 approval', 'Finance Approver'], ['cn', 'Credit note generated', r.no]]
          .concat(repl ? [['inv', 'Replacement invoice', r.repl || 'Generated after approval']] : []).concat([['gfs', 'Posted to GFS', r.gfs || 'AR credit']]);
      const ap = r.appr || [];
      return S.map(([k, t, d]) => {
        let state = 'wait';
        if (auto) state = k === 'trg' ? 'done' : (st[k] || (done ? 'done' : 'wait'));
        else if (k === 'req') state = r.status === 'Draft' ? 'wait' : 'done';
        else if (k === 'l1' || k === 'l2') { const a = ap[k === 'l1' ? 0 : 1]; state = !a ? (done ? 'done' : 'wait') : a[2] === 'Approved' ? 'done' : a[2] === 'Rejected' ? 'fail' : a[2] === 'Pending' ? 'now' : 'wait'; }
        else state = done ? 'done' : 'wait';
        if (r.status === 'Exception' && state === 'fail') d = r.exc;
        return { t, d, cls: 'fl-' + state, mk: state === 'done' ? '✓' : state === 'fail' ? '!' : state === 'now' ? '…' : '' };
      });
    
  }
  window.GirsCN = { all, flowOf,
    STL: { 'Generated': 'Generated · posted', 'Exception': 'Needs action', 'Pending approval': 'Pending approval', 'Rejected': 'Rejected', 'Draft': 'Draft' } };
})();
