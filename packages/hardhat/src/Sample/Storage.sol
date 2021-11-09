// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

contract Storage {
    string public store;

    function set(string memory string_) public {
        store = string_;
    }

    function retrieve() public view returns (string memory) {
        return store;
    }
}
