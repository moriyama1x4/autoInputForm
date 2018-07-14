//var system = require('system');
var page = new WebPage(), testindex = 0, loadInProgress = false;

var url = 'https://booking.gora.golf.rakuten.co.jp/?menu=id&act=login&query=menu%3Dprv_camp%26act%3Dentry_input%26prv_camp_id%3D10610';
var username = '***';
var password = '***';


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
    // ログイン画面 ipass入力
    page.evaluate(function(username, password) {
      var form = document.getElementsByName('login');
      form[0].elements['u'].value = username;
      form[0].elements['p'].value = password;
      return;
    }, username, password);
  },
  function() {
    // ログイン画面　submit
    page.evaluate(function() {
      var form = document.getElementsByName('login');
      form[0].submit();
    });
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
    // Create Screen Capture
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == 'function') {
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != 'function') {
    phantom.exit();
  }
}, 50);
