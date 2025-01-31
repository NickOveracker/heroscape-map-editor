import { useGLTF } from '@react-three/drei'
import { HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'

export default function ForestTree() {
  const {
    nodes,
    //  materials
  } = useGLTF('/forgotten-forest-tree-low-poly-colored.glb') as any
  return (
    <>
      <mesh
        geometry={nodes.Tree10_scanned.geometry}
      // material={materials.ForestTree}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.tree]} />
      </mesh>
      {/* <Billboard
        position={[x, options.y + 1.5, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        scale={[1, 3, 1]}
        onPointerEnter={e => e.stopPropagation()}
      >
        <Image url='tree-img.jpg'></Image>
      </Billboard> */}
    </>
  )
}

useGLTF.preload('/forgotten-forest-tree-low-poly-colored.glb')
