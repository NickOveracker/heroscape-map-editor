import { piecesSoFar } from '../data/pieces'
import { BoardHexes, HexTerrain, Pieces } from '../types'
import { decodePieceID } from './map-utils'
export function isFluidTerrainHex(terrain: string) {
  if (
    terrain === HexTerrain.wellspringWater ||
    terrain === HexTerrain.water ||
    terrain === HexTerrain.lava ||
    terrain === HexTerrain.swampWater ||
    terrain === HexTerrain.ice ||
    terrain === HexTerrain.shadow
  ) {
    return true
  } else {
    return false
  }
}
export function isSolidTerrainHex(terrain: string) {
  if (
    terrain === HexTerrain.grass ||
    terrain === HexTerrain.rock ||
    terrain === HexTerrain.sand ||
    terrain === HexTerrain.road ||
    terrain === HexTerrain.snow ||
    terrain === HexTerrain.lavaField ||
    terrain === HexTerrain.concrete ||
    terrain === HexTerrain.asphalt ||
    terrain === HexTerrain.dungeon ||
    terrain === HexTerrain.wallWalk ||
    terrain === HexTerrain.swamp
  ) {
    return true
  } else {
    return false
  }
}
export function isPieceIDPiece(inventoryID: string) {
  if (
    inventoryID === Pieces.battlement ||
    inventoryID === Pieces.roadWall ||
    inventoryID === Pieces.laurWallRuin ||
    inventoryID === Pieces.laurWallShort ||
    inventoryID === Pieces.laurWallLong
  ) {
    return true
  } else {
    return false
  }
}
export function isNoVerifyDeletePieceByPieceID(inventoryID: string) {
  if (
    inventoryID === Pieces.tree10 ||
    inventoryID === Pieces.ruins2 ||
    inventoryID === Pieces.ruins3 ||
    inventoryID === Pieces.tree10 ||
    inventoryID === Pieces.tree11 ||
    inventoryID === Pieces.tree12 ||
    inventoryID === Pieces.tree415 ||
    inventoryID === Pieces.brush9 ||
    inventoryID === Pieces.palm14 ||
    inventoryID === Pieces.palm15 ||
    inventoryID === Pieces.palm16 ||
    inventoryID === Pieces.laurBrush10 ||
    inventoryID === Pieces.laurPalm13 ||
    inventoryID === Pieces.laurPalm14 ||
    inventoryID === Pieces.laurPalm15 ||
    inventoryID === Pieces.outcrop1 ||
    inventoryID === Pieces.outcrop3 ||
    inventoryID === Pieces.lavaRockOutcrop1 ||
    inventoryID === Pieces.lavaRockOutcrop3 ||
    inventoryID === Pieces.glacier1 ||
    inventoryID === Pieces.glacier3 ||
    inventoryID === Pieces.glacier4 ||
    inventoryID === Pieces.glacier6 ||
    inventoryID === Pieces.hive
  ) {
    return true
  } else {
    return false
  }
}
export function isJungleTerrainHex(terrain: string) {
  if (terrain === HexTerrain.brush || terrain === HexTerrain.palm ||
    terrain === HexTerrain.laurBrush || terrain === HexTerrain.laurPalm
  ) {
    return true
  } else {
    return false
  }
}

export function isObstaclePieceID(id: string) {
  if (
    id === Pieces.laurWallPillar ||
    id === Pieces.tree10 ||
    id === Pieces.tree11 ||
    id === Pieces.tree12 ||
    id === Pieces.tree415 ||
    id === Pieces.swampBrush10 ||
    id === Pieces.brush9 ||
    id === Pieces.palm14 ||
    id === Pieces.palm15 ||
    id === Pieces.palm16 ||
    id === Pieces.laurBrush10 ||
    id === Pieces.laurPalm13 ||
    id === Pieces.laurPalm14 ||
    id === Pieces.laurPalm15 ||
    id === Pieces.outcrop1 ||
    id === Pieces.outcrop3 ||
    id === Pieces.lavaRockOutcrop1 ||
    id === Pieces.lavaRockOutcrop3 ||
    id === Pieces.glacier1 ||
    id === Pieces.glacier3 ||
    id === Pieces.glacier4 ||
    id === Pieces.glacier6 ||
    id === Pieces.hive
  ) {
    return true
  } else {
    return false
  }
}
export function isBridgingObstaclePieceID(id: string) {
  // isObstaclePieceSupported: EXCEPTION MADE FOR OBSTACLES WITH FLUID BASES, THEY CAN BRIDGE
  if (
    id === Pieces.glacier4 ||
    id === Pieces.glacier6 ||
    id === Pieces.hive
  ) {
    return true
  } else {
    return false
  }
}
export const getBoardHexObstacleOriginsAndHexes = (boardHexes: BoardHexes): BoardHexes => {
  return Object.values(boardHexes).reduce((acc, hex) => {
    const inventoryPieceID = decodePieceID(hex.pieceID).pieceID;
    const isPieceOriginHex =
      piecesSoFar[inventoryPieceID]?.isHexTerrainPiece ||
      (piecesSoFar[inventoryPieceID]?.isObstaclePiece && hex.isObstacleOrigin)

    if (isPieceOriginHex) {
      acc[hex.id] = hex;
    }
    return acc;
  }
    , {} as BoardHexes);
}