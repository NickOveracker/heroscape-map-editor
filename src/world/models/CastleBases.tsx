import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
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
  const pieceID = boardHex.pieceID
  const bodyGeometry = pieceID.includes(Pieces.castleBaseEnd) ?
    nodes.CastleWallEndBody.geometry :
    pieceID.includes(Pieces.castleBaseStraight) ?
      nodes.CastleWallStraightBody.geometry :
      nodes.CastleWallCornerBody.geometry
  const capGeometry = pieceID.includes(Pieces.castleBaseEnd) ?
    nodes.CastleWallEndCap.geometry :
    pieceID.includes(Pieces.castleBaseStraight) ?
      nodes.CastleWallStraightCap.geometry :
      nodes.CastleWallCornerCap.geometry
  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    setColor('yellow')
    e.stopPropagation()
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    setColor(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }

  return (
    <>
      <group
        position={[x, yBase, z]}
        rotation={[0, (boardHex.pieceRotation * -Math.PI) / 3, 0]}
      >
        <mesh geometry={bodyGeometry}>
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
            geometry={capGeometry}
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
    </>
  )
}
