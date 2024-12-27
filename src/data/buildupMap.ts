import {
  VirtualScapeTile,
  BoardHexes,
  MapState,
  BoardPieces,
  HexMap,
} from '../types'
import { hexUtilsOddRToCube } from '../utils/hex-utils'
import { makeHexagonScenario, makeRectangleScenario } from '../utils/map-gen'
import { pieceCodes } from './pieceCodes'
import { piecesSoFar } from './pieces'

export default function buildupVSFileMap(
  tiles: VirtualScapeTile[],
  mapName: string,
): MapState {
  const blankMap = getBlankHexoscapeMapForVSTiles(tiles, mapName)
  let { boardPieces } = blankMap
  const { boardHexes, hexMap } = blankMap
  const terrainTilesOnly = tiles.filter((t) => t.type !== 15001)
  // const startZoneTiles = tiles.filter(t => t.type === 15001)
  const newBoardHexes = terrainTilesOnly.reduce(
    (boardHexes: BoardHexes, tile) => {
      const tileCoords = hexUtilsOddRToCube(tile.posX, tile.posY)
      const id = pieceCodes?.[getCodeQuick(tile)] ?? ''
      const piece = piecesSoFar[id]
      if (!piece) {
        return boardHexes // Should probably handle this different, errors etc.
      }
      // get the new board hexes and new board pieces
      const { newBoardHexes, newBoardPieces } = getBoardHexesWithPieceAdded({
        piece,
        boardHexes,
        boardPieces,
        cubeCoords: tileCoords,
        placementAltitude: tile.posZ, // z is altitude is virtualscape, y is altitude in our app
        rotation: tile.rotation,
        isVsTile: true,
      })
      // mark every new piece on the board
      boardPieces = newBoardPieces
      return newBoardHexes
    },
    boardHexes,
  )

  return {
    boardHexes: newBoardHexes,
    hexMap: hexMap,
    boardPieces,
  }
}

export function buildupJsonFileMap(boardPieces: BoardPieces, hexMap: HexMap): MapState {
  // For JSON maps, the map dimensions are free, we do not have to compute them
  let initialBoardHexes: BoardHexes = {}
  if (hexMap.shape === 'rectangle') {
    initialBoardHexes = makeRectangleScenario({
      mapLength: hexMap.height,
      mapWidth: hexMap.width,
      mapName: hexMap.name,
    }).boardHexes
  } else {
    initialBoardHexes = makeHexagonScenario({
      size: hexMap.height,
      mapName: hexMap.name,
    }).boardHexes
  }
  const newBoardHexes = Object.keys(boardPieces).reduce((boardHexes: BoardHexes, pieceQraID): BoardHexes => {
    // For JSON maps, we build the tile coords by parsing the ID
    const arrayThing = pieceQraID.split('.')
    const placementAltitude = parseInt(arrayThing[0])
    const q = parseInt(arrayThing[1])
    const r = parseInt(arrayThing[2])
    const s = -q - r
    const rotation = parseInt(arrayThing[3])
    const pieceInventoryID = arrayThing[4]
    const tileCoords = { q, r, s }
    // start zones
    // if (tile.type === 15001) {
    // }
    // personalTiles
    const piece = piecesSoFar[pieceInventoryID]
    if (!piece) {
      return boardHexes // Should probably handle this different, errors etc.
    }
    // get the new board hexes and new board pieces
    const { newBoardHexes } = getBoardHexesWithPieceAdded({
      piece,
      boardHexes,
      boardPieces,
      cubeCoords: tileCoords,
      placementAltitude: placementAltitude, // z is altitude is virtualscape, y is altitude in our app
      rotation: rotation,
      isVsTile: false
    })
    // mark every new piece on the board
    // boardPieces = newBoardPieces
    return newBoardHexes
    // return boardHexes
  }, initialBoardHexes)

  return {
    boardHexes: newBoardHexes,
    hexMap: hexMap,
    boardPieces,
  }
}

function getBlankHexoscapeMapForVSTiles(
  tiles: VirtualScapeTile[],
  mapName: string,
): MapState {
  // cushions have to be an even number because of the coordinate system used in virtualscape
  const cushionToPadY = 8 // 24-hexer's max Y displacement in vscape
  const cushionToPadX = 6 // 24-hexer's max X displacement in vscape
  const xMin = Math.min(...tiles.map((t) => t.posX - cushionToPadX))
  const yMin = Math.min(...tiles.map((t) => t.posY - cushionToPadY))
  // remove as many empty hexes as possible from the empty grid we are going to generate
  const xIncrementsWorthEmpty = Math.floor(xMin / 2)
  const yIncrementsWorthEmpty = Math.floor(yMin / 2)
  // MUTATE TILES TO MAKE MAP SMALL AS POSSIBLE
  if (xIncrementsWorthEmpty > 0) {
    tiles.forEach((t) => {
      t.posX -= xIncrementsWorthEmpty * 2
    })
  }
  if (yIncrementsWorthEmpty > 0) {
    tiles.forEach((t) => {
      t.posY -= yIncrementsWorthEmpty * 2
    })
  }
  // these are the dimensions of the empty map to generate
  const mapLength = Math.max(...tiles.map((t) => t.posX + cushionToPadX))
  const mapWidth = Math.max(...tiles.map((t) => t.posY + cushionToPadY))

  return makeRectangleScenario({
    mapLength,
    mapWidth,
    mapName,
  })
}
function getCodeQuick(tile: VirtualScapeTile) {
  if (
    tile.type === 17000 &&
    ((tile?.personal?.letter ?? '') === 'LW' ||
      (tile?.personal?.letter ?? '') === 'LW')
  ) {
    return 17101 // is now the laurPillar code, never existed in virtualscape
  }
  if (
    tile.type === 17000 &&
    ((tile?.personal?.letter ?? '') === 'W' ||
      (tile?.personal?.name ?? '').toLowerCase().includes('wellspring'))
  ) {
    return 17001 // is now the wellspring water 1-hex fluid piece code, never existed in virtualscape
  }
  return tile.type
}
