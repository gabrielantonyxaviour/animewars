// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

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
        mapping(euint8=>bool) cards;
    }

    struct GameRequestInput{
        string gameCode;
        address[] players;
       
    }

    struct GameRequest{
        string gameCode;
        uint8 playersSignedUp;
        uint8 playerCount;
        uint8 lordCount;
        uint8 alliesCount;
        uint8 rebelsCount;
        uint8 traitorCount;
    }

    struct Game{
        string gameCode;
        address[] players;
        uint8[] order;
        uint8 lordIndex;
        uint8 turn;
        uint8 winner;
        uint8 spellsDisabledCooldown;
        euint8[5] roles;
    }

    mapping(string=>Game) public games;
    mapping(string=>GameRequest) public gameRequests;
    mapping(string=>mapping(address=>uint8)) public playerSignupStatus;

    constructor() EIP712WithModifier("AnimeWars", "1") {}

    event GameInitiated(string gameCode, address[] players);

    event GameStarted(string gameCode, address[] players, uint256 lordIndex);
    event PlayerSignedup(string gameCode, address player);
    event GameIsGame(Game game);

    function initGame(GameRequestInput memory _input) public {
        // check if game already exists
        require(bytes(games[_input.gameCode].gameCode).length==0, "Game already exists");
        GameRequest memory request;
        request.gameCode = _input.gameCode;
        // store
        for(uint i=0; i<_input.players.length; i++) playerSignupStatus[_input.gameCode][_input.players[i]]=1;
        request.playerCount=uint8(_input.players.length); 
        gameRequests[_input.gameCode]=request;
        // initialise
        Game memory _game;
        _game.gameCode=_input.gameCode;
        _game.players=_input.players;
        _game.lordIndex=uint8(_input.players.length);
        _game.turn=1;
        _game.winner=uint8(_input.players.length);
        _game.spellsDisabledCooldown=0;
        // create order of players
        _game.order=_getOrder(uint8(_input.players.length));

        games[_input.gameCode]=_game;
        
        emit GameInitiated(_input.gameCode, _input.players);
    }   

    function signUp(string memory gameCode, address signer) public {
        require(playerSignupStatus[gameCode][signer]==1, "Player already signed up or player not invited");
        GameRequest memory request=gameRequests[gameCode];
        playerSignupStatus[gameCode][signer]=2;

        Game memory _game=games[gameCode];

        require(signer==_game.players[_game.order[request.playersSignedUp]], "Not your turn");

        euint8 rnd=TFHE.randEuint8();
        rnd=TFHE.rem(rnd, 4);

        while(true){
            if(TFHE.decrypt(TFHE.eq(rnd, 0))){
                if(request.lordCount==0){
                    request.lordCount+=1;
                    _game.lordIndex=request.playersSignedUp;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 1))){
                if(request.alliesCount<2){
                    request.alliesCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 2))){
                if(request.rebelsCount<2){
                    request.rebelsCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(TFHE.decrypt(TFHE.eq(rnd, 3))){
                if(request.traitorCount==0){
                    request.traitorCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }
        }

        request.playersSignedUp+=1;
        if(request.playersSignedUp==request.playerCount){
            emit GameStarted(gameCode, _game.players, _game.lordIndex);
        }
        gameRequests[gameCode]=request;

        
        emit PlayerSignedup(gameCode, signer);
    }

    function singupM2(string memory gameCode, address signer) public {
         require(playerSignupStatus[gameCode][signer]==1, "Player already signed up or player not invited");
        GameRequest memory request=gameRequests[gameCode];
        playerSignupStatus[gameCode][signer]=2;

        Game memory _game=games[gameCode];

        require(signer==_game.players[_game.order[request.playersSignedUp]], "Not your turn");

        euint8 rnd=TFHE.randEuint8();
        rnd=TFHE.rem(rnd, 4);

        while(true){
            uint8 d_rnd=TFHE.decrypt(rnd);
            if(d_rnd== 0){
                if(request.lordCount==0){
                    request.lordCount+=1;
                    _game.lordIndex=request.playersSignedUp;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(d_rnd== 1){
                if(request.alliesCount<2){
                    request.alliesCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(d_rnd== 2){
                if(request.rebelsCount<2){
                    request.rebelsCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }else if(d_rnd== 3){
                if(request.traitorCount==0){
                    request.traitorCount+=1;
                    break;
                }else{
                    rnd=TFHE.rem(TFHE.add(rnd, 1),4);
                    continue;
                }
            }
        }

        request.playersSignedUp+=1;
        if(request.playersSignedUp==request.playerCount){
            emit GameStarted(gameCode, _game.players, _game.lordIndex);
        }
        gameRequests[gameCode]=request;

        
        emit PlayerSignedup(gameCode, signer);
    }


    function _getOrder(uint8 length) internal returns(uint8[] memory){
         euint32 num = TFHE.randEuint32(); 
    uint32 rnd = TFHE.decrypt(num); 
    
    uint8[] memory order = new uint8[](length);
    for (uint8 i = 0; i < length; i++) {
        order[i] = i;
    }
    
    for (uint i = 0; i < order.length; i++) {
        uint j = uint(keccak256(abi.encode(rnd, i))) % (order.length - i);
        uint8 temp = order[i];
        order[i] = order[i + j];
        order[i + j] = temp;
    }
    
    return order;

    }
    event LETs(uint8 rand);
    function whatswonrg() public {
        euint8 rnd=TFHE.randEuint8();
        rnd=TFHE.rem(rnd, 4);
        emit LETs(TFHE.decrypt(TFHE.rem(TFHE.add(rnd, 1),4)));
    }
}
