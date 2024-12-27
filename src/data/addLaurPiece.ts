import { clone } from 'lodash'
import {
  BoardHexes,
  Piece,
  Pieces,
  BoardPieces,
  BoardHex,
} from '../types'
import { hexUtilsAdd, hexUtilsGetNeighborForRotation, hexUtilsGetRadialNearNeighborsForRotation } from '../utils/hex-utils'
import { genBoardHexID, genPieceID } from '../utils/map-utils'
import { isFluidTerrainHex, isSolidTerrainHex, isVerticallyObstructiveTerrain } from '../utils/board-utils'

type LaurPieceAddArgs = {
  piece: Piece
  boardHexes: BoardHexes
  boardPieces: BoardPieces
  clickedHex: BoardHex
  laurSide: string
}
type PieceAddReturn = { newBoardHexes: BoardHexes; newBoardPieces: BoardPieces }

const pillarSideRotations: { [side: string]: number } = {
  plusX: 0,
  minusY: 1.5,
  minusX: 3,
  plusY: 4.5,
}
export function addLaurPiece({
  piece,
  boardHexes,
  boardPieces,
  clickedHex,
  laurSide, // someday, we may want the rotation, when we saturate from data
}: LaurPieceAddArgs): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const placementAltitude = clickedHex.altitude
  const newBoardPieces = clone(boardPieces)
  const pieceID = genPieceID(clickedHex.id, piece.id, clickedHex.pieceRotation)
  const addonRotation = (clickedHex.pieceRotation + pillarSideRotations[laurSide]) % 6

  // LAUR WALL
  const isLaurWallRuin = piece.id === Pieces.laurWallRuin
  const isLaurWallShort = piece.id === Pieces.laurWallShort
  // const isLaurWallLong = piece.id === Pieces.laurWallLong
  if (isLaurWallShort) {
    // const isPillarAtBuddy
    // const isSlotOpenOnPillarBuddy
    // const isCanBuildPillarRightThere
    // const build the pillar if needed, and the shortwall
    if (true) {
      // write the addon to the boardHex
      newBoardHexes[clickedHex.id] = {
        ...newBoardHexes[clickedHex.id],
        laurAddons: {
          ...newBoardHexes[clickedHex.id].laurAddons,
          [laurSide]: {
            pieceID: piece.id,
            rotation: addonRotation,
            side: laurSide, // duplicate
            // linkID?: string // short/long walls connect to another pillar
          }
        }
      }
      // write the laur ruin piece to boardPieces
      // newBoardPieces[pieceID] = piece.id
    }
  }
  if (isLaurWallRuin) {
    const vectorsGettingObstructed = (laurSide === 'minusY' || laurSide === 'plusY') ?
      hexUtilsGetRadialNearNeighborsForRotation(addonRotation) :
      [hexUtilsGetNeighborForRotation(addonRotation)]
    const piecePlaneCoords = vectorsGettingObstructed.map(coord => hexUtilsAdd(coord, clickedHex))
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
      newBoardHexes[clickedHex.id] = {
        ...newBoardHexes[clickedHex.id],
        laurAddons: {
          ...newBoardHexes[clickedHex.id].laurAddons,
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