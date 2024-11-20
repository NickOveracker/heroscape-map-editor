import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import { HeightRings } from './HeightRings'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'


export const MapHex3D = ({
  boardHex,
  baseHexAltitude
}: {
  boardHex: BoardHex
  baseHexAltitude: number
}) => {
  // const bottomRingYPosition = baseHexAltitude // hardCoded for now, but eventually....
  const { x, z } = getBoardHex3DCoords(boardHex)
  const y = boardHex.altitude * HEXGRID_HEX_HEIGHT
  const baseY = baseHexAltitude
  const hexBottomPosition = new Vector3(x, baseHexAltitude, z)
  return (
    <>
      {boardHex.isCap ? <MapHexIDDisplay text={boardHex.id} position={new Vector3(x, boardHex.altitude * HEXGRID_HEX_HEIGHT + 0.2, z)} /> : <></>}
      <HeightRings
        bottom={baseY}
        top={y}
        position={hexBottomPosition}
      />
    </>
  )
}