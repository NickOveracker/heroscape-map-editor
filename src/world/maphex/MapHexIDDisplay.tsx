import { Billboard, Text } from '@react-three/drei'
import { Color, Vector3 } from 'three'
import { BoardHex } from '../../types'

/* 
  MapHexIDDisplay
  This component is expensive to render if there are a lot of hexes
 */
export const MapHexIDDisplay = ({ position, boardHex }: {
  position: Vector3
  boardHex: BoardHex
}) => {
  if (!boardHex.isCap) return null
  return null
  return (
    <Billboard position={[position.x, position.y, position.z]}>
      <Text fontSize={0.2} color={new Color('white')}>
        {`${boardHex.terrain}:${boardHex.id}`}
      </Text>
    </Billboard>
  )
}
