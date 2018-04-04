MoneyController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  moneyJson: {},
  address: null,

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

   setFundBallotAddress: function() {

      MoneyController.contracts.DonationAresh.deployed().then(function(instance) {

      MoneyController.address = instance.address;
      instance.onSpnBal().then(function(val) {
                if(!val) {
                    instance.setOnSpenBallot(FundVoteController.address).then(function() {
                    var x=0;
                }).catch(function(err) {
                     console.error(err);
                });
            }
        }).catch(function(error) {
            console.error(error);
        });

      }).then(function() {
        var x=0;
        //MoneyController.listenForEvents();
      }).catch(function(error) {
        console.error(error);
      });

   },

  initContract: function() {
    $.getJSON("DonationAresh.json", function(money) {
      // Instantiate a new truffle contract from the artifact
      MoneyController.contracts.DonationAresh = TruffleContract(money);
      // Connect provider to interact with contract
      MoneyController.contracts.DonationAresh.setProvider(MoneyController.web3Provider);

      MoneyController.contracts.DonationAresh.deployed().then(function(instance) {

        MoneyController.address = instance.address;
        FundVoteController.init();
        instance.blkUnBlkSetExtern().then(function(val) {
                if(!val) {
                    instance.setBlkUnBlkAddress(BlockUnBlockController.address).then(function() {
                    var x=0;
                }).catch(function(err) {
                     console.error(err);
                });
            }
        }).catch(function(error) {
            console.error(error);
        });

      }).then(function() {
        MoneyController.listenForEvents();
      }).catch(function(error) {
        console.error(error);
      });

    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
      moneyJson = {};
      MoneyController.theInstance = instance;

      return web3.eth.getBalance(MoneyController.theInstance.address, function(err, val) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(val);
            moneyJson.amount = web3.fromWei(val.toNumber());
            MoneyView.render(moneyJson);
        }
      })

      return MoneyController.theInstance.amount();
    }).then(function(amount) {
      //moneyJson.amount = amount.toNumber();
      moneyJson.address = MoneyController.theInstance.address;
      //MoneyView.render(moneyJson);
      return MoneyController.theInstance.spendCounter();
    }).then(function(expn) {

        var limit = expn.toNumber();
        var expJson = [];
        var loopCounter = 0;

        for(var x=1; x <= limit; x++) {


            MoneyController.theInstance.expenditures(x).then(function(exp) {
                if(typeof(exp[0] !== undefined)) {
                    var current = {};
                    current.id = exp[0];
                    current.reason = exp[1];
                    current.account = exp[2];
                    current.amount = exp[3];
                    expJson[loopCounter] = current;
                    loopCounter++;
                }

                if(expJson.length == limit) {
                    MoneyView.renderExpenditures(expJson);
                }
            }).catch(function(err) {
                console.error(err);
            });

        }
    });
  },

  donate: function() {
      var amount = $('#amountToDonate').val();
     MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
     MoneyController.theInstance = instance;
      return instance.safeMoney(amount, { from: MoneyController.userAccount, value:  web3.toWei(amount, 'ether')});
    }).then(function(result) {
        var x=0;
      }) .catch(function(err) {
        console.error(err);
      });
  },
  

  /*spend: function() {
      var amount = $('#amountToSpend').val();
      var reason = $('#reasonToSpend').val();
      var account = $('#accountToSpend').val();
     MoneyController.contracts.DonationAresh.deployed().then(function(instance) {
      return instance.spending(amount, account, reason);
    }).then(function(result) {
        var x=0;
      }) .catch(function(err) {
        console.error(err);
      });
  },*/

  setBlobkUnBlockAddr: function() {
      BlockUnBlockController.contracts.BlockUnBlock.deployed().then(function(instance) {
           return MoneyController.theInstance.setBlkUnBlkAddress(instance.address).then(function(val) {
                var x=0;
            }).catch(function(err) {
                console.log(err);
            })
      }).catch(function (err) {
        console.error(err);
      })

  },
};

$(function() {
  $(window).load(function() {
    MoneyController.init();
  });
});



