import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'
import { getOptionsForBigTree } from './piece-adjustments'

export default function BigTree415({ boardHex }: { boardHex: BoardHex }) {
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const {
    nodes,
    //  materials
  } = useGLTF('/forest-tree15-colored-lowpoly.glb') as any
  const options = getOptionsForBigTree(boardHex.pieceRotation)
  if (boardHex.isObstacleAuxiliary) {
    return (
      <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
    )
  }
  return (
    <>
      <group
        position={[x + options.xAdd, yWithBase, z + options.zAdd]}
        scale={0.038}
        rotation={[0, options.rotationY, 0]}
      >
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
      </group>
      <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
    </>
  )
}

useGLTF.preload('/forest-tree15-colored-lowpoly.glb')
