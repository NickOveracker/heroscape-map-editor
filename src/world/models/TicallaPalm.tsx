import { useGLTF } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import useBoundStore from '../../store/store'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'
import { InterlockHex } from './InterlockHex'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

export default function TicallaPalm({
  boardHex,
}: { boardHex: BoardHex }) {
  const { nodes } = useGLTF('/ticalla-palm-colored-lowpoly.glb') as any
  const {
    // I botched these exports in Blender
    AlienGrassUFO_v01_Tuft_a_1: accompanyingBrush,
    AlienGrassUFO_v01_Tuft_a_3: palmLeaf,
    AlienGrassUFO_v01_Tuft_a_2: palmTrunk,
  } = nodes
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
  const colorTrunk = isHighlighted ? yellowColor : hexTerrainColor.ticallaPalmModel1
  const colorBrush = isHighlighted ? yellowColor : hexTerrainColor.ticallaBrush2
  const colorPalmLeaf = isHighlighted ? yellowColor : hexTerrainColor.ticallaPalmModel3
  return (
    <>
      {(isSelected) && (
        <DeletePieceBillboard pieceID={boardHex.pieceID} y={100} />
      )}
      <group
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => onPointerEnter(e, boardHex)}
        onPointerOut={e => onPointerOut(e)}
      >
        <mesh geometry={palmTrunk.geometry}>
          <meshMatcapMaterial color={colorTrunk} />
        </mesh>
        <mesh geometry={accompanyingBrush.geometry}>
          <meshMatcapMaterial color={colorBrush} />
        </mesh>
        <mesh geometry={palmLeaf.geometry}>
          <meshMatcapMaterial color={colorPalmLeaf} />
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

useGLTF.preload('/ticalla-palm-colored-lowpoly.glb')

