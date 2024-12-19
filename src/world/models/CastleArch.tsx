import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_SPACING } from '../../utils/constants'
import React from 'react'
import { ThreeEvent } from '@react-three/fiber'

type Props = {
  boardHex: BoardHex,
  underHexTerrain: string
  // overHexTerrain: string,
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function CastleArch({
  boardHex,
  underHexTerrain,
  // overHexTerrain,
  onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/castle-arch-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isDoor = !boardHex.pieceID.includes("NoDoor") // hacky but fast
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const {
    colorNear,
    colorMiddle,
    colorFar,
    onPointerEnterNear,
    onPointerOutNear,
    onPointerEnterMiddle,
    onPointerOutMiddle,
    onPointerEnterFar,
    onPointerOutFar,
  } = useArchHoverState()

  if (!(boardHex.isAuxiliary || boardHex.isObstacleOrigin)) {
    return null
  }
  if (boardHex.isAuxiliary) {
    return !isCastleUnder ? <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} /> : <></>
  }
  return (
    <group>
      <group
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
        scale={[HEXGRID_SPACING, 1, 1]} // this stretches the arch to full span 3 hexes (warping should be almost imperceptible)
      >

        <mesh
          geometry={nodes.CastleArchBody.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapNear.geometry}
          onPointerEnter={onPointerEnterNear}
          onPointerOut={onPointerOutNear}
          onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={colorNear}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapMiddle.geometry}
          onPointerEnter={onPointerEnterMiddle}
          onPointerOut={onPointerOutMiddle}
          onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={colorMiddle}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapFar.geometry}
          onPointerEnter={onPointerEnterFar}
          onPointerOut={onPointerOutFar}
          onPointerUp={e => onPointerUp(e, boardHex)}
        >
          <meshMatcapMaterial
            color={colorFar}
          />
        </mesh>
        {isDoor && <mesh
          geometry={nodes.ArchDoor.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor['dirt']}
          />
        </mesh>}
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}

useGLTF.preload('/castle-arch-handmade.glb')

function useArchHoverState() {
  const [colorNear, setColorNear] = React.useState(hexTerrainColor[HexTerrain.castle])
  const [colorMiddle, setColorMiddle] = React.useState(hexTerrainColor[HexTerrain.castle])
  const [colorFar, setColorFar] = React.useState(hexTerrainColor[HexTerrain.castle])
  const onPointerEnterNear = (e: ThreeEvent<PointerEvent>) => {
    setColorNear('yellow')
    e.stopPropagation()
  }
  const onPointerOutNear = (e: ThreeEvent<PointerEvent>) => {
    setColorNear(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }
  const onPointerEnterMiddle = (e: ThreeEvent<PointerEvent>) => {
    setColorMiddle('yellow')
    e.stopPropagation()
  }
  const onPointerOutMiddle = (e: ThreeEvent<PointerEvent>) => {
    setColorMiddle(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }
  const onPointerEnterFar = (e: ThreeEvent<PointerEvent>) => {
    setColorFar('yellow')
    e.stopPropagation()
  }
  const onPointerOutFar = (e: ThreeEvent<PointerEvent>) => {
    setColorFar(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }
  return {
    colorNear,
    colorMiddle,
    colorFar,
    onPointerEnterNear,
    onPointerOutNear,
    onPointerEnterMiddle,
    onPointerOutMiddle,
    onPointerEnterFar,
    onPointerOutFar,
  }
}