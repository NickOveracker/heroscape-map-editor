import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import { HeightRings } from './HeightRings'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { isFluidTerrainHex } from '../../utils/board-utils'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  // HOVERED STATE
  const { x, z } = getBoardHex3DCoords(boardHex)
  const altitude = boardHex.altitude
  const y = altitude / 4
  const bottomRingYPosition = y - altitude / 2
  const topRingYPosition = isFluidHex
    ? y + (HEXGRID_HEX_HEIGHT / 4)
    : y
  const hexPosition = new Vector3(x, y, z)


  return (
    <group>

      {/* These rings around the hex cylinder convey height levels to the user, so they can visually see how many levels of height between 2 adjacent hexes */}
      {/* The top ring will be highlighted when we hover the cap-terrain mesh, and also for all sorts of game reasons */}
      <HeightRings
        bottomRingYPos={bottomRingYPosition}
        topRingYPos={topRingYPosition}
        position={hexPosition}
      />
    </group>
  )
}

/* GLYPHS */
// const yAdjustFluidCap = altitude / 2
// const yAdjustSolidCap = yAdjustFluidCap - eighthLevel
// const layerBetweenHexCapAndUnitFeet = 0.01
// const glyphYAdjust = isFluidHex
//   ? yAdjustFluidCap + layerBetweenHexCapAndUnitFeet
//   : yAdjustSolidCap + layerBetweenHexCapAndUnitFeet
// const sleightOffsetFromCenterOfHex = 0.2
// const sleightLiftFromSurface = 0.15
// const glyphPosition = new Vector3(
//   x,
//   glyphYAdjust + sleightLiftFromSurface,
//   z - sleightOffsetFromCenterOfHex
// )
{/* <MapHexIDDisplay boardHexID={boardHex.id} glyphPosition={glyphPosition} /> */ }