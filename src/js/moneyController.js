MoneyController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  moneyJson: {},

  init: function() {
    return MoneyController.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      MoneyController.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      MoneyController.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(MoneyController.web3Provider);
    }

    //setup the user account
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        MoneyController.userAccount = account;
      }
    });

    return MoneyController.initContract();
  },


  initContract: function() {
    $.getJSON("DonationAresh.json", function(money) {
      // Instantiate a new truffle contract from the artifact
      MoneyController.contracts.DonationAresh = TruffleContract(money);
      // Connect provider to interact with contract
      MoneyController.contracts.DonationAresh.setProvider(MoneyController.web3Provider);

      MoneyController.listenForEvents();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
      moneyJson = {};
      MoneyController.theInstance = instance;
      return MoneyController.theInstance.amount();
    }).then(function(amount) {
      moneyJson.amount = amount.toNumber();
      moneyJson.address = MoneyController.theInstance.address;
      MoneyView.render(moneyJson);
    });
  },

  donate: function() {
      var amount = $('#amountToDonate').val();
      MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
      instance.safeMoney({ from: MoneyController.theInstance.address, value:  web3.toWei(amount, "ether")});
      //instance.safeMoney({ from: MoneyController.theInstance.address});
    }).then(function(result) {
     // MoneyController.listenForEvents();
     var x=0;
     MoneyController.updateBalance();
    }).catch(function(err) {
      var x=0;
      console.error(err);
    });
  },

  updateBalance: function() {
    var donELem = $('#totalDonations');
    return MoneyController.theInstance.getBalance({ from: MoneyController.userAccount }).then(function(result) {
        var x=0;
        donELem.html("Total: " + result);
    }).catch(function(err) {
        var x=0;
        console.error(err);
    })
  },
  

  spend: function() {
      var x = BlockUnBlockController.contract;
      var amount = $('#amountToSpend').val();
      var spendOn = $('#contractToSpend').val();
      MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
      return instance.spending(amount, spendOn, { from: MoneyController.theInstance.address });
    }).then(function(result) {
      MoneyController.listenForEvents();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    MoneyController.init();
  });
});



