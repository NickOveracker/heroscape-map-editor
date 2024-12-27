import React from 'react'
import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { DoubleSide } from 'three'

type Props = {
  boardHex: BoardHex
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
    <group position={[x, yBase, z]}>
      <mesh geometry={nodes.LaurShortWall.geometry}>
        <meshMatcapMaterial
          side={DoubleSide}
          color={hexTerrainColor[HexTerrain.laurWall]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-short.glb')

export function LaurWallLong({
  boardHex,

  // underHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/laurwall-long.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  return (
    <group position={[x, yBase, z]}>
      <mesh geometry={nodes.LaurWallLong.geometry}>
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.laurWall]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-long.glb')
