import { Instance, Instances } from '@react-three/drei'
import React from 'react'
import { BoardHex, HexTerrain } from '../../../types'
import { CylinderGeometryArgs, InstanceRefType } from '../instance-hex'
import { getBoardHex3DCoords } from '../../../utils/map-utils'
import { HEXGRID_HEX_HEIGHT, INSTANCE_LIMIT } from '../../../utils/constants'
import { hexTerrainColor } from '../hexColors'
import { ThreeEvent } from '@react-three/fiber'
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
  // const isCameraDisabled = useBoundStore(s => s.isCameraDisabled)
  if (boardHexArr.length === 0) return null
  return (
    <Instances
      limit={INSTANCE_LIMIT}
      range={boardHexArr.length}
      ref={ref}
      frustumCulled={false}
    >
      <cylinderGeometry args={baseSubTerrainCylinderArgs} />
      {/* {!isCameraDisabled ? <meshPhongMaterial opacity={0.8} transparent /> :
        <meshMatcapMaterial />} */}
      {/* {isCameraDisabled ? <meshPhongMaterial wireframe={true} wireframeLinewidth={0.01} /> :
        <meshMatcapMaterial />} */}
      <meshMatcapMaterial />
      {boardHexArr.map((hex, i) => (
        <SubTerrain key={hex.id + i + 'sub'} boardHex={hex} />
      ))}
    </Instances>
  )
}

export default SubTerrains

function SubTerrain({
  boardHex,
}: {
  boardHex: BoardHex,
}) {
  const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
  const setHoveredPieceID = useBoundStore(s => s.setHoveredPieceID)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  const isDirtSubterrain =
    boardHex.terrain === HexTerrain.grass ||
    boardHex.terrain === HexTerrain.sand ||
    boardHex.terrain === HexTerrain.rock
  const subTerrainColor = isDirtSubterrain
    ? dirtColor
    : hexTerrainColor[boardHex.terrain]
  // Effect: Initial color/position
  React.useEffect(() => {
    const { x, z, y } = getBoardHex3DCoords(boardHex)
    const bottom = y - HEXGRID_HEX_HEIGHT
    const posY = (y + bottom) / 2 // place it halfway between top and bottom
    ref.current.color.set(subTerrainColor)
    ref.current.position.set(x, posY, z)
  }, [boardHex, subTerrainColor])

  // update color when piece is hovered
  React.useEffect(() => {
    if (hoveredPieceID === boardHex.pieceID) {
      ref.current.color.set('yellow')
    } else {
      ref.current.color.set(subTerrainColor)
    }
  }, [boardHex.pieceID, hoveredPieceID, subTerrainColor])

  const hoverTimeout = React.useRef<number>(null!);
  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation() // prevent this hover from passing through and affecting behind
    if (e.instanceId === 0 || !!e.instanceId) {
      ref.current.color.set('yellow')
    }
    hoverTimeout.current = setTimeout(() => {
      // setIsHovered(true);
      setHoveredPieceID(boardHex.pieceID)
    }, 10); // Adjust the delay (in milliseconds) as needed
    setHoveredPieceID(boardHex.pieceID)
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      ref.current.color.set(subTerrainColor)
    }
    clearTimeout(hoverTimeout.current);
    setHoveredPieceID('')
  }

  return (
    <Instance
      ref={ref}
      // onPointerDown={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
      // onPointerEnter={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()} // prevent clicks from affecting behind subterrains
      onPointerEnter={handleEnter}
      onPointerOut={handleOut}
      frustumCulled={false}
    />
  )
}
