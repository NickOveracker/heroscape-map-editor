import { BoardHex } from '../types'
import { Svg } from '@react-pdf/renderer'
import { PdfMapHex } from './PdfMapHex'
import { PdfInterlockClipPaths } from '../svg-map/svg-hex-interlock-clippath'
import { SVG_HEX_RADIUS } from '../utils/constants'
import { getHexagonSvgPolygonPoints } from '../svg-map/getHexagonSvgPolygonPoints'

type ReactPdfSvgMapDisplayProps = {
  width: number
  length: number
  boardHexArr: BoardHex[]
  emptyHexesArr: BoardHex[]
}

const PADDING = 10;

export const ReactPdfSvgMapDisplay = ({ width, length, boardHexArr, emptyHexesArr }: ReactPdfSvgMapDisplayProps) => {
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);

  return (
    <Svg
      viewBox={`${0 - PADDING} ${0 - PADDING} ${width + 3 * PADDING} ${length + 3 * PADDING}`}
    >
      <PdfInterlockClipPaths
        points={points}
      />
      {emptyHexesArr.map((hex) => (
        <PdfMapHex key={hex.id} hex={hex} />
      ))}
      {/* This displays the interlock hexes */}
      {/* This displays the base hexagons and the hex-text (unit name, altitude, hex.id) */}
      {boardHexArr.filter(h => h.terrain !== 'empty').sort(
        (a, b) => a.altitude - b.altitude,
      ).map((hex) => (
        <PdfMapHex key={hex.id} hex={hex} />
      ))}
    </Svg>
  )
}
