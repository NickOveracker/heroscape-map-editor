import { clone } from 'lodash'
import {
  VirtualScapeTile,
  BoardHexes,
  Piece,
  CubeCoordinate,
  MapState,
  HexTerrain,
  Pieces,
  BoardPieces,
  HexMap,
} from '../types'
import {
  isFluidTerrainHex,
  isObstaclePieceID,
  isVerticallyObstructiveTerrain,
  isSolidTerrainHex,
} from '../utils/board-utils'
import { hexUtilsOddRToCube } from '../utils/hex-utils'
import { genBoardHexID, genPieceID } from '../utils/map-utils'
import getPieceTemplateCoords from './rotationTransforms'
import { makeHexagonScenario, makeRectangleScenario } from '../utils/map-gen'
import { pieceCodes } from './pieceCodes'
import { piecesSoFar } from './pieces'
import {
  interiorHexTemplates,
  verticalObstructionTemplates,
  verticalSupportTemplates,
} from './ruins-templates'

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

type PieceAddArgs = {
  piece: Piece
  boardHexes: BoardHexes
  boardPieces: BoardPieces
  cubeCoords: CubeCoordinate
  placementAltitude: number
  rotation: number
  isVsTile: boolean
  laurSide?: string
}
type PieceAddReturn = { newBoardHexes: BoardHexes; newBoardPieces: BoardPieces }

const pillarSideRotations = {
  plusX: 0,
  minusY: 1.5, // 7 is south,down,+r
  minusX: 3,
  plusY: 4.5, // 10 is north,up,-r
}

export function getBoardHexesWithPieceAdded({
  piece,
  boardHexes,
  boardPieces,
  cubeCoords,
  placementAltitude,
  rotation,
  laurSide,
  isVsTile,
}: PieceAddArgs): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const newBoardPieces = clone(boardPieces)
  const piecePlaneCoords = getPieceTemplateCoords({
    clickedHex: { q: cubeCoords.q, r: cubeCoords.r, s: cubeCoords.s },
    rotation,
    template: piece.template,
    isVsTile,
  })
  const clickedHexIDOrTileCoordsPresumedID = genBoardHexID({ ...(isVsTile ? piecePlaneCoords[0] : cubeCoords), altitude: placementAltitude })
  const pieceID = genPieceID(clickedHexIDOrTileCoordsPresumedID, piece.id, rotation)
  const genIds = (altitude: number) => {
    return piecePlaneCoords.map((cubeCoord) =>
      genBoardHexID({ ...cubeCoord, altitude: altitude }),
    )
  }
  const newPieceAltitude = placementAltitude + 1
  const underHexIds = genIds(placementAltitude)
  const newHexIds = genIds(newPieceAltitude)
  const overHexIds = genIds(newPieceAltitude + 1)
  const isSolidTile = isSolidTerrainHex(piece.terrain)
  const isFluidTile = isFluidTerrainHex(piece.terrain)
  const isCastleWallPiece = piece.id.includes('castleWall')
  const isCastleArchPiece =
    piece.id === Pieces.castleArch ||
    piece.id === Pieces.castleArchNoDoor
  // Validate
  const isPlacingOnTable = underHexIds.every(
    (id) => (newBoardHexes?.[id]?.terrain ?? '') === HexTerrain.empty,
  )
  const isSpaceFree = newHexIds.every((id) => !newBoardHexes[id])
  const isSolidUnderAtLeastOne = underHexIds.some((id) =>
    isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''),
  )
  const isSolidUnderAll = underHexIds.every((id) =>
    isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''),
  )
  const isEmptyUnderAll = underHexIds.every(
    (id) => (newBoardHexes?.[id]?.terrain ?? '') === HexTerrain.empty,
  )
  const isVerticalClearanceForPiece = newHexIds.every((_, i) => {
    const clearanceHexIds = Array(verticalObstructionTemplates?.[piece.id]?.[i] ?? piece.height)
      .fill(0)
      .map((_, j) => {
        const altitude = newPieceAltitude + 1 + j
        return genBoardHexID({ ...piecePlaneCoords[i], altitude })
      })
    return clearanceHexIds.every((clearanceHexId) => {
      const hex = newBoardHexes?.[clearanceHexId]
      if (!hex) return true // if no boardHex is written, then it is definitely empty
      const terrain = hex?.terrain
      const isBlocked =
        isSolidTerrainHex(terrain) ||
        isFluidTerrainHex(terrain) ||
        isVerticallyObstructiveTerrain(terrain)
      return !isBlocked
    })
  })
  const isCastleWallUnder = underHexIds.some(
    (id) => newBoardHexes?.[id]?.terrain === HexTerrain.castle,
  )
  const isPlacingWallWalkOnWall =
    piece.terrain === HexTerrain.wallWalk && isSpaceFree && isCastleWallUnder

  // LAUR WALL
  if (piece.terrain === HexTerrain.laurWall &&
    piece.id !== Pieces.laurWallPillar) {
    const isLaurWallRuin = piece.id !== Pieces.laurWallRuin
    const isLaurWallShort = piece.id !== Pieces.laurWallShort
    const isLaurWallLong = piece.id !== Pieces.laurWallLong
    const isLaurPillarUnder = underHexIds.some(
      (id) => newBoardHexes?.[id]?.terrain === HexTerrain.laurWall,
    )
    const isSlotOnWall = underHexIds.every((id) => {
      return !(newBoardHexes?.[id]?.laurAddons?.[(laurSide ?? '')])
    })
    const isPlacingLaurAddon = isLaurPillarUnder && isSlotOnWall && isVerticalClearanceForPiece
    const isWallNeedPillarToo = underHexIds.every((id) => {
      const buddyHex = '' // pillar? 
      return !(newBoardHexes?.[id]?.laurAddons?.[(laurSide ?? '')])
    })
    if (isPlacingLaurAddon) {

      // TODO: WRITE NEW PILLAR IF THERE IS ONE
      // write the new laur addon piece
      // newBoardPieces[pieceID] = piece.id
    }
  }

  // CASTLE BASE
  if (piece.id.includes('castleBase')) {
    const isCastleBaseSupported = isPlacingOnTable || isSolidUnderAtLeastOne // castle bases are all 1-hex, currently
    const isPlacingCastleBase = isSpaceFree && isCastleBaseSupported
    if (isPlacingCastleBase) {
      newHexIds.forEach((newHexID, i) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[i]]
        const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
        if (isSolidUnderneath || isPlacingOnTable) {
          // covers up the cap below
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
        }
      })
      // write the new piece
      newBoardPieces[pieceID] = piece.id
    }
  }
  // CASTLE WALL / ARCH
  if (isCastleWallPiece || isCastleArchPiece) {
    const isCastleUnderAll = underHexIds.every(
      (id) =>
        newBoardHexes?.[id]?.pieceID.includes('castleBase') ||
        newBoardHexes?.[id]?.pieceID.includes('castleWall') ||
        newBoardHexes?.[id]?.pieceID.includes('castleArch'),
    )
    const isCastleWallSupported =
      isSolidUnderAll || isEmptyUnderAll || isCastleUnderAll
    const isSolidUnder2OuterHexes = underHexIds.every((id, i) =>
      i === 1 ? true : isSolidTerrainHex(newBoardHexes?.[id]?.terrain ?? ''),
      // i=0, i=2, those are the 2 "outer" hexes of the 3-hex arch
    )
    const isCastleArchSupported = isSolidUnder2OuterHexes || isEmptyUnderAll
    const isPlacingWallArch =
      ((isCastleArchPiece && isCastleArchSupported) ||
        (isCastleWallPiece && isCastleWallSupported)) &&
      isSpaceFree &&
      isVerticalClearanceForPiece
    if (isPlacingWallArch) {
      newHexIds.forEach((newHexID, i) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[i]]
        const isHexUnderneathCastleBase =
          hexUnderneath?.pieceID.includes('castleBase')
        const wallAltitude = isHexUnderneathCastleBase
          ? placementAltitude
          : newPieceAltitude
        const castleWallHeight =
          piece.height -
          (isHexUnderneathCastleBase || isSolidUnderAll || isEmptyUnderAll
            ? 0
            : 1)
        if (isHexUnderneathCastleBase) {
          /* 
           A naked castle-base (which is rare and weird) is a piece we track.
           But once a wall is placed on the base, we only track the wall piece, and overwrite the base piece.
           */
          newBoardHexes[hexUnderneath.id] = {
            id: hexUnderneath.id,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: wallAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
            isObstacleOrigin: i === 0 ? true : false, // first hex marks the wall/arch model
            isObstacleAuxiliary: i !== 0 ? true : false, // arches have 2 aux hexes that render only an under-hex-cap
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
            isObstacleOrigin: i === 0 ? true : false, // The first boardHex is marked to render the obstacle model
            isObstacleAuxiliary: i !== 0 ? true : false,
            castleWallHeight: castleWallHeight,
          }
        }

        // vertical clearances will be adjusted to start lower if placing on a base
        Array(castleWallHeight)
          .fill(0)
          .forEach((_, j) => {
            const clearanceHexAltitude = wallAltitude + 1 + j
            const clearanceID = genBoardHexID({
              ...piecePlaneCoords[i],
              altitude: clearanceHexAltitude,
            })
            newBoardHexes[clearanceID] = {
              id: clearanceID,
              q: piecePlaneCoords[i].q,
              r: piecePlaneCoords[i].r,
              s: piecePlaneCoords[i].s,
              altitude: clearanceHexAltitude,
              terrain: piece.terrain,
              pieceID,
              pieceRotation: rotation,
            }
          })
      })
      // write the new piece
      newBoardPieces[pieceID] = piece.id
    }
  }

  // Castle Wallwalk
  if (isPlacingWallWalkOnWall) {
    newHexIds.forEach((newHexID, iForEach) => {
      const hexAbove = newBoardHexes?.[overHexIds[iForEach]]
      const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
      newBoardHexes[newHexID] = {
        id: newHexID,
        q: piecePlaneCoords[iForEach].q,
        r: piecePlaneCoords[iForEach].r,
        s: piecePlaneCoords[iForEach].s,
        altitude: newPieceAltitude,
        terrain: piece.terrain,
        pieceID,
        pieceRotation: rotation,
        isCap: !isSolidAbove,
      }
    })
    // write the new piece
    newBoardPieces[pieceID] = piece.id
  }

  const isPlacingLandTile =
    (isFluidTerrainHex(piece.terrain) || isSolidTerrainHex(piece.terrain)) &&
    !isPlacingWallWalkOnWall

  // LAND
  if (isPlacingLandTile) {
    // castle-wallwalk placed here as normal land
    const isLandPieceSupported =
      isPlacingOnTable ||
      (isSolidTile && isSolidUnderAtLeastOne) ||
      (isFluidTile && isSolidUnderAll)
    if (isSpaceFree && isLandPieceSupported) {
      newHexIds.forEach((newHexID, iForEach) => {
        const hexUnderneath = newBoardHexes?.[underHexIds[iForEach]]
        const hexAbove = newBoardHexes?.[overHexIds[iForEach]]
        const isSolidAbove = isSolidTerrainHex(hexAbove?.terrain)
        const isSolidUnderneath = isSolidTerrainHex(hexUnderneath?.terrain)
        if (isSolidUnderneath || isPlacingOnTable) {
          // solids and fluids can replace the cap below
          // remove cap beneath this land hex
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
          isCap: !isSolidAbove, // not a cap if solid hex directly above
        }
      })
      // write the new piece
      newBoardPieces[pieceID] = piece.id
    }
  }

  const isObstaclePieceSupported = isSolidUnderAll || isPlacingOnTable
  const isPlacingObstacle =
    isObstaclePieceID(piece.id) &&
    isSpaceFree &&
    isVerticalClearanceForPiece &&
    isObstaclePieceSupported

  // OBSTACLES: (+laurPillar)
  if (isPlacingObstacle) {
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
        isObstacleOrigin: i === 0 ? true : false, //only the first hex is an origin (because we made the template arrays this way. with origin hex at index 0)
        isObstacleAuxiliary: i !== 0 ? true : false, // big tree, glaciers/outcrops, have aux hexes that render only a cap
      }
      // write in the new vertical clearances, this will block some pieces at these coordinates
      Array(piece.height)
        .fill(0)
        .forEach((_, j) => {
          const clearanceHexAltitude = newPieceAltitude + 1 + j
          const clearanceID = genBoardHexID({
            ...piecePlaneCoords[i],
            altitude: clearanceHexAltitude,
          })
          newBoardHexes[clearanceID] = {
            id: clearanceID,
            q: piecePlaneCoords[i].q,
            r: piecePlaneCoords[i].r,
            s: piecePlaneCoords[i].s,
            altitude: clearanceHexAltitude,
            terrain: piece.terrain,
            pieceID,
            pieceRotation: rotation,
          }
        })
    })

    //TODO: write the fluid base for glaciers/outcrops/hive
    // write the new piece
    newBoardPieces[pieceID] = piece.id
  }

  // RUINS
  if (piece.terrain === HexTerrain.ruin) {
    const isSolidUnderAllSupportHexes = underHexIds.every((_, i) => {
      // Ruins only need to be supported under their center of mass, and we could be more liberal than this (allowing combinations of certain hexes)
      const isRequiredToSupportThisOne =
        verticalSupportTemplates?.[piece.id]?.[i]
      const altitude = placementAltitude
      genBoardHexID({ ...piecePlaneCoords[i], altitude })
      return isRequiredToSupportThisOne
        ? isSolidTerrainHex(newBoardHexes?.[underHexIds[i]]?.terrain)
        : true
    })
    const isSpaceFreeForRuin = newHexIds.every((newID, i) => {
      // Ruins, and LaurAddons, only block at certain angles per rotation, unlike obstacles that block everything 
      // Here is where we calculate our Ruin we are placing versus the ruin on the hex, can they co-exist?
      const hex = newBoardHexes?.[newID]
      if (!hex) return true
      const terrain = hex?.terrain
      const isForNewInterior = interiorHexTemplates?.[piece.id]?.[i] > 0 // origin & aux hexes
      const isBlocked =
        isSolidTerrainHex(terrain) ||
        isFluidTerrainHex(terrain) ||
        isVerticallyObstructiveTerrain(terrain) ||
        (isForNewInterior && hex.isObstacleOrigin) ||
        (isForNewInterior && hex.isObstacleAuxiliary)
      return !isBlocked
    })

    const isPlacingRuin =
      isSpaceFreeForRuin &&
      isSolidUnderAllSupportHexes &&
      isVerticalClearanceForPiece
    if (isPlacingRuin) {
      newHexIds.forEach((newHexID, i) => {
        const isObstacleAuxiliary =
          interiorHexTemplates[piece.id][i] === 1 // 1 marks auxiliary hexes, 2 marks the origin, in these template arrays
        const isPieceOrigin = i === 0 // hacking off the template order, should be 0 but we shift the template for ruins, (because then the wallWalk template handily matches the vertical clearance of a ruin)
        // write in vertical clearances for all the hexes a ruin borders
        Array(verticalObstructionTemplates[piece.id][i])
          .fill(0)
          .forEach((_, j) => {
            const clearanceHexAltitude = newPieceAltitude + j
            const clearanceID = genBoardHexID({
              ...piecePlaneCoords[i],
              altitude: clearanceHexAltitude,
            })
            newBoardHexes[clearanceID] = {
              id: clearanceID,
              q: piecePlaneCoords[i].q,
              r: piecePlaneCoords[i].r,
              s: piecePlaneCoords[i].s,
              altitude: clearanceHexAltitude,
              terrain: piece.terrain,
              pieceID,
              pieceRotation: rotation,
            }
          })

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
          }
        }
        if (isObstacleAuxiliary) {
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
            isObstacleAuxiliary: true,
          }
        }
      })
      // write the new piece
      newBoardPieces[pieceID] = piece.id
    }
  }
  return { newBoardHexes, newBoardPieces }
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
