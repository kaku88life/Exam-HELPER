/* Exam-HELPER 跨裝置自動同步（Supabase REST, 通關密語當 key，免登入）
   用法：
     ExamSync.init({ app:'drill', getState:fn, mergeInbound:fn(payload), onStatus:fn(txt) })
     資料變更後呼叫 ExamSync.touch() → debounce 4 秒上傳
     ExamSync.setKey('通關密語') / ExamSync.getKey() / ExamSync.pullNow()
   合併語意由呼叫端的 mergeInbound 決定（建議 max-merge，重複合併不膨脹）。 */
(function(){
  var URL_ = 'https://gcrxdxqfnbgcucyutsyv.supabase.co/rest/v1/exam_progress';
  var APIKEY = 'sb_publishable_QXGVe0eC5AXuOHbbylvugw_oEXARNq6';
  var PASSKEY = 'fx-sync-pass';

  var cfg = null, timer = null, busy = false, dirty = false;

  function headers(){
    return { 'apikey': APIKEY, 'Authorization': 'Bearer ' + APIKEY, 'Content-Type': 'application/json' };
  }
  function rowKey(){ return localStorage.getItem(PASSKEY) + ':' + cfg.app; }
  function enabled(){ return !!(cfg && localStorage.getItem(PASSKEY)); }
  function status(t){ if (cfg && cfg.onStatus) cfg.onStatus(t); }
  function hhmm(){ var d = new Date(); return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); }

  function pull(){
    if (!enabled()) return Promise.resolve(false);
    return fetch(URL_ + '?key=eq.' + encodeURIComponent(rowKey()) + '&select=payload', { headers: headers() })
      .then(function(r){ if (!r.ok) throw 0; return r.json(); })
      .then(function(rows){
        if (rows.length && rows[0].payload) cfg.mergeInbound(rows[0].payload);
        return true;
      });
  }

  function push(){
    if (!enabled() || busy) { dirty = dirty || busy; return Promise.resolve(); }
    busy = true;
    var body = JSON.stringify({ key: rowKey(), payload: cfg.getState(), updated_at: new Date().toISOString() });
    return fetch(URL_ + '?on_conflict=key', {
      method: 'POST',
      headers: Object.assign(headers(), { 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
      body: body
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
    setKey: function(p){
      p = (p || '').trim();
      if (!p){ localStorage.removeItem(PASSKEY); status(''); return; }
      localStorage.setItem(PASSKEY, p);
      full();
    }
  };
})();
