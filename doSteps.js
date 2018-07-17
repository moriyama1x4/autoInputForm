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

var steps = [];

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


