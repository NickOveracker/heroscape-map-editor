import { Color, Vector3 } from 'three'
import {
  HEXGRID_HEX_HEIGHT,
} from '../../utils/constants'
import { Line } from '@react-three/drei'

export const HeightRings = ({
  bottomRingYPos,
  topRingYPos,
  position,
}: {
  bottomRingYPos: number
  topRingYPos: number
  position: Vector3
}) => {
  const heightRingsForThisHex = genHeightRings(topRingYPos, bottomRingYPos)
  return (
    <>
      {heightRingsForThisHex.map((height, i) => {
        const points = genPointsForHeightRing(height)
        return (
          <Line
            key={`${position.x},${position.y},${position.z},${i}`}
            points={points}
            position={position}
            rotation={[0, Math.PI / 6, 0]}
          >
            <lineBasicMaterial
              attach="material"
              color={new Color('#fff')}
              linewidth={2}
            />
          </Line>
        )
      })}
    </>
  )
}

const genHeightRings = (top: number, bottom: number) => {
  /* 
  NOTE: this shows a height ring at the top (which is higher for a fluid hex than a solid hex of same height!)
  As well as a height ring for every hex height interval in between. 
  So for solid hexes, the last ring is the same height as the top ring
  */
  const rings: number[] = [top] // no need to show bottom rings
  for (
    let i = bottom + HEXGRID_HEX_HEIGHT;
    i < top;
    i += HEXGRID_HEX_HEIGHT
  ) {
    rings.push(i)
  }
  return rings
}
const genPointsForHeightRing = (height: number) => {
  return [
    new Vector3(1.0, height, 0),
    new Vector3(0.5, height, Math.sqrt(3) / 2),
    new Vector3(-0.5, height, Math.sqrt(3) / 2),
    new Vector3(-1.0, height, 0),
    new Vector3(-0.5, height, -Math.sqrt(3) / 2),
    new Vector3(0.5, height, -Math.sqrt(3) / 2),
    new Vector3(1.0, height, 0),
  ]
}