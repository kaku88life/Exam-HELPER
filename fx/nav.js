/* Exam-HELPER 共用頂部導航列：每頁 <script src="nav.js" defer></script> 掛載 */
(function(){
  var PAGES = [
    ['guide.html',      '作戰指南'],
    ['notes.html',      '衝刺筆記'],
    ['drill.html',      '刷題器'],
    ['cloze.html',      '事實挖空器'],
    ['remit-flow.html', '匯兌流程圖'],
    ['trade-flow.html', '星野流程圖'],
    ['analysis.html',   '題庫分析'],
    ['../index.html',   '回總覽']
  ];
  var here = location.pathname.split('/').pop() || 'index.html';
  var cur = PAGES.find(function(p){ return p[0] === here; });

  var css = document.createElement('style');
  css.textContent =
    '#xnav{position:sticky;top:0;z-index:300;background:#fff;border-bottom:1px solid #d7ded8;' +
      'font-family:"Noto Sans TC","Segoe UI",system-ui,sans-serif}' +
    '#xnav .b{max-width:720px;margin:0 auto;display:flex;align-items:center;min-height:42px;padding:0 8px;gap:4px}' +
    '#xnav button{border:none;background:none;font-family:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '#xnav .menu{display:flex;align-items:center;gap:7px;padding:9px 10px;font-size:.86em;font-weight:700;color:#17211d;border-radius:8px}' +
    '#xnav .menu:active{background:#f5f7f3}' +
    '#xnav .menu .car{font-size:.72em;color:#66736d;transition:transform .15s}' +
    '#xnav.open .menu .car{transform:rotate(180deg)}' +
    '#xnav .sp{flex:1}' +
    '#xnav .home{padding:9px 12px;font-size:1em;color:#087a73;text-decoration:none;border-radius:8px}' +
    '#xnav .pane{display:none;border-top:1px solid #d7ded8;background:#fff}' +
    '#xnav.open .pane{display:block}' +
    '#xnav .pane .g{max-width:720px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:10px 12px 13px}' +
    '#xnav .pane a{display:flex;align-items:center;gap:9px;min-height:48px;padding:8px 12px;border:1px solid #d7ded8;' +
      'border-radius:9px;text-decoration:none;color:#17211d;font-size:.85em;font-weight:600}' +
    '#xnav .pane a:active{border-color:#087a73;background:rgba(8,122,115,.05)}' +
    '#xnav .pane a.cur{border-color:#087a73;background:rgba(8,122,115,.09);color:#087a73}' +
    '#xback{position:fixed;inset:0;z-index:299;display:none;background:rgba(23,33,29,.25)}' +
    '#xnav.open~#xback,body.xnav-open #xback{display:block}' +
    /* ---- 共用 SVG icon 系統（CSS mask，取代 emoji）---- */
    '.xi{display:inline-block;width:1.02em;height:1.02em;vertical-align:-0.14em;background:currentColor;' +
      '-webkit-mask:var(--xm) center/contain no-repeat;mask:var(--xm) center/contain no-repeat}' +
    '.xi.r{color:var(--rd,#b3453a)}.xi.g{color:var(--gn,#4e7a3d)}.xi.y{color:var(--yw,#b66516)}.xi.v{color:var(--vi,#315f94)}.xi.c{color:var(--cy,#087a73)}' +
    '.xd{display:inline-block;width:.58em;height:.58em;border-radius:50%;margin-right:3px}' +
    '.xd.r{background:var(--rd,#b3453a)}.xd.y{background:var(--yw,#b66516)}.xd.g{background:var(--gn,#4e7a3d)}' +
    '.xf{display:inline-block;font-size:.6em;font-weight:800;padding:1px 4px;border-radius:3px;background:var(--vi,#315f94);color:#fff;vertical-align:.14em;letter-spacing:.5px}' +
    ".xa{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'/%3E%3C/svg%3E\")}" +
    ".xk{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='8 12.5 11 15.5 16 9'/%3E%3C/svg%3E\")}" +
    ".xx{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3C/svg%3E\")}" +
    ".xkey{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3'/%3E%3C/svg%3E\")}" +
    ".xs{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26'/%3E%3C/svg%3E\")}" +
    ".xz{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpolygon points='13 2 3 14 12 14 11 22 21 10 12 10'/%3E%3C/svg%3E\")}" +
    ".xbank{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='22' x2='21' y2='22'/%3E%3Cline x1='6' y1='18' x2='6' y2='11'/%3E%3Cline x1='10' y1='18' x2='10' y2='11'/%3E%3Cline x1='14' y1='18' x2='14' y2='11'/%3E%3Cline x1='18' y1='18' x2='18' y2='11'/%3E%3Cpolygon points='12 2 20 7 4 7'/%3E%3C/svg%3E\")}" +
    ".xbook{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E\")}" +
    ".xset{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round'%3E%3Cline x1='4' y1='21' x2='4' y2='14'/%3E%3Cline x1='4' y1='10' x2='4' y2='3'/%3E%3Cline x1='12' y1='21' x2='12' y2='12'/%3E%3Cline x1='12' y1='8' x2='12' y2='3'/%3E%3Cline x1='20' y1='21' x2='20' y2='16'/%3E%3Cline x1='20' y1='12' x2='20' y2='3'/%3E%3Cline x1='1' y1='14' x2='7' y2='14'/%3E%3Cline x1='9' y1='8' x2='15' y2='8'/%3E%3Cline x1='17' y1='16' x2='23' y2='16'/%3E%3C/svg%3E\")}" +
    ".xtr{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3C/svg%3E\")}" +
    ".xup{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='17 8 12 3 7 8'/%3E%3Cline x1='12' y1='3' x2='12' y2='15'/%3E%3C/svg%3E\")}" +
    ".xdn{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='7 10 12 15 17 10'/%3E%3Cline x1='12' y1='15' x2='12' y2='3'/%3E%3C/svg%3E\")}" +
    ".xex{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'/%3E%3C/svg%3E\")}" +
    ".xsh{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='16 3 21 3 21 8'/%3E%3Cline x1='4' y1='20' x2='21' y2='3'/%3E%3Cpolyline points='21 16 21 21 16 21'/%3E%3Cline x1='15' y1='15' x2='21' y2='21'/%3E%3Cline x1='4' y1='4' x2='9' y2='9'/%3E%3C/svg%3E\")}" +
    ".xtg{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E\")}" +
    ".xrp{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='17 1 21 5 17 9'/%3E%3Cpath d='M3 11V9a4 4 0 0 1 4-4h14'/%3E%3Cpolyline points='7 23 3 19 7 15'/%3E%3Cpath d='M21 13v2a4 4 0 0 1-4 4H3'/%3E%3C/svg%3E\")}" +
    ".xan{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='5' r='3'/%3E%3Cline x1='12' y1='22' x2='12' y2='8'/%3E%3Cpath d='M5 12H2a10 10 0 0 0 20 0h-3'/%3E%3C/svg%3E\")}" +
    ".xcs{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 11 12 14 22 4'/%3E%3Cpath d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'/%3E%3C/svg%3E\")}" +
    ".xhome{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E\")}" +
    ".xmenu{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round'%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cline x1='3' y1='12' x2='21' y2='12'/%3E%3Cline x1='3' y1='18' x2='21' y2='18'/%3E%3C/svg%3E\")}" +
    ".xch{--xm:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")}";
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.id = 'xnav';
  bar.innerHTML =
    '<div class="b">' +
      '<button class="menu" id="xmenu"><i class="xi xmenu"></i> <span>' + (cur ? cur[1] : 'Exam HELPER') + '</span> <i class="xi xch car"></i></button>' +
      '<span class="sp"></span>' +
      '<a class="home" href="../index.html" aria-label="回總覽"><i class="xi xhome"></i></a>' +
    '</div>' +
    '<div class="pane"><div class="g">' +
      PAGES.map(function(p){
        return '<a href="' + p[0] + '"' + (cur && p[0] === cur[0] ? ' class="cur"' : '') + '>' + p[1] + '</a>';
      }).join('') +
    '</div></div>';
  document.body.insertBefore(bar, document.body.firstChild);

  var back = document.createElement('div');
  back.id = 'xback';
  document.body.appendChild(back);

  function toggle(v){
    bar.classList.toggle('open', v);
    back.style.display = bar.classList.contains('open') ? 'block' : 'none';
  }
  document.getElementById('xmenu').onclick = function(){ toggle(!bar.classList.contains('open')); };
  back.onclick = function(){ toggle(false); };

  /* 既有頁面的 sticky 頂部元素（top:0）統一往下讓出頂欄高度 */
  function fixSticky(){
    var h = bar.querySelector('.b').offsetHeight;
    document.querySelectorAll('nav,header').forEach(function(el){
      if (el.closest('#xnav')) return;
      var cs = getComputedStyle(el);
      if (cs.position === 'sticky' && parseInt(cs.top) === 0) el.style.top = h + 'px';
    });
  }
  fixSticky();
  window.addEventListener('resize', fixSticky);
})();
