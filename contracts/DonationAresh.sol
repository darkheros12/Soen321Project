pragma solidity ^0.4.2;

contract DonationAresh {

    address creator; //this is Aresh
    uint public amount;

    function DonationAresh() public{
        creator = msg.sender;
        amount = 0;
    }
   
   //fall back function that gets an amount of ether and sends to Creator
    function () payable public{
        safeMoney(msg.value);
    }
    
    //send the amount to the creator
    function safeMoney(uint amountRaised) public{
        amount = amountRaised + amount;
        creator.send(amountRaised);
    }
}