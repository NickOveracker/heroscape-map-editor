import { Instance, Instances } from "@react-three/drei"
import React from 'react'
import { CylinderGeometryArgs, DreiCapProps, DreiInstanceCapProps, InstanceRefType } from "../instance-hex"
import { getBoardHex3DCoords } from "../../../utils/map-utils"
import { HEXGRID_HEX_HEIGHT, HEXGRID_HEXCAP_FLUID_HEIGHT, INSTANCE_LIMIT } from "../../../utils/constants"
import { hexTerrainColor } from "../hexColors"
import { ThreeEvent } from "@react-three/fiber"


const baseFluidCapCylinderArgs: CylinderGeometryArgs = [0.999, 0.997, HEXGRID_HEXCAP_FLUID_HEIGHT, 6, undefined, false, undefined, undefined]

const FluidCaps = ({
  boardHexArr,
  onPointerEnter,
  onPointerOut,
  onPointerUp
}: DreiCapProps) => {
  const ref = React.useRef<InstanceRefType>(undefined!)
  if (boardHexArr.length === 0) return null
  return (
    <Instances
      limit={INSTANCE_LIMIT}
      range={boardHexArr.length} // no way there would be this many fluid caps, but with an overhang on every other hex, maybe
      ref={ref}
    >
      <cylinderGeometry args={baseFluidCapCylinderArgs} />
      <meshMatcapMaterial
        transparent
        opacity={0.85}
      />
      {boardHexArr.map((hex, i) => (
        <FluidCap
          key={hex.id + i + 'fluid'}
          boardHex={hex}
          boardHexArr={boardHexArr}
          onPointerEnter={onPointerEnter}
          onPointerOut={onPointerOut}
          onPointerUp={onPointerUp}
        />
      ))}
    </Instances>
  )
}

export default FluidCaps

function FluidCap({
  boardHex,
  boardHexArr,
  onPointerEnter,
  onPointerOut,
  onPointerUp
}: DreiInstanceCapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)

  React.useEffect(() => {
    const { x, z } = getBoardHex3DCoords(boardHex)
    const y = (boardHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (HEXGRID_HEXCAP_FLUID_HEIGHT / 2)
    ref.current.color.set(hexTerrainColor[boardHex.terrain])
    ref.current.position.set(x, y, z)
  }, [boardHex])

  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      onPointerEnter(e, boardHexArr[e.instanceId])
      ref.current.color.set('#fff')
    }
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    onPointerOut()
    if (e.instanceId === 0 || !!e.instanceId) {
      ref.current.color.set(hexTerrainColor[boardHexArr[e.instanceId].terrain])
    }
  }
  const handleUp = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      onPointerUp(e, boardHexArr[e.instanceId])
    }
  }

  return <Instance
    ref={ref}
    onPointerUp={handleUp}
    onPointerEnter={handleEnter}
    onPointerOut={handleOut}
    castShadow
    receiveShadow
  />
}