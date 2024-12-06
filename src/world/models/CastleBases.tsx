import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'

export function CastleBaseStraight({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/decimated-castle-base-straight.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.definitiv_base_fortress_straight.geometry}
        scale={[1.1, 1.1, 1.1]}
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

useGLTF.preload('/decimated-castle-base-straight.glb')

export function CastleBaseEnd({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/decimated-castle-base-end.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.definitiv_base_fortress_end.geometry}
        scale={[1.1, 1.1, 1.1]}
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
useGLTF.preload('/decimated-castle-base-end.glb')

export function CastleBaseCorner({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/decimated-castle-base-corner.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.castle_base_corner.geometry}
        scale={[1.1, 1.1, 1.1]}
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
useGLTF.preload('/decimated-castle-base-corner.glb')




