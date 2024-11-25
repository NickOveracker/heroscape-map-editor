import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import HeightRing from './HeightRing'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { isSolidTerrainHex } from '../../utils/board-utils'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const isHeightRingedHex = isSolidTerrainHex(boardHex.terrain)
  return (
    <>
      <MapHexIDDisplay boardHex={boardHex} position={new Vector3(x, y + 0.2, z)} />
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
    </>
  )
}