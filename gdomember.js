var accounts = require('./accounts.js');
var inputForm = require('./inputForm.js');
var url = 'https://usr.golfdigest.co.jp/pg/frlogin.php';
var startMemIndex = 6; //何番目のアカウントから処理を始めるか
var endMemIndex = 10;//accounts.lname.length - 1;
var memIndex = startMemIndex;
var page = new WebPage();

var steps = [
  // function() {
  //   // 画面リセット
  //   page = new WebPage();
  // },
  function() {
    // 会員登録画面ロード
    page.open(url);
  },
  function() {
   // 会員登録画面へ遷移
   page.evaluate(function() {
    document.querySelector('p.link_btn > a').click()
   });
  },
  function() {
  // 入力画面 入力
    page.evaluate(function(accounts, memIndex) {
      var form =  document.getElementsByName('index_form');
      form[0].elements['qEName'].value = accounts.lname[memIndex];
      form[0].elements['qEName2'].value = accounts.fname[memIndex];
      form[0].elements['qEKana'].value = accounts.lnameHira[memIndex];
      form[0].elements['qEKana2'].value = accounts.fnameHira[memIndex];
      form[0].elements['qEBirthday_1'].value = accounts.bYear[memIndex];
      form[0].elements['qEBirthday_2'].value = accounts.bMonth[memIndex];
      form[0].elements['qEBirthday_3'].value = accounts.bDay[memIndex];
      form[0].elements['qEPref'].value = accounts.address1[memIndex];
      form[0].elements['qEMail'].value = accounts.email[memIndex];
      form[0].elements['qEPasswd'].value = accounts.pwd[memIndex];
      form[0].elements['qERePasswd'].value = accounts.pwd[memIndex];
      form[0].submit();
    }, accounts, memIndex);
  },
  function() {
  // 入力画面　submit
   page.evaluate(function() {
     var form = document.getElementsByName('index_form');
     form[0].submit();
   });
  },
  function() {
  // 確認画面　submit
    page.evaluate(function() {
      var form = document.getElementsByName('frm2');
      form[0].submit();
    });
  },
  function() {
    // キャプチャ
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(page, url, startMemIndex, endMemIndex, steps);
