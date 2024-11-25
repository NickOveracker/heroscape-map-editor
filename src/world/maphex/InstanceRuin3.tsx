import { DoubleSide } from 'three'
import { BoardHex } from '../../types'
import { getBoardHex3DCoords, hexPointsFromCenter } from '../../utils/map-utils'
import { Plane } from '@react-three/drei'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export const MergedRuin3 = ({ ruinHex }: { ruinHex: BoardHex }) => {
  const { x, y, z } = getBoardHex3DCoords(ruinHex)
  console.log("🚀 ~ MergedRuin ~ y", y)
  const wallHeight = 6 * HEXGRID_HEX_HEIGHT
  return (
    <group>
      <Plane
        args={[1, wallHeight]}
        position={[x + hexPointsFromCenter.topLeft.x, y - HEXGRID_HEX_HEIGHT + wallHeight / 2, z + hexPointsFromCenter.topLeft.y]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshLambertMaterial side={DoubleSide} />
      </Plane>
    </group>
  )
}

// const ruin3Vertices = new Float32Array([
//   hexPointsFromCenter.topLeft.x, hexPointsFromCenter.topLeft.y, hexPointsFromCenter.topLeft.z, // v0
//   hexPointsFromCenter.bottomLeft.x, hexPointsFromCenter.bottomLeft.y, hexPointsFromCenter.bottomLeft.z, // v1
//   hexPointsFromCenter.topLeft.x, hexPointsFromCenter.topLeft.y, 9, // v2

//   hexPointsFromCenter.topLeft.x, hexPointsFromCenter.topLeft.y, 9, // v3
//   hexPointsFromCenter.topLeft.x, hexPointsFromCenter.topLeft.y, 9, // v4
//   hexPointsFromCenter.bottomLeft.x, hexPointsFromCenter.bottomLeft.y, hexPointsFromCenter.bottomLeft.z,  // v5
// ]);