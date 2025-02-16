import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { DoubleSide } from 'three'
import useBoundStore from '../../store/store'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import { ThreeEvent } from '@react-three/fiber'

type Props = {
  boardHex: BoardHex
  // underHexTerrain: string
  // onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function LaurWallShort({ pid, isVisible }: { pid: string, isVisible: boolean }) {
  const { nodes } = useGLTF('/laurwall-short.glb') as any
  // const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  const {
    isHovered,
    onPointerEnterPID,
    onPointerOut,
  } = usePieceHoverState(isVisible)
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const yellowColor = 'yellow'
  const isSelected = selectedPieceID === pid
  const isHighlighted = isHovered || isSelected
  const color = isHighlighted ? yellowColor : hexTerrainColor[HexTerrain.laurWall]
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!isVisible) {
      return
    }
    event.stopPropagation() // prevent pass through
    // Early out right clicks(event.button=2), middle mouse clicks(1)
    if (event.button !== 0) {
      return
    }
    toggleSelectedPieceID(isSelected ? '' : pid)
  }
  return (
    <mesh
      geometry={nodes.LaurShortWall.geometry}
      onPointerUp={e => onPointerUp(e)}
      onPointerEnter={e => onPointerEnterPID(e, pid)}
      onPointerOut={e => onPointerOut(e)}
    >
      <meshMatcapMaterial
        side={DoubleSide}
        color={color}
      />
    </mesh>
  )
}

useGLTF.preload('/laurwall-short.glb')

export function LaurWallLong({
  boardHex,

  // underHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/laurwall-long.glb') as any
  const { x, z, yBase } = getBoardHex3DCoords(boardHex)
  return (
    <group position={[x, yBase, z]}>
      <mesh geometry={nodes.LaurWallLong.geometry}>
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.laurWall]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/laurwall-long.glb')
