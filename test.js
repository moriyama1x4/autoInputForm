
var accounts = require('./accounts.js');

var steps = [
  function() {
    console.log(0)
  },
  function() {
    console.log(1)
  },
  function(roop) {
    console.log('roop' + roop)
  }
];



for(var i = 0; i < accounts.lname.length; i++){
  (function(i){
    console.log('i = ' + i);
    var testindex = 0;
    var timer = setInterval(function(){
      if (typeof steps[testindex] == 'function') {
        steps[testindex](i);
        testindex++;
      }
      if (typeof steps[testindex] != 'function' && i == accounts.lname.length - 1) {
        phantom.exit();
      }
    }, 100);
  }(i));
}
