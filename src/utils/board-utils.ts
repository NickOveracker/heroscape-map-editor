import { HexTerrain, Pieces } from '../types'
export function isFluidTerrainHex(terrain: string) {
    if (
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
    if (
        terrain === HexTerrain.brush ||
        terrain === HexTerrain.palm
    ) {
        return true
    } else {
        return false
    }
}
export function isObstacleTerrain(terrain: string) {
    if (
        terrain === HexTerrain.tree ||
        terrain === HexTerrain.brush ||
        terrain === HexTerrain.palm
    ) {
        return true
    } else {
        return false
    }
}
export function isTreePieceID(inventoryID: string) {
    if (
        inventoryID === Pieces.tree10 ||
        inventoryID === Pieces.tree11 ||
        inventoryID === Pieces.tree12 ||
        inventoryID === Pieces.brush9 ||
        inventoryID === Pieces.palm14 ||
        inventoryID === Pieces.palm15 ||
        inventoryID === Pieces.palm16
        // inventoryID === Pieces.tree415 ||
    ) {
        return true
    } else {
        return false
    }
}
export function isObstaclePieceID(inventoryID: string) {
    if (
        isTreePieceID(inventoryID)
    ) {
        return true
    } else {
        return false
    }
}