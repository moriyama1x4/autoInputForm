var accounts = require('../../accounts.js');
var inputForm = require('../../inputForm.js');
var loginUrl = 'https://usr.golfdigest.co.jp/pg/frlogin.php';
var formUrls = require('./gdo_forms.js');
var formNum = formUrls.length - 1;
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = accounts.lname.length - 1
var page = new WebPage();
var ans6 = [
  '予約のページ',
  '友人・知人',
  'メールマガジン'
]; //Q6 の回答

var steps = [
  function() {
    // ログイン画面ロード
    page.cookies = [];
    page.open(loginUrl);
  },
  function(index) {
    // ログインフォーム 入力　
    page.evaluate(function(accounts, index) {
      var form = document.querySelector('form.jqtransform');
      form.elements['qLoginName'].value = accounts.email[index];
      form.elements['qPasswd'].value = accounts.pwd[index];
    }, accounts, index['mem']);
  },
  function() {
    // ログインフォーム　submit
    page.evaluate(function() {
      var form = document.querySelector('form.jqtransform');
      form.submit();
    });
  },
  function(index) {
    // 応募フォームロード
    page.open(formUrls[index['form']]);
  },
  function(index) {
    // 応募フォーム　入力
    page.evaluate(function(index, ans6) {
      document.querySelectorAll('input[value *= "了承しました"]')[0].click()
      document.querySelectorAll('input[value *= "了承しました"]')[1].click()
      document.querySelectorAll('input[value *= "了承しました"]')[2].click()
      document.querySelectorAll('input[value *= "了承しました"]')[3].click()
      document.querySelector('input[value *= "経験なし"]').click();
      // document.querySelector('input[name = "qEnq57635"][value *= ' + courses[index % courses.length] + ']').click();
      document.querySelector('input[value *= ' + ans6[index % ans6.length] + ']').click();
    }, index['mem'], ans6);
  },
  function() {
    // 応募フォーム　submit
    page.evaluate(function() {
      var form = document.querySelector('form');
      form.submit();
    });
  },
  function() {
    // 応募フォーム　確認　submit
    page.evaluate(function() {
      var form = document.querySelector('form');
      form.submit();
    });
  },
  function() {
    // キャプチャ
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(page, formNum, startMemIndex, endMemIndex, steps);
