import { decodePieceID, hexUtilsHexToPixel } from '../utils/map-utils'
import { BoardHex, Pieces } from '../types'
import { G, Polygon } from '@react-pdf/renderer'
import { getHexagonSvgPolygonPoints } from '../svg-map/getHexagonSvgPolygonPoints'
import { SVG_HEX_RADIUS } from '../utils/constants'
import { getSvgHexBorderColor, getSvgHexFillColor } from '../svg-map/getSvgHexColors'

export const PdfMapHex = ({ hex }: { hex: BoardHex }) => {
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS)
  const pixel = hexUtilsHexToPixel(hex)
  const inventoryID = decodePieceID(hex.pieceID).pieceID;
  const isEmptyHex = hex.terrain === 'empty'
  const color = isEmptyHex ? 'white' : getSvgHexFillColor(hex);

  const borderColor = getSvgHexBorderColor(hex);
  const borderRotation =
    ((hex?.interlockRotation ?? 0) +
      (hex?.pieceRotation ?? 0)) % 6;
  return (
    <G
      transform={`translate(${pixel.x}, ${pixel.y})`}
    >
      <Polygon
        points={points}
        fill={color}
        stroke={isEmptyHex ? 'black' : ''}
        strokeWidth={isEmptyHex ? 0.2 : 0}
        clipPath="url(#inner-stroke-clip)"
      />
      {(hex.interlockType && hex.interlockType !== '0') &&
        <Polygon
          points={points}
          stroke={borderColor}
          strokeWidth={3}
          clipPath={`url(#interlock${hex.interlockType}-${borderRotation}-clip)`}
        />
      }
      {(inventoryID === Pieces.laurWallPillar) &&
        <Polygon
          points={points}
          stroke={borderColor}
          strokeWidth={5}
          clipPath={`url(#interlock6-${borderRotation}-clip)`}
        />
      }
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
