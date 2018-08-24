var inputForm = require('../../inputForm.js');
var campaignUrl = 'https://golf-jalan.net/freeticket/';
var page = new WebPage();
var fs = require('fs');
var path = './jaran_forms.js'

var steps = [
  function() {
    // キャンペーン画面ロード
    page.cookies = [];
    page.open(campaignUrl);
  },
  function() {
    // キャプチャ
    var forms = page.evaluate(function() {
      var formUrls = [];
      var courseList = document.querySelectorAll('ul.ticketFreeList > li');

      for(var i = 0; i < courseList.length; i++){
        if(courseList[i].querySelector('div.ticketFreeHeader span').childNodes[0].textContent.match(/東京|神奈川|千葉|埼玉|栃木|群馬|茨城/)){
          formUrls.push('https://golf-jalan.net' + courseList[i].querySelector('div.ticketFreeInner div.entryBtnArea p.mt5 a').getAttribute('href'));
        }
      }
      return formUrls;
    });

    fs.write(path, "var forms = " + JSON.stringify(forms) + ";\n\nmodule.exports = forms;");

  }
];

inputForm(page, 0, 0, 0, steps);
