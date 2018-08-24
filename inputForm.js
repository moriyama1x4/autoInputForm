function inputForm(page, formNum, startMemIndex, endMemIndex, steps){
  var loadInProgress = false; stepIndex = 0;
  var index = {
    'mem' : startMemIndex,
    'form' : 0
  };

  page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('ページ読み取り開始');
  };

  page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('ページ読み取り完了');
  };

  page.onCallback = function() {
    page.render('check' + index['mem'] + '_' + index['form'] + '.png');
  };

  function doSteps(){
    if(!loadInProgress){
      console.log('mem = ' + index['mem'] + ' form = ' + index['form'] + '  step = ' + stepIndex);
      if (typeof steps[stepIndex] == 'function') {//次のステップに移行
        steps[stepIndex](index);
        stepIndex++;
      }else if(index['form'] < formNum){//次のフォームに移行
        stepIndex = 0;
        index['form']++;
      }else if(index['mem'] < endMemIndex){//次のアカウントに移行
        stepIndex = 0;
        index['form'] = 0;
        index['mem']++;
      }else{
        console.log('処理終了');
        phantom.exit();
      }
    }
  }

  interval = setInterval(function() {doSteps()}, 3000);
}

module.exports = inputForm;
