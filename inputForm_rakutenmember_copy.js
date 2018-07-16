var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=tp%3Dtop_my';
var accounts = require('./accounts.js');

// var i = 4;
 for(var i = 4; i < accounts.lname.length; i++){
  var page = new WebPage(), loadInProgress = false; testindex = 0;
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
      page.evaluate(function(accounts, i) {
        var form =  document.getElementsByName('Regist1Form');
        form[0].elements['email'].value = accounts.email[i] + '@gmail.com';
        form[0].elements['email2'].value = accounts.email[i] + '@gmail.com';
        form[0].elements['p'].value = accounts.pwd[i];
        form[0].elements['lname'].value = accounts.lname[i];
        form[0].elements['fname'].value = accounts.fname[i];
        form[0].elements['lname_kana'].value = accounts.lnameKana[i];
        form[0].elements['fname_kana'].value = accounts.fnameKana[i];
        form[0].elements['sex'][0].click();
        form[0].elements['zip.values'].value = accounts.postNum[i];
        console.log(accounts.address1[i]);
        form[0].elements['prefecture'].value = accounts.address1[i];
        form[0].elements['city'].value = accounts.address2[i];
        form[0].elements['street'].value = accounts.address3[i];
        form[0].elements['tel.valueAt[0]'].value = accounts.telNum1[i];
        form[0].elements['tel.valueAt[1]'].value = accounts.telNum2[i];
        form[0].elements['tel.valueAt[2]'].value = accounts.telNum3[i];
        return;
      }, accounts, i);
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

  function doStep(i, accounts){
    if (!loadInProgress && typeof steps[testindex] == 'function') {
      steps[testindex](i);
      testindex++;
    }else if (typeof steps[testindex] != 'function' && i == accounts.lname.length - 1) {
      phantom.exit();
    }
  }

  interval = setInterval(function(){doStep(i, accounts)}, 100);
}
