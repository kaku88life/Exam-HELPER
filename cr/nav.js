/* Exam-HELPER cr 科目導航設定。實作在共用的 ../nav.core.js，這裡只放這一科不同的部分。
   本檔只是設定，頁面要同時掛 nav.js 與 ../nav.core.js（兩支都 defer，順序不能顛倒）。
   改共用行為（nav.core.js）時，各科 HTML 的 ?v= 要一起進位才能破快取。 */
window.XNAV = {
  pages: [
    ['guide.html',      '作戰指南'],
    ['notes.html',      '法規架構卡'],
    ['drill.html',      '刷題器'],
    ['cloze.html',      '事實挖空器'],
    ['analysis.html',   '題庫分析'],
    ['../index.html',   '回總覽']],
  features: { readability: true, fontSize: true, sections: true }
};
