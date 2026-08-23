/* Exam-HELPER 共用頂部導航列：每頁 <script src="nav.js" defer></script> 掛載 */
(function(){
  var PAGES = [
    ['guide.html',      '作戰指南',   '⚔️'],
    ['notes.html',      '衝刺筆記',   '📒'],
    ['drill.html',      '刷題器',     '✍️'],
    ['cloze.html',      '事實挖空器', '🧩'],
    ['remit-flow.html', '匯兌流程圖', '💱'],
    ['trade-flow.html', '星野流程圖', '🚢'],
    ['analysis.html',   '題庫分析',   '📊'],
    ['../index.html',   '回總覽',     '⌂']
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
    '#xnav .pane a .em{font-size:1.05em}' +
    '#xback{position:fixed;inset:0;z-index:299;display:none;background:rgba(23,33,29,.25)}' +
    '#xnav.open~#xback,body.xnav-open #xback{display:block}';
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.id = 'xnav';
  bar.innerHTML =
    '<div class="b">' +
      '<button class="menu" id="xmenu">☰ <span>' + (cur ? cur[1] : 'Exam HELPER') + '</span> <span class="car">▾</span></button>' +
      '<span class="sp"></span>' +
      '<a class="home" href="../index.html" aria-label="回總覽">⌂</a>' +
    '</div>' +
    '<div class="pane"><div class="g">' +
      PAGES.map(function(p){
        return '<a href="' + p[0] + '"' + (cur && p[0] === cur[0] ? ' class="cur"' : '') + '>' +
          '<span class="em">' + p[2] + '</span>' + p[1] + '</a>';
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
