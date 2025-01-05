import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'

export default function TicallaBrush({ boardHex }: { boardHex: BoardHex }) {
  const { x, z, yBase, yWithBase } = getBoardHex3DCoords(boardHex)
  const { nodes } = useGLTF('/ticalla-brush-colored-lowpoly.glb') as any
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
      >
        <mesh geometry={nodes.PlankFern1_1.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush1} />
        </mesh>
        <mesh geometry={nodes.PlankFern1_2.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush2} />
        </mesh>
        <mesh geometry={nodes.PlankFern1_3.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush3} />
        </mesh>
      </group>
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={hexTerrainColor[HexTerrain.swamp]}
      />
    </group>
  )
}

useGLTF.preload('/ticalla-brush-colored-lowpoly.glb')
