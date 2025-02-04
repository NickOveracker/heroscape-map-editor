import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import {
  HEXGRID_HEX_APOTHEM,
  HEXGRID_HEX_HEIGHT,
  HEXGRID_HEX_RADIUS,
} from '../../utils/constants'
import { hexTerrainColor } from '../maphex/hexColors'

export default function Ruins2({
  boardHex,
}: {
  boardHex: BoardHex,
}) {
  const {
    nodes,
    // materials
  } = useGLTF('/ruin2-colored-lowpoly.glb') as any
  const { x, z, y: yo } = getBoardHex3DCoords(boardHex)
  const y = yo - HEXGRID_HEX_HEIGHT
  const options = getOptions(boardHex.pieceRotation)
  function getOptions(rotation: number) {
    switch (rotation) {
      case 0:
        return { rotationY: 0, xAdd: -HEXGRID_HEX_APOTHEM + 0.04, zAdd: 0.7 }
      case 1:
        return {
          rotationY: -Math.PI / 3,
          xAdd: -HEXGRID_HEX_APOTHEM - 0.1,
          zAdd: -0.4,
        }
      case 2:
        return {
          rotationY: (-Math.PI * 2) / 3,
          xAdd: -0.1,
          zAdd: -HEXGRID_HEX_RADIUS - 0.03,
        }
      case 3:
        return {
          rotationY: Math.PI,
          xAdd: HEXGRID_HEX_APOTHEM - 0.04,
          zAdd: -0.7,
        }
      case 4:
        return {
          rotationY: (Math.PI * 2) / 3,
          xAdd: HEXGRID_HEX_APOTHEM + 0.1,
          zAdd: 0.4,
        }
      case 5:
        return {
          rotationY: Math.PI / 3,
          xAdd: 0.1,
          zAdd: HEXGRID_HEX_RADIUS + 0.03,
        }
      default:
        return { rotationY: 0, xAdd: 0, zAdd: 0 }
    }
  }
  return (
    <group
      position={[x + options.xAdd, y, z + options.zAdd]}
      rotation={[0, options.rotationY, 0]}
      scale={0.039}
    >
      <mesh
        geometry={nodes.Ruin_Small_Scanned.geometry}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.ruin]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/ruin2-colored-lowpoly.glb')
