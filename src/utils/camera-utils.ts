import { CAMERA_FOV } from '../utils/constants'
import { getBoardHexesRectangularMapDimensions } from '../utils/map-utils'
import { BoardHexes } from '../types'

type CameraLookAtArgs = [
  // positionX
  number,
  // positionY
  number,
  // positionZ
  number,
  // targetX
  number,
  // targetY
  number,
  // targetZ
  number,
  // enableTransition
  boolean,
]

export const getMapCenterCameraLookAt = (
  boardHexes: BoardHexes
): CameraLookAtArgs => {
  const { width, height } = getBoardHexesRectangularMapDimensions(boardHexes)
  /* 
  TODO: This will need to be updated: Find width and height,
  then ascend a bit from apex, not from base (what if apex is fat?) 
  */
  const alpha = CAMERA_FOV / 2
  const beta = 90 - alpha
  const y = (width / 2) * Math.tan(beta) // far enough to see all of bottom of map even if it wall at the apex of the map
  const centerOfMapCamera = {
    x: width / 2,
    z: height,
    y: y,
  }
  const centerOfMapLookAt = {
    x: width / 2,
    z: height / 2,
    y: 0,
  }
  return [
    // from
    centerOfMapCamera.x,
    centerOfMapCamera.y,
    centerOfMapCamera.z,
    // at
    centerOfMapLookAt.x,
    centerOfMapLookAt.y,
    centerOfMapLookAt.z,
    false,
  ]
}
