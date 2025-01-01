import { clone } from 'lodash'
import { BoardHexes, Pieces, BoardPieces, BoardHex } from '../types'
import {
  hexUtilsAdd,
  hexUtilsGetNeighborForRotation,
  hexUtilsGetRadialNearNeighborsForRotation,
} from '../utils/hex-utils'
import {
  genBoardHexID,
  genPieceID,
  pillarSideRotations,
} from '../utils/map-utils'
import {
  isFluidTerrainHex,
  isSolidTerrainHex,
} from '../utils/board-utils'
import { PieceAddArgs } from './addPiece'

type PieceAddReturn = { newBoardHexes: BoardHexes; newBoardPieces: BoardPieces }

const nearDirectionFlip: { [key: number]: number } = {
  0: 3,
  1: 4,
  2: 5,
  3: 0,
  4: 1,
  5: 2,
}

function getPillarReport({
  boardHexes,
  boardPieces,
  pillarHex
}: {
  boardHexes: BoardHexes
  boardPieces: BoardPieces
  pillarHex: BoardHex
}) {
  const wallBuddies = pillarSideRotations.map(r => {
    const actualRotation = pillarHex.pieceRotation + r
    // if(r === 1.5 || r === 4.5){
    //   getPill
    // }
    console.log("🚀 ~ actualRotation:", actualRotation)
  })
}

export function addLaurPiece({
  piece,
  boardHexes,
  boardPieces,
  pieceCoords,
  placementAltitude,
  rotation: addonRotation,
}: Omit<PieceAddArgs, 'isVsTile'>): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const newBoardPieces = clone(boardPieces)
  const hexID = genBoardHexID({ ...pieceCoords, altitude: placementAltitude })
  const isPillarOnHex = boardHexes[hexID]?.pieceID?.includes(
    Pieces.laurWallPillar,
  )
  if (!isPillarOnHex) {
    console.error(
      'Tried to place Laur Wall Addon where there is no Laur Wall Pillar!',
    )
    return { newBoardHexes, newBoardPieces }
  }
  const pillarRotation = boardHexes[hexID].pieceRotation
  const pieceID = genPieceID(hexID, piece.id, addonRotation)
  const rotDiff = addonRotation - pillarRotation
  const pillarSideRot = rotDiff > 0 ? rotDiff : rotDiff + 6 // 0, 1.5, 3, or 4.5
  // const pillarReport = pillarSideRotations.map
  // LAUR WALL
  const isLaurWallRuin = piece.id === Pieces.laurWallRuin
  const isLaurWallShort = piece.id === Pieces.laurWallShort
  // const isLaurWallLong = piece.id === Pieces.laurWallLong

  // LaurWallShort only ever attaches to the minusX/plusX sides. Long on minusY/plusY. Ruins can go on both.
  // const isLaurSideY = laurSide === 'minusY' || laurSide === 'plusY'
  const coordsObstructedByRuins = true
    ? hexUtilsGetRadialNearNeighborsForRotation(addonRotation)
    : [hexUtilsGetNeighborForRotation(addonRotation)]
  const piecePlaneCoords = coordsObstructedByRuins.map((coord) =>
    hexUtilsAdd(coord, pieceCoords),
  )
  // if (isLaurWallShort) {
  //   const buddyHexCoord = piecePlaneCoords[0]
  //   const buddyHexID = genBoardHexID({
  //     ...buddyHexCoord,
  //     altitude: placementAltitude,
  //   })
  //   const isPillarAtBuddy = boardHexes?.[buddyHexID]?.pieceID.includes(
  //     Pieces.laurWallPillar,
  //   )
  //   if (!isPillarAtBuddy) {
  //     // build the pillar if possible, and the shortwall
  //     const newBuddyPillarRotation = nearDirectionFlip[addonRotation]
  //     const {
  //       newBoardHexes: boardHexesWithNewPillar,
  //       newBoardPieces: boardPiecesWithNewPillar,
  //     } = addPiece({
  //       piece: piecesSoFar[Pieces.laurWallPillar],
  //       boardHexes: boardHexes,
  //       boardPieces: boardPieces,
  //       pieceCoords: buddyHexCoord,
  //       placementAltitude: placementAltitude - 1,
  //       rotation: newBuddyPillarRotation,
  //       isVsTile: false,
  //     })
  //     const isAPillarNow = boardHexesWithNewPillar?.[
  //       buddyHexID
  //     ]?.pieceID.includes(Pieces.laurWallPillar)
  //     if (isAPillarNow) {
  //       // write the short wall to the main pillar boardHex
  //       boardHexesWithNewPillar[hexID] = {
  //         ...boardHexesWithNewPillar[hexID],
  //         laurAddons: {
  //           ...boardHexesWithNewPillar[hexID].laurAddons,
  //           [laurSide]: {
  //             pieceID: piece.id,
  //             rotation: addonRotation,
  //             side: laurSide, // duplicate
  //           },
  //         },
  //       }
  //       // write shortwall to new buddy pillar
  //       boardHexesWithNewPillar[buddyHexID] = {
  //         ...boardHexesWithNewPillar[buddyHexID],
  //         laurAddons: {
  //           ...boardHexesWithNewPillar[buddyHexID].laurAddons,
  //           [laurSide]: {
  //             pieceID: piece.id,
  //             rotation: nearDirectionFlip[addonRotation],
  //             side: 'plusX', // Easiest, it's rotation is 0, just rotate the pillar
  //           },
  //         },
  //       }
  //       boardPiecesWithNewPillar[pieceID] = piece.id
  //       return {
  //         newBoardHexes: boardHexesWithNewPillar,
  //         newBoardPieces: boardPiecesWithNewPillar,
  //       }
  //     }
  //   }
  //   if (isPillarAtBuddy) {
  //     console.log(
  //       '🚀 ~ addonPillar addonRotation:',
  //       addonRotation,
  //       pillarRotation,
  //     )
  //     console.log(
  //       '🚀 ~ buddyHex rotation:',
  //       newBoardHexes?.[buddyHexID]?.pieceRotation,
  //     )
  //     // const isSlotOccupiedOnPillarBuddy = boardHexes?.[buddyHexID]?.laurAddons?.[laurSide]

  //     // write the shortwall to the main pillar boardHex
  //     newBoardHexes[hexID] = {
  //       ...newBoardHexes[hexID],
  //       laurAddons: {
  //         ...newBoardHexes[hexID].laurAddons,
  //         [laurSide]: {
  //           pieceID: piece.id,
  //           rotation: addonRotation,
  //           side: laurSide, // duplicate
  //           // linkID?: string // short/long walls connect to another pillar
  //         },
  //       },
  //     }
  //     // write the shortwall to the buddy pillar boardHex
  //     newBoardHexes[buddyHexID] = {
  //       ...newBoardHexes[hexID],
  //       laurAddons: {
  //         ...newBoardHexes[hexID].laurAddons,
  //         [laurSide]: {
  //           pieceID: piece.id,
  //           rotation: nearDirectionFlip[addonRotation],
  //           side:
  //             laurSide === 'minusY'
  //               ? 'plusY'
  //               : laurSide === 'plusY'
  //                 ? 'minusY'
  //                 : laurSide === 'minusX'
  //                   ? 'plusX'
  //                   : 'minusX', // duplicate
  //         },
  //       },
  //     }
  //     // write the shortwall piece
  //     newBoardPieces[pieceID] = piece.id
  //   }
  // }
  if (isLaurWallRuin) {
    const isVerticalClearanceForPiece = piecePlaneCoords.every((_, i) => {
      // const clearanceHexIds = Array(verticalObstructionTemplates?.[piece.id]?.[i] ?? piece.height)
      const clearanceHexIds = Array(piece.height)
        .fill(0)
        .map((_, j) => {
          const altitude = placementAltitude + j
          return genBoardHexID({ ...piecePlaneCoords[i], altitude })
        })
      return clearanceHexIds.every((clearanceHexId) => {
        const hex = newBoardHexes?.[clearanceHexId]
        if (!hex) return true // if no boardHex is written, then it is definitely empty
        const terrain = hex?.terrain
        const isBlocked =
          isSolidTerrainHex(terrain) ||
          isFluidTerrainHex(terrain)
        return !isBlocked
      })
    })
    if (isVerticalClearanceForPiece) {
      // write the addon to the boardHex
      // newBoardHexes[hexID] = {
      //   ...newBoardHexes[hexID],
      //   laurAddons: {
      //     ...newBoardHexes[hexID].laurAddons,
      //     [laurSide]: {
      //       pieceID: piece.id,
      //       rotation: addonRotation,
      //       side: laurSide, // duplicate
      //       // linkID?: string // short/long walls connect to another pillar
      //     },
      //   },
      // }
      // write the vertical clearances
      // piecePlaneCoords.forEach((_coord, i) => {
      //   Array(piece.height)
      //     .fill(0)
      //     .forEach((_, j) => {
      //       const clearanceHexAltitude = placementAltitude + j
      //       const clearanceID = genBoardHexID({
      //         ...piecePlaneCoords[i],
      //         altitude: clearanceHexAltitude,
      //       })
      //       newBoardHexes[clearanceID] = {
      //         id: clearanceID,
      //         q: piecePlaneCoords[i].q,
      //         r: piecePlaneCoords[i].r,
      //         s: piecePlaneCoords[i].s,
      //         altitude: clearanceHexAltitude,
      //         terrain: piece.terrain,
      //         pieceID,
      //         pieceRotation: addonRotation,
      //       }
      //     })
      // })
      // write the laur ruin piece to boardPieces
      newBoardPieces[pieceID] = piece.id
    }
  }

  return { newBoardHexes, newBoardPieces }
}
