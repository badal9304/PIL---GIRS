#!/usr/bin/env python3
"""Move prototype screens onto the approved UI components (girs-ui.css, see ui-kit.html).
Swaps duplicate component classes for the standard ones, drops the CSS rules nothing uses any more,
and links girs-ui.css in every screen. Safe to run more than once."""
import glob
import re

LINK = '<link rel="stylesheet" href="girs-ui.css">'

# class-attribute rewrites (whole class lists, so modifiers stay right)
ALL = [
    ('kmodal sm', 'dlg'), ('kmodal', 'dlg wide'), ('kdrawer', 'dlg wide'),
    ('khead', 'dh'), ('kbody', 'db'), ('kfoot', 'df'), ('kback', 'ov'),
    ('kbanner err', 'banner b-block'), ('kbanner', 'banner b-info'),
    ('pill', 'chip'), ('seg2', 'seg'), ('msel-n', 'count on'),
]
HOME = [
    ('hm-tc', 'count'), ('hm-note ok', 'banner b-ok'), ('hm-note warn', 'banner b-warn'), ('btn btn-icon btn-sm hm-nx', 'btn btn-icon btn-sm x'),
    ('hm-chip', 'chipb'), ('hm-chips', 'chips'), ('hm-seg sm', 'seg sm'), ('hm-seg', 'seg'),
    ('hm-srch wide', 'search wide'), ('hm-srch', 'search'), ('hm-empty', 'empty'), ('hm-dpg', 'pager hm-pp'),
    ('hm-drw', 'panel'), ('hm-dh', 'panel-h'), ('hm-db', 'panel-b'),
    ('cmc-bd', 'scrim'),
    ('cmc-modal hm-cfm', 'dlg dim hm-cfm'), ('cmc-modal hm-mail', 'dlg wide dim hm-mail'), ('cmc-modal hm-rim', 'dlg doc dim hm-rim'),
    ('cmc-mh', 'dh'), ('cmc-mb', 'db'),
]
MASTER = [  # Charge Master v2 and Bank Master
    ('bm1-srch', 'search'), ('bm-empty', 'empty'), ('cm2-empty', 'empty'),
    ('cmc-bd', 'scrim'), ('cmc-modal bm-pm', 'dlg dim bm-pm'), ('cmc-modal', 'dlg full dim'),
    ('cmc-mh', 'dh'), ('cmc-mb', 'db'), ('cmc-mf', 'df'),
]


def swap_classes(html, pairs):
    mp = dict(pairs)

    def fix(m):
        v = m.group(2)
        return m.group(1) + mp.get(v, v) + m.group(3)
    return re.sub(r'(class=")([^"{}]*)(")', fix, html)


def drop_rules(html, dead):
    """Remove CSS rules whose selector only targets classes in `dead` (they no longer appear anywhere)."""
    a, b = html.find('<style>') + 7, html.find('</style>')
    css = html[a:b]

    def keep(m):
        sel = m.group(1)
        cls = set(re.findall(r'\.([A-Za-z][\w-]*)', sel))
        return '' if cls and cls & dead and all(c in dead or c in ('theme', 'on', 'sm', 'err', 'ok', 'warn', 'info', 'done', 'E', 'I', 'wide', 'lg') for c in cls) else m.group(0)
    css = re.sub(r'([^{}]+)\{[^{}]*\}\n?', keep, css)
    return html[:a] + css + html[b:]


def link(html):
    # after the screen's own <style>, so the approved versions win
    html = html.replace(LINK + '\n', '')
    i = html.find('</style>')
    return html[:i + 8] + '\n' + LINK + html[i + 8:] if i > 0 else html


def segs(html):
    # master screens built segmented controls from single .seg buttons with inline colours
    html = re.sub(r'<div role="radiogroup"([^>]*?) style="[^"]*">(\s*(?:<sc-for[^>]*>)?\s*<button class="seg" role="radio")', r'<div class="seg" role="radiogroup"\1>\2', html)
    html = re.sub(r'<button class="seg" role="radio"( aria-checked="[^"]*")([^>]*?) style="[^"]*">', r'<button role="radio"\1\2>', html)
    return html


def home(s):
    s = swap_classes(s, HOME)
    # drawer footer is a panel footer; dialog footers are .df
    i = s.find('<aside class="panel"')
    j = s.find('</aside>', i)
    s = s[:i] + s[i:j].replace('class="cmc-mf"', 'class="panel-f"') + s[j:]
    s = s.replace('class="cmc-mf hm-rif"', 'class="df hm-rif"').replace('class="cmc-mf"', 'class="df"')
    s = s.replace('class="btn btn-icon btn-sm" aria-label="Dismiss"', 'class="btn btn-icon btn-sm x" aria-label="Dismiss"')
    # status / type tags from the view-model
    s = s.replace("['Invoiced', 'done']", "['Invoiced', 'neutral']").replace("invoiced: ['Invoiced', 'done']", "invoiced: ['Invoiced', 'neutral']")
    s = s.replace("'hm-ss ' + ", "'chip t-' + ").replace("'hm-type ' + v.dir", "'chip t-neutral dot-' + v.dir.toLowerCase()")
    s = s.replace("'hm-type ' + dv.dir", "'chip t-neutral dot-' + dv.dir.toLowerCase()").replace("'hm-type ' + c.dir", "'chip t-neutral dot-' + c.dir.toLowerCase()")
    s = s.replace("'hm-ss ' + HM_BLST[k][1]", "'chip t-' + HM_BLST[k][1]")
    # stacking of dialogs opened above the side panel (they used to carry it in their own rules)
    s = re.sub(r'( style="z-index: \d+")+', '', s)  # re-added below
    s = s.replace('class="panel" role="dialog"', 'class="panel" style="z-index: 201" role="dialog"')
    s = s.replace('class="dlg dim hm-cfm"', 'class="dlg dim hm-cfm" style="z-index: 211"').replace('class="dlg wide dim hm-mail"', 'class="dlg wide dim hm-mail" style="z-index: 226"').replace('class="dlg doc dim hm-rim"', 'class="dlg doc dim hm-rim" style="z-index: 216"')
    for h, z in (('drw.close', 200), ('ri.close', 215), ('mail.cancel', 225), ('cf.cancel', 210), ('rate.cancel', 210)):
        s = s.replace('<button class="scrim" tabindex="-1" aria-label="Close" onClick="{{%s}}"></button>' % h, '<button class="scrim" tabindex="-1" aria-label="Close" onClick="{{%s}}" style="z-index: %d"></button>' % (h, z))
    a, b = s.find('<style>') + 7, s.find('</style>')
    css = s[a:b]
    css = re.sub(r'\.(hm-tc|hm-note|hm-nx|hm-chip|hm-seg|hm-srch|hm-empty|hm-ss|hm-type|hm-drw|hm-dh|hm-db|hm-dpg)\b[^{}]*\{[^{}]*\}\n?', '', css)
    css = re.sub(r'\.tabb\[aria-selected=true\] \.hm-tc\{[^{}]*\}\n?', '', css)
    css = re.sub(r'\.cmc-modal\.hm-(cfm|rim|mail)\{[^{}]*\}\n?', '', css)
    css = css.replace('.hm-rim .cmc-mh{', '.hm-rim .dh{').replace('.hm-mail .cmc-mh{', '.hm-mail .dh{')
    if '.hm-rim .dh,.hm-mail .dh{' not in css:
        css += '\n.hm-rim .dh,.hm-mail .dh{align-items:center;padding:14px 16px 14px 24px}\n.hm-rim .db{padding:0}\n.search.wide{width:100%;margin-bottom:10px}\n.hm-tools .search{width:260px}\n.hm-tools .search .input,.hm-th .search .input{height:32px}\n.hm-pp{justify-content:flex-end;min-height:0;margin-top:10px;font-size:12px}\n.hm-pp span:first-child{margin-inline-end:auto}\n.seg.sm button{height:24px;padding:0 10px;font-size:12px}\n.seg button span{margin-inline-start:6px;font-size:12px;color:var(--muted)}\n.chipb > span{opacity:.8}\n.panel .hm-dhi{flex:1 1 auto;min-width:0}\n.panel-h p{margin:6px 0 0;font-size:13px;color:var(--muted2)}\n.panel-b .hm-stk.lg{margin:0 0 4px}\n.hm-cfm .lbl{display:block;margin-bottom:6px}\n'
    return s[:a] + css + s[b:]


def master(s):
    s = swap_classes(s, MASTER)
    s = s.replace('class="btn btn-icon btn-sm cmc-x"', 'class="btn btn-icon btn-sm x"')
    # Bank Master status / usage tags
    s = s.replace('class="bm-st" style="{{c.st}}"', 'class="chip" style="{{c.st}}"').replace('class="bm-st" style="{{r.stSt}}"', 'class="chip" style="{{r.stSt}}"')
    s = s.replace("cls: 'bm-tag p-' + u.k", "cls: 'chip ' + ({ rec: 't-info', pay: 't-neutral', inv: 't-ok', ref: 't-warn' }[u.k] || 't-neutral')")
    s = s.replace('class="bm-gapc"', 'class="chip t-warn"')
    a, b = s.find('<style>') + 7, s.find('</style>')
    css = s[a:b]
    css = re.sub(r'\.(bm1-srch|bm-empty|cm2-empty|bm-st|bm-tag|bm-gapc)\b[^{}]*\{[^{}]*\}\n?', '', css)
    css = re.sub(r'(\.theme\[data-theme=dark\] )?\.cmc-(bd|modal|mh|mb|mf|x)\b[^{}]*\{[^{}]*\}\n?', '', css)
    if '.dlg.full .dh{' not in css:
        css += '\n.dlg.full .dh{align-items:center;min-height:60px;padding:0 12px 0 20px;background:var(--surface);border-bottom:1px solid var(--line)}\n.dlg.full .db{flex:1 1 auto;min-height:0;background:var(--bg);padding:16px 20px}\n.dlg.full .df .btn{min-width:96px}\n.dh .x{margin-inline-start:auto}\n.dlg.bm-pm{width:min(640px,calc(100vw - 48px))}\n.dlg.dim{z-index:201}\n.scrim{z-index:200}\n.bm1-sh .search .input{height:36px}\n'
    return s[:a] + css + s[b:]


if __name__ == '__main__':
    n = 0
    for f in sorted(glob.glob('*.html')):
        if f == 'ui-kit.html':
            continue
        s0 = s = open(f).read()
        s = swap_classes(s, ALL)
        s = s.replace('class="banner b-info"', 'class="banner b-info"')
        if f == 'index.html':
            s = home(s)
        elif re.match(r'(bank-master|charge-master-v2)', f):
            s = master(s)
        s = segs(s)
        s = drop_rules(s, {'kmodal', 'kdrawer', 'khead', 'kbody', 'kfoot', 'kback', 'kbanner', 'pill', 'seg2', 'msel-n'})
        s = link(s)
        if s != s0:
            open(f, 'w').write(s)
            n += 1
    print('screens updated', n)
