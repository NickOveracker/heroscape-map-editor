import { Vector3, } from 'three'
import { BoardHex, HexTerrain } from '../../types'
import HeightRing from './HeightRing'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'
import { isSolidTerrainHex } from '../../utils/board-utils'
import { Tree10ColoredLowPoly } from '../models/Tree10ColoredLowPoly'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const isHeightRingedHex = isSolidTerrainHex(boardHex.terrain) || boardHex.terrain === HexTerrain.empty
  const isTreeHex = boardHex.terrain === HexTerrain.tree && boardHex.isObstacleOrigin
  return (
    <>
      <MapHexIDDisplay boardHex={boardHex} position={new Vector3(x, y + 0.2, z)} />
      {isHeightRingedHex && <HeightRing
        position={new Vector3(x, y, z)}
      />}
      {isTreeHex && <Tree10ColoredLowPoly boardHex={boardHex} />}
    </>
  )
}