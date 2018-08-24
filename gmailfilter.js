var myaccount = require('./myaccount.js');
var accounts = require('./accounts.js');
var inputForm = require('./inputForm.js');
var loginUrl = 'https://mail.google.com/mail/u/0/h/4onfuxx87i59/?v=prf';
var startMemIndex = 11; //何番目のアカウントから処理を始めるか
var endMemIndex = 12;//accounts.lname.length - 1
var page = new WebPage();
var addAccounts = ''

for(var i = startMemIndex; i <= endMemIndex; i++){
  addAccounts += '|'
  addAccounts += accounts.email[i].replace(/@.+/g, '');
  console.log(addAccounts);
}

var steps = [
  function() {
    // ログイン画面ロード
    page.cookies = [];
    page.open(loginUrl);
  },
  function() {
    // account 入力　
    page.evaluate(function(myaccount) {
      document.querySelector('input[name = "identifier"]').value = myaccount.email;
      document.querySelector('div[id = "identifierNext"] > div[jsname = "ksKsZd"]').click()
    }, myaccount);
  },
  function(index) {
    // pwd 入力　
    page.evaluate(function(myaccount) {
      document.querySelector('input[name = "password"]').value = myaccount.pwd;
      document.querySelector('div[id = "passwordNext"] > div[jsname = "ksKsZd"]').click()
    }, myaccount);
  },
  function() {
    //編集を開く
    page.evaluate(function() {
      document.querySelectorAll('input[value *= "編集"]')[3].click();
    });
  },
  function() {
    //フィルタ内容を更新して次のステップへ
    page.evaluate(function(addAccounts) {
      document.querySelector('input[name *= "cf1_to"]').value += addAccounts;
      document.querySelector('input[name *= "nvp_bu_nxsb"]').click();
    }, addAccounts);
  },
  function() {
    //完了
    page.evaluate(function() {
      document.querySelector('input[name *= "nvp_bu_cftb"]').click();
    });
  },
  function() {
    // キャプチャ
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(page, 0, 0, 0, steps);
