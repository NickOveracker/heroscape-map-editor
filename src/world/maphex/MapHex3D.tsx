import { Vector3, } from 'three'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import HeightRing from './HeightRing'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { isSolidTerrainHex } from '../../utils/board-utils'
import ForestTree from '../models/ForestTree'
import TicallaPalm from '../models/TicallaPalm'
import TicallaBrush from '../models/TicallaBrush'
import useBoundStore from '../../store/store'
import { piecesSoFar } from '../../data/pieces'
import Ruins2 from '../models/Ruins2'
import Ruins3 from '../models/Ruins3'
import { Outcrop1 } from '../models/Outcrop1'
import Outcrop3 from '../models/Outcrop3'
import Outcrop4 from '../models/Outcrop4'
import Outcrop6 from '../models/Outcrop6'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const boardPieces = useBoundStore(s => s.boardPieces)
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const isHeightRingedHex = isSolidTerrainHex(boardHex.terrain) || boardHex.terrain === HexTerrain.empty
  const isTreeHex = boardHex.terrain === HexTerrain.tree && (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isPalmHex = boardHex.terrain === HexTerrain.palm && boardHex.isObstacleOrigin
  const isGlacier1Hex = boardPieces[boardHex.pieceID] === Pieces.glacier1 && (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isGlacier3Hex = boardPieces[boardHex.pieceID] === Pieces.glacier3 && (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isGlacier4Hex = boardPieces[boardHex.pieceID] === Pieces.glacier4 && (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isGlacier6Hex = boardPieces[boardHex.pieceID] === Pieces.glacier6 && (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isBrushHex = boardHex.terrain === HexTerrain.brush && boardHex.isObstacleOrigin
  const isRuin2OriginHex = piecesSoFar[boardPieces[boardHex.pieceID]]?.id === Pieces.ruins2 && boardHex.isObstacleOrigin
  const isRuin3OriginHex = piecesSoFar[boardPieces[boardHex.pieceID]]?.id === Pieces.ruins3 && boardHex.isObstacleOrigin
  return (
    <>
      <MapHexIDDisplay boardHex={boardHex} position={new Vector3(x, y + 0.2, z)} />
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
      {isTreeHex && <ForestTree boardHex={boardHex} />}
      {isPalmHex && <TicallaPalm boardHex={boardHex} />}
      {isBrushHex && <TicallaBrush boardHex={boardHex} />}
      {isRuin2OriginHex && <Ruins2 boardHex={boardHex} />}
      {isRuin3OriginHex && <Ruins3 boardHex={boardHex} />}
      {isGlacier1Hex && <Outcrop1 boardHex={boardHex} isGlacier={true} />}
      {isGlacier3Hex && <Outcrop3 boardHex={boardHex} isGlacier={true} />}
      {isGlacier4Hex && <Outcrop4 boardHex={boardHex} isGlacier={true} />}
      {isGlacier6Hex && <Outcrop6 boardHex={boardHex} isGlacier={true} />}
    </>
  )
}