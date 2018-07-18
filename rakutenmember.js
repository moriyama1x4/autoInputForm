var accounts = require('./accounts.js');
var inputForm = require('./inputForm.js');
var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=tp%3Dtop_my';
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = 1;//accounts.lname.length - 1;
var memIndex = startMemIndex;
var pages = [];

for(var i = 0; i <= endMemIndex; i++){
  if(i >= startMemIndex && i <= endMemIndex){
    pages.push(new WebPage())
  }else{
    pages.push('');
  }
}

var steps = [
  function() {
    // ログイン画面 ロード
    pages[memIndex].open(url);
  },
  function() {
   // 会員登録画面へ遷移
   pages[memIndex].evaluate(function() {
    document.getElementById('entryBtn').click();
   });
  },
  function() {
  // 入力画面 入力
    pages[memIndex].evaluate(function(accounts, memIndex) {
      var form =  document.getElementsByName('Regist1Form');
      form[0].elements['email'].value = accounts.email[memIndex];
      form[0].elements['email2'].value = accounts.email[memIndex];
      form[0].elements['p'].value = accounts.pwd[memIndex];
      form[0].elements['lname'].value = accounts.lname[memIndex];
      form[0].elements['fname'].value = accounts.fname[memIndex];
      form[0].elements['lname_kana'].value = accounts.lnameKana[memIndex];
      form[0].elements['fname_kana'].value = accounts.fnameKana[memIndex];
      form[0].elements['sex'][0].click();
      form[0].elements['zip.values'].value = accounts.postNum[memIndex];
      form[0].elements['prefecture'].value = accounts.address1[memIndex];
      form[0].elements['city'].value = accounts.address2[memIndex];
      form[0].elements['street'].value = accounts.address3[memIndex];
      form[0].elements['tel.valueAt[0]'].value = accounts.telNum1[memIndex];
      form[0].elements['tel.valueAt[1]'].value = accounts.telNum2[memIndex];
      form[0].elements['tel.valueAt[2]'].value = accounts.telNum3[memIndex];
    }, accounts, memIndex);
  },
  function() {
  // 入力画面　submit
   pages[memIndex].evaluate(function() {
     var form = document.getElementsByName('Regist1Form');
     form[0].elements['execMethod'].click();
   });
  },
  function() {
  // 確認画面　submit
    pages[memIndex].evaluate(function() {
      var form = document.getElementsByName('Regist3Form');
      form[0].elements['chk_news'].click();
      form[0].querySelector('input[type = "submit"]').click();
    });
  },
  function() {
    // キャプチャ
    pages[memIndex].evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(pages, url, startMemIndex, endMemIndex, steps);
