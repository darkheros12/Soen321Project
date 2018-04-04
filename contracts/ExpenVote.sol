pragma solidity ^0.4.2;

import "./DonationAresh.sol";

contract ExpenVote {

    struct ExpenditureVotes {
        uint id;
        string reason;
        address account;
        uint amount;
        uint yesCount;
        uint noCount;
        bool complete;
        bool won;
        address[] voterAddress;
    }

    uint public expenVoteCounter;
    mapping(uint => ExpenditureVotes) public expenVoteBallots;
    uint votesForSuccess = 2;
    DonationAresh d;

    bool private onSpnSet;
    bool public onSpnBal;

    function ExpenVote() {
        expenVoteCounter = 0;
    }

    function setTheDonationAddr(address donationAddr) {
        if(!onSpnSet) {
            onSpnSet = true;
            onSpnBal = true;
            d = DonationAresh(donationAddr);
        }
    }

    function addVoting(string _reason, address _account, uint forAmount) public {
        if(!d.isBlocked(_account)) {
            expenVoteCounter ++;
            address[] v;
            expenVoteBallots[expenVoteCounter] = ExpenditureVotes(expenVoteCounter, _reason, _account, forAmount, 0, 0, false, false, v);
        }
    }

     function hasVoted (uint _candidateId) public returns (bool) {
        for(uint x =0; x < expenVoteBallots[_candidateId].voterAddress.length; x++) {
            if(expenVoteBallots[_candidateId].voterAddress[x] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function verify(uint _candidateId) {

        if(expenVoteBallots[_candidateId].yesCount >= votesForSuccess) {
            expenVoteBallots[_candidateId].complete = true;
            expenVoteBallots[_candidateId].won = true;
            d.spending(expenVoteBallots[_candidateId].amount, expenVoteBallots[_candidateId].account, expenVoteBallots[_candidateId].reason);
        }
        else if(expenVoteBallots[_candidateId].noCount >= votesForSuccess) {
            expenVoteBallots[_candidateId].complete = true;
            expenVoteBallots[_candidateId].won = false;
        }
    }

    function vote (uint _candidateId, uint yesOrNo, address candidateAddress) public {
        require(_candidateId > 0 && _candidateId <= expenVoteCounter);

        if(!hasVoted(_candidateId)) {
            if(yesOrNo == 0) {
                expenVoteBallots[_candidateId].noCount ++;
            }
            else {
                expenVoteBallots[_candidateId].yesCount ++;
            }
            expenVoteBallots[_candidateId].voterAddress.push(msg.sender);
        }

        verify(_candidateId);
    }
}
