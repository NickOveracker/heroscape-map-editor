import { Dictionary } from 'lodash';
import { VirtualScapeTile, Pieces, HexTerrain, BoardHexes, BoardHex, Piece } from '../types'
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID } from '../utils/map-utils';
import getVSTileTemplate from './rotationTransforms';

export default function buildupMap(tiles: VirtualScapeTile[]): BoardHexes {
  return tiles.reduce((myBoardHexes, tile) => {

    const str = tile.type.toString()
    let terrainCode = str.substring(0, str.length - 2)
    let terrainSubcode = Number(str.substring(str.length - 2)).toString()
    if (terrainCode.startsWith('16')) {
      // Castle is the only tile type with 3 digit subcode
      terrainCode = '16'
      terrainSubcode = Number(str.substring(str.length - 3)).toString()
    }

    // BEGIN BUILDING
    const cubeCoords = hexUtilsOddRToCube(tile.posX, tile.posY)

    /* LAND */
    const isSolid = Boolean(solidLandCodes[terrainCode])
    const isFluid = Boolean(fluidLandCodes[terrainCode])
    if (isSolid) {
      // piece.terrain = solidLandCodes[terrainCode]
      // piece.size = Number(terrainSubcode) // land tiles use their size as their template key
      // piece.template = terrainSubcode // land tiles have their size as their subcode
      // FIRST, ONLY LEVEL1
      const hexIDArr = getVSTileTemplate({
        clickedHex: { q: cubeCoords.q, r: cubeCoords.r, s: cubeCoords.s },
        rotation: tile.rotation,
        template: `${terrainSubcode}`, // DEV: Only land pieces will have their size as their template name, future things will have a string
      }).map((h) => genBoardHexID({ ...h, altitude: tile.posZ }))
      // paintGrassTile({ hexIDArr, altitude: hex.altitude })
      // console.log("🚀 ~ returntiles.reduce ~ hexIDArr:", hexIDArr)
    }
    if (isFluid) {
      // piece.terrain = fluidLandCodes[terrainCode]
      // piece.size = Number(terrainSubcode)
      // piece.template = terrainSubcode // land tiles have their size as their subcode
      // piece.height = 1
    }
    return myBoardHexes
  }, {})
}

const solidLandCodes = {
  '10': HexTerrain.grass,
  '20': HexTerrain.rock,
  '30': HexTerrain.sand,
  '80': HexTerrain.road,
  '90': HexTerrain.snow,
  '70': HexTerrain.lavaField,
  '210': HexTerrain.concrete,
  '220': HexTerrain.asphalt,
  '200': HexTerrain.swamp,
  '260': HexTerrain.dungeon,
}
const fluidLandCodes = {
  '40': HexTerrain.water,
  '50': HexTerrain.ice,
  '60': HexTerrain.lava,
  '190': HexTerrain.swampWater,
  '250': HexTerrain.shadow,
}
const hexObstacleCodes = {
  '240014': Pieces.palm14,
  '240015': Pieces.palm15,
  '240016': Pieces.palm16,
  '240002': Pieces.brush9,
  '10011': Pieces.tree10,
  '10012': Pieces.tree11,
  '10013': Pieces.tree12,
  '10004': Pieces.tree415,
  '230006': Pieces.hive,
  '13001': Pieces.glacier1,
  '13003': Pieces.glacier3,
  '13004': Pieces.glacier4,
  '13006': Pieces.glacier6,
  '27003': Pieces.outcrop1,
  '27001': Pieces.outcrop3,
}
const edgeObstacleCodes = {
  '11002': Pieces.ruins2,
  '11003': Pieces.ruins3,
  // edge/hex obstacle
  '11006': Pieces.marvel, // marvel ruins also create two elevated spaces/boardHexes
  '11007': Pieces.marvelBroken, // marvel ruins also create two elevated spaces/boardHexes
}
const edgeAddonCodes = {
  // edge add-ons
  '12004': Pieces.roadWall,
  '16301': Pieces.battlement,
  '16402': Pieces.ladder,
  '16403': Pieces.flag,
}
const castleCodes = {
  // castle
  '16001': Pieces.wallWalk1,
  '16007': Pieces.wallWalk7,
  '16009': Pieces.wallWalk9,
  '16101': Pieces.castleBaseCorner,
  '16102': Pieces.castleBaseStraight,
  '16103': Pieces.castleBaseEnd,
  '16201': Pieces.castleWallCorner,
  '16202': Pieces.castleWallStraight,
  '16203': Pieces.castleWallEnd,
  '16401': Pieces.archDoor3,
  '16404': Pieces.archNoDoor3,
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
  255: '1', // red rgba(255,0,0,0)
  65280: '2', // green rgba(0,255,0,0)
  16711680: '3', // blue rgba(0,0,255,0)
  65535: '4', // yellow rgba(255,255,0,0)
  16711935: '5', // violet rgba(255,0,255,0)
  16776960: '6', // cyan rgba(0,255,255,0)
  33023: '7', // orange  rgba(255,128,0,0)
  16711808: '8', // purple rgba(128,0,255,0)
}


