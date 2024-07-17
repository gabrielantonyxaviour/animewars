// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AnimeCharacterNFT is ERC1155, Ownable {
    uint256 public constant BASE_PRICE=0.1 ether;
    mapping(uint256 => uint256) public specialPrices;

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
    }

    function setSpecialPrices(uint256[] memory tokenIds, uint256[] memory prices) public onlyOwner {
        require(tokenIds.length == prices.length, "AnimeCharacterNFT: tokenIds and prices length mismatch");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            specialPrices[tokenIds[i]] = prices[i];
        }
    }

    function mint(address account, uint256 id, uint256 amount) public payable {
        uint256 price = specialPrices[id];
        if (price == 0) {
            price = BASE_PRICE;
        }

        // Calculate the total cost
        uint256 totalCost = price * amount;

        // Check that the caller sent enough Ether
        require(msg.value >= totalCost, "Not enough Ether sent");

        // Transfer the Ether to the contract
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        // Mint the tokens
        _mint(account, id, amount, "");

    }

    function withdrawProfits() public onlyOwner {
        // Get the contract's balance
        uint256 balance = address(this).balance;

        // Transfer the contract's balance to the owner
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    // Fallback function to receive Ether
    receive() external payable {}
   
}
