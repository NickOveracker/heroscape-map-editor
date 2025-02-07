import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'
import useBoundStore from '../../store/store'
import { ThreeEvent } from '@react-three/fiber'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'
import { HexTerrain } from '../../types'

export function RoadWall({ pid }: { pid: string }) {
  const { nodes } = useGLTF('/handmade-roadwall.glb') as any
  const {
    isHovered,
    onPointerEnterPID,
    onPointerOut,
  } = usePieceHoverState()
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation() // prevent pass through
    // Early out right clicks(event.button=2), middle mouse clicks(1)
    if (event.button !== 0) {
      return
    }
    toggleSelectedPieceID(isSelected ? '' : pid)
  }
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const yellowColor = 'yellow'
  const isSelected = selectedPieceID === pid
  const isHighlighted = isHovered || isSelected
  const color = isHighlighted ? yellowColor : hexTerrainColor[HexTerrain.roadWall]
  return (
    <>
      {(isSelected) && (
        <DeletePieceBillboard pieceID={pid} y={1} />
      )}
      <mesh
        geometry={nodes.RoadWall.geometry}
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => onPointerEnterPID(e, pid)}
        onPointerOut={e => onPointerOut(e)}
      >
        <meshMatcapMaterial color={color} />
      </mesh>
    </>
  )
}

useGLTF.preload('/handmade-roadwall.glb')
