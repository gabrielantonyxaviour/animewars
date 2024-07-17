// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.19;

import "./interface/hyperlane/IMailbox.sol";
import { FHE, euint32, euint8 } from "@fhenixprotocol/contracts/FHE.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InadequateCrosschainFee(uint32 destination, uint256 requiredFee, uint256 sentFee);
error DestinationNotSupported(uint32 destination, bytes32 destinationAddress);
error InvalidOrigin(uint32 origin, bytes32 caller);

contract AnimeWarsCore  {

    uint8 public constant ATTACK = 0;
    uint8 public constant DODGE = 1;
    uint8 public constant TRANCE = 2;
    uint8 public constant HEAL = 3;
    uint8 public constant ARMOUR = 4;
    uint8 public constant PET = 5;
    uint8 public constant SPELL = 6;
    
    struct Move{
        uint8 by;
        uint8 to;
        uint8 cardId;
    }

    struct PlayerInput{
        address playerAddress;
        uint8 character;
    }

    struct Player{
        address playerAddress;
        uint8 health;
        uint8 armour;
        uint8 character;
        uint8 equippedArmour;
        uint8 equippedPet;
        uint8 tranceCooldown;
        uint8 cardCount;
    }

    struct GameRequestInput{
        string gameCode;
        address[4] players;
    }

    struct GameRequest{
        string gameCode;
        uint8 playersSignedUp;
        uint8 lordCount;
        uint8 alliesCount;
        uint8 rebelsCount;
        uint8 traitorCount;
    }

    struct Game{
        string gameCode;
        address[4] players;
        uint8[4] order;
        uint8 lordIndex;
        uint8 turn;
        uint8 winner;
        uint8 spellsDisabledCooldown;
        euint8[4] roles;
    }

    mapping(string=>Game) public games;
    mapping(string=>Player[4]) public players;
    mapping(string=>GameRequest) public gameRequests;
    mapping(string=>mapping(address=>uint8)) public playerSignupStatus;
    mapping(string=>mapping(address=>euint8[8])) public playerCardsCategorized;
    // mapping(string=>mapping(address=>mapping(euint8=>bool))) public playerCardExists;

    // Hyperlane Variables
    IMailbox public mailbox;
    mapping(uint32=>bytes32) public originAddresses;

   constructor(IMailbox _mailbox){
        mailbox = _mailbox;
   }

    event GameInitiated(string gameCode, address[4] players);

    event GameStarted(string gameCode, address[4] players, uint256 lordIndex);
    event PlayerSignedup(string gameCode, address player);
    event InvalidAction(uint256 action);
    event MoveInvalid(string gameCode, address signer, uint8 playerIndex, Move[] moves, uint8 moveIndex);
    event MoveValid(string gameCode, address signer, uint8 playerIndex, Move[] moves, uint8 moveIndex);
    event TurnSuccess(string gameCode, address signer, uint8 playerIndex, Move[] moves, uint8 moveIndex);
   
    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function setOrigin(uint32 _origin, bytes32 _caller) public {
        originAddresses[_origin]=_caller;
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable //  onlyMailbox 
    {
        if(originAddresses[_origin]  != _sender) revert InvalidOrigin(_origin, _sender);

        (uint256 _action, bytes memory _data) = abi.decode(_message, (uint256, bytes));
        if(_action==0){
            (GameRequestInput memory _input) = abi.decode(_data, (GameRequestInput));
            initGame(_input);
        } else if(_action==1){
            (string memory gameCode, address signer, uint8 index, uint8 character) = abi.decode(_data, (string, address, uint8, uint8));
            signUp(gameCode, signer, index, character);
        }else if(_action==2){
            (string memory gameCode, address signer, uint8 playerIndex, Move[] memory moves) = abi.decode(_data, (string, address, uint8, Move[]));
            makeMoves(gameCode, signer, playerIndex, moves);
        }else{
            emit InvalidAction(_action);
        }
    }


    function initGame(GameRequestInput memory _input) public {
        // check if game already exists
        require(bytes(games[_input.gameCode].gameCode).length==0, "Game already exists");
        GameRequest memory request;
        request.gameCode = _input.gameCode;
        // store
        for(uint i=0; i<_input.players.length; i++) playerSignupStatus[_input.gameCode][_input.players[i]]=1;
        gameRequests[_input.gameCode]=request;
        // initialise
        Game memory _game;
        _game.gameCode=_input.gameCode;
        _game.lordIndex=4;
        _game.turn=1;
        _game.winner=4;
        _game.spellsDisabledCooldown=0;
        _game.players=_input.players;
        // create order of players
        _game.order=_getOrder();

        for(uint8 i=0;i<4; i++){
            Player memory _player=Player({
                playerAddress: _input.players[i],
                health: 0,
                armour: 0,
                character: 10,
                equippedArmour: 10,
                equippedPet: 10,
                tranceCooldown: 0,
                cardCount: 8
            });
            euint8 rnd=_getFakeRandomU8();
            rnd=FHE.rem(rnd, FHE.asEuint8(4));

            while(true){
            if(FHE.decrypt(FHE.eq(rnd, FHE.asEuint8(0)))){
                if(request.lordCount==0){
                    request.lordCount+=1;
                    _game.lordIndex=i;
                    _player.health=5;
                    break;
                }else{
                    rnd=FHE.rem(FHE.add(rnd, FHE.asEuint8(1)),FHE.asEuint8(4));
                    continue;
                }
            }else if(FHE.decrypt(FHE.eq(rnd, FHE.asEuint8(1)))){
                if(request.alliesCount==0){
                    request.alliesCount+=1;
                    _player.health=4;
                    break;
                }else{
                    rnd=FHE.rem(FHE.add(rnd, FHE.asEuint8(1)),FHE.asEuint8(4));
                    continue;
                }
            }else if(FHE.decrypt(FHE.eq(rnd, FHE.asEuint8(2)))){
                if(request.rebelsCount==0){
                    _player.health=4;
                    request.rebelsCount+=1;
                    break;
                }else{
                    rnd=FHE.rem(FHE.add(rnd, FHE.asEuint8(1)),FHE.asEuint8(4));
                    continue;
                }
            }else if(FHE.decrypt(FHE.eq(rnd, FHE.asEuint8(3)))){
                if(request.traitorCount==0){
                    _player.health=4;
                    request.traitorCount+=1;
                    break;
                }else{
                    rnd=FHE.rem(FHE.add(rnd, FHE.asEuint8(1)),FHE.asEuint8(4));
                    continue;
                }
            }
        }
             _game.roles[i]=rnd;

        }        

        games[_input.gameCode]=_game;
        
        emit GameInitiated(_input.gameCode, _input.players);
    }   

    function signUp(string memory gameCode, address signer, uint8 index, uint8 character) public {
        require(playerSignupStatus[gameCode][signer] == 1, "Player already signed up or player not invited");
        require(players[gameCode][index].playerAddress == signer, "Invalid Player");


        players[gameCode][index].character=character;
        GameRequest memory request=gameRequests[gameCode];
        playerSignupStatus[gameCode][signer]=2;

        Game memory _game=games[gameCode];

        euint8[8] memory cards;
        for(uint8 i=0;i<2;i++)
        {
            euint8 card = _getFakeRandomU8();
            card=FHE.rem(card, FHE.asEuint8(108));
            cards[i]=card;
        }

        playerCardsCategorized[gameCode][signer]=_categorizeCards(cards);
        request.playersSignedUp+=1;

        if(request.playersSignedUp==4){
            emit GameStarted(gameCode, _game.players, _game.lordIndex);
        }

        gameRequests[gameCode]=request;
        emit PlayerSignedup(gameCode, signer);
    }

    function makeMoves(string memory gameCode, address signer, uint8 playerIndex, Move[] memory moves) public returns(bool) {
        Game memory _game=games[gameCode];
        require(_game.players[playerIndex]==signer, "Invalid Player");
        require(_game.turn-1==playerIndex, "Invalid Turn");
        bool isAttacked=false;
        for(uint8 i=0;i<moves.length;i++){
            Move memory move=moves[i];
            playerCardsCategorized[gameCode][signer][move.cardId].sub(FHE.asEuint8(1));

            if(move.cardId==0){
                if(isAttacked){
                    emit MoveInvalid(gameCode, signer, playerIndex, moves, i);
                    return false;
                }
                isAttacked=true;
                if(!checkBattle(gameCode, signer, _game.players[move.to]))
                    reduceHealth(gameCode, move.to, players[gameCode][move.by].tranceCooldown>0 ? 2 : 1);
            } else if(move.cardId==2){
                players[gameCode][move.by].tranceCooldown=2;
            } else if(move.cardId==3){
                players[gameCode][move.by].health+=1;
            } else if(move.cardId==4){
                players[gameCode][move.by].armour+=1;
            } else if(move.cardId==5){
                players[gameCode][move.by].equippedPet+=1;
            } 
            emit MoveValid(gameCode, signer, playerIndex, moves, i);
        }
        emit TurnSuccess(gameCode, signer, playerIndex, moves, 0);
        _game.turn+=1;
        games[gameCode]=_game;
        return true;
    }
    
    function reduceHealth(string memory gameCode, uint8 receiver, uint8 damage) internal {
        uint8 health=players[gameCode][receiver].health;
        uint8 armour=players[gameCode][receiver].armour;
        if(armour>0){
            if(armour>=damage){
                players[gameCode][receiver].armour-=damage;
            }else{
                players[gameCode][receiver].armour=0;
                players[gameCode][receiver].health-=damage-armour;
            }
        }else{
            players[gameCode][receiver].health-=damage;
        }
    }

    function checkBattle(string memory gameCode, address attacker, address defender) internal view returns(bool){
        return FHE.decrypt(FHE.gt(playerCardsCategorized[gameCode][attacker][0], playerCardsCategorized[gameCode][defender][1]));
    }

    function _categorizeCards(euint8[8] memory cards) internal pure returns(euint8[8] memory){
        euint8[8] memory _categorizedCards;
        for(uint8 i=0;i<cards.length;i++){
            euint8 card=cards[i];
            if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(31)))){
                _categorizedCards[0].add(FHE.asEuint8(1));
            }else if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(61)))){
                _categorizedCards[1].add(FHE.asEuint8(1));
            }else if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(81)))){
                _categorizedCards[2].add(FHE.asEuint8(1));
            }else if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(91)))){
                _categorizedCards[3].add(FHE.asEuint8(1));
            }else if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(94)))){
                _categorizedCards[4].add(FHE.asEuint8(1));
            }else if(FHE.decrypt(FHE.lt(card, FHE.asEuint8(100)))){
                _categorizedCards[5].add(FHE.asEuint8(1));
            }else{
                _categorizedCards[6].add(FHE.asEuint8(1));
            }
        }
        return _categorizedCards;
    }

    function _getOrder() internal view returns(uint8[4] memory){
        euint32 num = _getFakeRandomU32(); 
        uint32 rnd = FHE.decrypt(num); 
    
        uint8[4] memory order=[0,1,2,3];
    
        for (uint i = 0; i < order.length; i++) {
            uint j = uint(keccak256(abi.encode(rnd, i))) % (order.length - i);
            uint8 temp = order[i];
            order[i] = order[i + j];
            order[i + j] = temp;
        }
    
        return order;
    }

    function getCards(string memory gameCode, address signer) public view returns(uint8[8] memory _data){
        euint8[8] memory _cards = playerCardsCategorized[gameCode][signer];
        uint8[8] memory _decryptedCards;
        
        for(uint8 i=0;i<_cards.length; i++){
            _decryptedCards[i]=FHE.decrypt(_cards[i]);
        }

        return _decryptedCards;
    }

    function getOrder(string memory _gameCode) public view returns(uint8[4] memory){
        return games[_gameCode].order;
    }

    function _getFakeRandom() internal view returns (uint256) {
        uint blockNumber = block.number;
        uint256 blockHash = uint256(blockhash(blockNumber));

        return blockHash;
    }

    function _getFakeRandomU32() internal view returns (euint32) {
        uint32 blockHash = uint32(_getFakeRandom());
        return FHE.asEuint32(blockHash);
    }

    function _getFakeRandomU8() internal view returns (euint8) {
        uint8 blockHash = uint8(_getFakeRandom());
        return FHE.asEuint8(blockHash);
    }

}
