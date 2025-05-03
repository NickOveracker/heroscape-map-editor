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
  // const interlock1Points =
  //   `17.32,15
  //   8.66,20 
  //   8.66, 10`
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
        <clipPath id="interlock2-clip">
          <polygon points={interlock2Points} />
        </clipPath>
        <clipPath id="interlock3-clip">
          <polygon points={interlock3Points} />
        </clipPath>
        <clipPath id="interlock3B-clip">
          <polygon points={interlock3BPoints} />
        </clipPath>
        <clipPath id="interlock4-clip">
          <polygon points={interlock4Points} />
        </clipPath>
        <clipPath id="interlock4B-clip">
          <polygon points={interlock4BPoints} />
        </clipPath>
        <clipPath id="interlock5-clip">
          <polygon points={interlock5Points} />
        </clipPath>
        <clipPath id="interlock6-clip">
          <polygon points={interlock6Points} />
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

const interlock1Points =
  `17.32,15
8.66,20 
0,15 
8.66,10
0,5 
8.66,0 
17.32,5
8.66,10
`
const interlock2Points =
  `17.32,15
8.66,20 
0,15 
8.66, 10`
const interlock3Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,10`
const interlock3BPoints =
  `17.32,15
8.66,20 
0,15 
8.66, 10
8.66,0 
17.32,5
8.66, 10
`
const interlock4Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
8.66,10`
const interlock4BPoints =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5`
const interlock5Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5
8.66,10
`
const interlock6Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5`