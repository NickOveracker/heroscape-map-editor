import React from 'react'
import { CameraControls } from '@react-three/drei'
import { getMapCenterCameraLookAt } from '../utils/camera-utils'
import { BoardHexes } from '../types'

export const useZoomCameraToMapCenter = ({
    cameraControlsRef,
    boardHexes,
    mapID,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
    boardHexes: BoardHexes
    mapID: string
}) => {
    React.useEffect(() => {
        const cameraArgs = getMapCenterCameraLookAt(boardHexes)
        cameraControlsRef?.current?.setLookAt?.(...cameraArgs)
        // only run on render and load-new-map
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapID])
}
