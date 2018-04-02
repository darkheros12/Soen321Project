VoteController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  forLoopVotingCounter: 0,
  voteJson: [],
  blockedList: [],

  init: function() {
    return VoteController.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      VoteController.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      VoteController.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(VoteController.web3Provider);
    }

    //setup the user account
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        VoteController.userAccount = account;
      }
    });

    return VoteController.initContract();
  },

  initContract: function() {
    $.getJSON("Voting.json", function(voting) {
      // Instantiate a new truffle contract from the artifact
      VoteController.contracts.Voting = TruffleContract(voting);
      // Connect provider to interact with contract
      VoteController.contracts.Voting.setProvider(VoteController.web3Provider);

      VoteController.contracts.Voting.deployed().then(function(instance) {
        instance.setBlkUnBlkAddress(BlockUnBlockController.address).then(function() {
            var x=0;
        }).catch(function(err) {
            console.error(err);
        });
      }).then(function() {
        VoteController.listenForEvents();
      }).catch(function(error) {
        console.error(error);
      });

      //VoteController.listenForEvents();
    });
  },

  voteYes: function(index) {
    VoteController.vote(index, 1);
  },

  voteNo: function(index) {
    VoteController.vote(index, 0);
  },

  vote: function(index, yesOrNo) {
    VoteController.theInstance.vote(
        VoteController.voteJson[index].id.toNumber(),
        yesOrNo,
        VoteController.voteJson[index].account,
        { from: VoteController.userAccount}).then(function() {
            var x=0;
        }).catch(function(error) {
            console.error(error);
        });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    VoteController.contracts.Voting.deployed().then(function(instance) {
      VoteController.voteJson = [];
      VoteController.theInstance = instance;
      return VoteController.theInstance.onGoingVotesCount();
    }).then(function(onGoingVotesCount) {

      var limit = onGoingVotesCount.toNumber();

      if(limit === 0) {
        VoteController.getBlockedList();
      }

      for(var x = 1; x <= onGoingVotesCount.toNumber(); x++) {

        VoteController.theInstance.onGoingVotes(x).then(function(voting) {
          if(typeof(voting[0]) !== 'undefined') {
            var current = {};
            current.id = voting[0];
            current.reason = voting[1];
            current.account = voting[2];
            current.yesCount = voting[3].toNumber();
            current.noCount = voting[4].toNumber();
            current.forBlock = voting[5];
            current.voters = voting[6];
            current.complete = voting[7];
            VoteController.voteJson[VoteController.forLoopVotingCounter] = current;
            VoteController.forLoopVotingCounter++;

          }
          if(VoteController.voteJson.length === onGoingVotesCount.toNumber()) {
            /*
            list all the ongoing votes
            */
                VoteController.getBlockedList();

          }
        }).catch(function(error) {
          console.error(error);
        });  
      }

    }).then(function(nothing) {
      /*
      list new votes
      */

    }).catch(function(error){
      console.error(error);
    });
  },



  newVotesSection: function() {
    VoteView.renderCreateVotes(GanacheAccounts.accounts);
  },

  getBlockedList: function() {
    var limit;
    var counter=0;

    BlockUnBlockController.theInstance.total().then(function(val) {
        limit = val.toNumber();
        if(limit === 0) {
            VoteController.newVotesSection();
        }
        for(var x=1; x<=limit; x++) {
            BlockUnBlockController.theInstance.blockedHelper(x).then(function(addr) {
            VoteController.blockedList[counter] = addr;
            counter++;
             if(counter==limit) {
                VoteView.renderOngoingVotes(VoteController.voteJson);
                VoteController.newVotesSection();
             }
            }).catch(function(error) {
                console.error(error);
            });
        }

    }).catch(function(error) {
        console.error(error);
    });
  },

  newVoteSubmit: function(num) {
    var reason = $('#reason' + num).val();
    var accnt = $('#accnt' + num).text();
    var blockUnblock = $('#blockUnblock' + num).val();
    
    VoteController.contracts.Voting.deployed().then(function(instance) {
      return instance.addVoting(reason, accnt, parseInt(blockUnblock), {from: VoteController.userAccount});
    }).then(function(result) {
      VoteController.listenForEvents();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    VoteController.init();
  });
});

