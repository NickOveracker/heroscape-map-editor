import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import useBoundStore from '../../store/store'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'
import { InterlockHex } from './InterlockHex'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export default function TicallaBrush({
  boardHex,
}: { boardHex: BoardHex }) {
  const { nodes } = useGLTF('/ticalla-brush-colored-lowpoly.glb') as any
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
  const color1 = isHighlighted ? yellowColor : hexTerrainColor.ticallaBrush1
  const color2 = isHighlighted ? yellowColor : hexTerrainColor.ticallaBrush2
  const color3 = isHighlighted ? yellowColor : hexTerrainColor.ticallaBrush3
  return (
    <>
      {(isSelected) && (
        <DeletePieceBillboard pieceID={boardHex.pieceID} y={2} />
      )}
      <group
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => onPointerEnter(e, boardHex)}
        onPointerOut={e => onPointerOut(e)}
      >
        <mesh geometry={nodes.PlankFern1_1.geometry}>
          <meshMatcapMaterial color={color1} />
        </mesh>
        <mesh geometry={nodes.PlankFern1_2.geometry}>
          <meshMatcapMaterial color={color2} />
        </mesh>
        <mesh geometry={nodes.PlankFern1_3.geometry}>
          <meshMatcapMaterial color={color3} />
        </mesh>
      </group>
      <group
        position={[0, -HEXGRID_HEX_HEIGHT, 0]}
      >
        <InterlockHex
          type={'6'}
          color={hexTerrainColor[HexTerrain.swamp]}
        />
      </group>
    </>
  )
}

useGLTF.preload('/ticalla-brush-colored-lowpoly.glb')
