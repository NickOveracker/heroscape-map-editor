import { hexUtilsHexToPixel } from '../utils/map-utils'
import { BoardHex } from '../types'
import { G, Polygon } from '@react-pdf/renderer'
import { getHexagonSvgPolygonPoints } from '../svg-map/getHexagonSvgPolygonPoints'
import { svgColors } from '../world/maphex/hexColors'

export const PdfMapHex = ({ hex }: { hex: BoardHex }) => {
  const cornerCoords = getHexagonSvgPolygonPoints()
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(' ')
  const pixel = hexUtilsHexToPixel(hex)
  const color = svgColors[hex.terrain]
  return (
    <G
      transform={`translate(${pixel.x}, ${pixel.y})`}
    >
      <Polygon
        points={points}
        stroke={hex.terrain === "empty" ? "grey" : "white"}
        fill={color}
        strokeWidth={1}
      // className={`base-maphex ${hexClassNames(hex)}`}
      />
      {/* Hex text */}
      {/* <SvgHexIDText
        hexSize={SVG_HEX_RADIUS}
        text={`${hex.id}`}
        textLine2={`${hex.altitude}`}
      // only show unit name on head-hex
      // text={`${hex.altitude}`}
      // textLine2={!hex.isUnitTail ? `${unitName}` : ''}
      /> */}
    </G>
  )
}
