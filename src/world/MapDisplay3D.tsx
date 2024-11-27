import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

import { MapHex3D } from './maphex/MapHex3D.tsx'
import useBoundStore from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, BoardHexes, HexTerrain, PenMode } from '../types.ts'
import buildupVSFileMap from '../data/buildupMap.ts'
import { isFluidTerrainHex, isJungleTerrainHex, isObstaclePieceID, isSolidTerrainHex } from '../utils/board-utils.ts'
import { getPieceByTerrainAndSize, piecesSoFar } from '../data/pieces.ts'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'
import InstanceRuinPlanes from './maphex/Ruin.tsx'
import SubTerrains from './maphex/instance/SubTerrain.tsx'
import EmptyHexes from './maphex/instance/EmptyHex.tsx'
import FluidCaps from './maphex/instance/FluidCap.tsx'
import SolidCaps from './maphex/instance/SolidCaps.tsx'

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
        const fileName = '/ruins.hsc'
        fetch(fileName)
            .then(response => {
                return response.arrayBuffer()
            })
            .then(arrayBuffer => {
                const vsMap = processVirtualScapeArrayBuffer(arrayBuffer)
                console.log("🚀 ~ React.useEffect ~ vsMap:", vsMap)
                const hexoscapeMap = buildupVSFileMap(vsMap.tiles, fileName)
                console.log("🚀 ~ React.useEffect ~ hexoscapeMap:", hexoscapeMap)
                loadMap(hexoscapeMap)
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
        const isWallWalkPen = penMode.startsWith('wallWalk')
        if (isWallWalkPen || isSolidTerrainHex(penMode) || isFluidTerrainHex(penMode)) {
            // we are painting wallWalks here as normal land, may need update in castle times
            const piece = isWallWalkPen ? piecesSoFar[penMode] : getPieceByTerrainAndSize(penMode, pieceSize)
            paintTile({
                piece,
                clickedHex: hex,
                rotation: pieceRotation,
            })
        }
        if (isObstaclePieceID(penMode) || penMode === PenMode.ruins2 || penMode === PenMode.ruins3) {
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
            <SubTerrains boardHexArr={instanceBoardHexes.subTerrainHexes} />
            <EmptyHexes
                boardHexArr={instanceBoardHexes.emptyHexCaps}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
            <SolidCaps
                boardHexArr={instanceBoardHexes.solidHexCaps}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
            <FluidCaps
                boardHexArr={instanceBoardHexes.fluidHexCaps}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            />
            <InstanceRuinPlanes
                ruinOriginHexes={instanceBoardHexes.ruinOriginHexes}
                ruinInteriorHexes={instanceBoardHexes.ruinInteriorHexes}
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

type InstanceBoardHexes = {
    subTerrainHexes: BoardHex[],
    emptyHexCaps: BoardHex[],
    solidHexCaps: BoardHex[],
    fluidHexCaps: BoardHex[],
    treeHexes: BoardHex[],
    jungleHexes: BoardHex[],
    ruinOriginHexes: BoardHex[],
    ruinInteriorHexes: BoardHex[],
}
function getInstanceBoardHexes(boardHexes: BoardHexes) {
    const boardHexArr = Object.values(boardHexes)
    return boardHexArr.reduce((result: InstanceBoardHexes, current) => {
        const isCap = current.isCap
        const isEmptyCap = isCap && current.terrain === HexTerrain.empty
        const isSolidCap = isCap && isSolidTerrainHex(current.terrain)
        const isFluidCap = isCap && isFluidTerrainHex(current.terrain)
        const isSubTerrain = isSolidTerrainHex(current.terrain) || (isJungleTerrainHex(current.terrain) && current.isObstacleOrigin)
        // const isSubTerrain = isSolidTerrainHex(current.terrain) || isFluidTerrainHex(current.terrain)
        const isTreeHex = current.terrain === HexTerrain.tree && current.isObstacleOrigin
        const isJungleHex = (current.terrain === HexTerrain.brush || current.terrain === HexTerrain.palm) && current.isObstacleOrigin
        const isRuinOriginHex = current.terrain === HexTerrain.ruin && current.isObstacleOrigin
        const isRuinInteriorHex = current.terrain === HexTerrain.ruin && current.isAuxiliary
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
        if (isJungleHex) {
            result.jungleHexes.push(current)
        }
        if (isRuinOriginHex) {
            result.ruinOriginHexes.push(current)
        }
        if (isRuinInteriorHex) {
            result.ruinInteriorHexes.push(current)
        }
        return result
    }, {
        emptyHexCaps: [],
        solidHexCaps: [],
        fluidHexCaps: [],
        subTerrainHexes: [],
        treeHexes: [],
        jungleHexes: [],
        ruinOriginHexes: [],
        ruinInteriorHexes: [],
    });

}