import {
  GameInstantiated as GameInstantiatedEvent,
  MessageDispatched as MessageDispatchedEvent,
  MoveMade as MoveMadeEvent,
  PlayerSignedUp as PlayerSignedUpEvent
} from "../generated/AnimeWarsRootstock/AnimeWarsRootstock"
import {
  GameInstantiated,
  MessageDispatched,
  MoveMade,
  PlayerSignedUp
} from "../generated/schema"

export function handleGameInstantiated(event: GameInstantiatedEvent): void {
  let entity = new GameInstantiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameCode = event.params.gameCode
  entity.players = event.params.players

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageDispatched(event: MessageDispatchedEvent): void {
  let entity = new MessageDispatched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.messageId = event.params.messageId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMoveMade(event: MoveMadeEvent): void {
  let entity = new MoveMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameCode = event.params.gameCode
  entity.playerIndex = event.params.playerIndex
  entity.moves = event.params.moves

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerSignedUp(event: PlayerSignedUpEvent): void {
  let entity = new PlayerSignedUp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameCode = event.params.gameCode
  entity.index = event.params.index
  entity.character = event.params.character

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
