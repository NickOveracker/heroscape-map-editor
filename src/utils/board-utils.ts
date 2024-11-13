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