import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'
import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { LaurWallShort } from './LaurWall'
// import { useSpring, animated, config } from '@react-spring/three'

export default function LaurWallPillar({
  boardHex,
  onPointerUpLaurWall,
}: {
  boardHex: BoardHex
  onPointerUpLaurWall: (
    e: ThreeEvent<PointerEvent>,
    hex: BoardHex,
    side: string,
  ) => void
}) {
  const { x, z, yBaseCap, yBase } = getBoardHex3DCoords(boardHex)
  const { nodes } = useGLTF('/laurwall-pillar.glb') as any
  const rotation = boardHex?.pieceRotation ?? 0
  const {
    colorBody,
    colorMinusY,
    colorMinusX,
    colorPlusY,
    colorPlusX,
    onPointerEnterBody,
    onPointerOutBody,
    onPointerEnterMinusY,
    onPointerOutMinusY,
    onPointerEnterMinusX,
    onPointerOutMinusX,
    onPointerEnterPlusY,
    onPointerOutPlusY,
    onPointerEnterPlusX,
    onPointerOutPlusX,
  } = usePillarHoverState()
  const pillarColor = hexTerrainColor[HexTerrain.laurWallPillar]
  const yellowColor = 'yellow'
  return (
    <group>
      <group
        position={[x, yBase, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
      >
        <group
          onPointerEnter={onPointerEnterBody}
          onPointerOut={onPointerOutBody}
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
            <meshMatcapMaterial color={colorBody ? yellowColor : pillarColor} />
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
        </group>
        <mesh
          geometry={nodes.MinusY.geometry}
          onPointerEnter={onPointerEnterMinusY}
          onPointerOut={onPointerOutMinusY}
          onPointerUp={(e) => onPointerUpLaurWall(e, boardHex, 'minusY')}
        >
          <meshMatcapMaterial color={colorMinusY ? yellowColor : pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.MinusX.geometry}
          onPointerEnter={onPointerEnterMinusX}
          onPointerOut={onPointerOutMinusX}
          onPointerUp={(e) => onPointerUpLaurWall(e, boardHex, 'minusX')}
        >
          <meshMatcapMaterial color={colorMinusX ? yellowColor : pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.PlusY.geometry}
          onPointerEnter={onPointerEnterPlusY}
          onPointerOut={onPointerOutPlusY}
          onPointerUp={(e) => onPointerUpLaurWall(e, boardHex, 'plusY')}
        >
          <meshMatcapMaterial color={colorPlusY ? yellowColor : pillarColor} />
        </mesh>
        <mesh
          geometry={nodes.PlusX.geometry}
          onPointerEnter={onPointerEnterPlusX}
          onPointerOut={onPointerOutPlusX}
          onPointerUp={(e) => onPointerUpLaurWall(e, boardHex, 'plusX')}
        >
          <meshMatcapMaterial color={colorPlusX ? yellowColor : pillarColor} />
        </mesh>
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={pillarColor} />
    </group>
  )
}

useGLTF.preload('/laurwall-pillar.glb')

function usePillarHoverState() {
  const [colorBody, setColorBody] = React.useState(false)
  const [colorMinusY, setColorMinusY] = React.useState(false)
  const [colorMinusX, setColorMinusX] = React.useState(false)
  const [colorPlusY, setColorPlusY] = React.useState(false)
  const [colorPlusX, setColorPlusX] = React.useState(false)
  const onPointerEnterBody = (e: ThreeEvent<PointerEvent>) => {
    setColorBody(true)
    e.stopPropagation()
  }
  const onPointerOutBody = (e: ThreeEvent<PointerEvent>) => {
    setColorBody(false)
    e.stopPropagation()
  }
  const onPointerEnterMinusY = (e: ThreeEvent<PointerEvent>) => {
    setColorMinusY(true)
    e.stopPropagation()
  }
  const onPointerOutMinusY = (e: ThreeEvent<PointerEvent>) => {
    setColorMinusY(false)
    e.stopPropagation()
  }
  const onPointerEnterMinusX = (e: ThreeEvent<PointerEvent>) => {
    setColorMinusX(true)
    e.stopPropagation()
  }
  const onPointerOutMinusX = (e: ThreeEvent<PointerEvent>) => {
    setColorMinusX(false)
    e.stopPropagation()
  }
  const onPointerEnterPlusY = (e: ThreeEvent<PointerEvent>) => {
    setColorPlusY(true)
    e.stopPropagation()
  }
  const onPointerOutPlusY = (e: ThreeEvent<PointerEvent>) => {
    setColorPlusY(false)
    e.stopPropagation()
  }
  const onPointerEnterPlusX = (e: ThreeEvent<PointerEvent>) => {
    setColorPlusX(true)
    e.stopPropagation()
  }
  const onPointerOutPlusX = (e: ThreeEvent<PointerEvent>) => {
    setColorPlusX(false)
    e.stopPropagation()
  }
  return {
    colorBody,
    colorMinusY,
    colorMinusX,
    colorPlusY,
    colorPlusX,
    onPointerEnterBody,
    onPointerOutBody,
    onPointerEnterMinusY,
    onPointerOutMinusY,
    onPointerEnterMinusX,
    onPointerOutMinusX,
    onPointerEnterPlusY,
    onPointerOutPlusY,
    onPointerEnterPlusX,
    onPointerOutPlusX,
  }
}
