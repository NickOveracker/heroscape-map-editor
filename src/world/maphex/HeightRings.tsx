import { BufferGeometry, Color, Line, Vector3 } from 'three'
import {
  HEXGRID_HEX_HEIGHT,
} from '../../utils/constants'
import { extend, Object3DNode } from '@react-three/fiber'

// this extension for line_ is because, if we just use <line></line> then we get an error:
// Property 'geometry' does not exist on type 'SVGProps<SVGLineElement>'
// So, following advice found in issue: https://github.com/pmndrs/react-three-fiber/discussions/1387
extend({ Line_: Line })
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line_: Object3DNode<Line, typeof Line>
    }
  }
}


export const HeightRings = ({
  bottom,
  top,
  position,
}: {
  bottom: number
  top: number
  position: Vector3
}) => {

  const heightRingsForThisHex = genHeightRings(top, bottom)
  return (
    <>
      {heightRingsForThisHex.map((height, i) => {
        const points = genPointsForHeightRing(height)
        const lineGeometry = new BufferGeometry().setFromPoints(points)
        return (
          <line_
            key={i}
            geometry={lineGeometry}
            position={position}
            rotation={[0, Math.PI / 6, 0]}
          >
            <lineBasicMaterial
              attach="material"
              // warning, opacity can be a bit fps expensive
              // transparent
              // opacity={0.3}
              color={new Color('#dbdbdb')}
              linewidth={0.1}
            />
          </line_>
        )
      })}
    </>
  )
}

const genHeightRings = (top: number, bottom: number) => {
  const rings: number[] = [top] // no need to show bottom rings
  for (
    let i = bottom;
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