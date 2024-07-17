import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { GameInstantiated } from "../generated/schema"
import { GameInstantiated as GameInstantiatedEvent } from "../generated/AnimeWarsRootstock/AnimeWarsRootstock"
import { handleGameInstantiated } from "../src/anime-wars-rootstock"
import { createGameInstantiatedEvent } from "./anime-wars-rootstock-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let gameCode = "Example string value"
    let players = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let newGameInstantiatedEvent = createGameInstantiatedEvent(
      gameCode,
      players
    )
    handleGameInstantiated(newGameInstantiatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GameInstantiated created and stored", () => {
    assert.entityCount("GameInstantiated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GameInstantiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gameCode",
      "Example string value"
    )
    assert.fieldEquals(
      "GameInstantiated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "players",
      "[0x0000000000000000000000000000000000000001]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
