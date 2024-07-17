// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


import "./interface/hyperlane/IMailbox.sol";
error NotOwner(address caller);
error NotMailbox(address caller);
error InadequateCrosschainFee(uint32 destinationDomain, uint256 requiredFee, uint256 sentFee);


contract AnimeWarsSimulation{

    struct PlayerInput{
        address playerAddress;
        uint8 character;
    }

     // Hyperlane Variables
    IMailbox public mailbox;
    mapping(bytes32=>bool) public destinationAddresses;
    mapping(uint32=>bool) public destinationDomains;

    constructor( IMailbox _mailbox){
        mailbox = _mailbox;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    event MessageReceived(string gameCode, address[] players);


    function setDestinationAddress(uint32 _destinationDomain, bytes32 _destinationAddress) public {
        destinationDomains[_destinationDomain]=true;
        destinationAddresses[_destinationAddress]=true;
    }


    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable onlyMailbox{
        require(destinationAddresses[_sender], "Invalid sender");
        require(destinationDomains[_origin], "Invalid origin");
        (string memory gameCode,address[] memory players) = abi.decode(_message, (string, address[]));
        
        emit MessageReceived(gameCode, players);
    }


}