import { clone } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, CubeCoordinate, MapState, HexTerrain, } from '../types'
import { isFluidTerrainHex, isObstacleTerrain, isSolidTerrainHex } from '../utils/board-utils';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import getVSTileTemplate from './rotationTransforms';
import { makeRectangleScenario } from '../utils/map-gen';
import { pieceCodes } from './pieceCodes';
import { piecesSoFar } from './pieces';
import { interiorHexTemplates, verticalObstructionTemplates, verticalSupportTemplates } from './tileTemplates';


export default function buildupVSFileMap(tiles: VirtualScapeTile[], fileName: string): MapState {
  const {
    boardHexes,
    boardPieces,
    hexMap
  } = getBlankHexoscapeMapForVSTiles(tiles, fileName)

  const newBoardHexes = tiles.reduce((boardHexes: BoardHexes, tile) => {
    const tileCoords = hexUtilsOddRToCube(tile.posX, tile.posY)
    const inventoryID = pieceCodes?.[tile.type] ?? ''
    const piece = piecesSoFar[inventoryID]
    if (piece) {
      // get the new board hexes and new board pieces
      const { newBoardHexes, newPieceID } = getBoardHexesWithPieceAdded({
        piece,
        boardHexes,
        cubeCoords: tileCoords,
        placementAltitude: tile.posZ, // z is altitude is virtualscape, y is altitude in our app
        rotation: tile.rotation,
        isVsTile: true
      })
      // mark every new piece on the board
      boardPieces[newPieceID] = piece.inventoryID
      return newBoardHexes
    } else {
      return boardHexes // Should probably handle this different, errors etc.
    }
  }, boardHexes)

  return {
    boardHexes: newBoardHexes,
    hexMap: hexMap,
    boardPieces: boardPieces,
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
    rotation,
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
    // in this part, if wallWalk tiles are not placed on castle pieces, they will be in a future part
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
          pieceRotation: rotation,
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
      return clearanceHexIds.every(clearanceHexId => {
        const hex = newBoardHexes?.[clearanceHexId]
        if (!hex) return true
        const terrain = hex?.terrain
        const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstacleTerrain(terrain)
        return !isBlocked;
      });
    });
    if (isSpaceFree && isVerticalClearanceForObstacle && isObstaclePieceSupported) {
      newHexIds.forEach((newHexID, i) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[i]]
        // remove caps covered by this obstacle
        newBoardHexes[hexUnderneath.id].isCap = false
        // write in the new hex
        newBoardHexes[newHexID] = {
          id: newHexID,
          q: piecePlaneCoords[i].q,
          r: piecePlaneCoords[i].r,
          s: piecePlaneCoords[i].s,
          altitude: newPieceAltitude,
          terrain: piece.terrain,
          pieceID,
          pieceRotation: rotation,
          isCap,
          isObstacleOrigin: i === 0 ? true : false, //only the first hex is an origin (because we made the template arrays this way. with origin hex at index 0)
          isAuxiliary: i !== 0 ? true : false,
          obstacleHeight: piece.height
        }
        // write in the new clearances, this will block some pieces at these coordinates
        Array(piece.height).fill(0).forEach((_, j) => {
          const clearanceHexAltitude = newPieceAltitude + 1 + j;
          const clearanceID = genBoardHexID({ ...piecePlaneCoords[i], altitude: clearanceHexAltitude });
          newBoardHexes[clearanceID] = {
            id: clearanceID,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: clearanceHexAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isCap,
          }
        });
      })
    }
  }

  if (piece.terrain === HexTerrain.ruin) {
    /* 
    an edge type piece
    it is a plane the will be position perpindicular to the X,Z plane, and its seven points will be the corners of the hexes
    The tiles blocked from further building for a ruin is actually a large footprint of all adjacent tiles
    */
    const isSolidUnderAllSupportHexes = underHexIds.every((_, i) => {
      // Ruins only need to be supported under their center of mass, and we could be more liberal than this (allowing combinations of certain hexes)
      const isRequiredToSupportThisOne = verticalSupportTemplates[piece.inventoryID][i]
      const altitude = placementAltitude;
      genBoardHexID({ ...piecePlaneCoords[i], altitude });
      return isRequiredToSupportThisOne ? isSolidTerrainHex(newBoardHexes?.[underHexIds[i]]?.terrain) : true
    });

    const isVerticalClearanceForObstacle = newHexIds.every((_, i) => {
      // Ruins obstruct the placement of some land/obstacles
      const clearanceHexIds = Array(verticalObstructionTemplates[piece.inventoryID][i]).fill(0).map((_, j) => {
        const altitude = newPieceAltitude + j;
        return genBoardHexID({ ...piecePlaneCoords[i], altitude });
      });
      return clearanceHexIds.every(clearanceHexId => {
        const hex = newBoardHexes?.[clearanceHexId]
        if (!hex) return true
        const terrain = hex?.terrain
        const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstacleTerrain(terrain)
        return !isBlocked;
      });
    })
    const isSpaceFreeForRuin = newHexIds.every((newID, i) => {
      // While they block other pieces, Ruins are small enough to share a space with eachother but not land/obstacles
      const hex = newBoardHexes?.[newID]
      if (!hex) return true
      const terrain = hex?.terrain
      const isForNewInterior = interiorHexTemplates[piece.inventoryID][i] > 0
      const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstacleTerrain(terrain) || (isForNewInterior && hex.isObstacleOrigin) || (isForNewInterior && hex.isAuxiliary)
      return !isBlocked;
    })
    if (isSpaceFreeForRuin && isSolidUnderAllSupportHexes && isVerticalClearanceForObstacle) {
      newHexIds.forEach((newHexID, i) => {
        const isAuxiliary = interiorHexTemplates[piece.inventoryID][i] === 1 // 1 marks auxiliary hexes, 2 marks the origin, in these template arrays
        const isPieceOrigin = i === 1 // hacking off the template order, should be 0 but we shift the template for ruins, (because then the wallWalk template handily matches the vertical clearance of a ruin)
        // write in the new clearances, this will block some pieces at these coordinates
        Array(verticalObstructionTemplates[piece.inventoryID][i]).fill(0).forEach((_, j) => {
          const clearanceHexAltitude = newPieceAltitude + j; // this includes our newHexIDs, as well as upper hexes
          const clearanceID = genBoardHexID({ ...piecePlaneCoords[i], altitude: clearanceHexAltitude });
          if (!newBoardHexes[clearanceID]) {
            // we only write to the clearance hex if nothing is there already (we already check to make sure it was ok to place)
            newBoardHexes[clearanceID] = {
              id: clearanceID,
              q: piecePlaneCoords[i].q,
              r: piecePlaneCoords[i].r,
              s: piecePlaneCoords[i].s,
              altitude: clearanceHexAltitude,
              terrain: piece.terrain,
              pieceID,
              pieceRotation: rotation,
              isCap: false,
            }
          }
        });

        // write in the new ruin hex only for one, the one that will get drawn, all the rest are simply marked as occupied
        if (isPieceOrigin) {
          newBoardHexes[newHexID] = {
            id: newHexID,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: newPieceAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isObstacleOrigin: true,
            isAuxiliary: false,
            obstacleHeight: piece.height, // unsure if this will be right, it has one height for in-game, but separate heights for physical piece allowance
            isCap: false,
          }
        }
        if (isAuxiliary) {
          newBoardHexes[newHexID] = {
            id: newHexID,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: newPieceAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isObstacleOrigin: false,
            isAuxiliary: true,
            obstacleHeight: piece.height, // unsure if this will be right, it has one height for in-game, but separate heights for physical piece allowance
            isCap: false,
          }
        }
      })
    }
  }
  return { newBoardHexes, newPieceID: pieceID }
}
type PieceAddReturn = { newBoardHexes: BoardHexes, newPieceID: string }

function getBlankHexoscapeMapForVSTiles(tiles: VirtualScapeTile[], fileName: string): MapState {
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

  return makeRectangleScenario({
    mapLength,
    mapWidth,
    mapName: `VirtualScapeMap: ${fileName}`,
    mapShape: 'rectangle'
  })
}



