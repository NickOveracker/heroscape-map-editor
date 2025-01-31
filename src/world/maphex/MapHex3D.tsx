import { Vector3 } from 'three'
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
import CastleBases from '../models/CastleBases'
import LaurPillar from '../models/LaurPillar'
import { Ladder } from '../models/Ladder'
import { HEXGRID_HEX_HEIGHT, HEXGRID_HEXCAP_HEIGHT } from '../../utils/constants'
import { getLadderBattlementOptions } from '../models/piece-adjustments'
import ObstacleBase from '../models/ObstacleBase'
import { hexTerrainColor } from './hexColors'

export const MapHex3D = ({
  boardHex,
  onPointerUp,
}: {
  boardHex: BoardHex
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}) => {
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const viewingLevel = useBoundStore((s) => s.viewingLevel)
  const isTakingPicture = useBoundStore(s => s.isTakingPicture)
  const pieceID = boardPieces[boardHex.pieceID]
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const isHeightRingedHex =
    isSolidTerrainHex(boardHex.terrain) || (!isTakingPicture && boardHex.terrain === HexTerrain.empty)
  const isObstacleHex =
    boardHex.isObstacleOrigin || boardHex.isObstacleAuxiliary
  const isTreeHex = boardHex.terrain === HexTerrain.tree && isObstacleHex
  const isLaurPillarHex =
    boardHex.terrain === HexTerrain.laurWall && isObstacleHex
  const isBrushHex =
    boardHex.terrain === HexTerrain.brush && boardHex.isObstacleOrigin
  const isPalmHex =
    boardHex.terrain === HexTerrain.palm && boardHex.isObstacleOrigin
  const isLadderHex =
    boardHex.terrain === HexTerrain.ladder && boardHex.isObstacleOrigin
  const isLaurPalmHex =
    boardHex.terrain === HexTerrain.laurPalm && boardHex.isObstacleOrigin
  const isLaurBrushHex =
    boardHex.terrain === HexTerrain.laurBrush && boardHex.isObstacleOrigin
  const isGlacier1Hex = pieceID === Pieces.glacier1 && isObstacleHex
  const isOutcrop1Hex = pieceID === Pieces.outcrop1 && isObstacleHex
  const isOutcrop3Hex = pieceID === Pieces.outcrop3 && isObstacleHex
  const isGlacier3Hex = pieceID === Pieces.glacier3 && isObstacleHex
  const isGlacier4Hex = pieceID === Pieces.glacier4 && isObstacleHex
  const isGlacier6Hex = pieceID === Pieces.glacier6 && isObstacleHex
  const isHiveHex =
    boardPieces[boardHex.pieceID] === Pieces.hive && isObstacleHex
  const isRuin2OriginHex =
    pieceID === Pieces.ruins2 && boardHex.isObstacleOrigin
  const isRuin3OriginHex =
    pieceID === Pieces.ruins3 && boardHex.isObstacleOrigin
  const isCastleBaseEnd = pieceID === Pieces.castleBaseEnd
  const isCastleBaseStraight = pieceID === Pieces.castleBaseStraight
  const isCastleBaseCorner = pieceID === Pieces.castleBaseCorner
  const isCastleWallEnd =
    pieceID === Pieces.castleWallEnd && boardHex.isObstacleOrigin
  const isCastleWallStraight =
    pieceID === Pieces.castleWallStraight && boardHex.isObstacleOrigin
  const isCastleWallCorner =
    pieceID === Pieces.castleWallCorner && boardHex.isObstacleOrigin
  const isCastleWall =
    isCastleWallEnd || isCastleWallStraight || isCastleWallCorner
  const isCastleBase =
    isCastleBaseEnd || isCastleBaseStraight || isCastleBaseCorner
  const isCastleArch =
    pieceID === Pieces.castleArch || pieceID === Pieces.castleArchNoDoor

  const underHexID = genBoardHexID({
    ...boardHex,
    altitude: boardHex.altitude - 1,
  })
  const underHexTerrain = boardHexes?.[underHexID]?.terrain ?? HexTerrain.grass

  const yTicallaBrush = y + HEXGRID_HEXCAP_HEIGHT / 2
  const yBase = y + HEXGRID_HEXCAP_HEIGHT / 2
  const isVisible = boardHex.altitude <= viewingLevel
  // yTree
  return (
    <>
      <MapHexIDDisplay
        boardHex={boardHex}
        position={new Vector3(x, y + 0.2, z)}
      />
      {isHeightRingedHex && <HeightRing position={new Vector3(x, y, z)} />}
      {isLaurPillarHex && (
        <LaurPillar
          boardHex={boardHex}
        />
      )}
      {isTreeHex && <ForestTree boardHex={boardHex} />}
      {isPalmHex && <TicallaPalm boardHex={boardHex} />}
      {isLadderHex && (
        <group
          visible={isVisible}
          position={[
            x + getLadderBattlementOptions(boardHex.pieceRotation).xAdd,
            y - HEXGRID_HEX_HEIGHT + (HEXGRID_HEXCAP_HEIGHT / 2),
            z + getLadderBattlementOptions(boardHex.pieceRotation).zAdd
          ]}
          rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
        >
          <Ladder />
        </group>
      )}
      {/* {isPalmHex && <Battlement boardHex={boardHex} />} */}
      {isBrushHex && (
        <group
          visible={isVisible}
        >
          <group
            position={[x, yTicallaBrush, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <TicallaBrush />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={hexTerrainColor[HexTerrain.swamp]}
          />
        </group>
      )}
      {isLaurPalmHex && <TicallaPalm boardHex={boardHex} />}
      {isLaurBrushHex && <TicallaBrush />}
      {isRuin2OriginHex && <Ruins2 boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isRuin3OriginHex && <Ruins3 boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isGlacier1Hex && <Outcrop1 boardHex={boardHex} isGlacier={true} />}
      {isOutcrop1Hex && <Outcrop1 boardHex={boardHex} isGlacier={false} />}
      {isGlacier3Hex && <Outcrop3 boardHex={boardHex} isGlacier={true} />}
      {isOutcrop3Hex && <Outcrop3 boardHex={boardHex} isGlacier={false} />}
      {isGlacier4Hex && <Outcrop4 boardHex={boardHex} isGlacier={true} />}
      {isGlacier6Hex && <Outcrop6 boardHex={boardHex} isGlacier={true} />}
      {isHiveHex && <MarroHive6 boardHex={boardHex} />}

      {isCastleBase && (
        <CastleBases
          boardHex={boardHex}
          onPointerUp={onPointerUp}
          underHexTerrain={underHexTerrain}
        />
      )}
      {isCastleWall && (
        <CastleWall
          onPointerUp={onPointerUp}
          boardHex={boardHex}
          underHexTerrain={underHexTerrain}
        />
      )}
      {isCastleArch && (
        <CastleArch
          boardHex={boardHex}
          onPointerUp={onPointerUp}
          underHexTerrain={underHexTerrain}
        />
      )}
    </>
  )
}
