var inputForm = require('../../inputForm.js');
var campaignUrl = 'https://reserve.golfdigest.co.jp/special/sp_freeticket/?car=freeticket_east';
var page = new WebPage();
var fs = require('fs');
var path = './gdo_forms.js'

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
      var courseList = document.querySelectorAll('div.gc-unit');

      for(var i = 0; i < courseList.length; i++){
        if(courseList[i].querySelector('span.str1').childNodes[0].textContent.match(/東京|神奈川|千葉|埼玉|栃木|群馬|茨城|静岡|長野/)){
          formUrls.push(courseList[i].querySelector('span.gc-entry-box a').getAttribute('href'));
        }
      }
      return formUrls;
    });

    fs.write(path, "var forms = " + JSON.stringify(forms) + ";\n\nmodule.exports = forms;");

  }
];

inputForm(page, 0, 0, 0, steps);
