/* Exam-HELPER dv 科目導航設定。實作在共用的 ../nav.core.js，這裡只放這一科不同的部分。
   考前速記（sprint_*）整理自購買的筆記，只在本機 serve、不進公開 repo，所以公開站不列這兩頁。 */
(function(){
  var local = !/github\.io$/.test(location.hostname);
  window.XNAV = {
    pages: (local ? [
      ['sprint_law.html', '考前速記·法規'],
      ['sprint_prac.html','考前速記·概論']] : []).concat([
      ['drill.html',      '刷題器'],
      ['../index.html',   '回總覽']]),
    features: { readability: true, fontSize: true, sections: true }
  };
})();
