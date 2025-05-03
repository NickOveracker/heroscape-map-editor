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
  /* 
  17.32050807568877,15 
  8.660254037844386,20 
  0,15
  0,5 
  8.660254037844384,0 
  17.320508075688775,5
  */
  const color = svgColors[hex.terrain]
  return (
    <HexGridCoordinate hex={hex} onClick={onClick}>
      <polygon
        points={points}
        fill={color}
        stroke={hex.terrain === "empty" ? "grey" : "blue"}
        strokeWidth={1}
        // clip-path="url(#inner-stroke-clip)"
        clip-path="url(#interlock1-clip)"
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
