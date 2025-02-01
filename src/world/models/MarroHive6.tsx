import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'

export default function MarroHive6() {
  const model = useGLTF('/uncolored-decimated-marro-hive-6.glb') as any
  const { nodes } = model
  return (
    <mesh geometry={nodes.Marro_Hive.geometry}>
      <meshMatcapMaterial color={hexTerrainColor.hiveModel1} />
    </mesh>
  )
}

useGLTF.preload('/uncolored-decimated-marro-hive-6.glb')
