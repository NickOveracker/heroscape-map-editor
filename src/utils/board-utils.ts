import { HexTerrain, Pieces } from '../types'
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
export function isJungleTerrainHex(terrain: string) {
  if (terrain === HexTerrain.brush || terrain === HexTerrain.palm) {
    return true
  } else {
    return false
  }
}

export function isObstructingTerrain(terrain: string) {
  // This fn and its implementations are a big maybe and WIP
  if (
    terrain === HexTerrain.tree ||
    terrain === HexTerrain.brush ||
    terrain === HexTerrain.palm
    // terrain === HexTerrain.palm ||
    // terrain === HexTerrain.hive ||
    // terrain === HexTerrain.glacier ||
    // terrain === HexTerrain.outcrop ||
    // terrain === HexTerrain.ruin
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
    id === Pieces.brush9 ||
    id === Pieces.palm14 ||
    id === Pieces.palm15 ||
    id === Pieces.palm16 ||
    id === Pieces.outcrop1 ||
    id === Pieces.outcrop3 ||
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
