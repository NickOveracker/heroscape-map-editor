import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'

type Props = {
  boardHex: BoardHex
  underHexTerrain: string
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

// These were made after the castle walls and are VERY SIMILAR. TODO: DRY
export default function CastleBases({
  boardHex,
  underHexTerrain,
  onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/adjustable-castle-walls.glb') as any
  const [color, setColor] = React.useState(hexTerrainColor[HexTerrain.castle])
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const position = new Vector3(x, yBase, z)
  const pieceID = boardHex.pieceID
  const endGeo = [
    nodes.CastleWallEndBody.geometry,
    nodes.CastleWallEndCap.geometry,
  ]
  const straightGeo = [
    nodes.CastleWallStraightBody.geometry,
    nodes.CastleWallStraightCap.geometry,
  ]
  const cornerGeo = [
    nodes.CastleWallCornerBody.geometry,
    nodes.CastleWallCornerCap.geometry,
  ]
  const geometryPair = pieceID.includes(Pieces.castleBaseEnd)
    ? endGeo
    : pieceID.includes(Pieces.castleBaseStraight)
      ? straightGeo
      : cornerGeo
  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    setColor('yellow')
    e.stopPropagation()
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    setColor(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }

  return (
    <group>
      <group position={position} rotation={[0, (rotation * -Math.PI) / 3, 0]}>
        <mesh geometry={geometryPair[0]}>
          <meshMatcapMaterial color={hexTerrainColor[boardHex.terrain]} />
        </mesh>

        {/* Each wall has a WallCap mesh, then each wall-type adds on its little directional indicator mesh */}
        <>
          <mesh
            geometry={nodes.WallCap.geometry}
            onPointerUp={(e) => onPointerUp(e, boardHex)}
            onPointerEnter={onPointerEnter}
            onPointerOut={onPointerOut}
          >
            <meshMatcapMaterial color={color} />
          </mesh>
          <mesh
            geometry={geometryPair[1]}
            onPointerUp={(e) => onPointerUp(e, boardHex)}
          >
            <meshMatcapMaterial color={color} />
          </mesh>
        </>
      </group>
      <ObstacleBase
        x={x}
        y={yBaseCap}
        z={z}
        color={hexTerrainColor[underHexTerrain]}
      />
    </group>
  )
}