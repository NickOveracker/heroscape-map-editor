import { Billboard, Text } from '@react-three/drei'
import { Color, Vector3 } from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

/* 
  MapHexIDDisplay
  This component is expensive to render if there are a lot of hexes
 */
export const MapHexIDDisplay = ({
  position,
  boardHex,
}: {
  position: Vector3
  boardHex: BoardHex
}) => {
  // return null
  /* 
  DEV VISUAL: toggling the below filters off, such that EVERY boardHex shows a billboardID, really helps to see how the 
  grid works (you can see vertical-clearance hexes, empty hexes)
  */
  // if (!boardHex.isCap) return null
  if (!boardHex.isCap && !(boardHex.isObstacleOrigin || boardHex.isObstacleAuxiliary)) return null // filters out vertical clearance
  // if (boardHex.terrain === HexTerrain.empty) return null
  return (
    <Billboard position={[position.x, position.y + ((boardHex?.obstacleHeight ?? 0) * HEXGRID_HEX_HEIGHT), position.z]}>
      <Text fontSize={0.2} color={new Color('white')}>
        {/* {`${boardHex.terrain}:${boardHex.id}`} */}
        {`${boardHex.id}`}
        {/* {`${boardHex.q}:${boardHex.r}:${boardHex.s}`} */}
      </Text>
    </Billboard>
  )
}
