import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { Billboard, Html, useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'
import useBoundStore from '../../store/store'
import { Button } from '@mui/material'
import usePieceHoverState from '../../hooks/usePieceHoverState'

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

  // // update color when piece is hovered
  // React.useEffect(() => {
  //   if (selectedPieceID === boardHex.pieceID) {
  //     ref.current.color.set('yellow')
  //   } else {
  //     ref.current.color.set(color)
  //   }
  // }, [boardHex.pieceID, hoveredPieceID, color])

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
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard
            position={buttonPositions[0]}>
            <Html>
              <Button variant='contained' size="small">1,0</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard
            position={buttonPositions[1]}>
            <Html>
              <Button variant='contained' size="small">0,1</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard
            position={buttonPositions[2]}>
            <Html>
              <Button variant='contained' size="small">-1,0</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
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
          <meshMatcapMaterial color={(isHovered || selectedPieceID === boardHex.pieceID) ? yellowColor : pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.SubDecorCore.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={isHovered ? yellowColor : interiorPillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.Facade.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={isHovered ? yellowColor : pillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.FacadeInner.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={isHovered ? yellowColor : interiorPillarColor}
          />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={pillarColor} />
    </>
  )
}

useGLTF.preload('/laurwall-pillar.glb')

