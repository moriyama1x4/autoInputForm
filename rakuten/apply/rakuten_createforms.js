var inputForm = require('../../inputForm.js');
var campaignUrl = 'https://event.gora.golf.rakuten.co.jp/contents/free/2018/0820/';
var page = new WebPage();
var fs = require('fs');
var path = './rakuten_forms.js'

var steps = [
  function() {
    // キャンペーン画面ロード
    page.cookies = [];
    page.open(campaignUrl);
  },
  function() {
    // キャプチャ
    var forms = page.evaluate(function() {
      var forms = {'url' : [], 'name' : []};
      var courseList = document.querySelectorAll('li.coursename a');

      for(var i = 0; i < courseList.length; i++){
        if(courseList[i].childNodes[2].textContent.match(/東京|神奈川|千葉|埼玉|栃木|群馬|茨城|静岡|長野/)){
          forms.url.push(courseList[i].getAttribute('href'));
          forms.name.push(courseList[i].childNodes[0].textContent);
        }
      }
      return forms;
    });

    fs.write(path, "var courses = " + JSON.stringify(forms.name) + "\n\nvar forms = " + JSON.stringify(forms.url) + ";\n\nmodule.exports = forms;");

  }
];

inputForm(page, 0, 0, 0, steps);
