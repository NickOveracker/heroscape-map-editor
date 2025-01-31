import { useGLTF } from '@react-three/drei'
import { HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'

export default function BigTree415() {
  const {
    nodes,
    //  materials
  } = useGLTF('/forest-tree15-colored-lowpoly.glb') as any
  return (
    <>
      <mesh
        geometry={nodes.Tree_large_rocks_scanned001_1.geometry}
      // material={materials.BoulderGray}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.road]} />
      </mesh>
      <mesh
        geometry={nodes.Tree_large_rocks_scanned001_2.geometry}
      // material={materials.ForestTree}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.tree]} />
      </mesh>
    </>
  )
}

useGLTF.preload('/forest-tree15-colored-lowpoly.glb')
