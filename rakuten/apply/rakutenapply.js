var accounts = require('../../accounts.js');
var inputForm = require('../../inputForm.js');
var loginUrl = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=menu%3Dprv_camp%26act%3Dentry_input%26prv_camp_id%3D10610';
var formUrl = 'https://manager.gora.golf.rakuten.co.jp/?menu=prv_camp&act=entry_input&prv_camp_id=10646'
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = 10;//accounts.lname.length - 1;
var memIndex = startMemIndex;
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
    }, accounts, index);
  },
  function() {
    // ログイン画面　submit
    page.evaluate(function() {
      var form = document.getElementsByName('login');
      form[0].submit();
    });
  },
  function() {
    // フォーム入力画面 ロード
    page.open(formUrl);
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

inputForm(page, startMemIndex, endMemIndex, steps);
