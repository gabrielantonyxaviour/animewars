// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "./interface/hyperlane/IMailbox.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InadequateCrosschainFee(uint32 destination, uint256 requiredFee, uint256 sentFee);
error DestinationNotSupported(uint32 destination, bytes32 destinationAddress);

contract AnimeWarsEVM{


    struct Move{
        uint8 by;
        uint8 to;
        uint8 cardId;
    }


    struct GameRequestInput{
        string gameCode;
        address[] players;
    }
    // Hyperlane Variables
    IMailbox public mailbox;
    mapping(uint32=>bytes32) public destinationAddresses;

    constructor(IMailbox _mailbox, bytes32 core, uint32 destination){
        mailbox = _mailbox;
        destinationAddresses[destination]=core;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function setDestinationAddress(uint32 _destinationDomain, bytes32 _destinationAddress) public {
        destinationAddresses[_destinationDomain]=_destinationAddress;
    }

    event MessageDispatched(bytes32 messageId);
    
    function instantiateGame(string memory gameCode, address[] memory players, uint32 destination) public payable{
        bytes32 destinationAddress=destinationAddresses[destination];
        if(destinationAddress==bytes32(0)) revert DestinationNotSupported(destination, destinationAddress);

        GameRequestInput memory gameRequestInput = GameRequestInput(gameCode, players);
        bytes memory _data = abi.encode(gameRequestInput);
        bytes memory _sendData=abi.encode(uint256(0), _data);

        uint256 _requiredFee = mailbox.quoteDispatch(destination, destinationAddress, _sendData);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destination, _requiredFee, msg.value);

        bytes32 messageId = mailbox.dispatch{value: msg.value}(destination, destinationAddress, _sendData);
        emit MessageDispatched(messageId);  
    }

    function signUp(string memory gameCode, uint8 index, uint8 character, uint32 destination, address sender) public payable{
        bytes32 destinationAddress=destinationAddresses[destination];
        if(destinationAddress==bytes32(0)) revert DestinationNotSupported(destination, destinationAddress);

        bytes memory _data = abi.encode(gameCode, sender, index, character);
        bytes memory _sendData=abi.encode(uint256(1), _data);

        uint256 _requiredFee = mailbox.quoteDispatch(destination, destinationAddress, _sendData);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destination, _requiredFee, msg.value);

       bytes32 messageId = mailbox.dispatch{value: msg.value}(destination,destinationAddress, _sendData);
        emit MessageDispatched(messageId);  
    }


    function makeMove(string memory gameCode, uint8 playerIndex, Move[] memory moves, uint32 destination, address sender) public payable{
        bytes32 destinationAddress=destinationAddresses[destination];
        if(destinationAddress==bytes32(0)) revert DestinationNotSupported(destination, destinationAddress);
        
        bytes memory _data = abi.encode(gameCode, sender, playerIndex, moves);
        bytes memory _sendData=abi.encode(uint256(2), _data);

        uint256 _requiredFee = mailbox.quoteDispatch(destination, destinationAddress, _sendData);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destination, _requiredFee, msg.value);

        bytes32 messageId = mailbox.dispatch{value: msg.value}(destination, destinationAddress, _sendData);
        emit MessageDispatched(messageId);
    } 


    function testing(uint32 destination) public payable{
        bytes32 destinationAddress=destinationAddresses[destination];
        if(destinationAddress==bytes32(0)) revert DestinationNotSupported(destination, destinationAddress);
        

        bytes memory _data=abi.encode("What", uint256(69));
        bytes memory _sendData=abi.encode(uint256(3), _data);

          uint256 _requiredFee = mailbox.quoteDispatch(destination, destinationAddress, _sendData);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destination, _requiredFee, msg.value);

        bytes32 messageId = mailbox.dispatch{value: msg.value}(destination, destinationAddress, _sendData);
        emit MessageDispatched(messageId);
    }


}