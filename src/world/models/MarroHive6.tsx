import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'


export default function MarroHive6({ boardHex }: { boardHex: BoardHex }) {
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const model = useGLTF('/uncolored-decimated-marro-hive-6.glb') as any
  const { nodes } = model
  const rotation = getRotation(boardHex.pieceRotation)
  function getRotation(rotation: number) {
    switch (rotation) {
      case 0:
        return { rotationY: 0 }
      case 1:
        return { rotationY: -Math.PI / 3 }
      case 2:
        return { rotationY: -2 * Math.PI / 3 }
      case 3:
        return { rotationY: -Math.PI }
      case 4:
        return { rotationY: 2 * Math.PI / 3 }
      case 5:
        return { rotationY: Math.PI / 3 }
      default:
        return { rotationY: 0 }
    }
  }
  if (boardHex.isAuxiliary) {
    return (
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={hexTerrainColor[HexTerrain.swamp]}
      />
    )
  }
  return (
    <group>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, rotation.rotationY, 0]}
      >
        <mesh
          geometry={nodes.Marro_Hive.geometry}
        >
          <meshMatcapMaterial
            // color={hexTerrainColor[HexTerrain.swamp]}
            color={'#828c51'}
          // color={'#555C45'}
          />
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

useGLTF.preload('/uncolored-decimated-marro-hive-6.glb')
