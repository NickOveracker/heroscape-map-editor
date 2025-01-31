import { useGLTF } from '@react-three/drei'
import { HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'

export default function Outcrop6({
  isGlacier,
}: {
  isGlacier: boolean
}) {
  const model = useGLTF('/uncolored-decimated-glacier-outcrop-6.glb') as any
  const { nodes } = model
  return (
    <mesh geometry={nodes.glacier_6_with_holes.geometry}>
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
  )
}

useGLTF.preload('/uncolored-decimated-glacier-outcrop-6.glb')
