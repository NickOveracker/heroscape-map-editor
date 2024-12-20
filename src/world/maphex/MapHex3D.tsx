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
import { CastleWall } from '../models/CastleWalls'
import { ThreeEvent } from '@react-three/fiber'
import { CastleArch } from '../models/CastleArch'
// import LaurPillar from '../models/LaurPillar'
import CastleBases from '../models/CastleBases2'


export const MapHex3D = ({
  boardHex,
  onPointerUp
}: {
  boardHex: BoardHex
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}) => {
  const boardPieces = useBoundStore(s => s.boardPieces)
  const boardHexes = useBoundStore(s => s.boardHexes)
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
  const isCastleBaseEnd = pieceID === Pieces.castleBaseEnd
  const isCastleBaseStraight = pieceID === Pieces.castleBaseStraight
  const isCastleBaseCorner = pieceID === Pieces.castleBaseCorner
  const isCastleWallEnd = pieceID === Pieces.castleWallEnd && boardHex.isObstacleOrigin
  const isCastleWallStraight = pieceID === Pieces.castleWallStraight && boardHex.isObstacleOrigin
  const isCastleWallCorner = pieceID === Pieces.castleWallCorner && boardHex.isObstacleOrigin
  const isCastleWall = isCastleWallEnd || isCastleWallStraight || isCastleWallCorner
  const isCastleBase = isCastleBaseEnd || isCastleBaseStraight || isCastleBaseCorner
  const isCastleArch = (pieceID === Pieces.castleArch || pieceID === Pieces.castleArchNoDoor)

  const underHexID = genBoardHexID({ ...boardHex, altitude: boardHex.altitude - 1 });
  const underHexTerrain = boardHexes?.[underHexID]?.terrain ?? HexTerrain.grass
  const genOverHexIDForWall = (height: number) => genBoardHexID({ ...boardHex, altitude: boardHex.altitude + height + 1 });
  const castleWallOverHexTerrain = boardHexes?.[genOverHexIDForWall(boardHex?.obstacleHeight ?? 10)]?.terrain ?? ''

  return (
    <>
      <MapHexIDDisplay boardHex={boardHex} position={new Vector3(x, y + 0.2, z)} />
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
      {/* {isTreeHex && <LaurPillar underHexTerrain={underHexTerrain} boardHex={boardHex} />} */}
      {isTreeHex && <ForestTree boardHex={boardHex} />}
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

      {/* {isCastleBaseEnd && <CastleBaseEnd boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isCastleBaseStraight && <CastleBaseStraight boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isCastleBaseCorner && <CastleBaseCorner
        boardHex={boardHex}
        underHexTerrain={underHexTerrain}
      />} */}

      {isCastleBase && <CastleBases
        boardHex={boardHex}
        onPointerUp={onPointerUp}
        underHexTerrain={underHexTerrain}
      />}
      {isCastleWall && <CastleWall
        onPointerUp={onPointerUp}
        boardHex={boardHex}
        overHexTerrain={castleWallOverHexTerrain}
        underHexTerrain={underHexTerrain}
      />}
      {isCastleArch && <CastleArch
        boardHex={boardHex}
        onPointerUp={onPointerUp}
        underHexTerrain={underHexTerrain}
      />}
    </>
  )
}