import { BoardHexes, MapState } from "../types"
import { MAX_HEXAGON_MAP_DIMENSION, MAX_RECTANGLE_MAP_DIMENSION } from "./constants"
import { generateHexagon, generateRectangle } from "./hex-gen"

type RectangleScenarioOptions = {
    mapWidth?: number
    mapLength?: number
    mapName?: string
    mapShape?: string
}

export const rectangleScenario = makeRectangleScenario({
    mapLength: 25,
    mapWidth: 25,
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
    }

    const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth)
    return {
        boardHexes,
        hexMap,
        boardPieces: {},
        glyphs: {},
        startZones: {}
    }
}
type HexagonScenarioOptions = {
    size?: number
}
export const hexagonScenario = makeHexagonScenario({
    size: 15,
})
function makeHexagonScenario(options?: HexagonScenarioOptions): MapState {
    const size = Math.min(options?.size ?? 12, MAX_HEXAGON_MAP_DIMENSION)
    const hexMap = {
        id: generateTimestampID(),
        name: 'default hexagon map',
        shape: 'hexagon',
        width: size,
        height: size,
    }

    const boardHexes: BoardHexes = generateHexagon(size)
    return {
        boardHexes,
        hexMap,
        boardPieces: {},
        glyphs: {},
        startZones: {}
    }
}

function generateTimestampID(): string {
    return new Date().getTime().toString()
}
