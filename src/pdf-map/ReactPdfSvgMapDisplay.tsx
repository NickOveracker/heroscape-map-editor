import { BoardHex } from '../types'
import { G, Svg } from '@react-pdf/renderer'
import { PdfMapHex } from './PdfMapHex'

type ReactPdfSvgMapDisplayProps = {
  width: number
  length: number
  boardHexArr: BoardHex[]
}
export const ReactPdfSvgMapDisplay = ({ width, length, boardHexArr }: ReactPdfSvgMapDisplayProps) => {
  return (
    <Svg
      viewBox={`0 0 ${width} ${length}`}
    >
      <G>
        {/* This displays the base hexagons and the hex-text (unit name, altitude, hex.id) */}
        {boardHexArr.sort(
          (a, b) => a.altitude - b.altitude,
        ).map((hex) => (
          <PdfMapHex key={hex.id} hex={hex} />
        ))}
      </G>
    </Svg>
  )
}
