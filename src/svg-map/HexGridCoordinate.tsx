import * as React from 'react'
import { BoardHex } from '../types'
import { hexUtilsHexToPixel } from '../utils/map-utils'

type Props = {
  hex: BoardHex
  onClick?: (e: React.MouseEvent, hex: BoardHex) => void
  children?: React.ReactNode | React.ReactNode[]
}

export function HexGridCoordinate(props: Props) {
  const { hex, children, onClick } = props
  const { pixel } = React.useMemo(() => {
    const pixel = hexUtilsHexToPixel(hex)
    return {
      pixel,
    }
  }, [hex])

  return (
    <g
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onClick={(e) => {
        if (onClick) {
          onClick(e, hex)
        }
      }}
    >
      {children}
    </g>
  )
}
