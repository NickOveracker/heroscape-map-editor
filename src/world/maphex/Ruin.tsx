import { DoubleSide } from 'three'
import { BoardHex } from '../../types'
import { getBoardHex3DCoords, hexSidesFromCenter } from '../../utils/map-utils'
import { Plane } from '@react-three/drei'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export default function Ruin({ ruinHex }: { ruinHex: BoardHex }) {
  const { x, z } = getBoardHex3DCoords(ruinHex)
  const wallHeight = 6 * HEXGRID_HEX_HEIGHT
  const y = (ruinHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (wallHeight / 2)
  const rotationToSomething: { [key: number]: { x: number, z: number, rotation: number } } = {
    0: { x: hexSidesFromCenter.left.x, z: hexSidesFromCenter.left.z, rotation: Math.PI / 2 },
    1: { x: hexSidesFromCenter.topLeft.x, z: hexSidesFromCenter.topLeft.z, rotation: Math.PI },
    2: { x: hexSidesFromCenter.topRight.x, z: hexSidesFromCenter.topRight.z, rotation: - Math.PI / 6 },
    3: { x: hexSidesFromCenter.right.x, z: hexSidesFromCenter.right.z, rotation: -Math.PI / 2 },
    4: { x: hexSidesFromCenter.bottomRight.x, z: hexSidesFromCenter.bottomRight.z, rotation: Math.PI / 2 },
    5: { x: hexSidesFromCenter.bottomLeft.x, z: hexSidesFromCenter.bottomLeft.z, rotation: Math.PI / 2 },
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