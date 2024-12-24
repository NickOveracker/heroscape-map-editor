import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'

export default function Outcrop4({
  boardHex,
  isGlacier,
}: {
  boardHex: BoardHex
  isGlacier: boolean
}) {
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const model = useGLTF('/uncolored-decimated-glacier-outcrop-4.glb') as any
  const { nodes } = model
  const rotation = getRotation(boardHex.pieceRotation)
  function getRotation(rotation: number) {
    switch (rotation) {
      case 0:
        return { rotationY: 0 }
      case 1:
        return { rotationY: -Math.PI / 3 }
      case 2:
        return { rotationY: (-2 * Math.PI) / 3 }
      case 3:
        return { rotationY: -Math.PI }
      case 4:
        return { rotationY: (2 * Math.PI) / 3 }
      case 5:
        return { rotationY: Math.PI / 3 }
      default:
        return { rotationY: 0 }
    }
  }
  if (boardHex.isObstacleAuxiliary) {
    return (
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={
          isGlacier
            ? hexTerrainColor[HexTerrain.ice]
            : hexTerrainColor[HexTerrain.shadow]
        }
        isFluidBase={isGlacier}
      />
    )
  }
  return (
    <group>
      <group position={[x, yWithBase, z]} rotation={[0, rotation.rotationY, 0]}>
        <mesh geometry={nodes.glacier_4_with_holes.geometry}>
          <meshMatcapMaterial
            color={
              isGlacier
                ? hexTerrainColor[HexTerrain.ice]
                : hexTerrainColor[HexTerrain.outcrop]
            }
            transparent={isGlacier}
            opacity={0.99}
          />
        </mesh>
      </group>
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={
          isGlacier
            ? hexTerrainColor[HexTerrain.ice]
            : hexTerrainColor[HexTerrain.shadow]
        }
        isFluidBase={isGlacier}
      />
    </group>
  )
}

useGLTF.preload('/uncolored-decimated-glacier-outcrop-4.glb')
