import { clone } from 'lodash'
import {
  BoardHexes,
  Pieces,
  BoardPieces,
} from '../types'
import { hexUtilsAdd, hexUtilsGetNeighborForRotation, hexUtilsGetRadialNearNeighborsForRotation } from '../utils/hex-utils'
import { genBoardHexID, genPieceID, pillarSideRotations } from '../utils/map-utils'
import { isFluidTerrainHex, isSolidTerrainHex, isVerticallyObstructiveTerrain } from '../utils/board-utils'
import { PieceAddArgs } from './addPiece'

type PieceAddReturn = { newBoardHexes: BoardHexes; newBoardPieces: BoardPieces }


export function addLaurPiece({
  piece,
  boardHexes,
  boardPieces,
  pieceCoords,
  placementAltitude,
  rotation
}: Omit<PieceAddArgs, 'isVsTile'>): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const newBoardPieces = clone(boardPieces)
  const hexID = genBoardHexID({ ...(pieceCoords), altitude: placementAltitude })
  const isPillarOnHex = boardHexes[hexID]?.pieceID?.includes(Pieces.laurWallPillar)
  if (!isPillarOnHex) {
    console.error('Tried to place Laur Wall Addon where there is no Laur Wall Pillar!')
  }
  const pillarRotation = boardHexes[hexID].pieceRotation
  const addonRotation = (rotation) % 6
  const pieceID = genPieceID(hexID, piece.id, addonRotation)
  const laurSide = Object.entries(pillarSideRotations).filter(([, rotation]) => {
    return (rotation === Math.abs(addonRotation - pillarRotation))
  })?.[0]?.[0] ?? ''
  // LAUR WALL
  const isLaurWallRuin = piece.id === Pieces.laurWallRuin
  // const isLaurWallShort = piece.id === Pieces.laurWallShort
  // const isLaurWallLong = piece.id === Pieces.laurWallLong
  // if (isLaurWallShort) {
  //   // const isPillarAtBuddy

  //   // const isSlotOpenOnPillarBuddy
  //   // const isCanBuildPillarRightThere
  //   // const build the pillar if needed, and the shortwall
  //   if (true) {
  //     // write the addon to the boardHex
  //     newBoardHexes[clickedHex.id] = {
  //       ...newBoardHexes[clickedHex.id],
  //       laurAddons: {
  //         ...newBoardHexes[clickedHex.id].laurAddons,
  //         [laurSide]: {
  //           pieceID: piece.id,
  //           rotation: addonRotation,
  //           side: laurSide, // duplicate
  //           // linkID?: string // short/long walls connect to another pillar
  //         }
  //       }
  //     }
  //     // write the laur ruin piece to boardPieces
  //     // newBoardPieces[pieceID] = piece.id
  //   }
  // }
  if (isLaurWallRuin) {
    const vectorsGettingObstructed = (laurSide === 'minusY' || laurSide === 'plusY') ?
      hexUtilsGetRadialNearNeighborsForRotation(addonRotation) :
      [hexUtilsGetNeighborForRotation(addonRotation)]
    console.log("🚀 ~ vectorsGettingObstructed:", vectorsGettingObstructed)
    const piecePlaneCoords = vectorsGettingObstructed.map(coord => hexUtilsAdd(coord, pieceCoords))
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
          isFluidTerrainHex(terrain) ||
          isVerticallyObstructiveTerrain(terrain)
        return !isBlocked
      })
    })
    if (isVerticalClearanceForPiece) {
      // write the addon to the boardHex
      newBoardHexes[hexID] = {
        ...newBoardHexes[hexID],
        laurAddons: {
          ...newBoardHexes[hexID].laurAddons,
          [laurSide]: {
            pieceID: piece.id,
            rotation: addonRotation,
            side: laurSide, // duplicate
            // linkID?: string // short/long walls connect to another pillar
          }
        }
      }
      // write the vertical clearances
      piecePlaneCoords.forEach((_coord, i) => {
        Array(piece.height)
          .fill(0)
          .forEach((_, j) => {
            const clearanceHexAltitude = placementAltitude + j
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
              pieceRotation: addonRotation,
            }
          })
      })
      // write the laur ruin piece to boardPieces
      newBoardPieces[pieceID] = piece.id
    }
  }

  return { newBoardHexes, newBoardPieces }
}