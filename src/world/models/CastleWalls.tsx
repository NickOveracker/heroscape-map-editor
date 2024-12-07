import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_SPACING } from '../../utils/constants'

export function CastleWallEnd({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-end-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}
useGLTF.preload('/castle-wall-end-handmade.glb')

export function CastleWallStraight({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-straight-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}
useGLTF.preload('/castle-wall-straight-handmade.glb')

export function CastleWallCorner({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-corner-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CastleWallCorner.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}
useGLTF.preload('/castle-wall-corner-handmade.glb')

export function CastleArch({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-arch-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  if (boardHex.isAuxiliary) {
    return (
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    )
  }
  return (
    <group
      position={[x, yBase, z]}
      rotation={[0, rotation * -Math.PI / 3, 0]}
      scale={[HEXGRID_SPACING, 1, 1]} // this stretches the arch to full span 3 hexes (warping should be almost imperceptible)
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CastleArch.geometry}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ArchDoor.geometry}
      >
        <meshMatcapMaterial
          color={hexTerrainColor['dirt']}
        />
      </mesh>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}
useGLTF.preload('/castle-arch-handmade.glb')
