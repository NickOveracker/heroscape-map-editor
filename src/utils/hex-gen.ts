import { BoardHex, BoardHexes, CubeCoordinate, HexTerrain } from '../types'
import { hexUtilsGenHexagonGrid, hexUtilsGenRectangleGrid } from './hex-utils'
import { genBoardHexID } from './map-utils'

export const generateHexagon = (mapSize: number): BoardHexes => {
  // keeps our hex grid within same quadrant as rectangle map
  const boardHexes = hexesToEmptyBoardHexes(
    translateHexagonHexesToNormal(hexUtilsGenHexagonGrid(mapSize), mapSize)
  )
  return boardHexes
}

const qAdjust = 2 // why does dividing by 2 work?
const translateHexagonHexesToNormal = (
  hexes: CubeCoordinate[],
  mapSize: number
): CubeCoordinate[] => {
  return hexes.map((hex: CubeCoordinate) => {
    return {
      ...hex,
      q: hex.q + mapSize / qAdjust,
      r: hex.r + mapSize,
    }
  })
}
export const translateHexagonBoardHexesToNormal = (
  boardhexes: BoardHexes,
  mapSize: number
): BoardHexes => {
  const hexArray = Object.values(boardhexes)
  return hexArray.reduce((prev: BoardHexes, curr: BoardHex) => {
    const q = curr.q + mapSize / qAdjust
    const r = curr.r + mapSize
    const newID = genBoardHexID(curr)
    prev[newID] = {
      ...curr,
      id: newID,
      q,
      r,
    }
    return prev
  }, {} as BoardHexes)
}

export const generateRectangle = (
  mapWidth: number,
  mapHeight: number
): BoardHexes => {
  return hexesToEmptyBoardHexes(hexUtilsGenRectangleGrid(mapWidth, mapHeight))
}

function hexesToEmptyBoardHexes(hexgridHexes: CubeCoordinate[]): BoardHexes {
  return hexgridHexes.reduce(
    (prev: BoardHexes, curr: CubeCoordinate): BoardHexes => {
      const id = genBoardHexID({ ...curr, altitude: 0 })
      const boardHex = {
        ...curr,
        id,
        terrain: HexTerrain.empty,
        altitude: 0,
        pieceID: '',
        isCap: true,
        baseHexID: id,
      }
      return {
        ...prev,
        [boardHex.id]: boardHex,
      }
    },
    {}
  )
}
