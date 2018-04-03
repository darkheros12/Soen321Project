/*pragma solidity ^0.4.2;

contract Election {
  // Store candidate
  // Read candidate
  string public candidate;
  // Constrctor
    function Elections () public {
    candidate = "Candidate 1";
  }
}*/



pragma solidity ^0.4.2;

import "./BlockUnBlock.sol";

contract Voting {
    // Model ongoing votes
    struct OngoingVotes {
        uint id;
        string reason;
        string account;
        uint yesCount;
        uint noCount;
        bool forBlock;
        bool complete;
        address[] voterAddress;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store onGoingVotes
    // Fetch onGoingVotes
    mapping(uint => OngoingVotes) public onGoingVotes;
    // Store ongoing votes Count
    uint public onGoingVotesCount;

    bool private blkUnBlkSet;
    bool public blkUnBlkSetExtern;
    BlockUnBlock b;
    address public blockUnBlockAddr;
    uint votesForSuccess = 2;

    // voted event
    /*event votedEvent (
        uint indexed _candidateId
    );*/

    function Voting () public {
        onGoingVotesCount=0;
    }

    /*
    1 means for blocking and anything else for unblocking
    */
    function addVoting (string _reason, string _account, uint blockOrUnblock) public {
        onGoingVotesCount ++;
        address[] v;
        onGoingVotes[onGoingVotesCount] = OngoingVotes(onGoingVotesCount, _reason, _account, 0, 0, 1 == blockOrUnblock, false, v);
    }

    function setBlkUnBlkAddress(address addr) public {
        if(!blkUnBlkSet) {
            blkUnBlkSet = true;
            blkUnBlkSetExtern = true;
            blockUnBlockAddr = addr;
            b = BlockUnBlock(blockUnBlockAddr);
        }
    }

    /*
    if block is true, means we are voting to block the client
    if block is false, means client is already blocked and we are
    voting to unblock the client
    */
    function verifyBlock(uint _candidateId, address candidateAddr) {

        if(onGoingVotes[_candidateId].yesCount >= votesForSuccess && onGoingVotes[_candidateId].forBlock) {
            b.block(candidateAddr);
            onGoingVotes[_candidateId].complete = true;
        }
        else if(onGoingVotes[_candidateId].yesCount >= votesForSuccess && !onGoingVotes[_candidateId].forBlock) {
            b.unBlock(candidateAddr);
            onGoingVotes[_candidateId].complete = true;
        }
    }

    /*
    check if the person already voted for a specific struct
    */
    function hasVoted (uint _candidateId) public returns (bool) {
        for(uint x =0; x < onGoingVotes[_candidateId].voterAddress.length; x++) {
            if(onGoingVotes[_candidateId].voterAddress[x] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    /*
    0 means no, anything else is yes
    */
    function vote (uint _candidateId, uint yesOrNo, address candidateAddress) public {
        // require that they haven't voted before
       // require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= onGoingVotesCount);

        // record that voter has voted
        //voters[msg.sender] = true;

        // update candidate vote Count
        if(!hasVoted(_candidateId)) {
            if(yesOrNo == 0) {
                onGoingVotes[_candidateId].noCount ++;
            }
            else {
                onGoingVotes[_candidateId].yesCount ++;
            }
            onGoingVotes[_candidateId].voterAddress.push(msg.sender);
        }

        verifyBlock(_candidateId, candidateAddress);
        // trigger voted event
       // votedEvent(_candidateId);
    }
}
