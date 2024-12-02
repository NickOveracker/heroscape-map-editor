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
    </>
  )
}