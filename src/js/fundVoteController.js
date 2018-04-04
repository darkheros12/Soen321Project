FundVoteController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  address: null,
  expenVote: [],
  address: null,

  init: function() {
    return FundVoteController.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      FundVoteController.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      FundVoteController.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(FundVoteController.web3Provider);
    }

    //setup the user account
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        FundVoteController.userAccount = account;
      }
    });

    return FundVoteController.initContract();
  },


  initContract: function() {
    $.getJSON("ExpenVote.json", function(bnb) {
      // Instantiate a new truffle contract from the artifact
      FundVoteController.contracts.FundVote = TruffleContract(bnb);
      // Connect provider to interact with contract
      FundVoteController.contracts.FundVote.setProvider(FundVoteController.web3Provider);

      FundVoteController.contracts.FundVote.deployed().then(function(instance) {

      FundVoteController.address = instance.address;

      instance.onSpnBal().then(function(val) {
                if(!val) {
                    instance.setTheDonationAddr(MoneyController.address).then(function() {
                    var x=0;
                }).catch(function(err) {
                     console.error(err);
                });
            }
        }).catch(function(error) {
            console.error(error);
        });

      }).then(function() {
        MoneyController.setFundBallotAddress();
        FundVoteController.listenForEvents();
      }).catch(function(error) {
        console.error(error);
      });

    });
  },

   // Listen for events emitted from the contract
  listenForEvents: function() {
    FundVoteController.contracts.FundVote.deployed().then(function(instance) {
      FundVoteController.theInstance = instance;
    }).then(function() {
      FundVoteController.address = FundVoteController.theInstance.address;
      FundVoteController.loadSpendBallot();
    }).catch(function(err) {
        console.error(err);
    });
  },

   triggerSpendBallot: function() {
      var amount = $('#amountToSpend').val();
      var reason = $('#reasonToSpend').val();
      var account = $('#accountToSpend').val();
      FundVoteController.contracts.FundVote.deployed().then(function(instance) {
      return instance.addVoting(reason, account, amount);
    }).then(function(result) {
        var x=0;
      }) .catch(function(err) {
        console.error(err);
      });
  },

  loadSpendBallot: function() {
    var theInstance;
     FundVoteController.contracts.FundVote.deployed().then(function(instance) {
           theInstance = instance;

           return theInstance.expenVoteCounter().then(function(count) {

                var limit = count.toNumber();
                var loopCounter = 0;
                for(var x=1; x<=limit; x++) {

                    theInstance.expenVoteBallots(x).then(function(expVote) {

                        if(typeof(expVote[0]) !== 'undefined') {
                            var current = {};
                            current.id = expVote[0];
                            current.reason = expVote[1];
                            current.account = expVote[2];
                            current.amount = expVote[3];
                            current.yesCount = expVote[4];
                            current.noCount = expVote[5];
                            current.complete = expVote[6];
                            FundVoteController.expenVote[loopCounter] = current;
                            loopCounter++;
                        }

                        if(FundVoteController.expenVote.length == limit) {
                            FundVoteView.rednerOngoingExpVote(FundVoteController.expenVote);
                        }
                    }).catch(function(err) {
                        console.error(err);
                    });

                }
           }).catch(function(err) {
                console.error(err);
           });

     }).catch(function(err) {
        console.error(err);
     });
  },

  voteYes: function(index) {
    FundVoteController.vote(index, 1);
  },

  voteNo: function(index) {
    FundVoteController.vote(index, 0);
  },

  vote: function(index, yesOrNo) {
        FundVoteController.theInstance.vote(
        FundVoteController.expenVote[index].id.toNumber(),
        yesOrNo,
        FundVoteController.expenVote[index].account,
        { from: FundVoteController.userAccount}).then(function() {
            var x=0;
        }).catch(function(error) {
            console.error(error);
        });
  },
};

$(function() {
  $(window).load(function() {
    //FundVoteController.init();
  });
});



