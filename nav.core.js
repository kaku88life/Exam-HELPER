/* Exam-HELPER 共用導航核心。
   各科目的 nav.js 先設定 window.XNAV，頁面再接著掛本檔（兩支都 defer，順序不能顛倒）。
   features：readability=手機字級樓地板 / fontSize=A+A− 鈕 / sections=分節 pill＋收合＋浮動鈕 */
(function(){
  var CFG = window.XNAV || {};
  var PAGES = CFG.pages || [];
  var F = CFG.features || {};

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

  /* 手機閱讀：字級樓地板與點擊目標 */
  if (F.readability) css.textContent += "/* ---- 手機閱讀：字級樓地板與點擊目標（2026-09-14）---- */@media (max-width:600px){.wrap small,.wrap .q,.wrap .foot,.wrap .legend,.wrap .n,.wrap .note small,.wrap .tip small,.wrap .hl small,.wrap .why,.wrap .hint{font-size:max(12px,.86em)!important}.wrap td,.wrap th{font-size:max(12px,.92em)!important}.wrap button,.wrap .btn{min-height:40px}.chk li{padding:12px 0}}" + "@media (max-width:600px){h2{flex-wrap:wrap}h2 .n{flex:1 1 100%}table.two th,table.two td.r{white-space:nowrap}table.two td{padding:6px 3px}}";

  /* 字級調整鈕 */
  if (F.fontSize) css.textContent += "#xfs{display:flex;align-items:center;gap:2px;margin-right:2px}#xfs button{width:36px;height:36px;border-radius:8px;font-size:.95em;font-weight:800;color:#087a73}#xfs button:active{background:#f5f7f3}#xfs button.dis{opacity:.3}";

  /* 分節 pill 列、標題收合、目錄表、浮動鈕 */
  if (F.sections) css.textContent += "#xsec{position:sticky;z-index:290;background:#f5f7f3;margin:0;padding:6px 10px;display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;border-bottom:1px solid #e3e8e4}#xsec a.on{border-color:#087a73;color:#087a73;background:rgba(8,122,115,.08)}#xsec::-webkit-scrollbar{display:none}#xsec a{flex:0 0 auto;white-space:nowrap;padding:7px 11px;border:1px solid #d7ded8;border-radius:999px;background:#fff;color:#17211d;font-size:.8em;font-weight:600;text-decoration:none;min-height:36px;display:flex;align-items:center}#xsec a:active{border-color:#087a73;color:#087a73}#xfab{position:fixed;right:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:290;display:flex;flex-direction:column;gap:8px}#xfab button{width:44px;height:44px;border-radius:50%;background:#fff;border:1px solid #d7ded8;box-shadow:0 2px 8px rgba(23,33,29,.15);color:#087a73;font-weight:800;font-size:.9em}#xfab{opacity:0;pointer-events:none;transition:opacity .2s}#xfab.show{opacity:1;pointer-events:auto}#xsheet{position:fixed;left:0;right:0;bottom:0;z-index:301;background:#fff;border-radius:14px 14px 0 0;box-shadow:0 -4px 20px rgba(23,33,29,.2);padding:10px 12px calc(16px + env(safe-area-inset-bottom));display:none;max-height:70vh;overflow:auto}#xsheet.open{display:block}#xsheet a{display:flex;align-items:center;min-height:46px;padding:6px 10px;border-bottom:1px solid #eef1ee;text-decoration:none;color:#17211d;font-size:.9em;font-weight:600}#xsheet a:last-child{border:none}#xsheet .t{font-size:.75em;color:#66736d;padding:4px 10px 6px}" + "h2.xh{cursor:pointer;-webkit-tap-highlight-color:transparent;position:relative;padding-right:24px}h2.xh::after{content:\"\\25BE\";position:absolute;right:0;top:.1em;color:#66736d;font-size:.8em;line-height:1;transition:transform .15s}h2.xh.closed::after{transform:rotate(-90deg)}.xbody.closed{display:none}#xsec a.all{border-style:dashed;color:#66736d}" +
    /* 分節 pill 列：右緣淡出，提示還能橫滑；捲到底就取消 */
    '#xsec{-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 30px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 30px),transparent)}' +
    '#xsec.xs-end{-webkit-mask-image:none;mask-image:none}' +
    /* 浮動鈕：頁尾留白，避免蓋住最後一段內容 */
    'body.xfab-on{padding-bottom:calc(76px + env(safe-area-inset-bottom))}';

  css.textContent +=
    /* 錨點跳轉：讓出「頂欄（＋分節 pill 列）」的實際高度，別讓標題被蓋住 */
    'h2{scroll-margin-top:calc(var(--xhead,' + (F.sections ? '110px' : '60px') + ') + 10px)}' +
    /* 寬表格：整表可橫捲 */
    '.xtw{overflow-x:auto;-webkit-overflow-scrolling:touch}.xtw>table{margin:0}' +
    /* 真的塞不下才橫捲：右緣淡出提示，捲到底取消 */
    '.xtw.ov{-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 22px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 22px),transparent)}' +
    '.xtw.ov.xe{-webkit-mask-image:none;mask-image:none}' +
    '@media (max-width:600px){.wrap .xtw.nw td:first-child,.wrap .xtw.nw th:first-child{white-space:nowrap}}';
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

  /* ---- 字級：使用者可調，存 localStorage（跨頁共用）---- */
  if (F.fontSize) {
    var FS = [0.9, 1, 1.1, 1.2, 1.35], fsKey = 'xfs-scale';
    function fsGet(){ try{ var v = parseFloat(localStorage.getItem(fsKey)); if (FS.indexOf(v) >= 0) return v; }catch(e){}
      return (window.innerWidth <= 480) ? 1.1 : 1; }          // 手機預設放大一級
    function fsApply(v){ document.body.style.fontSize = (16 * v) + 'px'; if (window.__fitTables) setTimeout(window.__fitTables, 0); try{ localStorage.setItem(fsKey, String(v)); }catch(e){}
      var i = FS.indexOf(v); var a = document.getElementById('xfsm'), b = document.getElementById('xfsp');
      if (a) a.classList.toggle('dis', i <= 0); if (b) b.classList.toggle('dis', i >= FS.length - 1); }
    var fsBox = document.createElement('span'); fsBox.id = 'xfs';
    fsBox.innerHTML = '<button id="xfsm" aria-label="縮小字級">A−</button><button id="xfsp" aria-label="放大字級">A+</button>';
    bar.querySelector('.home').before(fsBox);
    fsApply(fsGet());
    document.getElementById('xfsm').onclick = function(){ var i = FS.indexOf(fsGet()); if (i > 0) fsApply(FS[i - 1]); };
    document.getElementById('xfsp').onclick = function(){ var i = FS.indexOf(fsGet()); if (i < FS.length - 1) fsApply(FS[i + 1]); };
  }

  /* ---- 寬表格包一層橫捲容器，讓第一欄可以不折行 ---- */
  document.querySelectorAll('.wrap table, main table').forEach(function(t){
    if (t.parentNode && t.parentNode.classList.contains('xtw')) return;
    var w = document.createElement('div'); w.className = 'xtw';
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });

  /* 表格第一欄要不要 nowrap：套上去量一次，會撐破就改回折行；真的放不下才開橫捲並提示 */
  window.__fitTables = function(){
    document.querySelectorAll('.xtw').forEach(function(w){
      if (!w.clientWidth) return;
      w.classList.add('nw');
      if (w.scrollWidth - w.clientWidth > 2) w.classList.remove('nw');
      w.classList.toggle('ov', w.scrollWidth - w.clientWidth > 2);
    });
  };
  window.__fitTables();
  window.addEventListener('resize', window.__fitTables);
  /* 收合區塊裡的表格載入時量不到寬度，等它真的顯示出來再量一次 */
  if (window.ResizeObserver) {
    var _ro = new ResizeObserver(function(es){
      es.forEach(function(e){
        var w = e.target;
        if (!w.clientWidth) return;
        w.classList.add('nw');
        if (w.scrollWidth - w.clientWidth > 2) w.classList.remove('nw');
        w.classList.toggle('ov', w.scrollWidth - w.clientWidth > 2);
      });
    });
    document.querySelectorAll('.xtw').forEach(function(w){ _ro.observe(w); });
  }
  document.querySelectorAll('.xtw').forEach(function(w){
    w.addEventListener('scroll', function(){
      w.classList.toggle('xe', w.scrollLeft + w.clientWidth >= w.scrollWidth - 2);
    }, {passive:true});
  });

  var hasSec = false;
  /* ---- 長頁面：分節 pill ＋ 右下「目錄／回頂」---- */
  var h2s = Array.prototype.slice.call(document.querySelectorAll('.wrap h2, main h2, body > h2'));
  if (F.sections && h2s.length >= 4){
    var label = function(h){ var t = (h.childNodes[0] && h.childNodes[0].nodeType === 3) ? h.childNodes[0].textContent : h.textContent;
      t = t.replace(/\s+/g, ' ').trim(); return t.length > 12 ? t.slice(0, 12) + '…' : t; };
    h2s.forEach(function(h, i){ if (!h.id) h.id = 'sec' + (i + 1); });
    var sec = document.createElement('div'); sec.id = 'xsec';
    sec.innerHTML = h2s.map(function(h){ return '<a href="#' + h.id + '">' + label(h) + '</a>'; }).join('');
    bar.after(sec);
    hasSec = true;
    function secTop(){
      var h = bar.querySelector('.b').offsetHeight;
      sec.style.top = h + 'px';
      /* 頂欄＋pill 列的實際總高，供 scroll-margin-top 與 secMark 共用 */
      document.documentElement.style.setProperty('--xhead', (h + sec.offsetHeight) + 'px');
    }
    function headH(){ return bar.querySelector('.b').offsetHeight + sec.offsetHeight; }
    /* pill 列捲到最右就取消淡出遮罩 */
    function secEdge(){ sec.classList.toggle('xs-end', sec.scrollLeft + sec.clientWidth >= sec.scrollWidth - 2); }
    sec.addEventListener('scroll', secEdge, {passive:true});
    secTop(); secEdge();
    window.addEventListener('resize', function(){ secTop(); secEdge(); });
    var secLinks = Array.prototype.slice.call(sec.querySelectorAll('a'));
    function secMark(){
      var y = window.scrollY + headH() + 12, cur = 0;
      h2s.forEach(function(h, i){ if (h.offsetTop <= y) cur = i; });
      secLinks.forEach(function(a, i){ a.classList.toggle('on', i === cur); });
      var a = secLinks[cur]; if (a) sec.scrollTo({left: a.offsetLeft - sec.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth'});
    }
    window.addEventListener('scroll', secMark, {passive:true}); secMark();
    /* 每節可收合：預設只展開第一節；點 pill／目錄會自動展開目標節 */
    var bodies = [];
    h2s.forEach(function(h, i){
      var body = document.createElement('div'); body.className = 'xbody';
      var n = h.nextSibling;
      while (n && !(n.nodeType === 1 && n.tagName === 'H2')) { var nx = n.nextSibling; body.appendChild(n); n = nx; }
      h.after(body); h.classList.add('xh'); bodies.push(body);
      if (i > 0) { h.classList.add('closed'); body.classList.add('closed'); }
      h.addEventListener('click', function(e){ if (e.target.closest('a')) return; h.classList.toggle('closed'); body.classList.toggle('closed'); });
    });
    function openSec(id){ var h = document.getElementById(id); if (!h) return; var i = h2s.indexOf(h); if (i < 0) return;
      h.classList.remove('closed'); bodies[i].classList.remove('closed'); }
    function onJump(e){ var a = e.target.closest('a'); if (!a) return; var id = (a.getAttribute('href') || '').slice(1); if (id) openSec(id); }
    document.addEventListener('click', function(e){ if (e.target.closest('#xsec, #xsheet')) onJump(e); });
    var allA = document.createElement('a'); allA.href = '#'; allA.className = 'all'; allA.textContent = '全部展開';
    allA.onclick = function(e){ e.preventDefault(); var anyClosed = bodies.some(function(b){ return b.classList.contains('closed'); });
      h2s.forEach(function(h, i){ h.classList.toggle('closed', !anyClosed); bodies[i].classList.toggle('closed', !anyClosed); });
      allA.textContent = anyClosed ? '全部收合' : '全部展開'; };
    sec.appendChild(allA);
    if (location.hash) openSec(location.hash.slice(1));
    var sheet = document.createElement('div'); sheet.id = 'xsheet';
    sheet.innerHTML = '<div class="t">這一頁的段落</div>' + h2s.map(function(h){ return '<a href="#' + h.id + '">' + label(h) + '</a>'; }).join('');
    document.body.appendChild(sheet);
    var fab = document.createElement('div'); fab.id = 'xfab';
    fab.innerHTML = '<button id="xtoc" aria-label="目錄">≡</button><button id="xtop" aria-label="回頂部">↑</button>';
    document.body.appendChild(fab);
    document.body.classList.add('xfab-on');
    function sheetToggle(v){ sheet.classList.toggle('open', v); back.style.display = sheet.classList.contains('open') ? 'block' : 'none'; }
    document.getElementById('xtoc').onclick = function(){ sheetToggle(!sheet.classList.contains('open')); };
    document.getElementById('xtop').onclick = function(){ window.scrollTo({top:0, behavior:'smooth'}); };
    sheet.addEventListener('click', function(e){ if (e.target.tagName === 'A') sheetToggle(false); });
    var _bk = back.onclick; back.onclick = function(){ toggle(false); sheetToggle(false); };
    window.addEventListener('scroll', function(){ fab.classList.toggle('show', window.scrollY > 500); }, {passive:true});
  }

  /* 既有頁面的 sticky 頂部元素（top:0）統一往下讓出頂欄高度 */
  function fixSticky(){
    var h = bar.querySelector('.b').offsetHeight;
    if (!hasSec) document.documentElement.style.setProperty('--xhead', h + 'px');
    document.querySelectorAll('nav,header').forEach(function(el){
      if (el.closest('#xnav')) return;
      var cs = getComputedStyle(el);
      if (cs.position === 'sticky' && parseInt(cs.top) === 0) el.style.top = h + 'px';
    });
  }
  fixSticky();
  window.addEventListener('resize', fixSticky);
  fixSticky();
  window.addEventListener('resize', fixSticky);
})();
