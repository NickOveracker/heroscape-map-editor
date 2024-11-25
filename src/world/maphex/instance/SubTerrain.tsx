import { Instance, Instances } from "@react-three/drei"
import React from 'react'
import { BoardHex, HexTerrain } from "../../../types"
import { CylinderGeometryArgs, InstanceRefType } from "../instance-hex"
import { getBoardHex3DCoords } from "../../../utils/map-utils"
import { HEXGRID_HEX_HEIGHT, HEXGRID_MAX_ALTITUDE } from "../../../utils/constants"
import { hexTerrainColor } from "../hexColors"
import { Color, DoubleSide } from "three"
import useBoundStore from "../../../store/store"

type Props = {
  boardHexArr: BoardHex[]
}

const baseSubTerrainCylinderArgs: CylinderGeometryArgs = [1, 1, 1, 6, undefined, true, undefined, undefined]
const dirtColor = hexTerrainColor[HexTerrain.dirt]

const SubTerrains = ({ boardHexArr }: Props) => {
  const hexMap = useBoundStore(s => s.hexMap)
  const maxSubTerrains = hexMap.width * hexMap.height * HEXGRID_MAX_ALTITUDE
  const ref = React.useRef<InstanceRefType>(undefined!)
  if (boardHexArr.length === 0) return null
  return (
    <Instances limit={maxSubTerrains} ref={ref} castShadow receiveShadow position={[0, 0, 0]}>
      <cylinderGeometry args={baseSubTerrainCylinderArgs} />
      <meshLambertMaterial side={DoubleSide} />
      {boardHexArr.map((hex, i) => (
        <SubTerrain key={i} boardHex={hex} />
      ))}
    </Instances>
  )
}

export default SubTerrains

function SubTerrain({ boardHex }: { boardHex: BoardHex }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  React.useLayoutEffect(() => {
    const { x, z } = getBoardHex3DCoords(boardHex)
    const top = boardHex.altitude * HEXGRID_HEX_HEIGHT
    const bottom = top - HEXGRID_HEX_HEIGHT
    const y = ((top + bottom) / 2) // place it halfway between top and bottom
    const scaleY = top - bottom // since cylinder's base height is 1

    const isDirtSubterrain = boardHex.terrain === HexTerrain.grass || boardHex.terrain === HexTerrain.sand || boardHex.terrain === HexTerrain.rock
    const subTerrainColor = isDirtSubterrain ? dirtColor : hexTerrainColor[boardHex.terrain]
    ref.current.color.set(new Color(subTerrainColor))
    ref.current.position.set(x, y, z)
    ref.current.scale.set(1, scaleY, 1)
  }, [boardHex])
  return <Instance onPointerDown={(e) => e.stopPropagation()} ref={ref} />
}