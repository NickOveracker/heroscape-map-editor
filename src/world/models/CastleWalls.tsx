import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'

export function CastleWallEnd({ boardHex }: { boardHex: BoardHex }) {
  // const { nodes } = useGLTF('/decimated-castle-wall-end.glb') as any
  const { nodes } = useGLTF('/castle-wall-end-handmade.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        // geometry={nodes.definitiv_wall_end.geometry}
        geometry={nodes.Cylinder.geometry}
        // scale={scale}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
    </group>
  )
}
useGLTF.preload('/castle-wall-end-handmade.glb')

export function CastleWallStraight({ boardHex }: { boardHex: BoardHex }) {
  // const { nodes } = useGLTF('/decimated-castle-wall-end.glb') as any
  const { nodes } = useGLTF('/castle-wall-straight-handmade.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        // geometry={nodes.definitiv_wall_end.geometry}
        geometry={nodes.Cylinder002.geometry}
        // scale={scale}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
    </group>
  )
}
useGLTF.preload('/castle-wall-straight-handmade.glb')

export function CastleWallCorner({ boardHex }: { boardHex: BoardHex }) {
  // const { nodes } = useGLTF('/decimated-castle-wall-end.glb') as any
  const { nodes } = useGLTF('/castle-wall-corner-handmade.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group >
      <mesh
        castShadow
        receiveShadow
        // geometry={nodes.definitiv_wall_end.geometry}
        geometry={nodes.CastleWallCorner.geometry}
        // scale={scale}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
    </group>
  )
}
useGLTF.preload('/castle-wall-corner-handmade.glb')
