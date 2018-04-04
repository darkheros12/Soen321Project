pragma solidity ^0.4.2;

import "./BlockUnBlock.sol";

contract DonationAresh {

    struct Expenditures {
        uint id;
        string reason;
        address account;
        uint amount;
    }

    address public creator; //this is Aresh
    address public blockUnBlockAddr;
    uint public amount;
    //mine
    uint256 sendAmount;
    uint public spendCounter;
    mapping(uint => Expenditures) public expenditures;
    bool private blkUnBlkSet;
    bool public blkUnBlkSetExtern;
    BlockUnBlock b;
    address ofSpendBallot;

    bool private onSpnSet;
    bool public onSpnBal;

    function DonationAresh() public{
        creator = msg.sender;
        amount = 0;
        spendCounter = 0;
        blkUnBlkSet = false;
        onSpnSet = false;
    }

    function setOnSpenBallot(address _ofSpendBallot) {
        if(!onSpnSet) {
            onSpnSet = true;
            onSpnBal = true;
            ofSpendBallot = _ofSpendBallot;
        }
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

    /*function getBalance() returns (uint){
        return amount;
    }*/

    function getBalance() returns (uint){
        return address(this).balance;
    }

    function sendWei(address recp) returns (bool){
        recp.send(sendAmount);
    }

    //send the amount to the creator
    /*function safeMoney(uint _amount) public returns (uint) {
        amount += _amount;
        return amount;
    }*/

    function safeMoney(uint _amount) payable{
        require(_amount >= 0);
        amount += _amount;
    }

    function setBlkUnBlkAddress(address addr) public {
        if(!blkUnBlkSet) {
            blkUnBlkSet = true;
            blkUnBlkSetExtern = true;
            blockUnBlockAddr = addr;
            b = BlockUnBlock(blockUnBlockAddr);
        }
    }

    /*function spending(uint amountDecreased, address spendOn, string reason) public returns (bool) {
        if(!isBlocked(spendOn)) {
            amount = amount - amountDecreased;
            spendCounter++;
            expenditures[spendCounter] = Expenditures(spendCounter, reason, spendOn, amountDecreased);
            return true;
        }
        return false;
    }*/

    function spending(uint amountDecreased, address spendOn, string reason) public returns (bool) {
        require(amountDecreased >= 0 && amountDecreased <= amount);
        if(!isBlocked(spendOn) && (msg.sender == ofSpendBallot)) {
            amount = amount - amountDecreased;
            spendOn.send(amountDecreased*(10**uint(18)));
            spendCounter++;
            expenditures[spendCounter] = Expenditures(spendCounter, reason, spendOn, amountDecreased);
            return true;
        }
        return false;
    }

    function isBlocked(address toCheck) public returns (bool) {
        return b.isBlocked(toCheck);
    }
}
