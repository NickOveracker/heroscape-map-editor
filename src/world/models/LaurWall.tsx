import React from 'react'
import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { DoubleSide } from 'three'

type Props = {
  boardHex: BoardHex,
  // underHexTerrain: string
  // onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function LaurWallShort({
  boardHex,
  // underHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/laurwall-short.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  return (
    <group
      position={[x, yBase, z]}
    >
      <mesh
        geometry={nodes.LaurShortWall.geometry}
      >
        <meshMatcapMaterial side={DoubleSide} color={hexTerrainColor[HexTerrain.laurWallPillar]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-short.glb')

export function LaurWallRuin({
  boardHex,
  // underHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/laurwall-ruin.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  return (
    <group
      position={[x + 0.86602540378, yBase, z]}
    >
      <mesh
        geometry={nodes.LaurWallRuin.geometry}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.laurWallPillar]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-ruin.glb')

export function LaurWallLong({
  boardHex,
  // underHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/laurwall-long.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  return (
    <group
      position={[x, yBase, z]}
    >
      <mesh
        geometry={nodes.LaurWallLong.geometry}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.laurWallPillar]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-long.glb')
