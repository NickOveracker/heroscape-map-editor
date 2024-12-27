import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

import { MapHex3D } from './maphex/MapHex3D.tsx'
import useBoundStore from '../store/store.ts'
import { useZoomCameraToMapCenter } from './camera/useZoomeCameraToMapCenter.tsx'
import { BoardHex, BoardPieces, HexTerrain, PenMode, Pieces } from '../types.ts'
import {
  isFluidTerrainHex,
  isJungleTerrainHex,
  isObstaclePieceID,
  isSolidTerrainHex,
} from '../utils/board-utils.ts'
import { getPieceByTerrainAndSize, piecesSoFar } from '../data/pieces.ts'
import SubTerrains from './maphex/instance/SubTerrain.tsx'
import EmptyHexes from './maphex/instance/EmptyHex.tsx'
import FluidCaps from './maphex/instance/FluidCap.tsx'
import SolidCaps from './maphex/instance/SolidCaps.tsx'
import { genBoardHexID } from '../utils/map-utils.ts'
import buildupVSFileMap, { buildupJsonFileMap } from '../data/buildupMap.ts'
import { useLocation } from 'react-router-dom'
import JSONCrush from 'jsoncrush'
import { genRandomMapName } from '../utils/genRandomMapName.ts'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile.ts'

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}


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
  const queryParams = useQuery();
  // USE EFFECT: automatically load up map from URL
  React.useEffect(() => {
    const urlMapString = queryParams.get('m')
    if (urlMapString) {
      try {
        const data = JSON.parse(JSONCrush.uncrush(urlMapString))
        const [hexMap, ...pieceIds] = data
        const boardPieces: BoardPieces = pieceIds.reduce((prev: BoardPieces, curr: string) => {
          // get inventory id from pieceID (a,q,r,id)
          prev[curr] = curr.split('.')[4] as Pieces
          return prev
        }, {})
        const jsonMap = buildupJsonFileMap(boardPieces, hexMap)
        if (!jsonMap.hexMap.name) {
          jsonMap.hexMap.name = genRandomMapName()
        }
        loadMap(jsonMap)

      } catch (error) {
        console.error("🚀 ~ React.useEffect ~ error:", error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // USE EFFECT: automatically load up GZIP/JSON map (browser fetch auto unzips gz to json)
  // React.useEffect(() => {
  //   const fileName = '/coolmap.gz'
  //   fetch(fileName).then(async (response) => {
  //     // const data = response.json()
  //     const data = await response.json()
  //     const jsonMap = buildupJsonFileMap(data.boardPieces, data.hexMap)
  //     if (!jsonMap.hexMap.name) {
  //       jsonMap.hexMap.name = fileName
  //     }
  //     loadMap(jsonMap)
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // USE EFFECT: automatically load up VS map
  React.useEffect(() => {
    const fileName = '/testMap.hsc'
    fetch(fileName)
      .then((response) => {
        return response.arrayBuffer()
      })
      .then(async (arrayBuffer) => {
        const vsFileData = processVirtualScapeArrayBuffer(arrayBuffer)
        const vsMap = buildupVSFileMap(vsFileData.tiles, vsFileData.name)
        loadMap(vsMap)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const instanceBoardHexes = getInstanceBoardHexes(boardHexesArr)

  const onPointerUp = (event: ThreeEvent<PointerEvent>, hex: BoardHex) => {
    if (event.button !== 0) return // ignore right clicks(2), middle mouse clicks(1)
    event.stopPropagation() // prevent pass through
    // Early out if camera is active
    if (cameraControlsRef?.current?.active) return

    const isWallWalkPen = penMode.startsWith('wallWalk')
    const isCastleBasePen = penMode.startsWith('castleBase')
    const isCastleWallArchPen =
      penMode.startsWith('castleWall') || penMode.startsWith('castleArch')
    if (
      isWallWalkPen ||
      isCastleBasePen ||
      isCastleWallArchPen ||
      isSolidTerrainHex(penMode) ||
      isFluidTerrainHex(penMode)
    ) {
      const boardHexOfCapForWall = genBoardHexID({
        ...hex,
        altitude: hex.altitude + (hex?.castleWallHeight ?? 0),
      })
      const isCastleWallArchClicked =
        hex.pieceID.includes('castleWall') || hex.pieceID.includes('castleArch')
      const clickedHex = isCastleWallArchClicked
        ? boardHexes[boardHexOfCapForWall]
        : hex
      const piece =
        isWallWalkPen || isCastleBasePen || isCastleWallArchPen
          ? piecesSoFar[penMode]
          : getPieceByTerrainAndSize(penMode, pieceSize)
      paintTile({
        piece,
        clickedHex: clickedHex,
        rotation: pieceRotation,
      })
    }

    if (
      isObstaclePieceID(penMode) ||
      penMode === PenMode.ruins2 ||
      penMode === PenMode.ruins3
    ) {
      paintTile({
        piece: piecesSoFar[penMode],
        clickedHex: hex,
        rotation: pieceRotation,
      })
    }
  }

  const onPointerUpLaurWall = (
    event: ThreeEvent<PointerEvent>,
    hex: BoardHex,
    side: string,
  ) => {
    if (event.button !== 0) return // ignore right clicks(2), middle mouse clicks(1)
    event.stopPropagation() // prevent pass through
    console.log('🚀 ~ onPointerUpLaurWall ~ hex:', hex)
    console.log('🚀 ~ onPointerUpLaurWall ~ side:', side)
    // Early out if camera is active
    if (cameraControlsRef?.current?.active) return

    if (penMode.includes('laurWall')) {
      const piece = piecesSoFar[penMode]
      console.log('🚀 ~ onPointerUpLaurWall ~ piece:', piece)
      // paintTile({
      //     piece,
      //     clickedHex: hex,
      //     rotation: pieceRotation,
      // })
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
      {boardHexesArr.map((bh) => {
        return (
          <MapHex3D
            key={bh.id}
            boardHex={bh}
            onPointerUp={onPointerUp}
            onPointerUpLaurWall={onPointerUpLaurWall}
          />
        )
      })}
    </>
  )
}

type InstanceBoardHexes = {
  subTerrainHexes: BoardHex[]
  emptyHexCaps: BoardHex[]
  solidHexCaps: BoardHex[]
  fluidHexCaps: BoardHex[]
}
function getInstanceBoardHexes(boardHexesArr: BoardHex[]) {
  return boardHexesArr.reduce(
    (result: InstanceBoardHexes, current) => {
      const isCap = current.isCap // land hexes that are covered, obstacle origin/auxiliary hexes, vertical clearance hexes
      const isEmptyCap = isCap && current.terrain === HexTerrain.empty
      const isSolidCap = isCap && isSolidTerrainHex(current.terrain)
      const isFluidCap = isCap && isFluidTerrainHex(current.terrain)
      const isSubTerrain =
        isSolidTerrainHex(current.terrain) ||
        (isJungleTerrainHex(current.terrain) && current.isObstacleOrigin)
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
    },
    {
      emptyHexCaps: [],
      solidHexCaps: [],
      fluidHexCaps: [],
      subTerrainHexes: [],
    },
  )
}
