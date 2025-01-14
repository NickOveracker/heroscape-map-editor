import { BoardHexes, MapState } from '../types'
import {
  MAX_HEXAGON_MAP_DIMENSION,
  MAX_RECTANGLE_MAP_DIMENSION,
} from './constants'
import { genRandomMapName } from './genRandomMapName'
import { generateHexagon, generateRectangle } from './hex-gen'

type RectangleScenarioOptions = {
  mapWidth?: number
  mapLength?: number
  mapName?: string
}

export function makeRectangleScenario(
  options?: RectangleScenarioOptions,
): MapState {
  const mapHeightX = options?.mapLength ?? 15
  const mapWidthY = options?.mapWidth ?? 15
  if (mapWidthY > MAX_RECTANGLE_MAP_DIMENSION || mapHeightX > MAX_RECTANGLE_MAP_DIMENSION) {
    console.error(`Maximum map dimension for rectangular map: ${MAX_RECTANGLE_MAP_DIMENSION}. You passed an option larger than ${MAX_RECTANGLE_MAP_DIMENSION} to makeRectangleScenario`)
  }
  const mapHeight = Math.min(
    options?.mapLength ?? 15,
    MAX_RECTANGLE_MAP_DIMENSION,
  )
  const mapWidth = Math.min(
    options?.mapWidth ?? 15,
    MAX_RECTANGLE_MAP_DIMENSION,
  )
  const hexMap = {
    id: generateTimestampID(),
    name: options?.mapName ?? genRandomMapName(),
    shape: 'rectangle',
    width: mapWidth,
    height: mapHeight,
  }

  const boardHexes: BoardHexes = generateRectangle(mapHeight, mapWidth)
  return {
    boardHexes,
    hexMap,
    boardPieces: {},
  }
}
type HexagonScenarioOptions = {
  size?: number
  mapName?: string
}
export function makeHexagonScenario(
  options?: HexagonScenarioOptions,
): MapState {
  const mapSize = options?.size ?? 12
  const size = Math.min(mapSize, MAX_HEXAGON_MAP_DIMENSION)
  if (mapSize > MAX_HEXAGON_MAP_DIMENSION) {
    console.error(`Maximum map dimension for rectangular map: ${MAX_HEXAGON_MAP_DIMENSION}. You passed an option larger than ${MAX_HEXAGON_MAP_DIMENSION} to makeRectangleScenario`)
  }
  const hexMap = {
    id: generateTimestampID(),
    name: options?.mapName ?? genRandomMapName(),
    shape: 'hexagon',
    width: size,
    height: size,
  }

  const boardHexes: BoardHexes = generateHexagon(size)
  return {
    boardHexes,
    hexMap,
    boardPieces: {},
  }
}

function generateTimestampID(): string {
  return new Date().getTime().toString()
}
