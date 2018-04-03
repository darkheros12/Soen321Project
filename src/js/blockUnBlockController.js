BlockUnBlockController = {
  web3Provider: null,
  contracts: {},
  userAccount: '0x0',
  theInstance: {},
  address: null,

  init: function() {
    return BlockUnBlockController.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      BlockUnBlockController.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      BlockUnBlockController.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(BlockUnBlockController.web3Provider);
    }

    //setup the user account
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        BlockUnBlockController.userAccount = account;
      }
    });

    return BlockUnBlockController.initContract();
  },


  initContract: function() {
    $.getJSON("BlockUnBlock.json", function(bnb) {
      // Instantiate a new truffle contract from the artifact
      BlockUnBlockController.contracts.BlockUnBlock = TruffleContract(bnb);
      // Connect provider to interact with contract
      BlockUnBlockController.contracts.BlockUnBlock.setProvider(BlockUnBlockController.web3Provider);

      BlockUnBlockController.listenForEvents();
    });
  },

   // Listen for events emitted from the contract
  listenForEvents: function() {
    BlockUnBlockController.contracts.BlockUnBlock.deployed().then(function(instance) {
      BlockUnBlockController.theInstance = instance;
    }).then(function() {
      BlockUnBlockController.address = BlockUnBlockController.theInstance.address;
    }).catch(function(err) {
        console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    BlockUnBlockController.init();
  });
});



