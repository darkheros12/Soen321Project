pragma solidity ^0.4.2;

contract BlockUnBlock {

    mapping(address => bool) public blocked;
    mapping(uint => address) public blockedHelper;
    uint public total;

    function BlockUnBlock() public {
        total = 0;
    }

    function block(address toBlock) public {
        bool found = false;
        for(uint x = 1; x<=total; x++) {
            if(blockedHelper[x] == toBlock) {
                found = true;
                blocked[toBlock] = true;
            }
        }

        if(!found) {
            total ++;
            blockedHelper[total] = toBlock;
            blocked[toBlock] = true;
        }
    }

    function unBlock(address toUnBlock) public {
        blocked[toUnBlock] = false;
    }

    function isBlocked(address toCheck) public returns (bool) {
        return blocked[toCheck];
    }
}