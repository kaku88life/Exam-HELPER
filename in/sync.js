/* Exam-HELPER 跨裝置自動同步（Supabase REST, 通關密語當 key，免登入）
   用法：
     ExamSync.init({ app:'drill', getState:fn, mergeInbound:fn(payload), onStatus:fn(txt) })
     資料變更後呼叫 ExamSync.touch() → debounce 4 秒上傳
     ExamSync.setKey('通關密語') / ExamSync.getKey() / ExamSync.pullNow()
   合併語意由呼叫端的 mergeInbound 決定（建議 max-merge，重複合併不膨脹）。 */
(function(){
  var RPC_ = 'https://gcrxdxqfnbgcucyutsyv.supabase.co/rest/v1/rpc/';
  var APIKEY = 'sb_publishable_QXGVe0eC5AXuOHbbylvugw_oEXARNq6';
  var PASSKEY = 'fx-sync-pass';

  var cfg = null, timer = null, busy = false, dirty = false;

  function headers(){
    return { 'apikey': APIKEY, 'Authorization': 'Bearer ' + APIKEY, 'Content-Type': 'application/json' };
  }

  /* 同步碼不直接當索引：先算 SHA-256，雲端只看得到雜湊值，看不到你的碼 */
  var keyCache = {};
  function hashKey(code){
    if (keyCache[code]) return Promise.resolve(keyCache[code]);
    var enc = new TextEncoder().encode('exam-helper:' + code);
    return crypto.subtle.digest('SHA-256', enc).then(function(buf){
      var hex = Array.prototype.map.call(new Uint8Array(buf),
        function(b){ return ('0'+b.toString(16)).slice(-2); }).join('').slice(0,32);
      keyCache[code] = hex;
      return hex;
    });
  }
  function rowKey(){ return hashKey(localStorage.getItem(PASSKEY)).then(function(h){ return h + ':' + cfg.app; }); }

  /* 產生不可猜的隨機同步碼（去掉易混淆字元） */
  function makeCode(){
    var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var a = new Uint8Array(20); crypto.getRandomValues(a);
    var s = '';
    for (var i=0;i<20;i++){ s += A[a[i] % A.length]; if (i%5===4 && i<19) s += '-'; }
    return s;
  }
  function enabled(){ return !!(cfg && localStorage.getItem(PASSKEY)); }
  function status(t){ if (cfg && cfg.onStatus) cfg.onStatus(t); }
  function hhmm(){ var d = new Date(); return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); }

  function pull(){
    if (!enabled()) return Promise.resolve(false);
    return rowKey().then(function(k){
      return fetch(RPC_ + 'exam_progress_get', { method:'POST', headers: headers(),
        body: JSON.stringify({ k: k }) });
    }).then(function(r){ if (!r.ok) throw 0; return r.json(); })
      .then(function(payload){
        if (payload) cfg.mergeInbound(payload);
        return true;
      });
  }

  function push(){
    if (!enabled() || busy) { dirty = dirty || busy; return Promise.resolve(); }
    busy = true;
    return rowKey().then(function(k){
      return fetch(RPC_ + 'exam_progress_put', { method:'POST', headers: headers(),
        body: JSON.stringify({ k: k, p: cfg.getState() }) });
    }).then(function(r){
      busy = false;
      if (!r.ok) throw 0;
      status('已同步 ' + hhmm());
      if (dirty){ dirty = false; touch(); }
    }).catch(function(){ busy = false; status('同步失敗，稍後自動重試'); setTimeout(touch, 30000); });
  }

  function touch(){
    if (!enabled()) return;
    clearTimeout(timer);
    timer = setTimeout(push, 4000);
  }

  function full(){
    status('同步中…');
    return pull()
      .then(function(){ return push(); })
      .catch(function(){ status('連不上雲端（本機紀錄不受影響）'); });
  }

  window.ExamSync = {
    init: function(c){
      cfg = c;
      if (enabled()) full(); else status('');
      document.addEventListener('visibilitychange', function(){
        if (document.visibilityState === 'visible' && enabled()) full();
      });
    },
    touch: touch,
    pullNow: full,
    enabled: enabled,
    getKey: function(){ return localStorage.getItem(PASSKEY) || ''; },
    newCode: function(){ var c = makeCode(); localStorage.setItem(PASSKEY, c); full(); return c; },
    isWeak: function(){
      var c = localStorage.getItem(PASSKEY) || '';
      return c.length < 12 || /^[0-9]+$/.test(c);      // 太短或純數字 → 可被猜到
    },
    setKey: function(p){
      p = (p || '').trim();
      if (!p){ localStorage.removeItem(PASSKEY); status(''); return; }
      localStorage.setItem(PASSKEY, p);
      full();
    }
  };
})();
