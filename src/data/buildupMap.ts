import { clone } from 'lodash';
import { VirtualScapeTile, BoardHexes, Piece, CubeCoordinate, MapState, HexTerrain, Pieces, BoardPieces, } from '../types'
import { isFluidTerrainHex, isObstaclePieceID, isObstructingTerrain, isSolidTerrainHex } from '../utils/board-utils';
import { hexUtilsOddRToCube } from '../utils/hex-utils';
import { genBoardHexID, genPieceID } from '../utils/map-utils';
import getVSTileTemplate from './rotationTransforms';
import { makeRectangleScenario } from '../utils/map-gen';
import { pieceCodes } from './pieceCodes';
import { piecesSoFar } from './pieces';
import { interiorHexTemplates, verticalObstructionTemplates, verticalSupportTemplates } from './ruins-templates';


export default function buildupVSFileMap(tiles: VirtualScapeTile[], fileName: string): MapState {
  const blankMap = getBlankHexoscapeMapForVSTiles(tiles, fileName)
  let {
    boardPieces,
  } = blankMap
  const {
    boardHexes,
    // boardPieces,
    hexMap
  } = blankMap
  const terrainTilesOnly = tiles.filter(t => t.type !== 15001)
  // const startZoneTiles = tiles.filter(t => t.type === 15001)
  const newBoardHexes = terrainTilesOnly.reduce((boardHexes: BoardHexes, tile) => {
    const tileCoords = hexUtilsOddRToCube(tile.posX, tile.posY)
    const inventoryID = pieceCodes?.[tile.type] ?? ''
    const piece = piecesSoFar[inventoryID]
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
      isVsTile: true
    })
    // mark every new piece on the board
    boardPieces = newBoardPieces
    return newBoardHexes
  }, boardHexes)

  return {
    boardHexes: newBoardHexes,
    hexMap: hexMap,
    boardPieces,
    glyphs: {},
    startZones: {}
  }
}

type PieceAddArgs = {
  piece: Piece,
  boardHexes: BoardHexes,
  boardPieces: BoardPieces,
  cubeCoords: CubeCoordinate,
  placementAltitude: number
  rotation: number
  isVsTile: boolean
}
export function getBoardHexesWithPieceAdded({
  piece,
  boardHexes,
  boardPieces,
  cubeCoords,
  placementAltitude,
  rotation,
  isVsTile
}: PieceAddArgs): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const newBoardPieces = clone(boardPieces)
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
  const isSolidUnderAtLeastOne = underHexIds.some(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''))
  const isSolidUnderAll = underHexIds.every(id => isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''))
  const isVerticalClearanceForObstacle = newHexIds.every((_, i) => {
    const clearanceHexIds = Array(piece.height).fill(0).map((_, j) => {
      const altitude = newPieceAltitude + 1 + j;
      return genBoardHexID({ ...piecePlaneCoords[i], altitude });
    });
    return clearanceHexIds.every(clearanceHexId => {
      const hex = newBoardHexes?.[clearanceHexId]
      if (!hex) return true
      const terrain = hex?.terrain
      const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstructingTerrain(terrain)
      return !isBlocked;
    });
  });
  // 3. PLACE THE PIECE
  // CASTLE FIRST!
  const isCastleWallUnder = underHexIds.some(id => newBoardHexes?.[id]?.terrain === HexTerrain.castle)
  if (piece.terrain === HexTerrain.castle) {
    const isCastleBaseSupported = isPlacingOnTable || isSolidUnderAtLeastOne // only works because all castle bases are 1-hex currently
    const isCorrespondingBaseOrWallUnderAll = underHexIds.every(id => newBoardHexes?.[id]?.pieceID.includes((piece?.buddyID ?? '')) || newBoardHexes?.[id]?.pieceID.includes(('castleWall')) || newBoardHexes?.[id]?.pieceID.includes(('castleWall')))
    const isCastleWallSupported = isSolidUnderAll || isCorrespondingBaseOrWallUnderAll
    const isSolidUnder2OuterHexes = underHexIds.every((id, i) => i === 1 ? true : isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? '')) // i=0, i=2, those are the 2 "outer" hexes of the 3-hex arch
    const isCastleArchSupported = isSolidUnder2OuterHexes
    const isCastleBasePiece = piece.inventoryID === Pieces.castleBaseEnd || piece.inventoryID === Pieces.castleBaseStraight || piece.inventoryID === Pieces.castleBaseCorner
    const isCastleWallPiece = piece.inventoryID === Pieces.castleWallEnd || piece.inventoryID === Pieces.castleWallStraight || piece.inventoryID === Pieces.castleWallCorner
    const isCastleArchPiece = piece.inventoryID === Pieces.castleArch || piece.inventoryID === Pieces.castleArchNoDoor
    // CASTLE BASE
    if (isCastleBasePiece && isSpaceFree && isCastleBaseSupported) {
      newHexIds.forEach((newHexID, i) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[i]]
        const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
        if (isSolidUnderneath || isPlacingOnTable) { // covers up the cap below
          // remove old cap
          newBoardHexes[hexUnderneath.id].isCap = false
        }
        newBoardHexes[newHexID] = {
          id: newHexID,
          q: piecePlaneCoords[i].q,
          r: piecePlaneCoords[i].r,
          s: piecePlaneCoords[i].s,
          altitude: newPieceAltitude,
          terrain: piece.terrain,
          pieceID,
          pieceRotation: rotation,
          isCap: false,
          isCastleBase: true
        }
      })
    }
    // CASTLE WALL / ARCH
    const canPlaceArch = isCastleArchPiece && isCastleArchSupported
    const canPlaceWall = isCastleWallPiece && isCastleWallSupported
    if ((canPlaceArch || canPlaceWall) && isSpaceFree && isVerticalClearanceForObstacle) {
      newHexIds.forEach((newHexID, i) => {
        /* 
        PREFACE: Virtualscape has castle bases and castle walls. It represents both of them, congruent with 
        physical Heroscape fortress bases and walls. You CAN use the bases without the walls, like
        as a support for other tiles and thus extend your usable terrain. But it's kind of rare. 
        Hexoscape, our app, will represent either a base, or a wall. So you can have just a base, or, if there
        is a wall on that base, we just put a wall at the base's boardHex and erase the base.
        */


        // So, we are going to write in 10 hexes of wall:
        // Start at the hex below (we clicked a castle base, and it is getting overwritten/incorporated)
        // OR
        // Start at the current hex (we clicked a land hex, and we are skipping the castle-base and going straight to a wall)
        const hexUnderneath = newBoardHexes?.[underHexIds[i]]
        const isHexUnderneathCastleBase = hexUnderneath?.isCastleBase
        const wallAltitude = isHexUnderneathCastleBase ? placementAltitude : newPieceAltitude
        const heightToUse = piece.height - (isHexUnderneathCastleBase || isSolidUnderAll ? 0 : 1)
        const pieceInventoryIDOfBase = isHexUnderneathCastleBase ? '' : piece.buddyID // if there is no base present we add one
        if (pieceInventoryIDOfBase) {
          // we are being crazy re-using clickedHexIDOrTileCoordsPresumedID here: VStiles will have a base and a wall one altitude above. We have auto-base and wall pieces at the same spot, could cause trouble later
          const basePieceID = genPieceID(clickedHexIDOrTileCoordsPresumedID, pieceInventoryIDOfBase)
          newBoardPieces[basePieceID] = pieceInventoryIDOfBase as Pieces
        }
        if (isHexUnderneathCastleBase) {
          newBoardHexes[hexUnderneath.id] = {
            id: hexUnderneath.id,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: wallAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isCap: false,
            isObstacleOrigin: i === 0 ? true : false, //only the first hex is an origin (because we made the template arrays this way. with origin hex at index 0)
            isAuxiliary: i !== 0 ? true : false,
            obstacleHeight: heightToUse
          }
        } else {
          // remove the cap from land hex below
          newBoardHexes[hexUnderneath.id].isCap = false
          newBoardHexes[newHexID] = {
            id: newHexID,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: wallAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isCap: false,
            isObstacleOrigin: i === 0 ? true : false, //only the first hex is an origin (because we made the template arrays this way. with origin hex at index 0)
            isAuxiliary: i !== 0 ? true : false,
            obstacleHeight: heightToUse
          }

        }

        // write in the new clearances, this will block some pieces at these coordinates
        Array(heightToUse).fill(0).forEach((_, j) => {
          const clearanceHexAltitude = wallAltitude + 1 + j;
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
            isCap: false,
          }
        });
      })
    }
  }

  if (piece.terrain === HexTerrain.wallWalk) {
    // we can put this on castle walls, or we can put it like regular road, below

    if (isSpaceFree && isCastleWallUnder) {
      newHexIds.forEach((newHexID, iForEach) => {
        const hexAbove = newBoardHexes?.[overHexIds[iForEach]]
        const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
        let isCap = true
        if (isSolidAbove) {
          isCap = false // we are not a cap if there is a solid above our solid
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

  // LAND: SOLID AND FLUID
  if (piece.isLand) {
    // in this part, if wallWalk tiles were not placed on castle pieces, they are now placed like regular road tiles
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

  // Trees, Jungle, Glaciers, Outcrops
  if (isObstaclePieceID(piece.inventoryID)) {
    const isObstaclePieceSupported = isSolidUnderAll || isPlacingOnTable
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
          isCap: false,
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
            isCap: false,
          }
        });
      })
    }
  }

  /* 
  RUINS
  In Virtualscape, the ruins only take 2/3 hexes. No restrictions on putting land right next to them or through their airspace.
  Our app uses 7/9 hexes for each ruin's footprint, and implements vertical obstruction.
  */
  if (piece.terrain === HexTerrain.ruin) {
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
        const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstructingTerrain(terrain)
        return !isBlocked;
      });
    })
    const isSpaceFreeForRuin = newHexIds.every((newID, i) => {
      // While they block other pieces, Ruins are small enough to share a space with eachother but not land/obstacles
      const hex = newBoardHexes?.[newID]
      if (!hex) return true
      const terrain = hex?.terrain
      const isForNewInterior = interiorHexTemplates[piece.inventoryID][i] > 0
      const isBlocked = isSolidTerrainHex(terrain) || isFluidTerrainHex(terrain) || isObstructingTerrain(terrain) || (isForNewInterior && hex.isObstacleOrigin) || (isForNewInterior && hex.isAuxiliary)
      return !isBlocked;
    })
    // const isSpaceFreeForRuin = true // Virtualscape does not check for vertical clearance for ruins
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
  // write the new piece
  newBoardPieces[pieceID] = piece.inventoryID
  return { newBoardHexes, newBoardPieces }
}
type PieceAddReturn = { newBoardHexes: BoardHexes, newBoardPieces: BoardPieces }

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



