var accounts = [
  ['夏目', '大輔', 'ナツメ', 'ダイスケ', 'daisukenatsume5', 'grFpfuLg', '1990', '6', '30', '154-0023', '東京都', '世田谷区', '若林1-7-12 メゾン若林205', '080', '5171', '2547'],
  ['氏家', '信二', 'ウジイエ', 'シンジ', 'xinershijia', 'FLUT28Bi', '1993', '1', '22', '100-0006', '東京都', '千代田区', '有楽町2004-9-11', '090', '9379', '3626'],
  ['滝口', '恵一', 'タキグチ', 'ケイイチ', 'huiyilongkou', 'uXmiqM12', '1990', '8', '1', '162-0855', '東京都', '新宿区', '二十騎町2-14-2', '080', '2555', '4810'],
  ['松村', '康博', 'マツムラ', 'ヤスヒロ', 'yasuhiro11357', 'idDxr0Fl', '1989', '12', '16', '101-0048', '東京都', '千代田区', '神田司町3-7', '090', '8533', '6414'],
  ['細井', '伸也', 'ホソイ', 'シンヤ', 'shenyexijing', 'rzBiF01y', '1985', '12', '3', '101-0025', '東京都', '千代田区', '神田佐久間町2001-12-4神田佐久間町プラザ205', '080', '7351', '9270']
]

var accountsData = {
  'lname' : [],
  'fname' : [],
  'lnameKana' : [],
  'fnameKana' : [],
  'email' : [],
  'pwd' : [],
  'bYear' : [],
  'bMonth' : [],
  'bDay' : [],
  'postNum' : [],
  'address1' : [],
  'address2' : [],
  'address3' : [],
  'telNum1' : [],
  'telNum2' : [],
  'telNum3' : []
}

accounts.forEach(function(account){
  accountsData.lname.push(account[0]);
  accountsData.fname.push(account[1]);
  accountsData.lnameKana.push(account[2]);
  accountsData.fnameKana.push(account[3]);
  accountsData.email.push(account[4]);
  accountsData.pwd.push(account[5]);
  accountsData.bYear.push(account[6]);
  accountsData.bMonth.push(account[7]);
  accountsData.bDay.push(account[8]);
  accountsData.postNum.push(account[9]);
  accountsData.address1.push(account[10]);
  accountsData.address2.push(account[11]);
  accountsData.address3.push(account[12]);
  accountsData.telNum1.push(account[13]);
  accountsData.telNum2.push(account[14]);
  accountsData.telNum3.push(account[15]);
});

module.exports = accountsData;
