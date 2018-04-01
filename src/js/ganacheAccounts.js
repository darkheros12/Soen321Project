//var accountArr;
GanacheAccounts = {

	accounts: null,

	getAllAccounts: function() {
		var x;
		x = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')).eth.
		getAccounts(function(err, accounts) {
	 		//console.log(accounts);
	 		if(typeof(accounts) !== 'undefined') {
       GanacheAccounts.accounts = accounts;	
       Test.init();
	 	}
	 
	 	return accounts;
	 //x = accounts;
		});
	}
}

$(function() {
  $(window).load(function() {
    GanacheAccounts.getAllAccounts();
  });
});
/*function getAllAccounts()
{

	// Because of Metamask we have to new web3 to access all the accounts in Ganache
	/*new Web3(new Web3.providers.HttpProvider('http://localhost:7545')).eth.getAccounts(
		(err, accounts) => {
	 console.log(accounts);
	 return accounts;
	}).then(function(accnts) 
	{accountArr = accnts
	});*/

	/*var x;
	x = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')).eth.
	getAccounts(function(err, accounts) {
	 console.log(accounts);
	 if(typeof(accounts) !== 'undefined') {
	 	x = accounts;	
	 }
	 
	 return accounts;
	 //x = accounts;
	});


	console.log(x);*/

