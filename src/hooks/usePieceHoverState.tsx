import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import useBoundStore from '../store/store';
import { BoardHex } from '../types';

export default function usePieceHoverState() {
  const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
  const toggleHoveredPieceID = useBoundStore(s => s.toggleHoveredPieceID)
  const hoverTimeout = React.useRef<number>(null!);
  const [isHovered, setIsHovered] = React.useState(false)

  const onPointerEnter = (e: ThreeEvent<PointerEvent>, boardHex: BoardHex) => {
    e.stopPropagation()
    setIsHovered(true)
    hoverTimeout.current = setTimeout(() => {
      toggleHoveredPieceID(boardHex.pieceID)
    }, 100); // Adjust the delay (in milliseconds) as needed
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>, boardHex: BoardHex) => {
    e.stopPropagation()
    if (hoveredPieceID !== boardHex.pieceID) {
      toggleHoveredPieceID('')
    }
    setIsHovered(false)
    clearTimeout(hoverTimeout.current);
  }
  return {
    isHovered,
    onPointerEnter,
    onPointerOut,
  }
}