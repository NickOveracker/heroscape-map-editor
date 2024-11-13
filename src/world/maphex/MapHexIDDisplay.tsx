import { Billboard, Text } from '@react-three/drei'
import { Color, Vector3 } from 'three'

/* 
  MapHexIDDisplay
  This component is expensive to render if there are a lot of hexes
 */
export const MapHexIDDisplay = ({
  boardHexID,
  glyphPosition,
}: {
  boardHexID: string
  glyphPosition: Vector3
}) => {
  return (
    <Billboard position={glyphPosition}>
      <Text fontSize={0.3} color={new Color('white')}>
        {boardHexID}
      </Text>
    </Billboard>
  )
}
