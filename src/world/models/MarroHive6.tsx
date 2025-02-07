import { useGLTF } from '@react-three/drei'
import { hexTerrainColor } from '../maphex/hexColors'
import { BoardHex } from '../../types'
import useBoundStore from '../../store/store'
import { ThreeEvent } from '@react-three/fiber'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'

export default function MarroHive6({
  boardHex,
}: { boardHex: BoardHex }) {
  const model = useGLTF('/uncolored-decimated-marro-hive-6.glb') as any
  const { nodes } = model
  const {
    isHovered,
    onPointerEnter,
    onPointerOut,
  } = usePieceHoverState()
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
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
  const color = isHighlighted ? yellowColor : hexTerrainColor.hiveModel1
  return (
    <>
      {(isSelected) && (
        <DeletePieceBillboard pieceID={boardHex.pieceID} y={4} />
      )}
      <mesh
        geometry={nodes.Marro_Hive.geometry}
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => onPointerEnter(e, boardHex)}
        onPointerOut={e => onPointerOut(e)}
      >
        <meshMatcapMaterial color={color} />
      </mesh>
    </>
  )
}

useGLTF.preload('/uncolored-decimated-marro-hive-6.glb')
