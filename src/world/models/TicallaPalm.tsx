import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'

export default function TicallaPalm() {
  const {
    nodes,
    // materials
  } = useGLTF('/ticalla-palm-colored-lowpoly.glb') as any
  const {
    // I botched these exports in Blender
    AlienGrassUFO_v01_Tuft_a_1: accompanyingBrush,
    AlienGrassUFO_v01_Tuft_a_3: palmLeaf,
    AlienGrassUFO_v01_Tuft_a_2: palmTrunk,
  } = nodes
  return (
    <>
      <mesh geometry={palmTrunk.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaPalmModel1} />
      </mesh>
      <mesh geometry={accompanyingBrush.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaBrush2} />
      </mesh>
      <mesh geometry={palmLeaf.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaPalmModel3} />
      </mesh>
    </>
  )
}

useGLTF.preload('/ticalla-palm-colored-lowpoly.glb')
