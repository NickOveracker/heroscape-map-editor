import { clone } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, CubeCoordinate, MapState, } from '../types'
import { isFluidTerrainHex, isSolidTerrainHex } from '../utils/board-utils';
import { HEXGRID_MAX_ALTITUDE } from '../utils/constants';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import getVSTileTemplate from './rotationTransforms';
import { makeRectangleScenario } from '../utils/map-gen';
import { pieceCodes } from './pieceCodes';
import { piecesSoFar } from './pieces';

export default function buildupVSFileMap(tiles: VirtualScapeTile[], fileName: string): MapState {
  const cushionToPadY = 8 // this has to be an even number or tile coords will break, I eyeballed a 24-hexer's max Y displacement in vscape
  const cushionToPadX = 6 // this has to be an even number or tile coords will break, I eyeballed a 24-hexer's max X displacement in vscape
  const mapLength = Math.max(...tiles.map(t => t.posX + cushionToPadX)) // We have to assume the map is large enough for largest tile laid the longest way?(7, the 24 hexer in rotation 3,4, or 5)
  const mapWidth = Math.max(...tiles.map(t => t.posY + cushionToPadY))
  /* 
    This broke maps:
    // const xMin = Math.min(...tiles.map(t => t.posX - cushionToPad))
    // const yMin = Math.min(...tiles.map(t => t.posY - cushionToPad))
    // mutate the tiles down to minimum size map needed
    // tiles.forEach(t => {
    //   t.posX -= xMin;
    //   t.posY -= yMin
    // })
    // const mapLength = Math.max(...tiles.map(t => t.posX)) // We have to assume the map is large enough for largest tile laid the longest way?(7, the 24 hexer in rotation 3,4, or 5)
    // const mapWidth = Math.max(...tiles.map(t => t.posY))
  */

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
    const inventoryID = pieceCodes?.[tile.type] ?? ''
    let piece = piecesSoFar[inventoryID]
    if (piece) {
      const { newBoardHexes, newPieceID } = getBoardHexesWithPieceAdded({
        piece,
        boardHexes,
        cubeCoords: tileCoords,
        placementAltitude: tile.posZ, // z is altitude is virtualscape, y is altitude in our app
        rotation: tile.rotation,
        isVsTile: true
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
  isVsTile: boolean
}
export function getBoardHexesWithPieceAdded({
  piece,
  boardHexes,
  cubeCoords,
  placementAltitude,
  rotation,
  isVsTile
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
    isVsTile
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
  const isLandPieceSupported = isPlacingOnTable || (isSolidTile && isSolidUnderAtLeastOne) || (isFluidTile && isSolidUnderAllForFluidPieces)
  // 3. PLACE THE PIECE
  if (piece.isLand)
    if (isSpaceFree && isLandPieceSupported) {
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
        if ((!isSolidAbove && isSolidUnderneath) || isPlacingOnTable) { // solids and fluids can replace the cap below
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



