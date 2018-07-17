var accounts = [
  ['夏目', '大輔', 'ナツメ', 'ダイスケ', 'なつめ', 'だいすけ', 'daisukenatsume5@gmail.com', 'grFpfuLg', '1990', '6', '30', '154-0023', '東京都', '世田谷区', '若林1-7-12 メゾン若林205', '080', '5171', '2547'],
  ['氏家', '信二', 'ウジイエ', 'シンジ', 'うじいえ', 'しんじ', 'xinershijia@gmail.com', 'FLUT28Bi', '1993', '1', '22', '100-0006', '東京都', '千代田区', '有楽町2004-9-11', '090', '9379', '3626'],
  ['滝口', '恵一', 'タキグチ', 'ケイイチ', 'たきぐち', 'けいいち', 'huiyilongkou@gmail.com', 'uXmiqM12', '1990', '8', '1', '162-0855', '東京都', '新宿区', '二十騎町2-14-2', '080', '2555', '4810'],
  ['松村', '康博', 'マツムラ', 'ヤスヒロ', 'まつむら', 'やすひろ', 'yasuhiro11357@gmail.com', 'idDxr0Fl', '1989', '12', '16', '101-0048', '東京都', '千代田区', '神田司町3-7', '090', '8533', '6414'],
  ['細井', '伸也', 'ホソイ', 'シンヤ', 'ほそい', 'しんや', 'shenyexijing@gmail.com', 'rzBiF01y', '1985', '12', '3', '101-0025', '東京都', '千代田区', '神田佐久間町2001-12-4神田佐久間町プラザ205', '080', '7351', '9270'],
  ['志村', '卓', 'シムラ', 'スグル', 'しむら', 'すぐる', 'suguru9330@yahoo.co.jp', 'bUq2AuGI', '1984', '9', '29', '107-0062', '東京都', '港区', '南青山2-16-15南青山パーク219', '080', '7475', '6882'],
  ['竹田', '一彦', 'タケダ', 'カズヒコ', 'たけだ', 'かずひこ', 'kazuhiko48293@yahoo.co.jp', 'FO4TrcIl', '1990', '11', '17', '190-0032', '東京都', '立川市', '上砂町1-15-17', '080', '3132', '0076'],
  ['須田', '政義', 'スダ', 'マサヨシ', 'すだ', 'まさよし', 'masayoshisuda0417@yahoo.co.jp', '77dRFYGk', '1988', '4', '17', '106-0045', '東京都', '港区', '麻布十番1-4', '090', '4564', '5023'],
  ['原田', '譲', 'ハラダ', 'ジョウ', 'はらだ', 'じょう', 'joharada322@yahoo.co.jp', 'yvVASss5', '1990', '3', '22', '185-0031', '東京都', '国分寺市', '富士本2002-3-8', '090', '4618', '4370'],
  ['野沢', '信太郎', 'ノザワ', 'シンタロウ', 'のざわ', 'しんたろう', 'shintarou2536@yahoo.co.jp', 'td2RVeNm', '1986', '3', '9', '162-0855', '東京都', '新宿区', '二十騎町2-6パーク二十騎町209', '080', '3940', '1094'],
  ['谷本', '啓一', 'タニモト', 'ケイイチ', 'たにもと', 'けいいち', 'knk_h_n_fkeiichi8525@yahoo.co.jp', '7j180mwW', '1987', '1', '23', '203-0023', '東京都', '東久留米市', '南沢2-16-12', '080', '9871', '0842']
]

var accountsData = {
  'lname' : [],
  'fname' : [],
  'lnameKana' : [],
  'fnameKana' : [],
  'lnameHira' : [],
  'fnameHira' : [],
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
  accountsData.lnameHira.push(account[4]);
  accountsData.fnameHira.push(account[5]);
  accountsData.email.push(account[6]);
  accountsData.pwd.push(account[7]);
  accountsData.bYear.push(account[8]);
  accountsData.bMonth.push(account[9]);
  accountsData.bDay.push(account[10]);
  accountsData.postNum.push(account[11]);
  accountsData.address1.push(account[12]);
  accountsData.address2.push(account[13]);
  accountsData.address3.push(account[14]);
  accountsData.telNum1.push(account[15]);
  accountsData.telNum2.push(account[16]);
  accountsData.telNum3.push(account[17]);
});

module.exports = accountsData;
