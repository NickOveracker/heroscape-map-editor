import { BoardHex, BoardHexes, CubeCoordinate, HexTerrain } from '../types'
import { hexUtilsGenHexagonGrid, hexUtilsGenRectangleGrid } from './hex-utils'
import { genBoardHexID } from './map-utils'

export const generateHexagon = (mapSize: number): BoardHexes => {
  const hexgridHexes = hexUtilsGenHexagonGrid(mapSize)
  // in order to keep our hex grid within the same quadrant of the XY plane, we need to move it "to the right and down" according to the map size
  const boardHexes = hexesToBoardHexes(
    translateHexagonHexesToNormal(hexgridHexes, mapSize)
  )
  return boardHexes
}

/* 
  translateHexagonHexesToNormal
  translateHexagonBoardHexesToNormal
    These functions normalize a hexagon map that is centered around (0,0), to one that stays in the same XY quadrant as rectangular maps. 
    (Moves it "to the right and down" according to the map size)
    DOWNSIDE: It causes decimal values for q if the map size is odd
*/
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
  const hexgridHexes = hexUtilsGenRectangleGrid(mapWidth, mapHeight)
  const boardHexes = hexesToBoardHexes(hexgridHexes)
  return boardHexes
}

function hexesToBoardHexes(hexgridHexes: CubeCoordinate[]): BoardHexes {
  return hexgridHexes.reduce(
    (prev: BoardHexes, curr: CubeCoordinate): BoardHexes => {
      const boardHex = {
        ...curr,
        id: genBoardHexID({ ...curr, altitude: 1 }),
        isUnitTail: false,
        altitude: 0,
        terrain: HexTerrain.grass,
        startzonePlayerIDs: [],
      }
      return {
        ...prev,
        [boardHex.id]: boardHex,
      }
    },
    {}
  )
}
