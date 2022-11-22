// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BuyMeACoffee {
  // Emit an Event when a Memo is created
  event NewMemo(
    address indexed from,
    uint256 timestamp,
    string name,
    string message
  );

  struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
  };

  // address of the contract deployer
  // Marked payable so that we can withdraw to this address later.
  address payable owner;

  // List of all the Memos received from coffee purchases
  Memo[] memos;

  constructor() {
    // store the address of the deployer as a payable address
    // withdrawn funds will be sent here.
    owner = payable(msg.sender);
  }

  // fethces all stored Memos
  function getMemos() public view returns (Memo[] memory) {
    return memos;
  }

  /**
   *  buy a coffee for owner (sends an ETH tip and leaves a memo)
   *  _name name of the coffee purchaser
   *  _message a nice message from the purchaser
   */
  function buyCoffee(string memory _name, string memory _message) public payable {
    // must be more than 0 ETH
    require(msg.value > 0, "can't buy a coffee for free!");

    memo.push(Memo(
      msg.sender,
      block.timestamp,
      _name,
      _message
    ));

    emit NewMemo(
      msg.sender,
      block.timestamp,
      _name,
      _message
    );
  }

  // send the entire balance stored in this contract to the Owner
  function withdrawTips() public {
    require(owner.send(address(this).balance));
  }
}