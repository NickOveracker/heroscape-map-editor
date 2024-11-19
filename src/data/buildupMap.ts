import { clone, cloneDeep } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, HexoscapeTile, CubeCoordinate, } from '../types'
import { isFluidTerrainHex, isSolidTerrainHex } from '../utils/board-utils';
import { HEXGRID_MAX_ALTITUDE } from '../utils/constants';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import { fluidLandCodes, solidLandCodes } from './pieceCodes';
import { landPieces } from './pieces';
import getVSTileTemplate from './rotationTransforms';

export default function buildupMap(tiles: VirtualScapeTile[]): BoardHexes {
  return tiles.reduce((boardHexes: BoardHexes, tile) => {
    const tileCoords = hexUtilsOddRToCube(tile.posX, tile.posY)
    const solidPieceId = solidLandCodes?.[tile.type] ?? ''
    const fluidPieceId = fluidLandCodes?.[tile.type] ?? ''
    let piece = solidPieceId || fluidPieceId ? landPieces[(solidPieceId || fluidPieceId)] : undefined
    if (piece) {
      // 0. THE EXTRACT
      const newBoardHexes = getBoardHexesWithPieceAdded({
        piece,
        boardHexes,
        cubeCoords: tileCoords,
        altitude: tile.posZ + 1, // Hexoscape altitude starts at 1, virtualscape started at 0
        rotation: tile.rotation,
      })
      return newBoardHexes
    }
    return boardHexes // Should probably handle this different, errors etc.
  }, {})
}


export function getBoardHexesWithPieceAdded({
  piece,
  boardHexes,
  cubeCoords,
  altitude,
  rotation,
}: {
  piece: Piece,
  boardHexes: BoardHexes,
  cubeCoords: CubeCoordinate,
  altitude: number
  rotation: number
}) {
  let newBoardHexes = clone(boardHexes)
  const isSolidTile = isSolidTerrainHex(piece.terrain)
  const isFluidTile = isFluidTerrainHex(piece.terrain)
  // 1.1: GATHER DATA ON TILE
  const piecePlaneCoords = getVSTileTemplate({
    clickedHex: { q: cubeCoords.q, r: cubeCoords.r, s: cubeCoords.s },
    rotation: rotation,
    template: piece.template,
    isVsTile: true
  })
  const newHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude })))
  const underHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude - 1 })))
  const overHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude + 1 })))
  // 2: VALIDATE DATA
  const isPlacingOnTable = (isSolidTile && altitude === 1) || (isFluidTile && altitude === 0)
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
      if (isSolidTile) { // solids might meld
        if (isSolidAbove && isSolidUnderneath) { // meld above with below
          isCap = false // we are not a cap if there is a solid above us
          baseHexID = hexUnderneath.baseHexID
          for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - altitude); i++) {
            const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: altitude + i })
            if (newBoardHexes[nextID]) {
              newBoardHexes[nextID].baseHexID = baseHexID
              if (newBoardHexes[nextID].isCap) {
                break // reached the cap, we can stop
              }
            }
          }
        }
        if (isSolidAbove && !isSolidUnderneath) { // meld only with above
          // edit above hex(es) to now have our new hex as their baseHexID
          for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - altitude); i++) {
            const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: altitude + i })
            if (newBoardHexes[nextID]) {
              newBoardHexes[nextID].baseHexID = baseHexID
              if (newBoardHexes[nextID].isCap) {
                // reached the cap, we can stop
                break
              }
            }
          }
        }
      }

      if (isSolidUnderneath) { // solids and fluids can replace the cap below
        // remove old cap
        newBoardHexes[hexUnderneath.id].isCap = false
        // copy old cap baseHexID, we are building off of it
        baseHexID = newBoardHexes[hexUnderneath.id].baseHexID
      }
      newBoardHexes[newHexID] = {
        id: newHexID,
        q: piecePlaneCoords[iForEach].q,
        r: piecePlaneCoords[iForEach].r,
        s: piecePlaneCoords[iForEach].s,
        altitude,
        terrain: piece.terrain,
        pieceID: genPieceID(newHexID, piece.id),
        isCap,
        baseHexID
      }
    })
  }
  console.log("🚀 ~ newBoardHexes:", newBoardHexes)
  return newBoardHexes
}



