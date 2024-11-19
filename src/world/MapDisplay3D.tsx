import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from './maphex/MapHex3D.tsx'
import InstanceSubTerrainWrapper from './maphex/InstanceSubTerrain.tsx'
import useBoundStore from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, HexTerrain, PenMode } from '../types.ts'
import InstanceCapWrapper from './maphex/InstanceCapWrapper.tsx'
import InstanceEmptyHexCap from './maphex/InstanceEmptyHexCap.tsx'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'
import buildupMap from '../data/buildupMap.ts'
import { isFluidTerrainHex, isSolidTerrainHex } from '../utils/board-utils.ts'
import InstanceFluidHexCap from './maphex/InstanceFluidHexCap.tsx'
import InstanceSolidHexCap from './maphex/InstanceSolidHexCap.tsx'
import { produce } from 'immer'

export default function MapDisplay3D({
    cameraControlsRef,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    const boardHexes = useBoundStore((state) => state.boardHexes)
    const penMode = useBoundStore((state) => state.penMode)
    const pieceSize = useBoundStore((state) => state.pieceSize)
    const pieceRotation = useBoundStore((state) => state.pieceRotation)
    const hoverID = React.useRef('')
    useZoomCameraToMapCenter({
        cameraControlsRef,
        boardHexes,
        // disabled: true, // for when working on camera stuff
    })

    // USE EFFECT: automatically load up the map while devving
    React.useEffect(() => {
        const fileName = '/buildup.hsc'
        fetch(fileName)
            .then(response => {
                return response.arrayBuffer()
            })
            .then(arrayBuffer => {
                const myMap = processVirtualScapeArrayBuffer(arrayBuffer)
                const myBuiltup = buildupMap(myMap.tiles)
                console.log(`🚀 ~ React.useEffect ~ myMap: ${fileName}`, myMap)
                console.log(`🚀 ~ React.useEffect ~ myBuiltup: ${fileName}`, myBuiltup)
            });
    }, [])
    const instanceBoardHexes = Object.values(boardHexes).reduce((result, current) => {
        const isEmpty = current.terrain === HexTerrain.empty
        const isCap = current.isCap
        const isSolidCap = isCap && !isEmpty && isSolidTerrainHex(current.terrain)
        const isFluidCap = isCap && !isEmpty && isFluidTerrainHex(current.terrain)
        if (isEmpty) {
            result.emptyHexCaps.push(current)
        }
        if (isSolidCap) {
            result.solidHexCaps.push(current)
            result.hexCaps.push(current)
        }
        if (isFluidCap) {
            result.fluidHexCaps.push(current)
            result.hexCaps.push(current)
        }
        return result
    }, {
        emptyHexCaps: [],
        solidHexCaps: [],
        fluidHexCaps: [],
        hexCaps: []
    });

    // empty caps should all be altitude 0, also
    // const emptyHexCaps = Object.values(boardHexes).filter((bh) => {
    //     return bh.terrain === HexTerrain.empty
    // })
    // const fluidHexCaps = Object.values(boardHexes).filter((bh) => {
    //     return bh.terrain !== HexTerrain.empty && isFluidTerrainHex(bh.terrain)
    // })
    // const solidHexCaps = Object.values(boardHexes).filter((bh) => {
    //     return bh.terrain !== HexTerrain.empty && isSolidTerrainHex(bh.terrain)
    // })
    const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button === 2) return // ignore right clicks
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        cameraControlsRef.current
        const isVoidTerrainHex = hex.terrain === HexTerrain.empty
        if (penMode === PenMode.eraser && !isVoidTerrainHex) {
            // voidHex({ hexID: hex.id })
        }
        if (penMode === PenMode.eraserStartZone) {
            // voidStartZone({ hexID: hex.id })
        }
        if (penMode === PenMode.grass) {
            // paintGrassTile({ hexIDArr, altitude: hex.altitude })
        }
        // last letter in string is playerID
        if (penMode.slice(0, -1) === 'startZone') {
            // paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
        }
        // if (penMode === PenMode.water) {
        //     paintWaterHex({ hexID: hex.id })
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
                capHexesArray={instanceBoardHexes.emptyHexCaps}
                glKey={'InstanceEmptyHexCap-'}
                component={InstanceEmptyHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
            <InstanceCapWrapper
                capHexesArray={instanceBoardHexes.fluidHexCaps}
                glKey={'InstanceFluidHexCap-'}
                component={InstanceFluidHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
            <InstanceCapWrapper
                capHexesArray={instanceBoardHexes.solidHexCaps}
                glKey={'InstanceSolidHexCap-'}
                component={InstanceSolidHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />

            <InstanceSubTerrainWrapper
                glKey={'InstanceSubTerrain-'}
                boardHexes={instanceBoardHexes.hexCaps}
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
