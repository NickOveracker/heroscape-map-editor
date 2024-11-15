import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from './maphex/MapHex3D.tsx'
import InstanceSubTerrainWrapper from './maphex/InstanceSubTerrain.tsx'
import useAppState from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, HexTerrain } from '../types'

export default function MapEditor({
    cameraControlsRef,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    const boardHexes = useAppState((state) => state.boardHexes)
    useZoomCameraToMapCenter({
        cameraControlsRef,
        boardHexes,
        disabled: true,
    })
    const onPointerDown = (event: ThreeEvent<PointerEvent>, _hex: BoardHex) => {
        if (event.button === 2) return // ignore right clicks
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        cameraControlsRef.current
        console.log("🚀 ~ onPointerDown ~ onPointerDown:", onPointerDown)
    }
    return (
        <>
            <InstanceSubTerrainWrapper
                glKey={'InstanceSubTerrain-'}
                boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))}
            />
            {Object.values(boardHexes).map((bh => {
                return (
                    <MapHex3D
                        key={bh.id}
                        boardHex={bh}
                    />
                )
            }))}
        </>
    )
}
