import { Dictionary } from "lodash"
import { HexTerrain, Piece, Pieces } from "../types"

export const getPieceByTerrainAndSize = (terrain: string, size: number) => {
  const piece = landPieces[`${terrain}${size}`]
  return piece
}

export const landPieces: Dictionary<Piece> = {
  [Pieces.grass1]: {
    id: Pieces.grass1,// will get overwritten in game
    inventoryID: Pieces.grass1,
    terrain: HexTerrain.grass,
    size: 1,
    template: '1',
    height: 1,

  },
  [Pieces.grass2]: {
    id: Pieces.grass2,// will get overwritten in game
    inventoryID: Pieces.grass2,
    terrain: HexTerrain.grass,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.grass3]: {
    id: Pieces.grass3,// will get overwritten in game
    inventoryID: Pieces.grass3,
    terrain: HexTerrain.grass,
    size: 3,
    template: '3',
    height: 1,
  },
  [Pieces.grass7]: {
    id: Pieces.grass7,// will get overwritten in game
    inventoryID: Pieces.grass7,
    terrain: HexTerrain.grass,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.grass24]: {
    id: Pieces.grass24,// will get overwritten in game
    inventoryID: Pieces.grass24,
    terrain: HexTerrain.grass,
    size: 24,
    template: '24',
    height: 1,
  },
  [Pieces.rock1]: {
    id: Pieces.rock1,// will get overwritten in game
    inventoryID: Pieces.rock1,
    terrain: HexTerrain.rock,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.rock2]: {
    id: Pieces.rock2,// will get overwritten in game
    inventoryID: Pieces.rock2,
    terrain: HexTerrain.rock,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.rock3]: {
    id: Pieces.rock3,// will get overwritten in game
    inventoryID: Pieces.rock3,
    terrain: HexTerrain.rock,
    size: 3,
    template: '3',
    height: 1,
  },
  [Pieces.rock7]: {
    id: Pieces.rock7,// will get overwritten in game
    inventoryID: Pieces.rock7,
    terrain: HexTerrain.rock,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.rock24]: {
    id: Pieces.rock24,// will get overwritten in game
    inventoryID: Pieces.rock24,
    terrain: HexTerrain.rock,
    size: 24,
    template: '24',
    height: 1,
  },
  [Pieces.sand1]: {
    id: Pieces.sand1,// will get overwritten in game
    inventoryID: Pieces.sand1,
    terrain: HexTerrain.sand,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.sand2]: {
    id: Pieces.sand2,// will get overwritten in game
    inventoryID: Pieces.sand2,
    terrain: HexTerrain.sand,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.sand3]: {
    id: Pieces.sand3,// will get overwritten in game
    inventoryID: Pieces.sand3,
    terrain: HexTerrain.sand,
    size: 3,
    template: '3',
    height: 1,
  },
  [Pieces.sand7]: {
    id: Pieces.sand7,// will get overwritten in game
    inventoryID: Pieces.sand7,
    terrain: HexTerrain.sand,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.sand24]: {
    id: Pieces.sand24,// will get overwritten in game
    inventoryID: Pieces.sand24,
    terrain: HexTerrain.sand,
    size: 24,
    template: '24',
    height: 1,
  },
  [Pieces.dungeon1]: {
    id: Pieces.dungeon1,// will get overwritten in game
    inventoryID: Pieces.dungeon1,
    terrain: HexTerrain.dungeon,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.dungeon2]: {
    id: Pieces.dungeon2,// will get overwritten in game
    inventoryID: Pieces.dungeon2,
    terrain: HexTerrain.dungeon,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.dungeon3]: {
    id: Pieces.dungeon3,// will get overwritten in game
    inventoryID: Pieces.dungeon3,
    terrain: HexTerrain.dungeon,
    size: 3,
    template: '3',
    height: 1,
  },
  [Pieces.dungeon7]: {
    id: Pieces.dungeon7,// will get overwritten in game
    inventoryID: Pieces.dungeon7,
    terrain: HexTerrain.dungeon,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.dungeon24]: {
    id: Pieces.dungeon24,// will get overwritten in game
    inventoryID: Pieces.dungeon24,
    terrain: HexTerrain.dungeon,
    size: 24,
    template: '24',
    height: 1,
  },
  [Pieces.swamp1]: {
    id: Pieces.swamp1,// will get overwritten in game
    inventoryID: Pieces.swamp1,
    terrain: HexTerrain.swamp,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.swamp2]: {
    id: Pieces.swamp2,// will get overwritten in game
    inventoryID: Pieces.swamp2,
    terrain: HexTerrain.swamp,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.swamp3]: {
    id: Pieces.swamp3,// will get overwritten in game
    inventoryID: Pieces.swamp3,
    terrain: HexTerrain.swamp,
    size: 3,
    template: '3',
    height: 1,
  },
  [Pieces.swamp7]: {
    id: Pieces.swamp7,// will get overwritten in game
    inventoryID: Pieces.swamp7,
    terrain: HexTerrain.swamp,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.swamp24]: {
    id: Pieces.swamp24,// will get overwritten in game
    inventoryID: Pieces.swamp24,
    terrain: HexTerrain.swamp,
    size: 24,
    template: '24',
    height: 1,
  },
  [Pieces.lavaField1]: {
    id: Pieces.lavaField1,// will get overwritten in game
    inventoryID: Pieces.lavaField1,
    terrain: HexTerrain.lavaField,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.lavaField2]: {
    id: Pieces.lavaField2,// will get overwritten in game
    inventoryID: Pieces.lavaField2,
    terrain: HexTerrain.lavaField,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.lavaField7]: {
    id: Pieces.lavaField7,// will get overwritten in game
    inventoryID: Pieces.lavaField7,
    terrain: HexTerrain.lavaField,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.asphalt1]: {
    id: Pieces.asphalt1,// will get overwritten in game
    inventoryID: Pieces.asphalt1,
    terrain: HexTerrain.asphalt,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.asphalt2]: {
    id: Pieces.asphalt2,// will get overwritten in game
    inventoryID: Pieces.asphalt2,
    terrain: HexTerrain.asphalt,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.asphalt7]: {
    id: Pieces.asphalt7,// will get overwritten in game
    inventoryID: Pieces.asphalt7,
    terrain: HexTerrain.asphalt,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.concrete1]: {
    id: Pieces.concrete1,// will get overwritten in game
    inventoryID: Pieces.concrete1,
    terrain: HexTerrain.concrete,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.concrete2]: {
    id: Pieces.concrete2,// will get overwritten in game
    inventoryID: Pieces.concrete2,
    terrain: HexTerrain.concrete,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.concrete7]: {
    id: Pieces.concrete7,// will get overwritten in game
    inventoryID: Pieces.concrete7,
    terrain: HexTerrain.concrete,
    size: 7,
    template: '7',
    height: 1,
  },
  [Pieces.snow1]: {
    id: Pieces.snow1,// will get overwritten in game
    inventoryID: Pieces.snow1,
    terrain: HexTerrain.snow,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.snow2]: {
    id: Pieces.snow2,// will get overwritten in game
    inventoryID: Pieces.snow2,
    terrain: HexTerrain.snow,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.road1]: {
    id: Pieces.road1,// will get overwritten in game
    inventoryID: Pieces.road1,
    terrain: HexTerrain.road,
    size: 1,
    template: '1',
    height: 1,
  },
  [Pieces.road2]: {
    id: Pieces.road2,// will get overwritten in game
    inventoryID: Pieces.road2,
    terrain: HexTerrain.road,
    size: 2,
    template: '2',
    height: 1,
  },
  [Pieces.road5]: {
    id: Pieces.road5,// will get overwritten in game
    inventoryID: Pieces.road5,
    terrain: HexTerrain.road,
    size: 5,
    template: '5',
    height: 1,
  },
  /* FLUID FLUID FLUID */
  [Pieces.water1]: {
    id: Pieces.water1,// will get overwritten in game
    inventoryID: Pieces.water1,
    terrain: HexTerrain.water,
    size: 1,
    template: '1',
    height: 0,
  },
  [Pieces.lava1]: {
    id: Pieces.lava1,// will get overwritten in game
    inventoryID: Pieces.lava1,
    terrain: HexTerrain.lava,
    size: 1,
    template: '1',
    height: 0,
  },
  [Pieces.swampWater1]: {
    id: Pieces.swampWater1,// will get overwritten in game
    inventoryID: Pieces.swampWater1,
    terrain: HexTerrain.swampWater,
    size: 1,
    template: '1',
    height: 0,
  },
  [Pieces.ice1]: {
    id: Pieces.ice1,// will get overwritten in game
    inventoryID: Pieces.ice1,
    terrain: HexTerrain.ice,
    size: 1,
    template: '1',
    height: 0,
  },
  [Pieces.shadow1]: {
    id: Pieces.shadow1,// will get overwritten in game
    inventoryID: Pieces.shadow1,
    terrain: HexTerrain.shadow,
    size: 1,
    template: '1',
    height: 0,
  },
}

const nonLandinventoryIDs = {
  [Pieces.palm14]: {
    height: 14,
    size: 1,
  },
  [Pieces.palm15]: {
    height: 15,
    size: 1,
  },
  [Pieces.palm16]: {
    height: 16,
    size: 1,

  },
  [Pieces.brush9]: {
    height: 9,
    size: 1,

  },
  [Pieces.tree10]: {
    height: 10,
    size: 1,

  },
  [Pieces.tree11]: {
    height: 11,
    size: 1,

  },
  [Pieces.tree12]: {
    height: 12,
    size: 1,

  },
  [Pieces.tree415]: {
    height: 15,
    size: 1,

  },
  [Pieces.hive]: {
    height: 17,
    size: 1,

  },
  [Pieces.glacier1]: {
    height: 7,
    size: 1,

  },
  [Pieces.glacier3]: {
    height: 9,
    size: 1,

  },
  [Pieces.glacier4]: {
    height: 11,
    size: 1,

  },
  [Pieces.glacier6]: {
    height: 17,
    size: 1,

  },
  [Pieces.outcrop1]: {
    height: 7,
    size: 1,

  },
  [Pieces.outcrop3]: {
    height: 9,
    size: 1,

  },
  /* CASTLE CASTLE CASTLE */
  [Pieces.wallWalk1]: {
    height: 1,
    size: 1,
  },
  [Pieces.wallWalk7]: {
    height: 1,
    size: 1,
  },
  [Pieces.wallWalk9]: {
    height: 1,
    size: 1,
  },
  [Pieces.archDoor3]: {
    height: 10,
    size: 1,
  },
  [Pieces.archNoDoor3]: {
    height: 10,
    size: 1,
  },
  [Pieces.castleBaseCorner]: {
    height: 1,
    size: 1,
  },
  [Pieces.castleBaseStraight]: {
    height: 1,
    size: 1,
  },
  [Pieces.castleBaseEnd]: {
    height: 1,
    size: 1,
  },
  [Pieces.castleWallCorner]: {
    height: 9,
    size: 1,
  },
  [Pieces.castleWallStraight]: {
    height: 9,
    size: 1,
  },
  [Pieces.castleWallEnd]: {
    height: 9,
    size: 1,
  },
}
