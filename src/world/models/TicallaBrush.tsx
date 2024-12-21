import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEXCAP_HEIGHT } from '../../utils/constants'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'

export default function TicallaBrush({ boardHex }: { boardHex: BoardHex }) {
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const yTree = y + HEXGRID_HEXCAP_HEIGHT / 2
  const yBase = y + HEXGRID_HEXCAP_HEIGHT / 2
  const {
    nodes,
    // materials
  } = useGLTF('/ticalla-brush-colored-lowpoly.glb') as any
  const rotation = boardHex?.pieceRotation ?? 0
  return (
    <group>
      <group position={[x, yTree, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <mesh
          geometry={nodes.PlankFern1_1.geometry}
        // material={materials.BushFern}
        >
          <meshMatcapMaterial color={'#45f529'} />
        </mesh>
        <mesh
          geometry={nodes.PlankFern1_2.geometry}
        // material={materials.PalmBush}
        >
          <meshMatcapMaterial color={'#35E718'} />
        </mesh>
        <mesh
          geometry={nodes.PlankFern1_3.geometry}
        // material={materials.BushArbol}
        >
          <meshMatcapMaterial color={'#09a811'} />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor[HexTerrain.brush]} />
    </group>
  )
}

useGLTF.preload('/ticalla-brush-colored-lowpoly.glb')
