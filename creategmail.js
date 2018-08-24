var inputForm = require('./inputForm.js');
var url = 'https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ltmpl=default&flowName=GlifWebSignIn&flowEntry=SignUp';
var startMemIndex = 0; //何番目のアカウントから処理を始めるか
var endMemIndex = 0;//accounts.lname.length - 1;
var memIndex = startMemIndex;
var page = new WebPage();

var steps = [
  function(index) {
    // ログイン画面ロード
    page.open(url);
  },
  // function() {
  //  // 会員登録画面へ遷移
  //  page.evaluate(function() {
  //   document.querySelector('p.link_btn > a').click()
  //  });
  // },
  function() {
  // 入力画面 入力
    page.evaluate(function() {
      var form =  document.querySelector('form[jsname = "nUpftc"]');
      form.elements['lastName'].value = '熊谷';
      form.elements['firstName'].value = '徹';
      form.elements['Username'].value = 'morihogeyamahoges';
      form.elements['Passwd'].value = 'monyohoge';
      form.elements['ConfirmPasswd'].value = 'monyohoge';
      document.querySelector('div[class = "Vwe4Vb MbhUzd"]').click();
    });
  },
  // function() {
  // // 入力画面　submit
  //  page.evaluate(function() {
  //    var form = document.getElementsByName('index_form');
  //    form[0].submit();
  //  });
  // },
  // function() {
  // // 確認画面　submit
  //   page.evaluate(function() {
  //     var form = document.getElementsByName('frm2');
  //     form[0].submit();
  //   });
  // },
  function() {
    // キャプチャ
    page.evaluate(function() {
      window.callPhantom();
    });
  }
];

inputForm(page, 0, startMemIndex, endMemIndex, steps);
