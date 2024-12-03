import { useGLTF } from '@react-three/drei'
import { BoardHex } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEX_RADIUS } from '../../utils/constants'
import ObstacleBase from './ObstacleBase'

export default function Glacier3({ boardHex }: { boardHex: BoardHex }) {
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const { nodes, materials } = useGLTF('/forest-tree15-colored-lowpoly.glb') as any
  const xLength = Math.cos(Math.PI / 6) * 1.5
  const zLength = Math.sin(Math.PI / 6) * 1.5
  const options = getOptionsForBigTree(boardHex.pieceRotation)
  function getOptionsForBigTree(rotation: number) {
    switch (rotation) {
      case 0:
        return { rotationY: Math.PI / 3, xAdd: xLength, zAdd: zLength }
      case 1:
        return { rotationY: 0, xAdd: 0, zAdd: 1.5 * HEXGRID_HEX_RADIUS }
      case 2:
        return { rotationY: -Math.PI / 3, xAdd: -xLength, zAdd: zLength }
      case 3:
        return { rotationY: Math.PI / 3, xAdd: -xLength, zAdd: -zLength }
      case 4:
        return { rotationY: 0, xAdd: 0, zAdd: -1.5 * HEXGRID_HEX_RADIUS }
      case 5:
        return { rotationY: -Math.PI / 3, xAdd: xLength, zAdd: -zLength }
      default:
        return { rotationY: 0, xAdd: 0, zAdd: 0 }
    }
  }
  if (boardHex.isAuxiliary) {
    return (
      <ObstacleBase x={x} y={yBase} z={z} />
    )
  }
  return (
    <group dispose={null}>
      <group
        position={[x + options.xAdd, yWithBase, z + options.zAdd]}
        scale={0.038}
        rotation={[0, options.rotationY, 0]}
        castShadow
        receiveShadow
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_large_rocks_scanned001_1.geometry}
          material={materials.BoulderGray}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_large_rocks_scanned001_2.geometry}
          material={materials.ForestTree}
        />
      </group>
      <ObstacleBase x={x} y={yBase} z={z} />
    </group>
  )
}

useGLTF.preload('/forest-tree15-colored-lowpoly.glb')