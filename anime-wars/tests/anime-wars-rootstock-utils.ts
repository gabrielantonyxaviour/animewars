import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  GameInstantiated,
  MessageDispatched,
  MoveMade,
  PlayerSignedUp
} from "../generated/AnimeWarsRootstock/AnimeWarsRootstock"

export function createGameInstantiatedEvent(
  gameCode: string,
  players: Array<Address>
): GameInstantiated {
  let gameInstantiatedEvent = changetype<GameInstantiated>(newMockEvent())

  gameInstantiatedEvent.parameters = new Array()

  gameInstantiatedEvent.parameters.push(
    new ethereum.EventParam("gameCode", ethereum.Value.fromString(gameCode))
  )
  gameInstantiatedEvent.parameters.push(
    new ethereum.EventParam("players", ethereum.Value.fromAddressArray(players))
  )

  return gameInstantiatedEvent
}

export function createMessageDispatchedEvent(
  messageId: Bytes
): MessageDispatched {
  let messageDispatchedEvent = changetype<MessageDispatched>(newMockEvent())

  messageDispatchedEvent.parameters = new Array()

  messageDispatchedEvent.parameters.push(
    new ethereum.EventParam(
      "messageId",
      ethereum.Value.fromFixedBytes(messageId)
    )
  )

  return messageDispatchedEvent
}

export function createMoveMadeEvent(
  gameCode: string,
  playerIndex: i32,
  moves: Array<ethereum.Tuple>
): MoveMade {
  let moveMadeEvent = changetype<MoveMade>(newMockEvent())

  moveMadeEvent.parameters = new Array()

  moveMadeEvent.parameters.push(
    new ethereum.EventParam("gameCode", ethereum.Value.fromString(gameCode))
  )
  moveMadeEvent.parameters.push(
    new ethereum.EventParam(
      "playerIndex",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(playerIndex))
    )
  )
  moveMadeEvent.parameters.push(
    new ethereum.EventParam("moves", ethereum.Value.fromTupleArray(moves))
  )

  return moveMadeEvent
}

export function createPlayerSignedUpEvent(
  gameCode: string,
  index: i32,
  character: i32
): PlayerSignedUp {
  let playerSignedUpEvent = changetype<PlayerSignedUp>(newMockEvent())

  playerSignedUpEvent.parameters = new Array()

  playerSignedUpEvent.parameters.push(
    new ethereum.EventParam("gameCode", ethereum.Value.fromString(gameCode))
  )
  playerSignedUpEvent.parameters.push(
    new ethereum.EventParam(
      "index",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(index))
    )
  )
  playerSignedUpEvent.parameters.push(
    new ethereum.EventParam(
      "character",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(character))
    )
  )

  return playerSignedUpEvent
}
