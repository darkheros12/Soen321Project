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

contract Voting {
    // Model ongoing votes
    struct OngoingVotes {
        uint id;
        string reason;
        string account;
        uint yesCount;
        uint noCount;
        bool forBlock;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store onGoingVotes
    // Fetch onGoingVotes
    mapping(uint => OngoingVotes) public onGoingVotes;
    // Store ongoing votes Count
    uint public onGoingVotesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function Voting () public {
    }

    /*
    1 means for blocking and anything else for unblocking
    */
    function addVoting (string _reason, string _account, uint blockOrUnblock) public {
        onGoingVotesCount ++;
        onGoingVotes[onGoingVotesCount] = OngoingVotes(onGoingVotesCount, _reason, _account, 0, 0, 1 == blockOrUnblock);
    }

    /*
    if block is true, means we are voting to block the client
    if block is false, means client is already blocked and we are
    voting to unblock the client
    */
    function verifyBlock(uint _candidateId) {
        /*
        yes means contractor did good job, no means bad job
        if (block and maxVotes no) {
            then block client from getting contracts
        }

        yes means majority wants client unblocked
        if (!block and maxVotes yes) {
            then unblock the client
        }
        */
    }

    /*
    0 means no, anything else is yes
    */
    function vote (uint _candidateId, uint yesOrNo) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= onGoingVotesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        if(yesOrNo == 0) {
            onGoingVotes[_candidateId].noCount ++;    
        }
        else {
            onGoingVotes[_candidateId].yesCount ++;   
        }
        
        // trigger voted event
        votedEvent(_candidateId);
    }
}
