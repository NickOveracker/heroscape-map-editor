import { SyntheticEvent } from 'react'

import { SvgHexIDText } from './SvgHexIDText'
import { HexGridCoordinate } from './HexGridCoordinate'
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints'
import { SVG_HEX_RADIUS } from '../utils/constants'
import { BoardHex } from '../types'
import { svgColors } from '../world/maphex/hexColors'

export const SvgMapHex = ({ hex }: { hex: BoardHex }) => {
  // handlers
  const onClick = (event: SyntheticEvent, sourceHex: BoardHex) => {
    console.log("🚀 ~ onClick ~ sourceHex:", sourceHex)
  }

  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS)
  const color = svgColors[hex.terrain]
  return (
    <HexGridCoordinate hex={hex} onClick={onClick}>
      <polygon
        points={points}
        fill={color}
        stroke={hex.terrain === "empty" ? "grey" : "blue"}
        strokeWidth={2}
        clip-path="url(#inner-stroke-clip)"
      />
      {/* Hex text */}
      <SvgHexIDText
        hexSize={SVG_HEX_RADIUS}
        text={`${hex.id}`}
        textLine2={`${hex.altitude}`}
      // only show unit name on head-hex
      // text={`${hex.altitude}`}
      // textLine2={!hex.isUnitTail ? `${unitName}` : ''}
      />
    </HexGridCoordinate>
  )
}
