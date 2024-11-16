import { Vector3, } from 'three'
import { BoardHex } from '../../types'
import { HeightRings } from './HeightRings'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { MapHexIDDisplay } from './MapHexIDDisplay'


export const MapHex3D = ({
  boardHex,
}: {
  boardHex: BoardHex
}) => {
  const { x, y, z } = getBoardHex3DCoords(boardHex)

  const bottomRingYPosition = 0 // hardCoded for now, but eventually....
  const hexBottomPosition = new Vector3(x, bottomRingYPosition, z)
  const hexTopPosition = new Vector3(x, y, z)
  return (
    <>
      {/* <MapHexIDDisplay text={boardHex.id} position={hexTopPosition} /> */}
      <HeightRings
        bottomRingYPos={bottomRingYPosition}
        topRingYPos={y}
        position={hexBottomPosition}
      />
    </>
  )
}