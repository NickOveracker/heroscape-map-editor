import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import HeightRing from './HeightRing'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { isSolidTerrainHex } from '../../utils/board-utils'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
  baseHexAltitude: number
}) => {
  const { x, z } = getBoardHex3DCoords(boardHex)
  const y = boardHex.altitude * HEXGRID_HEX_HEIGHT
  const isHeightRingedHex = isSolidTerrainHex(boardHex.terrain)
  return (
    <>
      {boardHex.isCap ? <MapHexIDDisplay text={boardHex.id} position={new Vector3(x, y + 0.2, z)} /> : <></>}
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
    </>
  )
}