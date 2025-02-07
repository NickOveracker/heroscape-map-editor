import { DoubleSide } from 'three'
import { Billboard, Html, useGLTF } from '@react-three/drei'
import { HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from '../maphex/hexColors'
import { HEXGRID_HEXCAP_FLUID_HEIGHT } from '../../utils/constants'
import { BoardHexPieceProps, CylinderGeometryArgs } from '../maphex/instance-hex'
import { IconButton, Paper } from '@mui/material'
import useBoundStore from '../../store/store'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import { FcBrokenLink, FcParallelTasks, FcTreeStructure } from 'react-icons/fc'



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

const baseCylinderArgs: CylinderGeometryArgs = [
  0.9,
  0.997,
  HEXGRID_HEXCAP_FLUID_HEIGHT,
  6,
  undefined,
  false,
  undefined,
  undefined,
]

export default function LaurWallPillar({
  boardHex,
  onPointerUp
}: BoardHexPieceProps) {
  const { x, z, yBaseCap, yWithBase } = getBoardHex3DCoords(boardHex)
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  // const boardHexes = useBoundStore(s => s.boardHexes)
  // const boardPieces = useBoundStore(s => s.boardPieces)
  const { nodes } = useGLTF('/laurwall-pillar.glb') as any
  const rotation = boardHex?.pieceRotation ?? 0

  const {
    isHovered,
    onPointerEnter,
    onPointerOut,
  } = usePieceHoverState()

  const pillarColor = hexTerrainColor[HexTerrain.laurWall]
  const interiorPillarColor = hexTerrainColor.laurModelColor2
  const yellowColor = 'yellow'
  const isSelected = selectedPieceID === boardHex.pieceID
  const isHighlighted = isHovered || isSelected

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
      >
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[0.5, 1, 0]}>
            <Html>
              {/* <Button variant='contained' size="small">1,0</Button> */}
              <Paper sx={{ backgroundColor: ('var(--gunmetal-transparent)') }} elevation={3}>
                <IconButton
                  title={'Add Ruin'}
                // onClick={addLaurAddon}
                >
                  <FcBrokenLink />
                </IconButton>
                <IconButton
                  title={'Add Short Wall (and a Pillar maybe?)'}
                // onClick={addLaurAddon}
                >
                  <FcTreeStructure />
                </IconButton>
              </Paper>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-0.5, 1, 1]}>
            <Html>
              {/* <Button variant='contained' size="small">0,1</Button> */}
              <Paper sx={{ backgroundColor: ('var(--gunmetal-transparent)') }} elevation={3}>
                <IconButton
                  title={'Add Ruin'}
                // onClick={addLaurAddon}
                >
                  <FcBrokenLink />
                </IconButton>
                <IconButton
                  title={'Add Long Wall (and a Pillar maybe?)'}
                // onClick={addLaurAddon}
                >
                  <FcParallelTasks />
                </IconButton>
              </Paper>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-1.5, 1, 0]}>
            <Html>
              {/* <Button variant='contained' size="small">-1,0</Button> */}
              <Paper sx={{ backgroundColor: ('var(--gunmetal-transparent)') }} elevation={3}>
                <IconButton
                  title={'Add Ruin'}
                // onClick={addLaurAddon}
                >
                  <FcBrokenLink />
                </IconButton>
                <IconButton
                  title={'Add Short Wall (and a Pillar maybe?)'}
                // onClick={addLaurAddon}
                >
                  <FcTreeStructure />
                </IconButton>
              </Paper>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-0.5, 1, -1]}>
            <Html>
              {/* <Button variant='contained' size="small">0,-1</Button> */}
              <Paper sx={{ backgroundColor: ('var(--gunmetal-transparent)') }} elevation={3}>
                <IconButton
                  title={'Add Ruin'}
                // onClick={addLaurAddon}
                >
                  <FcBrokenLink />
                </IconButton>
                <IconButton
                  title={'Add Long Wall (and a Pillar maybe?)'}
                // onClick={addLaurAddon}
                >
                  <FcParallelTasks />
                </IconButton>
              </Paper>
            </Html>
          </Billboard>)}
      </group>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        onPointerUp={e => onPointerUp(e, boardHex)}
        onPointerEnter={e => onPointerEnter(e, boardHex)}
        onPointerOut={e => onPointerOut(e)}
      >
        <mesh
          geometry={nodes.PillarTop.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={isHighlighted ? yellowColor : pillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.SubDecorCore.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={isHighlighted ? yellowColor : interiorPillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.Facade.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={isHighlighted ? yellowColor : pillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.FacadeInner.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={isHighlighted ? yellowColor : interiorPillarColor}
          />
        </mesh>
        <mesh position={[0, -(yWithBase - yBaseCap), 0]}>
          <cylinderGeometry args={baseCylinderArgs} />
          <meshMatcapMaterial
            color={isHighlighted ? yellowColor : pillarColor}
          />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/laurwall-pillar.glb')

