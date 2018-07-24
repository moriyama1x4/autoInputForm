function inputForm(page, startMemIndex, endMemIndex, steps){
  var memIndex = startMemIndex;
  var loadInProgress = false; stepIndex = 0;

  page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('ページ読み取り開始');
  };

  page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('ページ読み取り完了');
  };

  page.onCallback = function() {
    page.render('check' + memIndex + '.png');
  }

  function doSteps(){
    console.log('memIndex = ' + memIndex + '  stepIndex = ' + stepIndex);
    if(typeof steps[stepIndex] != 'function' && memIndex == endMemIndex){
      console.log('処理終了');
      phantom.exit();
    }else if (!loadInProgress && typeof steps[stepIndex] == 'function') {//次のステップに移行
      steps[stepIndex](memIndex);
      stepIndex++;
    }else if(!loadInProgress && typeof steps[stepIndex] != 'function'){//次のメンバーに移行
      stepIndex = 0;
      memIndex++;
    }
  }

  interval = setInterval(function() {doSteps()}, 100);
}

module.exports = inputForm;
