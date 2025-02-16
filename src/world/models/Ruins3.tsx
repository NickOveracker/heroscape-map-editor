import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { BoardHex, HexTerrain } from '../../types'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import useBoundStore from '../../store/store'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import {
  HEXGRID_HEX_HEIGHT,
} from '../../utils/constants'
import { hexTerrainColor } from '../maphex/hexColors'
import { getRuinsOptions } from './piece-adjustments'
import { noop } from 'lodash'

export default function Ruins3({
  boardHex,
}: {
  boardHex: BoardHex,
}) {
  const {
    nodes,
    // materials
  } = useGLTF('/ruins3.glb') as any
  const { x, z, y: yo } = getBoardHex3DCoords(boardHex)
  const y = yo - HEXGRID_HEX_HEIGHT
  const options = getRuinsOptions(boardHex.pieceRotation)
  const viewingLevel = useBoundStore((s) => s.viewingLevel)
  const isVisible = boardHex.altitude <= viewingLevel
  const {
    isHovered,
    onPointerEnter,
    onPointerOut,
  } = usePieceHoverState(isVisible)
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!isVisible) {
      return
    }
    event.stopPropagation() // prevent pass through
    // Early out right clicks(event.button=2), middle mouse clicks(1)
    if (event.button !== 0) {
      return
    }
    toggleSelectedPieceID(isSelected ? '' : boardHex.pieceID)
  }
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const yellowColor = 'yellow'
  const isSelected = selectedPieceID === boardHex.pieceID
  const isHighlighted = isHovered || isSelected
  const color = isHighlighted ? yellowColor : hexTerrainColor[HexTerrain.ruin]
  return (
    <group
      position={[x + options.xAdd, y, z + options.zAdd]}
      rotation={[0, options.rotationY, 0]}
    >
      {(isSelected) && (
        <DeletePieceBillboard pieceID={boardHex.pieceID} y={3} />
      )}
      <mesh
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => isVisible ? onPointerEnter(e, boardHex) : noop()}
        onPointerOut={e => isVisible ? onPointerOut(e) : noop()}
        geometry={nodes.Ruin_Large_Scanned.geometry}
      >
        <meshMatcapMaterial color={color} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/ruins3.glb')
