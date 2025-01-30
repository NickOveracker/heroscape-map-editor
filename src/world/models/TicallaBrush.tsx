import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'

export default function TicallaBrush() {
  const { nodes } = useGLTF('/ticalla-brush-colored-lowpoly.glb') as any
  return (
    <>
      <mesh geometry={nodes.PlankFern1_1.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaBrush1} />
      </mesh>
      <mesh geometry={nodes.PlankFern1_2.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaBrush2} />
      </mesh>
      <mesh geometry={nodes.PlankFern1_3.geometry}>
        <meshMatcapMaterial color={hexTerrainColor.ticallaBrush3} />
      </mesh>
    </>
  )
}

useGLTF.preload('/ticalla-brush-colored-lowpoly.glb')
