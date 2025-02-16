import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import usePieceHoverState from '../../hooks/usePieceHoverState'
import { ThreeEvent } from '@react-three/fiber'
import useBoundStore from '../../store/store'
import DeletePieceBillboard from '../maphex/DeletePieceBillboard'
import { noop } from 'lodash'

export default function BigTree415({
  boardHex,
}: { boardHex: BoardHex }) {
  const {
    nodes,
    //  materials
  } = useGLTF('/forest-tree15-colored-lowpoly.glb') as any
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
  const treeColor = isHighlighted ? yellowColor : hexTerrainColor[HexTerrain.tree]
  const rockColor = isHighlighted ? yellowColor : hexTerrainColor[HexTerrain.tree]
  return (
    <>
      {(isSelected) && (
        <DeletePieceBillboard pieceID={boardHex.pieceID} y={150} />
      )}
      <group
        onPointerUp={e => onPointerUp(e)}
        onPointerEnter={e => isVisible ? onPointerEnter(e, boardHex) : noop()}
        onPointerOut={e => isVisible ? onPointerOut(e) : noop()}
      >
        <mesh
          geometry={nodes.Tree_large_rocks_scanned001_1.geometry}
        // material={materials.BoulderGray}
        >
          <meshMatcapMaterial color={rockColor} />
        </mesh>
        <mesh
          geometry={nodes.Tree_large_rocks_scanned001_2.geometry}
        // material={materials.ForestTree}
        >
          <meshMatcapMaterial color={treeColor} />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/forest-tree15-colored-lowpoly.glb')
