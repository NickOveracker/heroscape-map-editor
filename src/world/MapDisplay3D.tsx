import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from './maphex/MapHex3D.tsx'
import InstanceSubTerrainWrapper from './maphex/InstanceSubTerrain.tsx'
import useAppState from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, HexTerrain } from '../types.ts'
import InstanceCapWrapper from './maphex/InstanceCapWrapper.tsx'
import InstanceEmptyHexCap from './maphex/InstanceEmptyHexCap.tsx'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'
import buildupMap from '../data/terrain.ts'

export default function MapDisplay3D({
    cameraControlsRef,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    const boardHexes = useAppState((state) => state.boardHexes)
    const hoverID = React.useRef('')
    useZoomCameraToMapCenter({
        cameraControlsRef,
        boardHexes,
        // disabled: true,
    })
    React.useEffect(() => {
        // automatically load up the map while devving
        fetch('/buildup.hsc')
            .then(response => {
                return response.arrayBuffer()
            })
            .then(arrayBuffer => {
                const myMap = processVirtualScapeArrayBuffer(arrayBuffer)
                const myBuiltup = buildupMap(myMap.tiles)
                console.log("🚀 ~ React.useEffect ~ myMap:", myMap)
                console.log("🚀 ~ React.useEffect ~ myBuiltup:", myBuiltup)
            });
    }, [])





    const emptyHexCaps = Object.values(boardHexes).filter((bh) => {
        return bh.terrain === HexTerrain.empty
    })
    //   const fluidHexCaps = Object.values(boardHexes).filter((bh) => {
    //     return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
    //   })
    //   const solidHexCaps = Object.values(boardHexes).filter((bh) => {
    //     return bh.terrain !== HexTerrain.empty && !isFluidTerrainHex(bh.terrain)
    //   })
    const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button === 2) return // ignore right clicks
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        cameraControlsRef.current
        const isVoidTerrainHex = hex.terrain === HexTerrain.empty
        // if (PenMode === PenMode.eraser && !isVoidTerrainHex) {
        //   voidHex({ hexID: hex.id })
        // }
        // if (penMode === PenMode.eraserStartZone) {
        //   voidStartZone({ hexID: hex.id })
        // }
        // if (penMode === PenMode.grass) {
        //   const hexIDArr = getVSTileTemplate({
        //     clickedHex: { q: hex.q, r: hex.r, s: hex.s },
        //     rotation: rotation++ % 6,
        //     template: `${pieceSize}`, // DEV: Only land pieces will have their size as their template name, future things will have a string
        //   }).map((h) => generateHexID(h))
        //   paintGrassTile({ hexIDArr, altitude: hex.altitude })
        // }
        // // last letter in string is playerID, but this seems inelegant
        // if (penMode.slice(0, -1) === 'startZone') {
        //   paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
        // }
        // if (penMode === PenMode.water) {
        //   paintWaterHex({ hexID: hex.id })
        // }
    }
    const onPointerEnter = (_e: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        hoverID.current = hex.id
    }
    const onPointerOut = (_e: ThreeEvent<PointerEvent>) => {
        hoverID.current = ''
    }
    return (
        <>
            <InstanceCapWrapper
                capHexesArray={emptyHexCaps}
                glKey={'InstanceEmptyHexCap-'}
                component={InstanceEmptyHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
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
