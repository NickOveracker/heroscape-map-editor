import { BufferGeometry, Color, Line, Vector3 } from 'three'
import { extend, Object3DNode } from '@react-three/fiber'
import { BoardHex } from '../../types'

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
export default function HeightRing({
  position,
}: {
  position: Vector3
}) {
  return (
    <line_
      geometry={new BufferGeometry().setFromPoints([
        new Vector3(1.0, 0, 0),
        new Vector3(0.5, 0, Math.sqrt(3) / 2),
        new Vector3(-0.5, 0, Math.sqrt(3) / 2),
        new Vector3(-1.0, 0, 0),
        new Vector3(-0.5, 0, -Math.sqrt(3) / 2),
        new Vector3(0.5, 0, -Math.sqrt(3) / 2),
        new Vector3(1.0, 0, 0),
      ])}
      position={position}
      rotation={[0, Math.PI / 6, 0]}
    >
      <lineBasicMaterial
        attach="material"
        // warning, opacity can be a bit fps expensive
        // transparent
        // opacity={0.3}
        color={new Color('#dbdbdb')}
        linewidth={3}
        linecap={'round'}
        linejoin={'round'}
      />
    </line_>
  )
}