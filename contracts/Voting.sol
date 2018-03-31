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
        address[] voterAddress;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store onGoingVotes
    // Fetch onGoingVotes
    mapping(uint => OngoingVotes) public onGoingVotes;
    // Store ongoing votes Count
    uint public onGoingVotesCount;

    //store accounts of all voters
    mapping (address => OngoingVotes) onGoingVoters;
    //save all acounts in the aaray
    address[] public allVoter;
    address[] public VotedTo;
    
    
   
    
    //push address of the new voter to the aaray 
    function setVoters(address _address, uint _id, string _reason, string _account, uint _yesCount, uint _noCount, bool _forblock) public{
        var thisVoters = onGoingVoters[_address];
        
        thisVoters.id = _id;
        thisVoters.reason = _reason;
        thisVoters.account = _account;
        thisVoters.yesCount = _yesCount;
        thisVoters.noCount = _noCount;
        thisVoters.forBlock = _forblock;
        
        allVoter.push(_address) -1;
        
    }
    
    //get information of all voters
    function getVoters() view public returns (address[]){
        return allVoter;
    }
    
  /*  function whoToWhomVoted() view public returns (address[], address[]){
        return allVoter, 
    }*/
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
        address[] v;
        onGoingVotes[onGoingVotesCount] = OngoingVotes(onGoingVotesCount, _reason, _account, 0, 0, 1 == blockOrUnblock, v );
    }

    /*
    if block is true, means we are voting to block the client
    if block is false, means client is already blocked and we are
    voting to unblock the client
    */

    function verifyBlock(address _candidateAdd) public {
        
           
            if(onGoingVoters[_candidateAdd].yesCount > 5){
                onGoingVoters[_candidateAdd].forBlock = true;
            }
            else
                onGoingVoters[_candidateAdd].forBlock = false;
   
    }
    
     function getBlock(address _candidateAdd) view public returns(bool){
        return onGoingVoters[_candidateAdd].forBlock;
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
        
       // address[] loc = onGoingVotes[_candidateId].voterAddress;
        //oc.push(sender.address());
        onGoingVotes[_candidateId].voterAddress.push(msg.sender);
        
        // trigger voted event
        votedEvent(_candidateId);
        
    }
   
}
