import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'

export function Outcrop1({
  boardHex,
  isGlacier,
}: {
  boardHex: BoardHex
  isGlacier: boolean
}) {
  const {
    nodes,
    //  materials
  } = useGLTF('/uncolored-decimated-glacier-outcrop-1.glb') as any
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group>
      <mesh
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        geometry={nodes.glacier_1_with_holes.geometry}
      >
        <meshMatcapMaterial
          color={
            isGlacier
              ? hexTerrainColor[HexTerrain.ice]
              : hexTerrainColor[HexTerrain.outcrop]
          }
          transparent={isGlacier}
          opacity={0.99}
        />
      </mesh>
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={
          isGlacier
            ? hexTerrainColor[HexTerrain.ice]
            : hexTerrainColor[HexTerrain.shadow]
        }
        isFluidBase={true}
      />
    </group>
  )
}

useGLTF.preload('/uncolored-decimated-glacier-outcrop-1.glb')
