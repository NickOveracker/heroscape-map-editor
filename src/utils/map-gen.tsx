import { BoardHexes, MapState } from "../types"
import { generateHexagon, generateRectangle } from "./hex-gen"

/* 
MAX_DIMENSION this will limit hexes to about 900 board hexes, a good limit for now on desktop
*/
const MAX_RECTANGLE_DIMENSION = 30
const MAX_HEXAGON_DIMENSION = 17 // 921
type RectangleScenarioOptions = {
    mapWidth?: number
    mapLength?: number
}

export const rectangleScenario = makeRectangleScenario({
    mapLength: 20,
    mapWidth: 20,
})
function makeRectangleScenario(options?: RectangleScenarioOptions): MapState {
    const mapHeight = Math.min(options?.mapLength ?? 12, MAX_RECTANGLE_DIMENSION)
    const mapWidth = Math.min(options?.mapWidth ?? 12, MAX_RECTANGLE_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: 'default rectangle map',
        shape: 'rectangle',
        size: Math.max(mapHeight, mapWidth),
        glyphs: {},
    }

    const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth)
    return {
        boardHexes,
        hexMap,
    }
}
type HexagonScenarioOptions = {
    size?: number
}
export const hexagonScenario = makeHexagonScenario({
    size: 0,
})
function makeHexagonScenario(options?: HexagonScenarioOptions): MapState {
    const size = Math.min(options?.size ?? 6, MAX_HEXAGON_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: 'default hexagon map',
        shape: 'hexagon',
        size,
        glyphs: {},
    }

    const boardHexes: BoardHexes = generateHexagon(size)
    return {
        boardHexes,
        hexMap,
    }
}

function generateTimestampID(): string {
    return new Date().getTime().toString()
}
