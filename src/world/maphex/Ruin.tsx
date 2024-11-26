import { DoubleSide } from 'three'
import { BoardHex } from '../../types'
import { getBoardHex3DCoords, hexPointsFromCenter } from '../../utils/map-utils'
import { Plane } from '@react-three/drei'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export default function Ruin({ ruinHex }: { ruinHex: BoardHex }) {
  const { x, z } = getBoardHex3DCoords(ruinHex)
  const wallHeight = 6 * HEXGRID_HEX_HEIGHT
  const y = (ruinHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (wallHeight / 2)
  const rotationToSomething: { [key: number]: { x: number, z: number, rotation: number } } = {
    0: { x: hexPointsFromCenter.topLeft.x, z: hexPointsFromCenter.topLeft.y, rotation: Math.PI / 2 },
    1: { x: hexPointsFromCenter.top.x, z: hexPointsFromCenter.top.y, rotation: Math.PI / 2 },
    2: { x: hexPointsFromCenter.topRight.x, z: hexPointsFromCenter.topRight.y, rotation: Math.PI / 2 },
    3: { x: hexPointsFromCenter.bottomRight.x, z: hexPointsFromCenter.bottomRight.y, rotation: Math.PI / 2 },
    4: { x: hexPointsFromCenter.bottom.x, z: hexPointsFromCenter.bottom.y, rotation: Math.PI / 2 },
    5: { x: hexPointsFromCenter.bottomLeft.x, z: hexPointsFromCenter.bottomLeft.y, rotation: Math.PI / 2 },
  }
  const addX = x + rotationToSomething[ruinHex.pieceRotation].x
  const addZ = z + rotationToSomething[ruinHex.pieceRotation].z
  // rotations: 
  // 0: left
  // 1: top-left
  // etc. etc.
  return (
    <group>
      <Plane
        args={[1, wallHeight]}
        position={[addX, y, addZ]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshLambertMaterial side={DoubleSide} />
      </Plane>
    </group>
  )
}