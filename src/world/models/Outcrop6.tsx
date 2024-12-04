/* eslint-disable no-fallthrough */
import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'


export default function Outcrop6({ boardHex, isGlacier }: { boardHex: BoardHex, isGlacier: boolean }) {
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const model = useGLTF('/uncolored-decimated-glacier-outcrop-6.glb') as any
  const { nodes } = model
  const options = getOptions(boardHex.pieceRotation)
  function getOptions(rotation: number) {
    switch (rotation) {
      case 0:
      // return { rotationY: Math.PI / 3, xAdd: xLength, zAdd: zLength }
      case 1:
      // return { rotationY: 0, xAdd: 0, zAdd: 1.5 * HEXGRID_HEX_RADIUS }
      case 2:
      // return { rotationY: -Math.PI / 3, xAdd: -xLength, zAdd: zLength }
      case 3:
      // return { rotationY: Math.PI / 3, xAdd: -xLength, zAdd: -zLength }
      case 4:
      // return { rotationY: 0, xAdd: 0, zAdd: -1.5 * HEXGRID_HEX_RADIUS }
      case 5:
      // return { rotationY: -Math.PI / 3, xAdd: xLength, zAdd: -zLength }
      // return { rotationY: 0, xAdd: 0, zAdd: 0 }
      default:
        return { rotationY: 0, xAdd: 0, zAdd: 0 }
    }
  }
  if (boardHex.isAuxiliary) {
    return (
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={isGlacier ? hexTerrainColor[HexTerrain.ice] : hexTerrainColor[HexTerrain.shadow]}
        isTransparent={isGlacier}
      />
    )
  }
  return (
    <group>
      <group
        // position={[x + options.xAdd, yWithBase, z + options.zAdd]}
        position={[x, yWithBase, z]}
        rotation={[0, options.rotationY, 0]}
      >
        <mesh
          geometry={nodes.glacier_6_with_holes.geometry}
        >
          <meshMatcapMaterial
            color={isGlacier ? hexTerrainColor[HexTerrain.ice] : hexTerrainColor[HexTerrain.outcrop]}
            transparent
            opacity={0.99}
          />
        </mesh>
      </group>
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={isGlacier ? hexTerrainColor[HexTerrain.ice] : hexTerrainColor[HexTerrain.shadow]}
        isTransparent={isGlacier}
      />
    </group>
  )
}

useGLTF.preload('/uncolored-decimated-glacier-outcrop-6.glb')
