import { Instance, Instances } from "@react-three/drei"
import React from 'react'
import { BoardHex, HexTerrain } from "../../../types"
import { CylinderGeometryArgs, InstanceRefType } from "../instance-hex"
import { getBoardHex3DCoords } from "../../../utils/map-utils"
import { HEXGRID_HEX_HEIGHT, INSTANCE_LIMIT } from "../../../utils/constants"
import { hexTerrainColor } from "../hexColors"
import { ThreeEvent } from "@react-three/fiber"

type Props = {
  boardHexArr: BoardHex[]
}

const baseSubTerrainCylinderArgs: CylinderGeometryArgs = [0.999, 0.999, HEXGRID_HEX_HEIGHT, 6, undefined, true, undefined, undefined]
const dirtColor = hexTerrainColor[HexTerrain.dirt]

const SubTerrains = ({ boardHexArr }: Props) => {
  const ref = React.useRef<InstanceRefType>(undefined!)
  if (boardHexArr.length === 0) return null
  return (
    <Instances
      limit={INSTANCE_LIMIT}
      range={boardHexArr.length}
      ref={ref}
    >
      <cylinderGeometry args={baseSubTerrainCylinderArgs} />
      <meshPhongMaterial
        transparent
        opacity={1}
      />
      {boardHexArr.map((hex, i) => (
        <SubTerrain key={hex.id + i + 'sub'} boardHex={hex} />
      ))}
    </Instances>
  )
}

export default SubTerrains

function SubTerrain({ boardHex }: { boardHex: BoardHex }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  React.useEffect(() => {
    const { x, z, y } = getBoardHex3DCoords(boardHex)
    const bottom = y - HEXGRID_HEX_HEIGHT
    const posY = ((y + bottom) / 2) // place it halfway between top and bottom

    const isDirtSubterrain = boardHex.terrain === HexTerrain.grass || boardHex.terrain === HexTerrain.sand || boardHex.terrain === HexTerrain.rock
    const subTerrainColor = isDirtSubterrain ? dirtColor : hexTerrainColor[boardHex.terrain]
    ref.current.color.set(subTerrainColor)
    ref.current.position.set(x, posY, z)
  }, [boardHex])
  return <Instance
    ref={ref}
    onPointerDown={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
    onPointerEnter={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
  />
}