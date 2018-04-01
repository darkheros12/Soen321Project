pragma solidity ^0.4.2;

contract DonationAresh {

    struct Expenditures {
        uint id;
        string reason;
        string account;
        uint amount;
    }

    address public creator; //this is Aresh
    uint public amount;
    //mine
    uint256 sendAmount;
    uint public spendCounter;
    mapping(uint => Expenditures) public expenditures;

    function DonationAresh() public{
        creator = msg.sender;
        amount = 0;
        spendCounter = 0;
    }

   //fall back function that gets an amount of ether and sends to Creator
    /*function () payable public{
        safeMoney(msg.value);
        spending(msg.value, msg.sender);
    }*/

    //mine



    function MoneyFountain(){
        creator = msg.sender;
        sendAmount = amount;
    }

    function getBalance() returns (uint){
        return amount;
    }

    function sendWei(address recp) returns (bool){
        recp.send(sendAmount);
    }

    //send the amount to the creator
    function safeMoney(uint _amount) public returns (uint) {
        amount += _amount;
        return amount;
    }


    function spending(uint amountDecreased, string spendOn, string reason) public returns (uint) {
        amount = amount - amountDecreased;
        spendCounter++;
        expenditures[spendCounter] = Expenditures(spendCounter, reason, spendOn, amountDecreased);
        return amount;
    }

    function isBlocked(address toCheck, address blockedUnBlocked) public returns (bool) {
        BlockUnBlock b = BlockUnBlock(blockedUnBlocked);
        return b.isBlocked(toCheck);
    }
}

contract BlockUnBlock {
    function isBlocked(address toCheck) returns (bool);
}