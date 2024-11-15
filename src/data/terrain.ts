import { template } from 'lodash'
import { VirtualScapeTile, CastleObstacles, EdgeAddons, EdgeObstacles, HexObstacles, HexTerrain } from '../types'
import getVSTileTemplate from './tileTemplates'


function getPiece(tile: VirtualScapeTile) {
  const piece = {
    terrain: '',
    pieceID: '',
    size: 0,
    template: '',
    height: 0,
    isSolid: false,
    isFluid: false,
    isHexObstacle: false,
    isEdgeObstacle: false,
    isStartZone: false,
    isFigure: false,
    isGlyph: false,
    isPersonalTile: false,
  }

  const str = tile.type.toString()
  let terrainCode = str.substring(0, str.length - 2)
  let terrainSubcode = Number(str.substring(str.length - 2)).toString()
  if (terrainCode.startsWith('16')) {
    // Castle is the only tile type with 3 digit subcode
    terrainCode = '16'
    terrainSubcode = Number(str.substring(str.length - 3)).toString()
  }

  /* LAND */
  const isSolid = Boolean(solidLandCodes[terrainCode])
  const isFluid = Boolean(fluidLandCodes[terrainCode])
  if (isSolid) {
    piece.isSolid = true
    piece.terrain = solidLandCodes[terrainCode]
    piece.size = Number(terrainSubcode) // land tiles use their size as their template key
    piece.template = terrainSubcode // land tiles have their size as their subcode
    piece.height = 1
  } else if (isFluid) {
    piece.isFluid = true
    piece.terrain = fluidLandCodes[terrainCode]
    piece.size = Number(terrainSubcode)
    piece.template = terrainSubcode // land tiles have their size as their subcode
    piece.height = 1
  }

  const isHexObstacle = Boolean(hexObstacleCodes[terrainCode])
  if (isHexObstacle) {
    piece.isHexObstacle = true
    // piece.terrain = fluidLandCodes[terrainCode]
    piece.size = Number(terrainSubcode)
    piece.template = terrainSubcode
    piece.height = 1
  }

  const isEdgeObstacle = Boolean(edgeObstacleCodes[terrainCode])
  if (isEdgeObstacle) {
    piece.isEdgeObstacle = true
    // piece.terrain = fluidLandCodes[terrainCode]
    piece.size = Number(terrainSubcode)
    piece.template = terrainSubcode
    piece.height = 1
  }
}
const nonLandPieceIDs = {
  [HexObstacles.palm14]: {
    height: 14,
    size: 1,
    // template: 
  },
  [HexObstacles.palm15]: {
    height: 15,
    size: 1,
  },
  [HexObstacles.palm16]: {
    height: 16,
    size: 1,

  },
  [HexObstacles.brush9]: {
    height: 9,
    size: 1,

  },
  [HexObstacles.tree10]: {
    height: 10,
    size: 1,

  },
  [HexObstacles.tree11]: {
    height: 11,
    size: 1,

  },
  [HexObstacles.tree12]: {
    height: 12,
    size: 1,

  },
  [HexObstacles.tree415]: {
    height: 15,
    size: 1,

  },
  [HexObstacles.hive]: {
    height: 17,
    size: 1,

  },
  [HexObstacles.glacier1]: {
    height: 7,
    size: 1,

  },
  [HexObstacles.glacier3]: {
    height: 9,
    size: 1,

  },
  [HexObstacles.glacier4]: {
    height: 11,
    size: 1,

  },
  [HexObstacles.glacier6]: {
    height: 17,
    size: 1,

  },
  [HexObstacles.outcrop1]: {
    height: 7,
    size: 1,

  },
  [HexObstacles.outcrop3]: {
    height: 9,
    size: 1,

  },
  /* CASTLE CASTLE CASTLE */
  [CastleObstacles.wallWalk1]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.wallWalk7]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.wallWalk9]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.archDoor3]: {
    height: 10,
    size: 1,
  },
  [CastleObstacles.archNoDoor3]: {
    height: 10,
    size: 1,
  },
  [CastleObstacles.castleBaseCorner]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.castleBaseStraight]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.castleBaseEnd]: {
    height: 1,
    size: 1,
  },
  [CastleObstacles.castleWallCorner]: {
    height: 9,
    size: 1,
  },
  [CastleObstacles.castleWallStraight]: {
    height: 9,
    size: 1,
  },
  [CastleObstacles.castleWallEnd]: {
    height: 9,
    size: 1,
  },
}

const solidLandCodes = {
  '1001': HexTerrain.grass,
  '1002': HexTerrain.grass,
  '1003': HexTerrain.grass,
  '1007': HexTerrain.grass,
  '1024': HexTerrain.grass,
  '2001': HexTerrain.rock,
  '2002': HexTerrain.rock,
  '2003': HexTerrain.rock,
  '2007': HexTerrain.rock,
  '2024': HexTerrain.rock,
  '3001': HexTerrain.sand,
  '3002': HexTerrain.sand,
  '3003': HexTerrain.sand,
  '3007': HexTerrain.sand,
  '3024': HexTerrain.sand,
  '20001': HexTerrain.swamp,
  '20002': HexTerrain.swamp,
  '20003': HexTerrain.swamp,
  '20007': HexTerrain.swamp,
  '20024': HexTerrain.swamp,
  '26001': HexTerrain.dungeon,
  '26002': HexTerrain.dungeon,
  '26003': HexTerrain.dungeon,
  '26007': HexTerrain.dungeon,
  '26024': HexTerrain.dungeon,
  '7001': HexTerrain.lavaField,
  '7002': HexTerrain.lavaField,
  '7007': HexTerrain.lavaField,
  '21001': HexTerrain.concrete,
  '21002': HexTerrain.concrete,
  '21007': HexTerrain.concrete,
  '22001': HexTerrain.asphalt,
  '22002': HexTerrain.asphalt,
  '22007': HexTerrain.asphalt,
  '8001': HexTerrain.road,
  '8002': HexTerrain.road,
  '9001': HexTerrain.snow,
  '9002': HexTerrain.snow,
}
const fluidLandCodes = {
  '40': HexTerrain.water,
  '50': HexTerrain.ice,
  '60': HexTerrain.lava,
  '190': HexTerrain.swampWater,
  '250': HexTerrain.shadow,
}
const hexObstacleCodes = {
  '240014': HexObstacles.palm14,
  '240015': HexObstacles.palm15,
  '240016': HexObstacles.palm16,
  '240002': HexObstacles.brush9,
  '10011': HexObstacles.tree10,
  '10012': HexObstacles.tree11,
  '10013': HexObstacles.tree12,
  '10004': HexObstacles.tree415,
  '230006': HexObstacles.hive,
  '13001': HexObstacles.glacier1,
  '13003': HexObstacles.glacier3,
  '13004': HexObstacles.glacier4,
  '13006': HexObstacles.glacier6,
  '27003': HexObstacles.outcrop1,
  '27001': HexObstacles.outcrop3,
}
const edgeObstacleCodes = {
  '11002': EdgeObstacles.ruins2,
  '11003': EdgeObstacles.ruins3,
  // edge/hex obstacle
  '11006': EdgeObstacles.marvel, // marvel ruins also create two elevated spaces/boardHexes
  '11007': EdgeObstacles.marvelBroken, // marvel ruins also create two elevated spaces/boardHexes
}
const edgeAddonCodes = {
  // edge add-ons
  '12004': EdgeAddons.roadWall,
  '16301': EdgeAddons.battlement,
  '16402': EdgeAddons.ladder,
  '16403': EdgeAddons.flag,
}
const castleCodes = {
  // castle
  '16001': CastleObstacles.wallWalk1,
  '16007': CastleObstacles.wallWalk7,
  '16009': CastleObstacles.wallWalk9,
  '16101': CastleObstacles.castleBaseCorner,
  '16102': CastleObstacles.castleBaseStraight,
  '16103': CastleObstacles.castleBaseEnd,
  '16201': CastleObstacles.castleWallCorner,
  '16202': CastleObstacles.castleWallStraight,
  '16203': CastleObstacles.castleWallEnd,
  '16401': CastleObstacles.archDoor3,
  '16404': CastleObstacles.archNoDoor3,
}
const personalAndFigureTypeCodes = {
  // Tiles that people could customize in Virtualscape
  '170': 'TYPE_PERSONAL',
  // The MasterSet 1 figures (colored/textured too!), and Wave 1 figures (unpainted & incomplete but many of the meshes)
  '180': 'TYPE_FIGURE',
}
const startAreaCodes = {
  // startzone
  '15001': 'startArea',
}
const startAreaColorsToPlayerID = {
  // Keys are the colorf values of StartAreaTiles from virtualscape (the colorf values are these tiles only differentiating property)
  255: '1', // red
  65280: '2', // green
  16711680: '3', // blue
  65535: '4', // yellow
  16711935: '5', // violet
  16776960: '6', // cyan
  33023: '7', // orange
  16711808: '8', // purple
}


