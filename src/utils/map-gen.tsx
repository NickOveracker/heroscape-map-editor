import { BoardHexes, MapState } from "../types"
import { HEXGRID_MAX_ALTITUDE, MAX_HEXAGON_MAP_DIMENSION, MAX_RECTANGLE_MAP_DIMENSION } from "./constants"
import { generateHexagon, generateRectangle } from "./hex-gen"

/* 
MAX_DIMENSION this will limit hexes to about 900 board hexes, a good limit for now on desktop
*/

type RectangleScenarioOptions = {
    mapWidth?: number
    mapLength?: number
    mapName?: string
    mapShape?: string
}

export const rectangleScenario = makeRectangleScenario({
    mapLength: 50,
    mapWidth: 50,
})
export function makeRectangleScenario(options?: RectangleScenarioOptions): MapState {
    const mapHeight = Math.min(options?.mapLength ?? 15, MAX_RECTANGLE_MAP_DIMENSION)
    const mapWidth = Math.min(options?.mapWidth ?? 15, MAX_RECTANGLE_MAP_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: options?.mapName ?? 'default rectangle map',
        shape: options?.mapShape ?? 'rectangle',
        width: mapWidth,
        height: mapHeight,
        maxSubTerrains: mapWidth * mapHeight * HEXGRID_MAX_ALTITUDE,
        glyphs: {},
    }

    const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth)
    return {
        boardHexes,
        hexMap,
        boardPieces: {}
    }
}
type HexagonScenarioOptions = {
    size?: number
}
export const hexagonScenario = makeHexagonScenario({
    size: 30,
})
function makeHexagonScenario(options?: HexagonScenarioOptions): MapState {
    const size = Math.min(options?.size ?? 12, MAX_HEXAGON_MAP_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: 'default hexagon map',
        shape: 'hexagon',
        width: size,
        height: size,
        maxSubTerrains: (1 + 3 * size * (size + 1)) * HEXGRID_MAX_ALTITUDE,
        glyphs: {},
    }

    const boardHexes: BoardHexes = generateHexagon(size)
    return {
        boardHexes,
        hexMap,
        boardPieces: {}
    }
}

function generateTimestampID(): string {
    return new Date().getTime().toString()
}
