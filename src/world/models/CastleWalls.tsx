import React from 'react'
import { Vector3 } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

type Props = {
  boardHex: BoardHex
  underHexTerrain: string
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function CastleWall({ boardHex, underHexTerrain, onPointerUp }: Props) {
  const { nodes } = useGLTF('/adjustable-castle-walls.glb') as any
  const [color, setColor] = React.useState(hexTerrainColor[HexTerrain.castle])
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const scaleYAdjust = 0.01 // just a little to get it out of the subterrain
  const positionDown = scaleYAdjust / 2
  // castle walls are 10 levels tall, UNLESS stacked on another wall, then they are 9 (they have a 1-level bottom base when on land)
  const scaleY = (boardHex?.castleWallHeight ?? 9) + (1 - scaleYAdjust)
  const scale = new Vector3(1, scaleY, 1)
  const position = new Vector3(x, yBase - positionDown, z)
  const pieceID = boardHex.pieceID
  const endGeo = [
    nodes.CastleWallEndBody.geometry,
    nodes.CastleWallEndCap.geometry,
  ]
  const straightGeo = [
    nodes.CastleWallStraightBody.geometry,
    nodes.CastleWallStraightCap.geometry,
  ]
  const cornerGeo = [
    nodes.CastleWallCornerBody.geometry,
    nodes.CastleWallCornerCap.geometry,
  ]
  const geometryPair = pieceID.includes(Pieces.castleWallEnd)
    ? endGeo
    : pieceID.includes(Pieces.castleWallStraight)
      ? straightGeo
      : cornerGeo
  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    setColor('yellow')
    e.stopPropagation()
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    setColor(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }

  return (
    <group>
      <group position={position} rotation={[0, (rotation * -Math.PI) / 3, 0]}>
        <mesh scale={scale} geometry={geometryPair[0]}>
          <meshMatcapMaterial color={hexTerrainColor[boardHex.terrain]} />
        </mesh>

        <>
          <mesh
            geometry={nodes.WallCap.geometry}
            position={[0, (scaleY - 1) * HEXGRID_HEX_HEIGHT, 0]}
            onPointerUp={(e) => onPointerUp(e, boardHex)}
            onPointerEnter={onPointerEnter}
            onPointerOut={onPointerOut}
          >
            <meshMatcapMaterial color={color} />
          </mesh>
          <mesh
            geometry={geometryPair[1]}
            position={[0, (scaleY - 1) * HEXGRID_HEX_HEIGHT, 0]}
            onPointerUp={(e) => onPointerUp(e, boardHex)}
          >
            <meshMatcapMaterial color={color} />
          </mesh>
        </>
      </group>
      {(boardHex.castleWallHeight === 9) && ( // when it's 8, castle is wall-on-wall and no base is shown
        <ObstacleBase
          x={x}
          y={yBaseCap}
          z={z}
          color={hexTerrainColor[underHexTerrain]}
        />
      )}
    </group>
  )
}
useGLTF.preload('/adjustable-castle-walls.glb')