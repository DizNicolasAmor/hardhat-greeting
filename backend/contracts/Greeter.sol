//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private name;

    event nameUpdated(string eventOutput);

    constructor(string memory _name) {
        console.log("Deploying a Greeter with name:", _name);
        name = _name;
    }

    function greet() public view returns (string memory) {
        return string(abi.encodePacked("Hello", ' ', name));
    }

    function setName(string memory _name) public {
        console.log("Changing name from '%s' to '%s'", name, _name);
        name = _name;
        emit nameUpdated(_name);
    }
}
