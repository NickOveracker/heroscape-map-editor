import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

import { MapHex3D } from './maphex/MapHex3D.tsx'
import useBoundStore from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, HexTerrain, PenMode } from '../types.ts'
import buildupVSFileMap from '../data/buildupMap.ts'
import { isFluidTerrainHex, isJungleTerrainHex, isObstaclePieceID, isSolidTerrainHex } from '../utils/board-utils.ts'
import { getPieceByTerrainAndSize, piecesSoFar } from '../data/pieces.ts'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'
import SubTerrains from './maphex/instance/SubTerrain.tsx'
import EmptyHexes from './maphex/instance/EmptyHex.tsx'
import FluidCaps from './maphex/instance/FluidCap.tsx'
import SolidCaps from './maphex/instance/SolidCaps.tsx'
import { genBoardHexID } from '../utils/map-utils.ts'

export default function MapDisplay3D({
    cameraControlsRef,
}: {
    cameraControlsRef: React.RefObject<CameraControls>
}) {
    const boardHexes = useBoundStore((state) => state.boardHexes)
    const boardHexesArr = Object.values(boardHexes)
    const penMode = useBoundStore((state) => state.penMode)
    const paintTile = useBoundStore((state) => state.paintTile)
    const loadMap = useBoundStore((state) => state.loadMap)
    const pieceSize = useBoundStore((state) => state.pieceSize)
    const pieceRotation = useBoundStore((state) => state.pieceRotation)
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
                const hexoscapeMap = buildupVSFileMap(vsMap.tiles, vsMap.name)
                loadMap(hexoscapeMap)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const instanceBoardHexes = getInstanceBoardHexes(boardHexesArr)

    const onPointerUp = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
        if (event.button !== 0) return // ignore right clicks(2), middle mouse clicks(1)
        event.stopPropagation() // forgot what this is preventing
        // Early out if camera is active
        if (cameraControlsRef?.current?.active) return
        /* 
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
        */
        const isWallWalkPen = penMode.startsWith('wallWalk')
        const isCastleBasePen = penMode.startsWith('castleBase')
        const isCastleWallArchPen = penMode.startsWith('castleWall') || penMode.startsWith('castleArch')
        if (isWallWalkPen || isCastleBasePen || isCastleWallArchPen || isSolidTerrainHex(penMode) || isFluidTerrainHex(penMode)) {
            const boardHexOfCapForWall = genBoardHexID({ ...hex, altitude: hex.altitude + (hex?.obstacleHeight ?? 0) })
            const isCastleWallArchClicked = hex.pieceID.includes('castleWall') || hex.pieceID.includes('castleArch')
            const clickedHex = (isCastleWallArchClicked) ? boardHexes[boardHexOfCapForWall] : hex
            const piece = (isWallWalkPen || isCastleBasePen || isCastleWallArchPen) ? piecesSoFar[penMode] : getPieceByTerrainAndSize(penMode, pieceSize)
            console.log("🚀 ~ onPointerUp ~ clickedHex:", clickedHex)
            paintTile({
                piece,
                clickedHex: clickedHex,
                rotation: pieceRotation,
            })
        }
        if (isObstaclePieceID(penMode) || penMode === PenMode.ruins2 || penMode === PenMode.ruins3) {
            paintTile({
                piece: piecesSoFar[penMode],
                clickedHex: hex,
                rotation: pieceRotation,
            })
        }
    }

    return (
        <>
            <SubTerrains boardHexArr={instanceBoardHexes.subTerrainHexes} />
            <EmptyHexes
                boardHexArr={instanceBoardHexes.emptyHexCaps}
                onPointerUp={onPointerUp}
            />
            <SolidCaps
                boardHexArr={instanceBoardHexes.solidHexCaps}
                onPointerUp={onPointerUp}
            />
            <FluidCaps
                boardHexArr={instanceBoardHexes.fluidHexCaps}
                onPointerUp={onPointerUp}
            />
            {boardHexesArr.map((bh => {
                return (
                    <MapHex3D
                        key={bh.id}
                        boardHex={bh}
                        onPointerUp={onPointerUp}
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
}
function getInstanceBoardHexes(boardHexesArr: BoardHex[]) {
    return boardHexesArr.reduce((result: InstanceBoardHexes, current) => {
        const isCap = current.isCap
        const isEmptyCap = isCap && current.terrain === HexTerrain.empty
        const isSolidCap = isCap && isSolidTerrainHex(current.terrain)
        const isFluidCap = isCap && isFluidTerrainHex(current.terrain)
        const isSubTerrain = isSolidTerrainHex(current.terrain) || (isJungleTerrainHex(current.terrain) && current.isObstacleOrigin)
        // const isSubTerrain = isSolidTerrainHex(current.terrain) || isFluidTerrainHex(current.terrain)
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
        return result
    }, {
        emptyHexCaps: [],
        solidHexCaps: [],
        fluidHexCaps: [],
        subTerrainHexes: [],
    });

}