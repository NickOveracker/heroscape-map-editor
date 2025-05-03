import { SvgMapHex } from './SvgMapHex'
import { getBoardHexesSvgMapDimensions } from '../utils/map-utils'
import { BoardHexes } from '../types'
import { getBoardHexObstacleOriginsAndHexes } from '../utils/board-utils'
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints'
import { SVG_HEX_RADIUS } from '../utils/constants'

const PADDING = 10

export const SvgMapDisplay = ({ boardHexes }: { boardHexes: BoardHexes }) => {
  const mapDimensions = getBoardHexesSvgMapDimensions(boardHexes)
  const boardHexesArr = Object.values(getBoardHexObstacleOriginsAndHexes(boardHexes)).sort(
    (a, b) => a.altitude - b.altitude,
  )
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS)
  console.log("🚀 ~ SvgMapDisplay ~ points:", points)
  const interlock1Points =
    `17.32,15
    17.07,14.567
  8.66,19.5
  8.66,20 
  0,15 
  0,5 
  8.66,0 
  17.32,5`
  // 17.32,15 
  // 8.66,20 
  // 0,15 
  // 0,5 
  // 8.66,0 
  // 17.32,5

  // 13.856,12
  // 6.928,16
  // 0,12 
  // 0, 4 
  // 6.928, 0
  //  13.856, 4
  return (
    <svg
      viewBox={`${0 - PADDING} ${0 - PADDING} ${mapDimensions.width + 3 * PADDING} ${mapDimensions.length + 3 * PADDING}`}
    >
      <defs>
        <clipPath id="inner-stroke-clip">
          <polygon points={points} />
        </clipPath>
        <clipPath id="interlock1-clip">
          <polygon points={interlock1Points} />
        </clipPath>
      </defs>
      {/* <circle cx="50%" cy="50%" r="50%" fill="white" /> */}
      {/* <rect x="0" y="0" width="10" height="10" fill="red" /> */}
      <g className="hexgrid-layout">
        {/* This displays the base hexagons and the hex-text (unit name, altitude, hex.id) */}
        {boardHexesArr.sort(
          (a, b) => a.altitude - b.altitude,
        ).map((hex) => (
          <SvgMapHex key={hex.id} hex={hex} />
        ))}
      </g>
    </svg>
  )
}
