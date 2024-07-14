// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AnimeCharacterNFT is ERC1155, Ownable {

    uint256 public constant BASE_PRICE=0.1 ether;
    mapping(uint256 => uint256) public specialPrices;
    mapping(address=>bool) public currencyTokens;

    constructor(address initialOwner, address[2] memory _currencyTokens) ERC1155("") Ownable(initialOwner) {
        currencyTokens[_currencyTokens[0]]=true;
        currencyTokens[_currencyTokens[1]]=true;
    }

    function setSpecialPrices(uint256[] memory tokenIds, uint256[] memory prices) public onlyOwner {
        require(tokenIds.length == prices.length, "AnimeCharacterNFT: tokenIds and prices length mismatch");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            specialPrices[tokenIds[i]] = prices[i];
        }
    }

    function mint(address account, uint256 id, uint256 amount, address currencyToken)
        public
        
    {
        uint256 price = specialPrices[id];
        require(currencyTokens[currencyToken], "AnimeCharacterNFT: invalid currency token");
        if(price==0){
            price=BASE_PRICE;
        }
        uint256 totalPrice = price * amount;

        require(IERC20(currencyToken).allowance(msg.sender, address(this))>=totalPrice, "AnimeCharacterNFT: transfer failed");
        IERC20(currencyToken).transferFrom(msg.sender, address(this), totalPrice);

        _mint(account, id, amount, "");
    }
   
}
