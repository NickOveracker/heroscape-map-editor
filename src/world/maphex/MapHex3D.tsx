import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import { HeightRings } from './HeightRings'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const { x, z } = getBoardHex3DCoords(boardHex)
  const altitude = boardHex.altitude
  const y = 0
  const bottomRingYPosition = 0
  const topRingYPosition = altitude * HEXGRID_HEX_HEIGHT
  const hexPosition = new Vector3(x, y, z)
  // right here is where we should calculate on map state and figure out pieces, hexes, etc


  return (
    <group>
      <HeightRings
        bottomRingYPos={bottomRingYPosition}
        topRingYPos={topRingYPosition}
        position={hexPosition}
      />
    </group>
  )
}