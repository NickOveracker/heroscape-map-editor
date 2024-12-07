import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'

export function CastleBaseStraight({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-base-straight-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
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

useGLTF.preload('/castle-base-straight-handmade.glb')

export function CastleBaseEnd({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-base-end-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        // scale={scale}
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
useGLTF.preload('/castle-base-end-handmade.glb')

export function CastleBaseCorner({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-base-corner-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group
    >
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
useGLTF.preload('/castle-base-corner-handmade.glb')




