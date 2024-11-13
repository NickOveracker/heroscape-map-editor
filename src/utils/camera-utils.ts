import { CAMERA_FOV, HEXGRID_HEX_HEIGHT } from '../utils/constants'
import { getBoardHexesRectangularMapDimensions, getBoardHex3DCoords } from '../utils/map-utils'
import { BoardHex, BoardHexes } from '../types'

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
  const alpha = CAMERA_FOV / 2
  const beta = 90 - alpha // 180 degrees in a right-triangle
  const heightCameraFitMapInFov = (width / 2) * Math.tan(beta)
  const centerOfMapCamera = {
    x: width / 2,
    // z: height / 2,
    z: height, // let's try looking more eschew
    y: heightCameraFitMapInFov,
  }
  const centerOfMapLookAt = {
    x: width / 2,
    // z: height / 2,
    z: height / 2, // let's try looking more eschew
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
export const getUnitDefaultCameraLookAt = (
  boardHex: BoardHex,
  boardHexes: BoardHexes
): CameraLookAtArgs => {
  const { width, height } = getBoardHexesRectangularMapDimensions(boardHexes)
  const { x, z } = getBoardHex3DCoords(boardHex)
  const hexHeight = boardHex.altitude * HEXGRID_HEX_HEIGHT
  const lilExtra = 10
  const y = hexHeight + lilExtra
  const unitOverheadCamera = {
    x,
    z,
    y,
  }
  const centerOfMapLookAt = {
    x: width / 2,
    z: height / 2,
    y: 0,
  }
  const midpointOfUnitAndCenterOfMap = {
    x: (unitOverheadCamera.x + centerOfMapLookAt.x) / 2,
    z: (unitOverheadCamera.z + centerOfMapLookAt.z) / 2,
    y: 0,
  }
  return [
    // from
    unitOverheadCamera.x,
    unitOverheadCamera.y,
    unitOverheadCamera.z,
    // at
    midpointOfUnitAndCenterOfMap.x,
    midpointOfUnitAndCenterOfMap.y,
    midpointOfUnitAndCenterOfMap.z,
    true,
  ]
}
