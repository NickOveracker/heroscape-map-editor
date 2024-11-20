import { ThreeEvent } from "@react-three/fiber"
import { BoardHex } from "../../types"

export type CylinderGeometryArgs = [radiusTop?: number | undefined, radiusBottom?: number | undefined, height?: number | undefined, radialSegments?: number | undefined, heightSegments?: number | undefined, openEnded?: boolean | undefined, thetaStart?: number | undefined, thetaLength?: number | undefined] | undefined

export type InstanceCapProps = {
  capHexesArray: BoardHex[]
  onPointerEnter: (hex: BoardHex) => void
  onPointerOut: () => void
  onPointerDown: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}