import React from 'react'
import { CameraControls } from '@react-three/drei'
import { getMapCenterCameraLookAt } from '../../utils/camera-utils'
import { BoardHexes } from '../../types'
import useBoundStore from '../../store/store'

export const useZoomCameraToMapCenter = ({
  cameraControlsRef,
  boardHexes,
  disabled,
}: {
  cameraControlsRef: React.RefObject<CameraControls>
  boardHexes: BoardHexes
  disabled?: boolean
}) => {
  const mapID = useBoundStore((state) => state.hexMap.id)
  const mapShape = useBoundStore((state) => state.hexMap.shape)
  React.useEffect(() => {
    if (disabled) {
      console.warn('Zoom to center of map has been disabled!')
      return
    }
    const cameraArgs = getMapCenterCameraLookAt(boardHexes, mapShape)
    cameraControlsRef?.current?.setLookAt?.(...cameraArgs)
    // only run on render and load-new-map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapID])
}
