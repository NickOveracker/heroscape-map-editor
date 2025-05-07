import { BoardHex } from '../types'
import { Line, Rect, Svg } from '@react-pdf/renderer'
import { PdfMapHex } from './PdfMapHex'
import { PdfInterlockClipPaths } from '../svg-map/svg-hex-interlock-clippath'
import { SVG_HEX_APOTHEM, SVG_HEX_RADIUS } from '../utils/constants'
import { getHexagonSvgPolygonPoints } from '../svg-map/getHexagonSvgPolygonPoints'

type ReactPdfSvgMapDisplayProps = {
  width: number
  length: number
  boardHexArr: BoardHex[]
  emptyHexesArr: BoardHex[]
}

export const ReactPdfSvgMapDisplay = ({ width, length, boardHexArr, emptyHexesArr }: ReactPdfSvgMapDisplayProps) => {
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);

  return (
    <Svg
      viewBox={`${0} ${0} ${width} ${length}`}
      style={{
        border: '1px solid black',
        flexGrow: 1
      }}
    >
      <Rect
        x={0}
        y={0}
        width={2 * SVG_HEX_APOTHEM}
        height={2 * SVG_HEX_RADIUS}
        fill='red'
      />
      <Line
        x1={0}
        x2={0}
        y1={0}
        y2={length}
        stroke="red"
        strokeWidth={0.5}
      />
      <Line
        x1={0}
        x2={width}
        y1={0}
        y2={0}
        stroke="blue"
        strokeWidth={0.5}
      />
      <PdfInterlockClipPaths
        points={points}
      />
      {emptyHexesArr.map((hex) => (
        <PdfMapHex key={hex.id} hex={hex} />
      ))}
      {boardHexArr.filter(h => h.terrain !== 'empty').sort(
        (a, b) => a.altitude - b.altitude,
      ).map((hex) => (
        <PdfMapHex key={hex.id} hex={hex} />
      ))}
    </Svg>
  )
}
