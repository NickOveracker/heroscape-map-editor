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
import { Dictionary } from 'lodash'
import { getPieceByTerrainAndSize } from '../data/pieces.ts'

export default function MapDisplay3D({
    cameraControlsRef,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    const boardHexes = useBoundStore((state) => state.boardHexes)
    const penMode = useBoundStore((state) => state.penMode)
    const paintTile = useBoundStore((state) => state.paintTile)
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

    const instanceBoardHexes = getInstanceBoardHexes(Object.values(boardHexes))

    const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button === 2) return // ignore right clicks
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        cameraControlsRef.current
        const isEmptyHex = hex.terrain === HexTerrain.empty
        if (penMode === PenMode.select) {
            // select hex / piece
        }
        if (penMode === PenMode.eraser && !isEmptyHex) {
            // erase tile
        }
        if (penMode === PenMode.eraserStartZone) {
            // erase start zone
        }
        // last letter in string is playerID
        if (penMode.slice(0, -1) === 'startZone') {
            // paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
        }
        // OTHERWISE, PAINT TILE
        // if (penMode === PenMode.grass) {
        const piece = getPieceByTerrainAndSize(penMode, pieceSize)
        paintTile({
            piece,
            clickedHex: hex,
            rotation: pieceRotation,
            altitude: hex.altitude + 1,
        })
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

function getInstanceBoardHexes(boardHexes: BoardHex[]): Dictionary<BoardHex[]> {
    return boardHexes.reduce((result, current) => {
        const isEmpty = current.terrain === HexTerrain.empty
        const isCap = current.isCap
        const isSolidCap = isCap && !isEmpty && isSolidTerrainHex(current.terrain)
        const isFluidCap = isCap && !isEmpty && isFluidTerrainHex(current.terrain)
        if (isEmpty) {
            // empty caps should all be altitude 0, also
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

}