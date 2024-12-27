import { clone } from 'lodash'
import {
  BoardHexes,
  Piece,
  Pieces,
  BoardPieces,
  BoardHex,
} from '../types'
import { hexUtilsGetNeighborForRotation, hexUtilsGetRadialNearNeighborsForRotation } from '../utils/hex-utils'
import { genBoardHexID, genPieceID } from '../utils/map-utils'

type LaurPieceAddArgs = {
  piece: Piece
  boardHexes: BoardHexes
  boardPieces: BoardPieces
  clickedHex: BoardHex
  laurSide: string
}
type PieceAddReturn = { newBoardHexes: BoardHexes; newBoardPieces: BoardPieces }

export function addLaurPiece({
  piece,
  boardHexes,
  boardPieces,
  clickedHex,
  laurSide, // someday, we may want the rotation, when we saturate from data
}: LaurPieceAddArgs): PieceAddReturn {
  const newBoardHexes = clone(boardHexes)
  const newBoardPieces = clone(boardPieces)
  const clickedHexIDOrTileCoordsPresumedID = genBoardHexID({ ...(originOfTile), altitude: clickedHex.altitude })
  const pieceID = genPieceID(clickedHexIDOrTileCoordsPresumedID, piece.id, clickedHex.pieceRotation)

  // LAUR WALL
  const isLaurWallRuin = piece.id !== Pieces.laurWallRuin
  const isLaurWallShort = piece.id !== Pieces.laurWallShort
  const isLaurWallLong = piece.id !== Pieces.laurWallLong
  const pillarSideRotations: { [side: string]: number } = {
    plusX: 0,
    minusY: 1.5,
    minusX: 3,
    plusY: 4.5,
  }
  if (isLaurWallRuin) {
    const rotationOfRuin = clickedHex.pieceRotation + pillarSideRotations[laurSide]
    const vectorsGettingObstructed = (laurSide === 'minusY' || laurSide === 'plusY') ?
      hexUtilsGetRadialNearNeighborsForRotation(rotationOfRuin) :
      [hexUtilsGetNeighborForRotation(rotationOfRuin)]
    const hexIdsGettingObstructed = vectorsGettingObstructed.map(coord => {
      genBoardHexID({ ...coord, altitude: clickedHex.altitude })
    })
    console.log("🚀 ~ hexIdsGettingObstructed ~ hexIdsGettingObstructed:", hexIdsGettingObstructed)
  }
  // const isWallNeedPillarToo = underHexIds.every((id) => {
  //   const buddyHex = '' // pillar? 
  //   return !(newBoardHexes?.[id]?.laurAddons?.[(laurSide ?? '')])
  // })

  // TODO: WRITE NEW PILLAR IF THERE IS ONE
  // write the new laur addon piece
  // newBoardPieces[pieceID] = piece.id

  return { newBoardHexes, newBoardPieces }
}