import { Billboard, Text } from '@react-three/drei'
import { Color, Vector3 } from 'three'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'

/* 
  MapHexIDDisplay
  This component is expensive to render if there are a lot of hexes
 */
export const MapHexIDDisplay = ({
  text,
  position,
}: {
  text: string
  position: Vector3
}) => {
  return (
    <Billboard position={[position.x, position.y + HEXGRID_HEX_HEIGHT / 4, position.z]}>
      <Text fontSize={0.3} color={new Color('white')}>
        {text}
      </Text>
    </Billboard>
  )
}
