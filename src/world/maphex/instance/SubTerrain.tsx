import { Instance, Instances } from '@react-three/drei'
import React from 'react'
import { BoardHex, HexTerrain } from '../../../types'
import { CylinderGeometryArgs, InstanceRefType } from '../instance-hex'
import { getBoardHex3DCoords } from '../../../utils/map-utils'
import { HEXGRID_HEX_HEIGHT, INSTANCE_LIMIT } from '../../../utils/constants'
import { hexTerrainColor } from '../hexColors'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import useBoundStore from '../../../store/store'

type Props = {
  boardHexArr: BoardHex[]
}

const baseSubTerrainCylinderArgs: CylinderGeometryArgs = [
  1,
  1,
  HEXGRID_HEX_HEIGHT,
  6,
  undefined,
  false,
  undefined,
  undefined,
]
const dirtColor = hexTerrainColor[HexTerrain.dirt]

const SubTerrains = ({ boardHexArr }: Props) => {
  const ref = React.useRef<InstanceRefType>(undefined!)
  const isCameraDisabled = useBoundStore(s => s.isCameraDisabled)
  if (boardHexArr.length === 0) return null
  return (
    <Instances
      limit={INSTANCE_LIMIT}
      range={boardHexArr.length}
      ref={ref}
      frustumCulled={false}
    >
      <cylinderGeometry args={baseSubTerrainCylinderArgs} />
      {isCameraDisabled ? <meshPhongMaterial wireframe={true} /> :
        <meshMatcapMaterial />}
      {boardHexArr.map((hex, i) => (
        <SubTerrain key={hex.id + i + 'sub'} boardHex={hex} />
      ))}
    </Instances>
  )
}

export default SubTerrains

function SubTerrain({ boardHex }: { boardHex: BoardHex }) {
  const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
  const setHoveredPieceID = useBoundStore(s => s.setHoveredPieceID)
  useFrame(() => {
    // console.log("Hey, I'm executing every frame!")
    if (hoveredPieceID === boardHex.pieceID) {
      ref.current.color.set('yellow')
    } else {
      ref.current.color.set(hexTerrainColor[boardHex.terrain])

    }
  })
  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation() // prevent this hover from passing through and affecting behind
    // if (e.instanceId === 0 || !!e.instanceId) {
    //   ref.current.color.set('yellow')
    // }
    setHoveredPieceID(boardHex.pieceID)
  }
  const handleOut = () => {
    // if (hoveredPieceID === boardHex.id) {
    setHoveredPieceID('')
    // }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  React.useEffect(() => {
    const { x, z, y } = getBoardHex3DCoords(boardHex)
    const bottom = y - HEXGRID_HEX_HEIGHT
    const posY = (y + bottom) / 2 // place it halfway between top and bottom

    const isDirtSubterrain =
      boardHex.terrain === HexTerrain.grass ||
      boardHex.terrain === HexTerrain.sand ||
      boardHex.terrain === HexTerrain.rock
    const subTerrainColor = isDirtSubterrain
      ? dirtColor
      : hexTerrainColor[boardHex.terrain]
    ref.current.color.set(subTerrainColor)
    ref.current.position.set(x, posY, z)
  }, [boardHex])

  return (
    <Instance
      ref={ref}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
      // onPointerEnter={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
      // onPointerEnter={handleEnter}
      // onPointerOut={handleOut}
      frustumCulled={false}
    />
  )
}
