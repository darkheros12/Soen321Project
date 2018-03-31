VoteController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  forLoopVotingCounter: 0,
  voteJson: [],

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

      VoteController.listenForEvents();
    });
  },

  voteYes: function(index) {
    var x = index;
  },

  voteNo: function(index) {
    var x = index;
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    VoteController.contracts.Voting.deployed().then(function(instance) {
      VoteController.voteJson = [];
      VoteController.theInstance = instance;
      return VoteController.theInstance.onGoingVotesCount();
    }).then(function(onGoingVotesCount) {

      var limit = onGoingVotesCount.toNumber();
      
      for(var x = 1; x <= onGoingVotesCount.toNumber(); x++) {
      
        var current = {};
        VoteController.theInstance.onGoingVotes(x).then(function(voting) {
          if(typeof(voting[0]) !== 'undefined') {
            current.id = voting[0];
            current.reason = voting[1];
            current.account = voting[2];
            current.yesCount = voting[3].toNumber();
            current.noCount = voting[4].toNumber();
            current.forBlock = voting[5];
            VoteController.voteJson[VoteController.forLoopVotingCounter] = current;
            VoteController.forLoopVotingCounter++;
          }
          if(VoteController.voteJson.length === onGoingVotesCount.toNumber()) {
            /*
            list all the ongoing votes
            */
            VoteView.renderOngoingVotes(VoteController.voteJson);
          }
        }).catch(function(error) {
          console.error(error);
        });  
      }

    }).then(function(nothing) {
      /*
      list new votes
      */
      VoteController.newVotesSection();
      
    }).catch(function(error){
      console.error(error);
    });
  },



  newVotesSection: function() {
      VoteView.renderCreateVotes(web3.eth.accounts);
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

