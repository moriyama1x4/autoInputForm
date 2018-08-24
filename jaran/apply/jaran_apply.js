var accounts = require('../../accounts.js');
var inputForm = require('../../inputForm.js');
var loginUrl = 'https://point.recruit.co.jp/member/OAuthLogin/?client_id=d186dfbfd58b26fb760540eac91d3db3619a5ae452be1b41555da255f2714e54&redirect_uri=https%3A%2F%2Fgolf-jalan.net%2Fmy%2Flogin%2Fcallback%2F&response_type=code&state=7145071c736511972af0edb521656e69bb7f20c3377205b376c4be061f6469c5d61398560e8661ddd7c76d1837c191823d0ec4b1bda37f5df3a906c583e77fd8020306792355387c59dfa4a67025a8a9';
var formUrls = require('./jaran_forms.js');
var formNum = formUrls.length - 1;
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = accounts.lname.length - 1;
var page = new WebPage();

var steps = [
  function() {
    // ログイン画面 ロード
    page.open(loginUrl);
  },
  function(index) {
    // ログイン画面 ipass入力
    page.evaluate(function(accounts, index) {
      var form = document.getElementsByName('login');
      form[0].elements['u'].value = accounts.email[index];
      form[0].elements['p'].value = accounts.pwd[index];
      return;
    }, accounts, index['mem']);
  },
  function() {
    // ログイン画面　submit
    page.evaluate(function() {
      var form = document.getElementsByName('login');
      form[0].submit();
    });
  },
  function(index) {
    // 応募フォームロード
    page.open(formUrls[index['form']]);
  },
  function() {
  // フォーム入力画面
  page.evaluate(function() {
    var form =  document.getElementsByTagName('form');
    form[0].elements['mail_send_device_cd'].click();
    form[0].elements['golfnews'].click();
    form[0].elements['golf_favorite'].click();
    return;
  });
  },
  function() {
   // フォーム入力画面　submit
   page.evaluate(function() {
     var form = document.getElementsByTagName('form');
     form[0].elements['submit'].click();
   });
  },
  function() {
   // フォーム確認画面　submit
   page.evaluate(function() {
     var form = document.getElementsByTagName('form');
     form[0].elements['submit'].click();
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
