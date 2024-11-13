import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import React from 'react'
import { BoardHex, BoardHexes, HexTerrain } from '../types'
import { isFluidTerrainHex } from '../utils/board-utils.ts'
import InstanceSubTerrainWrapper from './InstanceSubTerrain.tsx'
import { useZoomCameraToMapCenter } from '../hooks/useZoomeCameraToMapCenter.tsx'
import { MapHex3D } from './MapHex3D.tsx'

export default function MapEditor({
    boardHexes,
    hexMapID,
    //   glyphs,
    cameraControlsRef,
}: {
    boardHexes: BoardHexes
    hexMapID: string
    //   glyphs: Glyphs
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    // useZoomCameraToMapCenter({
    //     cameraControlsRef,
    //     boardHexes,
    //     mapID: hexMapID,
    // })
    //   const { penMode, pieceSize } = useHexxaformContext()
    const hoverID = React.useRef('')

    const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button === 2) return // ignore right clicks
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        cameraControlsRef.current
        console.log("🚀 ~ onPointerDown ~ onPointerDown:", onPointerDown)
    }

    const emptyHexCaps = Object.values(boardHexes).filter((bh) => {
        return bh.terrain === HexTerrain.empty
    })
    const fluidHexCaps = Object.values(boardHexes).filter((bh) => {
        return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
    })
    const solidHexCaps = Object.values(boardHexes).filter((bh) => {
        return bh.terrain !== HexTerrain.empty && !isFluidTerrainHex(bh.terrain)
    })
    const onPointerEnter = (_e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        hoverID.current = hex.id
    }
    const onPointerOut = (_e: ThreeEvent<PointerEvent>) => {
        hoverID.current = ''
    }

    return (
        <>

            <InstanceSubTerrainWrapper
                glKey={'InstanceSubTerrain-'}
                boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))}
            />
            {/* <HeightRings /> */}
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
