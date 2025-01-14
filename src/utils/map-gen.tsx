import { BoardHexes, MapState } from '../types'
import {
  MAX_HEXAGON_MAP_DIMENSION,
  MAX_RECTANGLE_MAP_DIMENSION,
} from './constants'
import { genRandomMapName } from './genRandomMapName'
import { generateHexagon, generateRectangle } from './hex-gen'

type RectangleScenarioOptions = {
  length?: number
  width?: number
  mapName?: string
}

export function makeRectangleScenario(
  options?: RectangleScenarioOptions,
): MapState {
  const mapLengthX = options?.width ?? 15
  const apWidthY = options?.length ?? 15
  if (apWidthY > MAX_RECTANGLE_MAP_DIMENSION || mapLengthX > MAX_RECTANGLE_MAP_DIMENSION) {
    console.error(`Maximum map dimension for rectangular map: ${MAX_RECTANGLE_MAP_DIMENSION}. You passed an option larger than ${MAX_RECTANGLE_MAP_DIMENSION} to makeRectangleScenario`)
  }
  const mapLength = Math.min(
    options?.width ?? 15,
    MAX_RECTANGLE_MAP_DIMENSION,
  )
  const mapWidth = Math.min(
    options?.length ?? 15,
    MAX_RECTANGLE_MAP_DIMENSION,
  )
  const hexMap = {
    id: generateTimestampID(),
    name: options?.mapName ?? genRandomMapName(),
    shape: 'rectangle',
    width: mapWidth,
    length: mapLength,
  }

  const boardHexes: BoardHexes = generateRectangle(mapLength, mapWidth)
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
    length: size,
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
