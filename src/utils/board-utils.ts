import { HexTerrain } from '../types'
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
        terrain === HexTerrain.swamp
    ) {
        return true
    } else {
        return false
    }
}