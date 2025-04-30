import { SvgMapHex } from './SvgMapHex'
import { getBoardHexesSvgMapDimensions } from '../utils/map-utils'
import { BoardHexes } from '../types'
import { getBoardHexObstacleOriginsAndHexes } from '../utils/board-utils'

const PADDING = 10

export const SvgMapDisplay = ({ boardHexes }: { boardHexes: BoardHexes }) => {
  const mapDimensions = getBoardHexesSvgMapDimensions(boardHexes)
  const boardHexesArr = Object.values(getBoardHexObstacleOriginsAndHexes(boardHexes)).sort(
    (a, b) => a.altitude - b.altitude,
  )
  return (
    <svg
      viewBox={`${0 - PADDING} ${0 - PADDING} ${mapDimensions.width + 3 * PADDING} ${mapDimensions.length + 3 * PADDING}`}
    >
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
