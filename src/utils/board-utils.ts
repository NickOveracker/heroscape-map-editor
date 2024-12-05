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

export function isObstaclePieceID(inventoryID: string) {
    if (
        inventoryID === Pieces.tree10 ||
        inventoryID === Pieces.tree11 ||
        inventoryID === Pieces.tree12 ||
        inventoryID === Pieces.tree415 ||
        inventoryID === Pieces.brush9 ||
        inventoryID === Pieces.palm14 ||
        inventoryID === Pieces.palm15 ||
        inventoryID === Pieces.palm16 ||
        inventoryID === Pieces.outcrop1 ||
        inventoryID === Pieces.outcrop3 ||
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