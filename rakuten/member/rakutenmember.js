var accounts = require('./accounts.js');
var inputForm = require('./inputForm.js');
var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=tp%3Dtop_my';
var startMemIndex = 2; //何番目のアカウントから処理を始めるか
var endMemIndex = 3;//accounts.lname.length - 1;
var memIndex = startMemIndex;
var page = new WebPage();

var steps = [
  function() {
    // ログイン画面 ロード
    page.open(url);
  },
  function() {
   // 会員登録画面へ遷移
   page.evaluate(function() {
    document.getElementById('entryBtn').click();
   });
  },
  function(index) {
  // 入力画面 入力
    page.evaluate(function(accounts, index) {
      var form =  document.getElementsByName('Regist1Form');
      form[0].elements['email'].value = accounts.email[index];
      form[0].elements['email2'].value = accounts.email[index];
      form[0].elements['p'].value = accounts.pwd[index];
      form[0].elements['lname'].value = accounts.lname[index];
      form[0].elements['fname'].value = accounts.fname[index];
      form[0].elements['lname_kana'].value = accounts.lnameKana[index];
      form[0].elements['fname_kana'].value = accounts.fnameKana[index];
      form[0].elements['sex'][0].click();
      form[0].elements['zip.values'].value = accounts.postNum[index];
      form[0].elements['prefecture'].value = accounts.address1[index];
      form[0].elements['city'].value = accounts.address2[index];
      form[0].elements['street'].value = accounts.address3[index];
      form[0].elements['tel.valueAt[0]'].value = accounts.telNum1[index];
      form[0].elements['tel.valueAt[1]'].value = accounts.telNum2[index];
      form[0].elements['tel.valueAt[2]'].value = accounts.telNum3[index];
    }, accounts, index);
  },
  function() {
  // 入力画面　submit
   page.evaluate(function() {
     var form = document.getElementsByName('Regist1Form');
     form[0].elements['execMethod'].click();
   });
  },
  function() {
  // 確認画面　submit
    page.evaluate(function() {
      var form = document.getElementsByName('Regist3Form');
      form[0].elements['chk_news'].click();
      form[0].querySelector('input[type = "submit"]').click();
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
