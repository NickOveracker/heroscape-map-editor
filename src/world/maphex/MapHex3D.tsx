import { Vector3, } from 'three'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import HeightRing from './HeightRing'
import { genBoardHexID, getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { isSolidTerrainHex } from '../../utils/board-utils'
import ForestTree from '../models/ForestTree'
import TicallaPalm from '../models/TicallaPalm'
import TicallaBrush from '../models/TicallaBrush'
import useBoundStore from '../../store/store'
import Ruins2 from '../models/Ruins2'
import Ruins3 from '../models/Ruins3'
import { Outcrop1 } from '../models/Outcrop1'
import Outcrop3 from '../models/Outcrop3'
import Outcrop4 from '../models/Outcrop4'
import Outcrop6 from '../models/Outcrop6'
import MarroHive6 from '../models/MarroHive6'
import { CastleBaseCorner, CastleBaseEnd, CastleBaseStraight } from '../models/CastleBases'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const boardPieces = useBoundStore(s => s.boardPieces)
  const pieceID = boardPieces[boardHex.pieceID]
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const isHeightRingedHex = isSolidTerrainHex(boardHex.terrain) || boardHex.terrain === HexTerrain.empty
  const isObstacleHex = (boardHex.isObstacleOrigin || boardHex.isAuxiliary)
  const isTreeHex = boardHex.terrain === HexTerrain.tree && isObstacleHex
  const isPalmHex = boardHex.terrain === HexTerrain.palm && boardHex.isObstacleOrigin
  const isGlacier1Hex = pieceID === Pieces.glacier1 && isObstacleHex
  const isOutcrop1Hex = pieceID === Pieces.outcrop1 && isObstacleHex
  const isOutcrop3Hex = pieceID === Pieces.outcrop3 && isObstacleHex
  const isGlacier3Hex = pieceID === Pieces.glacier3 && isObstacleHex
  const isGlacier4Hex = pieceID === Pieces.glacier4 && isObstacleHex
  const isGlacier6Hex = pieceID === Pieces.glacier6 && isObstacleHex
  const isHiveHex = boardPieces[boardHex.pieceID] === Pieces.hive && isObstacleHex
  const isBrushHex = boardHex.terrain === HexTerrain.brush && boardHex.isObstacleOrigin
  const isRuin2OriginHex = pieceID === Pieces.ruins2 && boardHex.isObstacleOrigin
  const isRuin3OriginHex = pieceID === Pieces.ruins3 && boardHex.isObstacleOrigin

  const boardHexes = useBoundStore(s => s.boardHexes)
  const underHexID = genBoardHexID({ ...boardHex, altitude: boardHex.altitude - 1 });
  const underHexTerrain = boardHexes?.[underHexID]?.terrain ?? HexTerrain.grass

  return (
    <>
      <MapHexIDDisplay boardHex={boardHex} position={new Vector3(x, y + 0.2, z)} />
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
      {/* {isTreeHex && <CastleBaseCorner boardHex={boardHex} />} */}
      {/* {isTreeHex && <CastleBaseStraight boardHex={boardHex} />} */}
      {isTreeHex && <CastleBaseEnd boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {/* {isTreeHex && <ForestTree boardHex={boardHex} />} */}
      {isPalmHex && <TicallaPalm boardHex={boardHex} />}
      {isBrushHex && <TicallaBrush boardHex={boardHex} />}
      {isRuin2OriginHex && <Ruins2 boardHex={boardHex} />}
      {isRuin3OriginHex && <Ruins3 boardHex={boardHex} />}
      {isGlacier1Hex && <Outcrop1 boardHex={boardHex} isGlacier={true} />}
      {isOutcrop1Hex && <Outcrop1 boardHex={boardHex} isGlacier={false} />}
      {isGlacier3Hex && <Outcrop3 boardHex={boardHex} isGlacier={true} />}
      {isOutcrop3Hex && <Outcrop3 boardHex={boardHex} isGlacier={false} />}
      {isGlacier4Hex && <Outcrop4 boardHex={boardHex} isGlacier={true} />}
      {isGlacier6Hex && <Outcrop6 boardHex={boardHex} isGlacier={true} />}
      {isHiveHex && <MarroHive6 boardHex={boardHex} />}
    </>
  )
}