// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "./interface/hyperlane/IMailbox.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InadequateCrosschainFee(uint32 destinationDomain, uint256 requiredFee, uint256 sentFee);


contract AnimeWarsEVM{


    struct GameRequestInput{
        string gameCode;
        address[] players;
    }
    // Hyperlane Variables
    IMailbox public mailbox;
    mapping(uint32=>bytes32) public destinationAddresses;

    constructor( IMailbox _mailbox){
        mailbox = _mailbox;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function setDestinationAddress(uint32 _destinationDomain, bytes32 _destinationAddress) public {
        destinationAddresses[_destinationDomain]=_destinationDomain;
    }

    event MessageDispatched(bytes32 messageId);
    
    function instantiateGame(string memory gameCode, address[] memory players, uint32 destination) public payable{
        GameRequestInput memory gameRequestInput = GameRequestInput(gameCode, players);
        bytes memory _data = abi.encode(gameRequestInput);
        uint256 _requiredFee = mailbox.quoteDispatch(destinationDomain, recepient, _data);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destinationDomain, _requiredFee, msg.value);

       bytes32 messageId = mailbox.dispatch{value: msg.value}(destinationDomain,recepient,_data);
        emit MessageDispatched(messageId);  
    }

    function signUp(string memory gameCode, uint8 index, uint8 character, uint32 destinationDomain) public payable{
        GameRequestInput memory gameRequestInput = GameRequestInput(gameCode, new address[](1));
        gameRequestInput.players[0] = player;
        bytes memory _data = abi.encode(gameRequestInput);
        uint256 _requiredFee = mailbox.quoteDispatch(destinationDomain, recepient, _data);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destinationDomain, _requiredFee, msg.value);

       bytes32 messageId = mailbox.dispatch{value: msg.value}(destinationDomain,recepient,_data);
        emit MessageDispatched(messageId);  
    }

}