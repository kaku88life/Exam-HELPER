/* Exam-HELPER dv 科目導航設定。實作在共用的 ../nav.core.js，這裡只放這一科不同的部分。 */
window.XNAV = {
  pages: [
    ['sprint_law.html', '考前速記·法規'],
    ['sprint_prac.html','考前速記·概論'],
    ['drill.html',      '刷題器'],
    ['../index.html',   '回總覽']
  ],
  features: { readability: true, fontSize: true, sections: true, fold: true }
};
