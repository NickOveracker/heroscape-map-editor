import useBoundStore from '../store/store'
import { Pieces } from '../types'
import { HEXGRID_HEXCAP_HEIGHT } from '../utils/constants'
import { decodePieceID, getBoardHex3DCoords } from '../utils/map-utils'
import { Battlement } from './models/Battlement'
import { getLadderBattlementOptions, getRoadWallOptions } from './models/piece-adjustments'
import { RoadWall } from './models/RoadWall'

export const MapBoardPiece3D = ({
  pid,
}: {
  pid: string
}) => {
  const {
    pieceID,
    altitude,
    rotation,
    // boardHexID,
    pieceCoords
  } = decodePieceID(pid)
  const { x, z, y } = getBoardHex3DCoords({ ...pieceCoords, altitude })
  const viewingLevel = useBoundStore(s => s.viewingLevel)
  const isVisible = (altitude + 1) <= viewingLevel
  // yTree
  if (pieceID === Pieces.battlement) {
    return (
      <group
        position={[
          x + getLadderBattlementOptions(rotation).xAdd,
          y + (HEXGRID_HEXCAP_HEIGHT / 2),
          z + getLadderBattlementOptions(rotation).zAdd]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        visible={isVisible}
      >

        <Battlement pid={pid} isVisible={isVisible} />
      </group>
    )
  }
  if (pieceID === Pieces.roadWall) {
    return (
      <group
        position={[
          x + getRoadWallOptions(rotation).xAdd,
          y,
          z + getRoadWallOptions(rotation).zAdd]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        visible={isVisible}
      >

        <RoadWall pid={pid} isVisible={isVisible} />
      </group>
    )
  }
  return <></>
}
