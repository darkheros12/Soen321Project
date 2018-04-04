var FundVote = artifacts.require("./ExpenVote.sol");

module.exports = function(deployer) {
  deployer.deploy(FundVote);
};
