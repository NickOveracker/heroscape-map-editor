import { Instance, Instances } from '@react-three/drei'
import React from 'react'
import { HexTerrain } from '../../../types'
import {
  CylinderGeometryArgs,
  DreiCapProps,
  DreiInstanceCapProps,
  InstanceRefType,
} from '../instance-hex'
import { getBoardHex3DCoords } from '../../../utils/map-utils'
import {
  HEXGRID_EMPTYHEX_HEIGHT,
  INSTANCE_LIMIT,
} from '../../../utils/constants'
import { hexTerrainColor } from '../hexColors'
import { ThreeEvent } from '@react-three/fiber'

const baseEmptyCapCylinderArgs: CylinderGeometryArgs = [
  0.999,
  0.997,
  HEXGRID_EMPTYHEX_HEIGHT,
  6,
  undefined,
  false,
  undefined,
  undefined,
]
const emptyHexColor = hexTerrainColor[HexTerrain.empty]

const EmptyHexes = ({ boardHexArr, onPointerUp }: DreiCapProps) => {
  const ref = React.useRef<InstanceRefType>(undefined!)
  if (boardHexArr.length === 0) return null
  return (
    <Instances
      ref={ref}
      range={boardHexArr.length}
      limit={INSTANCE_LIMIT}
      frustumCulled={false}
    >
      <cylinderGeometry args={baseEmptyCapCylinderArgs} />
      <meshMatcapMaterial transparent opacity={0.5} />
      {boardHexArr.map((hex, i) => (
        <EmptyHex
          key={hex.id + i + 'empty'}
          boardHex={hex}
          onPointerUp={onPointerUp}
        />
      ))}
    </Instances>
  )
}

export default EmptyHexes

function EmptyHex({
  boardHex,
  onPointerUp,
}: DreiInstanceCapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  React.useLayoutEffect(() => {
    const { x, z, y } = getBoardHex3DCoords(boardHex)
    ref.current.color.set(emptyHexColor)
    ref.current.position.set(x, y, z)
  }, [boardHex])

  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation() // prevent this hover from passing through and affecting behind
    if (e.instanceId === 0 || !!e.instanceId) {
      ref.current.color.set('yellow')
    }
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      ref.current.color.set(hexTerrainColor[boardHex.terrain])
    }
  }
  const handleUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      onPointerUp(e, boardHex)
    }
  }

  return (
    <Instance
      ref={ref}
      onPointerUp={handleUp}
      onPointerEnter={handleEnter}
      onPointerOut={handleOut}
      frustumCulled={false}
    />
  )
}
