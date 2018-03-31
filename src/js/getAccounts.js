var account = [];
Test = {
  
  init: function() {
    
    for(var i = 0 ; i < GanacheAccounts.accounts.length; i++){
      account.push(GanacheAccounts.accounts[i]);

    } 
  }
}
    
console.log(account);
/*$(function() {
  $(window).load(function() {
    Test.init();
  });
});*/