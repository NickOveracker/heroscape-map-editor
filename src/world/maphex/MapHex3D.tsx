import { Vector3 } from 'three'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import HeightRing from './HeightRing'
import { genBoardHexID, getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { isSolidTerrainHex } from '../../utils/board-utils'
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
import { getLadderBattlementOptions, getObstaclRotation, getOptionsForBigTree, getOptionsForPalmHeight, getOptionsForTreeHeight } from '../models/piece-adjustments'
import ObstacleBase from '../models/ObstacleBase'
import { hexTerrainColor } from './hexColors'
import ForestTree from '../models/ForestTree'
import BigTree415 from '../models/BigTree415'

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
  const isVisible = boardHex.altitude <= viewingLevel
  const isTakingPicture = useBoundStore(s => s.isTakingPicture)
  const pieceID = boardPieces[boardHex.pieceID]
  const { x, y, z, yWithBase, yBase, yJungle } = getBoardHex3DCoords(boardHex)
  // const yJungle = y + HEXGRID_HEXCAP_HEIGHT / 2
  const underHexID = genBoardHexID({
    ...boardHex,
    altitude: boardHex.altitude - 1,
  })
  const underHexTerrain = boardHexes?.[underHexID]?.terrain ?? HexTerrain.grass
  const isHeightRingedHex =
    isSolidTerrainHex(boardHex.terrain) || (!isTakingPicture && boardHex.terrain === HexTerrain.empty)
  const isObstacleHex =
    boardHex.isObstacleOrigin || boardHex.isObstacleAuxiliary
  const isBigTreeHex = boardHex.pieceID.endsWith(Pieces.tree415) && boardHex.isObstacleOrigin
  const isBigTreeBaseHex = boardHex.pieceID.endsWith(Pieces.tree415) && boardHex.isObstacleAuxiliary
  const isTreeHex = !isBigTreeHex && !isBigTreeBaseHex && boardHex.terrain === HexTerrain.tree && isObstacleHex
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
  const isOutcrop3Hex = pieceID === Pieces.outcrop3 && boardHex.isObstacleOrigin
  const isOutcrop3BaseHex = pieceID === Pieces.outcrop3 && boardHex.isObstacleAuxiliary
  const isGlacier3Hex = pieceID === Pieces.glacier3 && boardHex.isObstacleOrigin
  const isGlacier3BaseHex = pieceID === Pieces.glacier3 && boardHex.isObstacleAuxiliary
  const isGlacier4Hex = pieceID === Pieces.glacier4 && boardHex.isObstacleOrigin
  const isGlacier4BaseHex = pieceID === Pieces.glacier4 && boardHex.isObstacleAuxiliary
  const isGlacier6Hex = pieceID === Pieces.glacier6 && boardHex.isObstacleOrigin
  const isGlacier6BaseHex = pieceID === Pieces.glacier6 && boardHex.isObstacleAuxiliary
  const isHiveHex =
    boardPieces[boardHex.pieceID] === Pieces.hive && boardHex.isObstacleOrigin
  const isHiveBaseHex =
    boardPieces[boardHex.pieceID] === Pieces.hive && boardHex.isObstacleAuxiliary
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

  return (
    <group
      visible={isVisible}
    // style={{
    //   animation: 'fade-in 5s ease 1s forwards'
    // }}
    >
      <MapHexIDDisplay
        boardHex={boardHex}
        position={new Vector3(x, y + 0.2, z)}
      />
      {isRuin2OriginHex && <Ruins2 boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isRuin3OriginHex && <Ruins3 boardHex={boardHex} underHexTerrain={underHexTerrain} />}
      {isHeightRingedHex && <HeightRing position={new Vector3(x, y, z)} />}
      {isLaurPillarHex && (
        <LaurPillar
          boardHex={boardHex}
        />
      )}
      {isTreeHex && (
        <>
          <group
            scale={[getOptionsForTreeHeight(boardHex.pieceID).scaleX, getOptionsForTreeHeight(boardHex.pieceID).scaleY, getOptionsForTreeHeight(boardHex.pieceID).scaleX]}
            position={[x, yWithBase + getOptionsForTreeHeight(boardHex.pieceID).y, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <ForestTree />
          </group>
          <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
        </>
      )}
      {isBigTreeHex && (
        <>
          <group
            position={[x + getOptionsForBigTree(boardHex.pieceRotation).xAdd, yWithBase, z + getOptionsForBigTree(boardHex.pieceRotation).zAdd]}
            scale={0.038}
            rotation={[0, getOptionsForBigTree(boardHex.pieceRotation).rotationY, 0]}
          >
            <BigTree415 />
          </group>
          <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
        </>
      )}
      {isBigTreeBaseHex && (
        <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
      )}
      {isLadderHex && (
        <group
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
      {(isBrushHex || isLaurBrushHex) && (
        <>
          <group
            position={[x, yJungle, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <TicallaBrush />
          </group>
          <ObstacleBase
            x={x}
            y={yJungle}
            z={z}
            color={hexTerrainColor[HexTerrain.swamp]}
          />
        </>
      )}
      {(isPalmHex || isLaurPalmHex) && (
        <>
          <group
            scale={[
              getOptionsForPalmHeight(boardHex.pieceID).scaleX,
              getOptionsForPalmHeight(boardHex.pieceID).scaleY,
              getOptionsForPalmHeight(boardHex.pieceID).scaleX
            ]}
            position={[x, yJungle, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <TicallaPalm />
          </group>
          <ObstacleBase
            x={x}
            y={yJungle}
            z={z}
            color={hexTerrainColor[HexTerrain.swamp]}
          />
        </>
      )}
      {isGlacier1Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <Outcrop1 isGlacier={true} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              hexTerrainColor[HexTerrain.ice]
            }
            isFluidBase={true}
          />
        </>
      )}
      {isOutcrop1Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
          >
            <Outcrop1 isGlacier={false} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              // hexTerrainColor[HexTerrain.ice]
              hexTerrainColor[HexTerrain.shadow]
            }
            isFluidBase={true}
          />
        </>
      )}
      {isGlacier3Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, getObstaclRotation(boardHex.pieceRotation), 0]}
          >
            <Outcrop3 isGlacier={true} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              hexTerrainColor[HexTerrain.ice]
            }
            isFluidBase={true}
          />
        </>
      )}
      {(isGlacier3BaseHex || isGlacier4BaseHex || isGlacier6BaseHex) && (
        <ObstacleBase
          x={x}
          y={yBase}
          z={z}
          color={
            hexTerrainColor[HexTerrain.ice]
          }
          isFluidBase={true}
        />
      )}
      {isOutcrop3Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, getObstaclRotation(boardHex.pieceRotation), 0]}
          >
            <Outcrop3 isGlacier={false} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              hexTerrainColor[HexTerrain.shadow]
            }
            isFluidBase={true}
          />
        </>
      )}
      {isOutcrop3BaseHex && (
        <ObstacleBase
          x={x}
          y={yBase}
          z={z}
          color={
            hexTerrainColor[HexTerrain.shadow]
          }
          isFluidBase={true}
        />
      )}
      {isGlacier4Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, getObstaclRotation(boardHex.pieceRotation), 0]}
          >
            <Outcrop4 isGlacier={true} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              hexTerrainColor[HexTerrain.ice]
            }
            isFluidBase={true}
          />
        </>
      )}
      {isGlacier6Hex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, getObstaclRotation(boardHex.pieceRotation), 0]}
          >
            <Outcrop6 isGlacier={true} />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={
              hexTerrainColor[HexTerrain.ice]
            }
            isFluidBase={true}
          />
        </>
      )}
      {isHiveHex && (
        <>
          <group
            position={[x, yWithBase, z]}
            rotation={[0, getObstaclRotation(boardHex.pieceRotation), 0]}
          >
            <MarroHive6 />
          </group>
          <ObstacleBase
            x={x}
            y={yBase}
            z={z}
            color={hexTerrainColor[HexTerrain.swampWater]}
            isFluidBase={true}
          />
        </>
      )}
      {(isHiveBaseHex) && (
        <ObstacleBase
          x={x}
          y={yBase}
          z={z}
          color={hexTerrainColor[HexTerrain.swampWater]}
          isFluidBase={true}
        />
      )}

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
    </group>
  )
}
