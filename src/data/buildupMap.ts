import { VirtualScapeTile, BoardHexes, } from '../types'
import { isSolidTerrainHex } from '../utils/board-utils';
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
      const piecePlaneCoords = getVSTileTemplate({
        clickedHex: { q: tileCoords.q, r: tileCoords.r, s: tileCoords.s },
        rotation: tile.rotation,
        template: piece.template,
      })
      const altitude = tile.posZ + 1 // Hexoscape altitude starts at 1, virtualscape started at 0
      const isPlacingOnTable = altitude === 1
      const newHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude })))
      const underHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude - 1 })))
      const overHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: altitude + 1 })))

      const isSpaceFree = newHexIds.every(id => !boardHexes[id])
      const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(boardHexes?.[id]?.terrain ?? '')) // fluids will need one under every hex (no multi hex fluids yet)
      const isSolidUnderAllForFluidPieces = underHexIds.every(id => isSolidTerrainHex(boardHexes?.[id]?.terrain ?? ''))
      const isPieceSupported = isPlacingOnTable || (solidPieceId && isSolidUnderAtLeastOne) || (fluidPieceId && isSolidUnderAllForFluidPieces)
      if (isSpaceFree && isPieceSupported) {
        newHexIds.forEach((newHexID, iForEach) => {
          const hexUnderneath = boardHexes?.[underHexIds[iForEach]]
          const hexAbove = boardHexes?.[overHexIds[iForEach]]
          const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
          const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
          let baseHexID = newHexID // this will get updated if there is a hex below, and copied if there's hex(es) above
          let isCap = true
          if (solidPieceId) { // solids might meld with above and below


            if (isSolidAbove) {
              isCap = false // we are not a cap if there is a solid above us
              if (isSolidUnderneath) {
                // edit above hex(es) to now have same baseHexID as below us
                baseHexID = hexUnderneath.baseHexID
                for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - tile.posZ); i++) {
                  const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: tile.posZ + i })
                  if (boardHexes[nextID]) {
                    boardHexes[nextID].baseHexID = baseHexID
                    if (boardHexes[nextID].isCap) {
                      break // reached the cap, we can stop
                    }
                  }
                }
              } else {
                // edit above hex(es) to now have THIS hex as their baseHexID
                baseHexID = newHexID
                for (let i = 1; i <= (HEXGRID_MAX_ALTITUDE - tile.posZ); i++) {
                  // in this case, edit hex above and every hex above it with the same baseHexID to now have
                  // the same baseHexID as the hexUnderneath
                  const nextID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: tile.posZ + i })
                  if (boardHexes[nextID]) {
                    boardHexes[nextID].baseHexID = baseHexID
                    if (boardHexes[nextID].isCap) {
                      // reached the cap, we can stop
                      break
                    }
                  }
                }

              }
            }
          }
          if (isSolidUnderneath) { // solids and fluids can replace the cap below
            // remove old cap
            boardHexes[hexUnderneath.id].isCap = false
            // copy old cap baseHexID, we are building off of it
            baseHexID = boardHexes[hexUnderneath.id].baseHexID
          }
          boardHexes[newHexID] = {
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
    }

    return boardHexes
  }, {})
}


