import { Vector3, } from 'three'
import { BoardHex } from '../types'
import {
  eighthLevel,
  quarterLevel,
} from '../utils/constants'
import { HeightRings } from './HeightRings'
import { getBoardHex3DCoords } from '../utils/map-utils'
import { isFluidTerrainHex } from '../utils/board-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const { x, z } = getBoardHex3DCoords(boardHex)
  // HOVERED STATE
  const altitude = boardHex.altitude
  const isFluidHex = isFluidTerrainHex(boardHex.terrain)
  const hexYPosition = altitude / 4
  const bottomRingYPosition = hexYPosition - altitude / 2
  const topRingYPosition = isFluidHex
    ? hexYPosition + quarterLevel
    : hexYPosition

  const hexPosition = new Vector3(x, hexYPosition, z)
  const yAdjustFluidCap = altitude / 2
  const yAdjustSolidCap = yAdjustFluidCap - eighthLevel

  /* GLYPHS */
  const layerBetweenHexCapAndUnitFeet = 0.01
  const glyphYAdjust = isFluidHex
    ? yAdjustFluidCap + layerBetweenHexCapAndUnitFeet
    : yAdjustSolidCap + layerBetweenHexCapAndUnitFeet
  const sleightOffsetFromCenterOfHex = 0.2
  const sleightLiftFromSurface = 0.15
  const glyphPosition = new Vector3(
    x,
    glyphYAdjust + sleightLiftFromSurface,
    z - sleightOffsetFromCenterOfHex
  )

  return (
    <group>
      <MapHexIDDisplay boardHexID={boardHex.id} glyphPosition={glyphPosition} />

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
