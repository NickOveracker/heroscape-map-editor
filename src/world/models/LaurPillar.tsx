import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'



// function getPillarReport({
//   boardHexes,
//   boardPieces,
//   boardHex
// }: {
//   boardHexes: BoardHexes
//   boardPieces: BoardPieces
//   boardHex: BoardHex
// }) {
//   const pillarAddons = Object.keys(boardPieces)
//     .map(key => decodePieceID(key))
//     .filter(piece => piece.pieceID === Pieces.laurWallLong ||
//       piece.pieceID === Pieces.laurWallShort ||
//       piece.pieceID === Pieces.laurWallRuin)
//   const sideLandHexes = pillarSideRotations.map(sideRot => {
//     const actualRotation = (boardHex.pieceRotation + sideRot) % 6
//     return getHexNeighborByRotAlt(boardHex, boardHexes, actualRotation, -1) // pass -1 to get one below pillar
//   })
//   const sidePillarHexes = pillarSideRotations.map(sideRot => {
//     const actualRotation = (boardHex.pieceRotation + sideRot) % 6
//     const pillarHex = getHexNeighborByRotAlt(boardHex, boardHexes, actualRotation)
//     if (pillarHex?.pieceID?.includes(Pieces.laurWallPillar) && pillarHex?.isObstacleOrigin) {
//       return pillarHex
//     } else {
//       return
//     }
//   })
//   const sideCanBuildRuins = pillarSideRotations.map(sideRot => {
//     const actualRotation = (boardHex.pieceRotation + sideRot) % 6
//     console.log("🚀 ~ actualRotation:", actualRotation)
//     const coordsObstructedByRuins = Number.isInteger(actualRotation)
//       ? [hexUtilsGetNeighborForRotation(actualRotation)]
//       : hexUtilsGetRadialNearNeighborsForRotation(actualRotation)
//     const piecePlaneCoords = coordsObstructedByRuins.filter(c => !!c).map((coord) =>
//       hexUtilsAdd(coord, { q: boardHex.q, r: boardHex.r, s: boardHex.s, }),
//     )
//     console.log("🚀 ~ piecePlaneCoords:", piecePlaneCoords)
//     const isVerticalClearanceForPiece = piecePlaneCoords.every((coord, i) => {
//       if (!coord) { return false }
//       const clearanceHexIds = Array(10) //using 10, not 9, because unlike in addPiece we are not starting from the placement altitude
//         .fill(0)
//         .map((_, j) => {
//           const altitude = boardHex.altitude + j
//           return genBoardHexID({ ...piecePlaneCoords[i], altitude })
//         })
//       return clearanceHexIds.every((clearanceHexId) => {
//         const hex = boardHexes?.[clearanceHexId]
//         if (!hex) return true // if no boardHex is written, then it is definitely empty
//         const terrain = hex.terrain
//         const isBlocked =
//           isSolidTerrainHex(terrain) ||
//           isFluidTerrainHex(terrain)
//         return !isBlocked
//       })
//     })
//     if (isVerticalClearanceForPiece) {
//       return true
//     } else {
//       return false
//     }
//   })

//   // console.log("🚀 ~ pillarAddons ~ pillarAddons:", pillarAddons)
//   // console.log("🚀 ~ sideLandHexes:", sideLandHexes)
//   // console.log("🚀 ~ sidePillarHexes:", sidePillarHexes)
//   // console.log("🚀 ~ sideCanBuildRuins:", sideCanBuildRuins)
// }

export default function LaurWallPillar({
  boardHex,
  // onPointerUpLaurWall,
}: {
  boardHex: BoardHex
  onPointerUpLaurWall: (
    e: ThreeEvent<PointerEvent>,
    hex: BoardHex,
  ) => void
}) {
  const { x, z, yBaseCap, yWithBase } = getBoardHex3DCoords(boardHex)
  // const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  // const boardHexes = useBoundStore(s => s.boardHexes)
  // const boardPieces = useBoundStore(s => s.boardPieces)
  const { nodes } = useGLTF('/laurwall-pillar.glb') as any
  const rotation = boardHex?.pieceRotation ?? 0
  // const {
  //   isHovered,
  //   onPointerEnter,
  //   onPointerOut,
  // } = usePieceHoverState()
  const pillarColor = hexTerrainColor[HexTerrain.laurWall]
  const interiorPillarColor = hexTerrainColor.laurModelColor2
  // const yellowColor = 'yellow'
  // const isSelected = selectedPieceID === boardHex.pieceID
  // const isHighlighted = isHovered || isSelected

  // if (isSelected) {
  //   const pillarReport = getPillarReport({
  //     boardHexes,
  //     boardPieces,
  //     boardHex
  //   })
  // }

  // const buttonPositions: [x: number, y: number, z: number][] = [
  //   [0.5, 1, 0],
  //   [-0.5, 1, 1],
  //   [-1.5, 1, 0],
  //   [-0.5, 1, -1],
  // ].map(xyz => [xyz[0] - 0.1, xyz[1], xyz[2] - 0.2])

  return (
    <>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        onPointerEnter={e => e.stopPropagation()}
        onPointerOut={e => e.stopPropagation()}
      // onPointerEnter={e => onPointerEnter(e, boardHex)}
      // onPointerOut={e => e.stopPropagation()}
      // onPointerOut={e => onPointerOut(e, boardHex)}
      // onPointerUp={e => onPointerUpLaurWall(e, boardHex)}
      >
        <mesh
          geometry={nodes.PillarTop.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial color={pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.SubDecorCore.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={interiorPillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.Facade.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={pillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.FacadeInner.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={interiorPillarColor}
          />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={pillarColor} />
    </>
  )
}

useGLTF.preload('/laurwall-pillar.glb')

