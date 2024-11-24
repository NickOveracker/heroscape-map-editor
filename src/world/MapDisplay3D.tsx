import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { MapHex3D } from './maphex/MapHex3D.tsx'
import InstanceSubTerrainWrapper from './maphex/InstanceSubTerrain.tsx'
import useBoundStore from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, BoardHexes, HexTerrain, PenMode } from '../types.ts'
import InstanceCapWrapper from './maphex/InstanceCapWrapper.tsx'
import InstanceEmptyHexCap from './maphex/InstanceEmptyHexCap.tsx'
import buildupVSFileMap from '../data/buildupMap.ts'
import { isFluidTerrainHex, isObstaclePieceID, isSolidTerrainHex } from '../utils/board-utils.ts'
import InstanceFluidHexCap from './maphex/InstanceFluidHexCap.tsx'
import InstanceSolidHexCap from './maphex/InstanceSolidHexCap.tsx'
import { Dictionary } from 'lodash'
import { getPieceByTerrainAndSize, piecesSoFar } from '../data/pieces.ts'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'
import InstanceForestTreeWrapper from './maphex/InstanceForestTree.tsx'

export default function MapDisplay3D({
    cameraControlsRef,
}: {
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    const boardHexes = useBoundStore((state) => state.boardHexes)
    const penMode = useBoundStore((state) => state.penMode)
    const paintTile = useBoundStore((state) => state.paintTile)
    const loadMap = useBoundStore((state) => state.loadMap)
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
                const myVirtualscapeMap = buildupVSFileMap(myMap.tiles, fileName)
                loadMap(myVirtualscapeMap)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const instanceBoardHexes = getInstanceBoardHexes(boardHexes)

    const onPointerDown = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button !== 0) return // ignore right clicks(2), middle mouse clicks(1)
        event.stopPropagation()
        // Early out if camera is active
        if (cameraControlsRef.current.active) return
        const isEmptyHex = hex.terrain === HexTerrain.empty
        if (penMode === PenMode.select) {
            // select hex / piece
        }
        if (penMode === PenMode.eraser && !isEmptyHex) {
            // erase tile
        }
        if (penMode === PenMode.eraser && isEmptyHex) {
            return
        }
        if (penMode === PenMode.eraserStartZone) {
            // erase start zone
        }
        // last letter in string is playerID
        if (penMode.slice(0, -1) === 'startZone') {
            // paintStartZone({ hexID: hex.id, playerID: penMode.slice(-1) })
        }
        if (isSolidTerrainHex(penMode) || isFluidTerrainHex(penMode)) {
            const piece = getPieceByTerrainAndSize(penMode, pieceSize)
            paintTile({
                piece,
                clickedHex: hex,
                rotation: pieceRotation,
            })
        }
        if (isObstaclePieceID(penMode)) {
            const piece = piecesSoFar[penMode]
            paintTile({
                piece,
                clickedHex: hex,
                rotation: pieceRotation,
            })
        }
    }
    const onPointerEnter = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        event.stopPropagation()
        hoverID.current = hex.id
    }
    const onPointerOut = () => {
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
                subTerrainHexes={instanceBoardHexes.subTerrainHexes}
            />
            <InstanceForestTreeWrapper
                glKey={'InstanceForestTree-'}
                treeHexes={instanceBoardHexes.treeHexes}
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

function getInstanceBoardHexes(boardHexes: BoardHexes) {
    const boardHexArr = Object.values(boardHexes)
    return boardHexArr.reduce((result: Dictionary<BoardHex[]>, current) => {
        const isCap = current.isCap
        const isEmptyCap = isCap && current.terrain === HexTerrain.empty
        const isSolidCap = isCap && isSolidTerrainHex(current.terrain)
        const isFluidCap = isCap && isFluidTerrainHex(current.terrain)
        const isSubTerrain = isSolidTerrainHex(current.terrain)
        const isTreeHex = current.terrain === HexTerrain.tree && current.isObstacleOrigin
        if (isEmptyCap) {
            result.emptyHexCaps.push(current)
        }
        if (isSolidCap) {
            result.solidHexCaps.push(current)
        }
        if (isFluidCap) {
            result.fluidHexCaps.push(current)
        }
        if (isSubTerrain) {
            result.subTerrainHexes.push(current)
        }
        if (isTreeHex) {
            result.treeHexes.push(current)
        }
        return result
    }, {
        emptyHexCaps: [],
        solidHexCaps: [],
        fluidHexCaps: [],
        subTerrainHexes: [],
        treeHexes: [],

    });

}