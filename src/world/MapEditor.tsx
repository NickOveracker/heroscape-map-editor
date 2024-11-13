import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import React from 'react'
import { BoardHex, BoardHexes, HexTerrain } from '../types'
import { isFluidTerrainHex } from '../utils/board-utils.ts'

// import {
//   BoardHex,
//   BoardHexes,
//   HexTerrain,
// } from '../../game/types'
// import { MapHex3D } from '../../shared/MapHex3D'
// import { HexxaformMoves, PenMode } from '../../game/hexxaform/hexxaform-types'
// import { useHexxaformContext } from '../useHexxaformContext'
// import getVSTileTemplate from '../virtualscape/tileTemplates'
// import { generateHexID, isFluidTerrainHex } from '../../game/constants'
// import InstanceSubTerrainWrapper from '../../shared/world/InstanceSubTerrain'
// import InstanceCapWrapper from '../../shared/world/InstanceCapWrapper'
// import InstanceEmptyHexCap from '../../shared/world/InstanceEmptyHexCap'
// import InstanceFluidHexCap from '../../shared/world/InstanceFluidHexCap'
// import InstanceSolidHexCap from '../../shared/world/InstanceSolidHexCap'
// import { useZoomCameraToMapCenter } from '../../hooks/useZoomCameraToMapCenter'


let rotation = 0

export function HexxaformMapDisplay3D({
    boardHexes,
    //   hexMapID,
    //   glyphs,
    cameraControlsRef,
}: {
    boardHexes: BoardHexes
    hexMapID: string
    //   glyphs: Glyphs
    cameraControlsRef: React.MutableRefObject<CameraControls>
}) {
    //   useZoomCameraToMapCenter({
    //     cameraControlsRef,
    //     boardHexes,
    //     mapID: hexMapID,
    //   })
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
            {/* <InstanceCapWrapper
                capHexesArray={emptyHexCaps}
                glKey={'InstanceEmptyHexCap-'}
                component={InstanceEmptyHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            /> */}

            {/* <InstanceCapWrapper
                capHexesArray={fluidHexCaps}
                glKey={'InstanceFluidHexCap-'}
                component={InstanceFluidHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            /> */}

            {/* <InstanceCapWrapper
                capHexesArray={solidHexCaps}
                glKey={'InstanceSolidHexCap-'}
                component={InstanceSolidHexCap}
                onPointerEnter={onPointerEnter}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
            /> */}

            {/* <InstanceSubTerrainWrapper glKey={'InstanceSubTerrain-'} boardHexes={Object.values(boardHexes).filter(bh => !(bh.terrain === HexTerrain.empty))} /> */}

        </>
    )
}


// {Object.values(boardHexes).map((bh: any) => {
//     return (
//         <MapHex3D
//             playerID={'0'}
//             boardHex={bh}
//             glyphs={glyphs}
//             selectedUnitMoveRange={{}}
//             isEditor={true}
//             key={`${bh.id}-${bh.altitude}`}
//         />
//     )
// })}