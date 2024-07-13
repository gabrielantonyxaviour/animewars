// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.19;

import "fhevm/abstracts/EIP712WithModifier.sol";
import "fhevm/lib/TFHE.sol";

contract AnimeWarsCore is EIP712WithModifier {

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
    mapping(string=>mapping(address=>euint8[8])) public playerCards;
    // mapping(string=>mapping(address=>mapping(euint8=>bool))) public playerCardExists;

    constructor() EIP712WithModifier("AnimeWars", "1") {}

    event GameInitiated(string gameCode, address[4] players);

    event GameStarted(string gameCode, address[4] players, uint256 lordIndex);
    event PlayerSignedup(string gameCode, address player);

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
            euint8 rnd=TFHE.randEuint8();
            rnd=TFHE.rem(rnd, 4);

            while(true){
            if(TFHE.decrypt(TFHE.eq(rnd, 0))){
                if(request.lordCount==0){
                    request.lordCount+=1;
                    _game.lordIndex=i;
                    _player.health=5;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 1))){
                if(request.alliesCount==0){
                    request.alliesCount+=1;
                    _player.health=4;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 2))){
                if(request.rebelsCount==0){
                    _player.health=4;
                    request.rebelsCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 3))){
                if(request.traitorCount==0){
                    _player.health=4;
                    request.traitorCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
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
            euint8 card = TFHE.randEuint8();
            card=TFHE.rem(card, 108);
            cards[i]=card;
        }

        playerCards[gameCode][signer]=cards;
        request.playersSignedUp+=1;

        if(request.playersSignedUp==4){
            emit GameStarted(gameCode, _game.players, _game.lordIndex);
        }

        gameRequests[gameCode]=request;
        
        emit PlayerSignedup(gameCode, signer);
    }


    function _getOrder() internal view returns(uint8[4] memory){
         euint32 num = TFHE.randEuint32(); 
        uint32 rnd = TFHE.decrypt(num); 
    
        uint8[4] memory order=[0,1,2,3];
    
        for (uint i = 0; i < order.length; i++) {
            uint j = uint(keccak256(abi.encode(rnd, i))) % (order.length - i);
            uint8 temp = order[i];
            order[i] = order[i + j];
            order[i + j] = temp;
        }
    
        return order;
    }

    function getCards(string memory gameCode, address signer, bytes32 _publicKey) public view returns(bytes[8] memory _data){
        euint8[8] memory _cards = playerCards[gameCode][signer];
        bytes[8] memory _decryptedCards;
        
        for(uint8 i=0;i<_cards.length; i++){
            _decryptedCards[i]=TFHE.reencrypt(_cards[i], _publicKey);
        }

        return _decryptedCards;
    }

    function getOrder(string memory _gameCode) public view returns(uint8[4] memory){
        return games[_gameCode].order;
    }

}
