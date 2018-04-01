pragma solidity ^0.4.2;

contract DonationAresh {

    address public creator; //this is Aresh
    uint public amount;
    //mine
    uint256 sendAmount;

    function DonationAresh() public{
        creator = msg.sender;
        amount = 0;
    }

   //fall back function that gets an amount of ether and sends to Creator
    function () payable public{
        safeMoney(msg.value);
        spending(msg.value);
    }

    //mine



    function MoneyFountain(){
        creator = msg.sender;
        sendAmount = amount;
    }

    function getBalance() returns (uint){
        return address(this).balance;
    }

    function sendWei(address recp) returns (bool){
        recp.send(sendAmount);
    }



    //send the amount to the creator
    function safeMoney(uint amountRaised) public{
        amount = amountRaised + amount;
        creator.send(amountRaised);
    }


    function spending(uint amountDecreased) public{
        amount = amount - amountDecreased;
        creator.send(amountDecreased);
    }

    function isBlocked(address toCheck, address blockedUnBlocked) public returns (bool) {
        BlockUnBlock b = BlockUnBlock(blockedUnBlocked);
        return b.isBlocked(toCheck);
    }
}

contract BlockUnBlock {
    function isBlocked(address toCheck) returns (bool);
}