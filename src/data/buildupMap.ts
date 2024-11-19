import { VirtualScapeTile, BoardHexes, } from '../types'
import { isSolidTerrainHex } from '../utils/board-utils';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import { fluidLandCodes, solidLandCodes } from './pieceCodes';
import { landPieces } from './pieces';
import getVSTileTemplate from './rotationTransforms';

export default function buildupMap(tiles: VirtualScapeTile[]): BoardHexes {
  return tiles.reduce((boardHexes, tile) => {
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
      const [newHexIds, underHexIds] = piecePlaneCoords.map((cubeCoord) => (
        [
          genBoardHexID({ ...cubeCoord, altitude: tile.posZ + 1 }),
          genBoardHexID({ ...cubeCoord, altitude: tile.posZ })]
      ))
      const isSpaceFree = newHexIds.every(id => !boardHexes[id])
      const isPlacingOnTable = tile.posZ === 0
      const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(boardHexes?.[id]?.terrain ?? ''))
      const isSupported = isPlacingOnTable || isSolidUnderAtLeastOne
      if (isSpaceFree && isSupported) {
        newHexIds.forEach(id => {
          boardHexes[id] = {
            id,
            altitude: tile.posZ,
            terrain: piece.terrain,
            pieceID: genPieceID(id, piece.id),
          }
        })
      }
      // 1. Check if all those coords are empty (if not, and it's a saved file, that's a whole different problem)
      // 2. Place the tile, we will leave
    }

    const fluidPieceId = fluidLandCodes[tile.type]
    if (fluidPieceId) {
    }
    return boardHexes
  }, {})
}


