import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'
import { HexTerrain } from '../../types'

export function Outcrop1({
  isGlacier,
}: {
  isGlacier: boolean
}) {
  const {
    nodes,
    //  materials
  } = useGLTF('/uncolored-decimated-glacier-outcrop-1.glb') as any
  return (
    <>
      <mesh
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

    </>
  )
}

useGLTF.preload('/uncolored-decimated-glacier-outcrop-1.glb')
