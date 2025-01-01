import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { Billboard, Html, useGLTF } from '@react-three/drei'
import { BoardHex, BoardHexes, BoardPieces, HexTerrain, Pieces } from '../../types'
import { decodePieceID, getBoardHex3DCoords, getHexNeighborByRotAlt, getHexNearNeighborByRotation, pillarSideRotations } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'
import useBoundStore from '../../store/store'
import { Button } from '@mui/material'
import usePieceHoverState from '../../hooks/usePieceHoverState'



function getPillarReport({
  boardHexes,
  boardPieces,
  boardHex
}: {
  boardHexes: BoardHexes
  boardPieces: BoardPieces
  boardHex: BoardHex
}) {
  const pillarAddons = Object.keys(boardPieces)
    .map(key => decodePieceID(key))
    .filter(piece => piece.pieceID === Pieces.laurWallLong ||
      piece.pieceID === Pieces.laurWallShort ||
      piece.pieceID === Pieces.laurWallRuin)
  const sideLandHexes = pillarSideRotations.map(sideRot => {
    const actualRotation = (boardHex.pieceRotation + sideRot) % 6
    return getHexNeighborByRotAlt(boardHex, boardHexes, actualRotation, -1) // pass -1 to get one below pillar
  })
  const sidePillarHexes = pillarSideRotations.map(sideRot => {
    const actualRotation = (boardHex.pieceRotation + sideRot) % 6
    const pillarHex = getHexNeighborByRotAlt(boardHex, boardHexes, actualRotation)
    if (pillarHex?.pieceID?.includes(Pieces.laurWallPillar) && pillarHex?.isObstacleOrigin) {
      return pillarHex
    } else {
      return
    }
  })

  console.log("🚀 ~ pillarAddons ~ pillarAddons:", pillarAddons)
  console.log("🚀 ~ sideLandHexes:", sideLandHexes)
  console.log("🚀 ~ sidePillarHexes:", sidePillarHexes)
}

export default function LaurWallPillar({
  boardHex,
  onPointerUpLaurWall,
}: {
  boardHex: BoardHex
  onPointerUpLaurWall: (
    e: ThreeEvent<PointerEvent>,
    hex: BoardHex,
  ) => void
}) {
  const { x, z, yBaseCap, yWithBase } = getBoardHex3DCoords(boardHex)
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const boardHexes = useBoundStore(s => s.boardHexes)
  const boardPieces = useBoundStore(s => s.boardPieces)
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
  const pillarReport = getPillarReport({
    boardHexes,
    boardPieces,
    boardHex
  })
  // const handleClickBuildShortWall = () => {

  // }


  // const pillarReport = getPillarReport({
  //   boardHexes,
  //   boardPieces,
  //   boardHex
  // })

  const buttonPositions: [x: number, y: number, z: number][] = [
    [0.5, 1, 0],
    [-0.5, 1, 1],
    [-1.5, 1, 0],
    [-0.5, 1, -1],
  ].map(xyz => [xyz[0] - 0.1, xyz[1], xyz[2] - 0.2])

  return (
    <>
      <group
        position={[x, yWithBase, z]}
      >
        {/* {isSelected && pillarSideRotations.map } */}
        {(isSelected) && (
          <Billboard
            position={buttonPositions[0]}>
            <Html>
              <Button variant='contained' size="small">1,0</Button>
            </Html>
          </Billboard>)}
        {(isSelected) && (
          <Billboard
            position={buttonPositions[1]}>
            <Html>
              <Button variant='contained' size="small">0,1</Button>
            </Html>
          </Billboard>)}
        {(isSelected) && (
          <Billboard
            position={buttonPositions[2]}>
            <Html>
              <Button variant='contained' size="small">-1,0</Button>
            </Html>
          </Billboard>)}
        {(isSelected) && (
          <Billboard
            position={buttonPositions[3]}>
            <Html>
              <Button variant='contained' size="small">0,-1</Button>
            </Html>
          </Billboard>)}
      </group>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        onPointerEnter={e => onPointerEnter(e, boardHex)}
        onPointerOut={e => onPointerOut(e, boardHex)}
        onPointerUp={e => onPointerUpLaurWall(e, boardHex)}
      >
        <mesh
          geometry={nodes.PillarTop.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial color={isHighlighted ? yellowColor : pillarColor} />
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
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={pillarColor} />
    </>
  )
}

useGLTF.preload('/laurwall-pillar.glb')

