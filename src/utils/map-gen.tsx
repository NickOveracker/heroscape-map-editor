import { BoardHexes, MapState } from "../types"
import { MAX_HEXAGON_DIMENSION, MAX_RECTANGLE_DIMENSION } from "./constants"
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
    const mapHeight = Math.min(options?.mapLength ?? 12, MAX_RECTANGLE_DIMENSION)
    const mapWidth = Math.min(options?.mapWidth ?? 12, MAX_RECTANGLE_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: options?.mapName ?? 'default rectangle map',
        shape: options?.mapShape ?? 'rectangle',
        width: mapWidth,
        height: mapHeight,
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
    size: 20,
})
function makeHexagonScenario(options?: HexagonScenarioOptions): MapState {
    const size = Math.min(options?.size ?? 6, MAX_HEXAGON_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: 'default hexagon map',
        shape: 'hexagon',
        width: size,
        height: size,
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
