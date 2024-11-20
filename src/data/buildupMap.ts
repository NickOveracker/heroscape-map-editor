import { clone } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, CubeCoordinate, MapState, } from '../types'
import { isFluidTerrainHex, isSolidTerrainHex } from '../utils/board-utils';
import { HEXGRID_MAX_ALTITUDE } from '../utils/constants';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import { fluidLandCodes, solidLandCodes } from './pieceCodes';
import { landPieces } from './pieces';
import getVSTileTemplate from './rotationTransforms';
import { makeRectangleScenario } from '../utils/map-gen';

export default function buildupMap(tiles: VirtualScapeTile[], fileName: string): MapState {
  const mapLength = Math.max(...tiles.map(t => t.posX + 1))
  const mapWidth = Math.max(...tiles.map(t => t.posY + 1))
  const newRectangleScenario = makeRectangleScenario({
    mapLength,
    mapWidth,
    mapName: `VirtualScapeMap: ${fileName}`,
  })
  const initialBoardHexes = newRectangleScenario.boardHexes
  const newHexMap = newRectangleScenario.hexMap
  const newBoardPieces = newRectangleScenario.boardPieces
  const newBoardHexes = tiles.reduce((boardHexes: BoardHexes, tile) => {
    const tileCoords = hexUtilsOddRToCube(tile.posX, tile.posY)
    const solidPieceId = solidLandCodes?.[tile.type] ?? ''
    const fluidPieceId = fluidLandCodes?.[tile.type] ?? ''
    let piece = solidPieceId || fluidPieceId ? landPieces[(solidPieceId || fluidPieceId)] : undefined
    if (piece) {
      const { newBoardHexes, newPieceID } = getBoardHexesWithPieceAdded({
        piece,
        boardHexes,
        cubeCoords: tileCoords,
        placementAltitude: tile.posZ, // z is altitude is virtualscape, y is altitude in our app
        rotation: tile.rotation,
      })
      newBoardPieces[newPieceID] = piece.inventoryID
      return newBoardHexes
    } else {
      return boardHexes // Should probably handle this different, errors etc.
    }
  }, initialBoardHexes)
  return {
    boardHexes: newBoardHexes,
    hexMap: newHexMap,
    boardPieces: newBoardPieces,
  }
}

type PieceAddArgs = {
  piece: Piece,
  boardHexes: BoardHexes,
  cubeCoords: CubeCoordinate,
  placementAltitude: number
  rotation: number
}
export function getBoardHexesWithPieceAdded({
  piece,
  boardHexes,
  cubeCoords,
  placementAltitude,
  rotation,
}: PieceAddArgs): PieceAddReturn {
  let newBoardHexes = clone(boardHexes)
  let pieceID = '' // will get mutated after we validate, but we need to return it from this scope
  const isSolidTile = isSolidTerrainHex(piece.terrain)
  const isFluidTile = isFluidTerrainHex(piece.terrain)
  // 1.1: GATHER DATA ON TILE
  const piecePlaneCoords = getVSTileTemplate({
    clickedHex: { q: cubeCoords.q, r: cubeCoords.r, s: cubeCoords.s },
    rotation: rotation,
    template: piece.template,
    isVsTile: true
  })
  const genIds = (altitude: number) => {
    return piecePlaneCoords.map((cubeCoord) => (
      genBoardHexID({ ...cubeCoord, altitude: altitude })
    ))
  }
  const newPieceAltitude = placementAltitude + 1
  const underHexIds = genIds(placementAltitude)
  const newHexIds = genIds(newPieceAltitude)
  const overHexIds = genIds(newPieceAltitude + 1)
  // 2: VALIDATE DATA
  const isPlacingOnTable = placementAltitude === 0
  const isSpaceFree = newHexIds.every(id => !newBoardHexes[id])
  const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? '')) // fluids will need one under every hex (no multi hex fluids yet)
  const isSolidUnderAllForFluidPieces = underHexIds.every(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''))
  const isPieceSupported = isPlacingOnTable || (isSolidTile && isSolidUnderAtLeastOne) || (isFluidTile && isSolidUnderAllForFluidPieces)
  // 3. PLACE THE PIECE
  if (isSpaceFree && isPieceSupported) {
    newHexIds.forEach((newHexID, iForEach) => {
      const hexUnderneath = newBoardHexes?.[underHexIds[iForEach]]
      const hexAbove = newBoardHexes?.[overHexIds[iForEach]]
      const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
      const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
      let baseHexID = newHexID // this will get updated if there is a hex below, and copied if there's hex(es) above
      let isCap = true
      if (isSolidTile && isSolidAbove && !isSolidUnderneath) { // solids meld with above
        let isCap = false // we are not a cap if there is a solid above us
        // edit above hex(es) to now have our new hex as their baseHexID
        for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - newPieceAltitude); i++) {
          const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: newPieceAltitude + i })
          if (newBoardHexes[nextID]) {
            newBoardHexes[nextID].baseHexID = baseHexID
            if (newBoardHexes[nextID].isCap) {
              // reached the cap, we can stop
              break
            }
          }
        }
      }
      if (isSolidTile && isSolidAbove && isSolidUnderneath) { // solids meld above with below
        isCap = false // we are not a cap if there is a solid above us
        baseHexID = hexUnderneath.baseHexID
        // edit above hex(es) to now have underneath hex baseHexID as their baseHexID
        for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - newPieceAltitude); i++) {
          const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: newPieceAltitude + i })
          if (newBoardHexes[nextID]) {
            newBoardHexes[nextID].baseHexID = baseHexID
            if (newBoardHexes[nextID].isCap) {
              break // reached the cap, we can stop
            }
          }
        }
      }
      if (!isSolidAbove && (isSolidUnderneath || isPlacingOnTable)) { // solids and fluids can replace the cap below
        // remove old cap
        newBoardHexes[hexUnderneath.id].isCap = false
        // copy old cap baseHexID, we are building off of it
        baseHexID = newBoardHexes[hexUnderneath.id].baseHexID
      }
      pieceID = genPieceID(newHexID, piece.id)
      newBoardHexes[newHexID] = {
        id: newHexID,
        q: piecePlaneCoords[iForEach].q,
        r: piecePlaneCoords[iForEach].r,
        s: piecePlaneCoords[iForEach].s,
        altitude: newPieceAltitude,
        terrain: piece.terrain,
        pieceID,
        isCap,
        baseHexID
      }
    })
  }
  return { newBoardHexes, newPieceID: pieceID }
}
type PieceAddReturn = { newBoardHexes: BoardHexes, newPieceID: string }



