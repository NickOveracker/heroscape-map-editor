import { Instance, Instances } from "@react-three/drei"
import React from 'react'
import { CylinderGeometryArgs, DreiCapProps, DreiInstanceCapProps, InstanceRefType } from "../instance-hex"
import { getBoardHex3DCoords } from "../../../utils/map-utils"
import { HEXGRID_HEXCAP_HEIGHT, INSTANCE_LIMIT } from "../../../utils/constants"
import { hexTerrainColor } from "../hexColors"
import { ThreeEvent } from "@react-three/fiber"


const baseSolidCapCylinderArgs: CylinderGeometryArgs = [0.999, 0.997, HEXGRID_HEXCAP_HEIGHT, 6, undefined, false, undefined, undefined]

const SolidCaps = ({
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
      range={boardHexArr.length}
      ref={ref}
    >
      <cylinderGeometry args={baseSolidCapCylinderArgs} />
      <meshMatcapMaterial />
      {boardHexArr.map((hex, i) => (
        <SolidCap
          key={hex.id + i}
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

export default SolidCaps

function SolidCap({
  boardHex,
  boardHexArr,
  onPointerEnter,
  onPointerOut,
  onPointerUp
}: DreiInstanceCapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)

  React.useEffect(() => {
    const { x, y, z } = getBoardHex3DCoords(boardHex)
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