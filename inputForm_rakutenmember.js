//var system = require('system');
var page = new WebPage(), loadInProgress = false;

var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=tp%3Dtop_my';
var accounts = require('./accounts.js');

page.onLoadStarted = function() {
  loadInProgress = true;
  // console.log('ページ読み取り開始');
};

page.onLoadFinished = function() {
  loadInProgress = false;
  // console.log('ページ読み取り完了');
};

page.onCallback = function() {
  page.render('check.png');
}

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
  function() {
  // 入力画面
    page.evaluate(function(email, pwd, lname, fname, lnameKana, fnameKana, postNum, address1, address2, address3, telNum1, telNum2, telNum3) {
      var form =  document.getElementsByName('Regist1Form');
      form[0].elements['email'].value = email + '@gmail.com';
      form[0].elements['email2'].value = email + '@gmail.com';
      form[0].elements['p'].value = pwd;
      form[0].elements['lname'].value = lname;
      form[0].elements['fname'].value = fname;
      form[0].elements['lname_kana'].value = lnameKana;
      form[0].elements['fname_kana'].value = fnameKana;
      form[0].elements['sex'][0].click();
      form[0].elements['zip.values'].value = postNum;
      form[0].elements['prefecture'].value = address1;
      form[0].elements['city'].value = address2;
      form[0].elements['street'].value = address3;
      form[0].elements['tel.valueAt[0]'].value = telNum1;
      form[0].elements['tel.valueAt[1]'].value = telNum2;
      form[0].elements['tel.valueAt[2]'].value = telNum3;
      return;
    }, email, pwd, lname, fname, lnameKana, fnameKana, postNum, address1, address2, address3, telNum1, telNum2, telNum3);
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

for(var i = 0; i < accounts.lname.length; i++){
  (function(i){
    var testindex = 0;
    var timer = setInterval(function(){
      if (typeof steps[testindex] == 'function') {
        steps[testindex]();
        testindex++;
      }
      if (typeof steps[testindex] != 'function' && i == accounts.lname.length) {
        phantom.exit();
      }
    }, 100);
  }(i));
}
