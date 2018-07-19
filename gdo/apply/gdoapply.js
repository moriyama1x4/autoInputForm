var accounts = require('../../accounts.js');
var inputForm = require('../../inputForm.js');
var courses = require('./courses.js');
var loginUrl = 'https://usr.golfdigest.co.jp/pg/frlogin.php';
var formUrl = 'https://usr.golfdigest.co.jp/enq/enq_form.php?qIds=C5xbN7X_HkzU';
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = accounts.lname.length - 1;
var memIndex = startMemIndex;
var page = new WebPage();
var question6 = [
  '予約のページ',
  '友人・知人',
  'メールマガジン'
]; //Q6 の回答

var steps = [
  function() {
    // ログイン画面ロード
    console.log(loginUrl);
    console.log(formUrl);
    page.cookies = [];
    page.open(loginUrl);
  },
  function(index) {
   // ログインフォーム 入力　
   page.evaluate(function(accounts, index) {
    var form = document.querySelector('form.jqtransform');
    form.elements['qLoginName'].value = accounts.email[index];
    form.elements['qPasswd'].value = accounts.pwd[index];
   }, accounts, index);
  },
  function() {
  // ログインフォーム　submit
   page.evaluate(function() {
     var form = document.querySelector('form.jqtransform');
     form.submit();
   });
  },
  // function() {
  // // 応募フォームロード
  //   page.open(formUrl);
  // },
  // function(index) {
  // // 応募フォーム　入力
  //  page.evaluate(function(index) {
  //    document.querySelector('input[name = "qEnq57631[]"]').click();
  //    document.querySelector('input[name = "qEnq57632[]"]').click();
  //    document.querySelector('input[name = "qEnq57636[]"]').click();
  //    document.querySelector('input[name = "qEnq57634[]"]').click();
  //    document.querySelector('input[name = "qEnq57635"][value *= courses[index % courses.length]]').click();
  //    document.querySelector('input[name = "qEnq57634[]"][value *= question6[index % question6.length]]').click();
  //  });
  // },
  // function() {
  // // 応募フォーム　submit
  //  page.evaluate(function() {
  //    var form = document.querySelector('form');
  //    form.submit();
  //  });
  // },
  // function() {
  // // 応募フォーム　確認　submit
  //  page.evaluate(function() {
  //    var form = document.querySelector('form');
  //    form.submit();
  //  });
  // },
  function() {
  // キャプチャ
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(page, startMemIndex, endMemIndex, steps);
