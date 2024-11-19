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
    /* LAND FIRST */
    const solidPieceId = solidLandCodes[tile.type]
    if (solidPieceId) {
      const piece = landPieces[solidPieceId]
      const piecePlaneCoords = getVSTileTemplate({
        clickedHex: { q: tileCoords.q, r: tileCoords.r, s: tileCoords.s },
        rotation: tile.rotation,
        template: piece.template,
      })
      const newHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: tile.posZ + 1 })))
      const underHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: tile.posZ })))
      const overHexIds = piecePlaneCoords.map((cubeCoord) => (genBoardHexID({ ...cubeCoord, altitude: tile.posZ + 2 })))

      const isPlacingOnTable = tile.posZ === 0
      const isSpaceFree = newHexIds.every(id => !boardHexes[id])
      const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(boardHexes?.[id]?.terrain ?? ''))
      const isPieceSupported = isPlacingOnTable || isSolidUnderAtLeastOne
      if (isSpaceFree && isPieceSupported) {
        newHexIds.forEach((id, iForEach) => {
          const hexUnderneath = boardHexes?.[underHexIds[iForEach]]
          const hexAbove = boardHexes?.[overHexIds[iForEach]]
          const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
          const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
          let baseHexID = ''
          let isCap = true
          if (isSolidAbove) {
            isCap = false
            if (isSolidUnderneath) {
              baseHexID = hexUnderneath.baseHexID
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
            } else {
              // edit hex above and every hex above it with same baseHexID to now have THIS hex as their baseHexID
              baseHexID = id
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
          if (isSolidUnderneath) {
            // edit old boardHex,
            boardHexes[hexUnderneath.id].isCap = false
            baseHexID = boardHexes[hexUnderneath.id].baseHexID
          }
          boardHexes[id] = {
            id,
            q: piecePlaneCoords[iForEach].q,
            r: piecePlaneCoords[iForEach].r,
            s: piecePlaneCoords[iForEach].s,
            altitude: tile.posZ,
            terrain: piece.terrain,
            pieceID: genPieceID(id, piece.id),
            isCap,
            baseHexID
          }
        })
      }
    }

    return boardHexes
  }, {})
}


