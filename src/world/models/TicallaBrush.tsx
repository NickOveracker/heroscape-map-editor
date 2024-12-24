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
      <group
        position={[x - 0.1, yTree, z + 0.4]} // I botched this positioning in Blender
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <mesh
          geometry={nodes.PlankFern1_1.geometry}
        >
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush1} />
        </mesh>
        <mesh
          geometry={nodes.PlankFern1_2.geometry}
        >
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush2} />
        </mesh>
        <mesh
          geometry={nodes.PlankFern1_3.geometry}
        >
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush3} />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor[HexTerrain.swamp]} />
    </group>
  )
}

useGLTF.preload('/ticalla-brush-colored-lowpoly.glb')
