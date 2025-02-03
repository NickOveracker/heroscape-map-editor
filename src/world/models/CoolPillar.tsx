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

export default function CoolLaurWallPillar({
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
    colorBody,
    onPointerEnterBody,
    onPointerOutBody,
  } = usePillarHoverState()
  const pillarColor = hexTerrainColor[HexTerrain.laurWall]
  const interiorPillarColor = hexTerrainColor.laurModelColor2
  const yellowColor = 'yellow'

  return (
    <>
      <group
        position={[x, yWithBase, z]}
      >
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[0.5, 1, 0]}>
            <Html>
              <Button variant='contained' size="small">1,0</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-0.5, 1, 1]}>
            <Html>
              <Button variant='contained' size="small">0,1</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-1.5, 1, 0]}>
            <Html>
              <Button variant='contained' size="small">-1,0</Button>
            </Html>
          </Billboard>)}
        {(selectedPieceID === boardHex.pieceID) && (
          <Billboard position={[-0.5, 1, -1]}>
            <Html>
              <Button variant='contained' size="small">0,-1</Button>
            </Html>
          </Billboard>)}
      </group>
      <group
        position={[x, yWithBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        onPointerEnter={onPointerEnterBody}
        onPointerOut={onPointerOutBody}
        onPointerUp={e => onPointerUpLaurWall(e, boardHex)}
      >
        <mesh
          geometry={nodes.PillarTop.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial color={colorBody ? yellowColor : pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.SubDecorCore.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={colorBody ? yellowColor : interiorPillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.Facade.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={colorBody ? yellowColor : pillarColor}
          />
        </mesh>
        <mesh
          geometry={nodes.FacadeInner.geometry}
        // onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            side={DoubleSide}
            color={colorBody ? yellowColor : interiorPillarColor}
          />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={pillarColor} />
    </>
  )
}

// useGLTF.preload('/laurwall-pillar.glb')

function usePillarHoverState() {
  const [colorBody, setColorBody] = React.useState(false)
  const onPointerEnterBody = (e: ThreeEvent<PointerEvent>) => {
    setColorBody(true)
    e.stopPropagation()
  }
  const onPointerOutBody = (e: ThreeEvent<PointerEvent>) => {
    setColorBody(false)
    e.stopPropagation()
  }
  return {
    colorBody,
    onPointerEnterBody,
    onPointerOutBody,
  }
}
