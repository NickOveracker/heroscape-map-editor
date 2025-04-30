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

  const cornerCoords = getHexagonSvgPolygonPoints()
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(' ')
  const color = svgColors[hex.terrain]
  return (
    <HexGridCoordinate hex={hex} onClick={onClick}>
      <polygon
        points={points}
        stroke={hex.terrain === "empty" ? "grey" : "blue"}
        fill={color}
        strokeWidth={1}
      // className={`base-maphex ${hexClassNames(hex)}`}
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
