import { Instance, Instances } from '@react-three/drei'
import React from 'react'
import {
  CylinderGeometryArgs,
  DreiCapProps,
  BoardHexPieceProps,
  InstanceRefType,
} from '../instance-hex'
import { getBoardHex3DCoords } from '../../../utils/map-utils'
import {
  HEXGRID_HEX_HEIGHT,
  HEXGRID_HEXCAP_FLUID_SCALE,
  INSTANCE_LIMIT,
} from '../../../utils/constants'
import { hexTerrainColor } from '../hexColors'
import { ThreeEvent } from '@react-three/fiber'
import usePieceHoverState from '../../../hooks/usePieceHoverState'
import useBoundStore from '../../../store/store'

const baseFluidCapCylinderArgs: CylinderGeometryArgs = [
  0.9,
  0.9,
  0.001,
  6,
  undefined,
  false,
  undefined,
  undefined,
]

const FluidCaps = ({ boardHexArr, onPointerUp }: DreiCapProps) => {
  const ref = React.useRef<InstanceRefType>(undefined!)
  const viewingLevel = useBoundStore(s => s.viewingLevel)
  if (boardHexArr.length === 0) return null
  const range = boardHexArr.filter(bh => bh.altitude <= viewingLevel).length
  return (
    <Instances
      limit={INSTANCE_LIMIT}
      range={range} // no way there would be this many fluid caps, but with an overhang on every other hex, maybe
      ref={ref}
      frustumCulled={false}
    >
      <cylinderGeometry args={baseFluidCapCylinderArgs} />
      <meshLambertMaterial transparent opacity={0.85} />
      {boardHexArr.map((hex, i) => (
        <FluidCap
          key={hex.id + i + 'fluid'}
          boardHex={hex}
          onPointerUp={onPointerUp}
          isVisible={range > i}
        />
      ))}
    </Instances>
  )
}

export default FluidCaps

function FluidCap({
  boardHex,
  onPointerUp,
  isVisible
}: BoardHexPieceProps & { isVisible: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(undefined!)
  const {
    onPointerEnter,
    onPointerOut,
  } = usePieceHoverState(isVisible)
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const penMode = useBoundStore(s => s.penMode)
  const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
  const color = hexTerrainColor[boardHex.terrain]
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const isSelected = selectedPieceID === boardHex.pieceID

  // Effect: Initial color/position
  React.useEffect(() => {
    const { x, y, z } = getBoardHex3DCoords(boardHex)
    ref.current.color.set(hexTerrainColor[boardHex.terrain])
    ref.current.position.set(
      x,
      y - (HEXGRID_HEX_HEIGHT - (HEXGRID_HEX_HEIGHT * HEXGRID_HEXCAP_FLUID_SCALE)),
      z)
  }, [boardHex])

  // update color when piece is hovered
  React.useEffect(() => {
    if (hoveredPieceID === boardHex.pieceID) {
      // ref.current.color.set('yellow')
    } else {
      ref.current.color.set(color)
    }
  }, [boardHex.pieceID, hoveredPieceID, color])

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    if (!isVisible) {
      return
    }
    e.stopPropagation() // prevent this hover from passing through and affecting behind
    onPointerEnter(e, boardHex)
    ref.current.color.set('yellow')
  }
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!isVisible) {
      return
    }
    // if (hoveredPieceID !== boardHex.pieceID) {
    ref.current.color.set(color)
    onPointerOut(e)
    // }
  }
  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (!isVisible) {
      return
    }
    // Early out right clicks(event.button=2), middle mouse clicks(1)
    if (e.button !== 0) {
      // THIS IS A RIGHT CLICK
      // TODO: Can paste in copied templates! BUT, user must agree to reading text/images from the clipboard
      // const myClipboard = await navigator.clipboard.readText()
      return
    }
    if (penMode === 'select') {
      toggleSelectedPieceID(isSelected ? '' : boardHex.pieceID)
    } else {
      onPointerUp(e, boardHex)
    }
  }

  return (
    <Instance
      ref={ref}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerOut={handlePointerOut}
      frustumCulled={false}
    />
  )
}
