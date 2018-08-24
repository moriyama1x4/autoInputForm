var accounts = require('../../accounts.js');
var inputForm = require('../../inputForm.js');
var loginUrl = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=menu%3Dprv_camp%26act%3Dentry_input%26prv_camp_id%3D10610';
var formUrls = require('./rakuten_forms.js');
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
