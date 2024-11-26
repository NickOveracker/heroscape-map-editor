import { DoubleSide } from 'three'
import { BoardHex } from '../../types'
import { getBoardHex3DCoords, hexSidesFromCenter } from '../../utils/map-utils'
import { Plane } from '@react-three/drei'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export default function RuinOriginPlane({ ruinHex }: { ruinHex: BoardHex }) {
  const rotationToPlacementO: { [key: number]: { x: number, z: number, rotation: number } } = {
    0: { x: hexSidesFromCenter.left.x, z: hexSidesFromCenter.left.z, rotation: Math.PI / 2 },
    1: { x: hexSidesFromCenter.topLeft.x, z: hexSidesFromCenter.topLeft.z, rotation: Math.PI / 6 },
    2: { x: hexSidesFromCenter.topRight.x, z: hexSidesFromCenter.topRight.z, rotation: - Math.PI / 6 },
    3: { x: hexSidesFromCenter.right.x, z: hexSidesFromCenter.right.z, rotation: -Math.PI / 2 },
    4: { x: hexSidesFromCenter.bottomRight.x, z: hexSidesFromCenter.bottomRight.z, rotation: Math.PI / 6 },
    5: { x: hexSidesFromCenter.bottomLeft.x, z: hexSidesFromCenter.bottomLeft.z, rotation: -Math.PI / 6 },
  }
  const { x, z } = getBoardHex3DCoords(ruinHex)
  const wallHeight = 6 * HEXGRID_HEX_HEIGHT
  const y = (ruinHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (wallHeight / 2)
  const addX = x + rotationToPlacementO[ruinHex.pieceRotation].x
  const addZ = z + rotationToPlacementO[ruinHex.pieceRotation].z
  return (
    <Plane
      args={[1, wallHeight]}
      position={[addX, y, addZ]}
      rotation={[0, rotationToPlacementO[ruinHex.pieceRotation].rotation, 0]}
    >
      <meshLambertMaterial side={DoubleSide} />
    </Plane>
  )
}
export function RuinInteriorPlanes({ ruinHex }: { ruinHex: BoardHex }) {
  const rotationToPlacementI: { [key: number]: { x: number, z: number, rotation: number } } = {
    0: { x: hexSidesFromCenter.bottomRight.x, z: hexSidesFromCenter.bottomRight.z, rotation: Math.PI / 6 },
    1: { x: hexSidesFromCenter.bottomLeft.x, z: hexSidesFromCenter.bottomLeft.z, rotation: -Math.PI / 6 },
    2: { x: hexSidesFromCenter.left.x, z: hexSidesFromCenter.left.z, rotation: Math.PI / 2 },
    3: { x: hexSidesFromCenter.topLeft.x, z: hexSidesFromCenter.topLeft.z, rotation: Math.PI / 6 },
    4: { x: hexSidesFromCenter.topRight.x, z: hexSidesFromCenter.topRight.z, rotation: - Math.PI / 6 },
    5: { x: hexSidesFromCenter.right.x, z: hexSidesFromCenter.right.z, rotation: -Math.PI / 2 },
  }
  const { x, z } = getBoardHex3DCoords(ruinHex)
  const wallHeight = 6 * HEXGRID_HEX_HEIGHT
  const y = (ruinHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (wallHeight / 2)
  // the origin hex plants a plane to the right at rotation 0
  // the interior hexes, including the origin hex, plant a plane the bottom-left and bottom-right
  // they rotate through our mapping object ^^rotationToPlacement backwards from how our origin plane is rotated
  const addX = x + rotationToPlacementI[ruinHex.pieceRotation].x
  const addZ = z + rotationToPlacementI[ruinHex.pieceRotation].z
  const addX2 = x + rotationToPlacementI[(ruinHex.pieceRotation + 1) % 6].x
  const addZ2 = z + rotationToPlacementI[(ruinHex.pieceRotation + 1) % 6].z
  return (
    <>
      <Plane
        args={[1, wallHeight]}
        position={[addX, y, addZ]}
        rotation={[0, rotationToPlacementI[ruinHex.pieceRotation].rotation, 0]}
      >
        <meshLambertMaterial side={DoubleSide} />
      </Plane>
      <Plane
        args={[1, wallHeight]}
        position={[addX2, y, addZ2]}
        rotation={[0, rotationToPlacementI[(ruinHex.pieceRotation + 1) % 6].rotation, 0]}
      >
        <meshLambertMaterial side={DoubleSide} />
      </Plane>
    </>
  )
}