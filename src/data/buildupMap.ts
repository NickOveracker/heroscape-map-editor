import { clone } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, CubeCoordinate, MapState, HexTerrain, } from '../types'
import { isFluidTerrainHex, isSolidTerrainHex } from '../utils/board-utils';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import getVSTileTemplate from './rotationTransforms';
import { makeRectangleScenario } from '../utils/map-gen';
import { pieceCodes } from './pieceCodes';
import { piecesSoFar } from './pieces';

export default function buildupVSFileMap(tiles: VirtualScapeTile[], fileName: string): MapState {
  // cushions have to be an even number because of the coordinate system used in virtualscape
  const cushionToPadY = 8 // 24-hexer's max Y displacement in vscape
  const cushionToPadX = 6 // 24-hexer's max X displacement in vscape
  const xMin = Math.min(...tiles.map(t => t.posX - cushionToPadX))
  const yMin = Math.min(...tiles.map(t => t.posY - cushionToPadY))
  // remove as many empty hexes as possible from the empty grid we are going to generate
  const xIncrementsWorthEmpty = Math.floor(xMin / 2)
  const yIncrementsWorthEmpty = Math.floor(yMin / 2)
  // MUTATE TILES TO MAKE MAP SMALL AS POSSIBLE
  if (xIncrementsWorthEmpty > 0) {
    tiles.forEach(t => {
      t.posX -= xIncrementsWorthEmpty * 2;
    })
  }
  if (yIncrementsWorthEmpty > 0) {
    tiles.forEach(t => {
      t.posY -= yIncrementsWorthEmpty * 2;
    })
  }
  // these are the dimensions of the empty map to generate
  const mapLength = Math.max(...tiles.map(t => t.posX + cushionToPadX))
  const mapWidth = Math.max(...tiles.map(t => t.posY + cushionToPadY))

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
    const piece = piecesSoFar[inventoryID]
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
  const newBoardHexes = clone(boardHexes)
  const isSolidTile = isSolidTerrainHex(piece.terrain)
  const isFluidTile = isFluidTerrainHex(piece.terrain)
  // 1.1: GATHER DATA ON TILE
  const piecePlaneCoords = getVSTileTemplate({
    clickedHex: { q: cubeCoords.q, r: cubeCoords.r, s: cubeCoords.s },
    rotation: rotation,
    template: piece.template,
    isVsTile
  })
  const clickedHexIDOrTileCoordsPresumedID = genBoardHexID({ ...cubeCoords, altitude: placementAltitude })
  const pieceID = genPieceID(clickedHexIDOrTileCoordsPresumedID, piece.id)
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
  const isPlacingOnTable = placementAltitude === 0 && underHexIds.every(id => (newBoardHexes?.[id]?.terrain ?? '') === HexTerrain.empty)
  const isSpaceFree = newHexIds.every(id => !newBoardHexes[id])
  const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? '')) // fluids will need one under every hex (no multi hex fluids yet)
  const isSolidUnderAll = underHexIds.every(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''))
  // 3. PLACE THE PIECE
  if (piece.isLand) {
    const isLandPieceSupported = isPlacingOnTable || (isSolidTile && isSolidUnderAtLeastOne) || (isFluidTile && isSolidUnderAll)
    if (isSpaceFree && isLandPieceSupported) {
      newHexIds.forEach((newHexID, iForEach) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[iForEach]]
        const hexAbove = newBoardHexes?.[overHexIds[iForEach]]
        const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
        const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
        let isCap = true
        if (isSolidTile && isSolidAbove) {
          isCap = false // we are not a cap if there is a solid above our solid
        }
        if (isSolidUnderneath || isPlacingOnTable) { // solids and fluids can replace the cap below
          // remove old cap
          newBoardHexes[hexUnderneath.id].isCap = false
        }

        newBoardHexes[newHexID] = {
          id: newHexID,
          q: piecePlaneCoords[iForEach].q,
          r: piecePlaneCoords[iForEach].r,
          s: piecePlaneCoords[iForEach].s,
          altitude: newPieceAltitude,
          terrain: piece.terrain,
          pieceID,
          isCap,
        }
      })
    }
  }
  if (piece.isObstacle) {
    const isCap = false // obstacles are not caps
    const isObstaclePieceSupported = isSolidUnderAll || isPlacingOnTable
    const isVerticalClearanceForObstacle = newHexIds.every((_, i) => {
      const clearanceHexIds = Array(piece.height).fill(0).map((_, j) => {
        const altitude = newPieceAltitude + 1 + j;
        return genBoardHexID({ ...piecePlaneCoords[i], altitude });
      });
      return clearanceHexIds.every(clearanceHexId => !newBoardHexes[clearanceHexId]);
    });
    if (isSpaceFree && isVerticalClearanceForObstacle && isObstaclePieceSupported) {
      newHexIds.forEach((newHexID, iForEach) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[iForEach]]
        // remove caps covered by this obstacle
        newBoardHexes[hexUnderneath.id].isCap = false
        newBoardHexes[newHexID] = {
          id: newHexID,
          q: piecePlaneCoords[iForEach].q,
          r: piecePlaneCoords[iForEach].r,
          s: piecePlaneCoords[iForEach].s,
          altitude: newPieceAltitude,
          terrain: piece.terrain,
          pieceID,
          isCap,
          isObstacleOrigin: true,
          obstacleHeight: piece.height
        }
        Array(piece.height).fill(0).forEach((_, j) => {
          const clearanceHexAltitude = newPieceAltitude + 1 + j;
          const clearanceID = genBoardHexID({ ...piecePlaneCoords[iForEach], altitude: clearanceHexAltitude });
          newBoardHexes[clearanceID] = {
            id: clearanceID,
            q: piecePlaneCoords[iForEach].q,
            r: piecePlaneCoords[iForEach].r,
            s: piecePlaneCoords[iForEach].s,
            altitude: clearanceHexAltitude,
            terrain: piece.terrain,
            pieceID,
            isCap,
          }
        });
      })
    }
  }
  return { newBoardHexes, newPieceID: pieceID }
}
type PieceAddReturn = { newBoardHexes: BoardHexes, newPieceID: string }



