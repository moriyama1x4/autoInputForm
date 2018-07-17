var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=tp%3Dtop_my';
var accounts = require('./accounts.js');
var memIndex = 10; //何番目のアカウントから処理を始めるか
var page = new WebPage(), loadInProgress = false; stepIndex = 0;

page.onLoadStarted = function() {
  loadInProgress = true;
   console.log('ページ読み取り開始');
};

page.onLoadFinished = function() {
  loadInProgress = false;
   console.log('ページ読み取り完了');
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
  // 入力画面 入力
  console.log('なか' + accounts.lname[memIndex]);
    page.evaluate(function(accounts, memIndex) {
      console.log('なかなか');
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

function doSteps(){
  console.log('memIndex = ' + memIndex + '  stepIndex = ' + stepIndex);
  if(typeof steps[stepIndex] != 'function' && memIndex == accounts.lname.length - 1){
    console.log('処理終了');
    phantom.exit();
  }else if (!loadInProgress && typeof steps[stepIndex] == 'function') {//次のステップに移行
    steps[stepIndex]();
    stepIndex++;
  }else if(!loadInProgress && typeof steps[stepIndex] != 'function'){//次のメンバーに移行
    stepIndex = 0;
    memIndex++;
  }
}

interval = setInterval(function() {doSteps()}, 100);


